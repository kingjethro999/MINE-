import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { Pickaxe } from "lucide-react";
import PlanSelector from "@/components/onboarding/PlanSelector";

export default async function OnboardingPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) redirect("/login");

  // If already purchased, send to dashboard!
  if (user.activePlanPurchased) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] px-4 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[var(--gold-500)] text-[#0a0f0d] mb-6 shadow-[0_0_32px_rgba(212,175,55,0.4)]">
          <Pickaxe size={40} />
        </div>
        <h1 className="text-4xl font-extrabold text-white tracking-widest uppercase mb-4">Choose Your Path</h1>
        <p className="text-[var(--text-secondary)] max-w-lg mx-auto leading-relaxed">
          Select a mining plan to activate your account. Each plan offers different earning rates and withdrawal limits.
        </p>
      </div>

      <PlanSelector />
    </div>
  );
}
