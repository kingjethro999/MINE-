import { auth } from "@/auth";
import prisma from "@/lib/db";
import { initializePayment } from "@/lib/paystack";
import { PLANS, getUpgradePrice, planIdFromEnum } from "@/lib/plans";
import { buildPlanPaymentRef } from "@/lib/plan-payment";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id || !session?.user?.email) return new Response("Unauthorized", { status: 401 });

  const formData = await req.formData();
  const type = formData.get("type") as string;
  const planId = formData.get("plan") as string;

  if (type === "PLAN_PURCHASE" || type === "PLAN_UPGRADE") {
    const targetPlanId = planIdFromEnum(planId);
    const targetPlan = PLANS[targetPlanId];
    if (!targetPlan) {
      return redirect(type === "PLAN_UPGRADE" ? "/upgrade?error=invalid_plan" : "/onboarding?error=invalid_plan");
    }

    const user = await prisma.user.findUnique({ where: { id: session.user.id } });
    if (!user) return new Response("Unauthorized", { status: 401 });

    let price: number = targetPlan.price;
    if (type === "PLAN_UPGRADE") {
      const upgradePrice = getUpgradePrice(planIdFromEnum(user.plan), targetPlanId);
      if (upgradePrice === null || upgradePrice <= 0) {
        return redirect("/upgrade?error=invalid_upgrade");
      }
      price = upgradePrice;
    }

    const ref = buildPlanPaymentRef(planId, session.user.id);

    // Record pending transaction
    await prisma.payment.create({
      data: {
        userId: session.user.id,
        amount: price,
        type: type as any,
        paystackRef: ref,
        status: "PENDING"
      }
    });

    const pstk = await initializePayment(session.user.email, price, ref);
    if (pstk.status && pstk.data?.authorization_url) {
      redirect(pstk.data.authorization_url);
    }
    console.error("Paystack initialize failed:", pstk.message ?? pstk);
    redirect(type === "PLAN_UPGRADE" ? "/upgrade?error=paystack_init_failed" : "/onboarding?error=paystack_init_failed");
  }

  redirect("/dashboard");
}
