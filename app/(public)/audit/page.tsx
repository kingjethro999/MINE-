import { ShieldCheck, CheckSquare, Lock } from "lucide-react";

export default function AuditPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-12">
         <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold uppercase tracking-widest mb-6">
            <ShieldCheck size={14} />
            Security & Integrity
         </div>
         <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-white">Smart Contract Audit</h1>
         <p className="text-lg text-[var(--text-secondary)]">Transparency in security. Review our ongoing compliance checks and protocol verifications.</p>
      </div>

      <div className="bg-gradient-to-br from-green-500/10 to-[var(--surface-900)] border border-green-500/20 rounded-[32px] p-8 md:p-12 mb-8">
         <div className="flex flex-col md:flex-row items-center gap-8 border-b border-white/5 pb-8 mb-8">
            <div className="w-24 h-24 bg-green-500/20 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-green-500/10 border border-green-500/30">
               <ShieldCheck size={48} className="text-green-500" />
            </div>
            <div>
               <div className="flex items-center gap-3 mb-2">
                  <h2 className="text-2xl font-black text-white uppercase tracking-tight">Phase 2 Mainnet Audit</h2>
                  <span className="px-3 py-1 bg-green-500 text-[#0a0f0d] text-[10px] font-black rounded-full uppercase tracking-widest">Completed</span>
               </div>
               <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-2xl">
                  The core staking logic, reward accrual algorithms, and automated liquidity settlement modules have successfully passed preliminary security reviews against common vector attacks (including reentrancy and oracle manipulation).
               </p>
            </div>
         </div>

         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-4 p-4 bg-[var(--surface-800)] border border-[var(--border)] rounded-xl">
               <CheckSquare size={20} className="text-green-500" />
               <div>
                  <p className="font-bold text-white text-sm">Reward Algorithms</p>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Passed Verification</p>
               </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-[var(--surface-800)] border border-[var(--border)] rounded-xl">
               <CheckSquare size={20} className="text-green-500" />
               <div>
                  <p className="font-bold text-white text-sm">Liquidity Routing</p>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Passed Verification</p>
               </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-[var(--surface-800)] border border-[var(--border)] rounded-xl">
               <CheckSquare size={20} className="text-green-500" />
               <div>
                  <p className="font-bold text-white text-sm">Booster Overclocking</p>
                  <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-wider">Passed Verification</p>
               </div>
            </div>
            <div className="flex items-center gap-4 p-4 bg-[var(--surface-800)] border border-[var(--border)] rounded-xl">
               <Lock size={20} className="text-[var(--color-accent)]" />
               <div>
                  <p className="font-bold text-white text-sm">External Oracle Sync</p>
                  <p className="text-[10px] text-[var(--color-accent)] uppercase tracking-wider">Pending Phase 3</p>
               </div>
            </div>
         </div>
      </div>
      
      <p className="text-xs text-[var(--text-muted)] text-center max-w-xl mx-auto italic">
         Complete cryptographic proof documentation and formal verification reports will be fully open-sourced in accordance with our Q4 transparent liquidity milestone.
      </p>
    </div>
  );
}
