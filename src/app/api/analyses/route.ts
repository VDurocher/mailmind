/**
 * GET /api/analyses — liste paginée des analyses de l'utilisateur connecté.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { listAnalyses, type AnalysesFilter } from '@/lib/queries/analyses.queries'
import type { EmailCategory, UrgencyLevel } from '@/lib/types/email.types'

/** Construit le filtre via affectation impérative — respecte exactOptionalPropertyTypes */
function buildFilter(searchParams: URLSearchParams): AnalysesFilter {
  /* Type mutable intermédiaire — sans readonly pour permettre l'affectation conditionnelle */
  const filter: {
    page: number
    category?: EmailCategory
    urgency?: UrgencyLevel
    sort?: AnalysesFilter['sort']
    date_from?: string
    date_to?: string
  } = { page: searchParams.has('page') ? Number(searchParams.get('page')) : 1 }

  const category = searchParams.get('category')
  if (category !== null) filter.category = category as EmailCategory

  const urgency = searchParams.get('urgency')
  if (urgency !== null) filter.urgency = urgency as UrgencyLevel

  const sort = searchParams.get('sort')
  if (sort !== null) filter.sort = sort as AnalysesFilter['sort']

  const dateFrom = searchParams.get('date_from')
  if (dateFrom !== null) filter.date_from = dateFrom

  const dateTo = searchParams.get('date_to')
  if (dateTo !== null) filter.date_to = dateTo

  return filter
}

export async function GET(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const filter = buildFilter(searchParams)

  try {
    const result = await listAnalyses(supabase, filter)
    return NextResponse.json(result)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'INTERNAL_ERROR', message }, { status: 500 })
  }
}
