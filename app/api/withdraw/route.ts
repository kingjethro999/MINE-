import { auth } from "@/auth";
import prisma from "@/lib/db";
import { PLANS, PlanId } from "@/lib/plans";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) return new Response("Unauthorized", { status: 401 });

  const formData = await req.formData();
  const amountStr = formData.get("amount") as string;
  const bankName = formData.get("bankName") as string;
  const accountNumber = formData.get("accountNumber") as string;
  const accountName = formData.get("accountName") as string;

  const amount = parseFloat(amountStr);

  const user = await prisma.user.findUnique({ where: { id: session.user.id }});
  if (!user) return redirect("/login");

  const planData = PLANS[user.plan.toLowerCase() as PlanId];
  const Threshold = planData.withdrawalThreshold;

  if (amount >= 1000 && user.coinsBalance >= amount && user.coinsBalance >= Threshold) {
    await prisma.$transaction([
      prisma.user.update({
        where: { id: user.id },
        data: {
          coinsBalance: { decrement: amount },
          bankName,
          bankAccountNumber: accountNumber,
          bankAccountName: accountName
        }
      }),
      prisma.withdrawal.create({
        data: {
          userId: user.id,
          amount,
          bankName,
          accountNumber,
          accountName
        }
      })
    ]);
  }

  redirect("/withdraw");
}
