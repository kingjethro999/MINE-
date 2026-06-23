import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { planIdFromEnum } from "@/lib/plans";
import UpgradeOptions from "@/components/upgrade/UpgradeOptions";
import { ArrowUpCircle } from "lucide-react";

export default async function UpgradePage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) redirect("/login");

  if (!user.activePlanPurchased) redirect("/onboarding");

  const currentPlanId = planIdFromEnum(user.plan);

  if (currentPlanId === "premium") {
    redirect("/dashboard");
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl mx-auto">
      <header className="text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] mb-4">
          <ArrowUpCircle size={28} />
        </div>
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Upgrade Your Plan</h1>
        <p className="text-[var(--text-secondary)]">
          Pay only the difference. Higher plans earn more per video and unlock better withdrawal terms.
        </p>
      </header>

      <UpgradeOptions currentPlanId={currentPlanId} />
    </div>
  );
}
