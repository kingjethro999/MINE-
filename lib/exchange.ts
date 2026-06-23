const EXCHANGE_API_BASE = "https://v6.exchangerate-api.com/v6";

export interface ExchangeRateResult {
  rate: number;
  fetchedAt: string;
}

export async function fetchUsdToNgnRate(): Promise<ExchangeRateResult> {
  const apiKey = process.env.EXCHANGE_RATE_API;
  if (!apiKey) {
    throw new Error("EXCHANGE_RATE_API is not configured");
  }

  const res = await fetch(`${EXCHANGE_API_BASE}/${apiKey}/latest/USD`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    throw new Error(`Exchange rate API error: ${res.status}`);
  }

  const data = await res.json();
  const rate = data?.conversion_rates?.NGN;

  if (!rate || typeof rate !== "number") {
    throw new Error("Invalid exchange rate response");
  }

  return {
    rate,
    fetchedAt: new Date().toISOString(),
  };
}

export function usdToNgn(usd: number, rate: number): number {
  return usd * rate;
}

export function ngnToUsd(ngn: number, rate: number): number {
  return ngn / rate;
}
