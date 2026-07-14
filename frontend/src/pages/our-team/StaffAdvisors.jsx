import PageHeader from '../../components/common/PageHeader.jsx'

export default function StaffAdvisors() {
  return (
    <>
      <PageHeader
        crumb="Administration"
        title="Staff Advisors"
        lede="Faculty members appointed by the University to guide and advise the Students' Union."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '2rem 2.4rem',
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
          }}>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8 }}>
              Staff Advisors are senior faculty members nominated by the University of Delhi to
              provide institutional oversight and guidance to DUSU. They serve as a liaison between
              the student union and the University administration.
            </p>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem', marginTop: '1rem' }}>
              ⚠️ The list of Staff Advisors for the 2026–27 session will be updated here once
              officially communicated.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
