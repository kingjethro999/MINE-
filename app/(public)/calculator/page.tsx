import { Calculator, Activity } from "lucide-react";

export default function CalculatorPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-6">
            <Calculator size={14} />
            Yield Projections
         </div>
         <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Earnings Calculator</h1>
         <p className="text-lg text-[var(--text-secondary)]">Estimate daily earnings from videos and games based on your plan.</p>
      </div>

      <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] p-8 md:p-12 rounded-[32px] shadow-2xl relative overflow-hidden">
         <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--color-accent)]/5 rounded-full blur-3xl pointer-events-none" />
         
         <div className="text-center py-16">
            <Activity className="mx-auto h-16 w-16 text-[var(--text-muted)] opacity-20 mb-6" />
            <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">Calculator Module Offline</h3>
            <p className="text-[var(--text-secondary)] max-w-md mx-auto text-sm leading-relaxed mb-8">
              The Interactive Yield Projection module is currently undergoing recalibration to sync with the updated Variable APY algorithms of Phase 2.
            </p>
            <div className="inline-flex items-center px-4 py-2 bg-[var(--surface-700)] rounded-xl border border-[var(--surface-600)] shadow-inner text-xs font-mono text-[var(--color-accent)] font-bold">
               ETA COMPUTE_SYNC: 48 HOURS
            </div>
         </div>
      </div>
    </div>
  );
}
