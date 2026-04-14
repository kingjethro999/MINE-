import { auth } from "@/auth";
import prisma from "@/lib/db";
import { PLANS, PlanId } from "@/lib/plans";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    amount: number;
    bankName: string;
    bankCode?: string;
    accountNumber: string;
    accountName: string;
  };

  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  const { amount, bankName, bankCode, accountNumber, accountName } = body;

  if (!amount || !bankName || !accountNumber || !accountName) {
    return Response.json({ success: false, error: "Missing required fields" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { referralsMade: true },
  });
  if (!user) {
    return Response.json({ success: false, error: "User not found" }, { status: 404 });
  }

  const planData = PLANS[user.plan.toLowerCase() as PlanId];
  const threshold = planData.withdrawalThreshold;
  const downlineCount = user.referralsMade.length;

  if (downlineCount < planData.minDownlines) {
    return Response.json(
      {
        success: false,
        error: `You need at least ${planData.minDownlines} downlines to withdraw. You currently have ${downlineCount}.`,
      },
      { status: 400 }
    );
  }

  if (amount < threshold) {
    return Response.json(
      { success: false, error: `Minimum withdrawal is ₦${threshold.toLocaleString()}` },
      { status: 400 }
    );
  }

  if (amount > user.coinsBalance) {
    return Response.json(
      { success: false, error: "Insufficient balance" },
      { status: 400 }
    );
  }

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          coinsBalance: { decrement: amount },
          bankName,
          bankCode: bankCode || null,
          bankAccountNumber: accountNumber,
          bankAccountName: accountName,
        },
      }),
      prisma.withdrawal.create({
        data: {
          userId: user.id,
          amount,
          bankName,
          accountNumber,
          accountName,
        },
      }),
    ]);

    return Response.json({ success: true });
  } catch (error) {
    console.error("Withdrawal error:", error);
    return Response.json(
      { success: false, error: "Failed to process withdrawal" },
      { status: 500 }
    );
  }
}
