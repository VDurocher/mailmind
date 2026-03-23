/**
 * Pipeline d'analyse email via GPT-4o-mini (structured outputs).
 * Port TypeScript de src/pipeline.py.
 * Retourne un Result<T> pour forcer la gestion des erreurs.
 */

import type { EmailInput, ExtractedEntities } from '@/lib/types/email.types'
import type { Result } from '@/lib/types/result.types'
import { ok, err } from '@/lib/types/result.types'
import { getOpenAIClient } from './client'
import { SYSTEM_PROMPT, buildUserMessage } from './prompt'
import { OpenAIResponseSchema, type OpenAIResponse } from '@/lib/validations/email-analysis.schema'
import { OPENAI_JSON_SCHEMA } from './schema'

const OPENAI_MODEL = 'gpt-4o-mini'
const MAX_TOKENS = 1024

/** Calcule un score de priorité 0-10 à partir de l'analyse */
export function computePriorityScore(analysis: OpenAIResponse): number {
  const urgencyScore: Record<string, number> = { high: 3, medium: 2, low: 1 }
  const sentimentScore: Record<string, number> = { negative: 2, neutral: 1, positive: 0 }
  const categoryBonus: Record<string, number> = {
    churn_risk: 2,
    complaint: 2,
    billing: 1.5,
    sales_lead: 1,
    technical_question: 1,
    feature_request: 0.5,
    partnership: 0.5,
    onboarding: 0.5,
  }

  /* Max brut : 3 + 2 + 2 = 7 */
  const raw =
    (urgencyScore[analysis.urgency] ?? 1) +
    (sentimentScore[analysis.sentiment] ?? 0) +
    (categoryBonus[analysis.category] ?? 0.5)

  /* Pondération par la confiance puis normalisation sur 10 */
  return Math.round((raw / 7) * analysis.confidence * 10 * 10) / 10
}

/** Analyse un email via GPT-4o-mini (structured outputs) et retourne la réponse validée */
export async function analyzeEmail(email: EmailInput): Promise<Result<OpenAIResponse>> {
  const client = getOpenAIClient()

  try {
    const response = await client.chat.completions.create({
      model: OPENAI_MODEL,
      max_tokens: MAX_TOKENS,
      response_format: {
        type: 'json_schema',
        json_schema: {
          name: 'email_analysis',
          strict: true,
          schema: OPENAI_JSON_SCHEMA,
        },
      },
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: buildUserMessage(email) },
      ],
    })

    const rawContent = response.choices[0]?.message.content ?? ''

    let parsed: unknown
    try {
      parsed = JSON.parse(rawContent)
    } catch {
      return err(`JSON parse error: ${rawContent.slice(0, 100)}`)
    }

    const validated = OpenAIResponseSchema.safeParse(parsed)
    if (!validated.success) {
      return err(`Schema validation error: ${validated.error.message}`)
    }

    return ok(validated.data)
  } catch (error: unknown) {
    if (error instanceof Error) {
      return err(`OpenAI API error: ${error.message}`)
    }
    return err('Unknown error during analysis')
  }
}

/** Valeurs de fallback pour les analyses en erreur */
export function buildFallbackAnalysis(errorMessage: string): OpenAIResponse {
  return {
    category: 'technical_question',
    subcategory: 'parse_error',
    confidence: 0,
    sentiment: 'neutral',
    urgency: 'low',
    entities: {
      products: [],
      order_ids: [],
      account_ids: [],
      issues: [],
    } satisfies ExtractedEntities,
    key_points: ['Analyse échouée — révision manuelle requise'],
    draft_reply: '',
  }
}
