import { getStreakInfo, hasStudiedToday } from "@/lib/streakLogic";
import { NextResponse } from "next/server";

export async function GET() {
  const [info, studiedToday] = await Promise.all([
    getStreakInfo(),
    hasStudiedToday(),
  ]);
  return NextResponse.json({ ...info, studiedToday });
}
