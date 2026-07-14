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
          <h2 style={{ marginTop: '2rem' }}>Our Vision</h2>
          <p>
            A University of Delhi where every student — regardless of background, faith, or field of
            study — has equal access to quality education, a safe campus environment, fair
            administrative processes, and meaningful opportunities for personal and professional growth.
          </p>
          <h2 style={{ marginTop: '2rem' }}>Core Values</h2>
          <ul style={{ lineHeight: 2 }}>
            <li>🤝 Inclusivity — representing all 300,000+ students of DU</li>
            <li>🗳️ Democracy — free, fair elections guided by Lyngdoh Committee norms</li>
            <li>📢 Accountability — transparent functioning and open grievance systems</li>
            <li>🌱 Service — putting student welfare above all else</li>
          </ul>
        </div>
      </section>
    </>
  )
}
