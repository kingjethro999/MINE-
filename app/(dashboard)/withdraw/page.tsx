import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { PLANS, PlanId } from "@/lib/plans";
import { fetchUsdToNgnRate, usdToNgn } from "@/lib/exchange";
import { CreditCard, History, ShieldCheck, Activity, Landmark } from "lucide-react";
import WithdrawPageClient from "@/components/withdraw/WithdrawPageClient";
import CurrencyDisplay from "@/components/ui/CurrencyDisplay";

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

  let exchangeRate = 1500;
  try {
    const rateData = await fetchUsdToNgnRate();
    exchangeRate = rateData.rate;
  } catch {}

  const balanceNgn = usdToNgn(user.coinsBalance, exchangeRate);
  const canWithdraw =
    balanceNgn >= planData.withdrawalThresholdNgn && meetsDownlineRequirement;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Withdraw</h1>
        <p className="text-[var(--text-secondary)] font-medium">
          Withdraw your earnings to your Nigerian bank account.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[32px] p-8 relative shadow-2xl overflow-hidden card-lift">
          <div className="absolute top-0 right-0 p-8 opacity-[0.03] pointer-events-none">
            <Landmark size={120} />
          </div>

          <div className="flex justify-between items-center mb-10">
            <h2 className="text-xl font-black text-white tracking-tight uppercase">
              Request Withdrawal
            </h2>
            <div className="px-4 py-2 bg-black/40 border border-white/5 rounded-2xl text-xs font-black flex items-center gap-2 shadow-inner">
              <Activity size={14} className="animate-pulse text-[var(--color-accent)]" />
              <CurrencyDisplay amountUsd={user.coinsBalance} size="sm" />
            </div>
          </div>

          {!meetsDownlineRequirement && (
            <div className="bg-red-500/10 border border-red-500/10 rounded-2xl p-4 mb-8 flex items-start gap-3">
              <ShieldCheck size={18} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-red-500 font-bold leading-relaxed">
                You need at least {planData.minDownlines} referrals to withdraw.
                Progress: {downlineCount}/{planData.minDownlines}.
              </p>
            </div>
          )}

          {!canWithdraw && user.plan !== "PREMIUM" && meetsDownlineRequirement && (
            <div className="bg-amber-500/10 border border-amber-500/10 rounded-2xl p-4 mb-8 flex items-start gap-3">
              <Activity size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <p className="text-[11px] text-amber-500 font-bold leading-relaxed">
                Minimum withdrawal: ₦{planData.withdrawalThresholdNgn.toLocaleString()}
              </p>
            </div>
          )}

          <div className="relative z-10">
            <WithdrawPageClient
              userId={user.id}
              balanceUsd={user.coinsBalance}
              minWithdrawalNgn={planData.withdrawalThresholdNgn}
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
            <span>Est. Processing Time</span>
            <span className="text-white">
              {planData.disbursementDays < 1
                ? "< 12 HOURS"
                : `${planData.disbursementDays} DAY(S)`}
            </span>
          </div>
        </div>

        <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[32px] overflow-hidden flex flex-col shadow-xl">
          <div className="p-8 border-b border-white/5 bg-black/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <History className="text-[var(--color-accent)]" size={20} />
              <h3 className="text-lg font-black text-white tracking-tight uppercase">
                Recent Withdrawals
              </h3>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {user.withdrawals.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-[var(--text-muted)] p-12 text-center">
                <Activity size={40} className="mb-4 opacity-10" />
                <p className="text-xs font-bold uppercase tracking-widest">No withdrawals yet</p>
              </div>
            ) : (
              <ul className="divide-y divide-white/5 px-6">
                {user.withdrawals.map((w) => (
                  <li
                    key={w.id}
                    className="py-6 group hover:bg-white/[0.02] transition-colors -mx-6 px-6"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-black text-white text-lg mono-figure tracking-tighter">
                        ₦ {w.amount.toLocaleString()}
                      </span>
                      <span
                        className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-lg ${
                          w.status === "PENDING"
                            ? "bg-white/10 text-white"
                            : w.status === "APPROVED"
                              ? "bg-[var(--color-accent)] text-[#0a0f0d]"
                              : w.status === "DISBURSED"
                                ? "bg-green-500 text-white"
                                : "bg-red-500 text-white"
                        }`}
                      >
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
