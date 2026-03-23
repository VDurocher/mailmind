'use client'

/**
 * Pie chart de distribution par catégorie (Recharts).
 */

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useCategoryStats } from '@/lib/hooks/use-dashboard-stats'
import { ChartSkeleton } from '@/components/shared/loading-skeleton'
import { CATEGORY_CONFIG, CATEGORY_CHART_COLORS } from '@/lib/constants/categories'

export function CategoryPieChart() {
  const { data, isLoading } = useCategoryStats()

  if (isLoading) return <ChartSkeleton />

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Categories</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40 text-sm text-muted-foreground">
          No data yet
        </CardContent>
      </Card>
    )
  }

  const chartData = data.map((item) => ({
    name: CATEGORY_CONFIG[item.category].label,
    value: item.count,
    color: CATEGORY_CHART_COLORS[item.category],
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Email Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [value, 'emails']}
              contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
            />
            <Legend
              formatter={(value) => <span className="text-xs">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
