# 📚 Daily Learning Streak Tracker

A full-stack web application built with **Next.js**, **TypeScript**, and **Tailwind CSS** that helps students build consistent study habits by tracking their daily learning streaks.

---

## 🚀 Live Demo

> Replace with your Vercel URL after deployment:
> **https://your-project.vercel.app**

---

## 🛠 Tech Stack

| Layer      | Technology                                                    |
| ---------- | ------------------------------------------------------------- |
| Frontend   | Next.js 14 (App Router), React, TypeScript                    |
| Styling    | Tailwind CSS                                                  |
| Backend    | Next.js API Routes                                            |
| Storage    | JSON file (`data/study.json`) — persistent across hot reloads |
| Deployment | Vercel                                                        |

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn

### Local Development

```bash
# 1. Clone the repository
git clone https://github.com/jai72-byte/streak-tracker.git
cd streak-tracker

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
open http://localhost:3000
```

The app will automatically create a `data/study.json` file on first run to store your study sessions.

### Vercel Deployment

```bash
# 1. Initialize git and push to GitHub
git init
git add .
git commit -m "Initial commit: Daily Learning Streak Tracker"
git branch -M main
git remote add origin https://github.com/jai72-byte/streak-tracker.git
git push -u origin main

# 2. Go to https://vercel.com and import your GitHub repo
# 3. Click Deploy — no environment variables needed
# 4. Share the live link!
```

---

## 📁 Project Structure

```
streak-tracker/
├── app/
│   ├── layout.tsx               # Root layout with navbar & footer
│   ├── page.tsx                 # Redirects / → /dashboard
│   ├── globals.css              # Tailwind base styles
│   ├── dashboard/
│   │   └── page.tsx            # Dashboard — streak cards + study button
│   ├── history/
│   │   └── page.tsx             # Study history page
│   └── api/
│       ├── study/
│       │   └── route.ts         # POST /api/study
│       ├── streak/
│       │   └── route.ts         # GET /api/streak
│       └── history/
│           └── route.ts         # GET /api/history
├── components/
│   ├── StreakCard.tsx      # Stat display card (streak, days, last date)
│   ├── StudyButton.tsx     # "I Studied Today" button with live feedback
│   └── HistoryList.tsx     # Ordered list of all study dates
├── lib/
│   └── streakLogic.ts        # Core streak logic + JSON file data layer
├── data/
│   └── study.json               # Auto-created on first run (gitignored)
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 🔌 API Reference

### `POST /api/study`

Mark today as a study day.

**Response (success) — `200 OK`:**

```json
{
  "success": true,
  "message": "Great work! Study session recorded.",
  "streak": 3,
  "totalDays": 10,
  "lastStudied": "14 March 2026"
}
```

**Response (already marked) — `409 Conflict`:**

```json
{
  "success": false,
  "message": "You have already marked today."
}
```

---

### `GET /api/streak`

Get current streak info.

**Response — `200 OK`:**

```json
{
  "streak": 3,
  "totalDays": 10,
  "lastStudied": "14 March 2026",
  "studiedToday": true
}
```

---

### `GET /api/history`

Get all study dates, newest first.

**Response — `200 OK`:**

```json
{
  "dates": ["14 March 2026", "13 March 2026", "12 March 2026"]
}
```

---

## 🔥 How Streak Logic Works

The streak is calculated in `lib/streakLogic.ts` using the `calculateStreak()` function.

### Storage

Study dates are saved as `YYYY-MM-DD` strings in `data/study.json`:

```json
{
  "studyDates": ["2026-03-10", "2026-03-11", "2026-03-12"]
}
```

The file is read fresh on every API request and written immediately after any change, ensuring data survives hot reloads in development.

### Streak Calculation Rules

1. Dates are sorted in ascending order.
2. Starting from the most recent entry, the function walks backward.
3. If two consecutive dates are exactly **1 day apart**, the streak continues.
4. If any gap is **more than 1 day**, counting stops.
5. If the most recent date is **not today or yesterday**, the streak is `0`.

### Example

```
Studied: 10 Mar → 11 Mar → 12 Mar
Streak = 3 ✅

Studied: 10 Mar → 11 Mar → 12 Mar, skipped 13 Mar, studied 14 Mar
Streak resets = 1 ✅
```

### Business Rules Enforced

- ❌ Cannot mark study twice in one day (`409 Conflict`)
- 🔥 Streak only grows if the previous day was also studied
- 🔄 Skipping a day resets streak to 1
- 📅 All study dates are permanently saved in history

---

## ✨ Features

- **Dashboard (`/dashboard`)** — current streak, total days, last study date, study button
- **Study Button** — one-click session logging with instant success/error feedback
- **History Page (`/history`)** — full list of all study dates, newest first
- **Duplicate prevention** — same day cannot be logged twice
- **Persistent storage** — data saved to `data/study.json`, survives server restarts
- **Responsive UI** — works on mobile and desktop
- **Clean design** — Tailwind CSS with indigo/purple theme

---

## 👨‍💻 Author

Built as a KALNET Full Stack Intern Task.
