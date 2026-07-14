import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import AdminStats from '../../components/admin/AdminStats.jsx'

export default function AdminDashboardAnalytics() {
  return (
    <div className="container admin-layout">
      <AdminSidebar />
      <div>
        <h1 style={{ marginBottom: 6 }}>Dashboard</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 26 }}>
          Overview of portal activity, live from the backend API.
        </p>
        <AdminStats />
        <div className="alert" style={{ marginTop: 30, background: 'var(--accent-soft)', border: '1px solid #eeddb5', color: '#8a6414' }}>
          🔒 Authentication is not set up yet — this panel is a UI preview. Login and role-based
          access will be added along with the backend.
        </div>
      </div>
    </div>
  )
}
