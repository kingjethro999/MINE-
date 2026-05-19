export const PLANS = {
  basic: {
    id: "basic",
    name: "Starter Node",
    price: 1500,
    earningPerHour: 15,
    earningPerSecond: 15 / 3600,
    autoMine: false,
    autoMineDurations: [],
    withdrawalDays: [28],
    withdrawalThreshold: 15000,
    disbursementDays: 5,
    withdrawalsPerMonth: 1,
    gameEarningsPerMinute: 5,
    minDownlines: 10,
  },
  pro: {
    id: "pro",
    name: "Advanced Node",
    price: 3000,
    earningPerHour: 45,
    earningPerSecond: 45 / 3600,
    autoMine: false,
    autoMineDurations: [],
    withdrawalDays: [14, 28],
    withdrawalThreshold: 15000,
    disbursementDays: 3,
    withdrawalsPerMonth: 2,
    gameEarningsPerMinute: 10,
    minDownlines: 5,
  },
  premium: {
    id: "premium",
    name: "Elite Validator",
    price: 5000,
    earningPerHour: 120,
    earningPerSecond: 120 / 3600,
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
    label: "Core-1 Sync Node",
    price: 500,
    bonusPerSecond: 0.05,
    durationDays: 7,
  },
  advanced: {
    id: "advanced",
    label: "Neural-V Cluster",
    price: 1000,
    bonusPerSecond: 0.1,
    durationDays: 7,
  },
  elite: {
    id: "elite",
    label: "Quantum Lattice Relay",
    price: 2000,
    bonusPerSecond: 0.5,
    durationDays: 7,
  },
} as const;

export type AxesTierId = keyof typeof AXES_TIERS;
