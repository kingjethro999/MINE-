import { auth } from "@/auth";
import prisma from "@/lib/db";
import { PLANS, PlanId } from "@/lib/plans";
import { getDailyVideoWatchCount } from "@/lib/videos";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const planData = PLANS[user.plan.toLowerCase() as PlanId];
  const watchedToday = await getDailyVideoWatchCount(user.id);
  const remaining = Math.max(0, planData.dailyVideoLimit - watchedToday);

  return NextResponse.json({
    dailyLimit: planData.dailyVideoLimit,
    watchedToday,
    remaining,
    canWatch: remaining > 0,
  });
}
