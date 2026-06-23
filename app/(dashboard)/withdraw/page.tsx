import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { PLANS, PlanId } from "@/lib/plans";
import { CreditCard, History, ShieldCheck, Activity, Landmark } from "lucide-react";
import WithdrawForm from "@/components/withdraw/WithdrawForm";

export default async function WithdrawPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      withdrawals: { orderBy: { requestedAt: "desc" }, take: 5 },
      referralsMade: true,
    },
  });

  if (!user) redirect("/login");

  const planData = PLANS[user.plan.toLowerCase() as PlanId];
  const downlineCount = user.referralsMade.length;
  const meetsDownlineRequirement = downlineCount >= planData.minDownlines;
  const canWithdraw = user.coinsBalance >= planData.withdrawalThreshold && meetsDownlineRequirement;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Withdraw rewards</h1>
        <p className="text-[var(--text-secondary)] font-medium">Request payout to your bank account based on your plan rules and account status.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Request Form */}
        <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[32px] p-8 relative shadow-2xl overflow-hidden card-lift">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Landmark size={120} />
          </div>

          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">Create withdrawal request</h2>
            <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-2xl text-[var(--color-accent)] text-xs font-black mono-figure flex items-center gap-2 shadow-inner">
              <Activity size={14} className="animate-pulse" /> BAL: ₦{user.coinsBalance.toLocaleString()}
            </div>
          </div>

          {!meetsDownlineRequirement && (
            <div className="bg-red-500/10 border border-red-500/10 rounded-2xl p-4 mb-8 flex items-start gap-3">
              <ShieldCheck size={18} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-red-500 font-bold leading-relaxed">
                Plan requirement: you need at least <span className="underline">{planData.minDownlines} active referrals</span> before withdrawals can be approved for the {user.plan} plan.
                Progress: {downlineCount}/{planData.minDownlines}.
              </p>
            </div>
          )}

          {!canWithdraw && user.plan !== "PREMIUM" && meetsDownlineRequirement && (
            <div className="bg-amber-500/10 border border-amber-500/10 rounded-2xl p-4 mb-8 flex items-start gap-3">
              <Activity size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-500 font-bold leading-relaxed">
                Threshold requirement: your available balance must reach <span className="underline font-black">₦{planData.withdrawalThreshold.toLocaleString()}</span> before you can submit a withdrawal on this plan.
              </p>
            </div>
          )}

          <div className="relative z-10">
            <WithdrawForm
              userId={user.id}
              coinsBalance={user.coinsBalance}
              minWithdrawal={planData.withdrawalThreshold}
              planName={user.plan}
              downlineCount={downlineCount}
              minDownlines={planData.minDownlines}
              defaultBankCode={user.bankCode || undefined}
              defaultBankName={user.bankName || undefined}
              defaultAccountNumber={user.bankAccountNumber || undefined}
              defaultAccountName={user.bankAccountName || undefined}
            />
          </div>

          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-[var(--text-muted)]">
            <span>Est. Settlement Time</span>
            <span className="text-white">{planData.disbursementDays < 1 ? "< 12 HOURS" : `${planData.disbursementDays} CYCLE(S)`}</span>
          </div>
        </div>

        {/* Recent History */}
        <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[32px] overflow-hidden flex flex-col shadow-xl">
          <div className="p-8 border-b border-white/5 bg-black/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="text-[var(--color-accent)]" size={20} />
              <h3 className="text-lg font-black text-white tracking-tight uppercase">Withdrawal history</h3>
            </div>
            <span className="text-[10px] font-black px-2 py-0.5 bg-white/5 text-[var(--text-muted)] rounded">LAST 5 DATA</span>
          </div>

          <div className="flex-1 overflow-y-auto">
            {user.withdrawals.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-[var(--text-muted)] p-12 text-center">
                <Activity size={40} className="mb-4 opacity-10" />
                <p className="text-xs font-bold uppercase tracking-widest">No withdrawal history yet</p>
              </div>
            ) : (
              <ul className="divide-y divide-white/5 px-6">
                {user.withdrawals.map((w) => (
                  <li key={w.id} className="py-6 group hover:bg-white/[0.02] transition-colors -mx-6 px-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-black text-white text-lg mono-figure tracking-tighter">₦ {w.amount.toLocaleString()}</span>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-lg ${w.status === "PENDING" ? "bg-white/10 text-white" :
                          w.status === "APPROVED" ? "bg-[var(--color-accent)] text-[#0a0f0d]" :
                            w.status === "DISBURSED" ? "bg-green-500 text-white" :
                              "bg-red-500 text-white"
                        }`}>
                        {w.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider">
                      <span className="flex items-center gap-1.5 font-mono">
                        <CreditCard size={12} className="opacity-50" />
                        {w.bankName} ••{w.accountNumber.slice(-3)}
                      </span>
                      <span>{w.requestedAt.toLocaleDateString()}</span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
