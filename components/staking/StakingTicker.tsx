"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, Coins } from "lucide-react";

interface StakingTickerProps {
  initialBalance: number;
  initialRate: number; // per second
  isActive: boolean;
}

export default function StakingTicker({ initialBalance, initialRate, isActive }: StakingTickerProps) {
  const [displayBalance, setDisplayBalance] = useState(initialBalance);
  const [rate, setRate] = useState(initialRate);
  const [active, setActive] = useState(isActive);
  const balanceRef = useRef(initialBalance);

  useEffect(() => {
    if (!active) return;

    // Ticker for UI smoothness (updates every 100ms)
    const ticker = setInterval(() => {
      balanceRef.current += (rate / 10);
      setDisplayBalance(balanceRef.current);
    }, 100);

    // Sync with server every 30 seconds to persist earnings
    const syncer = setInterval(async () => {
      try {
        const res = await fetch("/api/mining/sync", { method: "POST" });
        const data = await res.json();
        if (data.success) {
          balanceRef.current = data.balance;
          setRate(data.rate);
          if (data.sessionEnded) {
            setActive(false);
          }
        }
      } catch (e) {
        console.error("Sync failed", e);
      }
    }, 30000);

    return () => {
      clearInterval(ticker);
      clearInterval(syncer);
    };
  }, [active, rate]);

  return (
    <div className="flex flex-col items-center">
      <div className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-80 flex items-center gap-2">
        <Activity size={12} className={active ? "text-green-500 animate-pulse" : ""} />
        Real-time Validator Yield
      </div>
      <div className="text-4xl md:text-5xl font-black text-white mono-figure tracking-tighter flex items-center gap-2">
        <span className="text-[var(--color-accent)] font-sans">₦</span>
        {displayBalance.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 })}
      </div>
      {active && (
        <div className="mt-2 text-[10px] text-green-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
          <Coins size={10} />
          +₦{(rate / 3600).toFixed(6)} per tick
        </div>
      )}
    </div>
  );
}
