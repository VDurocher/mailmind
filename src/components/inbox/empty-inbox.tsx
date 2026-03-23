/**
 * État vide de l'inbox — invitation à analyser un premier email.
 */

import { Inbox } from 'lucide-react'

interface EmptyInboxProps {
  readonly onAnalyze: () => void
}

export function EmptyInbox({ onAnalyze }: EmptyInboxProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 mb-4">
        <Inbox className="h-8 w-8 text-blue-400" />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-1">No emails analyzed yet</h3>
      <p className="text-sm text-slate-500 mb-6 max-w-xs">
        Paste a customer email or pick a sample to see AI analysis in action.
      </p>
      <button
        onClick={onAnalyze}
        className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        Analyze your first email
      </button>
    </div>
  )
}
