/**
 * Indicateur visuel du niveau d'urgence (point coloré + label).
 */

import { cn } from '@/lib/utils'
import { URGENCY_CONFIG } from '@/lib/constants/categories'
import type { UrgencyLevel } from '@/lib/types/email.types'

interface UrgencyIndicatorProps {
  readonly urgency: UrgencyLevel
  readonly showLabel?: boolean
  readonly className?: string
}

export function UrgencyIndicator({
  urgency,
  showLabel = true,
  className,
}: UrgencyIndicatorProps) {
  const config = URGENCY_CONFIG[urgency]

  return (
    <span className={cn('inline-flex items-center gap-1.5', className)}>
      <span className={cn('h-2 w-2 rounded-full flex-shrink-0', config.dot)} />
      {showLabel && (
        <span className={cn('text-xs font-medium', config.color)}>{config.label}</span>
      )}
    </span>
  )
}
