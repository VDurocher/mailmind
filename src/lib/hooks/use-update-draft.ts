'use client'

/**
 * Mutation TanStack Query pour mettre à jour le brouillon édité.
 */

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import type { EmailAnalysis } from '@/lib/types/email.types'

async function updateDraft(id: string, draftReplyEdited: string): Promise<{ updated_at: string }> {
  const response = await fetch(`/api/analyses/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ draft_reply_edited: draftReplyEdited }),
  })

  if (!response.ok) throw new Error('Failed to save draft')
  return response.json() as Promise<{ updated_at: string }>
}

export function useUpdateDraft(analysisId: string) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (draftReplyEdited: string) => updateDraft(analysisId, draftReplyEdited),
    onMutate: async (newDraft: string) => {
      /* Mise à jour optimiste */
      await queryClient.cancelQueries({ queryKey: ['analysis', analysisId] })
      const previous = queryClient.getQueryData<EmailAnalysis>(['analysis', analysisId])

      if (previous) {
        queryClient.setQueryData(['analysis', analysisId], {
          ...previous,
          draft_reply_edited: newDraft,
        })
      }

      return { previous }
    },
    onError: (_error, _newDraft, context) => {
      /* Rollback en cas d'erreur */
      if (context?.previous) {
        queryClient.setQueryData(['analysis', analysisId], context.previous)
      }
      toast.error('Failed to save draft')
    },
    onSuccess: () => {
      toast.success('Draft saved')
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ['analysis', analysisId] })
    },
  })
}
