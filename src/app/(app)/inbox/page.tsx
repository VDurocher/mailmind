'use client'

/**
 * Page Inbox — liste des analyses + modal d'analyse.
 */

import { useState, Suspense } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmailList } from '@/components/inbox/email-list'
import { EmailFilters } from '@/components/inbox/email-filters'
import { AnalyzeModal } from '@/components/inbox/analyze-modal'

export default function InboxPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="mx-auto max-w-4xl">
      {/* Toolbar — flex-wrap sur mobile pour éviter le débordement du bouton */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <Suspense>
          <EmailFilters />
        </Suspense>
        <Button onClick={() => setIsModalOpen(true)} size="sm" className="shrink-0">
          <Plus className="h-4 w-4" />
          Analyze email
        </Button>
      </div>

      {/* Liste */}
      <div className="rounded-xl border bg-white overflow-hidden">
        <Suspense>
          <EmailList onAnalyze={() => setIsModalOpen(true)} />
        </Suspense>
      </div>

      {/* Modal */}
      <AnalyzeModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </div>
  )
}
