import { auth } from "@/auth";
import prisma from "@/lib/db";
import { initializePayment } from "@/lib/paystack";
import { PLANS } from "@/lib/plans";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id || !session?.user?.email) return new Response("Unauthorized", { status: 401 });

  const formData = await req.formData();
  const type = formData.get("type") as string;
  const planId = formData.get("plan") as string;

  if (type === "PLAN_PURCHASE" || type === "PLAN_UPGRADE") {
    const targetPlan = PLANS[planId.toLowerCase() as keyof typeof PLANS];
    if (!targetPlan) return redirect("/onboarding?error=invalid_plan");

    // In a full implementation we calculate differential top-up for UPGRADE here.
    // Simplifying to full price for brevity.
    const price = targetPlan.price;

    const ref = `TX_${Date.now()}_${session.user.id}`;

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
    if (pstk.status && pstk.data.authorization_url) {
      redirect(pstk.data.authorization_url);
    }
  }

  redirect("/dashboard");
}
