export const PLANS = {
  basic: {
    id: "basic",
    name: "Basic",
    price: 2000,
    earningPerHour: 20,
    earningPerSecond: 20 / 3600,
    autoMine: false,
    withdrawalDays: [28],
    withdrawalThreshold: 15000,
    disbursementDays: 5,
    withdrawalsPerMonth: 1,
    gameEarningsPerMinute: 5,
    minDownlines: 10,
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 5000,
    earningPerHour: 50,
    earningPerSecond: 50 / 3600,
    autoMine: false,
    withdrawalDays: [14, 28],
    withdrawalThreshold: 15000,
    disbursementDays: 3,
    withdrawalsPerMonth: 2,
    gameEarningsPerMinute: 10,
    minDownlines: 5,
  },
  premium: {
    id: "premium",
    name: "Premium",
    price: 7500,
    earningPerHour: 100,
    earningPerSecond: 100 / 3600,
    autoMine: true,
    autoMineDurations: [3, 5, 7],
    withdrawalDays: "every_thursday",
    withdrawalThreshold: 0,
    disbursementDays: 0.25,
    withdrawalsPerMonth: Infinity,
    gameEarningsPerMinute: 20,
    minDownlines: 2,
  },
} as const;

export type PlanId = keyof typeof PLANS;

export const AXES_TIERS = {
  starter: {
    id: "starter",
    label: "Starter Axe",
    price: 500,
    bonusPerSecond: 0.05,
    durationDays: 7,
  },
  advanced: {
    id: "advanced",
    label: "Advanced Axe",
    price: 1000,
    bonusPerSecond: 0.1,
    durationDays: 7,
  },
  elite: {
    id: "elite",
    label: "Elite Axe",
    price: 2000,
    bonusPerSecond: 0.5,
    durationDays: 7,
  },
} as const;

export type AxesTierId = keyof typeof AXES_TIERS;
