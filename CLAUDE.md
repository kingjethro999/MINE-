# CLAUDE.md — Mines Platform

> This file is the single source of truth for AI-assisted development on this codebase.
> Read it fully before making any changes.

---

## Project Overview

**Mines** is a Progressive Web App (PWA) where users "mine" a virtual currency called **MINE$**.
Users register on one of three subscription plans, mine earnings over time, play games to earn
additional naira, and withdraw real naira to their bank accounts. Payments are handled via
**Paystack** (live and active).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14+ (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + CSS custom properties |
| Database | PostgreSQL (Docker, hosted on Render via `dbin/`) |
| ORM | Prisma |
| Auth | NextAuth.js |
| Payments | Paystack (live keys in env) |
| PWA | next-pwa |
| Icons | Lucide React (NO emojis — icons only) |
| Animations | Framer Motion |

---

## Repository Structure

```
mines/
├── app/
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   └── register/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx              # Sidebar layout
│   │   ├── dashboard/page.tsx      # Balance dashboard + games feed preview
│   │   ├── mine/page.tsx           # Mining page
│   │   ├── games/page.tsx          # Full games page
│   │   ├── withdraw/page.tsx       # Withdrawal page
│   │   └── upgrade/
│   │       └── [plan]/page.tsx     # id param: "premium" | "pro"
│   ├── admin/
│   │   ├── layout.tsx
│   │   ├── users/page.tsx
│   │   └── withdrawals/page.tsx
│   └── api/
│       ├── auth/[...nextauth]/route.ts
│       ├── games/feed/route.ts         # Proxies GameMonetize feed
│       ├── mining/
│       │   ├── start/route.ts
│       │   ├── stop/route.ts
│       │   └── status/route.ts
│       ├── reward/route.ts
│       ├── withdraw/route.ts
│       ├── upgrade/route.ts
│       └── paystack/
│           ├── initialize/route.ts
│           └── verify/route.ts
├── components/
│   ├── ui/
│   ├── mining/
│   │   ├── MiningIcon.tsx
│   │   ├── BalanceTicker.tsx
│   │   └── CoinToast.tsx
│   ├── games/
│   │   ├── GameMonetizeEmbed.tsx   # Full game player
│   │   └── GamesFeedPreview.tsx    # Dashboard feed strip (display only)
│   └── layout/
│       └── Sidebar.tsx
├── lib/
│   ├── db.ts
│   ├── paystack.ts
│   ├── mining.ts
│   └── plans.ts
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── dbin/
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── init.sql
├── public/
│   ├── icon.png                    # App logo AND favicon — do not rename
│   ├── manifest.json
│   └── sw.js
└── .env.local
```

---

## Plans Configuration

Defined in `lib/plans.ts` — import from here, never hardcode plan logic elsewhere.

```ts
export const PLANS = {
  basic: {
    id: "basic",
    name: "Basic",
    price: 2000,
    earningPerHour: 20,
    earningPerSecond: 20 / 3600,
    autoMine: false,
    withdrawalDays: [28],
    withdrawalThreshold: 15000,
    disbursementDays: 5,
    withdrawalsPerMonth: 1,
    gameEarningsPerMinute: 5,
    adsInGames: true,
  },
  pro: {
    id: "pro",
    name: "Pro",
    price: 5000,
    earningPerHour: 50,
    earningPerSecond: 50 / 3600,
    autoMine: false,
    withdrawalDays: [14, 28],
    withdrawalThreshold: 15000,
    disbursementDays: 3,
    withdrawalsPerMonth: 2,
    gameEarningsPerMinute: 10,
    adsInGames: true,
  },
  premium: {
    id: "premium",
    name: "Premium",
    price: 7500,
    earningPerHour: 100,
    earningPerSecond: 100 / 3600,
    autoMine: true,
    autoMineDurations: [3, 5, 7],
    withdrawalDays: "every_thursday",
    withdrawalThreshold: 0,
    disbursementDays: 0.25,
    withdrawalsPerMonth: Infinity,
    gameEarningsPerMinute: 20,
    adsInGames: false,               // Premium users see NO ads
  },
} as const;

export type PlanId = keyof typeof PLANS;
```

---

## Database Schema (Prisma)

```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id                String        @id @default(cuid())
  email             String        @unique
  name              String
  passwordHash      String
  plan              Plan          @default(BASIC)
  isAdmin           Boolean       @default(false)
  coinsBalance      Float         @default(0)
  totalEarned       Float         @default(0)
  bankAccountNumber String?
  bankAccountName   String?
  bankName          String?
  createdAt         DateTime      @default(now())
  updatedAt         DateTime      @updatedAt

  miningSessions    MiningSession[]
  withdrawals       Withdrawal[]
  playSessions      PlaySession[]
  payments          Payment[]
}

enum Plan {
  BASIC
  PRO
  PREMIUM
}

model MiningSession {
  id          String    @id @default(cuid())
  userId      String
  startedAt   DateTime  @default(now())
  endedAt     DateTime?
  durationSec Int?
  earned      Float?
  autoMine    Boolean   @default(false)
  autoDays    Int?
  user        User      @relation(fields: [userId], references: [id])
}

model Withdrawal {
  id            String           @id @default(cuid())
  userId        String
  amount        Float
  status        WithdrawalStatus @default(PENDING)
  accountNumber String
  accountName   String
  bankName      String
  requestedAt   DateTime         @default(now())
  processedAt   DateTime?
  adminNote     String?
  user          User             @relation(fields: [userId], references: [id])
}

enum WithdrawalStatus {
  PENDING
  APPROVED
  DISBURSED
  REJECTED
}

model PlaySession {
  id            String   @id @default(cuid())
  userId        String
  gameId        String
  minutesPlayed Int
  coinsAwarded  Float
  createdAt     DateTime @default(now())
  user          User     @relation(fields: [userId], references: [id])
}

model Payment {
  id          String        @id @default(cuid())
  userId      String
  amount      Float
  type        PaymentType
  paystackRef String        @unique
  status      PaymentStatus @default(PENDING)
  createdAt   DateTime      @default(now())
  user        User          @relation(fields: [userId], references: [id])
}

enum PaymentType {
  PLAN_PURCHASE
  PLAN_UPGRADE
  TOPUP
}

enum PaymentStatus {
  PENDING
  SUCCESS
  FAILED
}
```

---

## Docker — PostgreSQL (`dbin/`)

Deployed as a separate service on Render.

### `dbin/Dockerfile`

```dockerfile
FROM postgres:16-alpine
ENV POSTGRES_DB=mines_db
ENV POSTGRES_USER=mines_user
ENV POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
COPY init.sql /docker-entrypoint-initdb.d/init.sql
EXPOSE 5432
```

### `dbin/docker-compose.yml`

```yaml
version: "3.9"
services:
  postgres:
    build: .
    restart: always
    environment:
      POSTGRES_DB: mines_db
      POSTGRES_USER: mines_user
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

volumes:
  pgdata:
```

### `dbin/init.sql`

```sql
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
```

### Render Deployment
- Create a **Web Service** on Render pointed at `dbin/`
- Set env var: `POSTGRES_PASSWORD=<strong-password>`
- Copy the exposed connection string into Next.js `DATABASE_URL`

---

## Environment Variables

```env
# .env.local

DATABASE_URL="postgresql://mines_user:password@host:5432/mines_db"

NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="https://yourdomain.com"

# Paystack — LIVE keys (active)
PAYSTACK_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY="pk_live_..."

NEXT_PUBLIC_APP_URL="https://yourdomain.com"

# GameMonetize
GAMEMONETIZE_FEED_URL="https://gamemonetize.com/feed.php"
```

> Never commit `.env.local`. The Paystack keys are LIVE — handle with care.

---

## Games Feed System

### Feed endpoint

```
GET https://gamemonetize.com/feed.php?format=0&category=4&num=20&page=1
```

Returns a JSON array. Each item has: `title`, `thumb` (thumbnail URL), `url`, `description`.

### API proxy route (`app/api/games/feed/route.ts`)

Always proxy server-side to avoid CORS and cache the response.

```ts
export async function GET() {
  const res = await fetch(
    "https://gamemonetize.com/feed.php?format=0&category=4&num=20&page=1",
    { next: { revalidate: 3600 } }  // cache 1 hour
  );
  const data = await res.json();
  return Response.json(data);
}
```

### Dashboard games preview — `GamesFeedPreview` component

- Fetches from `/api/games/feed`
- Renders a **horizontal scrollable strip** of all 20 game thumbnails
- Cards are **display only — NOT individually clickable**
- Right edge has a CSS gradient fade to hint at scrollability
- Section heading: "Games — Earn While You Play" with the user's earnings rate badge
- One CTA button below: **"Explore Games"** with a `ChevronRight` icon → navigates to `/games`

```tsx
// components/games/GamesFeedPreview.tsx
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
  const router = useRouter();

  useEffect(() => {
    fetch("/api/games/feed")
      .then((r) => r.json())
      .then(setGames)
      .catch(console.error);
  }, []);

  return (
    <section className="games-feed-section">
      {/* Header */}
      <div className="games-feed-header">
        <Gamepad2 size={18} />
        <h2>Games — Earn While You Play</h2>
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
        className="explore-games-btn"
        onClick={() => router.push("/games")}
      >
        Explore Games
        <ChevronRight size={16} />
      </button>
    </section>
  );
}
```

```css
/* Dashboard games feed styles */
.games-feed-section {
  margin-top: 2rem;
}
.games-feed-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.earnings-rate-badge {
  background: rgba(34, 197, 94, 0.15);
  color: var(--green-500);
  border: 1px solid rgba(34, 197, 94, 0.3);
  border-radius: 999px;
  padding: 2px 10px;
  font-size: 0.75rem;
  font-weight: 500;
}
.games-strip-outer {
  position: relative;
  overflow: hidden;
}
.games-strip {
  display: flex;
  gap: 0.75rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
  scrollbar-width: none;
}
.games-strip::-webkit-scrollbar { display: none; }
.games-strip-fade {
  position: absolute;
  top: 0; right: 0;
  width: 80px; height: 100%;
  background: linear-gradient(to right, transparent, var(--bg-primary));
  pointer-events: none;
}
.game-thumb-card {
  flex: 0 0 120px;
  user-select: none;
  pointer-events: none;        /* display only */
}
.game-thumb-card img {
  width: 120px;
  height: 90px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid var(--border);
}
.game-thumb-title {
  font-size: 0.7rem;
  color: var(--text-secondary);
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 120px;
}
.explore-games-btn {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: 1rem;
  padding: 0.5rem 1.25rem;
  background: var(--gold-500);
  color: #0a0f0d;
  font-weight: 600;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 0.875rem;
  transition: background 0.2s;
}
.explore-games-btn:hover {
  background: var(--gold-600);
}
```

---

## Games Page (`/games`) — Full Player

- Same feed from `/api/games/feed`, displayed as a grid
- Each card IS clickable → opens `GameMonetizeEmbed` inline
- Earnings badge on each card based on user's plan
- Playtime tracked, `/api/reward` called every 60 seconds of active play

### Ad logic — `GameMonetizeEmbed`

The `getAds` parameter in `window.VIDEO_OPTIONS` controls ads:
- Basic / Pro: `getAds: "true"` (ads shown)
- Premium: `getAds: "false"` (no ads)

```tsx
// components/games/GameMonetizeEmbed.tsx
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
```

### Passing `showAds` from the server

```tsx
// app/(dashboard)/games/page.tsx
import { getServerSession } from "next-auth";
import { PLANS } from "@/lib/plans";

export default async function GamesPage() {
  const session = await getServerSession();
  const plan = session?.user?.plan?.toLowerCase() as keyof typeof PLANS;
  const showAds = PLANS[plan]?.adsInGames ?? true;
  const coinsPerMinute = PLANS[plan]?.gameEarningsPerMinute ?? 5;

  return (
    <GameMonetizeEmbed
      gameId="4kci7og3klgj0ivy2wz3gdvd9dth5e7n"
      showAds={showAds}
      coinsPerMinute={coinsPerMinute}
    />
  );
}
```

---

## Design System

### Color Palette

```css
/* app/globals.css */
:root {
  /* Gold — value, money, CTAs, premium */
  --gold-50:  #fffbeb;
  --gold-100: #fef3c7;
  --gold-300: #fcd34d;
  --gold-400: #fbbf24;
  --gold-500: #d4af37;    /* Primary brand gold */
  --gold-600: #b8961f;
  --gold-700: #92740f;

  /* Green — activity, earnings, success */
  --green-400: #4ade80;
  --green-500: #22c55e;
  --green-600: #16a34a;
  --green-700: #15803d;
  --green-900: #14532d;

  /* Neutrals */
  --white:     #ffffff;
  --off-white: #f8f7f4;
  --gray-100:  #f1f0ec;
  --gray-200:  #e5e3dc;
  --gray-400:  #9ca3af;
  --gray-600:  #4b5563;
  --gray-800:  #1f2937;
  --gray-900:  #111827;

  /* Dark mode surfaces (deep forest green-black) */
  --surface-900: #0a0f0d;  /* Page background */
  --surface-800: #0f1a14;  /* Cards */
  --surface-700: #162010;  /* Elevated cards */
  --surface-600: #1e2d1a;  /* Borders */

  /* Semantic */
  --color-earn:    var(--green-500);
  --color-accent:  var(--gold-500);
  --color-danger:  #ef4444;
  --color-warning: #f59e0b;

  /* Light mode tokens */
  --text-primary:   var(--gray-900);
  --text-secondary: var(--gray-600);
  --text-muted:     var(--gray-400);
  --bg-primary:     var(--off-white);
  --bg-card:        var(--white);
  --border:         var(--gray-200);
}

[data-theme="dark"] {
  --text-primary:   var(--white);
  --text-secondary: #a3b8a8;    /* Desaturated green-tinted */
  --text-muted:     #5a6e5e;
  --bg-primary:     var(--surface-900);
  --bg-card:        var(--surface-800);
  --border:         var(--surface-600);
  --color-accent:   var(--gold-400);
  --color-earn:     var(--green-400);
}
```

### Color Hierarchy — Strict Rules

**Gold (`--gold-500`)** — use for:
- Primary CTA buttons (Start Mining, Explore Games, Withdraw)
- Balance amounts and total earnings display
- Plan badges for Basic/Premium highlights
- Active sidebar item accent
- Upgrade prompts and feature callouts

**Green (`--green-500`)** — use for:
- Mining active state indicator
- Live earnings ticker and per-second counter
- Success toasts and confirmations
- "Approved" / "Disbursed" status badges
- Earnings rate badges on game cards

**White** — page text on dark backgrounds, card content

**Do not** put gold and green on the same button or indicator. They each own a semantic role.

### Typography

```ts
// app/layout.tsx — next/font
import { Syne } from "next/font/google";
import { DM_Sans } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";

const syne = Syne({ subsets: ["latin"], weight: ["600", "700", "800"] });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500"] });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });
```

Usage:
- Page titles, plan names, large numbers, hero text → `Syne` 700–800
- Body, nav labels, descriptions, form labels → `DM Sans` 400–500
- Balance amounts, mining counters, wallet figures, session earnings → `JetBrains Mono`

### Visual Effects

```css
/* Gold shimmer on balance card */
.balance-card {
  background: linear-gradient(
    135deg,
    var(--surface-800) 0%,
    var(--surface-700) 45%,
    rgba(212, 175, 55, 0.06) 50%,
    var(--surface-700) 55%,
    var(--surface-800) 100%
  );
  background-size: 300% 100%;
  animation: shimmer 4s ease-in-out infinite;
}
@keyframes shimmer {
  0%   { background-position: 200% center; }
  100% { background-position: -200% center; }
}

/* Mining active glow (green) */
.mining-icon-active {
  filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.7))
          drop-shadow(0 0 24px rgba(34, 197, 94, 0.3));
  animation: pulse-glow 2s ease-in-out infinite;
}
@keyframes pulse-glow {
  0%, 100% { filter: drop-shadow(0 0 8px rgba(34, 197, 94, 0.5)); }
  50%       { filter: drop-shadow(0 0 22px rgba(34, 197, 94, 0.85))
                       drop-shadow(0 0 44px rgba(34, 197, 94, 0.35)); }
}

/* Coin toast float animation */
@keyframes coin-float {
  0%   { opacity: 1; transform: translateY(0) scale(1); }
  100% { opacity: 0; transform: translateY(-64px) scale(0.7); }
}
.coin-toast {
  position: absolute;
  bottom: 0;
  animation: coin-float 1.4s ease-out forwards;
  color: var(--gold-400);
  font-family: var(--font-mono);
  font-size: 0.8rem;
  pointer-events: none;
}

/* Card hover lift */
.card-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card-lift:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 40px rgba(212, 175, 55, 0.1);
}

/* Sidebar active nav item */
.sidebar-item-active {
  background: linear-gradient(90deg, rgba(212,175,55,0.1) 0%, transparent 100%);
  border-left: 2px solid var(--gold-500);
  color: var(--gold-400);
}

/* Subtle background grid texture */
.bg-grid {
  background-image:
    linear-gradient(var(--border) 1px, transparent 1px),
    linear-gradient(90deg, var(--border) 1px, transparent 1px);
  background-size: 40px 40px;
  background-position: center center;
  opacity: 0.04;
}

/* Plan badge variants */
.plan-badge-basic   { background: rgba(156,163,175,0.15); color: var(--gray-400); border: 1px solid rgba(156,163,175,0.3); }
.plan-badge-pro     { background: rgba(34,197,94,0.12);   color: var(--green-500); border: 1px solid rgba(34,197,94,0.3); }
.plan-badge-premium { background: rgba(212,175,55,0.12);  color: var(--gold-500); border: 1px solid rgba(212,175,55,0.3);
                      animation: shimmer 3s ease-in-out infinite; background-size: 200% 100%; }
```

### Component Visual Specs

**Balance card** — dark card with gold shimmer, large monospace balance in gold, subtle grid texture overlay at 3% opacity, plan badge in top-right corner

**Mining icon** — Lucide `Pickaxe` at 64px, Framer Motion rotation + scale pulse when active, green glow when mining, gray when stopped, coin icons (`Coins`) animate upward from the bottom every 2–3 seconds during active mining

**Sidebar** — dark `var(--surface-800)` background, `icon.png` logo at top, nav items with Lucide icons + labels, active item has gold left border + subtle gold tint, plan badge at the bottom of the sidebar

**Game cards (feed preview)** — 120×90px thumbnails, rounded 8px corners, title below in small muted text, pointer-events: none (not clickable)

**Game cards (games page)** — larger, clickable, hover shows gold border + scale 1.03, earnings badge overlay in top-right as green pill

**Earnings ticker** — `JetBrains Mono`, green color, updates every 100ms, shows 6 decimal places (e.g. `₦1,247.003472`)

---

## Page-by-Page Spec

### `/dashboard`

- Balance card with live earnings ticker (Basic plan: cents-per-second, 6dp, updates every 100ms)
- Plan summary: plan badge, next withdrawal date, mining status indicator
- **Games feed preview** (see `GamesFeedPreview` component):
  - Heading with earnings rate badge for user's plan
  - 20-thumbnail horizontal scroll strip — display only, not clickable
  - Right-edge gradient fade
  - Single "Explore Games" CTA → `/games`

### `/mine`

- Animated Framer Motion mining icon with glow
- Floating coin toasts rising from the icon
- Start / Stop mining toggle button
- **Auto-mine toggle** (Premium only) — non-premium click → navigate to `/upgrade/premium`
- Auto-mine duration selector: 3, 5, 7 days (shown only when auto-mine is on)
- Mining history table: date, duration, earned
- Current session progress bar

### `/games`

- Grid of game cards from `/api/games/feed` — all cards clickable
- Clicking a card opens `GameMonetizeEmbed` for that game
- Earnings badge on each card
- `showAds` determined server-side from session plan:
  - Basic / Pro → `getAds: "true"`
  - Premium → `getAds: "false"`
- Playtime tracked, `/api/reward` every 60 seconds

### `/withdraw`

- Step 1 (no bank saved): form for account number, account name, bank name → saves to user profile
- Step 2 (bank saved): show saved account, withdrawal amount input
- Validate plan threshold and allowed withdrawal dates server-side
- On submit: write `Withdrawal` record with `PENDING` status
- **No Paystack here** — admin disburses manually
- Withdrawal history with status badges (Pending / Approved / Disbursed / Rejected)

### `/upgrade/[plan]`

- Param: `"pro"` or `"premium"`
- Do NOT show Upgrade in sidebar for Premium users
- Basic users: show top-up amounts for both Pro (`+₦3,000`) and Premium (`+₦5,500`)
- Pro users: show top-up amount for Premium only (`+₦2,500`)
- Paystack payment for the top-up delta
- In-app earnings (`coinsBalance`) cannot fund upgrades

### `/admin/users`

- Table: name, email, plan badge, balance, join date
- Filter by plan

### `/admin/withdrawals`

- Table: user, amount, account details, date, status badge
- Approve / Reject actions with optional admin note

---

## Sidebar Navigation Rules

```
Dashboard    → all users
Mine         → all users
Games        → all users
Withdraw     → all users
Upgrade      → Basic and Pro ONLY — hidden for Premium
Admin        → isAdmin === true (separate admin layout)
```

---

## Mining Logic (`lib/mining.ts`)

```ts
// Source of truth: database coinsBalance
// Client tickers are visual interpolation only — never trust for writes

export function computeEarned(startedAt: Date, plan: PlanId): number {
  const secondsElapsed = (Date.now() - startedAt.getTime()) / 1000;
  return (secondsElapsed / 3600) * PLANS[plan].earningPerHour;
}
```

Rules:
1. `MiningSession` created on "Start Mining" click
2. Earnings = `(secondsElapsed / 3600) × earningPerHour`
3. On stop: write `endedAt` and `earned` to DB, increment `user.coinsBalance`
4. Premium auto-mine: new session created automatically when current one ends
5. `coinsBalance` in DB is the source of truth at all times

---

## Paystack Integration (`lib/paystack.ts`)

```ts
export async function initializePayment(email: string, amount: number, ref: string) {
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, amount: amount * 100, reference: ref }),
  });
  return res.json();
}
```

Reference format: `mines_${userId}_${Date.now()}`
Always verify server-side on callback before updating user plan.

---

## PWA Configuration

```json
// public/manifest.json
{
  "name": "Mines",
  "short_name": "Mines",
  "description": "Mine MINE$ and earn real naira",
  "start_url": "/dashboard",
  "display": "standalone",
  "background_color": "#0a0f0d",
  "theme_color": "#d4af37",
  "icons": [
    { "src": "/icon.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icon.png", "sizes": "512x512", "type": "image/png" }
  ]
}
```

Favicon and logo: `/public/icon.png` — set in `app/layout.tsx` via Next.js metadata API. Do not rename or duplicate.

---

## Commands

```bash
npm install
npm run dev

npx prisma generate
npx prisma migrate dev --name init
npx prisma studio

cd dbin && docker-compose up -d   # local Postgres

npm run build
```

---

## Axes System — Mining Boosts

Axes are purchasable weekly boosts that increase a user's earnings per second.
They are time-limited (7 days), paid via Paystack, and cannot be funded from in-app balance.

### Axes Tiers

Defined in `lib/axes.ts` — never hardcode these values elsewhere.

```ts
// lib/axes.ts

export const AXES = {
  basic: {
    id: "basic",
    name: "Basic Axe",
    price: 500,                          // NGN, paid via Paystack
    bonusPerSecond: 0.05 / 3600,         // +₦0.05 kobo per second → 0.05/3600 NGN/s
    bonusDisplay: "+₦0.05/s",
    durationDays: 7,
    color: "green",                      // UI accent
  },
  standard: {
    id: "standard",
    name: "Standard Axe",
    price: 1000,
    bonusPerSecond: 0.1 / 3600,
    bonusDisplay: "+₦0.1/s",
    durationDays: 7,
    color: "gold",
  },
  premium: {
    id: "premium",
    name: "Premium Axe",
    price: 2000,
    bonusPerSecond: 0.5 / 3600,
    bonusDisplay: "+₦0.5/s",
    durationDays: 7,
    color: "amber",
  },
} as const;

export type AxeId = keyof typeof AXES;
```

### How Axes Affect Earnings

When computing mining earnings, the active axe bonus is added on top of the plan's base rate:

```ts
// lib/mining.ts — updated computeEarned

import { PLANS, PlanId } from "./plans";
import { AXES } from "./axes";

export function computeEarned(
  startedAt: Date,
  plan: PlanId,
  activeAxeId?: string | null
): number {
  const secondsElapsed = (Date.now() - startedAt.getTime()) / 1000;
  const basePerSecond = PLANS[plan].earningPerHour / 3600;
  const axeBonus = activeAxeId
    ? (AXES[activeAxeId as keyof typeof AXES]?.bonusPerSecond ?? 0)
    : 0;
  return secondsElapsed * (basePerSecond + axeBonus);
}
```

The `axeBonus` is only applied during active mining sessions. Axes do not earn passively.

### Database Schema additions

Add to `prisma/schema.prisma`:

```prisma
model UserAxe {
  id          String   @id @default(cuid())
  userId      String
  axeId       String               // "basic" | "standard" | "premium"
  purchasedAt DateTime @default(now())
  expiresAt   DateTime             // purchasedAt + 7 days
  isActive    Boolean  @default(true)
  paystackRef String   @unique
  user        User     @relation(fields: [userId], references: [id])
}
```

Add relation to `User` model:

```prisma
model User {
  // ... existing fields
  axes        UserAxe[]
  activeAxeId String?              // cached id of current active axe, null if none/expired
}
```

### Axe Expiry Logic

- On purchase: set `expiresAt = purchasedAt + 7 days`, set `user.activeAxeId = axeId`
- On every mining earning computation: check `userAxe.expiresAt > now()` before applying bonus
- Cron job or on-request check: if `expiresAt < now()`, set `isActive = false` and `user.activeAxeId = null`
- A user can only hold one active axe at a time. Purchasing a new axe while one is active
  replaces it immediately (old one marked inactive, new one starts its 7-day window)

### API Routes

```
POST /api/axes/purchase          # Initialize Paystack payment for axe
GET  /api/axes/verify?ref=...    # Verify Paystack, activate axe, set expiresAt
GET  /api/axes/status            # Returns user's active axe + time remaining
```

#### `POST /api/axes/purchase`

```ts
// app/api/axes/purchase/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { AXES, AxeId } from "@/lib/axes";
import { initializePayment } from "@/lib/paystack";

export async function POST(req: NextRequest) {
  const session = await getServerSession();
  if (!session?.user?.id) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { axeId } = await req.json();
  const axe = AXES[axeId as AxeId];
  if (!axe) return NextResponse.json({ error: "Invalid axe" }, { status: 400 });

  const ref = `mines_axe_${session.user.id}_${Date.now()}`;
  const result = await initializePayment(session.user.email, axe.price, ref);

  // Store pending axe purchase ref for verification step
  await db.userAxe.create({
    data: {
      userId: session.user.id,
      axeId,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      isActive: false,           // activated only after Paystack verify
      paystackRef: ref,
    },
  });

  return NextResponse.json({ authorizationUrl: result.data.authorization_url });
}
```

#### `GET /api/axes/verify`

```ts
// app/api/axes/verify/route.ts
export async function GET(req: NextRequest) {
  const ref = req.nextUrl.searchParams.get("ref");
  // 1. Verify with Paystack secret key
  // 2. Find UserAxe by paystackRef
  // 3. Set isActive: true
  // 4. Deactivate any previous active axe for this user
  // 5. Set user.activeAxeId = axeId
  // Return redirect to /axes
}
```

### `/axes` Page

**Route**: `app/(dashboard)/axes/page.tsx`
**Sidebar**: visible to all users, icon: `Axe` from Lucide React

#### Page layout

```
┌─────────────────────────────────────────────┐
│  [Axe icon]  My Axes                        │
│  Boost your mining earnings with a weekly   │
│  axe. Expires after 7 days.                 │
├─────────────────────────────────────────────┤
│  ACTIVE AXE                                 │
│  ┌──────────────────────────────────────┐   │
│  │  [Axe icon]  Premium Axe             │   │
│  │  +₦0.5/s bonus  │  Expires in 3d 4h │   │
│  │  Progress bar (time remaining)       │   │
│  └──────────────────────────────────────┘   │
│  (or "No active axe" empty state)           │
├─────────────────────────────────────────────┤
│  CHOOSE AN AXE                              │
│                                             │
│  [Basic Axe]    [Standard Axe]  [Prem Axe]  │
│  ₦500/week      ₦1,000/week     ₦2,000/wk  │
│  +₦0.05/s       +₦0.1/s        +₦0.5/s    │
│  [Buy →]        [Buy →]         [Buy →]    │
├─────────────────────────────────────────────┤
│  AXES HISTORY                               │
│  Table: axe name, purchased, expired, cost  │
└─────────────────────────────────────────────┘
```

#### UX rules for `/axes`

- Show currently active axe with a countdown timer (days + hours remaining)
- Progress bar depletes over 7 days showing time remaining
- Each tier card shows: axe name, price, bonus per second, "Buy" button
- On "Buy": initialize Paystack → redirect to checkout → verify on return
- After successful purchase, redirect back to `/axes` with success toast
- If user already has an active axe and buys a new one: show confirmation modal
  "This will replace your current axe with X days remaining. Continue?"
- **Cannot use `coinsBalance` to buy axes** — Paystack only, same as upgrades
- Axes history table at bottom: axe tier, purchased date, expiry date, amount paid, status badge

#### Axe tier card visual

- Basic Axe → green accent (matches earnings color)
- Standard Axe → gold accent (matches premium brand color)
- Premium Axe → amber glow with shimmer border animation
- Active axe card has a pulsing border in its tier color
- Expired axe shows a grayscale card with "Expired" badge

### Sidebar update

Add `Axes` to the nav for all users:

```
Dashboard    → all users
Mine         → all users
Axes         → all users  (Axe icon from Lucide)
Games        → all users
Withdraw     → all users
Upgrade      → Basic and Pro ONLY
Admin        → isAdmin === true
```

---

## Hard Rules — Never Break These

1. No emojis anywhere — Lucide React icons only
2. Logo and favicon are always `/public/icon.png` — do not rename
3. Do NOT call Paystack on the `/withdraw` page — record to DB, admin disburses
4. Do NOT show Upgrade nav item to Premium users
5. Users CANNOT use `coinsBalance` for plan upgrades — Paystack only
6. Users CANNOT use `coinsBalance` to purchase axes — Paystack only
7. Auto-mine toggle for non-Premium users always navigates to `/upgrade/premium`
8. `adsInGames: false` for Premium → `getAds: "false"` in `VIDEO_OPTIONS` — no exceptions
9. Games feed on dashboard is display only — no individual card click — one CTA only
10. `coinsBalance` in the database is the source of truth — client tickers are visual only
11. All plan rules come from `lib/plans.ts`, all axe rules come from `lib/axes.ts` — never hardcode
12. Withdrawal amounts and dates validated server-side — never trust client
13. Game reward `/api/reward` has a server-side hourly cap — never skip this check
14. Axe bonus is only applied during active mining sessions — no passive axe earnings
15. A user can only have one active axe at a time — new purchase deactivates the previous one
16. Axe expiry is always checked server-side before applying bonus — never trust client clock
17. Gold = value / money / CTAs. Green = activity / live earnings / success. Never swap these roles.
18. Dark mode must work on every component — use CSS custom properties, never hardcode colors
19. One `gamemonetize-video-api` script tag per page — the component checks before injecting