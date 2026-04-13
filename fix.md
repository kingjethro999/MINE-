Looking at your code, I can see the core issue: you're using GameMonetize's **video ad API** (`video.js` / `VIDEO_OPTIONS`) instead of simply embedding the game URL in an iframe. The JSON you have gives you direct game URLs — you just need to load those in an `<iframe>`.

Here's the fix:

**`GameMonetizeEmbed.tsx`** — replace entirely:

```tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  gameUrl: string;       // the `url` field from the JSON
  gameId: string;
  coinsPerMinute?: number;
  showAds?: boolean;
}

export default function GameMonetizeEmbed({
  gameUrl,
  gameId,
  coinsPerMinute = 5,
  showAds = true,
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
    startTimer();
    const onVisibility = () => (document.hidden ? pauseTimer() : startTimer());
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      pauseTimer();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [gameId]);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      <iframe
        src={gameUrl}
        style={{
          width: "100%",
          height: "600px",
          border: "none",
          borderRadius: "12px",
          display: "block",
        }}
        allowFullScreen
        allow="autoplay; fullscreen; gamepad"
        title={gameId}
      />
      <div className="game-status-bar">
        <span className={`tracking-dot ${isTracking ? "active" : ""}`} />
        {isTracking ? "Earning..." : "Paused"}
        <span className="session-coins">+₦{sessionCoins.toFixed(2)} this session</span>
      </div>
    </div>
  );
}
```

**`page.tsx`** — update the two spots that use `GameMonetizeEmbed`:

```tsx
// Where you find the active game, also grab its URL:
const activeGame = game ? gamesWithIds.find((g: any) => g.id === game) : null;

// Then in JSX, pass gameUrl:
<GameMonetizeEmbed
  gameId={activeGame.id}
  gameUrl={activeGame.url}          // ← ADD THIS
  showAds={planData.adsInGames}
  coinsPerMinute={planData.gameEarningsPerMinute}
/>
```

**Also fix the ID extraction in `page.tsx`** — your current logic pulls the last URL path segment but the JSON already has an `id` field, so the `gamesWithIds` map is fine. However, when building the `href` link and matching via `searchParams.game`, make sure you're using the same `id`. The JSON IDs are numeric strings like `"36608"` — just confirm your `find` is comparing strings to strings, not string to number.

**Why the old code didn't work:** `video.js` is GameMonetize's ad/monetization SDK for publishers who want to show video ads *around* games. It doesn't load the game itself. The game URLs in the JSON are self-contained HTML5 games that load directly in an `<iframe>` — no SDK needed.