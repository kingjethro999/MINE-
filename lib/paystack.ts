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
