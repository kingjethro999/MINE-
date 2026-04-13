import { auth } from "@/auth";
import prisma from "@/lib/db";
import { PLANS, PlanId } from "@/lib/plans";
import { computeEarned, distributeReferralCommission } from "@/lib/mining";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  const active = await prisma.miningSession.findFirst({
    where: { userId: session.user.id, endedAt: null },
    include: { user: true }
  });

  if (active) {
    const userPlan = active.user.plan.toLowerCase() as PlanId;
    const earned = await computeEarned(active.startedAt, userPlan, active.userId);

    await prisma.$transaction([
      prisma.miningSession.update({
        where: { id: active.id },
        data: { endedAt: new Date(), earned }
      }),
      prisma.user.update({
        where: { id: active.userId },
        data: {
          coinsBalance: { increment: earned },
          totalEarned: { increment: earned }
        }
      })
    ]);

    // Handle instant referral 5% commission calculation
    await distributeReferralCommission(active.userId, earned);
  }

  redirect("/mine");
}
