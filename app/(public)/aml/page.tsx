import { Search } from "lucide-react";

export default function AMLPolicyPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-4xl">
      <div className="mb-12">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-6">
            <Search size={14} />
            Compliance Architecture
         </div>
         <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">AML & KYC Protocol</h1>
         <p className="text-lg text-[var(--text-secondary)]">Anti-Money Laundering frameworks enforcing institutional grade legitimacy.</p>
      </div>

      <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] p-8 md:p-12 rounded-[32px]">
         <div className="prose prose-invert max-w-none text-sm text-[var(--text-secondary)]">
            <h3 className="text-xl font-bold text-white mb-4">Zero-Tolerance Synthetic Flow Policy</h3>
            <p className="mb-6">
               The $MINE Ecosystem is designed to empower organic validators and legitimate network participants. We employ cutting-edge on-chain heuristics to monitor fund pathways. Any node identified engaging in "layering," "tumbling," or any obfuscation technique designed to mask the origin of the fiat or crypto injected into the protocol will be immediately halted.
            </p>

            <h3 className="text-xl font-bold text-white mb-4">Tiered Identity Verification (KYC)</h3>
            <p className="mb-6">
               Currently, our settlement structures run on heuristic faith for Starter and Advanced nodes up to specific transactional velocity ceilings. However:
            </p>
            <ul className="list-disc pl-5 mb-6 space-y-2">
               <li><strong>Level 1 (Algorithmic Sync):</strong> Standard usage requires email and verified withdrawal destination matching the regional IP mapping.</li>
               <li><strong>Level 2 (Deep Verification):</strong> If the system flags anomalous yield extraction rates, or irregular off-ramp frequencies, a mandatory halt will suspend payouts until government-issued identification is manually verified by the treasury administration.</li>
            </ul>

            <h3 className="text-xl font-bold text-white mb-4">Suspicious Activity Reports (SAR)</h3>
            <p className="mb-6">
               Our protocol explicitly complies with international financial policing. Operations bypassing our organic ecosystem caps or injecting illicitly obtained capital into the node infrastructure are reported to pertinent operational authorities without warning.
            </p>

            <div className="p-4 mt-6 bg-[var(--color-accent)]/5 border-l-2 border-[var(--color-accent)]">
               <p className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-widest">A clean protocol protects your yield. Strict enforcement is a protocol necessity.</p>
            </div>
         </div>
      </div>
    </div>
  );
}
