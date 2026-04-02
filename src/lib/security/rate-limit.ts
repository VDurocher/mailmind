/**
 * Rate limiter en mémoire — défense contre le brute-force et les abus d'API.
 * Utilise une fenêtre glissante par identifiant (user_id ou IP).
 * Adapté pour Next.js Edge/Node.js sans dépendance externe.
 */

interface RateLimitEntry {
  readonly timestamps: number[]
}

/** Stockage en mémoire des fenêtres de requêtes par identifiant */
const store = new Map<string, RateLimitEntry>()

/** Nettoie les entrées expirées pour éviter les fuites mémoire */
function pruneExpired(timestamps: number[], windowMs: number, now: number): number[] {
  return timestamps.filter((ts) => now - ts < windowMs)
}

export interface RateLimitConfig {
  /** Nombre maximum de requêtes autorisées dans la fenêtre */
  readonly maxRequests: number
  /** Durée de la fenêtre en millisecondes */
  readonly windowMs: number
}

export interface RateLimitResult {
  readonly allowed: boolean
  /** Nombre de requêtes restantes dans la fenêtre */
  readonly remaining: number
  /** Timestamp de réinitialisation de la fenêtre (ms) */
  readonly resetAt: number
}

/**
 * Vérifie et enregistre une requête pour un identifiant donné.
 * @param identifier - user_id ou adresse IP
 * @param config - limites à appliquer
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig,
): RateLimitResult {
  const now = Date.now()
  const { maxRequests, windowMs } = config

  const entry = store.get(identifier)
  const previous = entry?.timestamps ?? []

  /* Purge des timestamps hors fenêtre */
  const recent = pruneExpired(previous, windowMs, now)

  if (recent.length >= maxRequests) {
    /* Calcul du moment où la fenêtre se réinitialise */
    const oldestInWindow = recent[0] ?? now
    return {
      allowed: false,
      remaining: 0,
      resetAt: oldestInWindow + windowMs,
    }
  }

  /* Enregistrement de la nouvelle requête */
  const updated = [...recent, now]
  store.set(identifier, { timestamps: updated })

  return {
    allowed: true,
    remaining: maxRequests - updated.length,
    resetAt: now + windowMs,
  }
}

/** Limite pour l'API d'analyse IA : 10 req/min par utilisateur */
export const ANALYZE_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 10,
  windowMs: 60 * 1000,
}

/** Limite pour le login : 5 tentatives par 15 minutes par IP */
export const LOGIN_RATE_LIMIT: RateLimitConfig = {
  maxRequests: 5,
  windowMs: 15 * 60 * 1000,
}
