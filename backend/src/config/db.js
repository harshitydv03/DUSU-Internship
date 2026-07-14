// SQLite via Node's built-in driver — no database server or native module
// needed. Swap to better-sqlite3/Postgres later by changing only this file
// and lib/store.js.
import { DatabaseSync } from 'node:sqlite'
import { fileURLToPath } from 'node:url'
import { SEED } from './seed.js'

// Every table is a small document store: JSON in, JSON out. Add a name here
// (and optionally seed data in seed.js) to get a full CRUD API for it.
export const RESOURCES = [
  'notices', 'events', 'queries', 'team', 'scholarships', 'opportunities',
  'downloads', 'resources', 'milestones', 'faqs', 'gallery', 'contact',
]

export const db = new DatabaseSync(fileURLToPath(new URL('../../dusu.db', import.meta.url)))
db.exec('PRAGMA journal_mode = WAL') // fast concurrent reads

for (const table of RESOURCES) {
  db.exec(`CREATE TABLE IF NOT EXISTS ${table} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    data TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  )`)
  const { n } = db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get()
  if (n === 0 && SEED[table]) {
    const insert = db.prepare(`INSERT INTO ${table} (data) VALUES (?)`)
    for (const doc of SEED[table]) insert.run(JSON.stringify(doc))
  }
}
