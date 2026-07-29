import PageHeader from '../../components/common/PageHeader.jsx'

export default function MissionVision() {
  return (
    <>
      <PageHeader
        crumb="About DUSU"
        title="Mission & Vision"
        lede="The principles and goals that guide the Delhi University Students' Union."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <h2>Our Mission</h2>
          <p>
            DUSU's mission is to represent, protect and advance the interests of every student
            enrolled in the University of Delhi — ensuring their voices are heard by the University
            administration, government bodies, and the wider public.
          </p>
          <h2 style={{ marginTop: '2.5rem' }}>Our Vision</h2>
          <p>
            A University of Delhi where every student — regardless of background, faith, or field of
            study — has equal access to quality education, a safe campus environment, fair
            administrative processes, and meaningful opportunities for personal and professional growth.
          </p>
          <h2 style={{ marginTop: '2.5rem' }}>Core Values</h2>
          <ul style={{ paddingLeft: '1.2rem', marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[
              'Inclusivity — representing all 300,000+ students of DU',
              'Democracy — free, fair elections guided by Lyngdoh Committee norms',
              'Accountability — transparent functioning and open grievance systems',
              'Service — putting student welfare above all else',
            ].map((text) => (
              <li key={text} style={{ fontSize: '1rem', color: 'var(--text)', lineHeight: 1.6 }}>
                {text}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
