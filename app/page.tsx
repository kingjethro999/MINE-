import { auth } from "@/auth";
import Link from "next/link";
import { Gamepad2, Landmark, Check, TrendingUp, Shield, Zap, ArrowRight, Users, Gift, Wallet, Star, Activity, Globe, Video, History, Banknote } from "lucide-react";
import { PLANS, BOOST_TIERS } from "@/lib/plans";
import HeaderNav from "@/components/landing/HeaderNav";

export default async function Home() {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-[family-name:var(--font-dm-sans)]">
      {/* Header with Auth State */}
      <HeaderNav isLoggedIn={isLoggedIn} />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center lg:p-24 relative overflow-hidden w-full max-w-7xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-3xl -z-10" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-8">
          <Banknote size={14} />
          Get Paid to Watch & Play
        </div>

        <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl lg:text-7xl font-extrabold max-w-4xl tracking-tight leading-tight mb-6">
          Watch Videos, <span className="text-[var(--color-accent)]">Earn Dollars</span>,<br className="hidden sm:block" /> Withdraw in Naira.
        </h1>

        <p className="max-w-2xl text-lg lg:text-xl text-[var(--text-secondary)] mb-6 leading-relaxed font-[family-name:var(--font-dm-sans)]">
          Sign up, pick a plan, and start earning today. Watch videos, play games, invite friends — then withdraw straight to your Nigerian bank account in Naira.
        </p>

        <p className="max-w-xl text-sm text-[var(--text-muted)] mb-10">
          Starter: <strong className="text-white">5 videos/day · $2 each</strong> · Pro: <strong className="text-white">10/day · $3</strong> · Elite: <strong className="text-[var(--color-accent)]">20/day · $5</strong> — plus game earnings every minute you play.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link href="/register" className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-lg text-[#0a0f0d] bg-[var(--color-accent)] rounded-xl hover:bg-[var(--gold-600)] transition shadow-lg shadow-[var(--gold-500)]/20">
            <Video size={20} />
            Start Earning
          </Link>
          <Link href="/login" className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-lg bg-[var(--bg-card)] border border-[var(--border)] rounded-xl hover:border-[var(--color-accent)] transition">
            Dashboard
          </Link>
        </div>

        {/* Earning highlights */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-32 border-y border-[var(--border)] py-8">
          <div className="text-center md:border-r border-[var(--border)]">
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1">Per Video</p>
            <p className="text-xl font-bold font-mono text-[var(--color-accent)]">$2 – $5</p>
          </div>
          <div className="text-center md:border-r border-[var(--border)]">
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1">Daily Videos</p>
            <p className="text-xl font-bold font-mono">5 – 20</p>
          </div>
          <div className="text-center md:border-r border-[var(--border)]">
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1">Game Earnings</p>
            <p className="text-xl font-bold font-mono text-green-500">Per minute</p>
          </div>
          <div className="text-center">
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1">Withdraw</p>
            <p className="text-xl font-bold font-mono">To any bank</p>
          </div>
        </div>

        {/* All ways to earn */}
        <div className="w-full max-w-6xl mb-32 text-left">
          <div className="text-center mb-12">
            <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl font-bold mb-4">4 Ways to Make Money</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">Every feature in the app is built around one goal: putting real money in your balance.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Video, title: "Watch Videos", desc: "Earn $2–$5 per video. Watch 90% to claim. Daily limits: 5, 10, or 20 based on plan.", color: "text-[var(--color-accent)]" },
              { icon: Gamepad2, title: "Play Games", desc: "Earn USD every minute you play. Higher plans pay more per minute.", color: "text-[var(--color-earn)]" },
              { icon: Zap, title: "Buy Boosts", desc: "24-hour multipliers (+25% to +100%) on all video and game earnings.", color: "text-amber-400" },
              { icon: Users, title: "Refer Friends", desc: "Earn 5% on everything your referrals make — videos, games, all of it.", color: "text-green-500" },
            ].map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="p-6 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl">
                <Icon size={28} className={`${color} mb-4`} />
                <h3 className="font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Core features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-32">
          <div className="flex flex-col items-center text-center p-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl transition hover:border-[var(--color-accent)]/50 group">
            <div className="p-4 bg-[var(--color-accent)]/10 rounded-2xl text-[var(--color-accent)] mb-4 group-hover:scale-110 transition-transform">
              <Video size={32} />
            </div>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-3">Watch & Earn</h3>
            <p className="text-[var(--text-secondary)]">Curated videos from our feed. Finish watching, claim your reward instantly. Up to 20 videos per day on Elite.</p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl transition hover:border-[var(--color-earn)]/50 group">
            <div className="p-4 bg-[var(--color-earn)]/10 rounded-2xl text-[var(--color-earn)] mb-4 group-hover:scale-110 transition-transform">
              <History size={32} />
            </div>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-3">Track Everything</h3>
            <p className="text-[var(--text-secondary)]">Dashboard shows your balance in Naira or USD (tap to switch). Full earnings history for every video and game session.</p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl transition hover:border-[var(--color-accent)]/50 group">
            <div className="p-4 bg-[var(--color-accent)]/10 rounded-2xl text-[var(--color-accent)] mb-4 group-hover:scale-110 transition-transform">
              <Landmark size={32} />
            </div>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-3">Cash Out to Bank</h3>
            <p className="text-[var(--text-secondary)]">Withdraw to any Nigerian bank. Live exchange rate applied. Elite plan: no minimum balance required.</p>
          </div>
        </div>

        {/* How it works */}
        <div className="w-full max-w-6xl mb-32">
          <div className="bg-gradient-to-br from-[var(--surface-800)] to-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <h3 className="font-[family-name:var(--font-syne)] text-2xl md:text-3xl font-bold text-center mb-12">Start Earning in 4 Steps</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="relative text-left">
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-[var(--color-accent)] rounded-lg flex items-center justify-center font-bold text-[#0a0f0d] shadow-lg">1</div>
                <div className="pt-6">
                  <h4 className="font-bold text-lg mb-2">Create Account</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Register free, then choose Starter, Advanced, or Elite and pay once via Paystack.</p>
                </div>
                <ArrowRight size={20} className="hidden md:block absolute -right-6 top-1/2 text-[var(--text-muted)]" />
              </div>
              <div className="relative text-left">
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-[var(--color-accent)] rounded-lg flex items-center justify-center font-bold text-[#0a0f0d] shadow-lg">2</div>
                <div className="pt-6">
                  <h4 className="font-bold text-lg mb-2">Watch & Play</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Go to Watch for videos or Games for play-to-earn. Earnings hit your balance immediately.</p>
                </div>
                <ArrowRight size={20} className="hidden md:block absolute -right-6 top-1/2 text-[var(--text-muted)]" />
              </div>
              <div className="relative text-left">
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-[var(--color-earn)] rounded-lg flex items-center justify-center font-bold text-[#0a0f0d] shadow-lg">3</div>
                <div className="pt-6">
                  <h4 className="font-bold text-lg mb-2">Boost & Refer</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Optional: buy a 24hr Boost to multiply earnings, or share your link to earn 5% from friends.</p>
                </div>
                <ArrowRight size={20} className="hidden md:block absolute -right-6 top-1/2 text-[var(--text-muted)]" />
              </div>
              <div className="relative text-left">
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center font-bold text-white shadow-lg">4</div>
                <div className="pt-6">
                  <h4 className="font-bold text-lg mb-2">Withdraw</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Hit your threshold, enter bank details, and request payout. See it in your History anytime.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plans Section */}
        <div className="w-full max-w-5xl mb-20 text-center">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Choose Your Plan</h2>
          <p className="text-[var(--text-secondary)] mb-12 max-w-xl mx-auto leading-relaxed">
            Higher plans earn more per video and per minute of gameplay.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {Object.values(PLANS).map((plan) => (
              <div key={plan.id} className={`flex flex-col p-8 bg-[var(--bg-card)] border ${plan.id === 'premium' ? 'border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/20 shadow-2xl shadow-[var(--color-accent)]/10' : 'border-[var(--border)]'} rounded-2xl relative overflow-hidden group`}>
                {plan.id === 'premium' && (
                  <div className="absolute top-0 right-0 bg-[var(--color-accent)] text-[#0a0f0d] text-xs font-black px-3 py-1 rounded-bl-lg uppercase tracking-widest shadow-lg">
                    Highest Earnings
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tighter">₦{plan.price.toLocaleString()}</span>
                    <span className="text-[var(--text-muted)] text-sm font-semibold">one-time</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  <div className="p-4 bg-[var(--surface-900)] rounded-xl border border-[var(--border)]">
                    <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-widest mb-1.5 font-bold">Per Video</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-[var(--color-accent)] font-mono">${plan.earningPerVideoUsd}/video</p>
                      <span className="text-[10px] px-2 py-0.5 bg-[var(--color-earn)]/10 text-[var(--color-earn)] rounded border border-[var(--color-earn)]/20 font-bold">{plan.dailyVideoLimit}/DAY</span>
                    </div>
                  </div>

                  <ul className="space-y-3.5 text-[var(--text-secondary)] text-sm">
                    <li className="flex items-center gap-2.5">
                      <div className="w-5 h-5 bg-[var(--color-earn)]/10 rounded-full flex items-center justify-center shrink-0">
                        <Check size={12} className="text-[var(--color-earn)]" />
                      </div>
                      <span><strong>${plan.gameEarningsPerMinuteUsd}/min</strong> game earnings</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-5 h-5 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center shrink-0">
                        <Check size={12} className="text-[var(--color-accent)]" />
                      </div>
                      <span className="font-medium">
                        {plan.withdrawalsPerMonth === Infinity ? 'Unlimited withdrawals' : `${plan.withdrawalsPerMonth} withdrawal${plan.withdrawalsPerMonth > 1 ? 's' : ''}/month`}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-5 h-5 bg-green-500/10 rounded-full flex items-center justify-center shrink-0">
                        <Check size={12} className="text-green-500" />
                      </div>
                      <span className="font-medium">{plan.dailyVideoLimit} videos per day</span>
                    </li>
                    {'adsInGames' in plan && plan.adsInGames === false && (
                      <li className="flex items-center gap-2.5">
                        <div className="w-5 h-5 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center shrink-0">
                          <Check size={12} className="text-[var(--color-accent)]" />
                        </div>
                        <span className="font-medium">Ad-free games</span>
                      </li>
                    )}
                  </ul>
                </div>

                <Link href="/register" className={`mt-auto text-center py-4 rounded-xl font-black transition-all transform active:scale-95 shadow-lg ${plan.id === 'premium' ? 'bg-[var(--color-accent)] text-[#0a0f0d] hover:bg-[var(--gold-600)] shadow-[var(--gold-500)]/20' : 'bg-[var(--surface-700)] text-[var(--text-primary)] hover:bg-[var(--surface-600)] shadow-black/20'}`}>
                  Get {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Boosts Section */}
        <div className="w-full max-w-6xl mb-32">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
              <Zap size={16} className="text-amber-400" />
              <span className="text-amber-400 font-semibold text-sm">Multiply Your Earnings</span>
            </div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">24-Hour Boosts</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
              Stack a temporary multiplier on top of your plan rate. Boosts apply to both video and game earnings for 24 hours.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(BOOST_TIERS).map((boost) => (
              <div key={boost.id} className="bg-gradient-to-br from-[var(--surface-800)] to-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 text-center relative overflow-hidden group hover:border-[var(--color-accent)]/30 transition-all">
                <div className={`absolute top-0 left-0 w-full h-1 ${boost.id === 'elite' ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : boost.id === 'advanced' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-gradient-to-r from-green-500 to-emerald-400'}`} />
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${boost.id === 'elite' ? 'bg-amber-500/20 shadow-lg shadow-amber-500/10' : boost.id === 'advanced' ? 'bg-blue-500/20' : 'bg-green-500/20'}`}>
                  <Zap size={32} className={boost.id === 'elite' ? 'text-amber-400' : boost.id === 'advanced' ? 'text-blue-400' : 'text-green-400'} />
                </div>
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-2">{boost.label}</h3>
                <div className="text-3xl font-black text-white mb-6 font-mono tracking-tighter">₦{boost.price.toLocaleString()}</div>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 p-3 bg-[var(--surface-900)] rounded-xl border border-[var(--border)]">
                    <TrendingUp size={16} className="text-green-500" />
                    <span className="text-xs font-bold font-mono">{boost.multiplierDisplay} on all earnings</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[var(--surface-900)] rounded-xl border border-[var(--border)]">
                    <Activity size={16} className="text-[var(--color-accent)]" />
                    <span className="text-xs font-bold font-mono">{boost.durationHours} hours active</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[var(--text-muted)] text-sm mt-8">
            Paid via Paystack. One active boost at a time — buying a new one replaces the current boost.
          </p>
        </div>

        {/* Referral System Section */}
        <div className="w-full max-w-6xl mb-32">
          <div className="bg-gradient-to-br from-[#0a1a0a] to-[var(--surface-800)] border border-green-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl animate-pulse" />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
                  <Users size={16} className="text-green-500" />
                  <span className="text-green-500 font-semibold text-sm">Invite & Earn</span>
                </div>
                <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">Referral Program</h2>
                <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                  Share your link and earn <span className="text-green-500 font-bold">5% of everything</span> your friends make — from videos, games, and more.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <Gift size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Instant credit</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Your 5% bonus lands in your balance as soon as your referral earns.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <TrendingUp size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Lifetime earnings</h4>
                      <p className="text-sm text-[var(--text-secondary)]">You keep earning 5% on all their video watches and game sessions.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <Star size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Unlock withdrawals</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Referrals count toward your downline requirement before you can withdraw.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--surface-900)] border border-[var(--surface-600)] rounded-3xl p-8 relative shadow-inner">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-green-500/20 rounded-2xl flex items-center justify-center shadow-lg">
                    <Users size={28} className="text-green-500" />
                  </div>
                  <div>
                    <h5 className="font-bold text-lg text-white">Your referral link</h5>
                    <p className="text-sm text-[var(--text-secondary)]">Available in your dashboard after signup</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-center p-4 bg-[var(--surface-800)] rounded-xl border border-[var(--border)]">
                    <span className="text-[var(--text-secondary)] text-sm font-medium">Commission rate</span>
                    <span className="font-black text-green-500 text-lg">5%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[var(--surface-800)] rounded-xl border border-[var(--border)]">
                    <span className="text-[var(--text-secondary)] text-sm font-medium">Applies to</span>
                    <span className="font-bold text-white text-sm">Videos & games</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[var(--surface-800)] rounded-xl border border-[var(--border)]">
                    <span className="text-[var(--text-secondary)] text-sm font-medium">Referral cap</span>
                    <span className="font-bold text-white uppercase text-xs tracking-widest px-2 py-1 bg-[var(--surface-700)] rounded">Unlimited</span>
                  </div>
                </div>

                <Link href="/register" className="mt-8 block p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-center hover:bg-green-500/20 transition">
                  <p className="text-sm text-green-500 font-bold">Sign up to get your link</p>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal System Section */}
        <div className="w-full max-w-6xl mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-full mb-6">
              <Wallet size={16} className="text-[var(--color-accent)]" />
              <span className="text-[var(--color-accent)] font-semibold text-sm">Cash Out</span>
            </div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Withdraw to Your Bank</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
              Your balance is stored in USD and converted to Naira at the live rate when you withdraw. Request a payout to any Nigerian bank account.
            </p>
          </div>

          <div className="bg-[var(--surface-800)] border border-[var(--border)] rounded-[40px] p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left side - How it works */}
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold mb-8 text-white">How withdrawal works</h3>
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="w-10 h-10 bg-[var(--color-accent)] rounded-xl flex items-center justify-center font-black text-[#0a0f0d] shrink-0 shadow-lg">1</div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Earn from videos & games</h4>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Every video and game session adds to your USD balance. Tap your balance to see it in Naira.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-10 h-10 bg-[var(--color-accent)] rounded-xl flex items-center justify-center font-black text-[#0a0f0d] shrink-0 shadow-lg">2</div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Meet your plan requirements</h4>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Hit the minimum balance and referral count for your plan. Elite has no minimum.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-10 h-10 bg-[var(--color-accent)] rounded-xl flex items-center justify-center font-black text-[#0a0f0d] shrink-0 shadow-lg">3</div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Submit request</h4>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Enter your bank details and amount. We apply the live USD→NGN rate at withdrawal time.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center font-black text-white shrink-0 shadow-lg">4</div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Receive in your bank</h4>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Admin reviews and disburses to your account. Processing time depends on your plan.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl relative">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <Shield size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-1">Why referral requirements?</p>
                      <p className="text-xs text-[var(--text-secondary)] leading-loose">
                        Each plan requires a minimum number of active referrals before your first withdrawal. This keeps the community growing and rewards users who bring others along.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Plan limits */}
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold mb-8 text-white">By plan</h3>
                <div className="space-y-4">
                  {Object.values(PLANS).map((plan) => (
                    <div key={plan.id} className={`p-5 rounded-2xl border ${plan.id === 'premium' ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5' : 'border-[var(--surface-600)] bg-[var(--surface-900)]'}`}>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-black text-white tracking-tight">{plan.name}</span>
                        <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full font-black">
                          {plan.withdrawalsPerMonth === Infinity ? 'Unlimited' : `${plan.withdrawalsPerMonth}x/month`}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                          <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-widest mb-1.5 font-bold">Minimum</p>
                          <p className="font-black text-white font-mono">
                            {plan.withdrawalThresholdNgn === 0 ? 'None' : `₦${plan.withdrawalThresholdNgn.toLocaleString()}`}
                          </p>
                        </div>
                        <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                          <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-widest mb-1.5 font-bold">Processing</p>
                          <p className="font-black text-white font-mono">{plan.disbursementDays < 1 ? 'Same day' : `${plan.disbursementDays} days`}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Withdrawal days</span>
                        <span className="text-[10px] text-[var(--color-accent)] font-bold uppercase tracking-widest">
                          {plan.withdrawalDays === "every_thursday" ? "Every Thursday" : `${plan.withdrawalDays.join(" & ")} of month`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--surface-900)] rounded-2xl border border-[var(--border)] text-center">
                    <p className="text-[10px] text-[var(--text-muted)] font-black uppercase mb-1">Withdrawal fee</p>
                    <p className="text-lg font-black text-white font-mono">0%</p>
                  </div>
                  <div className="p-4 bg-[var(--surface-900)] rounded-2xl border border-[var(--border)] text-center">
                    <p className="text-[10px] text-[var(--text-muted)] font-black uppercase mb-1">Currency</p>
                    <p className="text-lg font-black text-green-500 font-mono">NGN</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-12 mt-auto bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-left">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <span className="font-[family-name:var(--font-syne)] text-2xl font-extrabold tracking-tighter">MINE$</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              Watch videos, play games, and earn real money. Withdraw to your Nigerian bank account in Naira.
            </p>
          </div>

          <div>
            <h6 className="font-bold text-white mb-6 uppercase tracking-widest text-xs font-[family-name:var(--font-syne)]">Earn</h6>
            <ul className="space-y-4 text-sm text-[var(--text-muted)] font-medium">
              <li><Link href="/register" className="hover:text-[var(--color-accent)] transition-colors">Get Started</Link></li>
              <li><Link href="/login" className="hover:text-[var(--color-accent)] transition-colors">Dashboard</Link></li>
              <li><Link href="/register" className="hover:text-[var(--color-accent)] transition-colors">Plans & Pricing</Link></li>
            </ul>
          </div>

          <div>
            <h6 className="font-bold text-white mb-6 uppercase tracking-widest text-xs font-[family-name:var(--font-syne)]">Legals</h6>
            <ul className="space-y-4 text-sm text-[var(--text-muted)] font-medium">
              <li><Link href="/risk" className="hover:text-[var(--color-accent)] transition-colors">Risk Disclaimer</Link></li>
              <li><Link href="/terms" className="hover:text-[var(--color-accent)] transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-[var(--color-accent)] transition-colors">Privacy Policy</Link></li>
              <li><Link href="/aml" className="hover:text-[var(--color-accent)] transition-colors">AML Policy</Link></li>
            </ul>
          </div>

          <div className="bg-[var(--surface-900)] p-6 rounded-2xl border border-[var(--border)]">
            <h6 className="font-bold text-white mb-4 uppercase tracking-widest text-xs">Get started</h6>
            <Link href="/register" className="block w-full bg-[var(--color-accent)] text-[#0a0f0d] rounded-lg px-4 py-3 font-bold text-sm text-center hover:bg-[var(--gold-600)] transition">
              Start Earning
            </Link>
            <p className="text-[10px] text-[var(--text-muted)] mt-4">Watch videos. Play games. Withdraw to bank.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-muted)] font-medium">
            &copy; {new Date().getFullYear()} MINE$. All rights reserved.
          </p>
          <div className="flex gap-6 text-[var(--text-muted)]">

            <Activity size={16} className="hover:text-green-500 transition-colors" />
            <Globe size={16} className="hover:text-blue-500 transition-colors" />
            <Shield size={16} className="hover:text-[var(--color-accent)] transition-colors" />
          </div>
        </div>
      </footer>
    </div>
  );
}

