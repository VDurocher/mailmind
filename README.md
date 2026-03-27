# MailMind

> AI-powered support email analysis tool that classifies intent, detects urgency, and drafts replies — built for customer-facing teams.

## Features

- Email analysis via GPT-4o: category classification, sentiment, urgency, confidence score
- 8 supported categories: complaint, sales lead, technical question, billing, feature request, partnership, onboarding, churn risk
- Automatic draft reply generation per analyzed email
- Entity extraction: products, order IDs, account IDs, detected issues
- Inbox with filtering and real-time updates via Supabase Realtime
- Dashboard with charts: category distribution, urgency breakdown, confidence over time
- Usage statistics per user (configurable time window)
- Account settings with data deletion
- Authentication with Supabase Auth (email/password)
- Protected routes with server-side session validation

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
| Deploy | Vercel (recommended) |

## Quick Start

### Prerequisites

- Node.js 20+
- npm or pnpm
- A Supabase project
- An OpenAI API key

### Installation

```bash
git clone https://github.com/your-username/mailmind
cd mailmind
npm install
cp .env.example .env.local
# Fill in the required variables in .env.local
npm run dev
```

### Database setup

Apply the migration to your Supabase project:

```bash
# Via Supabase CLI
supabase db push

# Or apply the SQL file manually in the Supabase SQL editor
# File: supabase-migration.sql
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous (public) key | Yes |
| `OPENAI_API_KEY` | OpenAI secret key — server-side only, never expose to the client | Yes |
| `NEXT_PUBLIC_APP_URL` | Base URL of the application (e.g. `http://localhost:3000`) | Yes |
| `SUPABASE_DB_URL` | PostgreSQL connection string — required for migration scripts only | No |

> `OPENAI_API_KEY` must never be prefixed with `NEXT_PUBLIC_`. It is used exclusively in server-side API routes.

## Project Structure

```
src/
├── app/
│   ├── (auth)/           — Login and registration pages (public)
│   │   ├── login/
│   │   └── register/
│   ├── (app)/            — Protected routes (auth required)
│   │   ├── dashboard/    — Metrics and charts
│   │   ├── inbox/        — Email list and analysis modal
│   │   └── settings/     — User profile and data management
│   ├── api/
│   │   ├── analyze/      — POST: runs the full AI analysis pipeline
│   │   ├── analyses/     — GET: paginated inbox with filters
│   │   └── usage/        — GET: dashboard statistics
│   ├── layout.tsx
│   └── page.tsx          — Public landing page
│
├── components/
│   ├── ui/               — Base components (Radix UI + Tailwind)
│   ├── auth/             — Login and register forms
│   ├── dashboard/        — Stats grid, pie chart, bar chart, line chart
│   ├── inbox/            — Email list, filters, analysis modal, detail view
│   ├── landing/          — Hero section, features section, footer
│   ├── layout/           — Sidebar, header, mobile nav
│   └── shared/           — Reusable cross-feature components
│
├── lib/
│   ├── openai/           — GPT-4o pipeline, Zod-to-JSON-Schema conversion
│   ├── supabase/         — Server and client Supabase instances
│   ├── hooks/            — TanStack Query hooks (analyses, stats, realtime)
│   ├── queries/          — Supabase query functions
│   ├── types/            — Shared TypeScript types
│   └── validations/      — Zod schemas for API inputs and AI responses
│
supabase/
supabase-migration.sql    — Database schema
```

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/analyze` | Validates input, calls GPT-4o, stores result in Supabase |
| `GET` | `/api/analyses` | Returns paginated email analyses with optional filters |
| `GET` | `/api/usage` | Returns dashboard statistics (stats, category breakdown, urgency, confidence) |

## Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript compiler check (no emit)
```

## License

Private
