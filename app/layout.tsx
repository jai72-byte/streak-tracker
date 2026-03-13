import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daily Learning Streak Tracker",
  description: "Track your daily study streak and build consistent habits.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-gray-900">
        <nav className="bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl">📚</span>
              <span className="font-bold text-lg text-indigo-700">
                StreakTracker
              </span>
            </div>
            <div className="flex gap-6 text-sm font-medium">
              <a
                href="/dashboard"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Dashboard
              </a>
              <a
                href="/history"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                History
              </a>
            </div>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-4 py-10">{children}</main>
        <footer className="text-center py-6 text-xs text-gray-400">
          Keep learning, every day counts 🌟
        </footer>
      </body>
    </html>
  );
}
