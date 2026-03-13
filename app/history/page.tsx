"use client";

import HistoryList from "@/components/HistoryList";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HistoryPage() {
  const [dates, setDates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/history")
      .then((r) => r.json())
      .then((d) => {
        setDates(d.dates ?? []);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Study History</h1>
          <p className="text-gray-500 mt-1">
            Every session you&apos;ve logged — keep it growing!
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium transition-colors"
        >
          ← Back to Dashboard
        </Link>
      </div>

      {!loading && dates.length > 0 && (
        <div className="bg-indigo-50 border border-indigo-100 rounded-2xl px-6 py-4 flex items-center gap-3">
          <span className="text-2xl">📊</span>
          <p className="text-indigo-800 font-medium">
            You have studied on <strong>{dates.length}</strong> day
            {dates.length !== 1 ? "s" : ""} in total. Amazing work!
          </p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 text-gray-400">
            <svg
              className="animate-spin h-7 w-7 mb-3 text-indigo-400"
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
            Loading history...
          </div>
        ) : (
          <HistoryList dates={dates} />
        )}
      </div>
    </div>
  );
}
