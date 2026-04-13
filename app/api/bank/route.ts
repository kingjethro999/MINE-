import { NextResponse } from "next/server";
import { getBanks } from "@/lib/paystack";

export async function GET() {
  try {
    const banks = await getBanks("Nigeria");
    
    const seen = new Set<string>();
    const formattedBanks = banks
      .filter((bank) => bank.active && !bank.is_deleted)
      .map((bank) => ({
        code: bank.code,
        name: bank.name,
      }))
      .filter((bank) => {
        if (seen.has(bank.code)) return false;
        seen.add(bank.code);
        return true;
      })
      .sort((a, b) => a.name.localeCompare(b.name));

    return NextResponse.json({ success: true, data: formattedBanks });
  } catch (error) {
    console.error("Failed to fetch banks:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch banks" },
      { status: 500 }
    );
  }
}
