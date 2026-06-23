import prisma from "@/lib/db";
import { isBoostPaymentType } from "@/lib/payment-types";
import { activatePlanPurchase, parsePlanFromPaymentRef } from "@/lib/plan-payment";
import { headers } from "next/headers";
import crypto from "crypto";
import { NextResponse } from "next/server";

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

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("x-paystack-signature");

  if (!signature) return new Response("No signature", { status: 401 });

  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (hash !== signature) return new Response("Invalid signature", { status: 401 });

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const reference = event.data.reference;

    const pending = await prisma.payment.findUnique({
      where: { paystackRef: reference },
    });

    if (pending && pending.status === "PENDING") {
      if (pending.type === "PLAN_PURCHASE" || pending.type === "PLAN_UPGRADE") {
        const plan = parsePlanFromPaymentRef(reference);
        if (plan) {
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
        }
      } else if (isBoostPaymentType(pending.type)) {
        await activateBoost(reference, pending.userId);
      }
    }
  }

  return NextResponse.json({ status: "ok" });
}
