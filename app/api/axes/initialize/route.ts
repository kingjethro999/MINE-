import { auth } from "@/auth";
import prisma from "@/lib/db";
import { AXES_TIERS, AxesTierId } from "@/lib/plans";
import { initializePayment } from "@/lib/paystack";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id || !session?.user?.email) return new Response("Unauthorized", { status: 401 });

  const formData = await req.formData();
  const tier = formData.get("tier") as string;

  const targetTier = AXES_TIERS[tier as AxesTierId];
  if (!targetTier) return redirect("/axes?error=invalid_tier");

  const price = targetTier.price;
  // A suffix indicating it's an axes payment + tier info
  const ref = `AXE_${tier}_${Date.now()}_${session.user.id}`;

  await prisma.payment.create({
    data: {
      userId: session.user.id,
      amount: price,
      type: "AXES_UPGRADE",
      paystackRef: ref,
      status: "PENDING"
    }
  });

  const pstk = await initializePayment(session.user.email, price, ref);
  if (pstk.status && pstk.data?.authorization_url) {
    redirect(pstk.data.authorization_url);
  }
  console.error("Paystack initialize failed:", pstk.message ?? pstk);
  redirect("/axes?error=paystack_init_failed");
}
