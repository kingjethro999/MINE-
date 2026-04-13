import Image from "next/image";
import Link from "next/link";
import { Pickaxe, Gamepad2, Landmark, Check } from "lucide-react";
import { PLANS } from "@/lib/plans";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-[family-name:var(--font-dm-sans)]">
      {/* Header */}
      <header className="flex justify-between items-center p-6 lg:px-12 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Image src="/icon.png" alt="Mines Platform Icon" width={40} height={40} />
          <span className="font-[family-name:var(--font-syne)] font-bold text-2xl tracking-tight text-[var(--color-accent)]">Mines</span>
        </div>
        <nav className="flex items-center gap-4">
          <Link href="/login" className="px-4 py-2 font-medium hover:text-[var(--color-accent)] transition">Log In</Link>
          <Link href="/register" className="px-5 py-2 font-semibold text-[#0a0f0d] bg-[var(--color-accent)] rounded-lg hover:bg-[var(--gold-600)] transition">Sign Up</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center lg:p-24 relative overflow-hidden w-full max-w-7xl mx-auto">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)]/5 rounded-full blur-3xl -z-10" />
        
        <h1 className="font-[family-name:var(--font-syne)] text-5xl lg:text-7xl font-extrabold max-w-4xl tracking-tight leading-tight mb-6">
          Mine <span className="text-[var(--color-accent)]">MINE$</span>, Play Games,<br/> Earn Real Naira.
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

        {/* Plans Section */}
        <div className="w-full max-w-5xl mb-20 text-center">
          <h2 className="font-[family-name:var(--font-syne)] text-4xl lg:text-5xl font-bold mb-6">Choose Your Plan</h2>
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
                  <li className="flex items-start gap-3">
                    <Check size={20} className={!plan.adsInGames ? "text-[var(--color-accent)] shrink-0" : "text-[var(--border)] shrink-0"} />
                    <span className={!plan.adsInGames ? "" : "line-through opacity-70"}>Ad-free games</span>
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
