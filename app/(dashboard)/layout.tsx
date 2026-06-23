import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";
import MobileNav from "@/components/layout/MobileNav";
import { ExchangeRateProvider } from "@/components/providers/ExchangeRateProvider";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (!(session.user as { activePlanPurchased?: boolean }).activePlanPurchased) {
    redirect("/onboarding");
  }

  return (
    <ExchangeRateProvider>
      <div className="min-h-screen bg-[var(--bg-primary)]">
        <Sidebar
          plan={(session.user as { plan?: string }).plan ?? "basic"}
          isAdmin={(session.user as { isAdmin?: boolean }).isAdmin ?? false}
        />
        <MobileNav
          plan={(session.user as { plan?: string }).plan}
          isAdmin={(session.user as { isAdmin?: boolean }).isAdmin}
        />
        <main className="lg:pl-64 min-h-screen relative pb-24 lg:pb-0">
          <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 relative z-10">
            {children}
          </div>
          <div className="bg-grid absolute inset-0 pointer-events-none" />
        </main>
      </div>
    </ExchangeRateProvider>
  );
}
