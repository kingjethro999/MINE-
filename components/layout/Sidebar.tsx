"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { 
  Network, 
  Pickaxe, 
  Gamepad2, 
  CreditCard, 
  ArrowUpCircle, 
  ShieldCheck, 
  Axe,
  LogOut
} from "lucide-react";
import Image from "next/image";
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
    { href: "/mine", label: "Mine", icon: <Pickaxe size={20} /> },
    { href: "/axes", label: "Axes", icon: <Axe size={20} /> },
    { href: "/games", label: "Games", icon: <Gamepad2 size={20} /> },
    { href: "/withdraw", label: "Withdraw", icon: <CreditCard size={20} /> },
    { href: "/referral", label: "Referral", icon: <Network size={20} /> },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-[var(--surface-800)] border-r border-[var(--surface-600)] flex flex-col z-50">
      {/* Brand */}
      <div className="flex items-center gap-3 px-6 py-8">
        <Image src="/icon.png" alt="Mines Logo" width={32} height={32} className="rounded" />
        <h1 className="text-[var(--gold-400)] text-xl font-bold tracking-wider">MINE$</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1">
        {mainLinks.map((link) => {
          const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
                isActive 
                  ? "sidebar-item-active" 
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

        {/* Upgrade only visible to Basic/Pro */}
        {!isPremium && (
          <Link
            href="/upgrade"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors ${
              pathname.startsWith("/upgrade")
                ? "sidebar-item-active"
                : "text-[var(--text-secondary)] hover:bg-[var(--surface-700)] hover:text-white"
            }`}
          >
            <span className={pathname.startsWith("/upgrade") ? "text-[var(--gold-500)]" : "text-[var(--text-muted)]"}>
              <ArrowUpCircle size={20} />
            </span>
            Upgrade
          </Link>
        )}

        {/* Admin Links */}
        {isAdmin && (
          <div className="pt-6 mt-6 border-t border-[var(--surface-600)]">
            <h3 className="px-4 text-xs font-semibold text-[var(--gray-400)] uppercase tracking-wider mb-2">Admin</h3>
            <Link
              href="/admin/users"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                pathname.startsWith("/admin/users") ? "text-white" : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              <ShieldCheck size={18} /> Users
            </Link>
            <Link
              href="/admin/withdrawals"
              className={`flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors text-sm ${
                pathname.startsWith("/admin/withdrawals") ? "text-white" : "text-[var(--text-secondary)] hover:text-white"
              }`}
            >
              <CreditCard size={18} /> Withdrawals
            </Link>
          </div>
        )}
      </nav>

      {/* Footer Area */}
      <div className="p-4 border-t border-[var(--surface-600)]">
        <div className={`mb-3 flex justify-center py-2 px-3 rounded text-sm text-center font-bold tracking-wide uppercase plan-badge-${plan?.toLowerCase() || 'basic'}`}>
          {plan || 'BASIC'} PLAN
        </div>
        <button 
          onClick={() => signOut()} 
          className="flex items-center justify-center gap-2 w-full py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--color-danger)] transition-colors"
        >
          <LogOut size={16} /> Logout
        </button>
      </div>
    </aside>
  );
}
