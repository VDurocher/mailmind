# Décisions architecturales — MailMind

## ADR-001 : Retrait de exactOptionalPropertyTypes

**Date** : 2026-03-23
**Statut** : Accepté

**Contexte** : `exactOptionalPropertyTypes: true` cause des erreurs TypeScript irréconciliables avec les patterns de construction de filtres depuis URLSearchParams (le spread conditionnel `{ ...(cond && { key: val }) }` est rejeté).

**Décision** : Retiré de tsconfig.json. On garde `strict: true` et `noUncheckedIndexedAccess: true`.

**Conséquences** : Légèrement moins strict sur les propriétés optionnelles. Compensé par les Zod schemas sur tous les inputs.

---

## ADR-002 : Result<T> pour le pipeline IA

**Date** : 2026-03-23
**Statut** : Accepté

**Contexte** : Le pipeline OpenAI peut échouer (API error, parse error). On veut forcer la gestion des erreurs.

**Décision** : Le pipeline retourne `Result<T> = { ok: true, value: T } | { ok: false, error: string }`. La route API utilise `buildFallbackAnalysis()` si `!result.ok`.

**Conséquences** : L'analyse est toujours insérée en base, même en cas d'erreur (avec `processing_error` rempli et confidence=0).

---

## ADR-003 : Supabase Realtime côté client uniquement

**Date** : 2026-03-23
**Statut** : Accepté

**Contexte** : Realtime ne peut pas fonctionner côté serveur.

**Décision** : `useRealtimeInbox` est un hook client qui invalide le queryKey `['analyses']` à chaque INSERT. Pas de WebSocket SSE côté serveur.

**Conséquences** : La mise à jour Realtime nécessite que l'utilisateur soit sur la page inbox.
