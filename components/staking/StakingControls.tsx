"use client";

import { useState } from "react";
import { Power, Activity, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface StakingControlsProps {
  activeSession: {
    autoMine: boolean;
    autoDays: number | null;
    startedAt: Date;
  } | null;
  planData: {
    autoMine: boolean;
    autoMineDurations?: readonly number[];
  };
}

export default function StakingControls({ activeSession, planData }: StakingControlsProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleStart = async (autoDays?: number) => {
    setLoading(true);
    try {
      const formData = new FormData();
      if (autoDays) formData.append("autoDays", autoDays.toString());

      const res = await fetch("/api/mining/start", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success(autoDays ? "Automated Deployment Syncing..." : "Staking Initiated Successfully");
        router.refresh();
      } else {
        toast.error("Failed to synchronize with protocol");
      }
    } catch (e) {
      toast.error("Network connectivity error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-8">
      <div className="flex gap-4 w-full">
        {!activeSession ? (
          <button
            onClick={() => handleStart()}
            disabled={loading}
            className="flex items-center justify-center gap-3 w-full py-5 bg-[var(--color-accent)] hover:bg-[var(--gold-600)] text-[#0a0f0d] font-black tracking-[0.15em] uppercase rounded-2xl transition-all transform active:scale-[0.98] shadow-xl shadow-[var(--gold-500)]/20 disabled:opacity-50"
          >
            {loading ? <Activity size={22} className="animate-spin" /> : <Power size={22} />}
            Initiate Staking
          </button>
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 w-full py-5 bg-[var(--surface-900)] text-green-500 font-black tracking-[0.15em] uppercase rounded-2xl border border-green-500/30">
            <div className="flex items-center gap-3">
              <Activity size={22} className="animate-pulse" />
              Node Synchronized & Active
            </div>
            <span className="text-[10px] bg-green-500/10 px-3 py-1 rounded-full mt-1 border border-green-500/20 shadow-inner">
              {activeSession.autoMine
                ? `Automated Deployment Active: ${activeSession.autoDays} Days Cycle`
                : "Standard 24-Hour Cycle Active"}
            </span>
          </div>
        )}
      </div>

      {planData.autoMine && (
        <div className="mt-10 pt-8 border-t border-white/5 w-full">
          <div className="flex items-center gap-2 mb-4">
            <ShieldCheck size={18} className="text-[var(--color-accent)]" />
            <p className="text-[10px] font-black tracking-[0.2em] uppercase text-[var(--color-accent)]">Elite Automated Deployment</p>
          </div>
          {activeSession?.autoMine ? (
            <div className="p-5 rounded-2xl bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/20 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-[var(--color-accent)]">Deployment In Progress</span>
                <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse shadow-[0_0_8px_var(--color-accent)]" />
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                <span>Active Cycle</span>
                <span className="text-white font-black">{activeSession.autoDays} Day Duration</span>
              </div>
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                <span>Started</span>
                <span className="text-white font-black font-mono">{new Date(activeSession.startedAt).toLocaleString()}</span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {planData.autoMineDurations?.map((days) => (
                <button
                  key={days}
                  onClick={() => handleStart(days)}
                  disabled={loading || !!activeSession}
                  className="py-3 bg-black/40 border border-white/10 text-xs text-white font-black uppercase tracking-widest rounded-xl hover:bg-[var(--surface-600)] transition-all hover:border-[var(--color-accent)]/30 active:scale-95 disabled:opacity-30"
                >
                  {days} Days
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
