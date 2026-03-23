/**
 * Type Result<T> pour les opérations qui peuvent échouer.
 * Évite les try/catch imbriqués et force la gestion des erreurs.
 */

export type Result<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: string }

export function ok<T>(value: T): Result<T> {
  return { ok: true, value }
}

export function err(error: string): Result<never> {
  return { ok: false, error }
}
