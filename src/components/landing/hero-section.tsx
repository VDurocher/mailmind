/**
 * Section hero — dark gradient, headline orienté bénéfices, stats inline.
 */

import Link from 'next/link'
import { ArrowRight, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ROUTES } from '@/lib/constants/routes'

const STATS = [
  { value: '< 2s', label: 'Analysis time' },
  { value: '8', label: 'Intent categories' },
  { value: '100%', label: 'Emails processed' },
] as const

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-slate-900">
      {/* Gradient de fond */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% -10%, #3b82f6, transparent)',
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 pt-20 pb-16 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-1.5 text-sm font-medium text-slate-300">
          <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
          Smart email intelligence for support teams
        </div>

        {/* Titre */}
        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white lg:text-6xl">
          Every customer email,
          <br />
          <span className="text-blue-400">instantly understood</span>
        </h1>

        {/* Sous-titre */}
        <p className="mb-10 mx-auto max-w-2xl text-xl text-slate-400 leading-relaxed">
          MailMind reads your support inbox, classifies intent, flags urgent issues,
          and drafts the perfect reply — before your team even opens the email.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-500 text-white px-8 h-12">
            <Link href={ROUTES.register}>
              Start for free
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-slate-600 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white h-12"
          >
            <Link href={ROUTES.login}>Sign in to your account</Link>
          </Button>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap items-center justify-center gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-2xl font-bold text-white">{value}</p>
              <p className="text-sm text-slate-400">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Aperçu produit simulé */}
      <div className="relative mx-auto max-w-4xl px-6 pb-0">
        <div className="rounded-t-xl border border-slate-700 bg-slate-800/60 backdrop-blur-sm overflow-hidden shadow-2xl">
          {/* Barre de fenêtre */}
          <div className="flex items-center gap-2 border-b border-slate-700 px-4 py-3">
            <span className="h-3 w-3 rounded-full bg-red-500/70" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
            <span className="h-3 w-3 rounded-full bg-green-500/70" />
            <span className="ml-4 text-xs text-slate-500">mailmind.app / inbox</span>
          </div>

          {/* Contenu simulé — 3 lignes d'emails */}
          <div className="divide-y divide-slate-700/50">
            {[
              {
                name: 'Sarah Chen',
                subject: 'Payment charged twice — need refund urgently',
                badge: 'Billing',
                badgeColor: 'bg-purple-900/60 text-purple-300',
                urgency: 'high',
                time: '2m ago',
              },
              {
                name: 'Marcus Webb',
                subject: "Considering cancelling — competitor offered 40% off",
                badge: 'Churn Risk',
                badgeColor: 'bg-rose-900/60 text-rose-300',
                urgency: 'high',
                time: '8m ago',
              },
              {
                name: 'Priya Nair',
                subject: 'Bulk export feature — any timeline?',
                badge: 'Feature Request',
                badgeColor: 'bg-indigo-900/60 text-indigo-300',
                urgency: 'low',
                time: '15m ago',
              },
            ].map((email) => (
              <div key={email.subject} className="flex items-center gap-4 px-5 py-4">
                <span
                  className={`h-2 w-2 flex-shrink-0 rounded-full ${email.urgency === 'high' ? 'bg-red-400' : 'bg-green-400'}`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-medium text-slate-200">{email.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${email.badgeColor}`}>
                      {email.badge}
                    </span>
                  </div>
                  <p className="text-sm text-slate-400 truncate">{email.subject}</p>
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0">{email.time}</span>
              </div>
            ))}
          </div>

          {/* Bottom blur overlay */}
          <div className="h-12 bg-gradient-to-t from-slate-900 to-transparent" />
        </div>
      </div>
    </section>
  )
}
