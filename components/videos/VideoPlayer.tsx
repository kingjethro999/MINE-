"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { Play, Pause, CheckCircle, Loader2, Video } from "lucide-react";
import { toast } from "sonner";
import CurrencyDisplay from "@/components/ui/CurrencyDisplay";

interface VideoItem {
  id: number;
  title: string;
  thumbnail: string;
  duration: number;
  videoUrl: string;
}

interface Props {
  video: VideoItem;
  earningPerVideoUsd: number;
  onComplete: (amountUsd: number) => void;
  onBack: () => void;
}

export default function VideoPlayer({
  video,
  earningPerVideoUsd,
  onComplete,
  onBack,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [claiming, setClaiming] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [watchedSeconds, setWatchedSeconds] = useState(0);

  const canClaim = progress >= 90 && !claimed;

  const handleTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el || !el.duration) return;
    const pct = (el.currentTime / el.duration) * 100;
    setProgress(pct);
    setWatchedSeconds(el.currentTime);
  }, []);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) {
      el.play();
      setPlaying(true);
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  const handleClaim = async () => {
    if (!canClaim || claiming) return;
    setClaiming(true);

    try {
      const res = await fetch("/api/videos/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pexelsVideoId: video.id,
          watchedSeconds,
          durationSeconds: video.duration,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Failed to claim reward");
        return;
      }

      setClaimed(true);
      toast.success(`Earned $${data.amountUsd.toFixed(2)}!`);
      onComplete(data.amountUsd);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setClaiming(false);
    }
  };

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const onEnded = () => {
      setPlaying(false);
      setProgress(100);
      setWatchedSeconds(video.duration);
    };

    el.addEventListener("ended", onEnded);
    return () => el.removeEventListener("ended", onEnded);
  }, [video.duration]);

  return (
    <div className="space-y-4">
      <button
        onClick={onBack}
        className="text-[var(--color-accent)] text-[10px] font-black uppercase tracking-widest hover:text-white transition-colors"
      >
        ← Back to videos
      </button>

      <div className="relative w-full aspect-video bg-black rounded-2xl overflow-hidden border border-[var(--surface-600)] shadow-2xl">
        <video
          ref={videoRef}
          src={video.videoUrl}
          poster={video.thumbnail}
          className="w-full h-full object-contain"
          onTimeUpdate={handleTimeUpdate}
          playsInline
          onClick={togglePlay}
        />

        {!playing && !claimed && (
          <button
            onClick={togglePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/20 transition-colors"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--gold-500)] flex items-center justify-center shadow-lg">
              <Play size={28} className="text-[#0a0f0d] ml-1" fill="currentColor" />
            </div>
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
          <span>Watch progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="h-2 bg-[var(--surface-700)] rounded-full overflow-hidden">
          <div
            className="h-full bg-[var(--green-500)] transition-all duration-300 rounded-full"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="text-[10px] text-[var(--text-muted)]">
          Watch at least 90% to earn ${earningPerVideoUsd.toFixed(2)} per video
        </p>
      </div>

      {/* Status bar */}
      <div className="flex items-center justify-between p-4 bg-[var(--surface-800)] rounded-xl border border-[var(--surface-600)]">
        <div className="flex items-center gap-3">
          <Video size={18} className="text-[var(--color-accent)]" />
          <span className="text-sm text-[var(--text-secondary)]">
            {claimed ? "Reward claimed" : playing ? "Watching..." : "Paused"}
          </span>
        </div>

        {claimed ? (
          <div className="flex items-center gap-2 text-[var(--green-500)]">
            <CheckCircle size={18} />
            <CurrencyDisplay amountUsd={earningPerVideoUsd} size="sm" />
          </div>
        ) : canClaim ? (
          <button
            onClick={handleClaim}
            disabled={claiming}
            className="px-5 py-2.5 bg-[var(--gold-500)] text-[#0a0f0d] font-black text-xs uppercase tracking-widest rounded-lg hover:bg-[var(--gold-600)] transition-colors disabled:opacity-50 flex items-center gap-2"
          >
            {claiming ? <Loader2 size={14} className="animate-spin" /> : null}
            Claim Reward
          </button>
        ) : (
          <span className="text-xs text-[var(--text-muted)] font-bold">
            Earn <span className="text-[var(--color-accent)]">${earningPerVideoUsd}</span>
          </span>
        )}
      </div>
    </div>
  );
}
