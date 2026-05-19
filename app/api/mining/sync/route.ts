import { auth } from "@/auth";
import prisma from "@/lib/db";
import { PLANS, PlanId, AXES_TIERS } from "@/lib/plans";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      miningSessions: { where: { endedAt: null }, take: 1 },
      axesPurchases: { where: { active: true, expiresAt: { gt: new Date() } } }
    }
  });

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const activeSession = user.miningSessions[0];
  if (!activeSession) return NextResponse.json({ active: false });

  const now = new Date();
  const planData = PLANS[user.plan.toLowerCase() as PlanId];

  // Base rate
  const earningPerSec = planData.earningPerSecond;

  // Booster rate
  let boosterEarningPerSec = 0;
  user.axesPurchases.forEach(axe => {
    const tier = AXES_TIERS[axe.tier as keyof typeof AXES_TIERS];
    if (tier) boosterEarningPerSec += tier.bonusPerSecond;
  });

  const totalRate = earningPerSec + boosterEarningPerSec;

  // Calculate seconds since last sync
  const lastSync = activeSession.lastSyncAt || activeSession.startedAt;
  const diffSec = Math.floor((now.getTime() - lastSync.getTime()) / 1000);

  if (diffSec <= 0) {
    return NextResponse.json({
      success: true,
      added: 0,
      balance: user.coinsBalance,
      rate: totalRate
    });
  }

  // Cap sync interval to prevent extreme calculations if user was gone for a month?
  // Actually, for automated mining, we want it all.
  const amountToAdd = diffSec * totalRate;
  const commission = amountToAdd * 0.05;

  // Check for referrer
  const referral = await prisma.referral.findUnique({
    where: { refereeId: user.id }
  });

  // Check if session should end (Standard 24h)
  let shouldEnd = false;
  const sessionAgeSec = Math.floor((now.getTime() - activeSession.startedAt.getTime()) / 1000);

  if (!activeSession.autoMine) {
    if (sessionAgeSec >= 86400) { // 24h
       shouldEnd = true;
    }
  } else {
    // Automated check
    const maxAgeSec = (activeSession.autoDays || 1) * 86400;
    if (sessionAgeSec >= maxAgeSec) {
      shouldEnd = true;
    }
  }

  const ops: any[] = [
    prisma.user.update({
      where: { id: user.id },
      data: {
        coinsBalance: { increment: amountToAdd },
        totalEarned: { increment: amountToAdd }
      }
    }),
    prisma.miningSession.update({
      where: { id: activeSession.id },
      data: {
        lastSyncAt: now,
        endedAt: shouldEnd ? now : null,
        earned: { increment: amountToAdd }
      }
    })
  ];

  if (referral) {
    ops.push(
      prisma.user.update({
        where: { id: referral.referrerId },
        data: {
          coinsBalance: { increment: commission },
          totalEarned: { increment: commission }
        }
      }),
      prisma.referralEarning.create({
        data: {
          referrerId: referral.referrerId,
          refereeId: user.id,
          month: now.toISOString().slice(0, 7),
          refereeEarned: amountToAdd,
          commission: commission
        }
      })
    );
  }

  await prisma.$transaction(ops);

  return NextResponse.json({
    success: true,
    added: amountToAdd,
    balance: user.coinsBalance + amountToAdd,
    rate: totalRate,
    sessionEnded: shouldEnd
  });
}
