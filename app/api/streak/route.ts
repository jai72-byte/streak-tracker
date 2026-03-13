import { getStreakInfo, hasStudiedToday } from "@/lib/streakLogic";
import { NextResponse } from "next/server";

export async function GET() {
  const info = getStreakInfo();
  return NextResponse.json({
    ...info,
    studiedToday: hasStudiedToday(),
  });
}
