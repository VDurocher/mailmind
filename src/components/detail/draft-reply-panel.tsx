'use client'

/**
 * Panneau du brouillon de réponse — éditable avec sauvegarde optimiste.
 */

import { useState, useEffect } from 'react'
import { Save, RotateCcw, MessageSquare } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { useUpdateDraft } from '@/lib/hooks/use-update-draft'
import type { EmailAnalysis } from '@/lib/types/email.types'

interface DraftReplyPanelProps {
  readonly analysis: EmailAnalysis
}

export function DraftReplyPanel({ analysis }: DraftReplyPanelProps) {
  const { mutate: saveDraft, isPending } = useUpdateDraft(analysis.id)

  /* Le draft affiché est l'édition utilisateur si elle existe, sinon l'original */
  const currentDraft = analysis.draft_reply_edited ?? analysis.draft_reply
  const [text, setText] = useState(currentDraft)
  const isDirty = text !== currentDraft
  const isEdited = analysis.draft_reply_edited !== null

  /* Synchronise si l'analyse change (ex: après invalidation du cache) */
  useEffect(() => {
    setText(analysis.draft_reply_edited ?? analysis.draft_reply)
  }, [analysis.draft_reply_edited, analysis.draft_reply])

  function handleSave() {
    saveDraft(text)
  }

  function handleReset() {
    setText(analysis.draft_reply)
    saveDraft(analysis.draft_reply)
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-semibold flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-green-500" />
            Draft Reply
            {isEdited && (
              <span className="text-xs font-normal text-amber-600 bg-amber-50 rounded px-1.5 py-0.5">
                edited
              </span>
            )}
          </CardTitle>
          <div className="flex items-center gap-1.5">
            {isEdited && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
                className="h-7 text-xs text-slate-500"
              >
                <RotateCcw className="h-3 w-3" />
                Reset
              </Button>
            )}
            <Button
              size="sm"
              onClick={handleSave}
              disabled={!isDirty || isPending}
              className="h-7 text-xs"
            >
              <Save className="h-3 w-3" />
              Save
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="h-full min-h-64 resize-none text-sm leading-relaxed font-sans"
          placeholder="No draft reply generated..."
        />
      </CardContent>
    </Card>
  )
}
