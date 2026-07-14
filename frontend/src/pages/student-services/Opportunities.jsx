import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader.jsx'
import { OPPORTUNITIES } from '../../utils/constants.js'

export default function Opportunities() {
  return (
    <>
      <PageHeader
        crumb="Services"
        title="Opportunities"
        lede="Work with the union — build experience while making campus life better."
      />
      <section className="section">
        <div className="container">
          <div className="grid-2">
            {OPPORTUNITIES.map((o) => (
              <div className="card" key={o.title}>
                <div className="card-icon">{o.icon}</div>
                <span className="badge">{o.type}</span>
                <h3>{o.title}</h3>
                <p>{o.desc}</p>
              </div>
            ))}
          </div>
          <div className="cta-band" style={{ marginTop: 40 }}>
            <div>
              <h2>Want to join?</h2>
              <p>Send a short note about yourself and the team you want to join.</p>
            </div>
            <Link to="/contact" className="btn btn-gold">Apply via Contact</Link>
          </div>
        </div>
      </section>
    </>
  )
}
