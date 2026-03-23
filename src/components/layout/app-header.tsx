'use client'

/**
 * Header de l'application — titre de page + avatar utilisateur.
 */

import { usePathname } from 'next/navigation'

const PAGE_TITLES: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/inbox': 'Inbox',
  '/settings': 'Settings',
}

function getPageTitle(pathname: string): string {
  /* Correspondance exacte */
  if (PAGE_TITLES[pathname]) return PAGE_TITLES[pathname]!
  /* Correspondance par préfixe (ex: /inbox/[id]) */
  for (const [path, title] of Object.entries(PAGE_TITLES)) {
    if (pathname.startsWith(`${path}/`)) return title
  }
  return 'MailMind'
}

export function AppHeader() {
  const pathname = usePathname()
  const title = getPageTitle(pathname)

  return (
    <header className="flex h-16 items-center border-b bg-white px-6">
      <h1 className="text-lg font-semibold text-slate-900">{title}</h1>
    </header>
  )
}
