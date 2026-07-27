import { useState, useEffect, useMemo } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Icon from '../../components/Icon.jsx'
import apiClient from '../../utils/apiClient.js'

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

const DEFAULT_ALUMNI = [
  { name: "Arun Jaitley", term: "1974–1975", post: "President", party: "ABVP", initials: "AJ", majorPosts: ["Union Minister of Finance", "Minister of Corporate Affairs", "Minister of Defence & Law", "Leader of the House, Rajya Sabha"], keyWorks: ["Led key anti-Emergency student activism during the JP Movement.", "Primary architect of the nationwide Goods & Services Tax (GST) rollout.", "Enacted the Insolvency & Bankruptcy Code (IBC)."] },
  { name: "Rekha Gupta", term: "1996–1997", post: "President", party: "ABVP", initials: "RG", majorPosts: ["Chief Minister of Delhi", "Member of Legislative Assembly (Shalimar Bagh)", "General Secretary, BJP Delhi State"], keyWorks: ["Driven extensive civic and municipal infrastructure overhauls across Delhi.", "Spearheaded urban development initiatives and women's empowerment programs."] },
  { name: "Ajay Maken", term: "1985–1986", post: "President", party: "NSUI", initials: "AM", majorPosts: ["Union Cabinet Minister for Housing & Urban Poverty Alleviation", "Union MoS (Independent Charge) for Youth Affairs & Sports", "Speaker, Delhi Legislative Assembly"], keyWorks: ["Introduced key urban housing reforms and slum rehabilitation schemes.", "Managed national sports administration and infrastructure modernization."] },
  { name: "Vijay Goel", term: "1977–1978", post: "President", party: "ABVP", initials: "VG", majorPosts: ["Minister of State for Parliamentary Affairs", "Minister of Youth Affairs & Sports", "3-Term Member of Parliament (Lok Sabha & Rajya Sabha)"], keyWorks: ["Spearheaded youth mobilization campaigns and heritage conservation projects.", "Founded social initiatives including the \"Toy Bank\" for underprivileged children."] },
  { name: "Alka Lamba", term: "1995–1996", post: "President", party: "NSUI", initials: "AL", majorPosts: ["President, All India Mahila Congress", "Member of Legislative Assembly (Chandni Chowk)", "National Spokesperson, INC"], keyWorks: ["Advocated extensively for youth rights and women's political representation.", "Led local community safety, education and sanitation programs in Delhi."] },
  { name: "Vijender Gupta", term: "1984–1985", post: "Vice President", party: "ABVP", initials: "VG", majorPosts: ["Speaker, Delhi Legislative Assembly", "Leader of Opposition, Delhi Legislative Assembly", "President, Delhi State BJP"], keyWorks: ["Spearheaded public utility accountability campaigns in municipal governance.", "Maintained strong legislative oversight on municipal budgets and urban affairs."] },
  { name: "Nupur Sharma", term: "2008–2009", post: "President", party: "ABVP", initials: "NS", majorPosts: ["National Spokesperson, BJP", "Executive Member, Bharatiya Janata Yuva Morcha (BJYM)"], keyWorks: ["Prominent voice in national political discourse and media debates.", "Organized student youth outreach and campaign programs across campuses."] },
  { name: "Anil Jha Vats", term: "1997–1998", post: "President", party: "ABVP", initials: "AJ", majorPosts: ["Member of Legislative Assembly (Kirari)", "Deputy Leader of Opposition, Delhi Assembly"], keyWorks: ["Championed regularization and basic infrastructure for Outer Delhi unauthorized colonies.", "Led public advocacy for clean drinking water and road network access in suburban areas."] },
  { name: "Aprajita Thakur", term: "2023–2024", post: "Secretary", party: "ABVP", initials: "AT", majorPosts: ["Secretary, Delhi University Students' Union (DUSU)", "Youth Leader & Student Representative"], keyWorks: ["Won the 2023 DUSU Secretary election representing ABVP.", "Advocated for student welfare, campus infrastructure, and women's safety & health initiatives across DU."] }
]

export default function HistoryMandate() {
  const [activeEra, setActiveEra] = useState('1949-1990')
  const [activeCore, setActiveCore] = useState('All') // 'All' | 'Service' | 'Initiative'
  const [alumniList, setAlumniList] = useState([])

  useEffect(() => {
    apiClient.get('/alumni')
      .then(data => {
        if (data && data.length > 0) setAlumniList(data)
      })
      .catch(() => {})
  }, [])

  const alumni = alumniList.length > 0 ? alumniList : DEFAULT_ALUMNI

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
          <div style={{ position: 'relative', paddingLeft: 32, marginBottom: '5rem' }}>
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

          {/* Prominent Alumni & Leadership Legacy */}
          <div style={{ paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ marginBottom: '1.8rem', textAlign: 'center' }}>
              <span className="badge" style={{ marginBottom: 8, display: 'inline-block' }}>Leadership Legacy</span>
              <h2 style={{ fontSize: '1.8rem', margin: 0, color: 'var(--heading)' }}>Prominent DUSU Alumni & Past Leaders</h2>
              <p style={{ fontSize: '0.92rem', color: 'var(--muted)', marginTop: 6 }}>
                Former DUSU office bearers who emerged from campus democracy to serve in prominent national leadership roles.
              </p>
            </div>

            <div style={{ display: 'grid', gap: 20, gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))' }}>
              {alumni.map((alum, idx) => (
                <div key={idx} style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: '1.4rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                    <div style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      background: 'var(--primary-soft)',
                      color: 'var(--primary)',
                      fontWeight: 700,
                      fontSize: '1rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {alum.initials || alum.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--heading)' }}>{alum.name}</h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 2 }}>
                        {alum.post} ({alum.term}) {alum.party ? `• ${alum.party}` : ''}
                      </div>
                    </div>
                  </div>

                  {alum.majorPosts && alum.majorPosts.length > 0 && (
                    <div style={{ marginBottom: 12 }}>
                      <div style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: 700, letterSpacing: '0.5px', marginBottom: 4 }}>
                        Key Positions
                      </div>
                      <ul style={{ margin: 0, paddingLeft: 18, fontSize: '0.84rem', color: 'var(--text)', lineHeight: 1.4 }}>
                        {alum.majorPosts.map((mp, i) => (
                          <li key={i}>{mp}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {alum.keyWorks && alum.keyWorks.length > 0 && (
                    <div style={{ marginTop: 'auto', paddingTop: 10, borderTop: '1px solid var(--border)' }}>
                      <div style={{ fontSize: '0.76rem', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.5px', marginBottom: 4 }}>
                        Notable Contributions
                      </div>
                      <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                        {alum.keyWorks.join(' ')}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}

