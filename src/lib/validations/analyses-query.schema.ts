/**
 * Schémas Zod pour les query params de GET /api/analyses.
 * Remplace les casts `as` non sécurisés par une validation explicite.
 */

import { z } from 'zod'

/** Valeurs autorisées pour le filtre de catégorie */
const EMAIL_CATEGORIES = [
  'complaint',
  'sales_lead',
  'technical_question',
  'billing',
  'feature_request',
  'partnership',
  'onboarding',
  'churn_risk',
] as const

/** Valeurs autorisées pour le filtre d'urgence */
const URGENCY_LEVELS = ['low', 'medium', 'high'] as const

/** Valeurs autorisées pour le tri */
const SORT_VALUES = ['created_at_desc', 'created_at_asc', 'urgency', 'confidence_desc'] as const

export const AnalysesQuerySchema = z.object({
  page: z
    .string()
    .optional()
    .transform((value) => (value !== undefined ? Number(value) : 1))
    .pipe(z.number().int().min(1).max(1000)),
  category: z.enum(EMAIL_CATEGORIES).optional(),
  urgency: z.enum(URGENCY_LEVELS).optional(),
  sort: z.enum(SORT_VALUES).optional(),
  date_from: z
    .string()
    .optional()
    .refine(
      (value) => value === undefined || !Number.isNaN(Date.parse(value)),
      { message: 'date_from doit être une date ISO 8601 valide' },
    ),
  date_to: z
    .string()
    .optional()
    .refine(
      (value) => value === undefined || !Number.isNaN(Date.parse(value)),
      { message: 'date_to doit être une date ISO 8601 valide' },
    ),
})

export type AnalysesQuery = z.infer<typeof AnalysesQuerySchema>
