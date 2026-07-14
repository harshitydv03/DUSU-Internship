import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader.jsx'

const HELP_CARDS = [
  { icon: '📋', title: 'Raise Query / Grievance', desc: 'File a complaint and receive a trackable reference ID.', to: '/help/raise-query' },
  { icon: '🔎', title: 'Track My Query', desc: 'Check the current status of a filed grievance.', to: '/help/track-query' },
  { icon: '❓', title: 'FAQs & Knowledge Base', desc: 'Answers to the questions students ask most.', to: '/help/faqs' },
  { icon: '📞', title: 'Helplines & Emergency', desc: 'National and university helpline numbers, 24×7.', to: '/help/helplines' },
  { icon: '🛡️', title: 'Anti-Ragging & Safety', desc: 'Zero tolerance — know your rights and the SOS process.', to: '/help/anti-ragging' },
  { icon: '✉️', title: 'Contact the Union', desc: 'Reach the DUSU office directly for anything else.', to: '/contact' },
]

export default function StudentHelp() {
  return (
    <>
      <PageHeader
        crumb="Student Help"
        title="Help Centre"
        lede="Whatever the issue — academic, administrative or personal safety — start here."
      />
      <section className="section">
        <div className="container grid-3">
          {HELP_CARDS.map((c) => (
            <Link to={c.to} className="card" key={c.title}>
              <div className="card-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <span className="card-link">Open →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
