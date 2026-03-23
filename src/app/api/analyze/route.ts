/**
 * POST /api/analyze — pipeline complet : validation → GPT-4o → insertion Supabase.
 * Route serveur uniquement, clé OpenAI jamais exposée au client.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { AnalyzeRequestSchema } from '@/lib/validations/api-analyze.schema'
import { analyzeEmail, buildFallbackAnalysis, computePriorityScore } from '@/lib/openai/pipeline'
import { insertAnalysis } from '@/lib/queries/analyses.queries'

export async function POST(request: Request) {
  /* Authentification */
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  /* Validation du body */
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'VALIDATION_ERROR', details: ['Invalid JSON body'] },
      { status: 400 },
    )
  }

  const parsed = AnalyzeRequestSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'VALIDATION_ERROR', details: parsed.error.issues },
      { status: 400 },
    )
  }

  const emailInput = parsed.data

  /* Pipeline IA */
  const result = await analyzeEmail(emailInput)
  const analysis = result.ok ? result.value : buildFallbackAnalysis(result.error)
  const processingError = result.ok ? null : result.error

  /* Insertion en base */
  try {
    const inserted = await insertAnalysis(supabase, {
      user_id: user.id,
      sender_name: emailInput.sender_name,
      sender_email: emailInput.sender_email,
      subject: emailInput.subject,
      body: emailInput.body,
      category: analysis.category,
      subcategory: analysis.subcategory,
      confidence: analysis.confidence,
      sentiment: analysis.sentiment,
      urgency: analysis.urgency,
      entities: analysis.entities,
      key_points: analysis.key_points as string[],
      draft_reply: analysis.draft_reply,
      priority_score: computePriorityScore(analysis),
      gmail_message_id: null,
      processing_error: processingError,
    })

    return NextResponse.json(inserted, { status: 201 })
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown database error'
    return NextResponse.json(
      { error: 'INTERNAL_ERROR', message },
      { status: 500 },
    )
  }
}
