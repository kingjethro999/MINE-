import { auth } from "@/auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/db";
import { PLANS, PlanId } from "@/lib/plans";
import GameMonetizeEmbed from "@/components/games/GameMonetizeEmbed";
import { Gamepad2, ArrowLeft } from "lucide-react";

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

  const gamesWithIds = games.map((g: any) => {
    let id = g.id;
    if (!id && g.url) {
      const parts = g.url.split('/').filter(Boolean);
      id = parts[parts.length - 1]; // last segment
    }
    return { ...g, id: id || g.title.replace(/\s+/g, '-').toLowerCase() };
  });

  const activeGame = game ? gamesWithIds.find((g: any) => g.id === game) : null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <header>
        <h1 className="text-3xl font-bold text-white mb-2">Games Arcade</h1>
        <p className="text-[var(--text-secondary)]">Play games and earn ₦{planData.gameEarningsPerMinute}/min active time.</p>
      </header>

      {activeGame ? (
        <div>
          <a href="/games" className="text-[var(--gold-400)] text-sm font-bold hover:underline mb-4 inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Catalog
          </a>
          <GameMonetizeEmbed
            gameId={activeGame.id}
            showAds={planData.adsInGames}
            coinsPerMinute={planData.gameEarningsPerMinute}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
          {gamesWithIds.map((game: any) => (
            <a
              key={game.id}
              href={`/games?game=${game.id}`}
              className="bg-[var(--surface-800)] border border-[var(--surface-600)] rounded-xl overflow-hidden card-lift block group"
            >
              <img src={game.thumb} alt={game.title} className="w-full aspect-[4/3] object-cover" />
              <div className="p-4 flex items-center justify-between">
                <h3 className="font-bold text-white text-sm truncate pr-2">{game.title}</h3>
                <Gamepad2 size={16} className="text-[var(--gold-500)] group-hover:scale-110 transition-transform" />
              </div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
