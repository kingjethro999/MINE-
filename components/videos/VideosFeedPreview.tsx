"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Video, ChevronRight, Clock } from "lucide-react";
import CurrencyDisplay from "@/components/ui/CurrencyDisplay";

interface VideoFeedItem {
  id: number;
  title: string;
  thumbnail: string;
  duration: number;
  videoUrl: string;
}

export default function VideosFeedPreview({
  earningPerVideoUsd,
}: {
  earningPerVideoUsd: number;
}) {
  const [videos, setVideos] = useState<VideoFeedItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/videos/feed")
      .then((r) => r.json())
      .then((data) => setVideos(Array.isArray(data) ? data : []))
      .catch(console.error);
  }, []);

  return (
    <section className="games-feed-section">
      <div className="games-feed-header">
        <Video size={18} />
        <h2 className="text-white font-bold">Videos — Earn While You Watch</h2>
        <span className="earnings-rate-badge">+${earningPerVideoUsd}/video</span>
      </div>

      <div className="games-strip-outer">
        <div className="games-strip">
          {videos.map((video) => (
            <div key={video.id} className="game-thumb-card" aria-label={video.title}>
              <div className="relative">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  draggable={false}
                  loading="lazy"
                />
                <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                  <Clock size={8} />
                  {Math.floor(video.duration / 60)}:{String(video.duration % 60).padStart(2, "0")}
                </span>
              </div>
              <p className="game-thumb-title">{video.title}</p>
            </div>
          ))}
        </div>
        <div className="games-strip-fade" aria-hidden="true" />
      </div>

      <button
        className="explore-games-btn"
        onClick={() => router.push("/watch")}
      >
        Watch Videos
        <ChevronRight size={16} />
      </button>
    </section>
  );
}
