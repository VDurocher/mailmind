'use client'

/**
 * Hook Supabase Realtime — met à jour l'inbox sans refresh page.
 * S'abonne aux INSERT sur email_analyses pour l'utilisateur courant.
 */

import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useSupabase } from '@/providers/supabase-provider'

export function useRealtimeInbox() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()

  useEffect(() => {
    const channel = supabase
      .channel('inbox-realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'email_analyses',
        },
        () => {
          /* Invalide la liste pour déclencher un rafraîchissement */
          void queryClient.invalidateQueries({ queryKey: ['analyses'] })
        },
      )
      .subscribe()

    return () => {
      void supabase.removeChannel(channel)
    }
  }, [supabase, queryClient])
}
