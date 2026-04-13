import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { PLANS, PlanId, AXES_TIERS, AxesTierId } from "@/lib/plans";
import { Pickaxe, Power } from "lucide-react";

export default async function MinePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) redirect("/login");

  const planData = PLANS[user.plan.toLowerCase() as PlanId];
  
  // Get active session
  const activeSession = await prisma.miningSession.findFirst({
    where: { userId: user.id, endedAt: null },
  });

  // Get active axe
  const now = new Date();
  const activeAxe = await prisma.axesPurchase.findFirst({
    where: { userId: user.id, active: true, expiresAt: { gt: now } },
    orderBy: { purchasedAt: "desc" },
  });

  const baseRatePerSec = planData.earningPerSecond;
  const axeBonusPerSec = activeAxe ? AXES_TIERS[activeAxe.tier as AxesTierId].bonusPerSecond : 0;
  const totalRatePerSec = baseRatePerSec + axeBonusPerSec;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Mining Hub</h1>
        <p className="text-[var(--text-secondary)]">Start and manage your active mining sessions.</p>
      </header>

      <div className="max-w-2xl mx-auto">
        <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl p-10 flex flex-col items-center">
          
          <div className="mb-4">
            <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider ${
              activeSession 
                ? "bg-[var(--green-500)] text-white shadow-[0_0_12px_rgba(34,197,94,0.3)]" 
                : "bg-[var(--surface-600)] text-[var(--text-muted)]"
            }`}>
              {activeSession ? "MINING IN PROGRESS..." : "STANDBY"}
            </span>
          </div>

          <div className={`relative mb-8 p-12 rounded-full border-4 ${
            activeSession ? "border-[var(--green-500)] mining-icon-active" : "border-[var(--surface-600)]"
          }`}>
            <Pickaxe size={80} className={activeSession ? "text-[var(--green-500)]" : "text-[var(--surface-600)]"} />
            
            {/* Pulsing ring if active */}
            {activeSession && (
              <div className="absolute inset-0 rounded-full border-4 border-[var(--green-500)] animate-ping opacity-20"></div>
            )}
          </div>

          <div className="text-center mb-10 w-full">
            <p className="text-[var(--text-muted)] text-sm mb-2 uppercase tracking-wider font-semibold">Current Rate</p>
            <div className="flex flex-col items-center gap-1">
              <span className="text-3xl font-bold text-white mono-figure">
                +₦ {totalRatePerSec.toFixed(5)} <span className="text-sm text-[var(--text-muted)] font-sans">/ sec</span>
              </span>
              
              {activeAxe && (
                <div className="inline-flex items-center gap-1.5 mt-2 bg-[var(--surface-600)] px-3 py-1 rounded-full border border-[var(--gold-700)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[var(--gold-500)] animate-pulse"></span>
                  <span className="text-xs text-[var(--gold-400)] font-medium">Axe Boost Active (+₦{axeBonusPerSec}/s)</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex gap-4 w-full">
            {/* Client-side form submissions to API routes in actual implementation */}
            {!activeSession ? (
              <form action="/api/mining/start" method="POST" className="w-full">
                <button className="flex items-center justify-center gap-3 w-full py-4 bg-[var(--green-600)] hover:bg-[var(--green-500)] text-white font-bold tracking-widest uppercase rounded-xl transition-all card-lift shadow-[0_4px_24px_rgba(34,197,94,0.2)]">
                  <Power size={20} />
                  Start Mining
                </button>
              </form>
            ) : (
              <form action="/api/mining/stop" method="POST" className="w-full">
                <button className="flex items-center justify-center gap-3 w-full py-4 bg-[var(--surface-600)] hover:bg-[var(--gray-600)] text-white font-bold tracking-widest uppercase rounded-xl transition-all border border-[var(--surface-600)]">
                  <Power size={20} className="text-[var(--color-danger)]" />
                  Stop & Collect
                </button>
              </form>
            )}
          </div>

          {planData.autoMine && (
            <div className="mt-8 pt-6 border-t border-[var(--surface-600)] w-full w-full">
              <p className="text-sm font-semibold tracking-wider uppercase text-[var(--gold-400)] mb-3">Premium Auto-Mine</p>
              <form action="/api/mining/start" method="POST" className="grid grid-cols-3 gap-3">
                {planData.autoMineDurations?.map(days => (
                  <button key={days} name="autoDays" value={days} className="py-2.5 bg-[var(--surface-700)] border border-[var(--gold-700)] text-sm text-[var(--gold-500)] font-bold rounded-lg hover:bg-[var(--surface-600)] transition-colors">
                    {days} Days
                  </button>
                ))}
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
