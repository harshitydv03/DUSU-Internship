// Standalone re-seed script — drops all seeded collections then re-inserts.
// Run from the monorepo root:
//   node --disable-warning=ExperimentalWarning backend/src/config/reseed.js

import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const _require = createRequire(import.meta.url)
const { config } = _require('dotenv')
config({ path: path.resolve(__dirname, '../../../.env.local'), override: true })

import mongoose from 'mongoose'
import { SEED } from './seed.js'
import { getModel } from './db.js'
import { seedAdmin } from '../lib/auth.js'

const SEEDED_RESOURCES = Object.keys(SEED)

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dusu'
await mongoose.connect(uri)
console.log(`MongoDB connected → ${uri}\n`)

for (const table of SEEDED_RESOURCES) {
  const Model = getModel(table)
  await Model.deleteMany({})
  await Model.insertMany(SEED[table].map((doc) => ({ data: doc })))
  console.log(`  ✓ re-seeded ${SEED[table].length} document(s) into '${table}'`)
}

await seedAdmin()

await mongoose.disconnect()
console.log('\nDone.')
