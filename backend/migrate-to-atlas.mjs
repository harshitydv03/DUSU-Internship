/**
 * migrate-to-atlas.mjs
 *
 * Reads every collection from the local SQLite database (dusu.db + WAL)
 * and upserts all documents into MongoDB Atlas.
 *
 * Usage:
 *   node migrate-to-atlas.mjs
 *
 * Reads MONGODB_URI from ../../.env.local automatically.
 */

import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const _require = createRequire(import.meta.url)

// Load .env.local from monorepo root
const { config } = _require('dotenv')
config({ path: path.resolve(__dirname, '..', '.env.local') })

import mongoose from 'mongoose'
import Database from 'better-sqlite3'

// ── Config ────────────────────────────────────────────────────────────────────
const SQLITE_PATH = path.resolve(__dirname, 'dusu.db')
const ATLAS_URI   = process.env.MONGODB_URI

if (!ATLAS_URI || ATLAS_URI.includes('<credentials>')) {
  console.error('❌  MONGODB_URI is not set or still has placeholder credentials.')
  console.error('    Edit .env.local and replace <credentials> with your Atlas username:password.')
  process.exit(1)
}

// ── Mongoose generic schema (mirrors db.js) ───────────────────────────────────
const docSchema = new mongoose.Schema(
  { data: { type: mongoose.Schema.Types.Mixed, required: true } },
  { timestamps: { createdAt: 'created_at', updatedAt: false } },
)
const _models = {}
function getModel(name) {
  if (!_models[name]) _models[name] = mongoose.model(name, docSchema, name)
  return _models[name]
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  // 1. Open SQLite (WAL is merged automatically by better-sqlite3)
  let sqlite
  try {
    sqlite = new Database(SQLITE_PATH, { readonly: true, fileMustExist: true })
    console.log(`✅  SQLite opened: ${SQLITE_PATH}`)
  } catch (err) {
    console.error('❌  Could not open SQLite file:', err.message)
    process.exit(1)
  }

  // 2. Discover all tables (skip sqlite_sequence)
  const tables = sqlite
    .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name != 'sqlite_sequence'")
    .all()
    .map(r => r.name)

  if (tables.length === 0) {
    console.warn('⚠️   No tables found in SQLite database. Nothing to migrate.')
    process.exit(0)
  }
  console.log(`📋  Tables found: ${tables.join(', ')}\n`)

  // 3. Connect to Atlas
  console.log(`🔗  Connecting to Atlas…`)
  await mongoose.connect(ATLAS_URI)
  console.log('✅  Atlas connected\n')

  // 4. Migrate each table
  let totalInserted = 0
  for (const table of tables) {
    const rows = sqlite.prepare(`SELECT * FROM "${table}" ORDER BY id ASC`).all()
    if (rows.length === 0) {
      console.log(`  ⏭   ${table}: empty, skipping`)
      continue
    }

    const Model = getModel(table)

    // Check if collection already has data
    const existing = await Model.countDocuments()
    if (existing > 0) {
      console.log(`  ⚠️   ${table}: already has ${existing} document(s) in Atlas — skipping to avoid duplicates`)
      continue
    }

    // Parse and insert
    const docs = rows.map(row => ({
      data: JSON.parse(row.data),
      created_at: row.created_at,
    }))

    await Model.insertMany(docs, { ordered: false })
    console.log(`  ✅  ${table}: inserted ${docs.length} document(s)`)
    totalInserted += docs.length
  }

  console.log(`\n🎉  Migration complete — ${totalInserted} document(s) inserted into Atlas.`)
  await mongoose.disconnect()
  sqlite.close()
}

main().catch(err => {
  console.error('❌  Migration failed:', err)
  process.exit(1)
})
