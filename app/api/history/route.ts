import { getHistory } from "@/lib/streakLogic";
import { NextResponse } from "next/server";

export async function GET() {
  const dates = await getHistory();
  return NextResponse.json({ dates });
}
