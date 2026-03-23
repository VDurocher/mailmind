# Contexte — MailMind

## État : Session 1 terminée (2026-03-23)

### Ce qui est implémenté

**Phase 1 — Scaffolding** ✅
- Next.js 16.x (16.2.1), TypeScript strict, Tailwind CSS 4, app router
- Structure de dossiers complète src/app, src/lib, src/components, src/providers
- Types TypeScript (email.types.ts, result.types.ts), constantes (routes, categories, sample-emails)
- Clients Supabase (browser/server/middleware), singleton OpenAI, middleware auth

**Phase 2 — Auth** ✅
- Middleware de protection des routes (updateSession)
- Pages /login et /register avec LoginForm et RegisterForm
- Sidebar, AppHeader, AppLayout pour les routes protégées
- Providers (QueryProvider, SupabaseProvider)

**Phase 3 — Pipeline IA** ✅
- SYSTEM_PROMPT porté depuis Python (prompt.ts)
- analyzeEmail() avec GPT-4o + validation Zod + fallback (pipeline.ts)
- Route POST /api/analyze — validation → GPT-4o → insert Supabase
- Schémas Zod : AnalyzeRequestSchema, OpenAIResponseSchema, DraftUpdateSchema
- 10 sample emails portés depuis dataset.py

**Phase 4 — Inbox** ✅
- Routes GET /api/analyses (liste paginée + filtres)
- Hooks TanStack Query : useAnalyses, useAnalyzeEmail, useRealtimeInbox
- Composants : EmailList, EmailListItem, EmailFilters, AnalyzeModal, SampleEmailPicker
- Page /inbox avec modal + filtres + pagination

**Phase 5 — Dashboard** ✅
- Routes GET /api/usage (stats, category, confidence_time, urgency)
- Hooks : useDashboardStats, useCategoryStats, useConfidenceTimeSeries, useUrgencyStats
- Composants Recharts : CategoryPieChart, UrgencyBarChart, ConfidenceLineChart
- StatsGrid (4 métriques), RecentAnalysesList

**Phase 6 — Landing Page** ✅
- HeroSection, FeaturesSection, Footer
- Page / avec navbar, metadata OG

**Phase 7 — Détail** ✅
- Route GET/PATCH /api/analyses/[id]
- Hooks : useAnalysis, useUpdateDraft (sauvegarde optimiste)
- Composants : OriginalEmailPanel, AnalysisPanel, DraftReplyPanel (éditable), EntityTags
- Page /inbox/[id] grille 3 colonnes

**Phase 8 — Settings** ✅
- Page /settings : stats usage, intégrations (coming soon), danger zone avec AlertDialog

### Fichiers importants

- `supabase-migration.sql` — SQL à exécuter dans Supabase avant premier lancement
- `.env.local` — à remplir avec les vraies clés Supabase + OpenAI

### Supabase — Projet configuré ✅

- **Projet** : `mailmind` (ref: `fdrxlbhixtgrgaahhmml`)
- **Organisation** : VDurocher (`nhswyeqnnwfascqbqnkp`)
- **URL** : `https://fdrxlbhixtgrgaahhmml.supabase.co`
- **Migration** : appliquée via Management API — table + index + RLS + Realtime OK
- **`.env.local`** : URL et anon key renseignées. **Manque encore : `OPENAI_API_KEY`**

### Prochaines étapes

1. Ajouter `OPENAI_API_KEY` dans `.env.local`
2. `npm run dev` → tester le flow complet
3. Déployer sur Vercel avec les env vars

### Bugs / Points d'attention

- `exactOptionalPropertyTypes` retiré du tsconfig — incompatible avec la construction de filtres depuis URL params (pattern Supabase + URLSearchParams)
- Les options de cookie Supabase (secure, sameSite, etc.) sont ignorées dans setAll — utiliser le default de Supabase
- La sidebar est statique (pas de mobile burger menu) — à implémenter si besoin
