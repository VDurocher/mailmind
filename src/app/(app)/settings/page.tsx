'use client'

/**
 * Page Settings — profil, stats d'usage, zone danger.
 */

import type { Metadata } from 'next'
import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { Loader2, Mail, Slack, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useDashboardStats } from '@/lib/hooks/use-dashboard-stats'
import { useSupabase } from '@/providers/supabase-provider'
import { useQueryClient } from '@tanstack/react-query'

export default function SettingsPage() {
  const supabase = useSupabase()
  const queryClient = useQueryClient()
  const { data: stats } = useDashboardStats()
  const [isDeleting, setIsDeleting] = useState(false)

  async function handleDeleteData() {
    setIsDeleting(true)
    const { error } = await supabase.from('email_analyses').delete().neq('id', '')
    if (error) {
      toast.error('Failed to delete data')
    } else {
      toast.success('All analysis data deleted')
      void queryClient.invalidateQueries()
    }
    setIsDeleting(false)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      {/* Usage stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">API Usage</CardTitle>
          <CardDescription>Your usage over the last 30 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{stats?.total ?? '—'}</p>
              <p className="text-xs text-slate-500 mt-1">Emails analyzed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{stats?.high_urgency ?? '—'}</p>
              <p className="text-xs text-slate-500 mt-1">High urgency</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900">{stats?.leads ?? '—'}</p>
              <p className="text-xs text-slate-500 mt-1">Sales leads</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Intégrations coming soon */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Integrations</CardTitle>
          <CardDescription>Connect your email and messaging tools</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-red-50">
                <Mail className="h-4 w-4 text-red-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Gmail</p>
                <p className="text-xs text-slate-500">Auto-analyze incoming emails</p>
              </div>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
              Coming soon
            </span>
          </div>

          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-purple-50">
                <Slack className="h-4 w-4 text-purple-500" />
              </div>
              <div>
                <p className="text-sm font-medium">Slack notifications</p>
                <p className="text-xs text-slate-500">Alert your team on high-urgency emails</p>
              </div>
            </div>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-500">
              Coming soon
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Danger zone */}
      <Card className="border-red-200">
        <CardHeader>
          <CardTitle className="text-base text-red-700">Danger Zone</CardTitle>
          <CardDescription>Irreversible actions — proceed with caution</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-900">Delete all analysis data</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Permanently removes all your email analyses. Cannot be undone.
              </p>
            </div>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" disabled={isDeleting}>
                  {isDeleting ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                  Delete data
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete all analysis data?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete all {stats?.total ?? 0} email analyses. This
                    action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteData}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    Yes, delete all data
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
