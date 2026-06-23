import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { PLANS, PlanId } from "@/lib/plans";
import GameMonetizeEmbed from "@/components/games/GameMonetizeEmbed";
import { ArrowLeft, Activity, ShieldCheck, Zap } from "lucide-react";

interface GameFeedItem {
  id?: string;
  title: string;
  thumb: string;
  url?: string;
}

export default async function GamesPage({
  searchParams
}: {
  searchParams: Promise<{ game?: string }>
}) {
  const { game } = await searchParams;
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id }
  });

  if (!user) redirect("/login");

  const planData = PLANS[user.plan.toLowerCase() as PlanId];

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const gamesResponse = await fetch(`${appUrl}/api/games/feed`);
  const gamesData = await gamesResponse.json();
  const games = Array.isArray(gamesData) ? gamesData : [];

  const gamesWithIds: GameFeedItem[] = games.map((g: GameFeedItem) => {
    let id = g.id;
    if (!id && g.url) {
      const parts = g.url.split('/').filter(Boolean);
      id = parts[parts.length - 1]; // last segment
    }
    return { ...g, id: id || g.title.replace(/\s+/g, '-').toLowerCase() };
  });

  const activeGame = game ? gamesWithIds.find((g) => g.id === game) : null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-black text-white mb-2 tracking-tight uppercase">Play & earn rewards</h1>
        <p className="text-[var(--text-secondary)] font-medium">Play partner games and earn up to ₦{planData.gameEarningsPerMinute}/min based on eligible active playtime.</p>
      </header>

      {activeGame ? (
        <div className="max-w-5xl mx-auto">
          <a href="/games" className="text-[var(--color-accent)] text-[10px] font-black uppercase tracking-widest hover:text-white mb-6 inline-flex items-center gap-2 transition-colors">
            <ArrowLeft size={14} />
            Stop game & go back
          </a>
          <div className="bg-black/40 rounded-[32px] overflow-hidden border border-white/5 shadow-2xl">
            <GameMonetizeEmbed
                gameId={activeGame.id || ""}
                gameUrl={activeGame.url || ""}
                coinsPerMinute={planData.gameEarningsPerMinute}
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
          {gamesWithIds.map((game) => (
            <a
              key={game.id}
              href={`/games?game=${game.id}`}
              className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-[24px] overflow-hidden shadow-xl card-lift block group hover:border-[var(--color-accent)]/30 transition-all"
            >
              <div className="relative">
                 <img src={game.thumb} alt={game.title} className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform duration-500" />
                 <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-[var(--color-accent)] text-[#0a0f0d] p-1.5 rounded-lg shadow-lg">
                       <Zap size={14} className="fill-current" />
                    </div>
                 </div>
              </div>
              <div className="p-5 flex items-center justify-between gap-2">
                <h3 className="font-black text-white text-[11px] uppercase tracking-wider truncate flex-1">{game.title}</h3>
                <Activity size={14} className="text-[var(--text-muted)] group-hover:text-[var(--color-accent)] transition-colors" />
              </div>
            </a>
          ))}
        </div>
      )}

      {!activeGame && (
        <div className="p-8 bg-black/20 border border-white/5 rounded-[32px]">
           <div className="flex items-center gap-4">
              <div className="p-3 bg-[var(--color-accent)]/10 rounded-2xl border border-[var(--color-accent)]/10">
                 <ShieldCheck size={24} className="text-[var(--color-accent)]" />
              </div>
              <div>
                 <h4 className="font-black text-white text-sm uppercase tracking-widest">Why gameplay earns rewards</h4>
                 <p className="text-[10px] text-[var(--text-muted)] leading-relaxed font-bold uppercase tracking-wider opacity-60">Some game partners run paid user-acquisition campaigns. When your active playtime qualifies, part of that campaign value can be credited to your rewards balance.</p>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
