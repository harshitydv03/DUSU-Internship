import { useState, useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Icon from '../../components/Icon.jsx'
import apiClient from '../../utils/apiClient.js'

// Simple helper mapper for cell icons based on name
const getIconForCell = (name) => {
  const n = name.toLowerCase()
  if (n.includes('literary') || n.includes('writing') || n.includes('book')) return 'BookOpen'
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

  // Static fallback array mirroring full dusucells dataset
  const cellsList = cells.length > 0 ? cells : [
    { name: 'Literary Cell', about: 'Promotes creative writing, poetry, storytelling, and literary discussions. Organizes book reviews, writing competitions, and author interactions.' },
    { name: 'Fine Arts Cell', about: 'Encourages painting, sketching, crafts, and visual arts. Conducts exhibitions, workshops, and art competitions.' },
    { name: 'Environmental Cell (Green Warriors)', about: 'Works on environmental awareness and sustainability initiatives. Organizes plantation drives, cleanliness campaigns, and eco-projects.' },
    { name: 'Women Empowerment Cell (Swaryamsiddha)', about: 'Focuses on women’s leadership, safety, and empowerment. Conducts awareness programs, workshops, and mentorship activities.' },
    { name: 'Student Welfare Cell (Chhatrahit)', about: 'Addresses student concerns and welfare issues. Acts as a bridge between students and authorities.' },
    { name: 'Alumni Relations Cell (Alumni Connect)', about: 'Maintains connections with former students. Facilitates networking, mentorship, and alumni engagement programs.' },
    { name: 'International Students Cell (Global Connect)', about: 'Supports international students in academics and campus life. Promotes cultural exchange and inclusivity.' },
    { name: 'Community Outreach Cell (Sevasetu)', about: 'Encourages students to participate in social service activities. Works with communities through awareness and support programs.' },
    { name: 'Mental Health and Wellness Cell', about: 'Promotes mental well-being among students. Conducts counseling awareness sessions and stress-management activities.' },
    { name: 'Divyang Students Cell (Saksham)', about: 'Supports students with disabilities. Advocates accessibility, inclusion, and equal opportunities.' },
    { name: 'Debate and Public Speaking Cell (Manthan)', about: 'Develops communication and critical-thinking skills. Organizes debates, MUNs, and speaking competitions.' },
    { name: 'Legal Aid Cell (Nyay Nidhi)', about: 'Spreads awareness about legal rights and responsibilities. Conducts legal literacy and guidance sessions.' },
    { name: 'Ideological Event Cell (Vimarsh)', about: 'Provides a platform for discussions on social, political, and national issues. Organizes seminars and intellectual dialogues.' },
    { name: 'Hostel Cell (Hostel Happenings)', about: 'Addresses hostel-related issues and student concerns. Also promotes hostel-based events and activities.' },
    { name: 'PG Cell (PG Connect)', about: 'Focuses on postgraduate students’ academic and welfare needs. Helps connect PG students across departments.' },
    { name: 'Fashion Club (Vogue Vani)', about: 'Promotes fashion, styling, and creative expression. Organizes fashion shows and design-related events.' },
    { name: 'Language Exchange Club (Bhasha Sangam)', about: 'Encourages learning and sharing different languages. Promotes linguistic diversity and cultural understanding.' },
    { name: 'Cultural Cell (Sanskriti)', about: 'Celebrates India’s cultural heritage and diversity. Organizes festivals, cultural performances, and competitions.' },
    { name: 'Academic Affairs Cell (Gyan Setu)', about: 'Focuses on academic development and student learning. Conducts seminars, workshops, and academic support activities.' },
    { name: 'Placement Cell (Rozgar)', about: 'Helps students explore career and employment opportunities. Conducts placement drives, career talks, and skill sessions.' },
    { name: 'Innovation and Incubation Cell (Tech Trek)', about: 'Promotes innovation, technology, and problem-solving. Supports student projects and startup ideas.' },
    { name: 'Media and Publications Cell (Abhivyakti)', about: 'Handles content creation, reporting, and publicity activities. Promotes communication through articles, newsletters, and media coverage.' },
    { name: 'Sports Cell (Khelo Bharat)', about: 'Promotes sports participation and fitness. Organizes tournaments, competitions, and sporting events.' },
    { name: 'Research and Development Cell (Tarkshakti)', about: 'Encourages research, analysis, and innovation. Supports students in academic and policy-oriented research projects.' },
    { name: 'Social Service Cell (Seva Squad)', about: 'Engages students in volunteer and social welfare activities. Works on community development and humanitarian initiatives.' },
    { name: 'Startup and Entrepreneurship Cell (Startup Strike)', about: 'Supports aspiring entrepreneurs and business innovators. Organizes startup events, mentorship, and networking opportunities.' },
    { name: 'Diversity and Inclusion Cell (Sangam)', about: 'Promotes equality, inclusivity, and respect for diversity. Encourages a welcoming campus environment for all students.' },
    { name: 'Film and Photography Cell (Reel Raaz)', about: 'Provides opportunities in filmmaking, photography, and visual storytelling. Organizes screenings, contests, and workshops.' },
    { name: 'Theatre and Drama Cell (Rangmanch)', about: 'Promotes acting, stage performance, and dramatic arts. Conducts plays, street theatre performances, and acting workshops.' }
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
