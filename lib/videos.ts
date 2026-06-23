import db from "./db";

/** Start of today in UTC */
export function startOfTodayUtc(): Date {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

export async function getDailyVideoWatchCount(userId: string): Promise<number> {
  const start = startOfTodayUtc();
  return db.videoWatch.count({
    where: {
      userId,
      watchedAt: { gte: start },
    },
  });
}
