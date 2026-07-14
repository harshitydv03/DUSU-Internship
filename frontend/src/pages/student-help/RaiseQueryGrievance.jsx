import PageHeader from '../../components/common/PageHeader.jsx'
import QueryForm from '../../components/student-help/QueryForm.jsx'

export default function RaiseQueryGrievance() {
  return (
    <>
      <PageHeader
        crumb="Student Help"
        title="Raise a Query / Grievance"
        lede="Tell us what went wrong. Every submission gets a reference ID you can use to track progress."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          <QueryForm />
          <p style={{ marginTop: 18, fontSize: '0.88rem', color: 'var(--muted)' }}>
            ⚠️ For emergencies — ragging, harassment or threats to safety — do not wait for the
            form. Call <a href="tel:18001805522">1800-180-5522</a> (anti-ragging) or{' '}
            <a href="tel:112">112</a> immediately.
          </p>
        </div>
      </section>
    </>
  )
}
