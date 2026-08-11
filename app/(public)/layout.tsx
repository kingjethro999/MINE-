import { auth } from "@/auth";
import HeaderNav from "@/components/landing/HeaderNav";
import { Activity, Globe, Shield } from "lucide-react";
import Link from "next/link";

export default async function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const isLoggedIn = !!session?.user;

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-[family-name:var(--font-dm-sans)]">
      <HeaderNav isLoggedIn={isLoggedIn} />

      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-12 md:py-24">
        {children}
      </main>

      <footer className="border-t border-[var(--border)] py-12 mt-auto bg-[var(--bg-card)]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-left">
          <div className="md:col-span-1">
            <span className="font-[family-name:var(--font-syne)] text-2xl font-extrabold tracking-tighter">MINE$</span>
            <p className="text-sm text-[var(--text-muted)] leading-relaxed mt-6">
              Watch videos, play games, and earn real money. Withdraw to your Nigerian bank account in Naira.
            </p>
          </div>

          <div>
            <h6 className="font-bold text-white mb-6 uppercase tracking-widest text-xs font-[family-name:var(--font-syne)]">Earn</h6>
            <ul className="space-y-4 text-sm text-[var(--text-muted)] font-medium">
              <li><Link href="/register" className="hover:text-[var(--color-accent)] transition-colors">Get Started</Link></li>
              <li><Link href="/login" className="hover:text-[var(--color-accent)] transition-colors">Dashboard</Link></li>
              <li><Link href="/register" className="hover:text-[var(--color-accent)] transition-colors">Plans &amp; Pricing</Link></li>
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
