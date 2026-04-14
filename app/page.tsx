import Image from "next/image";
import Link from "next/link";
import { Pickaxe, Gamepad2, Landmark, Check, Coins, TrendingUp, Shield, Zap, ArrowRight, Users, Gift, Wallet, Star, Swords, Award } from "lucide-react";
import { PLANS, AXES_TIERS } from "@/lib/plans";
import MobileHeader from "@/components/layout/MobileHeader";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-[family-name:var(--font-dm-sans)]">
      {/* Desktop Header */}
      <header className="hidden lg:flex justify-between items-center p-6 lg:px-12 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Image src="/icon.png" alt="Mines Platform Icon" width={40} height={40} />
          <span className="font-[family-name:var(--font-syne)] font-bold text-2xl tracking-tight text-[var(--color-accent)]">Mines</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="px-4 py-2 font-medium hover:text-[var(--color-accent)] transition">Log In</Link>
          <Link href="/register" className="px-5 py-2 font-semibold text-[#0a0f0d] bg-[var(--color-accent)] rounded-lg hover:bg-[var(--gold-600)] transition">Sign Up</Link>
        </nav>
      </header>

      {/* Mobile Header */}
      <MobileHeader />

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center lg:p-24 relative overflow-hidden w-full max-w-7xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-3xl -z-10" />
        
        <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl lg:text-7xl font-extrabold max-w-4xl tracking-tight leading-tight mb-6">
          Mine <span className="text-[var(--color-accent)]">MINE$</span>, Play Games,<br className="hidden sm:block" /> Earn Real Naira.
        </h1>
        
        <p className="max-w-2xl text-lg lg:text-xl text-[var(--text-secondary)] mb-10 leading-relaxed font-[family-name:var(--font-dm-sans)]">
          Join the premium Progressive Web App where mining virtual currency and playing games turns into real-world withdrawals. Choose your plan and start earning today.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link href="/register" className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-lg text-[#0a0f0d] bg-[var(--color-accent)] rounded-xl hover:bg-[var(--gold-600)] transition shadow-lg shadow-[var(--gold-500)]/20">
            <Pickaxe size={20} />
            Start Mining Now
          </Link>
          <Link href="/login" className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-lg bg-[var(--bg-card)] border border-[var(--border)] rounded-xl hover:border-[var(--color-accent)] transition">
             Enter Dashboard
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-32">
          <div className="flex flex-col items-center text-center p-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl transition hover:border-[var(--color-accent)]/50">
            <div className="p-4 bg-[var(--color-accent)]/10 rounded-full text-[var(--color-accent)] mb-4">
              <Pickaxe size={32} />
            </div>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-3">Auto Mining</h3>
            <p className="text-[var(--text-secondary)]">Register on one of our subscription plans and watch your MINE$ balance grow over time.</p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl transition hover:border-[var(--color-earn)]/50">
            <div className="p-4 bg-[var(--color-earn)]/10 rounded-full text-[var(--color-earn)] mb-4">
              <Gamepad2 size={32} />
            </div>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-3">Play & Earn</h3>
            <p className="text-[var(--text-secondary)]">Explore our rich library of games. Earn additional MINE$ for every minute you spend playing.</p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl transition hover:border-[var(--color-accent)]/50">
            <div className="p-4 bg-[var(--color-accent)]/10 rounded-full text-[var(--color-accent)] mb-4">
              <Landmark size={32} />
            </div>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-3">Real Withdrawals</h3>
            <p className="text-[var(--text-secondary)]">Convert your MINE$ to real Naira. Withdraw directly to your local bank account securely.</p>
          </div>
        </div>

        {/* MINE$ Token Section */}
        <div className="w-full max-w-6xl mb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-full mb-6">
              <Coins size={16} className="text-[var(--color-accent)]" />
              <span className="text-[var(--color-accent)] font-semibold text-sm">Powered by MINE Coin (MIH)</span>
            </div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">What is MINE$?</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              MINE$ is a hybrid cryptocurrency bridging traditional finance with DeFi. Tradeable on major exchanges with real USD value.
            </p>
          </div>

          {/* Token Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-center">
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">Current Price</p>
              <p className="text-2xl font-bold text-[var(--color-accent)]">$0.16 - $0.19</p>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-center">
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">Max Supply</p>
              <p className="text-2xl font-bold text-white">2B</p>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-center">
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">Listed On</p>
              <p className="text-lg font-bold text-white">MEXC & XT.COM</p>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-center">
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">Type</p>
              <p className="text-lg font-bold text-white">Hybrid PayFi + DeFi</p>
            </div>
          </div>

          {/* How Mining Works */}
          <div className="bg-gradient-to-br from-[var(--surface-800)] to-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-8 md:p-12">
            <h3 className="font-[family-name:var(--font-syne)] text-2xl md:text-3xl font-bold text-center mb-12">How You Earn MINE$</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-[var(--color-accent)] rounded-full flex items-center justify-center font-bold text-[#0a0f0d]">1</div>
                <div className="pt-6">
                  <div className="p-3 bg-[var(--color-accent)]/10 rounded-lg w-fit mb-4">
                    <Shield size={24} className="text-[var(--color-accent)]" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Choose Your Plan</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Select a subscription tier that determines your mining power and earning rate.</p>
                </div>
                <ArrowRight size={20} className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/4 text-[var(--text-muted)]" />
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-[var(--color-accent)] rounded-full flex items-center justify-center font-bold text-[#0a0f0d]">2</div>
                <div className="pt-6">
                  <div className="p-3 bg-[var(--color-accent)]/10 rounded-lg w-fit mb-4">
                    <Pickaxe size={24} className="text-[var(--color-accent)]" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Start Mining</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Your MINE$ is mined through validated platform activity. Premium users auto-mine 24/7.</p>
                </div>
                <ArrowRight size={20} className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/4 text-[var(--text-muted)]" />
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-[var(--color-accent)] rounded-full flex items-center justify-center font-bold text-[#0a0f0d]">3</div>
                <div className="pt-6">
                  <div className="p-3 bg-[var(--color-earn)]/10 rounded-lg w-fit mb-4">
                    <TrendingUp size={24} className="text-[var(--color-earn)]" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Accumulate Value</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Play games and refer users to earn bonus MINE$. Every token increases in real value.</p>
                </div>
                <ArrowRight size={20} className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/4 text-[var(--text-muted)]" />
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-[var(--color-accent)] rounded-full flex items-center justify-center font-bold text-[#0a0f0d]">4</div>
                <div className="pt-6">
                  <div className="p-3 bg-green-500/10 rounded-lg w-fit mb-4">
                    <Zap size={24} className="text-green-500" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Withdraw</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Convert your MINE$ to Naira at market rate and withdraw directly to your bank account.</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--surface-700)] rounded-full flex items-center justify-center shrink-0">
                  <TrendingUp size={20} className="text-green-500" />
                </div>
                <div>
                  <p className="font-semibold">Market Traded</p>
                  <p className="text-sm text-[var(--text-secondary)]">MIH listed on MEXC & XT.COM</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--surface-700)] rounded-full flex items-center justify-center shrink-0">
                  <Shield size={20} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="font-semibold">Transparent Value</p>
                  <p className="text-sm text-[var(--text-secondary)]">MIH backed by real platform activity</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--surface-700)] rounded-full flex items-center justify-center shrink-0">
                  <Zap size={20} className="text-amber-500" />
                </div>
                <div>
                  <p className="font-semibold">Fast Settlements</p>
                  <p className="text-sm text-[var(--text-secondary)]">Withdrawals within 6 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plans Section */}
        <div className="w-full max-w-5xl mb-20 text-center">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Choose Your Plan</h2>
          <p className="text-[var(--text-secondary)] mb-12 max-w-xl mx-auto">
            Get started with a one-time subscription that fits your earning goals. Upgrade anytime.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {Object.values(PLANS).map((plan) => (
              <div key={plan.id} className={`flex flex-col p-8 bg-[var(--bg-card)] border ${plan.id === 'premium' ? 'border-[var(--color-accent)]' : 'border-[var(--border)]'} rounded-2xl relative overflow-hidden`}>
                {plan.id === 'premium' && (
                  <div className="absolute top-0 right-0 bg-[var(--color-accent)] text-[#0a0f0d] text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                    Recommended
                  </div>
                )}
                <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-extrabold tracking-tight">₦{plan.price.toLocaleString()}</span>
                </div>
                
                <ul className="space-y-4 mb-8 flex-1 text-[var(--text-secondary)]">
                  <li className="flex items-start gap-3">
                    <Check size={20} className="text-[var(--color-accent)] shrink-0" />
                    <span>Earn <strong>₦{plan.earningPerHour} per hour</strong> mining</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={20} className="text-[var(--color-earn)] shrink-0" />
                    <span>Earn <strong>₦{plan.gameEarningsPerMinute}/min</strong> in games</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={20} className="text-[var(--color-accent)] shrink-0" />
                    <span>{plan.withdrawalsPerMonth === Infinity ? 'Unlimited withdrawals' : `${plan.withdrawalsPerMonth} withdrawal${plan.withdrawalsPerMonth > 1 ? 's' : ''} per month`}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check size={20} className={plan.autoMine ? "text-[var(--color-accent)] shrink-0" : "text-[var(--border)] shrink-0"} />
                    <span className={plan.autoMine ? "" : "line-through opacity-70"}>Auto-mine while offline</span>
                  </li>
                </ul>

                <Link href={`/register`} className={`mt-auto text-center py-3 rounded-lg font-bold transition-colors ${plan.id === 'premium' ? 'bg-[var(--color-accent)] text-[#0a0f0d] hover:bg-[var(--gold-600)]' : 'bg-[var(--surface-700)] text-[var(--text-primary)] hover:bg-[var(--surface-600)]'}`}>
                  Get {plan.name}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Axes System Section */}
        <div className="w-full max-w-6xl mb-32">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
              <Swords size={16} className="text-amber-400" />
              <span className="text-amber-400 font-semibold text-sm">Power Up Your Mining</span>
            </div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Mining Axes</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              Equip powerful mining axes to boost your MINE$ earning rate. Each axe provides permanent bonus multipliers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(AXES_TIERS).map((axe) => (
              <div key={axe.id} className="bg-gradient-to-br from-[var(--surface-800)] to-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 text-center relative overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 ${axe.id === 'elite' ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : axe.id === 'advanced' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-gradient-to-r from-gray-500 to-gray-400'}`} />
                <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-6 ${axe.id === 'elite' ? 'bg-amber-500/20' : axe.id === 'advanced' ? 'bg-blue-500/20' : 'bg-gray-500/20'}`}>
                  <Award size={32} className={axe.id === 'elite' ? 'text-amber-400' : axe.id === 'advanced' ? 'text-blue-400' : 'text-gray-400'} />
                </div>
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-2">{axe.label}</h3>
                <div className="text-3xl font-bold text-white mb-4 mono-figure">₦{axe.price.toLocaleString()}</div>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 p-3 bg-[var(--surface-900)] rounded-lg">
                    <TrendingUp size={16} className="text-green-500" />
                    <span className="text-sm">+{(axe.bonusPerSecond * 3600).toFixed(2)}/hr bonus</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[var(--surface-900)] rounded-lg">
                    <Shield size={16} className="text-[var(--color-accent)]" />
                    <span className="text-sm">{axe.durationDays} days duration</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[var(--text-muted)] text-sm mt-8">
            Axes stack with your plan's base earning rate for maximum MINE$ accumulation.
          </p>
        </div>

        {/* Referral System Section */}
        <div className="w-full max-w-6xl mb-32">
          <div className="bg-gradient-to-br from-[#0a1a0a] to-[var(--surface-800)] border border-green-500/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-3xl" />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
                  <Users size={16} className="text-green-500" />
                  <span className="text-green-500 font-semibold text-sm">Unlimited Earning Potential</span>
                </div>
                <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl font-bold mb-4">Referral Program</h2>
                <p className="text-[var(--text-secondary)] text-lg mb-8">
                  Invite friends and earn <span className="text-green-500 font-bold">5% commission</span> on every MINE$ they earn. The more you refer, the more you earn — passively and infinitely.
                </p>
                
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                      <Gift size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Instant Commissions</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Get paid the moment your downline stops mining — no waiting, no delays.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                      <TrendingUp size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">5% Lifetime Earnings</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Commission applies to all mining AND game earnings your referrals make.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center shrink-0">
                      <Star size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1">Unlimited Downlines</h4>
                      <p className="text-sm text-[var(--text-secondary)]">No cap on how many people you can refer. Build a massive network.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[var(--surface-900)] border border-[var(--surface-600)] rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Users size={24} className="text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-muted)]">Your Referral Link</p>
                    <p className="font-mono text-sm text-green-400">mines.app/register/[ID]</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-[var(--surface-800)] rounded-lg">
                    <span className="text-[var(--text-secondary)]">Your Downlines</span>
                    <span className="font-bold text-white">∞ Unlimited</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[var(--surface-800)] rounded-lg">
                    <span className="text-[var(--text-secondary)]">Commission Rate</span>
                    <span className="font-bold text-green-500">5%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[var(--surface-800)] rounded-lg">
                    <span className="text-[var(--text-secondary)]">Earning Types</span>
                    <span className="font-bold text-white">Mining + Games</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Withdrawal System Section */}
        <div className="w-full max-w-6xl mb-20">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-full mb-6">
              <Wallet size={16} className="text-[var(--color-accent)]" />
              <span className="text-[var(--color-accent)] font-semibold text-sm">Bank Transfers Made Easy</span>
            </div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Withdrawal System</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg">
              Convert your MINE$ to real Naira and withdraw directly to your Nigerian bank account.
            </p>
          </div>

          <div className="bg-[var(--surface-800)] border border-[var(--border)] rounded-3xl p-8 md:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Left side - How it works */}
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-6">How Withdrawals Work</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center font-bold text-[#0a0f0d] shrink-0">1</div>
                    <div>
                      <h4 className="font-bold mb-1">Accumulate MINE$</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Mine MINE$ through your plan and boost with axes. Play games for extra earnings.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center font-bold text-[#0a0f0d] shrink-0">2</div>
                    <div>
                      <h4 className="font-bold mb-1">Reach Minimum Threshold</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Basic/Pro: ₦15,000 min | Premium: No minimum required</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-[var(--color-accent)] rounded-full flex items-center justify-center font-bold text-[#0a0f0d] shrink-0">3</div>
                    <div>
                      <h4 className="font-bold mb-1">Submit Withdrawal Request</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Choose your amount and verified bank account. Request processed instantly.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center font-bold text-white shrink-0">4</div>
                    <div>
                      <h4 className="font-bold mb-1">Receive Naira</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Funds transferred to your bank account within 6 hours of approval.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Plan limits */}
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-6">Withdrawal Limits by Plan</h3>
                <div className="space-y-4">
                  {Object.values(PLANS).map((plan) => (
                    <div key={plan.id} className={`p-4 rounded-xl border ${plan.id === 'premium' ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5' : 'border-[var(--surface-600)] bg-[var(--surface-900)]'}`}>
                      <div className="flex justify-between items-center mb-3">
                        <span className="font-bold">{plan.name}</span>
                        <span className="text-xs px-2 py-1 bg-[var(--surface-700)] rounded-full">
                          {plan.withdrawalsPerMonth === Infinity ? 'Unlimited' : `${plan.withdrawalsPerMonth}x/month`}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-[var(--text-muted)] text-xs">Min. Threshold</p>
                          <p className="font-semibold mono-figure">
                            {plan.withdrawalThreshold === 0 ? 'None' : `₦${plan.withdrawalThreshold.toLocaleString()}`}
                          </p>
                        </div>
                        <div>
                          <p className="text-[var(--text-muted)] text-xs">Settlement Time</p>
                          <p className="font-semibold">{plan.disbursementDays < 1 ? '< 1 day' : `${plan.disbursementDays} days`}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-[var(--surface-600)]">
                        <p className="text-xs text-[var(--text-muted)]">
                          Withdraw days: {plan.withdrawalDays === "every_thursday" ? "Every Thursday" : plan.withdrawalDays.join("th & ") + "th"}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <Shield size={18} className="text-amber-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm">Downline Requirement</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-1">
                        Users must have a minimum downline count to unlock withdrawals: Premium (2), Pro (5), Basic (10).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 mt-auto text-center text-[var(--text-muted)]">
        <p className="font-[family-name:var(--font-dm-sans)]">&copy; {new Date().getFullYear()} Mines Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
