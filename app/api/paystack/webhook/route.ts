import prisma from "@/lib/db";
import { AXES_TIERS } from "@/lib/plans";
import { headers } from "next/headers";
import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("x-paystack-signature");

  if (!signature) return new Response("No signature", { status: 401 });

  // Verify signature
  const hash = crypto
    .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY!)
    .update(body)
    .digest("hex");

  if (hash !== signature) return new Response("Invalid signature", { status: 401 });

  const event = JSON.parse(body);

  if (event.event === "charge.success") {
    const data = event.data;
    const reference = data.reference;

    const pending = await prisma.payment.findUnique({
      where: { paystackRef: reference }
    });

    if (pending && pending.status === "PENDING") {
      if (pending.type === "PLAN_PURCHASE" || pending.type === "PLAN_UPGRADE") {
        await prisma.$transaction([
          prisma.payment.update({
            where: { id: pending.id },
            data: { status: "SUCCESS" }
          }),
          prisma.user.update({
            where: { id: pending.userId },
            data: { activePlanPurchased: true }
          })
        ]);
      } else if (pending.type === "AXES_UPGRADE") {
        const tierMatch = reference.split("_")[1];
        const now = new Date();
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        await prisma.$transaction([
          prisma.payment.update({
            where: { id: pending.id },
            data: { status: "SUCCESS" }
          }),
          prisma.axesPurchase.updateMany({
            where: { userId: pending.userId, active: true },
            data: { active: false }
          }),
          prisma.axesPurchase.create({
            data: {
              userId: pending.userId,
              tier: tierMatch,
              purchasedAt: now,
              expiresAt: expires,
              active: true,
              paystackRef: reference
            }
          })
        ]);
      }
    }
  }

  return NextResponse.json({ status: "ok" });
}
