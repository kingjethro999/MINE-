"use client";

import { PLANS, PlanId, getUpgradePrice } from "@/lib/plans";
import { ArrowUpCircle, Check, Zap } from "lucide-react";
import { toast } from "sonner";

export default function UpgradeOptions({ currentPlanId }: { currentPlanId: PlanId }) {
  const upgrades = (["basic", "pro", "premium"] as PlanId[]).filter((id) => {
    const price = getUpgradePrice(currentPlanId, id);
    return price !== null && price > 0;
  });

  const handleUpgrade = (targetPlanId: PlanId) => {
    const price = getUpgradePrice(currentPlanId, targetPlanId);
    if (!price) return;

    toast.info(`Initializing upgrade to ${PLANS[targetPlanId].name}...`);

    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/paystack/initialize";

    const typeInput = document.createElement("input");
    typeInput.type = "hidden";
    typeInput.name = "type";
    typeInput.value = "PLAN_UPGRADE";
    form.appendChild(typeInput);

    const planInput = document.createElement("input");
    planInput.type = "hidden";
    planInput.name = "plan";
    planInput.value = targetPlanId.toUpperCase();
    form.appendChild(planInput);

    document.body.appendChild(form);
    form.submit();
  };

  if (upgrades.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
      {upgrades.map((id) => {
        const plan = PLANS[id];
        const topUp = getUpgradePrice(currentPlanId, id)!;

        return (
          <div
            key={id}
            className="p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] flex flex-col"
          >
            <div className="flex items-center gap-2 mb-4">
              <ArrowUpCircle size={20} className="text-[var(--color-accent)]" />
              <h3 className="text-xl font-bold text-white">{plan.name}</h3>
            </div>

            <p className="text-3xl font-black text-[var(--color-accent)] font-mono mb-1">
              +₦{topUp.toLocaleString()}
            </p>
            <p className="text-xs text-[var(--text-muted)] mb-6">Top-up to upgrade</p>

            <ul className="space-y-3 text-sm text-[var(--text-secondary)] mb-8 flex-1">
              <li className="flex items-center gap-2">
                <Check size={14} className="text-[var(--color-earn)]" />
                <span>${plan.earningPerVideoUsd}/video · {plan.dailyVideoLimit}/day</span>
              </li>
              <li className="flex items-center gap-2">
                <Zap size={14} className="text-[var(--color-earn)]" />
                <span>${plan.gameEarningsPerMinuteUsd}/min in games</span>
              </li>
            </ul>

            <button
              onClick={() => handleUpgrade(id)}
              className="w-full py-4 rounded-xl font-bold bg-[var(--color-accent)] text-[#0a0f0d] hover:bg-[var(--gold-600)] transition"
            >
              Upgrade to {plan.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}
