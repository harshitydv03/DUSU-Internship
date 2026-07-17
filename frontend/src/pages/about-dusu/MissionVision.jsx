import PageHeader from '../../components/common/PageHeader.jsx'
import Icon from '../../components/Icon.jsx'

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
          <ul style={{ listStyleType: 'none', paddingLeft: 0, marginTop: '1.2rem', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { text: 'Inclusivity — representing all 300,000+ students of DU', icon: 'Users' },
              { text: 'Democracy — free, fair elections guided by Lyngdoh Committee norms', icon: 'Clipboard' },
              { text: 'Accountability — transparent functioning and open grievance systems', icon: 'Shield' },
              { text: 'Service — putting student welfare above all else', icon: 'Heart' },
            ].map(({ text, icon }) => (
              <li key={icon} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: '1rem', color: 'var(--text)', lineHeight: 1.6 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, borderRadius: '50%', background: 'var(--primary-soft)', color: 'var(--primary)', flexShrink: 0 }}>
                  <Icon name={icon} size={16} />
                </div>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
