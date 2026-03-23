# Stack — MailMind

## Versions

| Package | Version |
|---------|---------|
| Next.js | ^16.2.1 |
| React | ^19.0.0 |
| TypeScript | ^5.8.3 |
| Tailwind CSS | ^4.1.3 |
| @supabase/supabase-js | ^2.49.4 |
| @supabase/ssr | ^0.6.1 |
| openai | ^4.91.1 |
| zod | ^3.24.2 |
| @tanstack/react-query | ^5.72.2 |
| recharts | ^2.15.1 |
| sonner | ^2.0.1 |

## Variables d'environnement

```
NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
OPENAI_API_KEY=sk-...           # Côté serveur UNIQUEMENT
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Commandes

```bash
npm run dev          # Développement
npm run build        # Build production
npm run typecheck    # Vérification TypeScript
npm run lint         # ESLint
```

## Modèle OpenAI

- Modèle : `gpt-4o`
- max_tokens : 1024
- response_format : `json_object`
