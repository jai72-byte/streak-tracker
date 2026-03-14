# 📚 Daily Learning Streak Tracker

A full-stack web application built with **Next.js**, **TypeScript**, and **Tailwind CSS** that helps students build consistent study habits by tracking their daily learning streaks.

---

## 🚀 Live Demo

> Replace with your Vercel URL after deployment:
> **https://streak-tracker-theta.vercel.app/**

---

## 🛠 Tech Stack

| Layer      | Technology                                  |
| ---------- | ------------------------------------------- |
| Frontend   | Next.js 14 (App Router), React, TypeScript  |
| Styling    | Tailwind CSS                                |
| Backend    | Next.js API Routes                          |
| Storage    | Upstash Redis (persistent, works on Vercel) |
| Deployment | Vercel                                      |

---

## ⚙️ Setup Instructions

### Prerequisites

- Node.js 18+
- npm or yarn
- [Upstash](https://upstash.com) account (free)

### 1. Clone the repository

```bash
git clone https://github.com/jai72-byte/streak-tracker.git
cd streak-tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create an Upstash Redis database

1. Go to [console.upstash.com](https://console.upstash.com) and sign up (free)
2. Click **Create Database**, name it `streak-tracker`
3. Once created, go to the database page
4. Scroll to the **REST API** section and copy:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`

### 4. Add environment variables

Create a `.env.local` file in the project root:

```bash
KV_REST_API_URL=https://fond-bear-70727.upstash.io
KV_REST_API_TOKEN=gQAAAAAAARRHAAIncDI5NzYzOTc3ODdlNTY0NmNjOTA2MWJiMzgyN2M4OGJkNXAyNzA3Mjc
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 Vercel Deployment

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: Daily Learning Streak Tracker"
git branch -M main
git remote add origin https://github.com/jai72-byte/streak-tracker.git
git push -u origin main
```

### Step 2 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in with GitHub
2. Click **Add New Project** → import your `streak-tracker` repo
3. Go to **Settings → Environment Variables** and add:

```
KV_REST_API_URL        =  https://fond-bear-70727.upstash.io
KV_REST_API_TOKEN=gQAAAAAAARRHAAIncDI5NzYzOTc3ODdlNTY0NmNjOTA2MWJiMzgyN2M4OGJkNXAyNzA3Mjc


4. Click **Deploy**
5. Visit your live URL — done! ✅

> After any future code changes, just `git push origin main` and Vercel redeploys automatically.

---

## 📁 Project Structure

```

streak-tracker/
├── app/
│ ├── layout.tsx # Root layout with navbar & footer
│ ├── page.tsx # Redirects / → /dashboard
│ ├── globals.css # Tailwind base styles
│ ├── dashboard/
│ │ └── page.tsx # Dashboard — streak cards + study button
│ ├── history/
│ │ └── page.tsx # Study history page
│ └── api/
│ ├── study/
│ │ └── route.ts # POST /api/study
│ ├── streak/
│ │ └── route.ts # GET /api/streak
│ └── history/
│ └── route.ts # GET /api/history
├── components/
│ ├── StreakCard.tsx # Stat display card (streak, days, last date)
│ ├── StudyButton.tsx # "I Studied Today" button with live feedback
│ └── HistoryList.tsx # Ordered list of all study dates
├── lib/
│ └── streakLogic.ts # Core streak logic + Upstash Redis data layer
├── .env.local # Local env variables (gitignored)
├── .gitignore
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md

````

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
````

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

Study dates are stored as a `string[]` array in Upstash Redis under the key `studyDates`:

```json
["2026-03-10", "2026-03-11", "2026-03-12"]
```

Every API request reads fresh from Redis and writes back immediately after any change, ensuring full persistence across serverless function instances on Vercel.

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
- 📅 All study dates are permanently saved in Upstash Redis

---

## ✨ Features

- **Dashboard (`/dashboard`)** — current streak, total days, last study date, study button
- **Study Button** — one-click session logging with instant success/error feedback
- **History Page (`/history`)** — full list of all study dates, newest first
- **Duplicate prevention** — same day cannot be logged twice
- **Persistent storage** — data stored in Upstash Redis, survives server restarts and redeployments
- **Responsive UI** — works on mobile and desktop
- **Clean design** — Tailwind CSS with indigo/purple theme

---

## 👨‍💻 Author

Built as a KALNET Full Stack Intern Task.
