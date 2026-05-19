import prisma from "@/lib/db";
import { verifyPayment } from "@/lib/paystack";
import { redirect } from "next/navigation";

/**
 * Paystack redirects here after payment (browser redirect).
 * Dashboard callback URL: {NEXT_PUBLIC_APP_URL}/api/paystack/callback
 * Local: http://localhost:3000/api/paystack/callback
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const reference =
    url.searchParams.get("reference") ?? url.searchParams.get("trxref");

  if (!reference) {
    redirect("/dashboard?status=error&message=missing_reference");
  }

  const pData = await verifyPayment(reference);
  const isAxePayment = reference.startsWith("AXE_");

  if (!pData.status || pData.data?.status !== "success") {
    redirect(
      isAxePayment
        ? "/axes?status=failed&message=payment_not_verified"
        : "/dashboard?status=failed&message=payment_not_verified"
    );
  }

  const pending = await prisma.payment.findUnique({
    where: { paystackRef: reference },
  });

  if (!pending) {
    redirect(
      isAxePayment
        ? "/axes?status=error&message=payment_not_found"
        : "/dashboard?status=error&message=payment_not_found"
    );
  }

  if (pending.status === "SUCCESS") {
    redirect(
      isAxePayment
        ? "/axes?status=success&message=already_processed"
        : "/dashboard?status=success&message=already_processed"
    );
  }

  if (pending.status !== "PENDING") {
    redirect(
      isAxePayment ? "/axes?status=checked" : "/dashboard?status=checked"
    );
  }

  const now = new Date();

  if (pending.type === "PLAN_PURCHASE" || pending.type === "PLAN_UPGRADE") {
    await prisma.$transaction([
      prisma.payment.update({
        where: { id: pending.id },
        data: { status: "SUCCESS" },
      }),
      prisma.user.update({
        where: { id: pending.userId },
        data: { activePlanPurchased: true },
      }),
    ]);
    redirect("/dashboard?status=success&message=plan_activated");
  }

  if (pending.type === "AXES_UPGRADE") {
    const tierMatch = reference.split("_")[1];
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    await prisma.$transaction([
      prisma.payment.update({
        where: { id: pending.id },
        data: { status: "SUCCESS" },
      }),
      prisma.axesPurchase.updateMany({
        where: { userId: pending.userId, active: true },
        data: { active: false },
      }),
      prisma.axesPurchase.create({
        data: {
          userId: pending.userId,
          tier: tierMatch,
          purchasedAt: now,
          expiresAt: expires,
          active: true,
          paystackRef: reference,
        },
      }),
    ]);
    redirect("/axes?status=success&message=booster_activated");
  }

  redirect(isAxePayment ? "/axes?status=checked" : "/dashboard?status=checked");
}
