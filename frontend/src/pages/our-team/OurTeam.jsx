import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader.jsx'
import TeamCard from '../../components/our-team/TeamCard.jsx'
import useContent from '../../utils/useContent.js'
import { OFFICE_BEARERS } from '../../utils/constants.js'

// CMS records carry role/name/college only, so derive the initials the card
// falls back to when no photo is set.
const initialsFor = (name = '') =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')

export default function OurTeam() {
  const { items } = useContent('team', OFFICE_BEARERS)
  const members = items.map((m) => ({ ...m, initials: m.initials || initialsFor(m.name) }))

  return (
    <>
      <PageHeader
        crumb="Our Team"
        title="Meet Your Union"
        lede="The elected office bearers working for you this session."
      />
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Central Panel</span>
            <h2>Office Bearers 2026–27</h2>
            <p>Names will be updated after the results of the current election cycle.</p>
          </div>
          <div className="grid-4">
            {members.map((m) => (
              <TeamCard member={m} key={m.id || m.role} />
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <Link to="/team/office-bearers" className="btn btn-primary">
              Office bearer profiles
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
