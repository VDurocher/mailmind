/**
 * Client Supabase côté navigateur (composants client).
 * Utiliser uniquement dans les composants avec 'use client'.
 */

import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env['NEXT_PUBLIC_SUPABASE_URL']!,
    process.env['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY']!,
  )
}
