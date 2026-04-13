Here's a detailed spec document for both new features — **Axes Upgrades** and **Referrals** — written to match the style and conventions of your existing CLAUDE.md:

---

## New Features Spec — Append to CLAUDE.md

---

### Feature: Axes Upgrade (`/axes`)

#### Overview
Users can purchase an **Axes upgrade** that boosts their passive earnings per second. Axes are a **weekly subscription** — they expire after 7 days and must be renewed. Payment is via **live Paystack only** (no `coinsBalance`).

#### Axes Tiers

Defined in `lib/plans.ts` alongside PLANS — never hardcode:

```ts
export const AXES_TIERS = {
  starter: {
    id: "starter",
    label: "Starter Axe",
    price: 500,           // ₦500
    bonusPerSecond: 0.05, // kobo (added to earningPerSecond)
    durationDays: 7,
  },
  advanced: {
    id: "advanced",
    label: "Advanced Axe",
    price: 1000,
    bonusPerSecond: 0.1,
    durationDays: 7,
  },
  elite: {
    id: "elite",
    label: "Elite Axe",
    price: 2000,
    bonusPerSecond: 0.5,
    durationDays: 7,
  },
} as const;

export type AxesTierId = keyof typeof AXES_TIERS;
```

#### Prisma Schema additions

```prisma
model AxesPurchase {
  id          String    @id @default(cuid())
  userId      String
  tier        String                        // "starter" | "advanced" | "elite"
  purchasedAt DateTime  @default(now())
  expiresAt   DateTime                      // purchasedAt + 7 days
  active      Boolean   @default(true)
  paystackRef String    @unique
  user        User      @relation(fields: [userId], references: [id])
}
```

Add to `User` model:
```prisma
axesPurchases  AxesPurchase[]
```

#### Mining Logic Update (`lib/mining.ts`)

When computing earnings, check for an active, non-expired `AxesPurchase` and add the bonus:

```ts
export async function getActiveAxesBonus(userId: string): Promise<number> {
  const now = new Date();
  const active = await db.axesPurchase.findFirst({
    where: { userId, active: true, expiresAt: { gt: now } },
    orderBy: { purchasedAt: "desc" },
  });
  if (!active) return 0;
  return AXES_TIERS[active.tier as AxesTierId].bonusPerSecond;
}
```

Effective earning rate = `PLANS[plan].earningPerSecond + axesBonus`

#### API Routes

- `POST /api/axes/initialize` — create Paystack payment for selected tier
- `GET /api/axes/verify?ref=` — verify payment, write `AxesPurchase`, set `expiresAt = now + 7 days`
- `GET /api/axes/status` — return current active axe (tier, expiresAt, bonusPerSecond) or null

A daily/cron-compatible check (or lazy eval on session start): mark `active = false` on expired records.

#### `/axes` Page Spec

- Three tier cards side by side (or stacked on mobile): Starter / Advanced / Elite
- Each card shows: tier name, price (₦), bonus rate (`+0.05 kobo/s`, `+0.1 kobo/s`, `+0.5 kobo/s`), duration badge ("7-day boost")
- Active axe banner at top (if one is running): tier name, expiry countdown, bonus amount in green
- Expired notice if last axe has lapsed (with CTA to renew)
- "Buy Axe" button → Paystack live payment (no `coinsBalance`)
- After payment verified, redirect back to `/axes` with success state
- Hard rule: only one axe active at a time per user — purchasing a new one replaces (expires old)

#### Sidebar addition
```
Axes  → all users (below Mine, above Games)
```

---

### Feature: Referral System (`/referral`)

#### Overview
Every user's **referral code is their user ID**. They share a link; when someone registers through it, a referral relationship is created. The referrer earns **5% of their downline's monthly earnings**, credited automatically.

#### Prisma Schema additions

```prisma
model Referral {
  id           String   @id @default(cuid())
  referrerId   String                          // user who referred
  refereeId    String   @unique               // user who was referred (1 referrer per user)
  createdAt    DateTime @default(now())
  referrer     User     @relation("ReferrerReferrals", fields: [referrerId], references: [id])
  referee      User     @relation("RefereeReferral",  fields: [refereeId],  references: [id])
}

model ReferralEarning {
  id           String   @id @default(cuid())
  referrerId   String
  refereeId    String
  month        String                          // "2025-07" (YYYY-MM)
  refereeEarned Float                          // total referee earned that month
  commission   Float                           // 5% of refereeEarned
  creditedAt   DateTime @default(now())
  referrer     User     @relation(fields: [referrerId], references: [id])
}
```

Add to `User` model:
```prisma
referralsMade    Referral[]       @relation("ReferrerReferrals")
referralReceived Referral?        @relation("RefereeReferral")
referralEarnings ReferralEarning[]
```

#### Registration Flow update (`/register`)

- URL format: `/register/[referralCode]` where `referralCode = referrer's user ID`
- On the register page, if `referralCode` is in the URL, pre-fill and lock the **Referral Code** field
- On account creation: look up user with `id = referralCode`, create `Referral` record linking new user to referrer
- Referral code field is optional (users can register without one)

#### API Routes

- `GET /api/referral/status` — return current user's referral link, downline list (name, plan, joined date, this month's earnings), and total commissions earned
- `POST /api/referral/commission/run` — (admin or cron) for a given month, compute 5% of each referee's `totalEarned` delta for that month and write `ReferralEarning`, credit referrer's `coinsBalance`

#### Commission Logic

```ts
// Run monthly (cron or admin trigger)
// For each active Referral:
//   1. Sum referee's mining earnings for the month
//   2. commission = refereeMonthlyEarnings * 0.05
//   3. Insert ReferralEarning record
//   4. Increment referrer.coinsBalance by commission
```

#### `/referral` Page Spec

- **My Referral Link** section:
  - Display full link: `[origin]/register/[userId]`
  - Copy-to-clipboard button (Lucide `Copy` icon)
  - Info notice: *"You earn 5% of your downline's monthly earnings, credited to your balance"*
- **Downline table**:
  - Columns: Name, Plan badge, Joined date, This month's earnings, Your 5% commission
  - Empty state if no referrals yet
- **Total Commission Earned** — monospace gold figure, cumulative
- No paywall — available to all users

#### Sidebar addition
```
Referral → all users (below Withdraw, above Upgrade)
```

---

### Updated Sidebar Order

```
Dashboard   → all users
Mine        → all users
Axes        → all users   ← NEW
Games       → all users
Withdraw    → all users
Referral    → all users   ← NEW
Upgrade     → Basic and Pro ONLY
Admin       → isAdmin only
```

---

### Hard Rules — Axes & Referral

16. Axes payments use **live Paystack only** — `coinsBalance` cannot fund an axe purchase
17. Only one axe active per user at a time — a new purchase expires the previous one immediately
18. Axes bonus is always fetched server-side before mining session earnings are computed — never trust client-reported bonus
19. Referral code = user's `id` (cuid) — no separate code generation needed
20. Register link format is `/register/[userId]` — the param pre-fills and locks the referral field on the form
21. Referral commission (5%) is credited to `coinsBalance` — it counts as withdrawable earnings
22. Commission runs are server-side only (admin panel or cron) — never trigger from client
23. Each user can only have **one referrer** — `refereeId` is `@unique` in the `Referral` model