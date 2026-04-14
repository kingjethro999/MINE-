import Image from "next/image";
import Link from "next/link";
import { Pickaxe, Gamepad2, Landmark, Check, Coins, TrendingUp, Shield, Zap, ArrowRight } from "lucide-react";
import { PLANS } from "@/lib/plans";
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
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--border)] py-8 mt-auto text-center text-[var(--text-muted)]">
        <p className="font-[family-name:var(--font-dm-sans)]">&copy; {new Date().getFullYear()} Mines Platform. All rights reserved.</p>
      </footer>
    </div>
  );
}
