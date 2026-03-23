'use client'

/**
 * Provider Supabase — expose le client browser via contexte.
 */

import { createClient } from '@/lib/supabase/client'
import { createContext, useContext, useMemo, type ReactNode } from 'react'
import type { SupabaseClient } from '@supabase/supabase-js'

interface SupabaseContextValue {
  readonly supabase: SupabaseClient
}

const SupabaseContext = createContext<SupabaseContextValue | null>(null)

interface SupabaseProviderProps {
  readonly children: ReactNode
}

export function SupabaseProvider({ children }: SupabaseProviderProps) {
  const supabase = useMemo(() => createClient(), [])

  return (
    <SupabaseContext.Provider value={{ supabase }}>
      {children}
    </SupabaseContext.Provider>
  )
}

export function useSupabase(): SupabaseClient {
  const context = useContext(SupabaseContext)
  if (context === null) {
    throw new Error('useSupabase doit être utilisé dans un SupabaseProvider')
  }
  return context.supabase
}
