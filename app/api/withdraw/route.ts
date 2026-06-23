import { auth } from "@/auth";
import prisma from "@/lib/db";
import { PLANS, PlanId } from "@/lib/plans";
import { fetchUsdToNgnRate, usdToNgn, ngnToUsd } from "@/lib/exchange";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    amountNgn: number;
    exchangeRate: number;
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

  const { amountNgn, exchangeRate, bankName, bankCode, accountNumber, accountName } = body;

  if (!amountNgn || !bankName || !accountNumber || !accountName || !exchangeRate) {
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
  const threshold = planData.withdrawalThresholdNgn;
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

  if (amountNgn < threshold) {
    return Response.json(
      { success: false, error: `Minimum withdrawal is ₦${threshold.toLocaleString()}` },
      { status: 400 }
    );
  }

  const balanceNgn = usdToNgn(user.coinsBalance, exchangeRate);
  if (amountNgn > balanceNgn) {
    return Response.json({ success: false, error: "Insufficient balance" }, { status: 400 });
  }

  const amountUsd = ngnToUsd(amountNgn, exchangeRate);

  try {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          coinsBalance: { decrement: amountUsd },
          bankName,
          bankCode: bankCode || null,
          bankAccountNumber: accountNumber,
          bankAccountName: accountName,
        },
      }),
      prisma.withdrawal.create({
        data: {
          userId: user.id,
          amount: amountNgn,
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
