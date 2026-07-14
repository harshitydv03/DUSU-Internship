import PageHeader from '../../components/common/PageHeader.jsx'
import { DOWNLOAD_FORMS } from '../../utils/constants.js'

export default function DownloadsForms() {
  return (
    <>
      <PageHeader
        crumb="Services"
        title="Downloads & Forms"
        lede="Frequently needed applications, affidavits and templates."
      />
      <section className="section">
        <div className="container">
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Document</th>
                  <th>Type</th>
                  <th>Notes</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                {DOWNLOAD_FORMS.map((f) => (
                  <tr key={f.name}>
                    <td style={{ fontWeight: 600 }}>{f.name}</td>
                    <td><span className="badge">{f.type}</span></td>
                    <td>{f.note}</td>
                    <td><span style={{ color: 'var(--muted)' }}>Coming soon</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 18, fontSize: '0.9rem', color: 'var(--muted)' }}>
            Files will be attached here once the DUSU office uploads verified versions through the
            admin panel.
          </p>
        </div>
      </section>
    </>
  )
}
