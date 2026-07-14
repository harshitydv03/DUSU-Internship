import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader.jsx'
import TeamCard from '../../components/our-team/TeamCard.jsx'
import { OFFICE_BEARERS } from '../../utils/constants.js'

export default function OurTeam() {
  return (
    <>
      <PageHeader
        crumb="Our Team"
        title="Meet Your Union"
        lede="The elected office bearers and college representatives working for you this session."
      />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Central Panel</span>
            <h2>Office Bearers 2026–27</h2>
            <p>Names will be updated after the results of the current election cycle.</p>
          </div>
          <div className="grid-4">
            {OFFICE_BEARERS.map((m) => (
              <TeamCard member={m} key={m.role} />
            ))}
          </div>
          <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link to="/team/office-bearers" className="btn btn-primary">
              Office bearer profiles
            </Link>
            <Link to="/team/college-representatives" className="btn btn-outline">
              College representatives
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
