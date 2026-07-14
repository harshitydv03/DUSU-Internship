import PageHeader from '../../components/common/PageHeader.jsx'

export default function HealthServices() {
  return (
    <>
      <PageHeader
        crumb="Student Services"
        title="Health Services — WUS"
        lede="The Wellness & University Health Service (WUS) provides free medical care to all registered DU students."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>

          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '2rem 2.4rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)', marginBottom: 28,
          }}>
            <h2 style={{ marginTop: 0 }}>About WUS</h2>
            <p style={{ lineHeight: 1.8, color: 'var(--text)' }}>
              The University Health Service (WUS) is DU's in-house health centre offering free
              outpatient care, specialist consultations, and emergency first aid to students, staff,
              and their dependants. It operates at multiple locations across the university campus.
            </p>
          </div>

          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
            {[
              { label: '📍 Location', value: 'Near University Stadium, North Campus' },
              { label: '🕐 OPD Hours', value: 'Mon – Sat: 8 AM – 8 PM' },
              { label: '🚨 Emergency', value: '24×7 emergency facility available' },
              { label: '💊 Pharmacy', value: 'Subsidised medicines on prescription' },
              { label: '🩺 Specialists', value: 'Physician, Dentist, Eye specialists & more' },
              { label: '📞 Contact', value: '+91-11-2766-7011 (sample)' },
            ].map(({ label, value }) => (
              <div key={label} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '1.2rem 1.4rem',
              }}>
                <div style={{ fontWeight: 700, marginBottom: 6, color: 'var(--heading)', fontSize: '0.9rem' }}>{label}</div>
                <div style={{ color: 'var(--muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>{value}</div>
              </div>
            ))}
          </div>

          <a
            href="https://wus.uod.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 22px', background: 'var(--accent)', color: '#fff',
              borderRadius: 8, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
              marginTop: '1.5rem',
            }}
          >
            🔗 WUS Official Site
          </a>
        </div>
      </section>
    </>
  )
}
