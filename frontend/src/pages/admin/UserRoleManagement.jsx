import AdminSidebar from '../../components/admin/AdminSidebar.jsx'

const ROLES = [
  { role: 'Super Admin', access: 'Full access — settings, users, all content and queries' },
  { role: 'Content Editor', access: 'Create and edit notices, events, gallery and pages' },
  { role: 'Query Officer', access: 'View, assign and resolve student grievances' },
  { role: 'Viewer', access: 'Read-only access to dashboards and reports' },
]

export default function UserRoleManagement() {
  return (
    <div className="container admin-layout">
      <AdminSidebar />
      <div>
        <h1 style={{ marginBottom: 6 }}>Users &amp; Roles</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 26 }}>
          Planned role model for the admin panel. User accounts arrive with backend auth.
        </p>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Role</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
              {ROLES.map((r) => (
                <tr key={r.role}>
                  <td style={{ fontWeight: 600 }}>{r.role}</td>
                  <td>{r.access}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
