/**
 * Footer de la landing page.
 */

import Link from 'next/link'
import { Mail } from 'lucide-react'
import { ROUTES } from '@/lib/constants/routes'

export function Footer() {
  return (
    <footer className="border-t bg-white py-10">
      <div className="mx-auto max-w-5xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-600">
            <Mail className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-semibold text-slate-900">MailMind</span>
        </div>

        <nav className="flex items-center gap-6 text-sm text-slate-500">
          <Link href={ROUTES.login} className="hover:text-slate-900 transition-colors">Sign in</Link>
          <Link href={ROUTES.register} className="hover:text-slate-900 transition-colors">Get started</Link>
        </nav>

        <p className="text-xs text-slate-400">
          © {new Date().getFullYear()} MailMind. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
