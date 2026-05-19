import { Shield } from "lucide-react";

export default function PrivacyPolicyPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="mb-12">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Shield size={14} />
            Data Protection
         </div>
         <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Privacy Policy</h1>
         <p className="text-lg text-[var(--text-secondary)]">How we process protocol metadata and personal identifiers.</p>
      </div>

      <div className="space-y-8 text-[var(--text-secondary)] leading-relaxed text-sm bg-[var(--surface-800)] border border-[var(--surface-600)] p-8 md:p-12 rounded-[32px]">
         <section>
            <h3 className="text-xl font-bold text-white mb-3">Information Aggregation</h3>
            <p>
               Beyond standard email registration, the protocol passively collects on-chain metrics regarding transaction pacing, IP-geolocation correlation (for load balancing regional nodes), and interaction behavioral modeling during Simulation Training. Financial information utilized for off-ramp liquidity (Bank Details) is explicitly tokenized and routed to PCI-DSS compliant third-party banking bridges. $MINE Protocol does not store plaintext banking identities on local databases.
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">Data Utilization</h3>
            <p>
               Synchronized data is exclusively leveraged for:
               <ul className="list-disc pl-5 mt-3 space-y-2">
                  <li>Resolving fiat settlement bottlenecks in the liquidity pool.</li>
                  <li>Monitoring sybil behaviors and multi-node framing logic.</li>
                  <li>Connecting node metrics for the Affiliate tracking API to map user downlines.</li>
               </ul>
            </p>
         </section>

         <section>
            <h3 className="text-xl font-bold text-white mb-3">Third-Party Verification Ecosystems</h3>
            <p>
               In accordance with strict security standards, portions of metadata may be interfaced with anti-fraud oracles and KYC (Know Your Customer) APIs when validators request exceptionally large off-ramp settlements. This ensures our operational liquidity remains uncompromised by malicious synthetic agents.
            </p>
         </section>
      </div>
    </div>
  );
}
