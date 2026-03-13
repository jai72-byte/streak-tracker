import { getStreakInfo, markTodayStudied } from "@/lib/streakLogic";
import { NextResponse } from "next/server";

export async function POST() {
  const marked = markTodayStudied();

  if (!marked) {
    return NextResponse.json(
      { success: false, message: "You have already marked today." },
      { status: 409 },
    );
  }

  const info = getStreakInfo();
  return NextResponse.json({
    success: true,
    message: "Great work! Study session recorded.",
    ...info,
  });
}
