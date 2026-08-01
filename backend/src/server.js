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

// ── Lightweight validation for CMS-managed content ─────────────────────────
// Only fields the public pages actually depend on are required; formats are
// checked whenever a value is supplied. Kept as plain predicates on purpose —
// no schema layer, no validation dependency.
const isBlank = (v) => v === undefined || v === null || String(v).trim() === ''
const isUrl = (v) => /^https?:\/\/\S+$/i.test(String(v).trim())
const isIsoDate = (v) => /^\d{4}-\d{2}-\d{2}$/.test(String(v).trim()) && !Number.isNaN(Date.parse(v))
const isYear = (v) => /^\d{4}$/.test(String(v).trim())
// A hosted image, or a file served from the frontend's public folder
const isUrlOrPath = (v) => isUrl(v) || /^\/\S*$/.test(String(v).trim())

const SOCIAL_PLATFORMS = ['instagram', 'twitter', 'facebook', 'threads', 'website']

const CMS_RULES = {
  notices: { required: ['title', 'date'], date: ['date'] },
  events: { required: ['title', 'date'], date: ['date'] },
  team: { required: ['role', 'name'], urlOrPath: ['image'], socials: ['socials'] },
  scholarships: { required: ['name'], url: ['link'] },
  downloads: { required: ['name'], url: ['url'] },
  resources: { required: ['name', 'url'], url: ['url'] },
  milestones: { required: ['year', 'title'], year: ['year'] },
  faqs: { required: ['q', 'a'] },
  gallery: { required: ['caption'], url: ['imageUrl'] },
}

// Builds a `validate` hook for one resource. On PUT (`partial`) an omitted
// field is left untouched, but explicitly blanking a required one is rejected.
function cmsValidator(rules) {
  return (body, { partial }) => {
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return 'Request body must be an object'
    }
    const errors = []
    for (const f of rules.required || []) {
      const missing = partial ? f in body && isBlank(body[f]) : isBlank(body[f])
      if (missing) errors.push(`"${f}" is required`)
    }
    for (const f of rules.url || []) {
      if (!isBlank(body[f]) && !isUrl(body[f])) errors.push(`"${f}" must be a valid http(s) URL`)
    }
    for (const f of rules.date || []) {
      if (!isBlank(body[f]) && !isIsoDate(body[f])) errors.push(`"${f}" must be a date in YYYY-MM-DD format`)
    }
    for (const f of rules.year || []) {
      if (!isBlank(body[f]) && !isYear(body[f])) errors.push(`"${f}" must be a 4-digit year`)
    }
    for (const f of rules.urlOrPath || []) {
      if (!isBlank(body[f]) && !isUrlOrPath(body[f])) {
        errors.push(`"${f}" must be a URL or a path starting with /`)
      }
    }
    for (const f of rules.socials || []) {
      if (body[f] === undefined) continue
      if (!Array.isArray(body[f])) {
        errors.push(`"${f}" must be a list`)
        continue
      }
      body[f].forEach((row, i) => {
        const label = `${f}[${i}]`
        if (!row || typeof row !== 'object' || Array.isArray(row)) {
          errors.push(`${label} must be an object`)
          return
        }
        if (!SOCIAL_PLATFORMS.includes(String(row.platform || '').trim())) {
          errors.push(`${label}.platform must be one of: ${SOCIAL_PLATFORMS.join(', ')}`)
        }
        if (!isUrl(row.url)) errors.push(`${label}.url must be a valid http(s) URL`)
      })
    }
    return errors.length ? errors.join('; ') : null
  }
}

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

for (const [name, rules] of Object.entries(CMS_RULES)) {
  CUSTOM[name] = { ...CUSTOM[name], validate: cmsValidator(rules) }
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
