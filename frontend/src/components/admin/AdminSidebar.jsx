import { NavLink } from 'react-router-dom'

const LINKS = [
  { to: '/admin', label: '📊 Dashboard', end: true },
  { to: '/admin/content', label: '📝 Content Management' },
  { to: '/admin/queries', label: '📋 Query Management' },
  { to: '/admin/users', label: '👥 Users & Roles' },
  { to: '/admin/settings', label: '⚙️ Settings & Audit Log' },
]

export default function AdminSidebar() {
  return (
    <aside className="admin-sidebar">
      <h3>Admin Panel</h3>
      {LINKS.map((l) => (
        <NavLink key={l.to} to={l.to} end={l.end}>
          {l.label}
        </NavLink>
      ))}
    </aside>
  )
}
