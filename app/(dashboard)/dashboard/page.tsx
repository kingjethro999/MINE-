import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PLANS, PlanId } from "@/lib/plans";
import prisma from "@/lib/db";
import GamesFeedPreview from "@/components/games/GamesFeedPreview";
import { Pickaxe, Calendar, Banknote } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) redirect("/login");

  const planData = PLANS[user.plan.toLowerCase() as PlanId];
  const isPremium = user.plan === "PREMIUM";

  // Identify next withdrawal date
  let nextWithdrawal = "Custom / Anytime";
  if (!isPremium) {
    const today = new Date();
    // Simplified specific-day logic depending if it's past the current day
    if (planData.withdrawalDays[0] === 28) {
      nextWithdrawal = "28th of the month";
    } else {
      nextWithdrawal = "14th or 28th of the month"; 
    }
  } else {
    nextWithdrawal = "Every Thursday";
  }

  // Active mining check
  const activeSession = await prisma.miningSession.findFirst({
    where: { userId: user.id, endedAt: null },
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user.name}</h1>
        <p className="text-[var(--text-secondary)]">Here's your current overview and earning status.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card Main */}
        <div className="lg:col-span-2 balance-card rounded-2xl p-8 relative overflow-hidden card-lift">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--text-muted)] text-sm font-medium uppercase tracking-wider mb-1">Available Balance</p>
                <div className="text-4xl sm:text-5xl font-bold text-[var(--gold-400)] mono-figure tracking-tight">
                  ₦ {user.coinsBalance.toFixed(2)}
                </div>
              </div>
              <div className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider plan-badge-${user.plan.toLowerCase()}`}>
                {user.plan}
              </div>
            </div>

            <div className="mt-8 flex items-center gap-6">
              <div>
                <p className="text-[var(--text-muted)] text-xs mb-1">Total Earned</p>
                <p className="text-white font-semibold mono-figure">₦ {user.totalEarned.toFixed(2)}</p>
              </div>
              <div className="h-8 w-px bg-[var(--surface-600)]"></div>
              <div>
                <p className="text-[var(--text-muted)] text-xs mb-1">Status</p>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${activeSession ? "bg-[var(--green-500)] shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-[var(--gray-600)]"}`}></span>
                  <span className={activeSession ? "text-[var(--green-500)] text-sm font-medium" : "text-[var(--text-secondary)] text-sm"}>
                    {activeSession ? "Mining Active" : "Idle"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute right-[-40px] top-[-40px] opacity-10 pointer-events-none">
            <Pickaxe size={200} />
          </div>
        </div>

        {/* Info Cards Side */}
        <div className="space-y-6">
          <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl p-6">
            <div className="flex items-center gap-3 text-[var(--text-muted)] mb-3">
              <Calendar size={18} />
              <h3 className="text-sm font-semibold uppercase tracking-wider">Next Withdrawal</h3>
            </div>
            <p className="text-white font-medium">{nextWithdrawal}</p>
            {!isPremium && <p className="text-xs text-[var(--gold-600)] mt-2">Min ₦{planData.withdrawalThreshold.toLocaleString()}</p>}
          </div>

          <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl p-6">
            <div className="flex items-center gap-3 text-[var(--text-muted)] mb-3">
              <Banknote size={18} />
              <h3 className="text-sm font-semibold uppercase tracking-wider">Earning Rate</h3>
            </div>
            <p className="text-white font-medium">₦ {planData.earningPerHour} <span className="text-[var(--text-muted)] text-sm">/ hr</span></p>
            <p className="text-[var(--green-500)] text-xs mt-1 mono-figure">+₦{(planData.earningPerHour / 3600).toFixed(4)} / sec</p>
          </div>
        </div>
      </div>

      {/* Games Strip */}
      <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl p-6 pt-2">
        <GamesFeedPreview earningsPerMinute={planData.gameEarningsPerMinute} />
      </div>

    </div>
  );
}
