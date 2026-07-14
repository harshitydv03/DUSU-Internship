import PageHeader from '../../components/common/PageHeader.jsx'
import ContactForm from '../../components/contact/ContactForm.jsx'
import { SITE } from '../../utils/constants.js'

export default function ContactReachUs() {
  return (
    <>
      <PageHeader
        crumb="Contact"
        title="Reach Us"
        lede="Questions, proposals, press queries or feedback — write to the union office."
      />
      <section className="section">
        <div className="container grid-2" style={{ alignItems: 'start' }}>
          <div>
            <div className="card" style={{ marginBottom: 18 }}>
              <div className="card-icon">📍</div>
              <h3>DUSU Office</h3>
              <p>{SITE.address}</p>
            </div>
            <div className="card" style={{ marginBottom: 18 }}>
              <div className="card-icon">✉️</div>
              <h3>Email</h3>
              <p>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                <br />
                <span style={{ fontSize: '0.82rem' }}>(sample — official ID to be updated)</span>
              </p>
            </div>
            <div className="card">
              <div className="card-icon">🕘</div>
              <h3>Office hours</h3>
              <p>Monday – Friday, 10:00 AM – 5:00 PM (working days of the University)</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  )
}
