'use client'

/**
 * Hooks TanStack Query pour les statistiques du dashboard.
 */

import { useQuery } from '@tanstack/react-query'
import type {
  DashboardStats,
  CategoryStat,
  ConfidencePoint,
  UrgencyStat,
} from '@/lib/types/email.types'

async function fetchStats<T>(type: string, days?: number): Promise<T> {
  const params = new URLSearchParams({ type })
  if (days !== undefined) params.set('days', String(days))
  const response = await fetch(`/api/usage?${params.toString()}`)
  if (!response.ok) throw new Error('Failed to fetch stats')
  return response.json() as Promise<T>
}

export function useDashboardStats(days: number = 30) {
  return useQuery({
    queryKey: ['usage', 'stats', days],
    queryFn: () => fetchStats<DashboardStats>('stats', days),
  })
}

export function useCategoryStats() {
  return useQuery({
    queryKey: ['usage', 'category'],
    queryFn: () => fetchStats<CategoryStat[]>('category'),
  })
}

export function useConfidenceTimeSeries(days: number = 30) {
  return useQuery({
    queryKey: ['usage', 'confidence_time', days],
    queryFn: () => fetchStats<ConfidencePoint[]>('confidence_time', days),
  })
}

export function useUrgencyStats() {
  return useQuery({
    queryKey: ['usage', 'urgency'],
    queryFn: () => fetchStats<UrgencyStat[]>('urgency'),
  })
}
