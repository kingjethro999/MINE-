"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Network,
  Video,
  Gamepad2,
  CreditCard,
  ArrowUpCircle,
  ShieldCheck,
  Zap,
  LogOut,
  Settings,
  History,
} from "lucide-react";
import { signOut } from "next-auth/react";

interface SidebarProps {
  plan: string;
  isAdmin: boolean;
}

export default function Sidebar({ plan, isAdmin }: SidebarProps) {
  const pathname = usePathname();
  const isPremium = plan?.toLowerCase() === "premium";

  const mainLinks = [
    { href: "/dashboard", label: "Dashboard", icon: <Network size={20} /> },
    { href: "/watch", label: "Watch", icon: <Video size={20} /> },
    { href: "/boosts", label: "Boosts", icon: <Zap size={20} /> },
    { href: "/games", label: "Games", icon: <Gamepad2 size={20} /> },
    { href: "/history", label: "History", icon: <History size={20} /> },
    { href: "/withdraw", label: "Withdraw", icon: <CreditCard size={20} /> },
    { href: "/referral", label: "Affiliate", icon: <Network size={20} /> },
    { href: "/settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-full w-64 bg-[var(--surface-800)] border-r border-[var(--surface-600)] flex-col z-50">
      <div className="flex items-center gap-3 px-6 py-8">
        <h1 className="text-white text-lg font-black tracking-tighter">MINE$</h1>
      </div>

      <nav className="flex-1 px-4 space-y-1 overflow-y-auto scrollbar-thin">
        {mainLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                isActive
                  ? "sidebar-item-active shadow-lg shadow-black/10"
                  : "text-[var(--text-secondary)] hover:bg-[var(--surface-700)] hover:text-white"
              }`}
            >
              <span className={isActive ? "text-[var(--gold-500)]" : "text-[var(--text-muted)]"}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}

        {!isPremium && (
          <Link
            href="/upgrade"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-200 mt-2 ${
              pathname.startsWith("/upgrade")
                ? "sidebar-item-active"
                : "bg-[var(--color-accent)]/5 border border-[var(--color-accent)]/10 text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10"
            }`}
          >
            <span
              className={
                pathname.startsWith("/upgrade")
                  ? "text-[var(--gold-500)]"
                  : "text-[var(--color-accent)]"
              }
            >
              <ArrowUpCircle size={20} />
            </span>
            Upgrade
          </Link>
        )}

        {isAdmin && (
          <div className="pt-6 mt-6 border-t border-[var(--surface-600)]">
            <h3 className="px-4 text-[10px] font-black text-[var(--gray-500)] uppercase tracking-widest mb-2">
              Admin
            </h3>
            <Link
              href="/admin/users"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                pathname.startsWith("/admin/users")
                  ? "text-white"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              <ShieldCheck size={18} /> Users
            </Link>
            <Link
              href="/admin/withdrawals"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                pathname.startsWith("/admin/withdrawals")
                  ? "text-white"
                  : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              <CreditCard size={18} /> Withdrawals
            </Link>
          </div>
        )}
      </nav>

      <div className="p-4 border-t border-[var(--surface-600)]">
        <div
          className={`mb-3 flex flex-col items-center justify-center py-3 px-3 rounded-xl border border-white/5 bg-black/20 text-center font-bold tracking-tight plan-badge-${plan?.toLowerCase() || "basic"}`}
        >
          <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest mb-1">
            Plan
          </p>
          <span className="text-xs">{plan?.toUpperCase() || "BASIC"}</span>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center justify-center gap-2 w-full py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--color-danger)] transition-colors font-medium"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}
