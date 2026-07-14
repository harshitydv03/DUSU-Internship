import { Router } from 'express'
import { store } from './store.js'

// Full CRUD router for one table. `onCreate` lets a resource shape incoming
// documents (defaults, server-generated fields) without a custom controller.
export function resource(table, { onCreate } = {}) {
  const s = store(table)
  const router = Router()

  router.get('/', (req, res) => res.json(s.list(req.query)))

  router.get('/:id', (req, res) => {
    const doc = s.get(req.params.id)
    doc ? res.json(doc) : res.status(404).json({ error: 'Not found' })
  })

  router.post('/', (req, res) => {
    const doc = onCreate ? onCreate(req.body) : req.body
    res.status(201).json(s.create(doc))
  })

  router.put('/:id', (req, res) => {
    const doc = s.update(req.params.id, req.body)
    doc ? res.json(doc) : res.status(404).json({ error: 'Not found' })
  })

  router.delete('/:id', (req, res) => {
    s.remove(req.params.id)
      ? res.status(204).end()
      : res.status(404).json({ error: 'Not found' })
  })

  return router
}
