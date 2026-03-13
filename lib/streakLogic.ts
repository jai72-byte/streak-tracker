import { Redis } from "@upstash/redis";

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

const KV_KEY = "studyDates";

async function readDates(): Promise<string[]> {
  const dates = await redis.get<string[]>(KV_KEY);
  return dates ?? [];
}

async function writeDates(dates: string[]): Promise<void> {
  await redis.set(KV_KEY, dates);
}

export function getTodayString(): string {
  return new Date().toISOString().split("T")[0];
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00Z");
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function calculateStreak(sortedDates: string[]): number {
  if (sortedDates.length === 0) return 0;

  const today = getTodayString();
  const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

  const mostRecent = sortedDates[sortedDates.length - 1];
  if (mostRecent !== today && mostRecent !== yesterday) return 0;

  let streak = 1;
  for (let i = sortedDates.length - 1; i > 0; i--) {
    const current = new Date(sortedDates[i] + "T00:00:00Z");
    const previous = new Date(sortedDates[i - 1] + "T00:00:00Z");
    const diffDays =
      (current.getTime() - previous.getTime()) / (1000 * 60 * 60 * 24);
    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }
  return streak;
}

export async function getAllDates(): Promise<string[]> {
  return (await readDates()).sort();
}

export async function hasStudiedToday(): Promise<boolean> {
  const dates = await readDates();
  return dates.includes(getTodayString());
}

export async function markTodayStudied(): Promise<boolean> {
  const dates = await readDates();
  const today = getTodayString();
  if (dates.includes(today)) return false;
  await writeDates([...dates, today]);
  return true;
}

export async function getStreakInfo() {
  const sorted = await getAllDates();
  const streak = calculateStreak(sorted);
  const totalDays = sorted.length;
  const lastStudied =
    sorted.length > 0 ? formatDate(sorted[sorted.length - 1]) : null;
  return { streak, totalDays, lastStudied };
}

export async function getHistory(): Promise<string[]> {
  return (await getAllDates()).reverse().map(formatDate);
}
