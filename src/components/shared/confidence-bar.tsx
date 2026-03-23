/**
 * Barre de progression pour le score de confiance (0-1).
 */

import { cn } from '@/lib/utils'

interface ConfidenceBarProps {
  readonly confidence: number
  readonly showLabel?: boolean
  readonly className?: string
}

export function ConfidenceBar({ confidence, showLabel = true, className }: ConfidenceBarProps) {
  const percentage = Math.round(confidence * 100)

  /* Couleur dynamique selon le score */
  const barColor =
    percentage >= 80
      ? 'bg-green-500'
      : percentage >= 60
        ? 'bg-amber-500'
        : 'bg-red-400'

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all', barColor)}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs text-muted-foreground tabular-nums w-8 text-right">
          {percentage}%
        </span>
      )}
    </div>
  )
}
