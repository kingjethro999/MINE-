"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, LayoutDashboard, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

interface HeaderNavProps {
  isLoggedIn: boolean;
}

export default function HeaderNav({ isLoggedIn }: HeaderNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:flex justify-between items-center p-6 lg:px-12 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Link href="/">
            <div className="flex items-center gap-3">
              <Image src="/icon.png" alt="Mines Platform Icon" width={40} height={40} />
              <span className="font-[family-name:var(--font-syne)] font-bold text-2xl tracking-tight text-[var(--color-accent)]">Mines</span>
            </div>
          </Link>
        </div>
        <nav className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link href="/dashboard" className="px-4 py-2 font-medium hover:text-[var(--color-accent)] transition flex items-center gap-2">
                <LayoutDashboard size={18} />
                Dashboard
              </Link>
              <button 
                onClick={() => signOut()}
                className="px-4 py-2 font-medium hover:text-[var(--color-danger)] transition flex items-center gap-2"
              >
                <LogOut size={18} />
                Log Out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="px-4 py-2 font-medium hover:text-[var(--color-accent)] transition">Log In</Link>
              <Link href="/register" className="px-5 py-2 font-semibold text-[#0a0f0d] bg-[var(--color-accent)] rounded-lg hover:bg-[var(--gold-600)] transition">Sign Up</Link>
            </>
          )}
        </nav>
      </header>

      {/* Mobile Header */}
      <header className="lg:hidden">
        <div className="flex justify-between items-center p-4 w-full max-w-7xl mx-auto">
          <Link href="/">
            <div className="flex items-center gap-3">
              <Image src="/icon.png" alt="Mines Platform Icon" width={36} height={36} />
              <span className="font-[family-name:var(--font-syne)] font-bold text-xl tracking-tight text-[var(--color-accent)]">Mines</span>
            </div>
          </Link>
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-[var(--text-primary)] hover:text-[var(--color-accent)] transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {isOpen && (
          <div className="fixed inset-0 top-[60px] z-40 bg-[var(--surface-900)]/95 backdrop-blur-sm">
            <nav className="flex flex-col items-center gap-6 pt-12">
              {isLoggedIn ? (
                <>
                  <Link 
                    href="/dashboard" 
                    className="px-6 py-3 text-lg font-medium text-[var(--text-primary)] hover:text-[var(--color-accent)] transition flex items-center gap-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard size={20} />
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { signOut(); setIsOpen(false); }}
                    className="px-6 py-3 text-lg font-medium text-[var(--color-danger)] hover:text-red-400 transition flex items-center gap-2"
                  >
                    <LogOut size={20} />
                    Log Out
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    href="/login" 
                    className="px-6 py-3 text-lg font-medium text-[var(--text-primary)] hover:text-[var(--color-accent)] transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link 
                    href="/register" 
                    className="px-6 py-3 text-lg font-semibold text-[#0a0f0d] bg-[var(--color-accent)] rounded-lg hover:bg-[var(--gold-600)] transition"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
