import { auth } from "@/auth";
import HeaderNav from "@/components/landing/HeaderNav";
import { Layers, Activity, Globe, Shield } from "lucide-react";
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
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[var(--color-accent)] rounded-xl flex items-center justify-center">
                <Layers size={24} className="text-[#0a0f0d]" />
              </div>
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
