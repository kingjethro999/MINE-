import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Network, Copy } from "lucide-react";

export default async function ReferralPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      referralsMade: {
        include: { referee: true }
      },
      referralEarnings: true
    }
  });

  if (!user) redirect("/login");

  // Sum total commissions
  const totalCommissions = user.referralEarnings.reduce((acc, curr) => acc + curr.commission, 0);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Referrals</h1>
        <p className="text-[var(--text-secondary)]">Earn 5% of your downline's mining and game earnings, instantly credited.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Link Card */}
        <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl p-6 relative card-lift shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-[var(--surface-900)] rounded-full flex items-center justify-center border border-[var(--gold-600)]">
              <Network size={18} className="text-[var(--gold-400)]" />
            </div>
            <h3 className="text-lg font-bold text-white">Your Referral Link</h3>
          </div>
          <p className="text-[var(--text-muted)] text-sm mb-4">Share this link. Anyone who registers will become your direct downline.</p>
          
          <div className="flex bg-[var(--surface-900)] rounded-lg border border-[var(--surface-600)] overflow-hidden">
            <input 
              type="text" 
              readOnly 
              value={`https://mines.app/register/${user.id}`} 
              className="bg-transparent text-[var(--gold-300)] px-4 py-3 flex-1 outline-none font-mono text-sm" 
            />
            {/* The copy would need client UI, omitted logic for boilerplate */}
            <button className="bg-[var(--surface-700)] px-4 border-l border-[var(--surface-600)] hover:bg-[var(--surface-600)] transition-colors text-white">
              <Copy size={16} />
            </button>
          </div>
        </div>

        {/* Commission Stats */}
        <div className="bg-gradient-to-br from-[var(--surface-800)] to-[#1a1405] border border-[var(--gold-700)] rounded-2xl p-6 relative card-lift shadow-[0_0_30px_rgba(212,175,55,0.06)]">
          <h3 className="text-[var(--text-muted)] text-sm font-bold uppercase tracking-wider mb-2">Total Commission Earned</h3>
          <div className="text-4xl font-bold text-[var(--gold-400)] mono-figure tracking-tight my-4">
            ₦ {totalCommissions.toFixed(2)}
          </div>
          <p className="text-[var(--green-500)] text-sm mt-auto flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[var(--green-500)] animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></span>
            Credits automatically applied
          </p>
        </div>
      </div>

      {/* Downline Table */}
      <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl overflow-hidden mt-8">
        <div className="p-6 border-b border-[var(--surface-600)]">
          <h3 className="text-lg font-bold text-white">Your Downline ({user.referralsMade.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-[var(--text-secondary)]">
            <thead className="bg-[var(--surface-900)] text-[var(--text-muted)] uppercase tracking-wider text-xs border-b border-[var(--surface-600)]">
              <tr>
                <th className="px-6 py-4 font-semibold">User</th>
                <th className="px-6 py-4 font-semibold">Plan</th>
                <th className="px-6 py-4 font-semibold">Joined Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--surface-600)]">
              {user.referralsMade.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-[var(--text-muted)]">
                    You have not referred anyone yet.
                  </td>
                </tr>
              ) : (
                user.referralsMade.map((ref) => (
                  <tr key={ref.id} className="hover:bg-[var(--surface-700)] transition-colors">
                    <td className="px-6 py-4 font-medium text-white">{ref.referee.name}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 text-xs rounded-full uppercase tracking-wider plan-badge-${ref.referee.plan.toLowerCase()}`}>
                        {ref.referee.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4">{ref.createdAt.toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
