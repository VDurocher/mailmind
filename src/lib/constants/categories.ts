/**
 * Configuration visuelle des catégories et niveaux d'urgence.
 * Utilisé par CategoryBadge et UrgencyIndicator.
 */

import type { EmailCategory, UrgencyLevel, SentimentLevel } from '@/lib/types/email.types'

export const CATEGORY_CONFIG: Record<
  EmailCategory,
  { readonly label: string; readonly color: string; readonly bg: string }
> = {
  complaint: {
    label: 'Complaint',
    color: 'text-red-700',
    bg: 'bg-red-100',
  },
  sales_lead: {
    label: 'Sales Lead',
    color: 'text-green-700',
    bg: 'bg-green-100',
  },
  technical_question: {
    label: 'Technical',
    color: 'text-blue-700',
    bg: 'bg-blue-100',
  },
  billing: {
    label: 'Billing',
    color: 'text-purple-700',
    bg: 'bg-purple-100',
  },
  feature_request: {
    label: 'Feature Request',
    color: 'text-indigo-700',
    bg: 'bg-indigo-100',
  },
  partnership: {
    label: 'Partnership',
    color: 'text-teal-700',
    bg: 'bg-teal-100',
  },
  onboarding: {
    label: 'Onboarding',
    color: 'text-orange-700',
    bg: 'bg-orange-100',
  },
  churn_risk: {
    label: 'Churn Risk',
    color: 'text-rose-700',
    bg: 'bg-rose-100',
  },
}

export const URGENCY_CONFIG: Record<
  UrgencyLevel,
  { readonly label: string; readonly color: string; readonly dot: string }
> = {
  high: {
    label: 'High',
    color: 'text-red-600',
    dot: 'bg-red-500',
  },
  medium: {
    label: 'Medium',
    color: 'text-amber-600',
    dot: 'bg-amber-500',
  },
  low: {
    label: 'Low',
    color: 'text-green-600',
    dot: 'bg-green-500',
  },
}

export const SENTIMENT_CONFIG: Record<
  SentimentLevel,
  { readonly label: string; readonly color: string }
> = {
  positive: { label: 'Positive', color: 'text-green-600' },
  neutral: { label: 'Neutral', color: 'text-slate-500' },
  negative: { label: 'Negative', color: 'text-red-600' },
}

/** Palette Recharts pour les graphiques de catégories */
export const CATEGORY_CHART_COLORS: Record<EmailCategory, string> = {
  complaint: '#ef4444',
  sales_lead: '#22c55e',
  technical_question: '#3b82f6',
  billing: '#a855f7',
  feature_request: '#6366f1',
  partnership: '#14b8a6',
  onboarding: '#f97316',
  churn_risk: '#f43f5e',
}
