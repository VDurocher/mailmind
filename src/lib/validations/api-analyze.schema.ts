/**
 * Schéma Zod pour la requête POST /api/analyze.
 */

import { z } from 'zod'

export const AnalyzeRequestSchema = z.object({
  sender_name: z.string().min(1, 'Sender name is required').max(200),
  sender_email: z.string().email('Invalid email address'),
  subject: z.string().min(1, 'Subject is required').max(500),
  body: z.string().min(10, 'Email body too short').max(10000),
})

export type AnalyzeRequest = z.infer<typeof AnalyzeRequestSchema>
