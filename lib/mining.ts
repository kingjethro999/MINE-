import { PLANS, PlanId, AXES_TIERS, AxesTierId } from "./plans";
import db from "./db";

export async function getActiveAxesBonus(userId: string): Promise<number> {
  const now = new Date();
  const active = await db.axesPurchase.findFirst({
    where: { userId, active: true, expiresAt: { gt: now } },
    orderBy: { purchasedAt: "desc" },
  });
  if (!active) return 0;
  return AXES_TIERS[active.tier as AxesTierId].bonusPerSecond;
}

export async function computeEarned(startedAt: Date, plan: PlanId, userId: string, endTime?: Date): Promise<number> {
  const currentEnd = endTime || new Date();
  const secondsElapsed = (currentEnd.getTime() - startedAt.getTime()) / 1000;
  
  const baseEarnings = (secondsElapsed / 3600) * PLANS[plan].earningPerHour;
  const axesBonus = await getActiveAxesBonus(userId);
  const bonusEarnings = secondsElapsed * axesBonus;
  
  return baseEarnings + bonusEarnings;
}

export async function processMiningSessions(userId: string) {
  const active = await db.miningSession.findFirst({
    where: { userId, endedAt: null },
    include: { user: true }
  });

  if (!active) return;

  const now = new Date();
  const durationDays = active.autoDays || 1;
  const expiresAt = new Date(active.startedAt.getTime() + durationDays * 24 * 60 * 60 * 1000);

  if (now >= expiresAt) {
    // Session has expired, close it and add to balance
    const userPlan = active.user.plan.toLowerCase() as PlanId;
    const earned = await computeEarned(active.startedAt, userPlan, active.userId, expiresAt);

    await db.$transaction([
      db.miningSession.update({
        where: { id: active.id },
        data: { endedAt: expiresAt, earned }
      }),
      db.user.update({
        where: { id: active.userId },
        data: {
          coinsBalance: { increment: earned },
          totalEarned: { increment: earned }
        }
      })
    ]);

    await distributeReferralCommission(active.userId, earned);
  }
}

export async function distributeReferralCommission(userId: string, sessionEarned: number) {
  if (sessionEarned <= 0) return;

  const referral = await db.referral.findUnique({
    where: { refereeId: userId },
    include: { referrer: true },
  });

  if (referral) {
    const commission = sessionEarned * 0.05;
    
    await db.$transaction([
      db.user.update({
        where: { id: referral.referrerId },
        data: { coinsBalance: { increment: commission } },
      }),
      db.referralEarning.create({
        data: {
          referrerId: referral.referrerId,
          refereeId: userId,
          month: new Date().toISOString().slice(0, 7), // YYYY-MM
          refereeEarned: sessionEarned,
          commission: commission,
        },
      }),
    ]);
  }
}
