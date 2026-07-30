import { useEffect, useMemo, useState } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Loader from '../../components/common/Loader.jsx'
import ErrorMessage from '../../components/common/ErrorMessage.jsx'
import Icon from '../../components/Icon.jsx'
import apiClient from '../../utils/apiClient.js'

// Fest season runs roughly January to March, so order by the first month named.
const MONTH_ORDER = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December']

const monthRank = (m) => {
  const found = MONTH_ORDER.findIndex((name) => String(m || '').includes(name))
  return found === -1 ? 99 : found
}

export default function FestCalendar() {
  const [fests, setFests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [campus, setCampus] = useState('All')

  useEffect(() => {
    apiClient
      .get('/fests')
      .then(setFests)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const campuses = useMemo(
    () => ['All', ...new Set(fests.map((f) => f.campus).filter(Boolean))],
    [fests],
  )

  const visible = useMemo(
    () =>
      fests
        .filter((f) => campus === 'All' || f.campus === campus)
        .sort((a, b) => monthRank(a.typicalMonth) - monthRank(b.typicalMonth)),
    [fests, campus],
  )

  return (
    <>
      <PageHeader
        crumb="Campus Life"
        title="DU Fest Calendar"
        lede="The annual cultural festivals held across Delhi University colleges."
      />
      <section className="section">
        <div className="container">
          {loading && <Loader />}
          {error && <ErrorMessage message={error} />}

          {!loading && !error && (
            <>
              <div className="alert alert-info fest-note">
                <Icon name="Info" size={16} />
                <span>
                  Fest season usually runs from January to March. Exact dates change every
                  year — check the hosting college&apos;s announcements for the current session.
                </span>
              </div>

              <div className="fest-filters">
                {campuses.map((c) => (
                  <button
                    key={c}
                    onClick={() => setCampus(c)}
                    className={campus === c ? 'fest-chip active' : 'fest-chip'}
                  >
                    {c === 'All' ? 'All campuses' : `${c} Campus`}
                  </button>
                ))}
              </div>

              {visible.length === 0 ? (
                <p style={{ color: 'var(--muted)' }}>No fests listed for this campus yet.</p>
              ) : (
                <div className="grid-3" style={{ gap: 22 }}>
                  {visible.map((fest) => (
                    <article className="card fest-card" key={`${fest.name}-${fest.college}`}>
                      <div className="fest-card-top">
                        <h3>{fest.name}</h3>
                        {fest.campus && <span className="fest-campus">{fest.campus}</span>}
                      </div>
                      <p className="fest-college">{fest.college}</p>
                      {fest.typicalMonth && (
                        <p className="fest-month">
                          <Icon name="Calendar" size={14} /> {fest.typicalMonth}
                        </p>
                      )}
                      <p className="fest-desc">{fest.desc}</p>
                      {fest.highlights?.length > 0 && (
                        <div className="fest-tags">
                          {fest.highlights.map((h) => (
                            <span key={h}>{h}</span>
                          ))}
                        </div>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  )
}
