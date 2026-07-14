import PageHeader from '../../components/common/PageHeader.jsx'

export default function HostelPGInfo() {
  return (
    <>
      <PageHeader
        crumb="Student Services"
        title="Hostel / PG Information"
        lede="Accommodation options available to University of Delhi students."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 820 }}>

          <h2>University Hostels</h2>
          <p style={{ color: 'var(--text)', lineHeight: 1.8 }}>
            The University of Delhi operates several hostels across North and South Campus for
            undergraduate and postgraduate students. Allotment is based on merit-cum-means criteria.
          </p>

          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', marginTop: '1.5rem' }}>
            {[
              { name: 'International Students House', campus: 'North Campus', type: 'Co-ed', icon: '🏠' },
              { name: 'Gwyer Hall', campus: 'North Campus', type: 'Men\'s Hostel', icon: '🏠' },
              { name: 'Jubilee Hall', campus: 'North Campus', type: 'Men\'s Hostel', icon: '🏠' },
              { name: 'Rudra North Hostel', campus: 'North Campus', type: 'Men\'s Hostel', icon: '🏠' },
              { name: 'DU South Campus Hostel', campus: 'South Campus', type: 'Mixed', icon: '🏠' },
            ].map((h) => (
              <div key={h.name} style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderRadius: 12, padding: '1.2rem 1.4rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}>
                <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>{h.icon}</div>
                <h3 style={{ margin: '0 0 4px', fontSize: '0.95rem', color: 'var(--heading)' }}>{h.name}</h3>
                <p style={{ margin: 0, fontSize: '0.83rem', color: 'var(--muted)' }}>{h.campus} · {h.type}</p>
              </div>
            ))}
          </div>

          <h2 style={{ marginTop: '2.5rem' }}>PG / Off-Campus Accommodation</h2>
          <p style={{ color: 'var(--text)', lineHeight: 1.8 }}>
            Students who do not get hostel allotment often seek Paying Guest (PG) accommodation
            in areas such as Kamla Nagar, Hudson Lane, GTB Nagar, and Hauz Khas. DUSU recommends
            verifying safety, rent agreements, and landlord credentials before signing up.
          </p>
          <a
            href="https://accommodation.uod.ac.in"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '10px 22px', background: 'var(--accent)', color: '#fff',
              borderRadius: 8, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
              marginTop: '1rem',
            }}
          >
            🔗 DU Accommodation Portal
          </a>
        </div>
      </section>
    </>
  )
}
