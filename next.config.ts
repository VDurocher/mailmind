import type { NextConfig } from 'next'

/**
 * Headers de sécurité HTTP appliqués à toutes les réponses.
 * Protègent contre XSS, clickjacking, sniffing MIME et fuites Referer.
 */
const SECURITY_HEADERS = [
  {
    /* Empêche le chargement de ressources depuis des origines non autorisées */
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      /* Scripts : uniquement same-origin + inline nécessaires à Next.js */
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
      /* Styles : same-origin + inline (Tailwind CSS) */
      "style-src 'self' 'unsafe-inline'",
      /* Images : same-origin + data URIs */
      "img-src 'self' data: blob:",
      /* Fonts : same-origin */
      "font-src 'self'",
      /* Connexions : same-origin + Supabase */
      `connect-src 'self' ${process.env['NEXT_PUBLIC_SUPABASE_URL'] ?? ''} wss://*.supabase.co`,
      /* Iframes interdites */
      "frame-ancestors 'none'",
      /* Formulaires : same-origin uniquement */
      "form-action 'self'",
      /* Objets embarqués interdits */
      "object-src 'none'",
      /* Base URL restreinte à same-origin */
      "base-uri 'self'",
    ].join('; '),
  },
  {
    /* Force HTTPS pendant 1 an, inclut les sous-domaines */
    key: 'Strict-Transport-Security',
    value: 'max-age=31536000; includeSubDomains',
  },
  {
    /* Interdit l'affichage dans une iframe — prévient le clickjacking */
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    /* Empêche le navigateur de deviner le type MIME — prévient le MIME sniffing */
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    /* N'envoie que l'origine dans le Referer — protège les URLs privées */
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    /* Restreint l'accès aux APIs navigateur sensibles */
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=()',
  },
]

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        /* Appliqué à toutes les routes */
        source: '/(.*)',
        headers: SECURITY_HEADERS,
      },
    ]
  },
}

export default nextConfig
