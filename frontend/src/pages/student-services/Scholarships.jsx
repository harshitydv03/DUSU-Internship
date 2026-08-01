import PageHeader from '../../components/common/PageHeader.jsx'
import useContent from '../../utils/useContent.js'
import { SCHOLARSHIPS } from '../../utils/constants.js'

export default function Scholarships() {
  const { items: scholarships } = useContent('scholarships', SCHOLARSHIPS)

  return (
    <>
      <PageHeader
        crumb="Services"
        title="Scholarships & Financial Aid"
        lede="Major schemes available to University of Delhi students. DUSU help desks assist with applications."
      />
      <section className="section">
        <div className="container">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Scheme</th>
                  <th>Provider</th>
                  <th>Benefit</th>
                  <th>Apply</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.map((s) => (
                  <tr key={s.id || s.name}>
                    <td style={{ fontWeight: 600 }}>{s.name}</td>
                    <td>{s.provider}</td>
                    <td>{s.benefit}</td>
                    <td>
                      {s.link ? (
                        <a href={s.link} target="_blank" rel="noreferrer">
                          Portal ↗
                        </a>
                      ) : (
                        <span style={{ color: 'var(--muted)' }}>—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 18, fontSize: '0.9rem', color: 'var(--muted)' }}>
            Eligibility criteria and deadlines change every year — always verify on the official
            portal. For help with paperwork, visit the DUSU help desk or raise a query.
          </p>
        </div>
      </section>
    </>
  )
}
