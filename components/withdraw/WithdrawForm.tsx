"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import BankSelect, { Bank } from "@/components/ui/BankSelect";
import CurrencyDisplay from "@/components/ui/CurrencyDisplay";

interface WithdrawFormProps {
  userId: string;
  coinsBalanceNgn: number;
  balanceUsd: number;
  exchangeRate: number | null;
  minWithdrawal: number;
  planName: string;
  downlineCount: number;
  minDownlines: number;
  defaultBankCode?: string;
  defaultBankName?: string;
  defaultAccountNumber?: string;
  defaultAccountName?: string;
}

export default function WithdrawForm({
  userId,
  coinsBalanceNgn,
  balanceUsd,
  exchangeRate,
  minWithdrawal,
  planName,
  downlineCount,
  minDownlines,
  defaultBankCode,
  defaultBankName,
  defaultAccountNumber,
  defaultAccountName,
}: WithdrawFormProps) {
  const [amount, setAmount] = useState("");
  const [bankCode, setBankCode] = useState(defaultBankCode || "");
  const [bankName, setBankName] = useState(defaultBankName || "");
  const [accountNumber, setAccountNumber] = useState(defaultAccountNumber || "");
  const [accountName, setAccountName] = useState(defaultAccountName || "");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [loadingBanks, setLoadingBanks] = useState(true);
  const [validating, setValidating] = useState(false);
  const [validated, setValidated] = useState(false);
  const [validationError, setValidationError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchBanks();
  }, []);

  useEffect(() => {
    if (validated) {
      setValidated(false);
      setAccountName("");
    }
    setValidationError("");
  }, [accountNumber, bankCode]);

  useEffect(() => {
    if (accountNumber.length === 10 && bankCode && !validated && !validating) {
      const timer = setTimeout(() => {
        verifyAccount();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [accountNumber, bankCode]);

  async function fetchBanks() {
    try {
      const res = await fetch("/api/bank");
      const data = await res.json();
      if (data.success) {
        setBanks(data.data);
      }
    } catch {
      setBanks([]);
    } finally {
      setLoadingBanks(false);
    }
  }

  async function verifyAccount() {
    if (!accountNumber || !bankCode) return;
    setValidating(true);
    setValidationError("");

    try {
      const res = await fetch(
        `/api/bank/verify?accountNumber=${accountNumber}&bankCode=${bankCode}`
      );
      const data = await res.json();

      if (data.success && data.data) {
        setAccountName(data.data.accountName);
        setValidated(true);
      } else {
        setValidationError(data.error || "Invalid account number");
        setValidated(false);
      }
    } catch {
      setValidationError("Failed to verify account");
      setValidated(false);
    } finally {
      setValidating(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validated) {
      toast.error("Please verify your account details first");
      return;
    }

    if (!exchangeRate) {
      toast.error("Exchange rate not available. Please refresh the page.");
      return;
    }

    const amountNum = parseFloat(amount);
    if (amountNum < minWithdrawal) {
      toast.error(`Minimum withdrawal is ₦${minWithdrawal.toLocaleString()}`);
      return;
    }

    if (amountNum > coinsBalanceNgn) {
      toast.error("Insufficient balance");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/withdraw", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          amountNgn: amountNum,
          exchangeRate,
          accountNumber,
          accountName,
          bankName,
          bankCode,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Withdrawal request submitted!");
        setAmount("");
        setAccountNumber("");
        setAccountName("");
        setValidated(false);
      } else {
        toast.error(data.error || "Failed to submit request");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  const meetsDownlineReq = downlineCount >= minDownlines;
  const canWithdraw = coinsBalanceNgn >= minWithdrawal && meetsDownlineReq && !!exchangeRate;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
          Amount (₦)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          min={minWithdrawal}
          max={coinsBalanceNgn}
          required
          placeholder={`Min: ₦${minWithdrawal.toLocaleString()}`}
          className="w-full bg-[var(--surface-900)] border border-[var(--surface-600)] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[var(--gold-500)] transition-colors mono-figure"
        />
        <div className="flex items-center justify-between mt-1">
          <p className="text-xs text-[var(--text-muted)]">
            Available: ₦{coinsBalanceNgn.toLocaleString(undefined, { maximumFractionDigits: 0 })}
          </p>
          <CurrencyDisplay amountUsd={balanceUsd} size="sm" className="!text-xs" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
          Bank
        </label>
        <BankSelect
          value={bankCode}
          onChange={(code, name) => {
            setBankCode(code);
            setBankName(name);
          }}
          banks={banks}
          loading={loadingBanks}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--text-muted)] mb-1.5">
          Account Number
        </label>
        <div className="relative">
          <input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, "").slice(0, 10))}
            required
            maxLength={10}
            placeholder="10-digit account number"
            className={`w-full bg-[var(--surface-900)] border rounded-lg px-4 py-3 text-white focus:outline-none transition-colors mono-figure ${
              validationError
                ? "border-[var(--color-danger)]"
                : validated
                  ? "border-[var(--green-500)]"
                  : "border-[var(--surface-600)] focus:border-[var(--gold-500)]"
            }`}
          />
          {validating && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <Loader2 size={18} className="animate-spin text-[var(--gold-500)]" />
            </div>
          )}
          {validated && !validating && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <CheckCircle size={18} className="text-[var(--green-500)]" />
            </div>
          )}
          {validationError && !validating && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <AlertCircle size={18} className="text-[var(--color-danger)]" />
            </div>
          )}
        </div>
        {validationError && (
          <p className="text-xs text-[var(--color-danger)] mt-1">{validationError}</p>
        )}
      </div>

      {validated && accountName && (
        <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-[var(--green-500)] bg-[var(--green-500)]/10">
          <CheckCircle size={20} className="text-[var(--green-500)]" />
          <div>
            <p className="text-sm font-semibold text-white">{accountName}</p>
            <p className="text-xs text-[var(--text-muted)]">
              {bankName} · {accountNumber}
            </p>
          </div>
        </div>
      )}

      {!meetsDownlineReq && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 mb-4">
          <p className="text-xs text-amber-400 font-medium">
            Need {minDownlines - downlineCount} more downline
            {minDownlines - downlineCount !== 1 ? "s" : ""} to unlock withdrawals
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={!canWithdraw || !validated || submitting}
        className="w-full bg-[var(--gold-500)] disabled:bg-[var(--surface-600)] disabled:text-[var(--text-muted)] disabled:cursor-not-allowed text-black font-bold text-sm tracking-widest uppercase py-4 rounded-lg mt-6 transition-colors"
      >
        {submitting
          ? "Processing..."
          : !meetsDownlineReq
            ? `Need ${minDownlines - downlineCount} More Downlines`
            : "Submit Request"}
      </button>
    </form>
  );
}
