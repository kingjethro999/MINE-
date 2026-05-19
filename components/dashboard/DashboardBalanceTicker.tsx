"use client";

import { useState, useEffect, useRef } from "react";

interface DashboardTickerProps {
  initialBalance: number;
  perHourRate: number;
  isActive: boolean;
}

export default function DashboardBalanceTicker({ initialBalance, perHourRate, isActive }: DashboardTickerProps) {
  const [displayBalance, setDisplayBalance] = useState(initialBalance);
  const balanceRef = useRef(initialBalance);
  const ratePerSec = perHourRate / 3600;

  useEffect(() => {
    if (!isActive) return;

    // Smooth counter
    const ticker = setInterval(() => {
      balanceRef.current += (ratePerSec / 10);
      setDisplayBalance(balanceRef.current);
    }, 100);

    // Persist to DB periodically
    const syncer = setInterval(async () => {
      try {
        const res = await fetch("/api/mining/sync", { method: "POST" });
        const data = await res.json();
        if (data.success) {
          balanceRef.current = data.balance;
        }
      } catch (e) {}
    }, 45000); // 45s on dashboard to save resources

    return () => {
      clearInterval(ticker);
      clearInterval(syncer);
    };
  }, [isActive, ratePerSec]);

  return (
    <div className="text-5xl md:text-6xl font-black text-white mono-figure tracking-tighter flex items-center gap-3">
      <span className="text-[var(--color-accent)]">₦</span>
      {displayBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
    </div>
  );
}
