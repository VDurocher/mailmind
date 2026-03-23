/**
 * GET /api/usage — statistiques d'usage pour le dashboard.
 * ?type=stats|category|confidence_time|urgency&days=30
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import {
  getDashboardStats,
  getCategoryStats,
  getConfidenceTimeSeries,
  getUrgencyStats,
} from '@/lib/queries/usage.queries'

export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') ?? 'stats'
  const days = Number(searchParams.get('days') ?? 30)

  try {
    switch (type) {
      case 'stats':
        return NextResponse.json(await getDashboardStats(supabase, days))
      case 'category':
        return NextResponse.json(await getCategoryStats(supabase))
      case 'confidence_time':
        return NextResponse.json(await getConfidenceTimeSeries(supabase, days))
      case 'urgency':
        return NextResponse.json(await getUrgencyStats(supabase))
      default:
        return NextResponse.json(
          { error: 'VALIDATION_ERROR', details: [`Unknown type: ${type}`] },
          { status: 400 },
        )
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'INTERNAL_ERROR', message }, { status: 500 })
  }
}
