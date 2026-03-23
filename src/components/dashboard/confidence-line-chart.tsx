'use client'

/**
 * Line chart d'évolution de la confiance moyenne (Recharts).
 */

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useConfidenceTimeSeries } from '@/lib/hooks/use-dashboard-stats'
import { ChartSkeleton } from '@/components/shared/loading-skeleton'
import { format } from 'date-fns'

export function ConfidenceLineChart() {
  const { data, isLoading } = useConfidenceTimeSeries(30)

  if (isLoading) return <ChartSkeleton />

  if (!data || data.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Confidence over time</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-40 text-sm text-muted-foreground">
          No data yet
        </CardContent>
      </Card>
    )
  }

  const chartData = data.map((point) => ({
    date: format(new Date(point.date), 'MMM d'),
    confidence: Math.round(point.avg_confidence * 100),
  }))

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold">Avg. Confidence — Last 30 days</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis
              domain={[0, 100]}
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              unit="%"
            />
            <Tooltip
              formatter={(value: number) => [`${value}%`, 'Avg. confidence']}
              contentStyle={{ borderRadius: '8px', fontSize: '12px' }}
            />
            <Line
              type="monotone"
              dataKey="confidence"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
