/**
 * Page Dashboard — métriques, graphiques, analyses récentes.
 */

import type { Metadata } from 'next'
import { StatsGrid } from '@/components/dashboard/stats-grid'
import { CategoryPieChart } from '@/components/dashboard/category-pie-chart'
import { UrgencyBarChart } from '@/components/dashboard/urgency-bar-chart'
import { ConfidenceLineChart } from '@/components/dashboard/confidence-line-chart'
import { RecentAnalysesList } from '@/components/dashboard/recent-analyses-list'

export const metadata: Metadata = {
  title: 'Dashboard',
}

export default function DashboardPage() {
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Métriques clés */}
      <StatsGrid />

      {/* Graphiques */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <CategoryPieChart />
        <UrgencyBarChart />
        <ConfidenceLineChart />
      </div>

      {/* Analyses récentes */}
      <RecentAnalysesList />
    </div>
  )
}
