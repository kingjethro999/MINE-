import { FileText, ChevronRight, Activity, Zap, Layers } from "lucide-react";

export default function DocsPage() {
   return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
         <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-6">
               <FileText size={14} />
               Protocol Wiki
            </div>
            <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Documentation</h1>
            <p className="text-lg text-[var(--text-secondary)]">Technical specifications, node deployment guides, and yield aggregation methodologies for the MINE$ Ecosystem.</p>
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] p-8 rounded-[32px] hover:border-[var(--color-accent)]/30 transition-all cursor-pointer group">
               <div className="w-12 h-12 bg-[var(--color-accent)]/10 rounded-xl flex items-center justify-center mb-6 text-[var(--color-accent)] group-hover:scale-110 transition-transform">
                  <Layers size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Validator Node Architecture</h3>
               <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">Comprehensive breakdown of the Starter, Advanced, and Elite tier validation sequences, including network requirements.</p>
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-accent)]">
                  Read Specification <ChevronRight size={14} />
               </div>
            </div>

            <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] p-8 rounded-[32px] hover:border-[var(--color-earn)]/30 transition-all cursor-pointer group">
               <div className="w-12 h-12 bg-[var(--color-earn)]/10 rounded-xl flex items-center justify-center mb-6 text-[var(--color-earn)] group-hover:scale-110 transition-transform">
                  <Activity size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Yield Accrual Mechanisms</h3>
               <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">Mathematical formulas and distribution mechanics governing base reward generation across different network thresholds.</p>
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[var(--color-earn)]">
                  Analyze Mathematics <ChevronRight size={14} />
               </div>
            </div>

            <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] p-8 rounded-[32px] hover:border-amber-500/30 transition-all cursor-pointer group">
               <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center mb-6 text-amber-500 group-hover:scale-110 transition-transform">
                  <Zap size={24} />
               </div>
               <h3 className="text-xl font-bold text-white mb-2">Protocol Boosters</h3>
               <p className="text-[var(--text-secondary)] text-sm mb-6 leading-relaxed">Hardware acceleration protocols for secondary yield accumulation. Understand duration, cost matrices, and flux metrics.</p>
               <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-500">
                  View Acceleration Matrix <ChevronRight size={14} />
               </div>
            </div>
         </div>

         <div className="p-8 border-l-4 border-[var(--color-accent)] bg-[var(--color-accent)]/5 rounded-r-2xl">
            <h4 className="font-bold text-white mb-2">Network API Reference</h4>
            <p className="text-sm text-[var(--text-secondary)]">The core RPC endpoints and smart contract interfaces for advanced validators are currently strictly internal. Documentation for API connectivity will be published following the Phase 3 liquidity deployment.</p>
         </div>
      </div>
   );
}
