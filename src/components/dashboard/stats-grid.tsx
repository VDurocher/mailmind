'use client'

/**
 * Grille des 4 métriques principales du dashboard.
 */

import { Mail, AlertTriangle, TrendingUp, UserX } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { useDashboardStats } from '@/lib/hooks/use-dashboard-stats'
import { StatCardSkeleton } from '@/components/shared/loading-skeleton'

interface StatCardProps {
  readonly label: string
  readonly value: number
  readonly icon: React.ReactNode
  readonly color: string
}

function StatCard({ label, value, icon, color }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-bold mt-1">{value}</p>
          </div>
          <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatsGrid() {
  const { data, isLoading } = useDashboardStats()

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
      </div>
    )
  }

  if (!data) return null

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <StatCard
        label="Total Analyzed"
        value={data.total}
        icon={<Mail className="h-5 w-5 text-blue-600" />}
        color="bg-blue-50"
      />
      <StatCard
        label="Complaints"
        value={data.complaints}
        icon={<AlertTriangle className="h-5 w-5 text-red-500" />}
        color="bg-red-50"
      />
      <StatCard
        label="Sales Leads"
        value={data.leads}
        icon={<TrendingUp className="h-5 w-5 text-green-500" />}
        color="bg-green-50"
      />
      <StatCard
        label="Churn Risks"
        value={data.churn_risks}
        icon={<UserX className="h-5 w-5 text-rose-500" />}
        color="bg-rose-50"
      />
    </div>
  )
}
