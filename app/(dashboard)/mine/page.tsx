import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { PLANS, PlanId, AXES_TIERS, AxesTierId } from "@/lib/plans";
import { Lock, Layers } from "lucide-react";
import StakingTicker from "@/components/staking/StakingTicker";
import StakingControls from "@/components/staking/StakingControls";

export default async function MinePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
       miningSessions: { where: { endedAt: null }, take: 1 },
       axesPurchases: { where: { active: true, expiresAt: { gt: new Date() } } }
    }
  });

  if (!user) redirect("/login");

  const planData = PLANS[user.plan.toLowerCase() as PlanId];
  const activeSessionFromDb = user.miningSessions[0];
  
  // Booster rate
  let boosterRate = 0;
  user.axesPurchases.forEach(axe => {
    const tier = AXES_TIERS[axe.tier as AxesTierId];
    if (tier) boosterRate += tier.bonusPerSecond;
  });

  const baseRate = planData.earningPerHour / 3600;
  const totalRate = baseRate + boosterRate;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Mining session control</h1>
        <p className="text-[var(--text-secondary)] font-medium">Start or stop your earning session and track your live reward rate.</p>
      </header>

      <div className="max-w-2xl mx-auto">
        <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[40px] p-10 flex flex-col items-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent opacity-20" />
          
          <div className="mb-8">
            <StakingTicker 
              initialBalance={user.coinsBalance} 
              initialRate={totalRate} 
              isActive={!!activeSessionFromDb} 
            />
          </div>

          <div className={`relative mb-10 p-16 rounded-[40px] border-2 transition-all duration-700 ${
            activeSessionFromDb ? "border-green-500 shadow-[0_0_50px_rgba(34,197,94,0.15)] scale-105" : "border-white/5 opacity-50 grayscale"
          }`}>
            <div className="relative z-10">
               <Layers size={100} className={activeSessionFromDb ? "text-green-500" : "text-[var(--surface-600)]"} />
            </div>
            
            {activeSessionFromDb && (
              <>
                <div className="absolute inset-0 rounded-[40px] border-2 border-green-500 animate-[ping_3s_infinite] opacity-40"></div>
                <div className="absolute -inset-4 border border-green-500/20 rounded-[48px] animate-[spin_10s_linear_infinite]"></div>
              </>
            )}
          </div>

          <StakingControls 
            activeSession={activeSessionFromDb ? {
              autoMine: activeSessionFromDb.autoMine,
              autoDays: activeSessionFromDb.autoDays,
              startedAt: activeSessionFromDb.startedAt
            } : null}
            planData={{
              autoMine: planData.autoMine,
              autoMineDurations: planData.autoMineDurations
            }}
          />

        </div>

        <div className="mt-8 p-6 bg-blue-500/5 border border-blue-500/10 rounded-3xl">
           <div className="flex gap-4 items-start">
              <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
                 <Lock size={18} className="text-blue-400" />
              </div>
              <div>
                 <p className="text-xs font-bold text-white mb-1">How this works</p>
                 <p className="text-[10px] text-[var(--text-muted)] leading-relaxed font-medium">
                   Rewards only accrue while your session is active. Your plan rate and active axe bonus (if any) determine accumulation speed. No rewards are guaranteed beyond your configured plan rules.
                 </p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
