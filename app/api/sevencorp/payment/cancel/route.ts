import { NextRequest, NextResponse } from "next/server";
import { disableSubscription } from "@/lib/paystack";

const WEBHOOK_SECRET = process.env.SEVENCORP_WEBHOOK_SECRET ?? "";

/**
 * POST /api/sevencorp/payment/cancel
 *
 * Called by the 7.Corp backend when a user cancels their subscription.
 * Disables the Paystack subscription so it stops charging the card monthly.
 * Protected by the shared SEVENCORP_WEBHOOK_SECRET header.
 */
export async function POST(req: NextRequest) {
  const secret = req.headers.get("x-sevencorp-secret") ?? "";
  if (!WEBHOOK_SECRET || secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: { subscription_code?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.subscription_code) {
    return NextResponse.json({ error: "subscription_code required" }, { status: 400 });
  }

  try {
    const result = await disableSubscription(body.subscription_code);
    if (!result.status) {
      console.error("[sevencorp/payment/cancel] disable failed:", result);
      return NextResponse.json(
        { error: result.message ?? "Failed to disable subscription" },
        { status: 502 }
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[sevencorp/payment/cancel] error:", (err as Error).message);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
