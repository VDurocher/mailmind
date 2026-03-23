/**
 * Skeletons de chargement — utilisés à la place des spinners.
 */

import { cn } from '@/lib/utils'

interface SkeletonProps {
  readonly className?: string
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-slate-100', className)}
    />
  )
}

/** Skeleton pour une ligne de la liste emails */
export function EmailListItemSkeleton() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b">
      <Skeleton className="h-2 w-2 rounded-full" />
      <div className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
        <Skeleton className="h-3 w-48" />
      </div>
      <Skeleton className="h-3 w-14" />
    </div>
  )
}

/** Skeleton pour les cartes de stats */
export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border bg-white p-6 space-y-3">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-8 w-16" />
      <Skeleton className="h-3 w-32" />
    </div>
  )
}

/** Skeleton pour les graphiques */
export function ChartSkeleton({ height = 'h-64' }: { readonly height?: string }) {
  return (
    <div className={cn('rounded-xl border bg-white p-6', height)}>
      <Skeleton className="h-full w-full" />
    </div>
  )
}
