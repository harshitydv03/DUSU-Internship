import { useState, useMemo } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'

// Illustrative dummy/draft data taken directly from "Services and Initiatives" document
const CHRONICLE_DATA = [
  // --- Era 1: Founding & Making of a Democracy (1949 - 1990) ---
  {
    era: '1949-1990',
    eraTitle: 'Founding & the Making of a Democracy',
    core: 'Service',
    year: '1947',
    title: 'Provisional Committee Formed',
    desc: "Under V.K.R.V. Rao, then head of DU's Economics Department, presidents of college unions draft the DUSU constitution, setting up a unified central body."
  },
  {
    era: '1949-1990',
    eraTitle: 'Founding & the Making of a Democracy',
    core: 'Initiative',
    year: '1942',
    title: 'Roots in the Quit India Movement',
    desc: 'Students of Hindu, St. Stephen\'s, and Indraprastha College mobilise college-to-college for the release of jailed leaders, setting the activist precedent.'
  },
  {
    era: '1949-1990',
    eraTitle: 'Founding & the Making of a Democracy',
    core: 'Service',
    year: '9 Apr 1949',
    title: 'DUSU Inaugurated by PM Nehru',
    desc: 'Prime Minister Jawaharlal Nehru formally inaugurates the Union, establishing it as Delhi University\'s central representative body.'
  },
  {
    era: '1949-1990',
    eraTitle: 'Founding & the Making of a Democracy',
    core: 'Service',
    year: '1973',
    title: 'Direct Election Adopted',
    desc: 'DU moves from indirect elections (college councillors electing leaders) to the democratic "one student, one vote" direct ballot system.'
  },
  {
    era: '1949-1990',
    eraTitle: 'Founding & the Making of a Democracy',
    core: 'Initiative',
    year: '1975',
    title: 'Democratic Emergency Protests',
    desc: 'Under the presidency of Arun Jaitley, the Union organises peaceful protests upholding student representation, leading to Jaitley\'s arrest under MISA.'
  },

  // --- Era 2: Reservation & Realignment (1990 - 1999) ---
  {
    era: '1990-1999',
    eraTitle: 'Reservation, Reckoning & Realignment',
    core: 'Initiative',
    year: '1990',
    title: 'Student Mobilisation on Reservation',
    desc: 'The implementation of the Mandal Commission OBC quota triggers massive debates and rallies across campus, placing DUSU in the national spotlight.'
  },
  {
    era: '1990-1999',
    eraTitle: 'Reservation, Reckoning & Realignment',
    core: 'Service',
    year: '1991',
    title: 'Rajiv Goswami Elected President',
    desc: 'Emerging as a leading voice during the quota debates, Rajiv Goswami is elected president, representing a shift in campus alignment.'
  },
  {
    era: '1990-1999',
    eraTitle: 'Reservation, Reckoning & Realignment',
    core: 'Service',
    year: 'Mid-1990s',
    title: 'Women Safety & Facilities Advocacy',
    desc: 'DUSU petitions the university administration successfully to extend safety lighting, improve path safety, and establish common rooms.'
  },

  // --- Era 3: Reform, Reach & Modern Union (2000 - 2024) ---
  {
    era: '2000-2024',
    eraTitle: 'Reform, Reach & the Modern Union',
    core: 'Service',
    year: '2006',
    title: 'Lyngdoh Committee Guidelines Adopted',
    desc: 'Lyngdoh rules are adopted to reform campus polls, introducing strict budget limits, age criteria, and restrictions on campaign methods.'
  },
  {
    era: '2000-2024',
    eraTitle: 'Reform, Reach & the Modern Union',
    core: 'Initiative',
    year: '2020-21',
    title: 'COVID-19 Student Relief Drive',
    desc: 'During the pandemic, DUSU coordinates student aid distribution, library/exam extension advocacy, and rent relief support for outstation students.'
  },
  {
    era: '2000-2024',
    eraTitle: 'Reform, Reach & the Modern Union',
    core: 'Initiative',
    year: '2022-24',
    title: 'North Campus Safety Initiatives',
    desc: 'Advocated for night patrolling, smart street lights, and shuttle services to improve mobility and safety for student residents.'
  }
]

const ERAS = [
  { id: '1949-1990', label: '1949 – 1990', subtitle: 'Founding & Democracy' },
  { id: '1990-1999', label: '1990 – 1999', subtitle: 'Reckoning & Quotas' },
  { id: '2000-2024', label: '2000 – 2024', subtitle: 'Modern Reform & Scaling' }
]

