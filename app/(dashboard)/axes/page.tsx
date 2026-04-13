import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { AXES_TIERS } from "@/lib/plans";
import { Axe, Clock, Zap } from "lucide-react";

export default async function AxesPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) redirect("/login");

  // Get active axe
  const now = new Date();
  const activeAxe = await prisma.axesPurchase.findFirst({
    where: { userId: user.id, active: true, expiresAt: { gt: now } },
    orderBy: { purchasedAt: "desc" },
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Axes Upgrades</h1>
        <p className="text-[var(--text-secondary)]">Boost your passive mining earnings with a 7-day Axe upgrade.</p>
      </header>

      {/* Active Axe Banner */}
      {activeAxe && (
        <div className="bg-gradient-to-r from-[var(--surface-800)] to-[var(--surface-700)] p-6 rounded-2xl border border-[var(--gold-500)] shadow-[0_0_30px_rgba(212,175,55,0.05)] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-[var(--surface-900)] rounded-full flex items-center justify-center border border-[var(--gold-600)]">
              <Axe size={24} className="text-[var(--gold-400)]" />
            </div>
            <div>
              <div className="text-[var(--gold-400)] text-xs font-bold uppercase tracking-wider mb-1">Active Boost</div>
              <h3 className="text-white font-bold text-lg">{AXES_TIERS[activeAxe.tier as keyof typeof AXES_TIERS].label}</h3>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end mb-1 text-[var(--green-400)] font-bold mono-figure">
              <Zap size={16} /> +₦{AXES_TIERS[activeAxe.tier as keyof typeof AXES_TIERS].bonusPerSecond}/s
            </div>
            <div className="flex items-center gap-1.5 justify-end text-xs text-[var(--text-muted)]">
              <Clock size={14} /> 
              Expires {activeAxe.expiresAt.toLocaleDateString()}
            </div>
          </div>
        </div>
      )}

      {/* Tier Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.values(AXES_TIERS).map((tier) => (
          <div key={tier.id} className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl p-6 relative card-lift flex flex-col">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-[var(--surface-600)] text-[var(--text-muted)] px-3 py-1 rounded-full text-xs font-bold tracking-wider flex items-center gap-1.5">
              <Clock size={14} /> 7 Days
            </div>

            <div className="mb-6 flex-1">
              <Axe size={32} className="text-[var(--text-secondary)] mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{tier.label}</h3>
              <p className="text-[var(--text-muted)] text-sm mb-6">Boosts your normal mining speed by a fixed amount per second.</p>
              
              <div className="bg-[var(--surface-900)] rounded-xl p-4 border border-[var(--surface-600)]">
                <div className="text-[var(--green-500)] font-bold text-lg mono-figure flex items-center gap-2">
                  <Zap size={18} /> +₦ {tier.bonusPerSecond.toFixed(2)}/s
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-[var(--surface-600)]">
              <div className="flex justify-between items-baseline mb-4">
                <span className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-wider">Price</span>
                <span className="text-2xl font-bold text-white mono-figure">₦{tier.price.toLocaleString()}</span>
              </div>
              
              <form action="/api/axes/initialize" method="POST">
                <input type="hidden" name="tier" value={tier.id} />
                <button className="w-full py-3 bg-[var(--surface-700)] hover:bg-[var(--gold-500)] text-[var(--text-secondary)] hover:text-black font-bold uppercase tracking-wider rounded-xl transition-all border border-[var(--surface-600)] hover:border-[var(--gold-500)]">
                  Buy Axe
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
