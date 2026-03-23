'use client'

/**
 * Hook TanStack Query pour la liste des analyses (inbox).
 */

import { useQuery } from '@tanstack/react-query'
import type { PaginatedAnalyses, EmailCategory, UrgencyLevel } from '@/lib/types/email.types'

export interface AnalysesQueryParams {
  readonly category?: EmailCategory
  readonly urgency?: UrgencyLevel
  readonly sort?: string
  readonly page?: number
  readonly date_from?: string
  readonly date_to?: string
}

async function fetchAnalyses(params: AnalysesQueryParams): Promise<PaginatedAnalyses> {
  const searchParams = new URLSearchParams()
  if (params.category) searchParams.set('category', params.category)
  if (params.urgency) searchParams.set('urgency', params.urgency)
  if (params.sort) searchParams.set('sort', params.sort)
  if (params.page) searchParams.set('page', String(params.page))
  if (params.date_from) searchParams.set('date_from', params.date_from)
  if (params.date_to) searchParams.set('date_to', params.date_to)

  const response = await fetch(`/api/analyses?${searchParams.toString()}`)
  if (!response.ok) throw new Error('Failed to fetch analyses')
  return response.json() as Promise<PaginatedAnalyses>
}

export function useAnalyses(params: AnalysesQueryParams = {}) {
  return useQuery({
    queryKey: ['analyses', params],
    queryFn: () => fetchAnalyses(params),
  })
}
