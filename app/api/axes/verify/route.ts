import { auth } from "@/auth";
import prisma from "@/lib/db";
import { verifyPayment } from "@/lib/paystack";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const trxref = url.searchParams.get("trxref");
  
  if (!trxref) redirect("/axes");

  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const pData = await verifyPayment(trxref);
  if (pData.status && pData.data.status === "success") {
    const pending = await prisma.payment.findUnique({ where: { paystackRef: trxref } });

    if (pending && pending.status === "PENDING" && pending.type === "AXES_UPGRADE") {
      // Decode tier from ref string: "AXE_starter_123456_userid"
      const tierMatch = trxref.split("_")[1];
      
      const now = new Date();
      const expires = new Date();
      expires.setDate(expires.getDate() + 7); // 7 days duration

      await prisma.$transaction([
        prisma.payment.update({
          where: { id: pending.id },
          data: { status: "SUCCESS" }
        }),
        // Invalidate old axes
        prisma.axesPurchase.updateMany({
          where: { userId: session.user.id, active: true },
          data: { active: false }
        }),
        // Add new axe
        prisma.axesPurchase.create({
          data: {
            userId: session.user.id,
            tier: tierMatch,
            purchasedAt: now,
            expiresAt: expires,
            active: true,
            paystackRef: trxref
          }
        })
      ]);
    }
  }

  redirect("/axes");
}
