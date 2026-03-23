/**
 * Landing page — page publique accessible sans authentification.
 */

import type { Metadata } from 'next'
import { HeroSection } from '@/components/landing/hero-section'
import { FeaturesSection } from '@/components/landing/features-section'
import { Footer } from '@/components/landing/footer'

export const metadata: Metadata = {
  title: 'MailMind — Understand every customer email in seconds',
  description:
    'MailMind analyzes support emails instantly — classifying intent, detecting churn risk, and drafting professional replies automatically.',
}

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Navbar simple */}
      <header className="border-b bg-white px-6 py-4">
        <div className="mx-auto max-w-5xl flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600">
              <span className="text-xs font-bold text-white">M</span>
            </div>
            <span className="font-semibold text-slate-900">MailMind</span>
          </div>
          <nav className="flex items-center gap-3">
            <a
              href="/login"
              className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
            >
              Sign in
            </a>
            <a
              href="/register"
              className="rounded-lg bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Get started
            </a>
          </nav>
        </div>
      </header>

      <main>
        <HeroSection />
        <FeaturesSection />
      </main>

      <Footer />
    </div>
  )
}
