/**
 * Ligne d'une analyse dans la liste inbox.
 * Affiche un badge d'erreur si l'analyse OpenAI a échoué.
 */

import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { CategoryBadge } from '@/components/shared/category-badge'
import { UrgencyIndicator } from '@/components/shared/urgency-indicator'
import { ConfidenceBar } from '@/components/shared/confidence-bar'
import { ROUTES } from '@/lib/constants/routes'
import type { EmailAnalysis } from '@/lib/types/email.types'

interface EmailListItemProps {
  readonly analysis: EmailAnalysis
}

export function EmailListItem({ analysis }: EmailListItemProps) {
  const timeAgo = formatDistanceToNow(new Date(analysis.created_at), { addSuffix: true })
  const hasError = analysis.processing_error !== null

  return (
    <Link
      href={ROUTES.inboxDetail(analysis.id)}
      className="flex items-center gap-4 px-4 py-3 border-b hover:bg-slate-50 transition-colors group"
    >
      {/* Indicateur d'urgence */}
      <UrgencyIndicator urgency={analysis.urgency} showLabel={false} className="flex-shrink-0" />

      {/* Contenu principal */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5 min-w-0">
          <span className="text-sm font-medium text-slate-900 truncate min-w-0">
            {analysis.sender_name}
          </span>
          {hasError ? (
            /* Badge d'erreur d'analyse — shrink-0 pour éviter le débordement sur mobile */
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-50 text-red-600">
              <AlertCircle className="h-3 w-3" />
              Failed
            </span>
          ) : (
            <CategoryBadge category={analysis.category} />
          )}
        </div>
        <p className="text-sm text-slate-600 truncate">{analysis.subject}</p>
        {/* Barre de confiance masquée en cas d'erreur — 0% serait trompeur */}
        {!hasError && (
          <div className="mt-1 w-32">
            <ConfidenceBar confidence={analysis.confidence} />
          </div>
        )}
      </div>

      {/* Date */}
      <span className="text-xs text-slate-400 flex-shrink-0">{timeAgo}</span>
    </Link>
  )
}
