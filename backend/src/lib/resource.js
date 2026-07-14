import { Router } from 'express'
import { store } from './store.js'
import { requireAuth } from './auth.js'

// Full CRUD router for one table. Reads are public; writes need a logged-in
// admin, except resources with `publicCreate` (e.g. students filing queries).
// `onCreate` shapes incoming documents (defaults, server-generated fields).
export function resource(table, { onCreate, publicCreate = false } = {}) {
  const s = store(table)
  const router = Router()
  const createGuard = publicCreate ? (_req, _res, next) => next() : requireAuth

  router.get('/', (req, res) => res.json(s.list(req.query)))

  router.get('/:id', (req, res) => {
    const doc = s.get(req.params.id)
    doc ? res.json(doc) : res.status(404).json({ error: 'Not found' })
  })

  router.post('/', createGuard, (req, res) => {
    const doc = onCreate ? onCreate(req.body) : req.body
    res.status(201).json(s.create(doc))
  })

  router.put('/:id', requireAuth, (req, res) => {
    const doc = s.update(req.params.id, req.body)
    doc ? res.json(doc) : res.status(404).json({ error: 'Not found' })
  })

  router.delete('/:id', requireAuth, (req, res) => {
    s.remove(req.params.id)
      ? res.status(204).end()
      : res.status(404).json({ error: 'Not found' })
  })

  return router
}
