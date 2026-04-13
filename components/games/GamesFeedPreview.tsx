"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Gamepad2, ChevronRight } from "lucide-react";

interface GameFeedItem {
  title: string;
  thumb: string;
  url: string;
  description: string;
}

export default function GamesFeedPreview({
  earningsPerMinute,
}: {
  earningsPerMinute: number;
}) {
  const [games, setGames] = useState<GameFeedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/games/feed")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setGames(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching games feed:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <section className="games-feed-section">
        <div className="games-feed-header">
          <Gamepad2 size={18} className="text-[var(--gold-400)]" />
          <h2 className="text-lg font-bold">Games — Earn While You Play</h2>
          <span className="earnings-rate-badge">+₦{earningsPerMinute}/min</span>
        </div>
        <div className="games-strip-outer">
          <div className="games-strip">
            {/* Loading skeleton */}
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={`loading-${i}`} className="game-thumb-card animate-pulse">
                <div className="w-[120px] h-[90px] bg-[var(--surface-600)] rounded-lg"></div>
                <div className="h-3 bg-[var(--surface-600)] rounded mt-2 w-2/3"></div>
              </div>
            ))}
          </div>
          <div className="games-strip-fade" aria-hidden="true" />
        </div>
        <button
          className="explore-games-btn card-lift"
          onClick={() => router.push("/games")}
        >
          Explore Games
          <ChevronRight size={16} />
        </button>
      </section>
    );
  }

  return (
    <section className="games-feed-section">
      {/* Header */}
      <div className="games-feed-header">
        <Gamepad2 size={18} className="text-[var(--gold-400)]" />
        <h2 className="text-lg font-bold">Games — Earn While You Play</h2>
        <span className="earnings-rate-badge">+₦{earningsPerMinute}/min</span>
      </div>

      {/* Scrollable strip with right-edge fade */}
      <div className="games-strip-outer">
        <div className="games-strip">
          {games.map((game, i) => (
            <div key={i} className="game-thumb-card" aria-label={game.title}>
              <img
                src={game.thumb}
                alt={game.title}
                draggable={false}
                loading="lazy"
              />
              <p className="game-thumb-title">{game.title}</p>
            </div>
          ))}
        </div>
        <div className="games-strip-fade" aria-hidden="true" />
      </div>

      {/* Single CTA */}
      <button
        className="explore-games-btn card-lift"
        onClick={() => router.push("/games")}
      >
        Explore Games
        <ChevronRight size={16} />
      </button>
    </section>
  );
}
