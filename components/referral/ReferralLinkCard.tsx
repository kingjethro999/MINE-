"use client";

import { useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";
import { toast } from "sonner";

interface ReferralLinkCardProps {
  referralLink: string;
}

export default function ReferralLinkCard({ referralLink }: ReferralLinkCardProps) {
  const [copied, setCopied] = useState(false);

  const shareText = `I use Mine$ to earn cash playing games and watching videos. Join me on Mine$ and claim your welcome rewards now! \n\n${referralLink}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      toast.success("Referral message copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on Mine$!",
          text: `I use Mine$ to earn cash playing games and watching videos. Join me on Mine$ and claim your welcome rewards now!`,
          url: referralLink,
        });
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          toast.error("Failed to share");
        }
      }
    } else {
      handleCopy();
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex bg-[var(--surface-900)] rounded-lg border border-[var(--surface-600)] overflow-hidden">
        <input
          type="text"
          readOnly
          value={referralLink}
          className="bg-transparent text-[var(--gold-300)] px-4 py-3 flex-1 outline-none font-mono text-sm"
        />
        <button
          onClick={handleCopy}
          title="Copy message to clipboard"
          className="bg-[var(--surface-700)] px-4 border-l border-[var(--surface-600)] hover:bg-[var(--surface-600)] transition-colors text-white"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
        </button>
      </div>
      <button 
        onClick={handleShare}
        className="w-full py-3 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-[#0a0f0d] font-bold rounded-lg flex items-center justify-center gap-2 transition-all uppercase tracking-wider text-sm shadow-lg hover:shadow-xl"
      >
        <Share2 size={18} />
        Share via WhatsApp / Social
      </button>
    </div>
  );
}
