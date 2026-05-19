import { AlertTriangle } from "lucide-react";

export default function RiskDisclaimerPage() {
   return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
         <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold uppercase tracking-widest mb-6">
               <AlertTriangle size={14} />
               Important Notice
            </div>
            <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Risk Disclaimer</h1>
            <p className="text-lg text-[var(--text-secondary)]">Please read this notice carefully before mobilizing assets within the protocol.</p>
         </div>

         <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed text-sm">
            <section>
               <h3 className="text-xl font-bold text-white mb-3">1. Protocol Liquidity Risks</h3>
               <p className="mb-4">
                  Interaction with decentralized yield-generation frameworks carries inherent operational risks. Validator node deployment and active participation in the MINE$ Ecosystem utilize smart liquidity channels. Participants acknowledge that sustained protocol yield depends on the continuous flow of transactional volume. In periods of extreme market congestion or low liquidity volume, off-ramp settlements may experience systemic delays.
               </p>
            </section>

            <section>
               <h3 className="text-xl font-bold text-white mb-3">2. Yield Variance</h3>
               <p className="mb-4">
                  Projected APYs (Annual Percentage Yield) and base reward accumulation rates (e.g., ₦15/hr, ₦120/hr) are dynamically calculated target parameters, determined by real-time Network Hash Power and total Validator TVL (Total Value Locked). These values are estimates, not guaranteed static returns. We dynamically adjust rewards to preserve global protocol liquidity.
               </p>
            </section>

            <section>
               <h3 className="text-xl font-bold text-white mb-3">3. Software & Simulation Execution</h3>
               <p className="mb-4">
                  Ecosystem Yield Multipliers generated via "Simulation Training" are dependent on verified connectivity streams. If a validator drops connection mid-simulation, or triggers automated anti-manipulation security systems, any unsynced yield will be unconditionally forfeited to the global ledger.
               </p>
            </section>

            <section>
               <h3 className="text-xl font-bold text-white mb-3">4. Withdrawal Thresholds & Downline Prerequisites</h3>
               <p className="mb-4">
                  As a core mechanism for ensuring sustainable platform liquidity, the MINE$ Protocol employs absolute mandatory withdrawal requirements. Node operators on Standard tiers (Starter / Advanced) must satisfy specific Affiliate Synchronization (min. downlines) and balance thresholds prior to settlement execution. These terms are immutable protocol logic parameters designed for asset protection. Participants lacking intent to engage with network growth mechanics should heavily consider upgrading to Elite Nodes beforehand to bypass these retention protocols.
               </p>
            </section>

            <div className="p-6 mt-8 rounded-2xl bg-[var(--surface-900)] border border-[var(--border)] italic">
               "By finalizing a node deployment on MINE$ Protocol, operators forfeit liability claims against developers concerning unvested stakes arising from protocol mathematical constraints or natural cyclic network depreciation."
            </div>
         </div>
      </div>
   );
}
