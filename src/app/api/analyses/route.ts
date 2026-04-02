/**
 * GET /api/analyses — liste paginée des analyses de l'utilisateur connecté.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { listAnalyses } from '@/lib/queries/analyses.queries'
import { AnalysesQuerySchema } from '@/lib/validations/analyses-query.schema'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  /* Validation Zod des query params — remplace les casts `as` non sécurisés */
  const { searchParams } = new URL(request.url)
  const rawParams = Object.fromEntries(searchParams.entries())
  const parsed = AnalysesQuerySchema.safeParse(rawParams)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'VALIDATION_ERROR', details: parsed.error.issues },
      { status: 400 },
    )
  }

  const { page, category, urgency, sort, date_from, date_to } = parsed.data

  try {
    /* user.id passé explicitement pour la défense en profondeur contre l'IDOR */
    const result = await listAnalyses(supabase, user.id, {
      page,
      category,
      urgency,
      sort,
      date_from,
      date_to,
    })
    return NextResponse.json(result)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'INTERNAL_ERROR', message }, { status: 500 })
  }
}
