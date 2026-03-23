/**
 * Requêtes CRUD Supabase pour la table email_analyses.
 * Toutes les requêtes utilisent le client serveur avec les cookies de session.
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type { EmailAnalysis, PaginatedAnalyses, EmailCategory, UrgencyLevel } from '@/lib/types/email.types'

const PAGE_SIZE = 20

export interface AnalysesFilter {
  readonly category?: EmailCategory
  readonly urgency?: UrgencyLevel
  readonly sort?: 'created_at_desc' | 'created_at_asc' | 'urgency' | 'confidence_desc'
  readonly page?: number
  readonly date_from?: string
  readonly date_to?: string
}

/** Ajoute les champs optionnels absents avant migration de schéma */
function withDefaults(row: Record<string, unknown>): EmailAnalysis {
  return {
    priority_score: 0,
    gmail_message_id: null,
    ...row,
  } as EmailAnalysis
}

/** Récupère la liste paginée des analyses de l'utilisateur courant */
export async function listAnalyses(
  supabase: SupabaseClient,
  filter: AnalysesFilter = {},
): Promise<PaginatedAnalyses> {
  const page = filter.page ?? 1
  const offset = (page - 1) * PAGE_SIZE

  let query = supabase
    .from('email_analyses')
    .select('*', { count: 'exact' })

  if (filter.category) {
    query = query.eq('category', filter.category)
  }
  if (filter.urgency) {
    query = query.eq('urgency', filter.urgency)
  }
  if (filter.date_from) {
    query = query.gte('created_at', filter.date_from)
  }
  if (filter.date_to) {
    query = query.lte('created_at', filter.date_to)
  }

  /* Tri */
  switch (filter.sort) {
    case 'created_at_asc':
      query = query.order('created_at', { ascending: true })
      break
    case 'urgency':
      query = query.order('urgency', { ascending: true })
      break
    case 'confidence_desc':
      query = query.order('confidence', { ascending: false })
      break
    default:
      query = query.order('created_at', { ascending: false })
  }

  const { data, error, count } = await query.range(offset, offset + PAGE_SIZE - 1)

  if (error) throw error

  return {
    data: (data ?? []).map((row) => withDefaults(row as Record<string, unknown>)),
    total: count ?? 0,
    page,
  }
}

/** Récupère une analyse complète par ID */
export async function getAnalysisById(
  supabase: SupabaseClient,
  id: string,
): Promise<EmailAnalysis | null> {
  const { data, error } = await supabase
    .from('email_analyses')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    if (error.code === 'PGRST116') return null
    throw error
  }

  return withDefaults(data as Record<string, unknown>)
}

/** Insère une nouvelle analyse en base (avec fallback si colonnes manquantes avant migration) */
export async function insertAnalysis(
  supabase: SupabaseClient,
  analysis: Omit<EmailAnalysis, 'id' | 'created_at' | 'updated_at' | 'draft_reply_edited'>,
): Promise<EmailAnalysis> {
  const { data, error } = await supabase
    .from('email_analyses')
    .insert(analysis)
    .select()
    .single()

  /* Fallback avant migration : tenter sans priority_score et gmail_message_id */
  if (error && (error.message.includes('priority_score') || error.message.includes('gmail_message_id'))) {
    const { priority_score: _ps, gmail_message_id: _gm, ...analysisWithoutNew } = analysis
    const { data: fallbackData, error: fallbackError } = await supabase
      .from('email_analyses')
      .insert(analysisWithoutNew)
      .select()
      .single()
    if (fallbackError) throw fallbackError
    return withDefaults(fallbackData as Record<string, unknown>)
  }

  if (error) throw error
  return withDefaults(data as Record<string, unknown>)
}

/** Met à jour le brouillon édité par l'utilisateur */
export async function updateDraftReply(
  supabase: SupabaseClient,
  id: string,
  draftReplyEdited: string,
): Promise<{ updated_at: string }> {
  const { data, error } = await supabase
    .from('email_analyses')
    .update({ draft_reply_edited: draftReplyEdited })
    .eq('id', id)
    .select('updated_at')
    .single()

  if (error) throw error
  return data as { updated_at: string }
}
