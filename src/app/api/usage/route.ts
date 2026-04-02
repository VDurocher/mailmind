/**
 * GET /api/usage — statistiques d'usage pour le dashboard.
 * ?type=stats|category|confidence_time|urgency&days=30 (max 90)
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  getDashboardStats,
  getCategoryStats,
  getConfidenceTimeSeries,
  getUrgencyStats,
} from '@/lib/queries/usage.queries'
import { UsageQuerySchema } from '@/lib/validations/usage-query.schema'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  /* Validation Zod des query params — empêche ?days=999999 et les types invalides */
  const { searchParams } = new URL(request.url)
  const rawParams = Object.fromEntries(searchParams.entries())
  const parsed = UsageQuerySchema.safeParse(rawParams)

  if (!parsed.success) {
    return NextResponse.json(
      { error: 'VALIDATION_ERROR', details: parsed.error.issues },
      { status: 400 },
    )
  }

  const { type, days } = parsed.data

  try {
    /* user.id passé explicitement pour la défense en profondeur contre l'IDOR */
    switch (type) {
      case 'stats':
        return NextResponse.json(await getDashboardStats(supabase, user.id, days))
      case 'category':
        return NextResponse.json(await getCategoryStats(supabase, user.id))
      case 'confidence_time':
        return NextResponse.json(await getConfidenceTimeSeries(supabase, user.id, days))
      case 'urgency':
        return NextResponse.json(await getUrgencyStats(supabase, user.id))
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'INTERNAL_ERROR', message }, { status: 500 })
  }
}
