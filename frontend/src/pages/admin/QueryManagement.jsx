import { Fragment, useEffect, useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import apiClient from '../../utils/apiClient.js'

const STATUSES = ['Submitted', 'Under Review', 'In Progress', 'Resolved']

export default function QueryManagement() {
  const [queries, setQueries] = useState([])
  const [error, setError] = useState('')
  const [openId, setOpenId] = useState(null)
  const [reply, setReply] = useState('')

  const load = () =>
    apiClient
      .get('/queries')
      .then(setQueries)
      .catch(() => setError('Could not load queries — is the backend running?'))

  useEffect(() => {
    load()
  }, [])

  const act = (promise) =>
    promise.then(load).catch(() => setError('Action failed — your session may have expired. Log in again.'))

  const setStatus = (id, status) => act(apiClient.put(`/queries/${id}`, { status }))

  const sendReply = (id) => {
    if (!reply.trim()) return
    act(apiClient.post(`/queries/${id}/replies`, { message: reply }).then(() => setReply('')))
  }

  return (
    <div className="container admin-layout">
      <AdminSidebar />
      <div>
        <h1 style={{ marginBottom: 6 }}>Query Management</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 26 }}>
          Click a query to see its details, change its status or send a reply to the student.
        </p>
        {error && <div className="alert alert-error">{error}</div>}
        {queries.length === 0 ? (
          <div className="card">
            <p>No queries filed yet.</p>
          </div>
        ) : (
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Ref ID</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Replies</th>
                  <th>Filed</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((q) => (
                  <Fragment key={q.refId}>
                    <tr onClick={() => setOpenId(openId === q.id ? null : q.id)} style={{ cursor: 'pointer' }}>
                      <td style={{ fontWeight: 600 }}>{q.refId}</td>
                      <td>{q.subject}</td>
                      <td>
                        <select
                          value={q.status}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => setStatus(q.id, e.target.value)}
                          style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid var(--line)' }}
                        >
                          {STATUSES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      </td>
                      <td>{q.replies?.length || 0}</td>
                      <td>{new Date(q.createdAt).toLocaleDateString('en-IN')}</td>
                    </tr>
                    {openId === q.id && (
                      <tr>
                        <td colSpan={5} style={{ background: 'var(--bg)' }}>
                          <p style={{ fontSize: '0.85rem', color: 'var(--muted)', marginBottom: 4 }}>
                            {q.name} · {q.email} · {q.college} · {q.category}
                          </p>
                          <p style={{ marginBottom: 14 }}>{q.details}</p>

                          {(q.replies || []).map((r, i) => (
                            <div className="reply-bubble" key={i}>
                              {r.message}
                              <div className="reply-meta">
                                — {r.by}, {new Date(r.at).toLocaleString('en-IN')}
                              </div>
                            </div>
                          ))}

                          <div style={{ display: 'flex', gap: 10, marginTop: 14 }}>
                            <input
                              value={reply}
                              onChange={(e) => setReply(e.target.value)}
                              placeholder="Write a reply to the student…"
                              style={{ flex: 1, padding: '10px 14px', borderRadius: 8, border: '1px solid var(--line)' }}
                            />
                            <button className="btn btn-primary" onClick={() => sendReply(q.id)}>
                              Send reply
                            </button>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
