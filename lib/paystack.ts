/** Base app URL — set NEXT_PUBLIC_APP_URL in .env.local (e.g. http://localhost:3000). */
export function getAppUrl(): string {
  const url = process.env.NEXT_PUBLIC_APP_URL?.trim() || "http://localhost:3000";
  return url.replace(/\/$/, "");
}

/** Attach this in Paystack Dashboard → Settings → API Keys & Webhooks → Callback URL */
export function getPaystackCallbackUrl(): string {
  return `${getAppUrl()}/api/paystack/callback`;
}

export async function initializePayment(
  email: string,
  amount: number,
  ref: string,
  currency?: string,
  callbackUrl?: string
) {
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      amount: amount * 100,
      reference: ref,
      ...(currency ? { currency } : {}),
      callback_url: callbackUrl ?? getPaystackCallbackUrl(),
    }),
  });
  return res.json();
}

// ── Auto-renewing subscriptions (Paystack plans) ─────────────────────────────
// One Paystack plan (PLN code) per (product plan, currency). Paystack re-charges
// the card every month; the checkout is just transaction/initialize with `plan`.

/** In-memory cache of created plan codes: "USD:basic" -> "PLN_xxx". */
const planCodeCache = new Map<string, string>();

const PAYSTACK_PLAN_ENV: Record<string, string | undefined> = {
  basic: process.env.SEVENCORP_PLAN_BASIC,
  pro: process.env.SEVENCORP_PLAN_PRO,
  premium: process.env.SEVENCORP_PLAN_PREMIUM,
};

/** Create (or reuse) a monthly Paystack plan for a 7.Corp plan+currency. */
export async function getOrCreatePlan(
  planId: string,
  amount: number,
  currency: string
): Promise<string> {
  const cacheKey = `${currency}:${planId}`;

  // Explicit override (user-created plans) wins.
  const envCode = PAYSTACK_PLAN_ENV[planId];
  if (envCode) {
    planCodeCache.set(cacheKey, envCode);
    return envCode;
  }

  const cached = planCodeCache.get(cacheKey);
  if (cached) return cached;

  const amountKobo = Math.round(amount * 100);
  const name = `7CORP_${planId.toUpperCase()}_${currency}`;

  const res = await fetch("https://api.paystack.co/plan", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      amount: amountKobo,
      interval: "monthly",
      currency,
    }),
  });
  const data = await res.json();

  if (!data.status || !data.data?.plan_code) {
    // Likely a duplicate-name error — find the existing plan by name.
    const listRes = await fetch(
      `https://api.paystack.co/plan?perPage=100&interval=monthly&currency=${currency}`,
      {
        headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
      }
    );
    const list = await listRes.json();
    const existing = (list.data ?? []).find(
      (p: { name?: string; plan_code?: string; amount?: number }) =>
        p.name === name && p.plan_code
    );
    if (existing?.plan_code) {
      planCodeCache.set(cacheKey, existing.plan_code);
      return existing.plan_code;
    }
    throw new Error(`Failed to create Paystack plan: ${data.message}`);
  }

  planCodeCache.set(cacheKey, data.data.plan_code);
  return data.data.plan_code;
}

/** Initialize a plan-backed checkout — Paystack auto-creates a monthly subscription on first payment. */
export async function initializeSubscription(
  email: string,
  ref: string,
  planCode: string,
  callbackUrl?: string
) {
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      reference: ref,
      plan: planCode,
      callback_url: callbackUrl ?? getPaystackCallbackUrl(),
    }),
  });
  return res.json();
}

/** Disable a subscription so Paystack stops charging it. */
export async function disableSubscription(subscriptionCode: string) {
  const subRes = await fetch(
    `https://api.paystack.co/subscription/${encodeURIComponent(subscriptionCode)}`,
    {
      headers: { Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}` },
    }
  );
  const sub = await subRes.json();
  const emailToken = sub.data?.email_token;
  if (!sub.status || !emailToken) {
    return { status: false, message: sub.message ?? "Could not find subscription" };
  }

  const disableRes = await fetch(
    `https://api.paystack.co/subscription/${encodeURIComponent(subscriptionCode)}/disable`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: subscriptionCode, token: emailToken }),
    }
  );
  return disableRes.json();
}

export async function verifyPayment(reference: string) {
  const res = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
  });
  return res.json();
}

export interface PaystackBank {
  id: number;
  name: string;
  slug: string;
  code: string;
  longcode: string;
  gateway: string | null;
  pay_with_bank: boolean;
  active: boolean;
  is_deleted: boolean;
  country: string;
  currency: string;
  type: string;
  logo: string;
}

export async function getBanks(country: string = "Nigeria"): Promise<PaystackBank[]> {
  const res = await fetch(`https://api.paystack.co/bank?country=${country.toLowerCase()}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
    next: { revalidate: 60 * 60 * 24 }, // Cache for 24 hours
  });
  const data = await res.json();
  return data.data || [];
}

export interface AccountVerificationResult {
  account_number: string;
  account_name: string;
  bank_id: number;
  verification_status: string;
}

export async function verifyAccount(
  accountNumber: string,
  bankCode: string
): Promise<{ success: boolean; data?: AccountVerificationResult; error?: string }> {
  const res = await fetch("https://api.paystack.co/bank/resolve", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
    },
  });

  // Actually, we need to use the correct endpoint
  const actualRes = await fetch(
    `https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      },
    }
  );
  const data = await actualRes.json();

  if (data.status) {
    return { success: true, data: data.data };
  }

  return { success: false, error: data.message || "Failed to verify account" };
}
