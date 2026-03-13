"use client";

import StreakCard from "@/components/StreakCard";
import StudyButton from "@/components/StudyButton";
import Link from "next/link";
import { useEffect, useState } from "react";

interface StreakData {
  streak: number;
  totalDays: number;
  lastStudied: string | null;
  studiedToday: boolean;
}

export default function DashboardPage() {
  const [data, setData] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/streak")
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      });
  }, []);

  function handleStudySuccess(updated: {
    streak: number;
    totalDays: number;
    lastStudied: string;
  }) {
    setData((prev) =>
      prev ? { ...prev, ...updated, studiedToday: true } : prev,
    );
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-gray-400">
        <svg
          className="animate-spin h-8 w-8 mb-4 text-indigo-400"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8z"
          />
        </svg>
        Loading your streak...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-900">Welcome back! 👋</h1>
        <p className="text-gray-500 text-lg">
          Keep your streak alive — every day of learning counts.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StreakCard
          label="Current Streak"
          value={`${data?.streak ?? 0} day${data?.streak !== 1 ? "s" : ""}`}
          icon="🔥"
          highlight
        />
        <StreakCard
          label="Total Study Days"
          value={data?.totalDays ?? 0}
          icon="📅"
        />
        <StreakCard
          label="Last Studied"
          value={data?.lastStudied ?? "—"}
          icon="🕐"
        />
      </div>

      <div className="flex flex-col items-center py-4">
        <StudyButton
          studiedToday={data?.studiedToday ?? false}
          onSuccess={handleStudySuccess}
        />
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-center">
        <p className="text-amber-800 text-sm font-medium">
          💡 <strong>Streak rule:</strong> Study every consecutive day to grow
          your streak. Missing a day resets it to 1.
        </p>
      </div>

      <div className="text-center">
        <Link
          href="/history"
          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          View full study history →
        </Link>
      </div>
    </div>
  );
}
