import { auth } from "@/auth";
import prisma from "@/lib/db";
import { PLANS, PlanId } from "@/lib/plans";
import { getActiveBoostMultiplier, applyBoost } from "@/lib/boosts";
import { NextResponse } from "next/server";

const HR_CAP_MINUTES = 60;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { gameId, duration } = await req.json();

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const recentSessions = await prisma.playSession.aggregate({
      where: { userId: user.id, createdAt: { gte: oneHourAgo } },
      _sum: { minutesPlayed: true },
    });

    const minutesThisHour = recentSessions._sum.minutesPlayed ?? 0;
    const remainingCap = Math.max(0, HR_CAP_MINUTES - minutesThisHour);
    const billableMinutes = Math.min(duration, remainingCap);

    if (billableMinutes <= 0) {
      return NextResponse.json({ success: true, awarded: 0, capped: true });
    }

    const planData = PLANS[user.plan.toLowerCase() as PlanId];
    const boostMultiplier = await getActiveBoostMultiplier(user.id);
    const baseAmount = billableMinutes * planData.gameEarningsPerMinuteUsd;
    const coinsAwarded = applyBoost(baseAmount, boostMultiplier);

    await prisma.$transaction([
      prisma.playSession.create({
        data: {
          userId: user.id,
          gameId: String(gameId),
          minutesPlayed: billableMinutes,
          coinsAwarded,
          boostMultiplier,
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {
          coinsBalance: { increment: coinsAwarded },
          totalEarned: { increment: coinsAwarded },
        },
      }),
    ]);

    return NextResponse.json({ success: true, awarded: coinsAwarded, boostMultiplier });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
