/**
 * Schéma Zod pour les query params de GET /api/usage.
 * Empêche ?days=999999 de charger toutes les lignes de la table.
 */

import { z } from 'zod'

/** Maximum de jours autorisés pour éviter un scan complet de la table */
const MAX_DAYS = 90

const USAGE_TYPES = ['stats', 'category', 'confidence_time', 'urgency'] as const

export const UsageQuerySchema = z.object({
  type: z.enum(USAGE_TYPES).optional().default('stats'),
  days: z
    .string()
    .optional()
    .transform((value) => (value !== undefined ? Number(value) : 30))
    .pipe(
      z
        .number()
        .int('days doit être un entier')
        .min(1, 'days doit être au moins 1')
        .max(MAX_DAYS, `days ne peut pas dépasser ${MAX_DAYS}`),
    ),
})

export type UsageQuery = z.infer<typeof UsageQuerySchema>
