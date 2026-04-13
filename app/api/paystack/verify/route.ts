import { auth } from "@/auth";
import prisma from "@/lib/db";
import { verifyPayment } from "@/lib/paystack";
import { redirect } from "next/navigation";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const trxref = url.searchParams.get("trxref");
  
  if (!trxref) redirect("/dashboard");

  const pData = await verifyPayment(trxref);
  if (pData.status && pData.data.status === "success") {
    const pending = await prisma.payment.findUnique({ where: { paystackRef: trxref } });
    if (pending && pending.status === "PENDING") {
      await prisma.$transaction([
        prisma.payment.update({
          where: { id: pending.id },
          data: { status: "SUCCESS" }
        }),
        prisma.user.update({
          where: { id: pending.userId },
          // A full impl would look up the specific plan attached to the payment
          // Here we just unlock the user immediately to Dashboard.
          data: { activePlanPurchased: true }
        })
      ]);
    }
  }

  redirect("/dashboard");
}
