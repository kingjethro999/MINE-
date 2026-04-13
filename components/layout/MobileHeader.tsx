"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="lg:hidden">
      <div className="flex justify-between items-center p-4 w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-3">
          <Image src="/icon.png" alt="Mines Platform Icon" width={36} height={36} />
          <span className="font-[family-name:var(--font-syne)] font-bold text-xl tracking-tight text-[var(--color-accent)]">Mines</span>
        </div>
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
          </nav>
        </div>
      )}
    </header>
  );
}
