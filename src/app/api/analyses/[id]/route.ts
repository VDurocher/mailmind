/**
 * GET /api/analyses/[id] — détail d'une analyse.
 * PATCH /api/analyses/[id] — mise à jour du brouillon édité.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { getAnalysisById, updateDraftReply } from '@/lib/queries/analyses.queries'
import { DraftUpdateSchema } from '@/lib/validations/draft-update.schema'

interface RouteParams {
  readonly params: Promise<{ readonly id: string }>
}

export async function GET(_request: Request, { params }: RouteParams) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { id } = await params

  try {
    /* user.id passé explicitement pour la défense en profondeur contre l'IDOR */
    const analysis = await getAnalysisById(supabase, id, user.id)
    if (!analysis) {
      return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 })
    }
    return NextResponse.json(analysis)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'INTERNAL_ERROR', message }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 })
  }

  const { id } = await params

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json(
      { error: 'VALIDATION_ERROR', details: ['Invalid JSON body'] },
      { status: 400 },
    )
  }

  const parsed = DraftUpdateSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { error: 'VALIDATION_ERROR', details: parsed.error.issues },
      { status: 400 },
    )
  }

  try {
    /* user.id passé explicitement pour la défense en profondeur contre l'IDOR */
    const result = await updateDraftReply(supabase, id, user.id, parsed.data.draft_reply_edited)
    return NextResponse.json(result)
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ error: 'INTERNAL_ERROR', message }, { status: 500 })
  }
}
