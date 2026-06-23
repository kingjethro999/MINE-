import db from "./db";

export async function distributeReferralCommission(userId: string, earned: number) {
  if (earned <= 0) return;

  const referral = await db.referral.findUnique({
    where: { refereeId: userId },
  });

  if (!referral) return;

  const commission = earned * 0.05;

  await db.$transaction([
    db.user.update({
      where: { id: referral.referrerId },
      data: {
        coinsBalance: { increment: commission },
        totalEarned: { increment: commission },
      },
    }),
    db.referralEarning.create({
      data: {
        referrerId: referral.referrerId,
        refereeId: userId,
        month: new Date().toISOString().slice(0, 7),
        refereeEarned: earned,
        commission,
      },
    }),
  ]);
}
