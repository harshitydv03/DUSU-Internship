import { createRequire } from 'module'
import { fileURLToPath } from 'url'
import path from 'path'

// Load .env.local from the monorepo root (two directories above src/)
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const _require = createRequire(import.meta.url)
const { config } = _require('dotenv')
config({ path: path.resolve(__dirname, '../..', '.env.local'), override: true })

import express from 'express'
import cors from 'cors'
import { RESOURCES, connectDB } from './config/db.js'
import { resource } from './lib/resource.js'
import { store } from './lib/store.js'
import { authRouter, requireAuth } from './lib/auth.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'dusu-backend' }))
app.use('/api/auth', authRouter)

// Team reply on a grievance — appended to the query's replies thread and
// visible to the student in Track My Query.
app.post('/api/queries/:id/replies', requireAuth, async (req, res) => {
  try {
    const queries = store('queries')
    const query = await queries.get(req.params.id)
    if (!query) return res.status(404).json({ error: 'Not found' })
    if (!req.body?.message?.trim()) return res.status(400).json({ error: 'message is required' })
    const replies = [
      ...(query.replies || []),
      { message: req.body.message.trim(), by: req.user.username, at: new Date().toISOString() },
    ]
    res.status(201).json(await queries.update(query.id, { replies }))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Grievances get a server-generated reference ID and initial status.
const CUSTOM = {
  queries: {
    onCreate: (body) => ({
      ...body,
      refId: `DUSU-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      status: 'Submitted',
    }),
  },
}

// Students must be able to file queries and contact messages without login.
const PUBLIC_CREATE = new Set(['queries', 'contact'])

for (const name of RESOURCES) {
  app.use(`/api/${name}`, resource(name, { ...CUSTOM[name], publicCreate: PUBLIC_CREATE.has(name) }))
}

const PORT = process.env.PORT || 5000

// Wait for MongoDB before accepting requests.
connectDB()
  .then(() => app.listen(PORT, () => console.log(`DUSU API ready on http://localhost:${PORT}/api`)))
  .catch((err) => { console.error('Failed to connect to MongoDB:', err); process.exit(1) })
