import PageHeader from '../../components/common/PageHeader.jsx'

export default function PreranaBhawan() {
  return (
    <>
      <PageHeader
        crumb="Campuses"
        title="Prerana Bhawan"
        lede="The DUSU cultural and student activity centre at the University of Delhi."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '2rem 2.4rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          }}>
            <h2 style={{ marginTop: 0 }}>About Prerana Bhawan</h2>
            <p style={{ lineHeight: 1.8, color: 'var(--text)' }}>
              Prerana Bhawan serves as a hub for student activities, cultural events, and union
              operations at the University of Delhi. It houses meeting rooms, a multi-purpose hall,
              and various student welfare facilities managed by DUSU.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginTop: '1.5rem' }}>
              {[
                { label: 'Location', value: 'North Campus, University of Delhi', icon: '📍' },
                { label: 'Facilities', value: 'Meeting rooms, auditorium, helpdesks', icon: '🏛️' },
                { label: 'Managed by', value: 'DUSU', icon: '🎓' },
              ].map(({ label, value, icon }) => (
                <div key={label} style={{ padding: '1rem', background: 'var(--bg, #f8f8fa)', borderRadius: 10, border: '1px solid var(--border)' }}>
                  <div style={{ fontSize: '1.5rem', marginBottom: 6 }}>{icon}</div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--heading)', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
