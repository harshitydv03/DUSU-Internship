import PageHeader from '../../components/common/PageHeader.jsx'

const SAMPLE_REPS = [
  { college: 'Hindu College', rep: 'To be updated', campus: 'North Campus' },
  { college: 'Hansraj College', rep: 'To be updated', campus: 'North Campus' },
  { college: 'Kirori Mal College', rep: 'To be updated', campus: 'North Campus' },
  { college: 'Ramjas College', rep: 'To be updated', campus: 'North Campus' },
  { college: 'ARSD College', rep: 'To be updated', campus: 'South Campus' },
  { college: 'Motilal Nehru College', rep: 'To be updated', campus: 'South Campus' },
  { college: 'Deshbandhu College', rep: 'To be updated', campus: 'South Campus' },
  { college: 'Shivaji College', rep: 'To be updated', campus: 'West Delhi' },
]

export default function CollegeRepresentatives() {
  return (
    <>
      <PageHeader
        crumb="Our Team"
        title="College Representatives"
        lede="Union representatives across DUSU-affiliated colleges. This list is updated after each college union election."
      />
      <section className="section">
        <div className="container">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>College</th>
                  <th>Representative</th>
                  <th>Campus</th>
                </tr>
              </thead>
              <tbody>
                {SAMPLE_REPS.map((r) => (
                  <tr key={r.college}>
                    <td style={{ fontWeight: 600 }}>{r.college}</td>
                    <td>{r.rep}</td>
                    <td>{r.campus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 18, fontSize: '0.9rem', color: 'var(--muted)' }}>
            Representative names are sample placeholders — the DUSU office will publish the
            verified list for the current session.
          </p>
        </div>
      </section>
    </>
  )
}
