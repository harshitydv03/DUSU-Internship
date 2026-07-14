import PageHeader from '../../components/common/PageHeader.jsx'
import QueryTracker from '../../components/student-help/QueryTracker.jsx'

export default function TrackMyQuery() {
  return (
    <>
      <PageHeader
        crumb="Student Help"
        title="Track My Query"
        lede="Enter the reference ID you received when submitting your grievance."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          <QueryTracker />
        </div>
      </section>
    </>
  )
}
