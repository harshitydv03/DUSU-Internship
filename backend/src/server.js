import express from 'express'
import cors from 'cors'
import { RESOURCES } from './config/db.js'
import { resource } from './lib/resource.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/api/health', (_req, res) => res.json({ ok: true, service: 'dusu-backend' }))

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

for (const name of RESOURCES) {
  app.use(`/api/${name}`, resource(name, CUSTOM[name]))
}

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`DUSU API ready on http://localhost:${PORT}/api`))
