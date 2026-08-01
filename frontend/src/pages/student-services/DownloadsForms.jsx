import PageHeader from '../../components/common/PageHeader.jsx'
import useContent from '../../utils/useContent.js'
import { DOWNLOAD_FORMS } from '../../utils/constants.js'

export default function DownloadsForms() {
  const { items: forms } = useContent('downloads', DOWNLOAD_FORMS)

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
                {forms.map((f) => (
                  <tr key={f.id || f.name}>
                    <td style={{ fontWeight: 600 }}>{f.name}</td>
                    <td>{f.type && <span className="badge">{f.type}</span>}</td>
                    <td>{f.note}</td>
                    <td>
                      {f.url ? (
                        <a href={f.url} target="_blank" rel="noreferrer">
                          Download ↗
                        </a>
                      ) : (
                        <span style={{ color: 'var(--muted)' }}>Coming soon</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={{ marginTop: 18, fontSize: '0.9rem', color: 'var(--muted)' }}>
            Documents are linked from their official source. Items marked &ldquo;Coming soon&rdquo;
            have not had a file link added yet.
          </p>
        </div>
      </section>
    </>
  )
}
