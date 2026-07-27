import { useParams } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader.jsx'

const FACILITIES = {
  'sports-complex': {
    name: 'Sports Complex',
    icon: '🏟️',
    desc: 'The University of Delhi Sports Complex is a multi-sport facility available to all DU students. It houses facilities for cricket, football, basketball, athletics, and more.',
    details: [
      ['Location', 'University Stadium, North Campus'],
      ['Timings', 'Mon – Sat: 6 AM – 8 PM'],
      ['Access', 'Free for registered DU students on presentation of ID card'],
      ['Contact', 'Sports Council, DU — +91-11-2766-7531'],
    ],
  },
  'polo-ground': {
    name: 'Polo Ground',
    icon: '🏇',
    desc: 'The historic Polo Ground within the University of Delhi campus is used for large-scale events, sports meets, and open-air gatherings.',
    details: [
      ['Location', 'University of Delhi, North Campus'],
      ['Use', 'Events, sports, and cultural activities'],
      ['Booking', 'Through Dean of Students\' Office'],
    ],
  },
  ducc: {
    name: 'DUCC (Delhi University Computer Centre)',
    icon: '💻',
    desc: 'DUCC provides computing infrastructure, internet connectivity, and IT support across the university. Students can access computing resources for research and coursework.',
    details: [
      ['Location', 'North Campus, University of Delhi'],
      ['Services', 'Internet access, software resources, IT support'],
      ['Timings', 'Mon – Sat: 9 AM – 6 PM'],
      ['Contact', 'ducc@du.ac.in'],
    ],
  },
  'banks-post': {
    name: 'Banks & Post Office',
    icon: '🏦',
    desc: 'Several banks and a post office operate within the University of Delhi campus for the convenience of students and staff.',
    details: [
      ['Banks', 'State Bank of India, Punjab National Bank, Bank of Baroda (campus branches)'],
      ['ATMs', 'Multiple ATMs across North and South Campus'],
      ['Post Office', 'University Post Office, North Campus'],
      ['Timings', 'Mon – Fri, bank hours apply'],
    ],
  },
}

export default function Facility() {
  const { slug } = useParams()
  const facility = FACILITIES[slug]

  if (!facility) {
    return (
      <section className="section">
        <div className="container">
          <p style={{ color: 'var(--muted)' }}>Facility not found.</p>
        </div>
      </section>
    )
  }

  return (
    <>
      <PageHeader
        crumb="Student Services · Facilities"
        title={facility.name}
        lede=""
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{
            background: 'var(--surface)', border: '1px solid var(--border)',
            borderRadius: 14, padding: '2rem 2.4rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>{facility.icon}</div>
            <p style={{ color: 'var(--text)', lineHeight: 1.8, marginBottom: '1.5rem' }}>{facility.desc}</p>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <tbody>
                {facility.details.map(([label, value]) => (
                  <tr key={label} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={{ padding: '9px 16px 9px 0', fontWeight: 700, fontSize: '0.88rem', color: 'var(--heading)', whiteSpace: 'nowrap', verticalAlign: 'top', width: 160 }}>{label}</td>
                    <td style={{ padding: '9px 0', fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6 }}>{value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}
