import { fetchUsdToNgnRate } from "@/lib/exchange";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const data = await fetchUsdToNgnRate();
    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error("Exchange rate error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch exchange rate" },
      { status: 500 }
    );
  }
}
