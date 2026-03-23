'use client'

/**
 * Liste des analyses avec pagination et mise à jour Realtime.
 */

import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useAnalyses, type AnalysesQueryParams } from '@/lib/hooks/use-analyses'
import { useRealtimeInbox } from '@/lib/hooks/use-realtime-inbox'
import { EmailListItem } from './email-list-item'
import { EmptyInbox } from './empty-inbox'
import { EmailListItemSkeleton } from '@/components/shared/loading-skeleton'
import { Button } from '@/components/ui/button'
import type { EmailCategory, UrgencyLevel } from '@/lib/types/email.types'

const PAGE_SIZE = 20

interface EmailListProps {
  readonly onAnalyze: () => void
}

export function EmailList({ onAnalyze }: EmailListProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  /* Active Realtime */
  useRealtimeInbox()

  /* Construction des paramètres — affectation impérative pour exactOptionalPropertyTypes */
  const currentPage = Number(searchParams.get('page') ?? 1)
  const params: {
    page: number
    category?: EmailCategory
    urgency?: UrgencyLevel
    sort?: string
  } = { page: currentPage }
  const categoryParam = searchParams.get('category')
  if (categoryParam !== null) params.category = categoryParam as EmailCategory
  const urgencyParam = searchParams.get('urgency')
  if (urgencyParam !== null) params.urgency = urgencyParam as UrgencyLevel
  const sortParam = searchParams.get('sort')
  if (sortParam !== null) params.sort = sortParam

  const { data, isLoading, isError } = useAnalyses(params)

  function navigatePage(newPage: number) {
    const updated = new URLSearchParams(searchParams.toString())
    updated.set('page', String(newPage))
    router.push(`${pathname}?${updated.toString()}`)
  }

  if (isLoading) {
    return (
      <div>
        {Array.from({ length: 8 }).map((_, index) => (
          <EmailListItemSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="p-8 text-center text-sm text-red-500">
        Failed to load emails. Please refresh.
      </div>
    )
  }

  if (!data || data.data.length === 0) {
    return <EmptyInbox onAnalyze={onAnalyze} />
  }

  const totalPages = Math.ceil(data.total / PAGE_SIZE)

  return (
    <div>
      {data.data.map((analysis) => (
        <EmailListItem key={analysis.id} analysis={analysis} />
      ))}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t">
          <span className="text-xs text-slate-500">
            {data.total} total · page {currentPage} of {totalPages}
          </span>
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigatePage(currentPage - 1)}
              disabled={currentPage <= 1}
              className="h-7 w-7"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigatePage(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="h-7 w-7"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
