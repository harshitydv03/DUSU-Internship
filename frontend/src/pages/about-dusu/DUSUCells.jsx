import { useState, useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Icon from '../../components/Icon.jsx'
import apiClient from '../../utils/apiClient.js'

// Simple helper mapper for cell icons based on name
const getIconForCell = (name) => {
  const n = name.toLowerCase()
  if (n.includes('legal') || n.includes('nyay')) return 'Scale'
  if (n.includes('women') || n.includes('swaryamsiddha')) return 'Users'
  if (n.includes('environmental') || n.includes('green') || n.includes('eco')) return 'Leaf'
  if (n.includes('welfare') || n.includes('chhatrahit')) return 'Heart'
  if (n.includes('debate') || n.includes('public speaking') || n.includes('manthan')) return 'MessageSquare'
  if (n.includes('sports') || n.includes('khelo')) return 'Trophy'
  if (n.includes('divyang') || n.includes('saksham') || n.includes('disabilit')) return 'Activity'
  if (n.includes('placement') || n.includes('rozgar')) return 'Briefcase'
  if (n.includes('media') || n.includes('publications') || n.includes('abhivyakti')) return 'Newspaper'
  if (n.includes('fine arts') || n.includes('art')) return 'Paintbrush'
  if (n.includes('alumni')) return 'Link'
  if (n.includes('international') || n.includes('global')) return 'Globe'
  if (n.includes('community') || n.includes('outreach') || n.includes('sevasetu') || n.includes('social service')) return 'HeartHandshake'
  if (n.includes('mental health') || n.includes('wellness')) return 'Smile'
  if (n.includes('ideological') || n.includes('vimarsh') || n.includes('seminar')) return 'BookOpen'
  if (n.includes('hostel')) return 'Home'
  if (n.includes('pg')) return 'School'
  if (n.includes('fashion') || n.includes('vogue')) return 'Sparkles'
  if (n.includes('language') || n.includes('bhasha')) return 'Languages'
  if (n.includes('cultural') || n.includes('sanskriti')) return 'Music'
  if (n.includes('academic') || n.includes('gyan')) return 'GraduationCap'
  if (n.includes('innovation') || n.includes('tech')) return 'Cpu'
  if (n.includes('ai') || n.includes('brain')) return 'Brain'
  if (n.includes('research') || n.includes('tarkshakti')) return 'Search'
  if (n.includes('startup') || n.includes('entrepreneur')) return 'TrendingUp'
  if (n.includes('diversity') || n.includes('sangam')) return 'Users'
  if (n.includes('film') || n.includes('reel')) return 'Camera'
  if (n.includes('theatre') || n.includes('rangmanch')) return 'Theater'
  return 'Star' // fallback
}

export default function DUSUCells() {
  const [cells, setCells] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.get('/dusucells')
      .then((data) => {
        if (data && data.length > 0) {
          setCells(data)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch cells:', err)
        setLoading(false)
      })
  }, [])

  // Use seeded cells or fallback to pre-seeded static cells if API is empty/loading
  const cellsList = cells.length > 0 ? cells : [
    { name: 'Legal Aid Cell', about: 'Provides free legal guidance to students on academic, hostel, and grievance-related matters.' },
    { name: 'Women\'s Cell', about: 'Addresses gender-based issues, harassment complaints, and promotes women\'s welfare on campus.' },
    { name: 'Anti-Ragging Cell', about: 'Works in coordination with university authorities to prevent and address ragging incidents.' },
    { name: 'Cultural Cell', about: 'Organises cultural festivals, debates, and inter-college competitions across DU.' },
    { name: 'Sports Cell', about: 'Coordinates sports tournaments, inter-college meets, and liaises with the Sports Council.' },
    { name: 'SC/ST/OBC Welfare Cell', about: 'Assists students from reserved categories with scholarships, reservations, and related grievances.' },
    { name: 'Environment Cell', about: 'Drives sustainability initiatives — tree plantation drives, waste reduction campaigns, and eco-awareness.' },
    { name: 'Media & Publications Cell', about: 'Manages DUSU communications, publications, and social media outreach.' },
  ]

  return (
    <>
      <PageHeader
        crumb="About DUSU"
        title="DUSU Cells"
        lede="Specialised cells within DUSU dedicated to specific student welfare areas."
      />
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {cellsList.map((cell) => (
              <div key={cell.name} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: '1.4rem 1.6rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: 44, 
                  height: 44, 
                  borderRadius: 10, 
                  background: 'var(--primary-soft)', 
                  color: 'var(--primary)', 
                  marginBottom: '1rem',
                  flexShrink: 0
                }}>
                  <Icon name={getIconForCell(cell.name)} size={22} />
                </div>
                <h3 style={{ margin: '0 0 8px', fontSize: '1.05rem', color: 'var(--heading)' }}>{cell.name}</h3>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.6 }}>{cell.about}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
