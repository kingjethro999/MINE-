"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, Check, Building2 } from "lucide-react";

export interface Bank {
  code: string;
  name: string;
}

interface BankSelectProps {
  value: string;
  onChange: (bankCode: string, bankName: string) => void;
  banks: Bank[];
  loading?: boolean;
  error?: string;
}

export default function BankSelect({
  value,
  onChange,
  banks,
  loading,
  error,
}: BankSelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  const selectedBank = banks.find((b) => b.code === value);

  const filteredBanks = banks.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.code.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative w-full">
      {error && (
        <p className="text-xs text-[var(--color-danger)] mb-1">{error}</p>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-2 rounded-lg border px-4 py-3 transition-colors cursor-pointer bg-[var(--surface-900)] ${
          error
            ? "border-[var(--color-danger)]"
            : open
              ? "border-[var(--gold-500)]"
              : "border-[var(--surface-600)] hover:border-[var(--surface-500)]"
        }`}
      >
        <span className={`text-sm ${value ? "text-white" : "text-[var(--text-muted)]"}`}>
          {selectedBank ? selectedBank.name : "Select your bank"}
        </span>
        <ChevronDown
          size={18}
          className={`text-[var(--text-muted)] transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => {
                setOpen(false);
                setSearch("");
              }}
            />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 right-0 top-[calc(100%+8px)] z-50 bg-[var(--surface-800)] rounded-xl border border-[var(--surface-600)] shadow-xl overflow-hidden"
            >
              <div className="p-2 border-b border-[var(--surface-600)]">
                <div className="flex items-center gap-2 px-3 py-2 bg-[var(--surface-900)] rounded-lg">
                  <Search size={16} className="text-[var(--text-muted)]" />
                  <input
                    autoFocus
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search banks..."
                    className="flex-1 bg-transparent text-sm text-white placeholder:text-[var(--text-muted)] outline-none"
                  />
                </div>
              </div>

              <div className="max-h-64 overflow-y-auto">
                {loading ? (
                  <div className="p-4 text-center text-[var(--text-muted)] text-sm">
                    Loading banks...
                  </div>
                ) : filteredBanks.length === 0 ? (
                  <div className="p-4 text-center text-[var(--text-muted)] text-sm">
                    No banks found
                  </div>
                ) : (
                  <ul>
                    {filteredBanks.map((bank) => (
                      <li key={bank.code}>
                        <button
                          type="button"
                          onClick={() => {
                            onChange(bank.code, bank.name);
                            setOpen(false);
                            setSearch("");
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors cursor-pointer ${
                            bank.code === value
                              ? "bg-[var(--gold-500)]/10 text-[var(--gold-400)]"
                              : "text-[var(--text-secondary)] hover:bg-[var(--surface-700)]"
                          }`}
                        >
                          <Building2
                            size={18}
                            className={
                              bank.code === value
                                ? "text-[var(--gold-500)]"
                                : "text-[var(--text-muted)]"
                            }
                          />
                          <span className="flex-1 text-sm">{bank.name}</span>
                          {bank.code === value && (
                            <Check size={16} className="text-[var(--gold-500)]" />
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
