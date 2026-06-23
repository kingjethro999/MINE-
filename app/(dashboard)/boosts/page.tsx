import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { BOOST_TIERS } from "@/lib/plans";
import { Zap, Clock, ShieldCheck, Activity } from "lucide-react";
import BoostStatusToast from "@/components/boosts/BoostStatusToast";
import { Suspense } from "react";

export default async function BoostsPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
  });

  if (!user) redirect("/login");

  const now = new Date();
  const activeBoost = await prisma.boostPurchase.findFirst({
    where: { userId: user.id, active: true, expiresAt: { gt: now } },
    orderBy: { purchasedAt: "desc" },
  });

  const hoursRemaining = activeBoost
    ? Math.max(0, (activeBoost.expiresAt.getTime() - now.getTime()) / (1000 * 60 * 60))
    : 0;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Suspense>
        <BoostStatusToast />
      </Suspense>

      <header>
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight">Boosts</h1>
        <p className="text-[var(--text-secondary)] font-medium">
          24-hour earnings boost for videos and games. One active boost at a time.
        </p>
      </header>

      {activeBoost && (
        <div className="bg-gradient-to-r from-indigo-500/10 via-[var(--surface-800)] to-blue-500/10 p-8 rounded-[32px] border border-[var(--color-accent)]/30 shadow-[0_0_50px_rgba(212,175,55,0.05)] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-black/40 rounded-3xl flex items-center justify-center border border-white/5 shadow-2xl">
              <Zap size={32} className="text-[var(--color-accent)] animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[var(--color-accent)] text-[10px] font-black uppercase tracking-[0.2em]">
                  Boost Active
                </span>
              </div>
              <h3 className="text-white font-black text-2xl tracking-tighter">
                {BOOST_TIERS[activeBoost.tier as keyof typeof BOOST_TIERS]?.label ?? activeBoost.tier}
              </h3>
            </div>
          </div>
          <div className="flex flex-col md:items-end gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2.5 px-4 py-2 bg-green-500/10 rounded-xl border border-green-500/10 text-green-500 font-black text-lg">
              <Zap size={20} />
              {BOOST_TIERS[activeBoost.tier as keyof typeof BOOST_TIERS]?.multiplierDisplay ?? ""} earnings
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-black/20 rounded-lg text-xs text-[var(--text-muted)] font-bold">
              <Clock size={14} />
              {Math.floor(hoursRemaining)}h {Math.round((hoursRemaining % 1) * 60)}m remaining
            </div>
            <div className="w-full md:w-48 h-1.5 bg-black/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--green-500)] rounded-full transition-all"
                style={{ width: `${Math.min(100, (hoursRemaining / 24) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {Object.values(BOOST_TIERS).map((tier) => (
          <div
            key={tier.id}
            className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[32px] p-8 relative card-lift flex flex-col group hover:border-[var(--color-accent)]/30 transition-all shadow-xl"
          >
            <div className="absolute top-0 right-10 -translate-y-1/2 bg-black border border-white/10 text-white px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest flex items-center gap-2 shadow-2xl">
              <Activity size={14} className="text-[var(--color-accent)]" /> 24 HR BOOST
            </div>

            <div className="mb-8 flex-1">
              <div className="w-14 h-14 bg-black/20 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform">
                <Zap size={28} className="text-[var(--text-muted)] group-hover:text-[var(--color-accent)] transition-colors" />
              </div>
              <h3 className="text-2xl font-black text-white mb-2 tracking-tighter">{tier.label}</h3>
              <p className="text-[var(--text-muted)] text-sm mb-8 leading-relaxed font-medium">
                Boost all video and game earnings for 24 hours.
              </p>

              <div className="bg-black/20 rounded-2xl p-4 border border-white/5 shadow-inner">
                <div className="text-[var(--green-500)] font-black text-xl mono-figure flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap size={20} />
                    <span>{tier.multiplierDisplay}</span>
                  </div>
                  <ShieldCheck size={18} className="opacity-40" />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-white/5">
              <div className="flex justify-between items-baseline mb-6">
                <span className="text-[var(--text-muted)] text-[10px] font-black uppercase tracking-[0.2em]">
                  Price
                </span>
                <span className="text-3xl font-black text-white mono-figure tracking-tighter">
                  ₦{tier.price.toLocaleString()}
                </span>
              </div>

              <form action="/api/boosts/initialize" method="POST">
                <input type="hidden" name="tier" value={tier.id} />
                <button
                  className={`w-full py-4 text-xs font-black uppercase tracking-[0.2em] rounded-2xl transition-all border transform active:scale-95 ${
                    activeBoost?.tier === tier.id
                      ? "bg-green-500/10 border-green-500/20 text-green-500"
                      : "bg-[var(--surface-700)] border-white/5 text-[var(--text-muted)] hover:bg-[var(--color-accent)] hover:text-[#0a0f0d] hover:border-[var(--color-accent)] shadow-lg hover:shadow-[var(--gold-500)]/20"
                  }`}
                >
                  {activeBoost?.tier === tier.id ? "BOOST ACTIVE" : "BUY BOOST"}
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
