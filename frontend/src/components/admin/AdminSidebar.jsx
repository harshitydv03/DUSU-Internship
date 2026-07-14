import { NavLink, useNavigate } from 'react-router-dom'
import { TOKEN_KEY } from '../../utils/apiClient.js'

const LINKS = [
  { to: '/admin', label: '📊 Dashboard', end: true },
  { to: '/admin/content', label: '📝 Content Management' },
  { to: '/admin/queries', label: '📋 Query Management' },
  { to: '/admin/users', label: '👥 Users & Roles' },
  { to: '/admin/settings', label: '⚙️ Settings & Audit Log' },
]

export default function AdminSidebar() {
  const navigate = useNavigate()
  const username = localStorage.getItem('dusu_admin_user') || 'admin'

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem('dusu_admin_user')
    navigate('/admin/login')
  }

  return (
    <aside className="admin-sidebar">
      <h3>Admin Panel</h3>
      {LINKS.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.end}>
          {l.label}
        </NavLink>
      ))}
      <div style={{ borderTop: '1px solid var(--line)', marginTop: 12, paddingTop: 12 }}>
        <span style={{ display: 'block', padding: '0 12px 8px', fontSize: '0.82rem', color: 'var(--muted)' }}>
          Signed in as <strong>{username}</strong>
        </span>
        <button
          onClick={logout}
          className="btn btn-outline"
          style={{ width: '100%', justifyContent: 'center', padding: '8px 12px', fontSize: '0.88rem' }}
        >
          Log out
        </button>
      </div>
    </aside>
  )
}
