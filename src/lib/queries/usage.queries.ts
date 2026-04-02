/**
 * Requêtes d'agrégation pour les statistiques du dashboard.
 * Évite les N+1 : une requête par type de stat.
 */

import type { SupabaseClient } from '@supabase/supabase-js'
import type {
  DashboardStats,
  CategoryStat,
  ConfidencePoint,
  UrgencyStat,
} from '@/lib/types/email.types'

/** Statistiques globales : total, par catégorie, urgences hautes */
export async function getDashboardStats(
  supabase: SupabaseClient,
  userId: string,
  days: number = 30,
): Promise<DashboardStats> {
  const since = new Date()
  since.setDate(since.getDate() - days)

  /* Filtre user_id explicite — défense en profondeur en plus du RLS */
  const { data, error } = await supabase
    .from('email_analyses')
    .select('category, urgency, priority_score')
    .eq('user_id', userId)
    .gte('created_at', since.toISOString())

  /* Fallback si la colonne priority_score n'existe pas encore (avant migration) */
  if (error) {
    if (error.message.includes('priority_score')) {
      const { data: fallbackData, error: fallbackError } = await supabase
        .from('email_analyses')
        .select('category, urgency')
        .eq('user_id', userId)
        .gte('created_at', since.toISOString())
      if (fallbackError) throw fallbackError
      const fallbackRows = fallbackData ?? []
      return {
        total: fallbackRows.length,
        complaints: fallbackRows.filter((r) => r.category === 'complaint').length,
        leads: fallbackRows.filter((r) => r.category === 'sales_lead').length,
        technical: fallbackRows.filter((r) => r.category === 'technical_question').length,
        high_urgency: fallbackRows.filter((r) => r.urgency === 'high').length,
        churn_risks: fallbackRows.filter((r) => r.category === 'churn_risk').length,
        avg_priority: 0,
      }
    }
    throw error
  }

  const rows = data ?? []
  const avgPriority =
    rows.length > 0
      ? rows.reduce((sum, r) => sum + ((r.priority_score as number | null) ?? 0), 0) / rows.length
      : 0

  return {
    total: rows.length,
    complaints: rows.filter((r) => r.category === 'complaint').length,
    leads: rows.filter((r) => r.category === 'sales_lead').length,
    technical: rows.filter((r) => r.category === 'technical_question').length,
    high_urgency: rows.filter((r) => r.urgency === 'high').length,
    churn_risks: rows.filter((r) => r.category === 'churn_risk').length,
    avg_priority: Math.round(avgPriority * 10) / 10,
  }
}

/** Nombre maximum de lignes retournées pour les stats agrégées */
const STATS_ROW_LIMIT = 10000

/** Distribution par catégorie pour le pie chart */
export async function getCategoryStats(
  supabase: SupabaseClient,
  userId: string,
): Promise<CategoryStat[]> {
  /* Filtre user_id + limite pour éviter un scan complet de la table */
  const { data, error } = await supabase
    .from('email_analyses')
    .select('category')
    .eq('user_id', userId)
    .limit(STATS_ROW_LIMIT)

  if (error) throw error

  const counts: Record<string, number> = {}
  for (const row of data ?? []) {
    counts[row.category] = (counts[row.category] ?? 0) + 1
  }

  return Object.entries(counts).map(([category, count]) => ({
    category: category as CategoryStat['category'],
    count,
  }))
}

/** Évolution de la confiance moyenne sur les N derniers jours */
export async function getConfidenceTimeSeries(
  supabase: SupabaseClient,
  userId: string,
  days: number = 30,
): Promise<ConfidencePoint[]> {
  const since = new Date()
  since.setDate(since.getDate() - days)

  /* Filtre user_id explicite — défense en profondeur en plus du RLS */
  const { data, error } = await supabase
    .from('email_analyses')
    .select('confidence, created_at')
    .eq('user_id', userId)
    .gte('created_at', since.toISOString())
    .order('created_at', { ascending: true })
    .limit(STATS_ROW_LIMIT)

  if (error) throw error

  /* Grouper par jour */
  const byDay: Record<string, number[]> = {}
  for (const row of data ?? []) {
    const day = row.created_at.slice(0, 10)
    if (!byDay[day]) byDay[day] = []
    byDay[day]!.push(row.confidence)
  }

  return Object.entries(byDay).map(([date, values]) => ({
    date,
    avg_confidence: values.reduce((sum, v) => sum + v, 0) / values.length,
  }))
}

/** Distribution par niveau d'urgence pour le bar chart */
export async function getUrgencyStats(
  supabase: SupabaseClient,
  userId: string,
): Promise<UrgencyStat[]> {
  /* Filtre user_id + limite pour éviter un scan complet de la table */
  const { data, error } = await supabase
    .from('email_analyses')
    .select('urgency')
    .eq('user_id', userId)
    .limit(STATS_ROW_LIMIT)

  if (error) throw error

  const counts: Record<string, number> = {}
  for (const row of data ?? []) {
    counts[row.urgency] = (counts[row.urgency] ?? 0) + 1
  }

  return Object.entries(counts).map(([urgency, count]) => ({
    urgency: urgency as UrgencyStat['urgency'],
    count,
  }))
}
