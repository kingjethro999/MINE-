import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { PLANS, PlanId } from "@/lib/plans";
import prisma from "@/lib/db";
import GamesFeedPreview from "@/components/games/GamesFeedPreview";
import { Calendar, Activity, Zap, Layers } from "lucide-react";
import DashboardBalanceTicker from "@/components/dashboard/DashboardBalanceTicker";

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
  let nextWithdrawal = "Next withdrawal window pending";
  if (!isPremium) {
    if (planData.withdrawalDays[0] === 28) {
      nextWithdrawal = "28th Disbursement Cycle";
    } else {
      nextWithdrawal = "14th & 28th Cycles"; 
    }
  } else {
    nextWithdrawal = "Every Thursday (Priority)";
  }

  // Active mining check (rebranded as Staking)
  const activeSession = await prisma.miningSession.findFirst({
    where: { userId: user.id, endedAt: null },
  });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white mb-1 tracking-tight">Welcome back, {user.name}</h1>
          <p className="text-[var(--text-secondary)] font-medium">Account overview and live reward activity</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-xl">
           <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
           <span className="text-xs font-black text-green-500 uppercase tracking-widest">System online</span>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Balance Card Main */}
        <div className="lg:col-span-2 balance-card rounded-[32px] p-8 md:p-10 relative overflow-hidden card-lift shadow-2xl">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--text-muted)] text-xs font-bold uppercase tracking-[0.2em] mb-3 opacity-80">Accumulated Yield</p>
                <DashboardBalanceTicker 
                  initialBalance={user.coinsBalance} 
                  perHourRate={planData.earningPerHour} 
                  isActive={!!activeSession} 
                />
              </div>
              <div className={`text-[10px] font-black px-4 py-1.5 rounded-lg border border-white/10 uppercase tracking-[0.15em] shadow-lg ${user.plan === 'PREMIUM' ? 'bg-[var(--color-accent)] text-[#0a0f0d]' : 'bg-black/40 text-white'}`}>
                {user.plan} NODE
              </div>
            </div>

            <div className="mt-12 flex flex-wrap items-center gap-8 md:gap-12">
              <div className="group cursor-help">
                <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-1.5 group-hover:text-white transition-colors">Total rewards earned</p>
                <p className="text-xl font-bold text-white mono-figure">₦ {user.totalEarned.toLocaleString()}</p>
              </div>
              <div className="h-10 w-px bg-white/10 hidden md:block"></div>
              <div>
                <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-1.5">Validator Status</p>
                <div className="flex items-center gap-3 py-1 px-3 bg-black/30 rounded-full border border-white/5">
                  <span className={`w-2.5 h-2.5 rounded-full ${activeSession ? "bg-green-500 shadow-[0_0_12px_rgba(34,197,94,0.8)]" : "bg-red-500/50"}`}></span>
                  <span className={`text-[11px] font-black uppercase tracking-widest ${activeSession ? "text-green-400" : "text-red-400"}`}>
                    {activeSession ? "Earning active" : "Earning paused"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="absolute right-[-20px] bottom-[-20px] opacity-[0.03] pointer-events-none rotate-12">
            <Layers size={320} />
          </div>
        </div>

        {/* Info Cards Side */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6">
          <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[24px] p-6 relative overflow-hidden group hover:border-[var(--color-accent)]/50 transition-colors">
            <div className="flex items-center gap-3 text-[var(--text-muted)] mb-4">
              <div className="p-2 bg-white/5 rounded-lg">
                <Calendar size={18} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest">Withdrawal schedule</h3>
            </div>
            <p className="text-lg font-bold text-white tracking-tight">{nextWithdrawal}</p>
            {!isPremium && (
              <div className="mt-4 pt-4 border-t border-white/5">
                 <p className="text-[10px] text-[var(--text-muted)] font-black uppercase mb-1">Stability Threshold</p>
                 <p className="text-sm font-bold text-[var(--color-accent)]">₦{planData.withdrawalThreshold.toLocaleString()}</p>
              </div>
            )}
          </div>

          <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[24px] p-6 relative overflow-hidden group hover:border-[var(--color-earn)]/50 transition-colors">
            <div className="flex items-center gap-3 text-[var(--text-muted)] mb-4">
              <div className="p-2 bg-white/5 rounded-lg">
                <Activity size={18} />
              </div>
              <h3 className="text-xs font-black uppercase tracking-widest">Plan reward rate</h3>
            </div>
            <div className="flex items-baseline gap-2">
               <p className="text-2xl font-black text-white mono-figure tracking-tighter">₦ {planData.earningPerHour}</p>
               <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase">/ Hour</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
               <span className="flex h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
               <p className="text-green-500 font-bold text-[10px] uppercase tracking-widest mono-figure">+₦{(planData.earningPerHour / 3600).toFixed(4)} Per Tick</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Link Quick Access */}
      <div className="bg-gradient-to-r from-indigo-500/10 via-[var(--surface-800)] to-blue-500/10 border border-white/5 rounded-[24px] p-6 flex flex-col md:flex-row items-center justify-between gap-6">
         <div className="flex items-center gap-4 text-center md:text-left">
            <div className="p-3 bg-white/5 rounded-xl border border-white/5">
               <Zap size={24} className="text-[var(--color-accent)]" />
            </div>
            <div>
               <h4 className="font-bold text-white tracking-tight">Grow your referral rewards</h4>
               <p className="text-xs text-[var(--text-muted)]">Invite friends and earn 5% of eligible referral rewards based on platform rules.</p>
            </div>
         </div>
         <button className="px-6 py-3 bg-[var(--surface-700)] hover:bg-[var(--surface-600)] text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all border border-white/5 active:scale-95">
            Copy Affiliate ID
         </button>
      </div>

      {/* Games Strip */}
      <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[32px] p-6 pt-2">
        <GamesFeedPreview earningsPerMinute={planData.gameEarningsPerMinute} />
      </div>

      <section className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[24px] p-6 space-y-4">
        <h3 className="text-sm font-black uppercase tracking-widest text-white">Quick explanations</h3>
        <details className="rounded-xl border border-white/10 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-white">What does mining speed mean?</summary>
          <p className="mt-2 text-xs text-[var(--text-secondary)]">
            Mining speed is your current reward accumulation rate per second while your earning session is active.
          </p>
        </details>
        <details className="rounded-xl border border-white/10 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-white">How are game rewards added?</summary>
          <p className="mt-2 text-xs text-[var(--text-secondary)]">
            Eligible playtime in partner games can produce bonus credits. Your plan controls the per-minute reward rate.
          </p>
        </details>
        <details className="rounded-xl border border-white/10 p-4">
          <summary className="cursor-pointer text-sm font-semibold text-white">Why can my withdrawal be pending?</summary>
          <p className="mt-2 text-xs text-[var(--text-secondary)]">
            Requests are reviewed against your plan threshold, schedule, and account details before disbursement.
          </p>
        </details>
      </section>

    </div>
  );
}
