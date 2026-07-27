import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import HomeHero from '../../components/home/HomeHero.jsx'
import NoticeCard from '../../components/news-notices/NoticeCard.jsx'
import Icon from '../../components/Icon.jsx'
import { SAMPLE_NOTICES, SAMPLE_EVENTS } from '../../utils/constants.js'
import apiClient from '../../utils/apiClient.js'

const QUICK_LINKS = [
  { icon: 'Clipboard', title: 'Raise a Grievance', desc: 'File a complaint or query and get a trackable reference ID.', to: '/help/raise-query' },
  { icon: 'GraduationCap', title: 'Scholarships', desc: 'Fee waivers and financial aid schemes for DU students.', to: '/services/scholarships' },
  { icon: 'Calendar', title: 'Events Calendar', desc: 'Fests, camps, debates and drives across campuses.', to: '/events' },
  { icon: 'ShieldAlert', title: 'Anti-Ragging & SOS', desc: '24×7 helplines and emergency safety resources.', to: '/help/anti-ragging' },
  { icon: 'Download', title: 'Downloads & Forms', desc: 'Applications, affidavits and templates in one place.', to: '/services/downloads' },
  { icon: 'Users', title: 'Our Team', desc: 'Meet your elected office bearers and college representatives.', to: '/team' },
]

const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })

const withEventDefaults = (events) =>
  events.map((event, index) => ({
    gradient: SAMPLE_EVENTS[index % SAMPLE_EVENTS.length]?.gradient || 'linear-gradient(135deg,#7c1d2e,#b0553f)',
    icon: SAMPLE_EVENTS[index % SAMPLE_EVENTS.length]?.icon || 'Calendar',
    ...event,
  }))

export default function Home() {
  const [notices, setNotices] = useState(SAMPLE_NOTICES)
  const [events, setEvents] = useState(SAMPLE_EVENTS)

  useEffect(() => {
    let active = true

    Promise.all([apiClient.get('/notices'), apiClient.get('/events')])
      .then(([apiNotices, apiEvents]) => {
        if (!active) return
        if (apiNotices?.length) setNotices(apiNotices)
        if (apiEvents?.length) setEvents(withEventDefaults(apiEvents))
      })
      .catch(() => {
        if (!active) return
        setNotices(SAMPLE_NOTICES)
        setEvents(SAMPLE_EVENTS)
      })

    return () => {
      active = false
    }
  }, [])

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
                <div className="card-icon"><Icon name={q.icon} size={20} /></div>
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
            <div className="hand-drawn-divider w-48 mt-2"></div>
          </div>
          <div className="grid-2">
            {notices.map((n) => (
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
            <div className="hand-drawn-divider w-48 mt-2"></div>
          </div>
          <div className="grid-4">
            {events.map((e) => (
              <article className="event-card" key={e.id}>
                <div className="event-banner" style={{ background: e.gradient }}>
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                    <rect x="3" y="4" width="18" height="16" rx="2" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" fill="none"/>
                    <path d="M3 10h18" stroke="rgba(255,255,255,0.95)" strokeWidth="1.5" strokeLinecap="round"/>
                    <circle cx="8" cy="14" r="1" fill="rgba(255,255,255,0.95)"/>
                    <circle cx="12" cy="14" r="1" fill="rgba(255,255,255,0.95)"/>
                    <circle cx="16" cy="14" r="1" fill="rgba(255,255,255,0.95)"/>
                  </svg>
                </div>
                <div className="event-body">
                  <span className="event-meta">{fmt(e.date)}</span>
                  <h3>{e.title}</h3>
                  <p className="event-meta"><svg width="14" height="14" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ verticalAlign: 'middle', marginRight: 6, color: 'var(--muted)' }} aria-hidden>
                    <path d="M8 1.5a3 3 0 0 0-3 3c0 2.25 3 5.5 3 5.5s3-3.25 3-5.5a3 3 0 0 0-3-3z" stroke="currentColor" strokeWidth="1" fill="none" />
                    <circle cx="8" cy="4.5" r="0.9" fill="currentColor" />
                  </svg> {e.venue}</p>
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
