'use client'

/**
 * Modal d'analyse d'email — paste manuel ou sample picker.
 */

import { useState, type FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SampleEmailPicker } from './sample-email-picker'
import { useAnalyzeEmail } from '@/lib/hooks/use-analyze-email'
import { ROUTES } from '@/lib/constants/routes'
import type { EmailInput } from '@/lib/types/email.types'

interface AnalyzeModalProps {
  readonly open: boolean
  readonly onOpenChange: (open: boolean) => void
}

export function AnalyzeModal({ open, onOpenChange }: AnalyzeModalProps) {
  const router = useRouter()
  const { mutate: analyze, isPending } = useAnalyzeEmail()

  /* État du formulaire manuel */
  const [form, setForm] = useState<EmailInput>({
    sender_name: '',
    sender_email: '',
    subject: '',
    body: '',
  })

  function handleSampleSelect(email: EmailInput) {
    setForm(email)
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    analyze(form, {
      onSuccess: (data) => {
        onOpenChange(false)
        router.push(ROUTES.inboxDetail(data.id))
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Analyze an email</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="paste">
          <TabsList className="mb-4">
            <TabsTrigger value="paste">Paste email</TabsTrigger>
            <TabsTrigger value="sample">Sample emails</TabsTrigger>
          </TabsList>

          <TabsContent value="paste">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="sender_name">Sender name</Label>
                  <Input
                    id="sender_name"
                    value={form.sender_name}
                    onChange={(e) => setForm((prev) => ({ ...prev, sender_name: e.target.value }))}
                    required
                    placeholder="John Smith"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sender_email">Sender email</Label>
                  <Input
                    id="sender_email"
                    type="email"
                    value={form.sender_email}
                    onChange={(e) => setForm((prev) => ({ ...prev, sender_email: e.target.value }))}
                    required
                    placeholder="john@company.com"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={form.subject}
                  onChange={(e) => setForm((prev) => ({ ...prev, subject: e.target.value }))}
                  required
                  placeholder="Email subject..."
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="body">Email body</Label>
                <Textarea
                  id="body"
                  value={form.body}
                  onChange={(e) => setForm((prev) => ({ ...prev, body: e.target.value }))}
                  required
                  rows={8}
                  placeholder="Paste the email content here..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Analyze with AI
                </Button>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="sample">
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Select one of the 10 sample customer emails to see MailMind in action.
              </p>
              <SampleEmailPicker onSelect={handleSampleSelect} />

              {form.subject && (
                <div className="rounded-lg border bg-blue-50 p-3">
                  <p className="text-sm font-medium text-blue-900">Selected: {form.subject}</p>
                  <p className="text-xs text-blue-700 mt-0.5">From {form.sender_name}</p>
                </div>
              )}

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                  Cancel
                </Button>
                <Button
                  disabled={!form.subject || isPending}
                  onClick={() =>
                    analyze(form, {
                      onSuccess: (data) => {
                        onOpenChange(false)
                        router.push(ROUTES.inboxDetail(data.id))
                      },
                    })
                  }
                >
                  {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                  Analyze with AI
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
