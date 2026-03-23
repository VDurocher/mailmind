'use client'

/**
 * Bar chart de distribution par niveau d'urgence (Recharts).
 */

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useUrgencyStats } from '@/lib/hooks/use-dashboard-stats'
import { ChartSkeleton } from '@/components/shared/loading-skeleton'
import { URGENCY_CONFIG } from '@/lib/constants/categories'

const URGENCY_COLORS: Record<string, string> = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
}

export function UrgencyBarChart() {
  const { data, isLoading } = useUrgencyStats()

  if (isLoading) return <ChartSkeleton />

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Urgency</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40 text-sm text-muted-foreground">
          No data yet
        </CardContent>
      </Card>
    )
  }

  const chartData = data.map((item) => ({
    name: URGENCY_CONFIG[item.urgency].label,
    value: item.count,
    key: item.urgency,
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Urgency Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={chartData} barSize={40}>
            <XAxis dataKey="name" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 12 }} axisLine={false} tickLine={false} allowDecimals={false} />
            <Tooltip
              formatter={(value: number) => [value, 'emails']}
              contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={URGENCY_COLORS[entry.key] ?? '#94a3b8'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
