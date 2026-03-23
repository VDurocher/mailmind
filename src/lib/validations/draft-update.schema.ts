/**
 * Schéma Zod pour la requête PATCH /api/analyses/[id].
 */

import { z } from 'zod'

export const DraftUpdateSchema = z.object({
  draft_reply_edited: z.string().min(1, 'Draft reply cannot be empty').max(10000),
})

export type DraftUpdate = z.infer<typeof DraftUpdateSchema>
