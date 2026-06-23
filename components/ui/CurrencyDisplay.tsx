"use client";

import { useState } from "react";
import { useExchangeRate } from "@/components/providers/ExchangeRateProvider";

interface CurrencyDisplayProps {
  amountUsd: number;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showSymbol?: boolean;
}

const sizeClasses = {
  sm: "text-lg",
  md: "text-2xl",
  lg: "text-4xl",
  xl: "text-5xl md:text-6xl",
};

export default function CurrencyDisplay({
  amountUsd,
  className = "",
  size = "lg",
  showSymbol = true,
}: CurrencyDisplayProps) {
  const { rate, loading } = useExchangeRate();
  const [showNgn, setShowNgn] = useState(true);

  const displayNgn = showNgn && rate;
  const ngnAmount = rate ? amountUsd * rate : 0;

  const formatted = displayNgn
    ? ngnAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : amountUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const symbol = displayNgn ? "₦" : "$";
  const hint = displayNgn ? "NGN" : "USD";

  return (
    <button
      type="button"
      onClick={() => setShowNgn((v) => !v)}
      className={`group text-left transition-opacity hover:opacity-90 cursor-pointer ${className}`}
      title={`Click to toggle currency (showing ${hint})`}
      disabled={loading && !rate}
    >
      <div className={`font-black text-white mono-figure tracking-tighter flex items-center gap-2 ${sizeClasses[size]}`}>
        {showSymbol && (
          <span className="text-[var(--color-accent)]">{symbol}</span>
        )}
        <span>{loading && !rate ? "..." : formatted}</span>
      </div>
      <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
        Tap to switch to {showNgn ? "USD" : "NGN"}
      </span>
    </button>
  );
}
