/**
 * POST /api/auth/login — authentification avec rate limiting par IP.
 * Protège contre le brute-force : 5 tentatives par 15 minutes par IP.
 */

import { NextResponse, type NextRequest } from 'next/server'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { checkRateLimit, LOGIN_RATE_LIMIT } from '@/lib/security/rate-limit'

const LoginSchema = z.object({
  email: z.string().email('Email invalide'),
  password: z.string().min(1, 'Mot de passe requis'),
})

/** Extrait l'IP de la requête — en-têtes proxy en priorité */
function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    /* Prend la première IP de la chaîne (client réel) */
    return forwardedFor.split(',')[0]?.trim() ?? 'unknown'
  }
  return request.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request)

  /* Rate limiting par IP : 5 tentatives par 15 minutes */
  const rateLimitResult = checkRateLimit(`login:${clientIp}`, LOGIN_RATE_LIMIT)
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      {
        error: 'RATE_LIMIT_EXCEEDED',
        message: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.',
      },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((rateLimitResult.resetAt - Date.now()) / 1000)),
          'X-RateLimit-Limit': String(LOGIN_RATE_LIMIT.maxRequests),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(rateLimitResult.resetAt),
        },
      },
    )
  }

  /* Validation du body */
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'VALIDATION_ERROR', details: ['Corps JSON invalide'] },
      { status: 400 },
    )
  }

  const parsed = LoginSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'VALIDATION_ERROR', details: parsed.error.issues },
      { status: 400 },
    )
  }

  /* Authentification via Supabase */
  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({
    email: parsed.data.email,
    password: parsed.data.password,
  })

  if (error) {
    /* Message générique pour ne pas divulguer si l'email existe */
    return NextResponse.json(
      { error: 'INVALID_CREDENTIALS', message: 'Email ou mot de passe incorrect.' },
      { status: 401 },
    )
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
