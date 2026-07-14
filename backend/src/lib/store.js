import { getModel } from '../config/db.js'

// Maps a Mongoose document to the flat shape the API returns.
// _id (ObjectId) → id (string), created_at preserved, data fields spread.
const parse = (doc) =>
  doc && { id: doc._id.toString(), createdAt: doc.created_at, ...doc.data }

// Generic async data access for one collection.
// Filters map query params to top-level fields inside `data`:
//   list({ status: 'Submitted' }) → find({ 'data.status': 'Submitted' })
export function store(table) {
  const Model = getModel(table)
  return {
    async list(filters = {}) {
      const query = {}
      for (const [k, v] of Object.entries(filters)) {
        if (/^\w+$/.test(k)) query[`data.${k}`] = v
      }
      // Colleges are sorted alphabetically by name; everything else by insertion order (newest first).
      const sortField = table === 'colleges' ? { 'data.name': 1 } : { _id: -1 }
      const docs = await Model.find(query).sort(sortField)
      return docs.map(parse)
    },

    async get(id) {
      try {
        return parse(await Model.findById(id))
      } catch {
        return null // invalid ObjectId format → treat as not found
      }
    },

    async create(doc) {
      const saved = await new Model({ data: doc }).save()
      return parse(saved)
    },

    async update(id, patch) {
      const current = await this.get(id)
      if (!current) return null
      const { id: _, createdAt: __, ...merged } = { ...current, ...patch }
      const updated = await Model.findByIdAndUpdate(
        id,
        { $set: { data: merged } },
        { new: true },
      )
      return parse(updated)
    },

    async remove(id) {
      try {
        const result = await Model.findByIdAndDelete(id)
        return result !== null
      } catch {
        return false
      }
    },
  }
}
