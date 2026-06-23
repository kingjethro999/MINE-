import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [videoWatches, playSessions] = await Promise.all([
    prisma.videoWatch.findMany({
      where: { userId: session.user.id },
      orderBy: { watchedAt: "desc" },
      take: 50,
    }),
    prisma.playSession.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  const items = [
    ...videoWatches.map((v) => ({
      id: v.id,
      type: "video" as const,
      title: v.title ?? `Video #${v.pexelsVideoId}`,
      amountUsd: v.amountUsd,
      boostMultiplier: v.boostMultiplier,
      date: v.watchedAt.toISOString(),
    })),
    ...playSessions.map((p) => ({
      id: p.id,
      type: "game" as const,
      title: `Game session`,
      amountUsd: p.coinsAwarded,
      boostMultiplier: p.boostMultiplier,
      minutesPlayed: p.minutesPlayed,
      date: p.createdAt.toISOString(),
    })),
  ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return NextResponse.json({ items });
}
