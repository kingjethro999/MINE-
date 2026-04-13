import { NextRequest, NextResponse } from "next/server";
import { verifyAccount } from "@/lib/paystack";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const accountNumber = searchParams.get("accountNumber");
  const bankCode = searchParams.get("bankCode");

  if (!accountNumber || !bankCode) {
    return NextResponse.json(
      { success: false, error: "Account number and bank code are required" },
      { status: 400 }
    );
  }

  try {
    const result = await verifyAccount(accountNumber, bankCode);
    
    if (result.success && result.data) {
      return NextResponse.json({
        success: true,
        data: {
          accountName: result.data.account_name,
          accountNumber: result.data.account_number,
        },
      });
    }

    return NextResponse.json(
      { success: false, error: result.error || "Account verification failed" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Account verification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify account" },
      { status: 500 }
    );
  }
}
