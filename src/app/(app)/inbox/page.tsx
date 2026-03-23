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
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <Suspense>
          <EmailFilters />
        </Suspense>
        <Button onClick={() => setIsModalOpen(true)} size="sm">
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
