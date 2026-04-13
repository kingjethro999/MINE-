import { auth } from "@/auth";
import prisma from "@/lib/db";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      plan: true,
      showAds: true,
      bankName: true,
      bankAccountNumber: true,
      bankAccountName: true,
      bankCode: true,
      createdAt: true,
    },
  });

  if (!user) {
    return Response.json({ success: false, error: "User not found" }, { status: 404 });
  }

  return Response.json({ success: true, data: user });
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: { showAds?: boolean; bankName?: string; bankAccountNumber?: string; bankAccountName?: string; bankCode?: string };
  
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const { showAds, bankName, bankAccountNumber, bankAccountName, bankCode } = body;

  const updateData: Record<string, unknown> = {};

  if (typeof showAds === "boolean") {
    updateData.showAds = showAds;
  }
  if (bankName !== undefined) updateData.bankName = bankName;
  if (bankAccountNumber !== undefined) updateData.bankAccountNumber = bankAccountNumber;
  if (bankAccountName !== undefined) updateData.bankAccountName = bankAccountName;
  if (bankCode !== undefined) updateData.bankCode = bankCode;

  if (Object.keys(updateData).length === 0) {
    return Response.json({ success: false, error: "No fields to update" }, { status: 400 });
  }

  try {
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
      select: {
        showAds: true,
        bankName: true,
        bankAccountNumber: true,
        bankAccountName: true,
        bankCode: true,
      },
    });

    return Response.json({ success: true, data: user });
  } catch (error) {
    console.error("Settings update error:", error);
    return Response.json({ success: false, error: "Failed to update settings" }, { status: 500 });
  }
}
