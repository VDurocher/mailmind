/**
 * Conversion du schema Zod en JSON Schema OpenAI Structured Outputs.
 * Mis en cache au niveau module — ne pas recalculer à chaque appel.
 */

import { zodToJsonSchema } from 'zod-to-json-schema'
import { OpenAIResponseSchema } from '@/lib/validations/email-analysis.schema'

/** JSON Schema compatible OpenAI Structured Outputs — calculé une seule fois */
export const OPENAI_JSON_SCHEMA = zodToJsonSchema(OpenAIResponseSchema, {
  name: 'email_analysis',
  $refStrategy: 'none',
}) as Record<string, unknown>
