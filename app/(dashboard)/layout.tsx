import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/layout/Sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  // Enforce onboarding plan payment
  if (!(session.user as any).activePlanPurchased) {
    redirect("/onboarding");
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      <Sidebar 
        plan={(session.user as any).plan} 
        isAdmin={(session.user as any).isAdmin} 
      />
      <main className="pl-64 h-full relative">
        <div className="max-w-6xl mx-auto p-8 relative z-10">
          {children}
        </div>
        <div className="bg-grid absolute inset-0 pointer-events-none" />
      </main>
    </div>
  );
}
