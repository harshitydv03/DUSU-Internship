import { useEffect, useState } from 'react'
import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import apiClient from '../../utils/apiClient.js'
import { QUERY_STORAGE_KEY } from '../../utils/constants.js'

const STATUSES = ['Submitted', 'Under Review', 'In Progress', 'Resolved']

export default function QueryManagement() {
  const [queries, setQueries] = useState([])
  const [source, setSource] = useState('api')

  const load = () =>
    apiClient
      .get('/queries')
      .then(setQueries)
      .catch(() => {
        setSource('local')
        setQueries(JSON.parse(localStorage.getItem(QUERY_STORAGE_KEY) || '[]'))
      })

  useEffect(() => {
    load()
  }, [])

  const setStatus = (id, status) =>
    apiClient.put(`/queries/${id}`, { status }).then(load)

  return (
    <div className="container admin-layout">
      <AdminSidebar />
      <div>
        <h1 style={{ marginBottom: 6 }}>Query Management</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 26 }}>
          {source === 'api'
            ? 'Grievances filed through the portal, live from the backend API.'
            : 'Backend offline — showing queries stored in this browser.'}
        </p>
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
                  <th>Category</th>
                  <th>Status</th>
                  <th>Filed</th>
                </tr>
              </thead>
              <tbody>
                {queries.map((q) => (
                  <tr key={q.refId}>
                    <td style={{ fontWeight: 600 }}>{q.refId}</td>
                    <td>{q.subject}</td>
                    <td>{q.category}</td>
                    <td>
                      {source === 'api' ? (
                        <select
                          value={q.status}
                          onChange={(e) => setStatus(q.id, e.target.value)}
                          style={{ padding: '4px 8px', borderRadius: 6, border: '1px solid var(--line)' }}
                        >
                          {STATUSES.map((s) => (
                            <option key={s}>{s}</option>
                          ))}
                        </select>
                      ) : (
                        <span className="badge green">{q.status}</span>
                      )}
                    </td>
                    <td>{new Date(q.createdAt).toLocaleDateString('en-IN')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
