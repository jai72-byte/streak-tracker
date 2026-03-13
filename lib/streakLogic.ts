import fs from "fs";
import path from "path";

export interface StudyData {
  studyDates: string[];
}

const DATA_FILE = path.join(process.cwd(), "data", "study.json");

function ensureDataFile(): void {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify({ studyDates: [] }), "utf-8");
  }
}

function readData(): StudyData {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    return JSON.parse(raw) as StudyData;
  } catch {
    return { studyDates: [] };
  }
}

function writeData(data: StudyData): void {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
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

export function getAllDates(): string[] {
  return [...readData().studyDates].sort();
}

export function hasStudiedToday(): boolean {
  return readData().studyDates.includes(getTodayString());
}

export function markTodayStudied(): boolean {
  const data = readData();
  const today = getTodayString();
  if (data.studyDates.includes(today)) return false;
  data.studyDates.push(today);
  writeData(data);
  return true;
}

export function getStreakInfo() {
  const sorted = getAllDates();
  const streak = calculateStreak(sorted);
  const totalDays = sorted.length;
  const lastStudied =
    sorted.length > 0 ? formatDate(sorted[sorted.length - 1]) : null;
  return { streak, totalDays, lastStudied };
}

export function getHistory(): string[] {
  return getAllDates().reverse().map(formatDate);
}
