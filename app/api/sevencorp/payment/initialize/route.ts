import { NextRequest, NextResponse } from "next/server";
import { initializePayment } from "@/lib/paystack";

const WEBHOOK_SECRET = process.env.SEVENCORP_WEBHOOK_SECRET ?? "";

/**
 * POST /api/sevencorp/payment/initialize
 *
 * Called by the 7.Corp backend to create a Paystack checkout session.
 * Protected by the shared SEVENCORP_WEBHOOK_SECRET header.
 * Returns { authorization_url, reference, access_code } on success.
 *
 * The reference will be prefixed with "7CORP_" so the Paystack webhook
 * can route it back to the 7.Corp notification handler.
 */
export async function POST(req: NextRequest) {
  // Verify shared secret
  const secret = req.headers.get("x-sevencorp-secret") ?? "";
  if (!WEBHOOK_SECRET || secret !== WEBHOOK_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    email: string;
    amount: number;
    currency: "NGN" | "USD";
    reference: string;
    planId: string;
    userId: string;
    callbackUrl: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (!body.email || !body.amount || !body.reference || !body.callbackUrl) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  // Validate the reference starts with 7CORP_ so the webhook can route it
  if (!body.reference.startsWith("7CORP_")) {
    return NextResponse.json({ error: "Invalid reference prefix" }, { status: 400 });
  }

  try {
    // initializePayment in lib/paystack.ts already multiplies amount by 100
    // For USD we pass the dollar amount; Paystack handles USD if international
    // payments are enabled on the account.
    const result = await initializePayment(
      body.email,
      body.amount,
      body.reference,
      body.currency,
      body.callbackUrl
    );

    if (!result.status || !result.data?.authorization_url) {
      console.error("[sevencorp/payment] Paystack init failed:", result);
      return NextResponse.json(
        { error: result.message ?? "Paystack initialization failed" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      authorization_url: result.data.authorization_url,
      reference: result.data.reference,
      access_code: result.data.access_code,
    });
  } catch (err) {
    console.error("[sevencorp/payment] error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
