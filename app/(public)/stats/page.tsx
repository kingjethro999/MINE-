import { Activity, BarChart, Server } from "lucide-react";

export default function StatsPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold uppercase tracking-widest mb-6">
            <Activity size={14} />
            Live Network Monitor
         </div>
         <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Validator Stats</h1>
         <p className="text-lg text-[var(--text-secondary)]">Real-time metrics on network stability, aggregate liquidity, and validator load distribution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
         <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] p-8 rounded-2xl">
            <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-2">Total Value Secured</p>
            <p className="text-3xl font-black font-mono text-[var(--color-accent)]">₦142,854,200</p>
         </div>
         <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] p-8 rounded-2xl">
            <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-2">Active Master Nodes</p>
            <p className="text-3xl font-black font-mono text-white">12,402</p>
         </div>
         <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] p-8 rounded-2xl">
            <p className="text-[var(--text-muted)] text-[10px] font-bold uppercase tracking-widest mb-2">Current Median APY</p>
            <p className="text-3xl font-black font-mono text-green-500">42.8%</p>
         </div>
      </div>

      <div className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[32px] p-8 md:p-12 text-center h-64 flex flex-col items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(var(--color-accent) 1px, transparent 1px)", backgroundSize: "20px 20px" }}></div>
         <BarChart size={48} className="text-[var(--color-accent)]/20 mb-4 relative z-10" />
         <h3 className="text-xl font-bold text-white mb-2 relative z-10">Advanced Metrics Dashboard</h3>
         <p className="text-[var(--text-secondary)] text-sm mb-6 max-w-md mx-auto relative z-10">Detailed historical graphs and node distribution maps are pending the GraphQL indexing update.</p>
         <div className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)] px-4 py-2 bg-[var(--color-accent)]/10 rounded-full relative z-10">
            <Server size={12} className="animate-spin-slow" />
            Synchronizing with Indexer
         </div>
      </div>
    </div>
  );
}
