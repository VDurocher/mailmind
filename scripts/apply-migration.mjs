/**
 * Applique la migration SQL via une connexion directe à la base Supabase.
 *
 * Usage :
 *   1. Récupère l'URL de connexion depuis :
 *      https://supabase.com/dashboard/project/fdrxlbhixtgrgaahhmml/settings/database
 *      → "Connection string" → mode "Transaction" ou "Session"
 *   2. Ajoute dans .env.local :
 *      SUPABASE_DB_URL=postgresql://postgres.[ref]:[password]@aws-0-eu-west-2.pooler.supabase.com:6543/postgres
 *   3. npm install pg
 *   4. node scripts/apply-migration.mjs
 */

import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const { config } = require('dotenv')
const __dirname = dirname(fileURLToPath(import.meta.url))

config({ path: join(__dirname, '../.env.local') })

const dbUrl = process.env.SUPABASE_DB_URL

if (!dbUrl) {
  console.error('SUPABASE_DB_URL manquant dans .env.local')
  console.error('')
  console.error('Récupère la connection string ici :')
  console.error('https://supabase.com/dashboard/project/fdrxlbhixtgrgaahhmml/settings/database')
  console.error('')
  console.error('Puis ajoute dans .env.local :')
  console.error('  SUPABASE_DB_URL=postgresql://postgres.[ref]:[password]@...')
  console.error('')
  console.error('OU colle le SQL directement dans le SQL Editor :')
  console.error('https://supabase.com/dashboard/project/fdrxlbhixtgrgaahhmml/sql/new')
  process.exit(1)
}

let pg
try {
  pg = require('pg')
} catch {
  console.error("pg non installé. Lance : npm install pg")
  process.exit(1)
}

const { Client } = pg
const migrationPath = join(__dirname, '../supabase/migrations/20260323_add_priority_score_gmail.sql')
const sql = readFileSync(migrationPath, 'utf-8')

console.log('Connexion à la base de données...')
const client = new Client({ connectionString: dbUrl, ssl: { rejectUnauthorized: false } })

try {
  await client.connect()
  console.log('Connecté.')
  console.log('Application de la migration...')
  await client.query(sql)
  console.log('')
  console.log('Migration appliquée avec succès !')
  console.log('Colonnes ajoutées : priority_score, gmail_message_id')
  console.log('CHECK constraint mis à jour : 8 catégories')
} catch (error) {
  console.error('Erreur lors de la migration :', error.message)
  console.error('')
  console.error('Alternative : colle le SQL dans le dashboard Supabase :')
  console.error('https://supabase.com/dashboard/project/fdrxlbhixtgrgaahhmml/sql/new')
  process.exit(1)
} finally {
  await client.end()
}
