import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader.jsx'
import Loader from '../../components/common/Loader.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import Icon from '../../components/Icon.jsx'
import apiClient from '../../utils/apiClient.js'

export default function FreshersGuide() {
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    apiClient
      .get('/freshersguide')
      .then((data) => setSections([...data].sort((a, b) => (a.order || 0) - (b.order || 0))))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <PageHeader
        crumb="Student Help"
        title="Freshers' Guide"
        lede="Everything a new Delhi University student needs in their first few weeks — paperwork, transport, money, safety and campus life."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}

          {!loading && !error && sections.length > 0 && (
            <>
              <nav className="guide-toc">
                {sections.map((s) => (
                  <a key={s.section} href={`#${slug(s.section)}`}>
                    <Icon name={s.icon} size={15} /> {s.section}
                  </a>
                ))}
              </nav>

              {sections.map((s) => (
                <section key={s.section} id={slug(s.section)} className="guide-section">
                  <div className="guide-section-head">
                    <div className="guide-icon">
                      <Icon name={s.icon} size={20} />
                    </div>
                    <div>
                      <h2>{s.section}</h2>
                      {s.intro && <p>{s.intro}</p>}
                    </div>
                  </div>

                  <div className="guide-items">
                    {s.items?.map((item) => (
                      <article className="guide-item" key={item.title}>
                        <h3>{item.title}</h3>
                        <p>{item.detail}</p>
                        {item.note && (
                          <p className="guide-note">
                            <Icon name="Info" size={14} /> {item.note}
                          </p>
                        )}
                        {item.link && (
                          <Link to={item.link} className="guide-link">
                            {item.linkLabel || 'Read more'} →
                          </Link>
                        )}
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </>
          )}
        </div>
      </section>
    </>
  )
}

const slug = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
