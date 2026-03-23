/**
 * Section features — bénéfices orientés résultats + processus en 3 étapes.
 */

import {
  TrendingUp,
  AlertOctagon,
  MessageSquareText,
  BarChart3,
  Users,
  Zap,
} from 'lucide-react'

const FEATURES = [
  {
    icon: AlertOctagon,
    title: 'Catch churn before it happens',
    description:
      'MailMind detects customers signaling cancellation intent, frustration, or competitor comparisons — before they leave without warning.',
    color: 'text-rose-500 bg-rose-50',
  },
  {
    icon: TrendingUp,
    title: 'Never miss a sales opportunity',
    description:
      'Prospects requesting demos, pricing, or upgrades are flagged as high-priority leads the moment they land in your inbox.',
    color: 'text-green-600 bg-green-50',
  },
  {
    icon: MessageSquareText,
    title: 'Reply in your voice, instantly',
    description:
      'Get a ready-to-send draft reply for every email — professional, personalized, and referencing the customer\'s specific situation.',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: Zap,
    title: 'Route the right emails, right now',
    description:
      'Billing issues, technical bugs, onboarding questions — every email is classified and prioritized so nothing slips through the cracks.',
    color: 'text-amber-500 bg-amber-50',
  },
  {
    icon: BarChart3,
    title: 'Understand your support trends',
    description:
      'See which issues recur, which categories peak, and how your team\'s response quality evolves — all in a live dashboard.',
    color: 'text-violet-500 bg-violet-50',
  },
  {
    icon: Users,
    title: 'Built for the whole team',
    description:
      'Every analyst sees only their own data. Real-time updates keep everyone in sync without messy spreadsheets or shared inboxes.',
    color: 'text-slate-600 bg-slate-100',
  },
] as const

const STEPS = [
  {
    number: '01',
    title: 'Paste or connect your email',
    description: 'Drop in a customer email or pick from representative examples to see the analysis in action.',
  },
  {
    number: '02',
    title: 'AI classifies in under 2 seconds',
    description: 'Intent, urgency, sentiment, key entities, and priority score — all extracted and scored automatically.',
  },
  {
    number: '03',
    title: 'Act on the insight',
    description: 'Review the draft reply, edit if needed, and move on. Your queue stays empty, your customers stay happy.',
  },
] as const

export function FeaturesSection() {
  return (
    <>
      {/* ── FEATURES ──────────────────────────────────────────────── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              Your support team, on autopilot
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-xl mx-auto">
              MailMind handles the cognitive load — so your team focuses on what humans do best.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200"
              >
                <div
                  className={`mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl ${feature.color}`}
                >
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 font-semibold text-slate-900">{feature.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────── */}
      <section className="bg-slate-50 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 lg:text-4xl">
              From email to action in 3 steps
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {STEPS.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-start">
                {/* Connecteur */}
                {index < STEPS.length - 1 && (
                  <div className="absolute top-5 left-10 right-0 hidden h-px bg-slate-200 md:block" />
                )}

                <div className="relative z-10 mb-5 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white text-sm font-bold shadow-sm">
                  {index + 1}
                </div>

                <h3 className="mb-2 font-semibold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BOTTOM ────────────────────────────────────────────── */}
      <section className="bg-slate-900 py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Start understanding your emails today
          </h2>
          <p className="text-slate-400 mb-8 text-lg">
            No setup required. No credit card needed. See results in under a minute.
          </p>
          <a
            href="/register"
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
          >
            Get started free
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </section>
    </>
  )
}
