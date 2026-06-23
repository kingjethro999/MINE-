import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { PLANS, PlanId, BOOST_TIERS, BoostTierId } from "@/lib/plans";
import GamesFeedPreview from "@/components/games/GamesFeedPreview";
import VideosFeedPreview from "@/components/videos/VideosFeedPreview";
import { Calendar, Activity, Zap, Layers } from "lucide-react";
import CurrencyDisplay from "@/components/ui/CurrencyDisplay";
import { getActiveBoost } from "@/lib/boosts";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) redirect("/login");

  const planData = PLANS[user.plan.toLowerCase() as PlanId];
  const isPremium = user.plan === "PREMIUM";

  let nextWithdrawal = "Verification Pending";
  if (!isPremium) {
    if (planData.withdrawalDays[0] === 28) {
      nextWithdrawal = "28th of each month";
    } else {
      nextWithdrawal = "14th & 28th of each month";
    }
  } else {
    nextWithdrawal = "Every Thursday (Priority)";
  }

  const activeBoost = await getActiveBoost(user.id);
  const boostTier = activeBoost
    ? BOOST_TIERS[activeBoost.tier as BoostTierId]
    : null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 tracking-tight">
            Welcome, {user.name}
          </h1>
          <p className="text-[var(--text-secondary)] font-medium">
            Watch videos and play games to earn real money
          </p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-black text-green-500 uppercase tracking-widest">
            Active
          </span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 balance-card rounded-[32px] p-8 md:p-10 relative overflow-hidden card-lift shadow-2xl">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-[0.2em] mb-3 opacity-80">
                  Your Balance
                </p>
                <CurrencyDisplay amountUsd={user.coinsBalance} size="xl" />
              </div>
              <div
                className={`text-[10px] font-black px-4 py-1.5 rounded-lg border border-white/10 uppercase tracking-[0.15em] shadow-lg ${
                  user.plan === "PREMIUM"
                    ? "bg-[var(--color-accent)] text-[#0a0f0d]"
                    : "bg-black/40 text-white"
                }`}
              >
                {user.plan}
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-8 md:gap-12">
              <div>
                <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                  Total Earned
                </p>
                <CurrencyDisplay amountUsd={user.totalEarned} size="sm" className="!text-xl" />
              </div>
              <div className="h-10 w-px bg-white/10 hidden md:block" />
              <div>
                <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                  Per Video
                </p>
                <p className="text-xl font-bold text-[var(--color-accent)] mono-figure">
                  ${planData.earningPerVideoUsd}
                </p>
              </div>
              {boostTier && (
                <>
                  <div className="h-10 w-px bg-white/10 hidden md:block" />
                  <div>
                    <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-1.5">
                      Active Boost
                    </p>
                    <p className="text-sm font-bold text-[var(--green-500)] flex items-center gap-1">
                      <Zap size={14} />
                      {boostTier.multiplierDisplay}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] pointer-events-none rotate-12">
            <Layers size={320} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[24px] p-6 relative overflow-hidden group hover:border-[var(--color-accent)]/50 transition-colors">
            <div className="flex items-center gap-3 text-[var(--text-muted)] mb-4">
              <div className="p-2 bg-white/5 rounded-lg">
                <Calendar size={18} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest">Withdrawal</h3>
            </div>
            <p className="text-lg font-bold text-white tracking-tight">{nextWithdrawal}</p>
            {!isPremium && (
              <div className="mt-4 pt-4 border-t border-white/5">
                <p className="text-[10px] text-[var(--text-muted)] font-black uppercase mb-1">
                  Minimum
                </p>
                <p className="text-sm font-bold text-[var(--color-accent)]">
                  ₦{planData.withdrawalThresholdNgn.toLocaleString()}
                </p>
              </div>
            )}
          </div>

          <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[24px] p-6 relative overflow-hidden group hover:border-[var(--color-earn)]/50 transition-colors">
            <div className="flex items-center gap-3 text-[var(--text-muted)] mb-4">
              <div className="p-2 bg-white/5 rounded-lg">
                <Activity size={18} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest">Game Earnings</h3>
            </div>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-black text-white mono-figure tracking-tighter">
                ${planData.gameEarningsPerMinuteUsd}
              </p>
              <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase">/ min</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[32px] p-6 pt-2">
        <VideosFeedPreview earningPerVideoUsd={planData.earningPerVideoUsd} />
      </div>

      <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[32px] p-6 pt-2">
        <GamesFeedPreview earningsPerMinute={planData.gameEarningsPerMinuteUsd} />
      </div>
    </div>
  );
}
