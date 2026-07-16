import PageHeader from '../../components/common/PageHeader.jsx'
import { HELPLINES } from '../../utils/constants.js'
import Icon from '../../components/Icon.jsx'

export default function HelplinesEmergency() {
  return (
    <>
      <PageHeader
        crumb="Student Help"
        title="Helplines & Emergency"
        lede="Save these numbers. All national helplines are toll-free and available 24×7."
      />
      <section className="section">
        <div className="container grid-2">
          {HELPLINES.map((h) => (
            <div className="card helpline-card" key={h.name}>
              <div className="card-icon" style={{ marginBottom: 0 }}>
                <Icon name={h.icon} size={20} />
              </div>
              <div>
                <h3 style={{ fontSize: '1rem', fontFamily: 'var(--font-body)' }}>{h.name}</h3>
                <a className="helpline-num" href={`tel:${h.number.replace(/[^0-9+]/g, '')}`}>
                  {h.number}
                </a>
                <p style={{ fontSize: '0.85rem' }}>{h.note}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
