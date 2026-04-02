# Mailmind AI

![Next.js](https://img.shields.io/badge/Next.js_16-black?logo=next.js) ![TypeScript](https://img.shields.io/badge/TypeScript_5.8-3178C6?logo=typescript&logoColor=white) ![OpenAI](https://img.shields.io/badge/GPT--4o-412991?logo=openai&logoColor=white) ![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase&logoColor=white) ![License](https://img.shields.io/badge/license-MIT-green)

> AI-powered email triage tool that classifies intent, detects urgency, and drafts replies — built for customer-facing teams.

## Features

- **GPT-4o analysis pipeline** — category, sentiment, urgency, confidence score, entity extraction
- **8 intent categories** — complaint, sales lead, technical question, billing, feature request, partnership, onboarding, churn risk
- **Automatic draft reply** generated per analyzed email
- **Entity extraction** — products, order IDs, account IDs, detected issues
- **Real-time inbox** with filtering via Supabase Realtime
- **Dashboard** — category distribution, urgency breakdown, confidence over time
- **Authentication** — Supabase Auth (email/password) with brute-force protection (5 attempts / 15 min / IP)
- **Security** — HTTP security headers (CSP, HSTS, X-Frame-Options), Zod-validated API inputs
- **Protected routes** — server-side session validation on all app pages

## Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5.8 |
| Styling | Tailwind CSS 4, Radix UI primitives |
| Data fetching | TanStack Query 5 |
| Charts | Recharts 2 |
| AI | OpenAI API (GPT-4o, Structured Outputs) |
| Schema validation | Zod 3 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Real-time | Supabase Realtime |
| Deploy | Vercel |

## Quick Start

### Prerequisites

- Node.js 20+
- A Supabase project
- An OpenAI API key

### Installation

```bash
git clone https://github.com/VDurocher/mailmind
cd mailmind
npm install
cp .env.example .env.local
# Fill in the required variables in .env.local
npm run dev
```

### Database setup

```bash
# Via Supabase CLI
supabase db push

# Or apply manually in the Supabase SQL editor
# File: supabase-migration.sql
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key | Yes |
| `OPENAI_API_KEY` | OpenAI secret key — server-side only | Yes |
| `NEXT_PUBLIC_APP_URL` | Base URL of the app (e.g. `http://localhost:3000`) | Yes |
| `SUPABASE_DB_URL` | PostgreSQL connection string — migration scripts only | No |

> `OPENAI_API_KEY` must never be prefixed with `NEXT_PUBLIC_`. Used exclusively in server-side API routes.

## Project Structure

```
src/
├── app/
│   ├── (auth)/           — Login and registration pages (public)
│   ├── (app)/            — Protected routes (auth required)
│   │   ├── dashboard/    — Metrics and charts
│   │   ├── inbox/        — Email list and analysis modal
│   │   └── settings/     — User profile and data management
│   ├── api/
│   │   ├── auth/login/   — POST: Supabase login with rate limiting
│   │   ├── analyze/      — POST: AI analysis pipeline
│   │   ├── analyses/     — GET: paginated inbox with filters
│   │   └── usage/        — GET: dashboard statistics
│   └── page.tsx          — Public landing page
│
├── components/
│   ├── ui/               — Base components (Radix UI + Tailwind)
│   ├── auth/             — Login form
│   ├── dashboard/        — Stats grid, charts
│   ├── inbox/            — Email list, filters, analysis modal
│   ├── landing/          — Hero, features, footer
│   └── layout/           — Sidebar, header, mobile nav
│
├── lib/
│   ├── openai/           — GPT-4o pipeline, Zod-to-JSON-Schema
│   ├── supabase/         — Server and client Supabase instances
│   ├── security/         — Rate limiter (in-memory sliding window)
│   ├── hooks/            — TanStack Query hooks
│   ├── queries/          — Supabase query functions
│   ├── types/            — Shared TypeScript types
│   └── validations/      — Zod schemas for all API inputs
│
supabase-migration.sql    — Database schema
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/auth/login` | Authenticates user via Supabase, rate-limited per IP |
| `POST` | `/api/analyze` | Validates input, calls GPT-4o, stores result |
| `GET` | `/api/analyses` | Paginated email analyses with filters |
| `GET` | `/api/analyses/[id]` | Single analysis by ID |
| `GET` | `/api/usage` | Dashboard statistics (category breakdown, urgency, confidence) |

### Example — Analyze an email

```typescript
const response = await fetch('/api/analyze', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    subject: 'My order never arrived',
    body: 'Hi, I placed order #12345 two weeks ago and still nothing...',
    sender: 'customer@example.com',
  }),
})

const analysis = await response.json()
// {
//   category: 'complaint',
//   urgency: 'high',
//   sentiment: 'negative',
//   confidence: 0.94,
//   entities: { orderIds: ['12345'] },
//   draftReply: 'Hi, we sincerely apologize...'
// }
```

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # TypeScript check (no emit)
```

## License

MIT
