"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";

const STORAGE_KEY = "mines_usd_ngn_rate";

interface ExchangeRateContextValue {
  rate: number | null;
  loading: boolean;
  refreshRate: (force?: boolean) => Promise<number | null>;
}

const ExchangeRateContext = createContext<ExchangeRateContextValue>({
  rate: null,
  loading: true,
  refreshRate: async () => null,
});

function readCachedRate(): { rate: number; fetchedAt: string } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.rate && typeof parsed.rate === "number") return parsed;
  } catch {}
  return null;
}

function writeCachedRate(rate: number) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ rate, fetchedAt: new Date().toISOString() })
  );
}

async function fetchRateFromApi(): Promise<number> {
  const res = await fetch("/api/exchange-rate");
  const data = await res.json();
  if (!data.success || !data.rate) throw new Error("Failed to fetch rate");
  return data.rate;
}

export function ExchangeRateProvider({ children }: { children: ReactNode }) {
  const [rate, setRate] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshRate = useCallback(async (force = false) => {
    if (!force) {
      const cached = readCachedRate();
      if (cached) {
        setRate(cached.rate);
        setLoading(false);
        return cached.rate;
      }
    }

    setLoading(true);
    try {
      const newRate = await fetchRateFromApi();
      writeCachedRate(newRate);
      setRate(newRate);
      return newRate;
    } catch {
      const cached = readCachedRate();
      if (cached) setRate(cached.rate);
      return cached?.rate ?? null;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshRate(false);
  }, [refreshRate]);

  return (
    <ExchangeRateContext.Provider value={{ rate, loading, refreshRate }}>
      {children}
    </ExchangeRateContext.Provider>
  );
}

export function useExchangeRate() {
  return useContext(ExchangeRateContext);
}

/** Call on withdraw page to force-refresh the cached rate */
export function useRefreshExchangeOnMount() {
  const { refreshRate } = useExchangeRate();
  useEffect(() => {
    refreshRate(true);
  }, [refreshRate]);
}