export default function HistoryMandate() {
  const [activeEra, setActiveEra] = useState('1949-1990')
  const [activeCore, setActiveCore] = useState('All') // 'All' | 'Service' | 'Initiative'

  // Filter items based on selected Era and Core Area
  const filteredItems = useMemo(() => {
    return CHRONICLE_DATA.filter(item => {
      const matchEra = item.era === activeEra
      const matchCore = activeCore === 'All' || item.core === activeCore
      return matchEra && matchCore
    })
  }, [activeEra, activeCore])

  return (
    <>
      <PageHeader
        crumb="About DUSU"
        title="History & Initiatives"
        lede="A chronicle of the Delhi University Students' Union across seven decades of student representation."
      />

      <section className="section" style={{ background: 'var(--bg, #fafafa)', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: 960 }}>

          {/* Era Tabs Row */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16, marginBottom: 40 }}>
            {ERAS.map((era) => {
              const isActive = activeEra === era.id
              return (
                <button
                  key={era.id}
                  onClick={() => setActiveEra(era.id)}
                  style={{
                    background: isActive ? 'var(--accent)' : 'var(--surface)',
                    color: isActive ? '#fff' : 'var(--text)',
                    border: '1px solid var(--border)',
                    borderRadius: 12,
                    padding: '16px 20px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    boxShadow: isActive ? '0 8px 20px rgba(124, 29, 46, 0.15)' : 'none',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <span style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', opacity: isActive ? 0.8 : 0.6, letterSpacing: '0.05em', marginBottom: 4 }}>
                    {era.subtitle}
                  </span>
                  <span style={{ fontSize: '1.15rem', fontWeight: 800 }}>
                    {era.label}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Core Toggle Row */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 35 }}>
            <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', padding: 4, borderRadius: 30, display: 'inline-flex', gap: 4 }}>
              {[
                { id: 'All', label: '📖 Show All' },
                { id: 'Service', label: '🛠️ Union Service & Welfare' },
                { id: 'Initiative', label: '🔥 Campaigns & Movements' }
              ].map(tab => {
                const isActive = activeCore === tab.id
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveCore(tab.id)}
                    style={{
                      border: 'none',
                      background: isActive ? 'var(--accent)' : 'transparent',
                      color: isActive ? '#fff' : 'var(--text)',
                      borderRadius: 24,
                      padding: '8px 20px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.15s'
                    }}
                  >
                    {tab.label}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Timeline Stream */}
          <div style={{ position: 'relative', paddingLeft: 32 }}>
            {/* Center line decoration */}
            <div style={{ position: 'absolute', top: 0, bottom: 0, left: 11, width: 2, background: 'var(--border)' }} />

            {filteredItems.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem 2rem', color: 'var(--muted)', background: 'var(--surface)', borderRadius: 12, border: '1px solid var(--border)' }}>
                No chronicle entries match the active filters. Try checking "Show All".
              </div>
            ) : (
              filteredItems.map((item, idx) => {
                const isService = item.core === 'Service'
                return (
                  <div key={idx} className="timeline-item" style={{ position: 'relative', marginBottom: 35 }}>
                    {/* Circle Node */}
                    <div style={{
                      position: 'absolute',
                      left: -28,
                      top: 4,
                      width: 14,
                      height: 14,
                      borderRadius: '50%',
                      background: isService ? '#0077b6' : '#d62828',
                      border: '3px solid var(--surface)',
                      boxShadow: '0 0 0 3px var(--border)',
                      zIndex: 3
                    }} />

                    {/* Timeline Card */}
                    <div style={{
                      background: 'var(--surface)',
                      borderRadius: 12,
                      border: '1px solid var(--border)',
                      padding: '20px 24px',
                      boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12, marginBottom: 8 }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)' }}>
                          {item.year}
                        </span>
                        <span style={{
                          fontSize: '0.72rem',
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          padding: '3px 10px',
                          borderRadius: 20,
                          background: isService ? 'rgba(0, 119, 182, 0.1)' : 'rgba(214, 40, 40, 0.1)',
                          color: isService ? '#0077b6' : '#d62828'
                        }}>
                          {isService ? '🛠️ Service / Welfare' : '🔥 Initiative / Campaign'}
                        </span>
                      </div>

                      <h3 style={{ margin: '0 0 10px 0', fontSize: '1.15rem', color: 'var(--heading)' }}>
                        {item.title}
                      </h3>

                      <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text)', lineHeight: 1.6 }}>
                        {item.desc}
                      </p>
                    </div>
                  </div>
                )
              })
            )}
          </div>

        </div>
      </section>
    </>
  )
}
