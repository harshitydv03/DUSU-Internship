import { useState } from 'react'
import apiClient from '../../utils/apiClient.js'
import { QUERY_STORAGE_KEY } from '../../utils/constants.js'

const STAGES = ['Submitted', 'Under Review', 'In Progress', 'Resolved']

export default function QueryTracker() {
  const [refId, setRefId] = useState('')
  const [result, setResult] = useState(null)
  const [notFound, setNotFound] = useState(false)

  const search = async (e) => {
    e.preventDefault()
    const wanted = refId.trim()
    let match = null
    try {
      const found = await apiClient.get(`/queries?refId=${encodeURIComponent(wanted)}`)
      match = found[0] || null
    } catch {
      // backend offline — check queries saved in this browser
    }
    if (!match) {
      const all = JSON.parse(localStorage.getItem(QUERY_STORAGE_KEY) || '[]')
      match = all.find((q) => q.refId.toLowerCase() === wanted.toLowerCase()) || null
    }
    setResult(match)
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
          No query found with that reference ID. Check for typos — the format is
          DUSU-YYYY-XXXXXX.
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

          {result.replies?.length > 0 && (
            <div style={{ marginTop: 28 }}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', marginBottom: 4 }}>
                Replies from the DUSU team
              </h3>
              {result.replies.map((r, i) => (
                <div className="reply-bubble" key={i}>
                  {r.message}
                  <div className="reply-meta">
                    — DUSU team, {new Date(r.at).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
