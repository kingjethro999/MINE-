import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { PLANS, PlanId } from "@/lib/plans";
import { CreditCard, History } from "lucide-react";
import WithdrawForm from "@/components/withdraw/WithdrawForm";

export default async function WithdrawPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { withdrawals: { orderBy: { requestedAt: "desc" }, take: 5 } },
  });

  if (!user) redirect("/login");

  const planData = PLANS[user.plan.toLowerCase() as PlanId];
  const canWithdraw = user.coinsBalance >= planData.withdrawalThreshold;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Withdraw Funds</h1>
        <p className="text-[var(--text-secondary)]">Transfer your MINE$ earnings to your local bank account.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Request Form */}
        <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl p-8 relative card-lift">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Create Request</h2>
            <div className="px-3 py-1 bg-[var(--surface-900)] border border-[var(--gold-700)] rounded-full text-[var(--gold-400)] text-xs font-bold mono-figure flex items-center gap-2">
              <CreditCard size={14} /> Bal: ₦{user.coinsBalance.toFixed(2)}
            </div>
          </div>

          {!canWithdraw && user.plan !== "PREMIUM" && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mb-6">
              <p className="text-sm text-[var(--color-danger)] font-medium">
                You must reach the ₦{planData.withdrawalThreshold.toLocaleString()} threshold to withdraw on the {user.plan} plan.
              </p>
            </div>
          )}

          <WithdrawForm
            userId={user.id}
            coinsBalance={user.coinsBalance}
            minWithdrawal={planData.withdrawalThreshold}
            planName={user.plan}
            defaultBankCode={user.bankCode || undefined}
            defaultBankName={user.bankName || undefined}
            defaultAccountNumber={user.bankAccountNumber || undefined}
            defaultAccountName={user.bankAccountName || undefined}
          />
          
          <p className="text-center text-xs text-[var(--text-muted)] mt-4">
            Transfers processed in {planData.disbursementDays} Day(s)
          </p>
        </div>

        {/* Recent History */}
        <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl overflow-hidden flex flex-col">
          <div className="p-6 border-b border-[var(--surface-600)] flex items-center gap-3">
            <History className="text-[var(--gold-400)]" size={20} />
            <h3 className="text-lg font-bold text-white">Recent Requests</h3>
          </div>
          
          <div className="flex-1 overflow-y-auto p-2">
            {user.withdrawals.length === 0 ? (
              <div className="h-full flex items-center justify-center text-[var(--text-muted)] p-8 text-center text-sm">
                No withdrawal requests found.
              </div>
            ) : (
              <ul className="divide-y divide-[var(--surface-600)] px-4">
                {user.withdrawals.map((w) => (
                  <li key={w.id} className="py-4">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-white mono-figure">₦ {w.amount.toLocaleString()}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-sm ${
                        w.status === "PENDING" ? "bg-[var(--surface-600)] text-white" :
                        w.status === "APPROVED" ? "bg-[var(--gold-600)] text-black" :
                        w.status === "DISBURSED" ? "bg-[var(--green-600)] text-white" :
                        "bg-[var(--color-danger)] text-white"
                      }`}>
                        {w.status}
                      </span>
                    </div>
                    <div className="flex justify-between items-end text-xs text-[var(--text-muted)]">
                      <span>{w.bankName} ending in ••{w.accountNumber.slice(-3)}</span>
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
