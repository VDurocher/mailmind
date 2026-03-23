# Leçons apprises — MailMind

## L001 : exactOptionalPropertyTypes incompatible avec spread conditionnel

**Problème** : `{ ...(cond && { key: val }) }` produit `{ key?: T | undefined }` que TypeScript rejette avec `exactOptionalPropertyTypes: true`.

**Solution** : Utiliser la construction impérative (if/then) OU retirer `exactOptionalPropertyTypes`. On a retiré le flag.

**Applicable à** : Toute construction de filtres depuis URL params, FormData, etc.

---

## L002 : Types Supabase cookie (@supabase/ssr 0.6.1)

**Problème** : Le callback `setAll` a pour type `SetAllCookies` défini dans `@supabase/ssr/types.d.ts`. L'import `CookieOptions` est nécessaire pour typer le paramètre.

**Solution** : `import { createServerClient, type CookieOptions } from '@supabase/ssr'` puis `type CookieEntry = { name: string; value: string; options: CookieOptions }`.

---

## L003 : create-next-app non interactif sous Windows PowerShell

**Problème** : `npx create-next-app` demande des prompts interactifs qui ne peuvent pas être automatisés via heredoc ou stdin.

**Solution** : Créer le projet manuellement (package.json, tsconfig.json, fichiers de config) est plus rapide et contrôlé.
