'use client'

/**
 * Sidebar principale de l'application — navigation fixe gauche.
 */

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { LayoutDashboard, Inbox, Settings, LogOut, Mail } from 'lucide-react'
import { toast } from 'sonner'
import { SidebarNavItem } from './sidebar-nav-item'
import { Button } from '@/components/ui/button'
import { useSupabase } from '@/providers/supabase-provider'
import { ROUTES } from '@/lib/constants/routes'

const NAV_ITEMS = [
  { href: ROUTES.dashboard, label: 'Dashboard', icon: LayoutDashboard },
  { href: ROUTES.inbox, label: 'Inbox', icon: Inbox },
  { href: ROUTES.settings, label: 'Settings', icon: Settings },
] as const

export function Sidebar() {
  const supabase = useSupabase()
  const router = useRouter()

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error('Logout failed')
      return
    }
    router.push(ROUTES.login)
  }

  return (
    <aside className="hidden md:flex h-screen w-56 flex-col border-r bg-white">
      {/* Logo */}
      <div className="flex h-16 items-center gap-2 border-b px-4">
        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
          <Mail className="h-4 w-4 text-white" />
        </div>
        <Link href={ROUTES.dashboard} className="text-base font-semibold text-slate-900">
          MailMind
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {NAV_ITEMS.map((item) => (
          <SidebarNavItem key={item.href} {...item} />
        ))}
      </nav>

      {/* Déconnexion */}
      <div className="border-t p-3">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleSignOut}
          className="w-full justify-start gap-3 text-slate-600 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  )
}
