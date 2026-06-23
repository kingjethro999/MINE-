import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { PLANS, PlanId } from "@/lib/plans";
import { Video } from "lucide-react";
import WatchPageClient from "@/components/videos/WatchPageClient";

export default async function WatchPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) redirect("/login");

  const planData = PLANS[user.plan.toLowerCase() as PlanId];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <Video size={28} className="text-[var(--color-accent)]" />
          <h1 className="text-3xl font-black text-white tracking-tight">Watch & Earn</h1>
        </div>
        <p className="text-[var(--text-secondary)] font-medium">
          Earn{" "}
          <span className="text-[var(--color-accent)] font-bold">
            ${planData.earningPerVideoUsd}
          </span>{" "}
          per video · {planData.dailyVideoLimit} videos/day on your {planData.name} plan.
        </p>
      </header>

      <WatchPageClient
        earningPerVideoUsd={planData.earningPerVideoUsd}
        dailyVideoLimit={planData.dailyVideoLimit}
      />
    </div>
  );
}
