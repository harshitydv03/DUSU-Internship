import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader.jsx'
import Icon from '../../components/Icon.jsx'

export default function AntiRaggingSafetySOS() {
  return (
    <>
      <PageHeader
        crumb="Student Help"
        title="Anti-Ragging & Safety SOS"
        lede="Ragging is a criminal offence. The University of Delhi has zero tolerance — and so do we."
      />
      <section className="section">
        <div className="container">
          <div className="sos-banner">
            <h2>In immediate danger?</h2>
            <p>Call the 24×7 national anti-ragging helpline now — it works in every state, in multiple languages.</p>
            <a className="helpline-num" href="tel:18001805522">1800-180-5522</a>
            <p>
              or email <a style={{ color: '#ffd98a' }} href="mailto:helpline@antiragging.in">helpline@antiragging.in</a>{' '}
              · Police emergency: <a style={{ color: '#ffd98a' }} href="tel:112">112</a>
            </p>
          </div>

          <div className="grid-3" style={{ marginTop: 40 }}>
            <div className="card">
              <div className="card-icon"><Icon name="Scale" /></div>
              <h3>Know your rights</h3>
              <p>
                Ragging in any form — physical, verbal, or online — is punishable with suspension,
                expulsion and criminal prosecution under UGC regulations.
              </p>
            </div>
            <div className="card">
              <div className="card-icon"><Icon name="FileText" /></div>
              <h3>File a complaint</h3>
              <p>
                Complaints can be filed anonymously at antiragging.in or through the DUSU
                grievance form. Every complaint is acted upon.
              </p>
            </div>
            <div className="card">
              <div className="card-icon"><Icon name="Handshake" /></div>
              <h3>DUSU stands with you</h3>
              <p>
                The union escorts complainants to authorities, follows up with anti-ragging
                committees, and keeps your identity protected.
              </p>
            </div>
          </div>

          <div style={{ marginTop: 32 }}>
            <Link to="/help/raise-query" className="btn btn-primary">
              Report through DUSU
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
