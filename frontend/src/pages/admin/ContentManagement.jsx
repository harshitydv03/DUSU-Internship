import AdminSidebar from '../../components/admin/AdminSidebar.jsx'

const SECTIONS = [
  'News & Notices', 'Events Calendar', 'Gallery', 'Team Members',
  'Scholarships', 'Downloads & Forms', 'Milestones', 'FAQs',
]

export default function ContentManagement() {
  return (
    <div className="container admin-layout">
      <AdminSidebar />
      <div>
        <h1 style={{ marginBottom: 6 }}>Content Management</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 26 }}>
          Create, edit and publish content for every public section of the site.
        </p>
        <div className="grid-2">
          {SECTIONS.map((s) => (
            <div className="card" key={s}>
              <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1rem' }}>{s}</h3>
              <p>Editor coming soon — will connect to the backend content API.</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
