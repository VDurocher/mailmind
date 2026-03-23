/**
 * Badge coloré pour les catégories d'email.
 * Réutilisé dans EmailListItem, AnalysisPanel, RecentAnalysesList.
 */

import { cn } from '@/lib/utils'
import { CATEGORY_CONFIG } from '@/lib/constants/categories'
import type { EmailCategory } from '@/lib/types/email.types'

interface CategoryBadgeProps {
  readonly category: EmailCategory
  readonly className?: string
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG[category]

  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        config.bg,
        config.color,
        className,
      )}
    >
      {config.label}
    </span>
  )
}
