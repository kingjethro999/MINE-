import db from "./db";
import { BOOST_TIERS, BoostTierId } from "./plans";

export async function getActiveBoostMultiplier(userId: string): Promise<number> {
  const now = new Date();
  const active = await db.boostPurchase.findFirst({
    where: { userId, active: true, expiresAt: { gt: now } },
    orderBy: { purchasedAt: "desc" },
  });

  if (!active) return 1;

  const tier = BOOST_TIERS[active.tier as BoostTierId];
  return tier?.earningsMultiplier ?? 1;
}

export async function getActiveBoost(userId: string) {
  const now = new Date();
  return db.boostPurchase.findFirst({
    where: { userId, active: true, expiresAt: { gt: now } },
    orderBy: { purchasedAt: "desc" },
  });
}

export function applyBoost(amount: number, multiplier: number): number {
  return amount * multiplier;
}
