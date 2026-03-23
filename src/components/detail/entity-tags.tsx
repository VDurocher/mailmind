/**
 * Tags des entités extraites (produits, commandes, comptes, problèmes).
 */

import type { ExtractedEntities } from '@/lib/types/email.types'

interface EntityTagsProps {
  readonly entities: ExtractedEntities
}

interface TagGroupProps {
  readonly label: string
  readonly items: readonly string[]
  readonly color: string
}

function TagGroup({ label, items, color }: TagGroupProps) {
  if (items.length === 0) return null

  return (
    <div>
      <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span
            key={item}
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${color}`}
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

export function EntityTags({ entities }: EntityTagsProps) {
  const hasEntities =
    entities.products.length > 0 ||
    entities.order_ids.length > 0 ||
    entities.account_ids.length > 0 ||
    entities.issues.length > 0

  if (!hasEntities) {
    return <p className="text-sm text-slate-400 italic">No entities extracted</p>
  }

  return (
    <div className="space-y-3">
      <TagGroup label="Products" items={entities.products} color="bg-violet-100 text-violet-700" />
      <TagGroup label="Orders" items={entities.order_ids} color="bg-amber-100 text-amber-700" />
      <TagGroup label="Accounts" items={entities.account_ids} color="bg-sky-100 text-sky-700" />
      <TagGroup label="Issues" items={entities.issues} color="bg-red-100 text-red-700" />
    </div>
  )
}
