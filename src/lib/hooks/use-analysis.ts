'use client'

/**
 * Hook TanStack Query pour le détail d'une analyse.
 */

import { useQuery } from '@tanstack/react-query'
import type { EmailAnalysis } from '@/lib/types/email.types'

async function fetchAnalysis(id: string): Promise<EmailAnalysis> {
  const response = await fetch(`/api/analyses/${id}`)
  if (!response.ok) throw new Error('Analysis not found')
  return response.json() as Promise<EmailAnalysis>
}

export function useAnalysis(id: string) {
  return useQuery({
    queryKey: ['analysis', id],
    queryFn: () => fetchAnalysis(id),
    enabled: Boolean(id),
  })
}
