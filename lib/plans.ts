export const PLANS = {
  basic: {
    id: "basic",
    name: "Starter",
    price: 1500,
    earningPerVideoUsd: 2,
    dailyVideoLimit: 5,
    withdrawalDays: [28] as number[],
    withdrawalThresholdNgn: 15000,
    disbursementDays: 5,
    withdrawalsPerMonth: 1,
    gameEarningsPerMinuteUsd: 0.03,
    minDownlines: 10,
  },
  pro: {
    id: "pro",
    name: "Advanced",
    price: 3000,
    earningPerVideoUsd: 3,
    dailyVideoLimit: 10,
    withdrawalDays: [14, 28] as number[],
    withdrawalThresholdNgn: 15000,
    disbursementDays: 3,
    withdrawalsPerMonth: 2,
    gameEarningsPerMinuteUsd: 0.06,
    minDownlines: 5,
  },
  premium: {
    id: "premium",
    name: "Elite",
    price: 5000,
    earningPerVideoUsd: 5,
    dailyVideoLimit: 20,
    withdrawalDays: "every_thursday" as const,
    withdrawalThresholdNgn: 0,
    disbursementDays: 0.25,
    withdrawalsPerMonth: Infinity,
    gameEarningsPerMinuteUsd: 0.12,
    minDownlines: 2,
    adsInGames: false,
  },
} as const;

export type PlanId = keyof typeof PLANS;

export const PLAN_ORDER: PlanId[] = ["basic", "pro", "premium"];

export function planIdFromEnum(plan: string): PlanId {
  return plan.toLowerCase() as PlanId;
}

export function getUpgradePrice(currentPlanId: PlanId, targetPlanId: PlanId): number | null {
  const currentIdx = PLAN_ORDER.indexOf(currentPlanId);
  const targetIdx = PLAN_ORDER.indexOf(targetPlanId);
  if (currentIdx < 0 || targetIdx <= currentIdx) return null;
  return PLANS[targetPlanId].price - PLANS[currentPlanId].price;
}

export function getAvailableUpgrades(currentPlanId: PlanId): PlanId[] {
  const currentIdx = PLAN_ORDER.indexOf(currentPlanId);
  return PLAN_ORDER.slice(currentIdx + 1);
}

export const BOOST_TIERS = {
  starter: {
    id: "starter",
    label: "Starter Boost",
    price: 500,
    earningsMultiplier: 1.25,
    multiplierDisplay: "+25%",
    durationHours: 24,
    color: "green",
  },
  advanced: {
    id: "advanced",
    label: "Advanced Boost",
    price: 1000,
    earningsMultiplier: 1.5,
    multiplierDisplay: "+50%",
    durationHours: 24,
    color: "gold",
  },
  elite: {
    id: "elite",
    label: "Elite Boost",
    price: 2000,
    earningsMultiplier: 2,
    multiplierDisplay: "+100%",
    durationHours: 24,
    color: "amber",
  },
} as const;

export type BoostTierId = keyof typeof BOOST_TIERS;

/** @deprecated use BOOST_TIERS */
export const AXES_TIERS = BOOST_TIERS;
export type AxesTierId = BoostTierId;

/** Premium users never see site ads unless they opt in via settings */
export function shouldShowSiteAds(plan: string, showAds: boolean): boolean {
  if (plan === "PREMIUM") return showAds;
  return true;
}
