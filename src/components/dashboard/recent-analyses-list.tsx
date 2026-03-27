'use client'

/**
 * Liste des 5 analyses les plus récentes pour le dashboard.
 * Affiche un badge d'erreur si l'analyse OpenAI a échoué.
 */

import Link from 'next/link'
import { AlertCircle } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoryBadge } from '@/components/shared/category-badge'
import { UrgencyIndicator } from '@/components/shared/urgency-indicator'
import { useAnalyses } from '@/lib/hooks/use-analyses'
import { EmailListItemSkeleton } from '@/components/shared/loading-skeleton'
import { ROUTES } from '@/lib/constants/routes'

export function RecentAnalysesList() {
  const { data, isLoading } = useAnalyses({ page: 1 })

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold">Recent Analyses</CardTitle>
          <Link href={ROUTES.inbox} className="text-xs text-blue-600 hover:underline">
            View all
          </Link>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <EmailListItemSkeleton key={i} />)
        ) : !data || data.data.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No analyses yet</p>
        ) : (
          data.data.slice(0, 5).map((analysis) => (
            <Link
              key={analysis.id}
              href={ROUTES.inboxDetail(analysis.id)}
              className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 border-b last:border-b-0 transition-colors"
            >
              <UrgencyIndicator urgency={analysis.urgency} showLabel={false} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 truncate">{analysis.subject}</p>
                <p className="text-xs text-slate-400">{analysis.sender_name}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {analysis.processing_error !== null ? (
                  /* Badge d'erreur — analyse OpenAI échouée */
                  <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-50 text-red-600">
                    <AlertCircle className="h-3 w-3" />
                    Failed
                  </span>
                ) : (
                  <CategoryBadge category={analysis.category} />
                )}
                <span className="text-xs text-slate-400">
                  {formatDistanceToNow(new Date(analysis.created_at), { addSuffix: true })}
                </span>
              </div>
            </Link>
          ))
        )}
      </CardContent>
    </Card>
  )
}
