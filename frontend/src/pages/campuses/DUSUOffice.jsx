import PageHeader from '../../components/common/PageHeader.jsx'
import { SITE } from '../../utils/constants.js'

export default function DUSUOffice() {
  return (
    <>
      <PageHeader
        crumb="Campuses"
        title="DUSU Office"
        lede="Visit us — location, contact and office hours for the Delhi University Students' Union."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 860 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, flexWrap: 'wrap' }}>

            {/* Info card */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: '1.8rem 2rem',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
            }}>
              <h2 style={{ marginTop: 0 }}>Contact & Location</h2>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    ['📍 Address', SITE.address],
                    ['📞 Phone',   SITE.phone],
                    ['✉️ Email',   SITE.email],
                    ['🕐 Hours',   'Mon – Sat, 10:00 AM – 5:00 PM'],
                  ].map(([label, value]) => (
                    <tr key={label} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 12px 10px 0', fontWeight: 700, fontSize: '0.88rem', color: 'var(--heading)', whiteSpace: 'nowrap', verticalAlign: 'top' }}>{label}</td>
                      <td style={{ padding: '10px 0', fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.5 }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Map embed placeholder */}
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              minHeight: 280,
              display: 'flex',
              flexDirection: 'column',
            }}>
              <iframe
                title="DUSU Office Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.5!2d77.2090!3d28.6879!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd37b741d057%3A0x55d35b8bb4f3aafd!2sDelhi%20University%20Students%27%20Union!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, flex: 1, minHeight: 280 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <a
            href={`https://maps.google.com/?q=DUSU+Office+University+of+Delhi`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, marginTop: 20,
              padding: '10px 22px', background: 'var(--accent)', color: '#fff',
              borderRadius: 8, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none',
            }}
          >
            📍 Open in Google Maps
          </a>
        </div>
      </section>
    </>
  )
}
