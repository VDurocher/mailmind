/**
 * Conversion du schema Zod en JSON Schema OpenAI Structured Outputs.
 * Mis en cache au niveau module — ne pas recalculer à chaque appel.
 *
 * IMPORTANT : OpenAI Structured Outputs exige que le schéma racine soit
 * directement un objet { type: "object", ... } sans $ref ni $schema.
 * - Ne pas passer `name` à zodToJsonSchema (génère un $ref wrapper invalide)
 * - Utiliser target: 'openApi3' pour éviter les keywords non supportés
 * - Supprimer $schema car OpenAI le rejette aussi
 */

import { zodToJsonSchema } from 'zod-to-json-schema'
import { OpenAIResponseSchema } from '@/lib/validations/email-analysis.schema'

/** JSON Schema compatible OpenAI Structured Outputs — calculé une seule fois */
function buildOpenAISchema(): Record<string, unknown> {
  const raw = zodToJsonSchema(OpenAIResponseSchema, {
    $refStrategy: 'none',
    target: 'openApi3',
  }) as Record<string, unknown>

  /* Supprimer $schema — non supporté par OpenAI Structured Outputs */
  const { $schema: _ignored, ...schema } = raw
  return schema
}

export const OPENAI_JSON_SCHEMA = buildOpenAISchema()
