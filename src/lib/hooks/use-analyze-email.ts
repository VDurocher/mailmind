'use client'

/**
 * Mutation TanStack Query pour analyser un email via POST /api/analyze.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { EmailAnalysis, EmailInput } from '@/lib/types/email.types'

async function analyzeEmail(input: EmailInput): Promise<EmailAnalysis> {
  const response = await fetch('/api/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })

  if (!response.ok) {
    const error = await response.json() as { message?: string }
    throw new Error(error.message ?? 'Analysis failed')
  }

  return response.json() as Promise<EmailAnalysis>
}

export function useAnalyzeEmail() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: analyzeEmail,
    onSuccess: (data) => {
      toast.success('Email analyzed successfully!')
      /* Invalide la liste pour rafraîchir l'inbox */
      void queryClient.invalidateQueries({ queryKey: ['analyses'] })
      /* Pre-populate le cache du détail */
      queryClient.setQueryData(['analysis', data.id], data)
    },
    onError: (error: Error) => {
      toast.error(`Analysis failed: ${error.message}`)
    },
  })
}
