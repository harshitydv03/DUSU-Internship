import PageHeader from '../../components/common/PageHeader.jsx'
import Timeline from '../../components/work-milestones/Timeline.jsx'
import { MILESTONES } from '../../utils/constants.js'

export default function WorkMilestones() {
  return (
    <>
      <PageHeader
        crumb="Campus Life"
        title="Work & Milestones"
        lede="What the union has fought for and delivered — a running record of DUSU's work."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <Timeline items={MILESTONES} />
          <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
            Entries marked (sample) are placeholders — the current panel's verified work report
            will be published here.
          </p>
        </div>
      </section>
    </>
  )
}
