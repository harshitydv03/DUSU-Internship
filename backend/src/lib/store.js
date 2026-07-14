import { db } from '../config/db.js'

const parse = (row) => row && { id: row.id, createdAt: row.created_at, ...JSON.parse(row.data) }

// Generic data access for one table. Filters map query params to JSON fields:
// list({ status: 'Submitted' }) → WHERE json_extract(data,'$.status') = 'Submitted'
export function store(table) {
  return {
    list(filters = {}) {
      const keys = Object.keys(filters).filter((k) => /^\w+$/.test(k))
      const where = keys.length
        ? 'WHERE ' + keys.map((k) => `json_extract(data, '$.${k}') = ?`).join(' AND ')
        : ''
      return db
        .prepare(`SELECT * FROM ${table} ${where} ORDER BY id DESC`)
        .all(...keys.map((k) => filters[k]))
        .map(parse)
    },
    get(id) {
      return parse(db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(id))
    },
    create(doc) {
      const { lastInsertRowid } = db
        .prepare(`INSERT INTO ${table} (data) VALUES (?)`)
        .run(JSON.stringify(doc))
      return this.get(lastInsertRowid)
    },
    update(id, patch) {
      const current = this.get(id)
      if (!current) return null
      const { id: _, createdAt: __, ...merged } = { ...current, ...patch }
      db.prepare(`UPDATE ${table} SET data = ? WHERE id = ?`).run(JSON.stringify(merged), id)
      return this.get(id)
    },
    remove(id) {
      return db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(id).changes > 0
    },
  }
}
