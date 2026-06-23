import { auth } from "@/auth";
import prisma from "@/lib/db";
import { PLANS, PlanId } from "@/lib/plans";
import { getActiveBoostMultiplier, applyBoost } from "@/lib/boosts";
import { fetchVideoById } from "@/lib/pexels";
import { distributeReferralCommission } from "@/lib/mining";
import { getDailyVideoWatchCount } from "@/lib/videos";
import { NextResponse } from "next/server";

const MIN_WATCH_RATIO = 0.9;
const COOLDOWN_MS = 60_000;

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { pexelsVideoId, watchedSeconds, durationSeconds } = await req.json();

    if (!pexelsVideoId || !durationSeconds || durationSeconds <= 0) {
      return NextResponse.json({ error: "Invalid video data" }, { status: 400 });
    }

    const watchRatio = watchedSeconds / durationSeconds;
    if (watchRatio < MIN_WATCH_RATIO) {
      return NextResponse.json(
        { error: "Watch at least 90% of the video to earn" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const planData = PLANS[user.plan.toLowerCase() as PlanId];

    const watchedToday = await getDailyVideoWatchCount(user.id);
    if (watchedToday >= planData.dailyVideoLimit) {
      return NextResponse.json(
        {
          error: `Daily limit reached (${planData.dailyVideoLimit} videos/day on your plan)`,
          dailyLimit: planData.dailyVideoLimit,
          watchedToday,
        },
        { status: 429 }
      );
    }

    const recentWatch = await prisma.videoWatch.findFirst({
      where: {
        userId: user.id,
        watchedAt: { gte: new Date(Date.now() - COOLDOWN_MS) },
      },
    });

    if (recentWatch) {
      return NextResponse.json(
        { error: "Please wait before claiming another video reward" },
        { status: 429 }
      );
    }

    const video = await fetchVideoById(Number(pexelsVideoId));
    if (!video) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const boostMultiplier = await getActiveBoostMultiplier(user.id);
    const baseAmount = planData.earningPerVideoUsd;
    const amountUsd = applyBoost(baseAmount, boostMultiplier);

    await prisma.$transaction([
      prisma.videoWatch.create({
        data: {
          userId: user.id,
          pexelsVideoId: Number(pexelsVideoId),
          title: video.title,
          amountUsd,
          boostMultiplier,
        },
      }),
      prisma.user.update({
        where: { id: user.id },
        data: {
          coinsBalance: { increment: amountUsd },
          totalEarned: { increment: amountUsd },
        },
      }),
    ]);

    await distributeReferralCommission(user.id, amountUsd);

    return NextResponse.json({
      success: true,
      amountUsd,
      boostMultiplier,
      newBalance: user.coinsBalance + amountUsd,
    });
  } catch (error) {
    console.error("Video complete error:", error);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
