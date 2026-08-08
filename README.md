# Nikhil's Feast — Admin Portal

Premium restaurant management & P&L platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Recharts** (charts)
- **Lucide React** (icons)

## Pages

- `/login` — Login page
- `/dashboard` — Overview with KPIs, charts, alerts
- `/orders` — Order management with status filters
- `/menu` — Menu items with category tabs and margin indicators
- `/ingredients` — Stock management with status badges
- `/purchases` — Purchase history
- `/wastage` — Wastage tracking with reason breakdown
- `/recipes` — Bill of materials / recipe cost calculator
- `/expenses` — Operating expense tracker
- `/pnl` — Full P&L statement with charts
- `/reports` — Export center for all reports
- `/settings` — Restaurant configuration

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

Login with any email/password — mock auth, no backend needed.

## Deploy to Vercel

### Option 1: Vercel CLI
```bash
npm i -g vercel
vercel
```

### Option 2: GitHub + Vercel Dashboard
1. Push to a GitHub repo
2. Go to [vercel.com](https://vercel.com)
3. Import the repository
4. Click Deploy — zero configuration needed

## Current Status

All pages use **mock data** (no database required). Ready for Supabase integration in Phase 2.
