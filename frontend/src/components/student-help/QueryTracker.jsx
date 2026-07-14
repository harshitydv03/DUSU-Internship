import { useState } from 'react'
import { QUERY_STORAGE_KEY } from '../../utils/constants.js'

const STAGES = ['Submitted', 'Under Review', 'In Progress', 'Resolved']

export default function QueryTracker() {
  const [refId, setRefId] = useState('')
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const search = (e) => {
    e.preventDefault()
    const all = JSON.parse(localStorage.getItem(QUERY_STORAGE_KEY) || '[]')
    const match = all.find((q) => q.refId.toLowerCase() === refId.trim().toLowerCase())
    setResult(match || null)
    setNotFound(!match)
  }

  const stageIndex = result ? STAGES.indexOf(result.status) : -1

  return (
    <div className="form-card">
      <form onSubmit={search} style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <div className="form-field" style={{ flex: 1, minWidth: 220 }}>
          <label htmlFor="refId">Reference ID</label>
          <input
            id="refId"
            value={refId}
            onChange={(e) => setRefId(e.target.value)}
            placeholder="e.g. DUSU-2026-123456"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-end' }}>
          Track
        </button>
      </form>

      {notFound && (
        <div className="alert alert-error" style={{ marginTop: 20 }}>
          No query found with that reference ID on this device. Queries are currently stored in
          the browser they were submitted from.
        </div>
      )}

      {result && (
        <div style={{ marginTop: 26 }}>
          <span className="badge green">{result.status}</span>
          <h3 style={{ margin: '6px 0' }}>{result.subject}</h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
            {result.category} · filed on{' '}
            {new Date(result.createdAt).toLocaleDateString('en-IN', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>
          <div className="status-steps">
            {STAGES.map((s, i) => (
              <div key={s} className={`status-step${i <= stageIndex ? ' done' : ''}`}>
                {s}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
