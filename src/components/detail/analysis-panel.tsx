/**
 * Panneau des résultats d'analyse IA (classification, entités, points clés).
 */

import { Sparkles, CheckCircle2, Flame } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CategoryBadge } from '@/components/shared/category-badge'
import { UrgencyIndicator } from '@/components/shared/urgency-indicator'
import { ConfidenceBar } from '@/components/shared/confidence-bar'
import { EntityTags } from './entity-tags'
import { SENTIMENT_CONFIG } from '@/lib/constants/categories'
import type { EmailAnalysis } from '@/lib/types/email.types'

function PriorityBadge({ score }: { readonly score: number }) {
  const color =
    score >= 7 ? 'text-red-600 bg-red-50' :
    score >= 4 ? 'text-amber-600 bg-amber-50' :
    'text-green-600 bg-green-50'
  return (
    <span className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${color}`}>
      <Flame className="h-3 w-3" />
      {score.toFixed(1)}
    </span>
  )
}

interface AnalysisPanelProps {
  readonly analysis: EmailAnalysis
}

export function AnalysisPanel({ analysis }: AnalysisPanelProps) {
  const sentimentConfig = SENTIMENT_CONFIG[analysis.sentiment]

  return (
    <Card className="h-full overflow-auto">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-blue-500" />
          AI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Classification */}
        <section>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
            Classification
          </p>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Category</span>
              <CategoryBadge category={analysis.category} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Subcategory</span>
              <span className="text-xs font-medium text-slate-700">{analysis.subcategory}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Urgency</span>
              <UrgencyIndicator urgency={analysis.urgency} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Sentiment</span>
              <span className={`text-xs font-medium ${sentimentConfig.color}`}>
                {sentimentConfig.label}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-500">Priority Score</span>
              <PriorityBadge score={analysis.priority_score} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-slate-500">Confidence</span>
              </div>
              <ConfidenceBar confidence={analysis.confidence} />
            </div>
          </div>
        </section>

        {/* Points clés */}
        <section>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
            Key Points
          </p>
          <ul className="space-y-1.5">
            {analysis.key_points.map((point, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 mt-0.5 flex-shrink-0" />
                {point}
              </li>
            ))}
          </ul>
        </section>

        {/* Entités extraites */}
        <section>
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
            Extracted Entities
          </p>
          <EntityTags entities={analysis.entities} />
        </section>

        {/* Erreur de traitement */}
        {analysis.processing_error && (
          <section>
            <p className="text-xs font-medium text-red-400 uppercase tracking-wider mb-1">
              Processing Error
            </p>
            <p className="text-xs text-red-600 bg-red-50 rounded p-2 font-mono">
              {analysis.processing_error}
            </p>
          </section>
        )}
      </CardContent>
    </Card>
  )
}
