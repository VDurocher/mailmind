/**
 * Singleton OpenAI — initialisé une seule fois côté serveur.
 * La clé API ne doit JAMAIS être exposée au client.
 */

import OpenAI from 'openai'

let openaiInstance: OpenAI | null = null

export function getOpenAIClient(): OpenAI {
  if (openaiInstance !== null) {
    return openaiInstance
  }

  const apiKey = process.env['OPENAI_API_KEY']
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY non définie dans les variables d\'environnement.')
  }

  openaiInstance = new OpenAI({ apiKey })
  return openaiInstance
}
