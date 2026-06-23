"use client";

import { useEffect, useState } from "react";
import { Video, Gamepad2, Zap, History } from "lucide-react";
import CurrencyDisplay from "@/components/ui/CurrencyDisplay";

interface HistoryItem {
  id: string;
  type: "video" | "game";
  title: string;
  amountUsd: number;
  boostMultiplier: number;
  minutesPlayed?: number;
  date: string;
}

export default function HistoryPageClient() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then((data) => setItems(data.items ?? []))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const totalUsd = items.reduce((sum, i) => sum + i.amountUsd, 0);

  return (
    <div className="space-y-8">
      <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[var(--text-muted)] mb-2">
            Total from history
          </p>
          <CurrencyDisplay amountUsd={totalUsd} size="md" />
        </div>
        <History size={40} className="text-[var(--color-accent)] opacity-20" />
      </div>

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-16 bg-[var(--surface-700)] rounded-xl animate-pulse" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="text-center py-16 text-[var(--text-muted)]">
          <History size={48} className="mx-auto mb-4 opacity-20" />
          <p className="font-bold text-sm">No earnings yet</p>
          <p className="text-xs mt-1">Watch videos or play games to start earning</p>
        </div>
      ) : (
        <ul className="divide-y divide-[var(--surface-600)] bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl overflow-hidden">
          {items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between px-6 py-4 hover:bg-white/[0.02] transition-colors"
            >
              <div className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    item.type === "video"
                      ? "bg-blue-500/10 text-blue-400"
                      : "bg-purple-500/10 text-purple-400"
                  }`}
                >
                  {item.type === "video" ? <Video size={18} /> : <Gamepad2 size={18} />}
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{item.title}</p>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">
                    {item.type === "game" && item.minutesPlayed
                      ? `${item.minutesPlayed} min played · `
                      : ""}
                    {new Date(item.date).toLocaleDateString()}{" "}
                    {new Date(item.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <CurrencyDisplay amountUsd={item.amountUsd} size="sm" />
                {item.boostMultiplier > 1 && (
                  <span className="text-[9px] text-[var(--green-500)] font-bold flex items-center gap-1 justify-end mt-0.5">
                    <Zap size={10} />
                    {item.boostMultiplier}x boost
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
