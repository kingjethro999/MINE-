"use client";

import { useState } from "react";
import { PLANS, PlanId } from "@/lib/plans";
import { ShieldCheck, Check } from "lucide-react";
import { toast } from "sonner";

export default function PlanSelector() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("basic");
  const plan = PLANS[selectedPlan];

  const handlePay = async () => {
    // In a real app, this would call a server action or API to get a Paystack access code
    // and then use the Paystack inline JS SDK to open the popup.
    // For now, we'll simulate the post request to illustrate the flow.
    
    toast.info(`Initializing payment for ${plan.name} plan...`);
    
    const form = document.createElement("form");
    form.method = "POST";
    form.action = "/api/paystack/initialize";

    const typeInput = document.createElement("input");
    typeInput.type = "hidden";
    typeInput.name = "type";
    typeInput.value = "PLAN_PURCHASE";
    form.appendChild(typeInput);

    const planInput = document.createElement("input");
    planInput.type = "hidden";
    planInput.name = "plan";
    planInput.value = selectedPlan.toUpperCase();
    form.appendChild(planInput);

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <div className="w-full max-w-5xl space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.keys(PLANS) as PlanId[]).map((id) => {
          const p = PLANS[id];
          const isSelected = selectedPlan === id;
          
          return (
            <div 
              key={id} 
              onClick={() => setSelectedPlan(id)}
              className={`cursor-pointer p-6 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
                isSelected 
                  ? "border-[var(--gold-500)] bg-[var(--surface-700)] shadow-[0_0_30px_rgba(212,175,55,0.1)] scale-[1.02]" 
                  : "border-[var(--surface-600)] bg-[var(--surface-800)] hover:border-[var(--surface-500)] opacity-70 hover:opacity-100"
              }`}
            >
              {isSelected && (
                <div className="absolute top-3 right-3 text-[var(--gold-500)]">
                  <Check size={20} />
                </div>
              )}
              
              <div className="mb-4">
                <h3 className={`text-lg font-bold tracking-wider ${isSelected ? "text-[var(--gold-400)]" : "text-white"}`}>
                  {p.name.toUpperCase()}
                </h3>
                <div className="mt-2 text-2xl font-bold text-white mono-figure">
                  ₦ {p.price.toLocaleString()}
                </div>
              </div>

              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                  <ShieldCheck size={14} className="text-[var(--gold-500)] shrink-0 mt-0.5" />
                  Earn ₦ {p.earningPerHour}/hr
                </li>
                <li className="flex items-start gap-2 text-xs text-[var(--text-secondary)]">
                  <ShieldCheck size={14} className="text-[var(--gold-500)] shrink-0 mt-0.5" />
                  ₦ {p.gameEarningsPerMinute}/min in games
                </li>
              </ul>
            </div>
          );
        })}
      </div>

      <div className="bg-[var(--surface-800)] p-8 rounded-2xl border border-[var(--gold-500)] max-w-lg mx-auto card-lift relative shadow-[0_0_40px_rgba(212,175,55,0.05)] text-center">
        <h2 className="text-xl font-bold text-white tracking-widest uppercase mb-2">Order Summary</h2>
        <p className="text-[var(--text-muted)] text-sm mb-6">You've selected the <span className="text-[var(--gold-400)] font-bold">{plan.name}</span> plan.</p>
        
        <div className="flex justify-between items-center py-4 border-y border-[var(--surface-600)] mb-8">
          <span className="text-[var(--text-secondary)]">Activation Fee</span>
          <span className="text-2xl font-bold text-white mono-figure">₦ {plan.price.toLocaleString()}</span>
        </div>

        <button 
          onClick={handlePay}
          className="w-full bg-[var(--gold-500)] text-black font-bold text-sm tracking-widest uppercase py-4 rounded-lg hover:bg-[var(--gold-600)] transition-colors shadow-lg shadow-[var(--gold-500)]/20"
        >
          Pay with Paystack
        </button>
        <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em] mt-4 font-medium italic">
          Secure Payment • Instant Activation
        </p>
      </div>
    </div>
  );
}
