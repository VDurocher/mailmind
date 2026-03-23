/**
 * Types centraux pour l'analyse d'emails.
 * Port TypeScript des modèles Python (src/models.py) + enrichissement v2.
 */

export type EmailCategory =
  | 'complaint'
  | 'sales_lead'
  | 'technical_question'
  | 'billing'
  | 'feature_request'
  | 'partnership'
  | 'onboarding'
  | 'churn_risk'

export type SentimentLevel = 'positive' | 'neutral' | 'negative'

export type UrgencyLevel = 'low' | 'medium' | 'high'

export interface ExtractedEntities {
  readonly products: readonly string[]
  readonly order_ids: readonly string[]
  readonly account_ids: readonly string[]
  readonly issues: readonly string[]
}

export interface EmailInput {
  readonly sender_name: string
  readonly sender_email: string
  readonly subject: string
  readonly body: string
}

/** Analyse complète d'un email, telle que stockée en base */
export interface EmailAnalysis {
  readonly id: string
  readonly user_id: string
  readonly sender_name: string
  readonly sender_email: string
  readonly subject: string
  readonly body: string
  readonly category: EmailCategory
  readonly subcategory: string
  readonly confidence: number
  readonly sentiment: SentimentLevel
  readonly urgency: UrgencyLevel
  readonly priority_score: number
  readonly entities: ExtractedEntities
  readonly key_points: readonly string[]
  readonly draft_reply: string
  readonly draft_reply_edited: string | null
  readonly processing_error: string | null
  readonly gmail_message_id: string | null
  readonly created_at: string
  readonly updated_at: string
}

/** Réponse paginée pour la liste des analyses */
export interface PaginatedAnalyses {
  readonly data: readonly EmailAnalysis[]
  readonly total: number
  readonly page: number
}

/** Statistiques pour le dashboard */
export interface DashboardStats {
  readonly total: number
  readonly complaints: number
  readonly leads: number
  readonly technical: number
  readonly high_urgency: number
  readonly churn_risks: number
  readonly avg_priority: number
}

export interface CategoryStat {
  readonly category: EmailCategory
  readonly count: number
}

export interface ConfidencePoint {
  readonly date: string
  readonly avg_confidence: number
}

export interface UrgencyStat {
  readonly urgency: UrgencyLevel
  readonly count: number
}
