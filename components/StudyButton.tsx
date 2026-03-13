"use client";

import { useState } from "react";

interface StudyButtonProps {
  studiedToday: boolean;
  onSuccess: (data: {
    streak: number;
    totalDays: number;
    lastStudied: string;
  }) => void;
}

export default function StudyButton({
  studiedToday: initialStudied,
  onSuccess,
}: StudyButtonProps) {
  const [studiedToday, setStudiedToday] = useState(initialStudied);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error" | "info";
  } | null>(null);

  async function handleClick() {
    if (studiedToday) {
      setMessage({
        text: "You have already marked today. Keep it up! 🎉",
        type: "info",
      });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/study", { method: "POST" });
      const data = await res.json();

      if (res.ok && data.success) {
        setStudiedToday(true);
        setMessage({ text: data.message, type: "success" });
        onSuccess({
          streak: data.streak,
          totalDays: data.totalDays,
          lastStudied: data.lastStudied,
        });
      } else {
        setMessage({
          text: data.message || "Something went wrong.",
          type: "error",
        });
      }
    } catch {
      setMessage({ text: "Network error. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  const messageColors = {
    success: "bg-green-50 border-green-200 text-green-800",
    error: "bg-red-50 border-red-200 text-red-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={handleClick}
        disabled={loading}
        className={`px-8 py-4 rounded-2xl text-white font-semibold text-lg shadow-md transition-all duration-200 ${
          studiedToday
            ? "bg-green-500 cursor-default"
            : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg active:scale-95"
        } disabled:opacity-60 disabled:cursor-not-allowed`}
      >
        {loading ? (
          <span className="flex items-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
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
            Saving...
          </span>
        ) : studiedToday ? (
          "✅ Studied Today!"
        ) : (
          "📖 I Studied Today"
        )}
      </button>

      {message && (
        <div
          className={`w-full max-w-sm px-4 py-3 rounded-xl border text-sm font-medium text-center ${messageColors[message.type]}`}
        >
          {message.text}
        </div>
      )}
    </div>
  );
}
