import { Link } from 'react-router-dom'
import HomeHero from '../../components/home/HomeHero.jsx'
import NoticeCard from '../../components/news-notices/NoticeCard.jsx'
import { SAMPLE_NOTICES, SAMPLE_EVENTS } from '../../utils/constants.js'

const QUICK_LINKS = [
  { icon: '📋', title: 'Raise a Grievance', desc: 'File a complaint or query and get a trackable reference ID.', to: '/help/raise-query' },
  { icon: '🎓', title: 'Scholarships', desc: 'Fee waivers and financial aid schemes for DU students.', to: '/services/scholarships' },
  { icon: '📅', title: 'Events Calendar', desc: 'Fests, camps, debates and drives across campuses.', to: '/events' },
  { icon: '🛡️', title: 'Anti-Ragging & SOS', desc: '24×7 helplines and emergency safety resources.', to: '/help/anti-ragging' },
  { icon: '📥', title: 'Downloads & Forms', desc: 'Applications, affidavits and templates in one place.', to: '/services/downloads' },
  { icon: '👥', title: 'Our Team', desc: 'Meet your elected office bearers and college representatives.', to: '/team' },
]

const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

export default function Home() {
  return (
    <>
      <HomeHero />

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How can we help?</span>
            <h2>Everything a DU student needs</h2>
            <p>Jump straight to the services students use the most.</p>
          </div>
          <div className="grid-3">
            {QUICK_LINKS.map((q) => (
              <Link to={q.to} className="card" key={q.title}>
                <div className="card-icon">{q.icon}</div>
                <h3>{q.title}</h3>
                <p>{q.desc}</p>
                <span className="card-link">Open →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Stay updated</span>
            <h2>Latest news &amp; notices</h2>
          </div>
          <div className="grid-2">
            {SAMPLE_NOTICES.map((n) => (
              <NoticeCard notice={n} key={n.id} />
            ))}
          </div>
          <div style={{ marginTop: 26 }}>
            <Link to="/news" className="btn btn-outline">
              View all notices
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Campus life</span>
            <h2>Upcoming events</h2>
          </div>
          <div className="grid-4">
            {SAMPLE_EVENTS.map((e) => (
              <article className="event-card" key={e.id}>
                <div className="event-banner" style={{ background: e.gradient }}>
                  {e.icon}
                </div>
                <div className="event-body">
                  <span className="event-meta">{fmt(e.date)}</span>
                  <h3>{e.title}</h3>
                  <p className="event-meta">📍 {e.venue}</p>
                </div>
              </article>
            ))}
          </div>
          <div style={{ marginTop: 26 }}>
            <Link to="/events" className="btn btn-outline">
              Full calendar
            </Link>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>Facing ragging or harassment?</h2>
              <p>You are not alone. Reach the 24×7 national helpline or file a complaint anonymously.</p>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="tel:18001805522" className="btn btn-gold">Call 1800-180-5522</a>
              <Link to="/help/anti-ragging" className="btn btn-outline-light">Safety resources</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
