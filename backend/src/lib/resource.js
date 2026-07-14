import { Router } from 'express'
import { store } from './store.js'
import { requireAuth } from './auth.js'

// Full CRUD router for one collection. Reads are public; writes need a
// logged-in admin, except resources with `publicCreate` (e.g. students filing
// queries). `onCreate` shapes incoming documents (defaults, server-generated
// fields). All store calls are now async.
export function resource(table, { onCreate, publicCreate = false } = {}) {
  const s = store(table)
  const router = Router()
  const createGuard = publicCreate ? (_req, _res, next) => next() : requireAuth

  router.get('/', async (req, res) => {
    try {
      res.json(await s.list(req.query))
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.get('/:id', async (req, res) => {
    try {
      const doc = await s.get(req.params.id)
      doc ? res.json(doc) : res.status(404).json({ error: 'Not found' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.post('/', createGuard, async (req, res) => {
    try {
      const doc = onCreate ? onCreate(req.body) : req.body
      res.status(201).json(await s.create(doc))
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.put('/:id', requireAuth, async (req, res) => {
    try {
      const doc = await s.update(req.params.id, req.body)
      doc ? res.json(doc) : res.status(404).json({ error: 'Not found' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  router.delete('/:id', requireAuth, async (req, res) => {
    try {
      ;(await s.remove(req.params.id))
        ? res.status(204).end()
        : res.status(404).json({ error: 'Not found' })
    } catch (err) {
      res.status(500).json({ error: err.message })
    }
  })

  return router
}
