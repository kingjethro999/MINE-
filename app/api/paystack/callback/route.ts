import prisma from "@/lib/db";
import { verifyPayment } from "@/lib/paystack";
import { isBoostPaymentReference, isBoostPaymentType } from "@/lib/payment-types";
import { activatePlanPurchase, parsePlanFromPaymentRef } from "@/lib/plan-payment";
import { redirect } from "next/navigation";

async function activateBoost(reference: string, userId: string) {
  const tierMatch = reference.split("_")[1];
  const now = new Date();
  const expires = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  await prisma.$transaction([
    prisma.payment.updateMany({
      where: { paystackRef: reference, status: "PENDING" },
      data: { status: "SUCCESS" },
    }),
    prisma.boostPurchase.updateMany({
      where: { userId, active: true },
      data: { active: false },
    }),
    prisma.boostPurchase.create({
      data: {
        userId,
        tier: tierMatch,
        purchasedAt: now,
        expiresAt: expires,
        active: true,
        paystackRef: reference,
      },
    }),
  ]);
}

export async function GET(req: Request) {
  const url = new URL(req.url);
  const reference = url.searchParams.get("reference") ?? url.searchParams.get("trxref");

  if (!reference) {
    redirect("/dashboard?status=error&message=missing_reference");
  }

  const isBoostPayment = isBoostPaymentReference(reference);

  const pData = await verifyPayment(reference);

  if (!pData.status || pData.data?.status !== "success") {
    redirect(
      isBoostPayment
        ? "/boosts?status=failed&message=payment_not_verified"
        : "/dashboard?status=failed&message=payment_not_verified"
    );
  }

  const pending = await prisma.payment.findUnique({
    where: { paystackRef: reference },
  });

  if (!pending) {
    redirect(
      isBoostPayment
        ? "/boosts?status=error&message=payment_not_found"
        : "/dashboard?status=error&message=payment_not_found"
    );
  }

  if (pending.status === "SUCCESS") {
    redirect(
      isBoostPayment
        ? "/boosts?status=success&message=already_processed"
        : "/dashboard?status=success&message=already_processed"
    );
  }

  if (pending.status !== "PENDING") {
    redirect(isBoostPayment ? "/boosts?status=checked" : "/dashboard?status=checked");
  }

  if (pending.type === "PLAN_PURCHASE" || pending.type === "PLAN_UPGRADE") {
    const plan = parsePlanFromPaymentRef(reference);
    if (!plan) {
      redirect("/dashboard?status=error&message=invalid_plan_reference");
    }
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: pending.id },
        data: { status: "SUCCESS" },
      }),
      prisma.user.update({
        where: { id: pending.userId },
        data: activatePlanPurchase(plan),
      }),
    ]);
    redirect("/dashboard?status=success&message=plan_activated");
  }

  if (isBoostPaymentType(pending.type)) {
    await activateBoost(reference, pending.userId);
    redirect("/boosts?status=success&message=boost_activated");
  }

  redirect(isBoostPayment ? "/boosts?status=checked" : "/dashboard?status=checked");
}
