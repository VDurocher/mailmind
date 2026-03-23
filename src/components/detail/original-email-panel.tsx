/**
 * Panneau affichant l'email original (expéditeur, sujet, corps).
 */

import { Mail } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { EmailAnalysis } from '@/lib/types/email.types'

interface OriginalEmailPanelProps {
  readonly analysis: EmailAnalysis
}

export function OriginalEmailPanel({ analysis }: OriginalEmailPanelProps) {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Mail className="h-4 w-4 text-slate-400" />
          Original Email
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="text-sm space-y-1">
          <p className="text-slate-500">
            <span className="font-medium text-slate-700">From: </span>
            {analysis.sender_name} &lt;{analysis.sender_email}&gt;
          </p>
          <p className="text-slate-500">
            <span className="font-medium text-slate-700">Subject: </span>
            {analysis.subject}
          </p>
        </div>
        <div className="border-t pt-3">
          <pre className="text-sm text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">
            {analysis.body}
          </pre>
        </div>
      </CardContent>
    </Card>
  )
}
