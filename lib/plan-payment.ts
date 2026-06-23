import { Plan } from "@prisma/client";

const PLAN_VALUES = new Set<string>(["BASIC", "PRO", "PREMIUM"]);

export function buildPlanPaymentRef(planId: string, userId: string): string {
  const plan = planId.toUpperCase();
  if (!PLAN_VALUES.has(plan)) throw new Error(`Invalid plan: ${planId}`);
  return `TX_${plan}_${Date.now()}_${userId}`;
}

export function parsePlanFromPaymentRef(ref: string): Plan | null {
  const plan = ref.split("_")[1]?.toUpperCase();
  if (!plan || !PLAN_VALUES.has(plan)) return null;
  return plan as Plan;
}

export function activatePlanPurchase(plan: Plan) {
  return {
    activePlanPurchased: true,
    plan,
  };
}
