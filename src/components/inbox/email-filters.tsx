'use client'

/**
 * Filtres de l'inbox — catégorie et urgence via URL search params.
 */

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function EmailFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateFilter = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value === 'all') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
      params.set('page', '1')
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams],
  )

  return (
    <div className="flex items-center gap-2">
      <Select
        value={searchParams.get('category') ?? 'all'}
        onValueChange={(value) => updateFilter('category', value)}
      >
        <SelectTrigger className="w-36 h-8 text-xs">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All categories</SelectItem>
          <SelectItem value="complaint">Complaint</SelectItem>
          <SelectItem value="sales_lead">Sales Lead</SelectItem>
          <SelectItem value="technical_question">Technical</SelectItem>
          <SelectItem value="billing">Billing</SelectItem>
          <SelectItem value="feature_request">Feature Request</SelectItem>
          <SelectItem value="partnership">Partnership</SelectItem>
          <SelectItem value="onboarding">Onboarding</SelectItem>
          <SelectItem value="churn_risk">Churn Risk</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={searchParams.get('urgency') ?? 'all'}
        onValueChange={(value) => updateFilter('urgency', value)}
      >
        <SelectTrigger className="w-32 h-8 text-xs">
          <SelectValue placeholder="Urgency" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All urgency</SelectItem>
          <SelectItem value="high">High</SelectItem>
          <SelectItem value="medium">Medium</SelectItem>
          <SelectItem value="low">Low</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}
