import PageHeader from '../../components/common/PageHeader.jsx'

const CELLS = [
  { name: 'Legal Aid Cell', icon: '⚖️', desc: 'Provides free legal guidance to students on academic, hostel, and grievance-related matters.' },
  { name: 'Women\'s Cell', icon: '👩', desc: 'Addresses gender-based issues, harassment complaints, and promotes women\'s welfare on campus.' },
  { name: 'Anti-Ragging Cell', icon: '🛡️', desc: 'Works in coordination with university authorities to prevent and address ragging incidents.' },
  { name: 'Cultural Cell', icon: '🎭', desc: 'Organises cultural festivals, debates, and inter-college competitions across DU.' },
  { name: 'Sports Cell', icon: '🏆', desc: 'Coordinates sports tournaments, inter-college meets, and liaises with the Sports Council.' },
  { name: 'SC/ST/OBC Welfare Cell', icon: '📋', desc: 'Assists students from reserved categories with scholarships, reservations, and related grievances.' },
  { name: 'Environment Cell', icon: '🌱', desc: 'Drives sustainability initiatives — tree plantation drives, waste reduction campaigns, and eco-awareness.' },
  { name: 'Media & Publications Cell', icon: '📰', desc: 'Manages DUSU communications, publications, and social media outreach.' },
]

export default function DUSUCells() {
  return (
    <>
      <PageHeader
        crumb="About DUSU"
        title="DUSU Cells"
        lede="Specialised cells within DUSU dedicated to specific student welfare areas."
      />
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {CELLS.map((cell) => (
              <div key={cell.name} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: '1.4rem 1.6rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>{cell.icon}</div>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.05rem', color: 'var(--heading)' }}>{cell.name}</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>{cell.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
