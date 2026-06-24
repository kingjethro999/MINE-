"use client";

import { useState } from "react";
import { PLANS, PlanId } from "@/lib/plans";
import { ShieldCheck, Check, Star, Zap } from "lucide-react";
import { toast } from "sonner";

export default function PlanSelector() {
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("basic");
  const plan = PLANS[selectedPlan];

  const handlePay = async () => {
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
      <div className="text-center mb-8">
        <p className="text-[var(--text-secondary)] text-sm">Select a plan to start earning</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.keys(PLANS) as PlanId[]).map((id) => {
          const p = PLANS[id];
          const isSelected = selectedPlan === id;
          
          return (
            <div 
              key={id} 
              onClick={() => setSelectedPlan(id)}
              className={`cursor-pointer p-8 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden ${
                isSelected 
                  ? "border-[var(--gold-500)] bg-[var(--surface-700)] shadow-[0_0_40px_rgba(212,175,55,0.15)] scale-[1.02]" 
                  : "border-[var(--surface-600)] bg-[var(--surface-800)] hover:border-[var(--surface-500)]"
              }`}
            >
              {isSelected && (
                <div className="absolute top-4 right-4 w-8 h-8 bg-[var(--gold-500)] rounded-full flex items-center justify-center">
                  <Check size={18} className="text-black" />
                </div>
              )}

              {id === 'premium' && (
                <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 to-yellow-500 text-black text-xs font-bold px-3 py-1 text-center uppercase tracking-wider">
                  Recommended
                </div>
              )}
              
              <div className="mb-6 mt-2">
                <div className="flex items-center gap-2 mb-2">
                  <Star size={16} className={id === 'premium' ? 'text-amber-400' : id === 'pro' ? 'text-blue-400' : 'text-gray-400'} />
                  <h3 className={`text-xl font-bold tracking-wider ${isSelected ? "text-[var(--gold-400)]" : "text-white"}`}>
                    {p.name.toUpperCase()}
                  </h3>
                </div>
                <div className="text-3xl font-bold text-white mono-figure">
                  ₦{p.price.toLocaleString()}
                </div>
                <p className="text-xs text-[var(--text-muted)] mt-1">One-time payment</p>
              </div>

              <div className="h-px bg-[var(--surface-600)] mb-6" />

              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-sm">
                  <Zap size={16} className="text-green-500" />
                  <span>Earn <strong className="text-white">${p.earningPerVideoUsd}/video</strong></span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Zap size={16} className="text-green-500" />
                  <span>Earn <strong className="text-white">${p.gameEarningsPerMinuteUsd}/min</strong> in games</span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Zap size={16} className="text-green-500" />
                  <span><strong className="text-white">{p.dailyVideoLimit} videos/day</strong></span>
                </li>
                {id === "premium" && (
                  <li className="flex items-center gap-3 text-sm text-green-400">
                    <Check size={16} />
                    <span>Priority withdrawals</span>
                  </li>
                )}
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
          <span className="text-2xl font-bold text-white mono-figure">₦{plan.price.toLocaleString()}</span>
        </div>

        <button 
          onClick={handlePay}
          className="w-full bg-[var(--gold-500)] text-black font-bold text-sm tracking-widest uppercase py-4 rounded-lg hover:bg-[var(--gold-600)] transition-colors shadow-lg shadow-[var(--gold-500)]/20"
        >
          Pay Now
        </button>
        <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-[0.2em] mt-4 font-medium italic">
          Secure Payment • Instant Activation
        </p>
      </div>
    </div>
  );
}
