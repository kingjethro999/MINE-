"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  gameId: string;
  height?: string;
  color?: string;
  coinsPerMinute?: number;
  showAds?: boolean;        // false for Premium
}

export default function GameMonetizeEmbed({
  gameId,
  height = "480px",
  color = "#d4af37",
  coinsPerMinute = 5,
  showAds = true,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const secondsRef = useRef(0);
  const [sessionCoins, setSessionCoins] = useState(0);
  const [isTracking, setIsTracking] = useState(false);

  const startTimer = () => {
    if (timerRef.current) return;
    setIsTracking(true);
    timerRef.current = setInterval(async () => {
      secondsRef.current += 1;
      if (secondsRef.current % 60 === 0) {
        try {
          const res = await fetch("/api/reward", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ gameId, minutes: 1 }),
          });
          const data = await res.json();
          if (data.coinsAwarded) setSessionCoins((p) => p + data.coinsAwarded);
        } catch (e) {
          console.error("Reward error:", e);
        }
      }
    }, 1000);
  };

  const pauseTimer = () => {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setIsTracking(false);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;

    // showAds=false for Premium → getAds:"false" removes all GameMonetize ads
    window.VIDEO_OPTIONS = {
      gameid: gameId,
      width: "100%",
      height,
      color,
      getAds: showAds ? "true" : "false",
    };

    const scriptId = "gamemonetize-video-api";
    if (!document.getElementById(scriptId)) {
      const first = document.getElementsByTagName("script")[0];
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://api.gamemonetize.com/video.js";
      first?.parentNode?.insertBefore(s, first);
    }

    const poll = setInterval(() => {
      if (containerRef.current?.querySelector("iframe")) {
        clearInterval(poll);
        startTimer();
      }
    }, 500);

    const onVisibility = () => (document.hidden ? pauseTimer() : startTimer());
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      clearInterval(poll);
      pauseTimer();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [gameId, showAds]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div id="gamemonetize-video" ref={containerRef} />
      <div className="game-status-bar">
        <span className={`tracking-dot ${isTracking ? "active" : ""}`} />
        {isTracking ? "Earning..." : "Paused"}
        <span className="session-coins">+₦{sessionCoins.toFixed(2)} this session</span>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    VIDEO_OPTIONS: {
      gameid: string;
      width: string;
      height: string;
      color: string;
      getAds: string;
    };
  }
}
