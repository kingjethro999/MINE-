"use client";

import { useEffect, useState, useCallback } from "react";
import { Video, Zap, Clock } from "lucide-react";
import { toast } from "sonner";
import VideoPlayer from "@/components/videos/VideoPlayer";

interface VideoItem {
  id: number;
  title: string;
  thumbnail: string;
  duration: number;
  videoUrl: string;
}

interface VideoStatus {
  dailyLimit: number;
  watchedToday: number;
  remaining: number;
  canWatch: boolean;
}

interface WatchPageClientProps {
  earningPerVideoUsd: number;
  dailyVideoLimit: number;
}

export default function WatchPageClient({
  earningPerVideoUsd,
  dailyVideoLimit,
}: WatchPageClientProps) {
  const [videos, setVideos] = useState<VideoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [status, setStatus] = useState<VideoStatus>({
    dailyLimit: dailyVideoLimit,
    watchedToday: 0,
    remaining: dailyVideoLimit,
    canWatch: true,
  });

  const refreshStatus = useCallback(() => {
    fetch("/api/videos/status")
      .then((r) => r.json())
      .then((data) => {
        if (data.dailyLimit !== undefined) setStatus(data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("/api/videos/feed")
      .then((r) => r.json())
      .then((data) => setVideos(Array.isArray(data) ? data : []))
      .catch(console.error)
      .finally(() => setLoading(false));

    refreshStatus();
  }, [refreshStatus]);

  const handleVideoSelect = (video: VideoItem) => {
    if (!status.canWatch) {
      toast.error(`Daily limit reached (${status.dailyLimit} videos/day)`);
      return;
    }
    setActiveVideo(video);
  };

  if (activeVideo) {
    return (
      <VideoPlayer
        video={activeVideo}
        earningPerVideoUsd={earningPerVideoUsd}
        onComplete={() => refreshStatus()}
        onBack={() => {
          setActiveVideo(null);
          refreshStatus();
        }}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between p-4 bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-xl">
        <div className="flex items-center gap-3">
          <Clock size={18} className="text-[var(--color-accent)]" />
          <span className="text-sm text-[var(--text-secondary)]">Videos remaining today</span>
        </div>
        <span className="font-black text-white mono-figure">
          <span className="text-[var(--green-500)]">{status.remaining}</span>
          <span className="text-[var(--text-muted)]"> / {status.dailyLimit}</span>
        </span>
      </div>

      {!status.canWatch && (
        <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-400 text-sm font-medium text-center">
          You&apos;ve watched all {status.dailyLimit} videos for today. Come back tomorrow!
        </div>
      )}

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-[var(--surface-700)] rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video) => (
            <button
              key={video.id}
              onClick={() => handleVideoSelect(video)}
              disabled={!status.canWatch}
              className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-2xl overflow-hidden shadow-lg card-lift text-left group hover:border-[var(--color-accent)]/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-[var(--green-500)] text-white text-[9px] font-black px-2 py-1 rounded-full flex items-center gap-1">
                  <Zap size={10} />
                  ${earningPerVideoUsd}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-white text-xs truncate">{video.title}</h3>
                <p className="text-[10px] text-[var(--text-muted)] mt-1">
                  {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
