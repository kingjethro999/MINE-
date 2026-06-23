import { auth } from "@/auth";
import Link from "next/link";
import { Layers, Gamepad2, Landmark, Check, Coins, TrendingUp, Shield, Zap, ArrowRight, Users, Gift, Wallet, Star, Server, Award, Lock, Activity, Globe } from "lucide-react";
import { PLANS, AXES_TIERS } from "@/lib/plans";
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

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/20 text-[var(--color-accent)] text-xs font-bold uppercase tracking-widest mb-8 animate-pulse">
          <Activity size={14} />
          Live Protocol Status: 99.9% Uptime
        </div>

        <h1 className="font-[family-name:var(--font-syne)] text-4xl md:text-5xl lg:text-7xl font-extrabold max-w-4xl tracking-tight leading-tight mb-6">
          Stake <span className="text-[var(--color-accent)]">MINE$</span>, Earn Yield,<br className="hidden sm:block" /> Secure Your Future.
        </h1>

        <p className="max-w-2xl text-lg lg:text-xl text-[var(--text-secondary)] mb-10 leading-relaxed font-[family-name:var(--font-dm-sans)]">
          The premier decentralized yield-generation protocol. Join thousands of active validators securing the MINE$ ecosystem while earning consistent, high-yield rewards in real Naira.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link href="/register" className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-lg text-[#0a0f0d] bg-[var(--color-accent)] rounded-xl hover:bg-[var(--gold-600)] transition shadow-lg shadow-[var(--gold-500)]/20">
            <Lock size={20} />
            Connect & Stake
          </Link>
          <Link href="/login" className="flex items-center justify-center gap-2 px-8 py-4 font-bold text-lg bg-[var(--bg-card)] border border-[var(--border)] rounded-xl hover:border-[var(--color-accent)] transition">
            Validator Dashboard
          </Link>
        </div>

        {/* Live Market Stats Bar */}
        <div className="w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-4 mb-32 border-y border-[var(--border)] py-8">
          <div className="text-center md:border-r border-[var(--border)] last:border-0">
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1">Total Staked (TVL)</p>
            <p className="text-xl font-bold font-mono">₦142.8M+</p>
          </div>
          <div className="text-center md:border-r border-[var(--border)] last:border-0">
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1">Active Nodes</p>
            <p className="text-xl font-bold font-mono">12,402</p>
          </div>
          <div className="text-center md:border-r border-[var(--border)] last:border-0">
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1">Rewards Paid</p>
            <p className="text-xl font-bold font-mono text-green-500">₦68.4M</p>
          </div>
          <div className="text-center">
            <p className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1">Protocol APY</p>
            <p className="text-xl font-bold font-mono text-[var(--color-accent)]">Up to 48%</p>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl mb-32">
          <div className="flex flex-col items-center text-center p-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl transition hover:border-[var(--color-accent)]/50 group">
            <div className="p-4 bg-[var(--color-accent)]/10 rounded-2xl text-[var(--color-accent)] mb-4 group-hover:scale-110 transition-transform">
              <Server size={32} />
            </div>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-3">Validator Nodes</h3>
            <p className="text-[var(--text-secondary)]">Deploy a virtual validator node and generate MINE$ rewards based on your protocol participation level.</p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl transition hover:border-[var(--color-earn)]/50 group">
            <div className="p-4 bg-[var(--color-earn)]/10 rounded-2xl text-[var(--color-earn)] mb-4 group-hover:scale-110 transition-transform">
              <Activity size={32} />
            </div>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-3">Yield Multipliers</h3>
            <p className="text-[var(--text-secondary)]">Engage with ecosystem tasks and games to multiply your staking yield and accelerate reward distribution.</p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-[var(--bg-card)] border border-[var(--border)] rounded-2xl transition hover:border-[var(--color-accent)]/50 group">
            <div className="p-4 bg-[var(--color-accent)]/10 rounded-2xl text-[var(--color-accent)] mb-4 group-hover:scale-110 transition-transform">
              <Landmark size={32} />
            </div>
            <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-3">Fiat Settlements</h3>
            <p className="text-[var(--text-secondary)]">Seamlessly off-ramp your staking rewards. Convert MINE$ to Naira and withdraw to your verified bank account.</p>
          </div>
        </div>

        {/* MINE$ Token Section */}
        <div className="w-full max-w-6xl mb-32">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--color-accent)]/10 border border-[var(--color-accent)]/30 rounded-full mb-6">
              <Coins size={16} className="text-[var(--color-accent)]" />
              <span className="text-[var(--color-accent)] font-semibold text-sm">Official Protocol Token (MIH)</span>
            </div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">What is MINE$?</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
              MINE$ is a high-utility hybrid token bridging Proof-of-Stake rewards with traditional financial liquidity. Listed on global exchanges, it provides the backbone for our yield-generation engine.
            </p>
          </div>

          {/* Token Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-center">
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">Market Price</p>
              <p className="text-2xl font-bold text-[var(--color-accent)] font-mono">$0.1852</p>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-center">
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">Market Cap</p>
              <p className="text-2xl font-bold text-white font-mono">$360.4M</p>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-center">
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">Exchanges</p>
              <div className="flex flex-col gap-1 items-center">
                <p className="text-sm font-bold text-white uppercase">MEXC GLOBAL</p>
                <p className="text-sm font-bold text-white uppercase">XT.COM</p>
              </div>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 text-center">
              <p className="text-[var(--text-muted)] text-xs uppercase tracking-wider mb-2">Audit Status</p>
              <p className="text-lg font-bold text-green-500 uppercase flex items-center justify-center gap-2">
                <Shield size={16} /> Verified
              </p>
            </div>
          </div>

          {/* How Staking Works */}
          <div className="bg-gradient-to-br from-[var(--surface-800)] to-[var(--bg-card)] border border-[var(--border)] rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[var(--color-accent)]/5 rounded-full blur-2xl" />
            <h3 className="font-[family-name:var(--font-syne)] text-2xl md:text-3xl font-bold text-center mb-12">The Staking Lifecycle</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Step 1 */}
              <div className="relative">
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-[var(--color-accent)] rounded-lg flex items-center justify-center font-bold text-[#0a0f0d] rotate-3 shadow-lg">1</div>
                <div className="pt-6">
                  <div className="p-3 bg-[var(--color-accent)]/10 rounded-xl w-fit mb-4">
                    <Shield size={24} className="text-[var(--color-accent)]" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Select Tier</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Choose a validator node tier that aligns with your yield expectations and liquidity needs.</p>
                </div>
                <ArrowRight size={20} className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/4 text-[var(--text-muted)]" />
              </div>

              {/* Step 2 */}
              <div className="relative">
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-[var(--color-accent)] rounded-lg flex items-center justify-center font-bold text-[#0a0f0d] -rotate-3 shadow-lg">2</div>
                <div className="pt-6">
                  <div className="p-3 bg-[var(--color-accent)]/10 rounded-xl w-fit mb-4">
                    <Layers size={24} className="text-[var(--color-accent)]" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Deploy Node</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Activate your position. Rewards accrue in real-time derived from protocol network stability.</p>
                </div>
                <ArrowRight size={20} className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/4 text-[var(--text-muted)]" />
              </div>

              {/* Step 3 */}
              <div className="relative">
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-[var(--color-accent)] rounded-lg flex items-center justify-center font-bold text-[#0a0f0d] rotate-6 shadow-lg">3</div>
                <div className="pt-6">
                  <div className="p-3 bg-[var(--color-earn)]/10 rounded-xl w-fit mb-4">
                    <TrendingUp size={24} className="text-[var(--color-earn)]" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Earn Yield</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Engage with ecosystem boosts to maximize reward velocity. Watch your balance grow daily.</p>
                </div>
                <ArrowRight size={20} className="hidden md:block absolute -right-6 top-1/2 -translate-y-1/4 text-[var(--text-muted)]" />
              </div>

              {/* Step 4 */}
              <div className="relative">
                <div className="absolute -top-4 -left-2 w-10 h-10 bg-[var(--color-accent)] rounded-lg flex items-center justify-center font-bold text-[#0a0f0d] -rotate-6 shadow-lg">4</div>
                <div className="pt-6">
                  <div className="p-3 bg-green-500/10 rounded-xl w-fit mb-4">
                    <Landmark size={24} className="text-green-500" />
                  </div>
                  <h4 className="font-bold text-lg mb-2">Off-ramp</h4>
                  <p className="text-[var(--text-secondary)] text-sm">Withdraw your earnings directly to your bank account via our secure liquidity bridges.</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="mt-12 pt-8 border-t border-[var(--border)] grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--surface-700)] rounded-xl flex items-center justify-center shrink-0">
                  <Globe size={20} className="text-blue-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Protocol Driven</p>
                  <p className="text-xs text-[var(--text-secondary)]">Backed by real liquidity flows</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--surface-700)] rounded-xl flex items-center justify-center shrink-0">
                  <Shield size={20} className="text-[var(--color-accent)]" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Institutional Security</p>
                  <p className="text-xs text-[var(--text-secondary)]">Encrypted settlements & KYC</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--surface-700)] rounded-xl flex items-center justify-center shrink-0">
                  <Activity size={20} className="text-green-400" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Real-time Yield</p>
                  <p className="text-xs text-[var(--text-secondary)]">Rewards distributed every second</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Plans Section */}
        <div className="w-full max-w-5xl mb-20 text-center">
          <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Choose Your Staking Node</h2>
          <p className="text-[var(--text-secondary)] mb-12 max-w-xl mx-auto leading-relaxed">
            Select a node type to start generating protocol rewards. Each tier progressively unlocks higher yield rates and better withdrawal terms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {Object.values(PLANS).map((plan) => (
              <div key={plan.id} className={`flex flex-col p-8 bg-[var(--bg-card)] border ${plan.id === 'premium' ? 'border-[var(--color-accent)] ring-1 ring-[var(--color-accent)]/20 shadow-2xl shadow-[var(--color-accent)]/10' : 'border-[var(--border)]'} rounded-2xl relative overflow-hidden group`}>
                {plan.id === 'premium' && (
                  <div className="absolute top-0 right-0 bg-[var(--color-accent)] text-[#0a0f0d] text-xs font-black px-3 py-1 rounded-bl-lg uppercase tracking-widest shadow-lg">
                    Highest Yield
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold mb-1">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black tracking-tighter">₦{plan.price.toLocaleString()}</span>
                    <span className="text-[var(--text-muted)] text-sm font-semibold">/NODE</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8 flex-1">
                  <div className="p-4 bg-[var(--surface-900)] rounded-xl border border-[var(--border)]">
                    <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-widest mb-1.5 font-bold">Projected Yield</p>
                    <div className="flex items-center justify-between">
                      <p className="text-xl font-bold text-[var(--color-accent)] font-mono">₦{plan.earningPerHour}/hr</p>
                      <span className="text-[10px] px-2 py-0.5 bg-[var(--color-accent)]/10 text-[var(--color-accent)] rounded border border-[var(--color-accent)]/20 font-bold">STABLE</span>
                    </div>
                  </div>

                  <ul className="space-y-3.5 text-[var(--text-secondary)] text-sm">
                    <li className="flex items-center gap-2.5">
                      <div className="w-5 h-5 bg-[var(--color-earn)]/10 rounded-full flex items-center justify-center shrink-0">
                        <Check size={12} className="text-[var(--color-earn)]" />
                      </div>
                      <span><strong>₦{plan.gameEarningsPerMinute}/min</strong> Ecosystem Multiplier</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-5 h-5 bg-[var(--color-accent)]/10 rounded-full flex items-center justify-center shrink-0">
                        <Check size={12} className="text-[var(--color-accent)]" />
                      </div>
                      <span className="font-medium">
                        {plan.withdrawalsPerMonth === Infinity ? 'Unlimited Withdrawals' : `${plan.withdrawalsPerMonth} Withdrawal${plan.withdrawalsPerMonth > 1 ? 's' : ''}/Mo`}
                      </span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className={`w-5 h-5 ${plan.autoMine ? "bg-green-500/10" : "bg-red-500/10"} rounded-full flex items-center justify-center shrink-0`}>
                        {plan.autoMine ? <Check size={12} className="text-green-500" /> : <Lock size={10} className="text-red-500" />}
                      </div>
                      <span className={plan.autoMine ? "font-medium" : "opacity-50 line-through"}>24/7 Automated Staking</span>
                    </li>
                    <li className="flex items-center gap-2.5">
                      <div className="w-5 h-5 bg-blue-500/10 rounded-full flex items-center justify-center shrink-0">
                        <Shield size={12} className="text-blue-500" />
                      </div>
                      <span className="font-medium">Protocol Backed Guarantee</span>
                    </li>
                  </ul>
                </div>

                <Link href={`/register`} className={`mt-auto text-center py-4 rounded-xl font-black transition-all transform active:scale-95 shadow-lg ${plan.id === 'premium' ? 'bg-[var(--color-accent)] text-[#0a0f0d] hover:bg-[var(--gold-600)] shadow-[var(--gold-500)]/20' : 'bg-[var(--surface-700)] text-[var(--text-primary)] hover:bg-[var(--surface-600)] shadow-black/20'}`}>
                  DEPLOY {plan.id.toUpperCase()}
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Node Boosters System Section */}
        <div className="w-full max-w-6xl mb-32">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-full mb-6">
              <Zap size={16} className="text-amber-400" />
              <span className="text-amber-400 font-semibold text-sm">Accelerate Your Rewards</span>
            </div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Protocol Boosters</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
              Enhance your node's performance with temporary protocol boosters. High-efficiency computational nodes that stack with your base yield.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(AXES_TIERS).map((axe) => (
              <div key={axe.id} className="bg-gradient-to-br from-[var(--surface-800)] to-[var(--bg-card)] border border-[var(--border)] rounded-2xl p-8 text-center relative overflow-hidden group hover:border-[var(--color-accent)]/30 transition-all">
                <div className={`absolute top-0 left-0 w-full h-1 ${axe.id === 'elite' ? 'bg-gradient-to-r from-amber-500 to-yellow-400' : axe.id === 'advanced' ? 'bg-gradient-to-r from-blue-500 to-cyan-400' : 'bg-gradient-to-r from-gray-500 to-gray-400'}`} />
                <div className={`w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform ${axe.id === 'elite' ? 'bg-amber-500/20 shadow-lg shadow-amber-500/10' : axe.id === 'advanced' ? 'bg-blue-500/20' : 'bg-gray-500/20'}`}>
                  <Server size={32} className={axe.id === 'elite' ? 'text-amber-400' : axe.id === 'advanced' ? 'text-blue-400' : 'text-gray-400'} />
                </div>
                <h3 className="font-[family-name:var(--font-syne)] text-xl font-bold mb-2">{axe.label.replace('Axe', 'Booster')}</h3>
                <div className="text-3xl font-black text-white mb-6 font-mono tracking-tighter">₦{axe.price.toLocaleString()}</div>
                <div className="space-y-3 text-left">
                  <div className="flex items-center gap-3 p-3 bg-[var(--surface-900)] rounded-xl border border-[var(--border)]">
                    <TrendingUp size={16} className="text-green-500" />
                    <span className="text-xs font-bold font-mono">+{(axe.bonusPerSecond * 3600).toFixed(2)}/HR YIELD</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[var(--surface-900)] rounded-xl border border-[var(--border)]">
                    <Activity size={16} className="text-[var(--color-accent)]" />
                    <span className="text-xs font-bold font-mono">{axe.durationDays} DAYS UPTIME</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[var(--text-muted)] text-sm mt-8 italic">
            * Boosters operate in parallel to your primary validator node for exponential yield growth.
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
                  <span className="text-green-500 font-semibold text-sm">Protocol Network Growth</span>
                </div>
                <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl font-bold mb-4 tracking-tight text-white">Affiliate Protocol</h2>
                <p className="text-[var(--text-secondary)] text-lg mb-8 leading-relaxed">
                  Expand the MINE$ network reach and earn a <span className="text-green-500 font-bold underline decoration-green-500/30">5% lifecycle commission</span> on all rewards generated by your referred validators.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <Gift size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Instant Yield Credit</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Commissions are credited in real-time as your downlines generate protocol rewards.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <TrendingUp size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Lifecycle Rewards</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Your 5% applies to all activities including base staking and ecosystem tasks.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-green-500/20 rounded-xl flex items-center justify-center shrink-0">
                      <Star size={20} className="text-green-500" />
                    </div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Network Stability</h4>
                      <p className="text-sm text-[var(--text-secondary)]">Large affiliate networks help secure protocol liquidity and improve ecosystem trust.</p>
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
                    <h5 className="font-bold text-lg text-white">Active Referral ID</h5>
                    <p className="font-mono text-sm text-green-400 font-bold tracking-widest uppercase">PROTOCOL-NODE-ALPHA</p>
                  </div>
                </div>

                <div className="space-y-5">
                  <div className="flex justify-between items-center p-4 bg-[var(--surface-800)] rounded-xl border border-[var(--border)]">
                    <span className="text-[var(--text-secondary)] text-sm font-medium">Affiliate Cap</span>
                    <span className="font-bold text-white uppercase text-xs tracking-widest px-2 py-1 bg-[var(--surface-700)] rounded">Unlimited</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[var(--surface-800)] rounded-xl border border-[var(--border)]">
                    <span className="text-[var(--text-secondary)] text-sm font-medium">Lifecycle Bonus</span>
                    <span className="font-black text-green-500 text-lg">5%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-[var(--surface-800)] rounded-xl border border-[var(--border)]">
                    <span className="text-[var(--text-secondary)] text-sm font-medium">Eligible Flows</span>
                    <span className="font-bold text-white text-sm">Full Protocol Scope</span>
                  </div>
                </div>

                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-2xl text-center">
                  <p className="text-xs text-green-500 font-bold uppercase tracking-widest">Connect Wallet to Generate Link</p>
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
              <span className="text-[var(--color-accent)] font-semibold text-sm">Automated Settlement Protocol</span>
            </div>
            <h2 className="font-[family-name:var(--font-syne)] text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tracking-tight">Liquidity Off-ramps</h2>
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto text-lg leading-relaxed">
              Converting your digital yield to physical liquidity is handled by our automated disbursement engine with institutional-grade efficiency.
            </p>
          </div>

          <div className="bg-[var(--surface-800)] border border-[var(--border)] rounded-[40px] p-8 md:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Left side - How it works */}
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold mb-8 text-white">The Settlement Pipeline</h3>
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="w-10 h-10 bg-[var(--color-accent)] rounded-xl flex items-center justify-center font-black text-[#0a0f0d] shrink-0 shadow-lg rotate-3">1</div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Accrue MINE$</h4>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Your staking rewards are logged on the protocol ledger every second.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-10 h-10 bg-[var(--color-accent)] rounded-xl flex items-center justify-center font-black text-[#0a0f0d] shrink-0 shadow-lg -rotate-3">2</div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Liquidity Stability Check</h4>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Once minimum thresholds are met, your balance is verified against network liquidity.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-10 h-10 bg-[var(--color-accent)] rounded-xl flex items-center justify-center font-black text-[#0a0f0d] shrink-0 shadow-lg rotate-6">3</div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Submit Disbursement</h4>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Select your preferred bank account for the off-ramp settlement.</p>
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center font-black text-white shrink-0 shadow-lg -rotate-6">4</div>
                    <div>
                      <h4 className="font-bold mb-1 text-white">Final Settlement</h4>
                      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">Funds are reconciled and transferred via our banking partners within 6-24 hours.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl relative">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center shrink-0">
                      <Shield size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white mb-1">Protocol Stability Note</p>
                      <p className="text-xs text-[var(--text-secondary)] leading-loose">
                        Withdrawal thresholds and downline requirements act as <span className="text-blue-400 font-bold font-mono">Liquidity Retention Safeguards</span>. These protocols ensure the network maintains sufficient Total Value Locked (TVL) to prevent extreme volatility, ensuring every validator can exit their position with guaranteed liquidity while maintaining the MINE$ ecosystem's health.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right side - Plan limits */}
              <div>
                <h3 className="font-[family-name:var(--font-syne)] text-2xl font-bold mb-8 text-white">Disbursement Policy</h3>
                <div className="space-y-4">
                  {Object.values(PLANS).map((plan) => (
                    <div key={plan.id} className={`p-5 rounded-2xl border ${plan.id === 'premium' ? 'border-[var(--color-accent)] bg-[var(--color-accent)]/5' : 'border-[var(--surface-600)] bg-[var(--surface-900)]'}`}>
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-black text-white tracking-tight">{plan.name.toUpperCase()}</span>
                        <div className="flex gap-2">
                          <span className="text-[10px] px-2 py-0.5 bg-[var(--surface-700)] text-[var(--text-muted)] rounded-full font-bold">
                            {plan.id === 'premium' ? 'PRIORITY' : 'STANDARD'}
                          </span>
                          <span className="text-[10px] px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full font-black">
                            {plan.withdrawalsPerMonth === Infinity ? 'UNCAPPED' : `${plan.withdrawalsPerMonth}X/MO`}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                          <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-widest mb-1.5 font-bold">Safe Exit Threshold</p>
                          <p className="font-black text-white font-mono">
                            {plan.withdrawalThreshold === 0 ? 'ZERO MINIMUM' : `₦${plan.withdrawalThreshold.toLocaleString()}`}
                          </p>
                        </div>
                        <div className="p-3 bg-black/20 rounded-xl border border-white/5">
                          <p className="text-[var(--text-muted)] text-[10px] uppercase tracking-widest mb-1.5 font-bold">Recon Time</p>
                          <p className="font-black text-white font-mono uppercase">{plan.disbursementDays < 1 ? '< 6 HOURS' : `${plan.disbursementDays} DAYS`}</p>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[10px] text-[var(--text-muted)] font-bold uppercase tracking-wider">Designated Settlement Days</span>
                        <span className="text-[10px] text-[var(--color-accent)] font-bold uppercase tracking-widest">
                          {plan.withdrawalDays === "every_thursday" ? "THURSDAY QUANTUM" : plan.withdrawalDays.join("th & ") + "th CYCLES"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="p-4 bg-[var(--surface-900)] rounded-2xl border border-[var(--border)] text-center">
                    <p className="text-[10px] text-[var(--text-muted)] font-black uppercase mb-1">Fee Protocol</p>
                    <p className="text-lg font-black text-white font-mono">0.00%</p>
                  </div>
                  <div className="p-4 bg-[var(--surface-900)] rounded-2xl border border-[var(--border)] text-center">
                    <p className="text-[10px] text-[var(--text-muted)] font-black uppercase mb-1">Verification</p>
                    <p className="text-lg font-black text-green-500 uppercase font-mono italic">INSTANT</p>
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
              <span className="font-[family-name:var(--font-syne)] text-2xl font-extrabold tracking-tighter">MINE$ PROTOCOL</span>
            </div>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed">
              The next generation yield-generation protocol for the modern web3 ecosystem.
              Securing assets, generating yield, power by the community.
            </p>
          </div>

          <div>
            <h6 className="font-bold text-white mb-6 uppercase tracking-widest text-xs font-[family-name:var(--font-syne)]">Protocol</h6>
            <ul className="space-y-4 text-sm text-[var(--text-muted)] font-medium">
              <li><Link href="/docs" className="hover:text-[var(--color-accent)] transition-colors">Documentation</Link></li>
              <li><Link href="/calculator" className="hover:text-[var(--color-accent)] transition-colors">Yield Calculator</Link></li>
              <li><Link href="/stats" className="hover:text-[var(--color-accent)] transition-colors">Validator Stats</Link></li>
              <li><Link href="/audit" className="hover:text-[var(--color-accent)] transition-colors">Audit Report</Link></li>
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
            <h6 className="font-bold text-white mb-4 uppercase tracking-widest text-xs">Stay Synced</h6>
            <div className="flex gap-2">
              <input type="email" placeholder="Email" className="bg-[var(--bg-primary)] border border-[var(--border)] rounded-lg px-3 py-2 text-xs w-full focus:border-[var(--color-accent)] outline-none" />
              <button className="bg-[var(--color-accent)] text-[#0a0f0d] rounded-lg px-4 py-2 font-bold text-xs">JOIN</button>
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mt-4">Receive protocol updates and yield adjustements.</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-[var(--border)] flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[var(--text-muted)] font-medium">
            &copy; {new Date().getFullYear()} MINE$ ECOSYSTEM PROTOCOL. ALL RIGHTS RESERVED.
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
