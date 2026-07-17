// MongoDB via Mongoose. Swap to Atlas later by changing only MONGODB_URI in
// your .env — no code changes needed.
import mongoose from 'mongoose'
import { SEED } from './seed.js'
import { seedAdmin } from '../lib/auth.js'

// Every collection is a generic document store: plain JS object in, plain JS
// object out. Add a name here (and optionally seed data in seed.js) to get a
// full CRUD API for it — exactly one line to add a new section.
export const RESOURCES = [
  'notices', 'events', 'queries', 'team', 'scholarships', 'opportunities',
  'downloads', 'resources', 'milestones', 'faqs', 'gallery', 'contact',
  'colleges', 'hostels',
]

// Generic schema: stores any JSON document. No per-resource schema needed —
// adding a field never requires a migration.
const docSchema = new mongoose.Schema(
  { data: { type: mongoose.Schema.Types.Mixed, required: true } },
  { timestamps: { createdAt: 'created_at', updatedAt: false } },
)

// Cache compiled models so repeated calls to getModel() don't re-compile.
const _models = {}
export function getModel(name) {
  if (!_models[name]) _models[name] = mongoose.model(name, docSchema, name)
  return _models[name]
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/dusu'
  await mongoose.connect(uri)
  console.log(`MongoDB connected → ${uri}`)

  // Seed any empty collection on first run.
  for (const table of RESOURCES) {
    const Model = getModel(table)
    const count = await Model.countDocuments()
    if (count === 0 && SEED[table]) {
      await Model.insertMany(SEED[table].map((doc) => ({ data: doc })))
      console.log(`  seeded ${SEED[table].length} document(s) into '${table}'`)
    }
  }

  await seedAdmin()
}
