import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Loader from '../../components/common/Loader.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import Icon from '../../components/Icon.jsx'
import apiClient from '../../utils/apiClient.js'

// Sorted by term so the list reads as a timeline. Terms look like "1974–1975".
const startYear = (term) => parseInt(String(term || '').slice(0, 4), 10) || 0

export default function AlumniInPublicLife() {
  const [alumni, setAlumni] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    apiClient
      .get('/alumni')
      .then((data) => setAlumni([...data].sort((a, b) => startYear(a.term) - startYear(b.term))))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <PageHeader
        crumb="Administration"
        title="Alumni in Public Life"
        lede="Office bearers of the Delhi University Students' Union who went on to serve in public office."
      />
      <section className="section">
        <div className="container">
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}

          {!loading && !error && alumni.length === 0 && (
            <p style={{ color: 'var(--muted)' }}>No alumni records have been added yet.</p>
          )}

          {!loading && !error && alumni.length > 0 && (
            <div className="grid-2" style={{ gap: 22 }}>
              {alumni.map((person) => (
                <article className="card alumni-card" key={`${person.name}-${person.term}`}>
                  <div className="alumni-head">
                    <div className="alumni-initials">
                      {person.initials || person.name?.slice(0, 1)}
                    </div>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.15rem' }}>{person.name}</h3>
                      <p className="alumni-term">
                        {[person.post, person.term].filter(Boolean).join(' · ')}
                      </p>
                      {person.party && <span className="alumni-party">{person.party}</span>}
                    </div>
                  </div>

                  {person.majorPosts?.length > 0 && (
                    <div className="alumni-block">
                      <h4>
                        <Icon name="Landmark" size={15} /> Public office
                      </h4>
                      <ul>
                        {person.majorPosts.map((post) => (
                          <li key={post}>{post}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {person.keyWorks?.length > 0 && (
                    <div className="alumni-block">
                      <h4>
                        <Icon name="Star" size={15} /> Notable work
                      </h4>
                      <ul>
                        {person.keyWorks.map((work) => (
                          <li key={work}>{work}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
