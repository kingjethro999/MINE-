import { auth } from "@/auth";
import HeaderNav from "@/components/landing/HeaderNav";
import Link from "next/link";
import { Activity, Clock3, Gamepad2, Landmark, Pickaxe, Wallet } from "lucide-react";
import { AXES_TIERS, PLANS } from "@/lib/plans";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <HeaderNav isLoggedIn={isLoggedIn} />

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-20 space-y-20">
        <section className="text-center space-y-5">
          <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Mine, play, and track your rewards in one place
          </h1>
          <p className="max-w-3xl mx-auto text-[var(--text-secondary)] text-base md:text-lg">
            Mines is built around a simple loop: start an earning session, play partner games for extra credits,
            and request withdrawals when your plan requirements are met. Everything is visible inside your account,
            including rates, limits, and request history.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/register" className="px-6 py-3 rounded-xl bg-[var(--gold-500)] hover:bg-[var(--gold-600)] text-[#0a0f0d] font-semibold">
              Create account
            </Link>
            <Link href="/login" className="px-6 py-3 rounded-xl border border-[var(--border)] hover:border-[var(--gold-500)] font-semibold">
              Sign in
            </Link>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
            <Pickaxe className="text-green-500 mb-3" size={20} />
            <h3 className="font-semibold mb-2">Earning sessions</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Your plan sets your base earning rate. Rewards accumulate while your session is active,
              and your dashboard shows the live value in real time.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
            <Gamepad2 className="text-green-500 mb-3" size={20} />
            <h3 className="font-semibold mb-2">Game bonuses</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Some partner games include engagement campaigns. Eligible playtime can add extra
              credits based on your current plan&apos;s game rate.
            </p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6">
            <Landmark className="text-green-500 mb-3" size={20} />
            <h3 className="font-semibold mb-2">Withdrawals</h3>
            <p className="text-sm text-[var(--text-secondary)]">
              Every plan has its own withdrawal threshold, schedule, and monthly limits.
              Requests move through visible status steps in your history.
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-8 md:p-10">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold mb-3">How it works</h2>
          <p className="text-[var(--text-secondary)] mb-6">
            The app uses a straightforward structure. You can always check your rate, activity, and request status from the dashboard.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
            <div className="p-4 rounded-xl border border-[var(--border)]">
              <p className="text-[var(--text-muted)] mb-1">Step 1</p>
              <p className="font-semibold">Pick a plan and start your earning session.</p>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)]">
              <p className="text-[var(--text-muted)] mb-1">Step 2</p>
              <p className="font-semibold">Track your live balance and progress.</p>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)]">
              <p className="text-[var(--text-muted)] mb-1">Step 3</p>
              <p className="font-semibold">Play games for extra eligible rewards.</p>
            </div>
            <div className="p-4 rounded-xl border border-[var(--border)]">
              <p className="text-[var(--text-muted)] mb-1">Step 4</p>
              <p className="font-semibold">Submit withdrawal requests when you qualify.</p>
            </div>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold">Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(PLANS).map((plan) => (
              <div key={plan.id} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 space-y-3">
                <h3 className="font-semibold">{plan.name}</h3>
                <p className="text-sm text-[var(--text-secondary)]">Plan fee: ₦{plan.price.toLocaleString()}</p>
                <p className="text-sm text-[var(--text-secondary)]">Base rate: ₦{plan.earningPerHour}/hour</p>
                <p className="text-sm text-[var(--text-secondary)]">Game rate: ₦{plan.gameEarningsPerMinute}/minute</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl font-bold">Axe boosts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.values(AXES_TIERS).map((axe) => (
              <div key={axe.id} className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 space-y-2">
                <h4 className="font-semibold">{axe.label}</h4>
                <p className="text-sm text-[var(--text-secondary)]">Price: ₦{axe.price.toLocaleString()}</p>
                <p className="text-sm text-[var(--text-secondary)]">
                  Bonus rate: +₦{(axe.bonusPerSecond * 3600).toFixed(2)}/hour during active session
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-2xl border border-[var(--border)] p-5">
            <Clock3 className="text-green-500 mb-2" size={18} />
            <p className="font-semibold mb-1">Clear timelines</p>
            <p className="text-sm text-[var(--text-secondary)]">Withdrawal processing time depends on your plan and request day.</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] p-5">
            <Wallet className="text-green-500 mb-2" size={18} />
            <p className="font-semibold mb-1">Visible account history</p>
            <p className="text-sm text-[var(--text-secondary)]">You can review withdrawals, statuses, and session activity at any time.</p>
          </div>
          <div className="rounded-2xl border border-[var(--border)] p-5">
            <Activity className="text-green-500 mb-2" size={18} />
            <p className="font-semibold mb-1">Simple dashboard</p>
            <p className="text-sm text-[var(--text-secondary)]">Rates, limits, and activity are shown directly without unnecessary jargon.</p>
          </div>
        </section>
      </main>

      <footer className="border-t border-[var(--border)] py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row gap-3 md:items-center md:justify-between text-sm">
          <p className="text-[var(--text-secondary)]">Mines rewards users through plan activity, gameplay bonuses, and referral participation.</p>
          <div className="flex gap-3">
            <Link href="/register" className="px-4 py-2 rounded-lg bg-[var(--gold-500)] hover:bg-[var(--gold-600)] text-[#0a0f0d] font-semibold">
              Get started
            </Link>
            <Link href="/login" className="px-4 py-2 rounded-lg border border-[var(--border)] hover:border-[var(--gold-500)] font-semibold">
              Sign in
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
