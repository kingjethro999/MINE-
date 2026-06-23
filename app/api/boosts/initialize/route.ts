import { auth } from "@/auth";
import prisma from "@/lib/db";
import { BOOST_TIERS, BoostTierId } from "@/lib/plans";
import { initializePayment } from "@/lib/paystack";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id || !session?.user?.email) {
    return new Response("Unauthorized", { status: 401 });
  }

  const formData = await req.formData();
  const tier = formData.get("tier") as string;

  const targetTier = BOOST_TIERS[tier as BoostTierId];
  if (!targetTier) return redirect("/boosts?error=invalid_tier");

  const ref = `BOOST_${tier}_${Date.now()}_${session.user.id}`;

  await prisma.payment.create({
    data: {
      userId: session.user.id,
      amount: targetTier.price,
      type: "BOOST_UPGRADE",
      paystackRef: ref,
      status: "PENDING",
    },
  });

  const pstk = await initializePayment(session.user.email, targetTier.price, ref);
  if (pstk.status && pstk.data?.authorization_url) {
    redirect(pstk.data.authorization_url);
  }

  redirect("/boosts?error=paystack_init_failed");
}
