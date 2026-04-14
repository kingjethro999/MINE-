"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ReferralLinkCardProps {
  referralLink: string;
}

export default function ReferralLinkCard({ referralLink }: ReferralLinkCardProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      toast.success("Referral link copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  }

  return (
    <div className="flex bg-[var(--surface-900)] rounded-lg border border-[var(--surface-600)] overflow-hidden">
      <input
        type="text"
        readOnly
        value={referralLink}
        className="bg-transparent text-[var(--gold-300)] px-4 py-3 flex-1 outline-none font-mono text-sm"
      />
      <button
        onClick={handleCopy}
        className="bg-[var(--surface-700)] px-4 border-l border-[var(--surface-600)] hover:bg-[var(--surface-600)] transition-colors text-white"
      >
        {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
      </button>
    </div>
  );
}
