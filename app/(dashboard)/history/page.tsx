import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { History } from "lucide-react";
import HistoryPageClient from "@/components/history/HistoryPageClient";

export default async function HistoryPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <History size={28} className="text-[var(--color-accent)]" />
          <h1 className="text-3xl font-black text-white tracking-tight">Earnings History</h1>
        </div>
        <p className="text-[var(--text-secondary)] font-medium">
          All your earnings from videos and games in one place.
        </p>
      </header>

      <HistoryPageClient />
    </div>
  );
}
