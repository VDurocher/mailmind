'use client'

/**
 * Sélecteur d'emails sample pour la démo.
 * Affiche les 10 emails du dataset avec leur titre.
 */

import { SAMPLE_EMAILS } from '@/lib/constants/sample-emails'
import { cn } from '@/lib/utils'
import type { EmailInput } from '@/lib/types/email.types'

interface SampleEmailPickerProps {
  readonly onSelect: (email: EmailInput) => void
}

export function SampleEmailPicker({ onSelect }: SampleEmailPickerProps) {
  return (
    <div className="space-y-1 max-h-72 overflow-y-auto pr-1">
      {SAMPLE_EMAILS.map((email) => (
        <button
          key={email.id}
          onClick={() =>
            onSelect({
              sender_name: email.sender_name,
              sender_email: email.sender_email,
              subject: email.subject,
              body: email.body,
            })
          }
          className={cn(
            'w-full text-left rounded-lg border px-3 py-2.5 text-sm transition-colors',
            'hover:border-blue-200 hover:bg-blue-50',
          )}
        >
          <p className="font-medium text-slate-900 truncate">{email.subject}</p>
          <p className="text-xs text-slate-500 mt-0.5">{email.sender_name}</p>
        </button>
      ))}
    </div>
  )
}
