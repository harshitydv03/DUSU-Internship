import { useState, useEffect, useMemo } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import apiClient from '../../utils/apiClient.js'

const CAMPUSES = ['All', 'North', 'South', 'East', 'West']

/** Group an alphabetically-sorted college list by first letter. */
function groupByLetter(colleges) {
  const groups = {}
  for (const c of colleges) {
    const letter = c.name?.[0]?.toUpperCase() ?? '#'
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(c)
  }
  return groups
}

export default function CollegesDepartments() {
  const [colleges, setColleges]           = useState([])
  const [loading, setLoading]             = useState(true)
  const [error, setError]                 = useState(null)
  const [activeCampus, setActiveCampus]   = useState('All')
  const [selected, setSelected]           = useState(null)

  useEffect(() => {
    apiClient.get('/colleges')
      .then((data) => {
        setColleges(data)
        // auto-select first college on load
        if (data.length > 0) setSelected(data[0])
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(
    () => colleges.filter((c) => activeCampus === 'All' || c.campus === activeCampus),
    [colleges, activeCampus]
  )

  const grouped = useMemo(() => groupByLetter(filtered), [filtered])
  const letters = Object.keys(grouped).sort()

  const counts = useMemo(() => CAMPUSES.reduce((acc, camp) => {
    acc[camp] = camp === 'All' ? colleges.length : colleges.filter((c) => c.campus === camp).length
    return acc
  }, {}), [colleges])

  const handleCampusClick = (camp) => {
    setActiveCampus(camp)
    setSelected(null)
  }

  return (
    <>
      <PageHeader
        crumb="Campus Life"
        title="Colleges & Departments"
        lede="All DUSU-affiliated colleges of the University of Delhi, organised by campus."
      />

      <section className="section">
        <div className="container">

          {/* Campus filter tabs */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {CAMPUSES.map((camp) => (
              <button
                key={camp}
                onClick={() => handleCampusClick(camp)}
                style={{
                  padding: '7px 18px',
                  borderRadius: 20,
                  border: '1.5px solid var(--border)',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  background: activeCampus === camp ? 'var(--accent)' : 'var(--surface)',
                  color: activeCampus === camp ? '#fff' : 'var(--text)',
                  transition: 'background 0.15s, color 0.15s',
                }}
              >
                {camp === 'All' ? 'All Campuses' : `${camp} Campus`}{' '}
                <span style={{ opacity: 0.7 }}>({counts[camp] ?? 0})</span>
              </button>
            ))}
          </div>

          {loading && <p style={{ color: 'var(--muted)' }}>Loading colleges…</p>}
          {error   && <p style={{ color: '#c0392b' }}>Error: {error}</p>}

          {!loading && !error && (
            <div style={{ display: 'flex', gap: 0, alignItems: 'stretch', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', minHeight: 520, background: 'var(--surface)', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>

              {/* ── Left: A-Z scrollable list ── */}
              <div style={{
                width: 290,
                flexShrink: 0,
                borderRight: '1px solid var(--border)',
                overflowY: 'auto',
                maxHeight: 620,
              }}>
                {filtered.length === 0 ? (
                  <p style={{ padding: '1.5rem', color: 'var(--muted)', margin: 0 }}>No colleges found.</p>
                ) : (
                  letters.map((letter) => (
                    <div key={letter}>
                      {/* Letter header */}
                      <div style={{
                        padding: '6px 16px 4px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        color: 'var(--muted)',
                        letterSpacing: '0.08em',
                        background: 'var(--bg, #f8f8fa)',
                        borderBottom: '1px solid var(--border)',
                        userSelect: 'none',
                      }}>
                        {letter}
                      </div>

                      {/* Colleges in this letter group */}
                      {grouped[letter].map((c) => {
                        const isActive = selected?.id === c.id || (!selected?.id && selected?.slug === c.slug)
                        return (
                          <button
                            key={c.id ?? c.slug}
                            onClick={() => setSelected(c)}
                            style={{
                              width: '100%',
                              textAlign: 'left',
                              background: isActive ? 'var(--accent)' : 'transparent',
                              border: 'none',
                              borderBottom: '1px solid var(--border)',
                              cursor: 'pointer',
                              padding: '10px 16px',
                              fontSize: '0.88rem',
                              fontWeight: isActive ? 600 : 400,
                              color: isActive ? '#fff' : 'var(--text)',
                              lineHeight: 1.4,
                              transition: 'background 0.12s, color 0.12s',
                              display: 'block',
                            }}
                            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--accent-faint, rgba(124,29,46,0.09))' }}
                            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                          >
                            {c.name}
                          </button>
                        )
                      })}
                    </div>
                  ))
                )}
              </div>

              {/* ── Right: Detail panel ── */}
              <div style={{ flex: 1, padding: '2rem 2.2rem', overflowY: 'auto', maxHeight: 620 }}>
                {!selected ? (
                  <p style={{ color: 'var(--muted)', marginTop: '2rem' }}>
                    Select a college from the list to see its details.
                  </p>
                ) : (
                  <>
                    {/* College name */}
                    <h2 style={{ margin: '0 0 20px', fontSize: '1.7rem', fontWeight: 800, color: 'var(--heading)', lineHeight: 1.2 }}>
                      {selected.name}
                    </h2>

                    {/* Key-value info table */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
                      <tbody>
                        {[
                          ['Campus',              selected.campus],
                          ['Year Established',    selected.yearEstablished],
                          ['Founding Body',       selected.foundingBody],
                          ['Awards / Recognition',selected.awards],
                          ['Student Union Status',selected.studentUnionStatus],
                        ].map(([label, value]) => value ? (
                          <tr key={label} style={{ borderBottom: '1px solid var(--border)' }}>
                            <td style={{
                              padding: '9px 16px 9px 0',
                              fontWeight: 700,
                              fontSize: '0.88rem',
                              color: 'var(--heading)',
                              whiteSpace: 'nowrap',
                              verticalAlign: 'top',
                              width: 190,
                            }}>
                              {label}
                            </td>
                            <td style={{
                              padding: '9px 0',
                              fontSize: '0.88rem',
                              color: 'var(--text)',
                              lineHeight: 1.55,
                              verticalAlign: 'top',
                            }}>
                              {value}
                            </td>
                          </tr>
                        ) : null)}
                      </tbody>
                    </table>

                    {/* Short history */}
                    {selected.shortHistory && (
                      <p style={{
                        margin: '0 0 28px',
                        fontSize: '0.91rem',
                        color: 'var(--text)',
                        lineHeight: 1.75,
                      }}>
                        {selected.shortHistory}
                      </p>
                    )}

                    {/* Website link button */}
                    {selected.website && (
                      <a
                        href={selected.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 7,
                          padding: '9px 22px',
                          background: 'var(--accent)',
                          color: '#fff',
                          borderRadius: 30,
                          fontWeight: 600,
                          fontSize: '0.88rem',
                          textDecoration: 'none',
                          transition: 'opacity 0.15s',
                          boxShadow: '0 2px 8px rgba(0,0,0,0.14)',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                      >
                        {selected.website.replace(/^https?:\/\//, '')}
                      </a>
                    )}
                  </>
                )}
              </div>
            </div>
          )}

          {/* Footer count */}
          {!loading && !error && filtered.length > 0 && (
            <p style={{ marginTop: 14, fontSize: '0.82rem', color: 'var(--muted)', textAlign: 'right' }}>
              {filtered.length} college{filtered.length !== 1 ? 's' : ''} · {activeCampus === 'All' ? 'All Campuses' : `${activeCampus} Campus`}
            </p>
          )}

        </div>
      </section>
    </>
  )
}
