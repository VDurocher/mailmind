'use client'

/**
 * Navigation mobile — barre fixe en bas visible uniquement sur mobile (< md).
 */

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Inbox, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/lib/constants/routes'
import type { LucideIcon } from 'lucide-react'

const NAV_ITEMS: ReadonlyArray<{ href: string; label: string; icon: LucideIcon }> = [
  { href: ROUTES.dashboard, label: 'Dashboard', icon: LayoutDashboard },
  { href: ROUTES.inbox, label: 'Inbox', icon: Inbox },
  { href: ROUTES.settings, label: 'Settings', icon: Settings },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 flex h-16 items-center justify-around border-t bg-white px-2">
      {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || pathname.startsWith(`${href}/`)
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex flex-col items-center gap-1 px-4 py-2 text-xs font-medium transition-colors rounded-lg',
              isActive ? 'text-blue-700' : 'text-slate-500 hover:text-slate-900',
            )}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        )
      })}
    </nav>
  )
}
