import PageHeader from '../../components/common/PageHeader.jsx'

export default function Handbook() {
  return (
    <>
      <PageHeader
        crumb="About DUSU"
        title="Handbook"
        lede="The official DUSU student handbook — rights, responsibilities, and procedures."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '2rem 2.4rem',
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>📖</div>
            <h2 style={{ marginBottom: '0.5rem' }}>DUSU Student Handbook</h2>
            <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>
              The handbook covers student rights, DUSU procedures, election rules, grievance
              mechanisms, and important university regulations. The 2026–27 edition will be
              uploaded here once available.
            </p>
            <a
              href="#"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '10px 24px', background: 'var(--accent)',
                color: '#fff', borderRadius: 8, fontWeight: 700,
                textDecoration: 'none', opacity: 0.6, cursor: 'not-allowed',
              }}
            >
              📥 Download PDF (Coming Soon)
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
