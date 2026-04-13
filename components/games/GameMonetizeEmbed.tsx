"use client";

import { useEffect, useRef, useState } from "react";
import { Gamepad2, Coins } from "lucide-react";

interface Props {
  gameId: string;
  gameUrl: string;
  coinsPerMinute?: number;
}

export default function GameMonetizeEmbed({
  gameId,
  gameUrl,
  coinsPerMinute = 5,
}: Props) {
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const secondsRef = useRef(0);
  const [sessionCoins, setSessionCoins] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  const startTimer = () => {
    if (timerRef.current) return;
    setIsTracking(true);
    timerRef.current = setInterval(async () => {
      secondsRef.current += 1;
      // Track reward every 60 seconds
      if (secondsRef.current % 60 === 0) {
        try {
          const res = await fetch("/api/reward", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId, duration: 1 }), // Fixed: server expects 'duration'
          });
          const data = await res.json();
          if (data.success && data.awarded) {
            setSessionCoins((p) => p + data.awarded);
          }
        } catch (e) {
          console.error("Reward error:", e);
        }
      }
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsTracking(false);
  };

  useEffect(() => {
    startTimer();
    const onVisibility = () => (document.hidden ? pauseTimer() : startTimer());
    document.addEventListener("visibilitychange", onVisibility);
    
    return () => {
      pauseTimer();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [gameId]);

  return (
    <div className="w-full space-y-4">
      {/* Game Frame Container */}
      <div className="relative w-full aspect-video bg-[var(--surface-900)] rounded-2xl overflow-hidden border border-[var(--surface-600)] shadow-2xl group">
        <iframe
          src={gameUrl}
          className="w-full h-full border-none"
          allowFullScreen
          allow="autoplay; fullscreen; gamepad"
          title={`Game ${gameId}`}
        />
        
        {/* Overlay when paused */}
        {!isTracking && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center transition-all">
             <div className="bg-[var(--surface-800)]/90 p-4 rounded-xl border border-[var(--gold-500)]/30 flex flex-col items-center gap-2">
                <Gamepad2 className="text-[var(--gold-500)] animate-pulse" size={32} />
                <span className="text-white font-bold">Resuming earning...</span>
             </div>
          </div>
        )}
      </div>

      {/* Modern Status Bar */}
      <div className="flex items-center justify-between p-4 bg-[var(--surface-800)]/50 backdrop-blur-md rounded-xl border border-[var(--surface-600)] shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className={`w-3 h-3 rounded-full ${isTracking ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.6)]" : "bg-zinc-600"} transition-all duration-300`} />
            {isTracking && <div className="absolute inset-0 w-3 h-3 rounded-full bg-green-500 animate-ping opacity-75" />}
          </div>
          <span className="text-sm font-medium text-[var(--text-secondary)]">
            {isTracking ? "Active & Earning" : "Tracking Paused"}
          </span>
        </div>

        <div className="flex items-center gap-2 bg-[var(--gold-500)]/10 px-4 py-2 rounded-lg border border-[var(--gold-500)]/20">
          <Coins size={16} className="text-[var(--gold-400)]" />
          <span className="text-[var(--gold-400)] font-bold tabular-nums">
            +₦{sessionCoins.toFixed(2)}
          </span>
          <span className="text-[var(--gold-400)]/60 text-xs hidden sm:inline ml-1">this session</span>
        </div>
      </div>

      <style jsx>{`
        .aspect-video {
          aspect-ratio: 16 / 9;
        }
        @media (max-aspect-ratio: 1/1) {
          .aspect-video {
             aspect-ratio: 3 / 4;
             height: 600px;
          }
        }
      `}</style>
    </div>
  );
}
