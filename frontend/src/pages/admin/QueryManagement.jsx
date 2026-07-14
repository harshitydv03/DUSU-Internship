import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import { QUERY_STORAGE_KEY } from '../../utils/constants.js'

export default function QueryManagement() {
  const queries = JSON.parse(localStorage.getItem(QUERY_STORAGE_KEY) || '[]')

  return (
    <div className="container admin-layout">
      <AdminSidebar />
      <div>
        <h1 style={{ marginBottom: 6 }}>Query Management</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 26 }}>
          Grievances filed through the portal. Currently showing queries stored in this browser;
          the backend will centralise these.
        </p>
        {queries.length === 0 ? (
          <div className="card">
            <p>No queries filed from this browser yet.</p>
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
                    <td><span className="badge green">{q.status}</span></td>
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
