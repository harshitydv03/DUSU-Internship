import PageHeader from '../../components/common/PageHeader.jsx'
import TeamCard from '../../components/our-team/TeamCard.jsx'
import { OFFICE_BEARERS } from '../../utils/constants.js'

const RESPONSIBILITIES = [
  { role: 'President', duties: 'Leads the union, chief spokesperson before the University and public authorities.' },
  { role: 'Vice President', duties: 'Deputises for the President and oversees campaigns and college coordination.' },
  { role: 'Secretary', duties: 'Manages union correspondence, records, meetings and official communication.' },
  { role: 'Joint Secretary', duties: 'Supports the Secretary and coordinates events, drives and volunteer teams.' },
]

export default function OfficeBearers() {
  return (
    <>
      <PageHeader
        crumb="Our Team"
        title="Office Bearers"
        lede="The four directly elected members of the DUSU central panel."
      />
      <section className="section">
        <div className="container">
          <div className="grid-4">
            {OFFICE_BEARERS.map((m) => (
              <TeamCard member={m} key={m.role} />
            ))}
          </div>
          <div className="section-head" style={{ margin: '48px 0 22px' }}>
            <h2>Roles &amp; responsibilities</h2>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Responsibilities</th>
                </tr>
              </thead>
              <tbody>
                {RESPONSIBILITIES.map((r) => (
                  <tr key={r.role}>
                    <td style={{ fontWeight: 600 }}>{r.role}</td>
                    <td>{r.duties}</td>
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
