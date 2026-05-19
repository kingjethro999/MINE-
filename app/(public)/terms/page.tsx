import { FileSignature } from "lucide-react";

export default function TermsOfServicePage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="mb-12">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-6">
            <FileSignature size={14} />
            Legal Binding Agreement
         </div>
         <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Terms of Service</h1>
         <p className="text-lg text-[var(--text-secondary)]">Effective Date: {new Date().toLocaleDateString()}</p>
      </div>

      <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed text-sm bg-[var(--surface-800)] border border-[var(--surface-600)] p-8 md:p-12 rounded-[32px]">
         <section>
            <h3 className="text-xl font-bold text-white mb-3">1. Protocol Interaction</h3>
            <p>
               By connecting a wallet or registering a node on the $MINE Protocol, operators are executing a digitally binding contract. The interactions between nodes, including base yield accumulation and ecosystem multi-threading (gaming tasks), are governed by our decentralized routing parameters.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">2. Fund Mobilization</h3>
            <p>
               Funds inserted into the protocol for Validator Node establishment are not traditional fiat deposits but are instantaneously converted to deploy computational thresholds within the network. These initial mobilization figures are non-refundable, as they represent the sunk cost of leasing protocol block space and node sync weight. Substantive returns are strictly acquired through yield accrual over time.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">3. Affiliate Networking Requirements</h3>
            <p>
               Our smart nodes operate on cluster algorithms. Certain base-level tiers (Starter, Advanced) explicitly mandate minimum "Synchronized Node" (downline) linkages. Failure to actively recruit and connect secondary nodes to your primary cluster constitutes a breach of node efficiency targets, thus prohibiting fiat settlement (withdrawal) until network weight parameters are met.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">4. Protocol Modifications</h3>
            <p>
               The governing entity of the $MINE Ecosystem reserves the unilateral right to adjust mathematical yield constants, withdrawal restrictions, frequency limitations, and booster node efficiencies without prior announcement, primarily utilized as emergency dampeners during periods of acute liquidity variance.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">5. Termination of Connectivity</h3>
            <p>
               Accounts flagged for attempting to utilize sybil attacks, multi-account farming, or exploiting the Simulation Training algorithms via automated macros will be permanently disconnected from the ledger. All accumulated $MINE yield will be burnt from circulation to preserve protocol health.
            </p>
         </section>
      </div>
    </div>
  );
}
