'use client'

/**
 * Page détail d'une analyse — grille 3 colonnes.
 */

import { use } from 'react'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useAnalysis } from '@/lib/hooks/use-analysis'
import { OriginalEmailPanel } from '@/components/detail/original-email-panel'
import { AnalysisPanel } from '@/components/detail/analysis-panel'
import { DraftReplyPanel } from '@/components/detail/draft-reply-panel'
import { Skeleton } from '@/components/shared/loading-skeleton'
import { ROUTES } from '@/lib/constants/routes'

interface PageProps {
  readonly params: Promise<{ readonly id: string }>
}

export default function InboxDetailPage({ params }: PageProps) {
  const { id } = use(params)
  const { data: analysis, isLoading, isError } = useAnalysis(id)

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-6 w-32" />
        <div className="grid grid-cols-3 gap-4 h-[calc(100vh-160px)]">
          <Skeleton className="h-full" />
          <Skeleton className="h-full" />
          <Skeleton className="h-full" />
        </div>
      </div>
    )
  }

  if (isError || !analysis) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-red-500">Analysis not found.</p>
        <Link href={ROUTES.inbox} className="text-sm text-blue-600 hover:underline mt-2 block">
          Back to inbox
        </Link>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4 h-[calc(100vh-112px)]">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        <Link
          href={ROUTES.inbox}
          className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900"
        >
          <ChevronLeft className="h-3.5 w-3.5" />
          Inbox
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-sm text-slate-700 font-medium truncate max-w-xs">
          {analysis.subject}
        </span>
      </div>

      {/* Grille 3 colonnes */}
      <div className="grid grid-cols-3 gap-4 flex-1 min-h-0">
        <div className="overflow-auto">
          <OriginalEmailPanel analysis={analysis} />
        </div>
        <div className="overflow-auto">
          <AnalysisPanel analysis={analysis} />
        </div>
        <div className="overflow-hidden flex flex-col">
          <DraftReplyPanel analysis={analysis} />
        </div>
      </div>
    </div>
  )
}
