/**
 * Schéma Zod pour valider la réponse JSON d'OpenAI.
 * Assure la conformité du payload avant insertion en base.
 */

import { z } from 'zod'

export const OpenAIResponseSchema = z.object({
  category: z.enum([
    'complaint',
    'sales_lead',
    'technical_question',
    'billing',
    'feature_request',
    'partnership',
    'onboarding',
    'churn_risk',
  ]),
  subcategory: z.string().min(1),
  confidence: z.number().min(0).max(1),
  sentiment: z.enum(['positive', 'neutral', 'negative']),
  urgency: z.enum(['low', 'medium', 'high']),
  entities: z.object({
    products: z.array(z.string()).default([]),
    order_ids: z.array(z.string()).default([]),
    account_ids: z.array(z.string()).default([]),
    issues: z.array(z.string()).default([]),
  }),
  key_points: z.array(z.string()).min(1).max(5),
  draft_reply: z.string(),
})

export type OpenAIResponse = z.infer<typeof OpenAIResponseSchema>
