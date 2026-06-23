import type { PaymentType } from "@prisma/client";

/** Legacy AXES_UPGRADE kept for existing Paystack records */
export const BOOST_PAYMENT_TYPES = ["BOOST_UPGRADE", "AXES_UPGRADE"] as const satisfies readonly PaymentType[];

export function isBoostPaymentType(type: PaymentType): boolean {
  return (BOOST_PAYMENT_TYPES as readonly string[]).includes(type);
}

export function isBoostPaymentReference(reference: string): boolean {
  return reference.startsWith("BOOST_") || reference.startsWith("AXE_");
}
