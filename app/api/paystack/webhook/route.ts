import prisma from "@/lib/db";
import { isBoostPaymentType } from "@/lib/payment-types";
import { activatePlanPurchase, parsePlanFromPaymentRef } from "@/lib/plan-payment";
import { headers } from "next/headers";
import crypto from "crypto";
import { NextResponse } from "next/server";

const SEVENCORP_BACKEND =
  (process.env.SEVENCORP_BACKEND_URL ?? "http://100.58.214.89:4000").replace(/\/$/, "");
const SEVENCORP_WEBHOOK_SECRET = process.env.SEVENCORP_WEBHOOK_SECRET ?? "";

/** Forward a successful 7Corp payment to the 7Corp backend for fulfillment. */
async function notifySevencorp(reference: string) {
  if (!SEVENCORP_WEBHOOK_SECRET) {
    console.error("[webhook] SEVENCORP_WEBHOOK_SECRET not set — cannot notify 7Corp backend");
    return;
  }
  try {
    const res = await fetch(`${SEVENCORP_BACKEND}/api/payments/webhook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-sevencorp-secret": SEVENCORP_WEBHOOK_SECRET,
      },
      body: JSON.stringify({ reference, status: "success", verified: true }),
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[webhook] 7Corp notification failed (${res.status}):`, text.slice(0, 300));
    }
  } catch (err) {
    console.error("[webhook] 7Corp notification error:", (err as Error).message);
  }
}

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
    const reference: string = event.data.reference;

    // ── 7.Corp payments ───────────────────────────────────────────────────────
    // References prefixed with "7CORP_" belong to the 7Corp platform.
    // Mines doesn't store these users — just forward the notification.
    if (reference.startsWith("7CORP_")) {
      await notifySevencorp(reference);
      return NextResponse.json({ status: "ok" });
    }

    // ── Mines-native payments ─────────────────────────────────────────────────
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
