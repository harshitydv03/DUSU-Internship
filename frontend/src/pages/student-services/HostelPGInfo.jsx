import { useState, useEffect, useMemo } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import apiClient from '../../utils/apiClient.js'

const CAMPUS_TABS = ['All', 'North', 'South', 'Off Campus']
const TYPE_TABS = ['All', 'Boys', 'Girls']

/** Normalise campus names: East/West/Central -> Off Campus */
function normaliseCampus(campus) {
  if (campus === 'East Campus' || campus === 'West Campus' || campus === 'East' || campus === 'West' || campus === 'Central') {
    return 'Off Campus'
  }
  if (campus === 'North Campus') return 'North'
  if (campus === 'South Campus') return 'South'
  return campus
}

/** Group sorted list by first letter of item name */
function groupByLetter(items) {
  const groups = {}
  for (const item of items) {
    const letter = item.name?.[0]?.toUpperCase() ?? '#'
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(item)
  }
  return groups
}

/* ── Scrollable Left List ── */
function AlphaList({ items, selectedId, onSelect }) {
  const grouped = useMemo(() => groupByLetter(items), [items])
  const letters = Object.keys(grouped).sort()

  if (items.length === 0) {
    return <p style={{ padding: '1.5rem', color: 'var(--muted)', margin: 0 }}>No hostels found.</p>
  }

  return letters.map((letter) => (
    <div key={letter}>
      <div style={{ padding: '6px 16px 4px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.08em', background: 'var(--bg, #f8f8fa)', borderBottom: '1px solid var(--border)', userSelect: 'none' }}>
        {letter}
      </div>
      {grouped[letter].map((item) => {
        const id = item.slug
        const isActive = selectedId === id
        return (
          <button
            key={id}
            onClick={() => onSelect(item)}
            style={{ width: '100%', textAlign: 'left', background: isActive ? 'var(--accent)' : 'transparent', border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer', padding: '10px 16px', fontSize: '0.88rem', fontWeight: isActive ? 600 : 400, color: isActive ? '#fff' : 'var(--text)', lineHeight: 1.4, transition: 'background 0.12s, color 0.12s', display: 'block' }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--accent-faint, rgba(124,29,46,0.09))' }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
          >
            {item.name}
          </button>
        )
      })}
    </div>
  ))
}

/* ── Detail Panel with iframe embed map ── */
function HostelDetail({ selected }) {
  if (!selected) {
    return (
      <div style={{ color: 'var(--muted)', marginTop: '2rem', textAlign: 'center' }}>
        <span style={{ fontSize: '3rem', display: 'block', marginBottom: '1rem' }}>🏢</span>
        Select a hostel from the list to see its details and campus location.
      </div>
    )
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <span style={{ fontSize: '2.2rem' }}>{selected.icon || '🏠'}</span>
        <div>
          <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 4, background: selected.type === 'Girls' ? '#fde2e4' : '#e2effd', color: selected.type === 'Girls' ? '#c9184a' : '#005f73', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: 4 }}>
            {selected.type}
          </span>
          <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, color: 'var(--heading)', lineHeight: 1.2 }}>
            {selected.name}
          </h2>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 20 }}>
        <tbody>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '8px 16px 8px 0', fontWeight: 700, fontSize: '0.85rem', color: 'var(--heading)', width: 120 }}>Campus</td>
            <td style={{ padding: '8px 0', fontSize: '0.85rem', color: 'var(--text)' }}>
              {selected.campus}
            </td>
          </tr>
          <tr style={{ borderBottom: '1px solid var(--border)' }}>
            <td style={{ padding: '8px 16px 8px 0', fontWeight: 700, fontSize: '0.85rem', color: 'var(--heading)' }}>Allotment Type</td>
            <td style={{ padding: '8px 0', fontSize: '0.85rem', color: 'var(--text)' }}>
              Merit-cum-Means (marks weighted admission criteria)
            </td>
          </tr>
        </tbody>
      </table>

      {selected.address && (
        <div style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>
            📍 Campus Map Location
          </h3>
          <div style={{ position: 'relative', width: '100%', height: '320px', borderRadius: 12, overflow: 'hidden', border: '1px solid var(--border)', background: '#eee' }}>
            <iframe
              src={selected.address}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      )}
    </>
  )
}

export default function HostelPGInfo() {
  const [hostels, setHostels] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selected, setSelected] = useState(null)
  const [campusFilter, setCampusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  useEffect(() => {
    apiClient.get('/hostels')
      .then((data) => {
        // Normalise list on load
        const normalised = data.map(h => ({
          ...h,
          campus: normaliseCampus(h.campus)
        }))
        setHostels(normalised)
        if (normalised.length > 0) {
          setSelected(normalised[0])
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // Combined filtering
  const filtered = useMemo(() => {
    return hostels.filter(h => {
      const matchCampus = campusFilter === 'All' || h.campus === campusFilter
      const matchType = typeFilter === 'All' || h.type === typeFilter
      return matchCampus && matchType
    })
  }, [hostels, campusFilter, typeFilter])

  const handleCampusChange = (tab) => {
    setCampusFilter(tab)
    const nextList = hostels.filter(h => {
      const matchCampus = tab === 'All' || h.campus === tab
      const matchType = typeFilter === 'All' || h.type === typeFilter
      return matchCampus && matchType
    })
    setSelected(nextList[0] || null)
  }

  const handleTypeChange = (typeVal) => {
    setTypeFilter(typeVal)
    const nextList = hostels.filter(h => {
      const matchCampus = campusFilter === 'All' || h.campus === campusFilter
      const matchType = typeVal === 'All' || h.type === typeVal
      return matchCampus && matchType
    })
    setSelected(nextList[0] || null)
  }

  return (
    <>
      <PageHeader
        crumb="Student Services"
        title="Hostel / PG Information"
        lede="Accommodation options available to University of Delhi students."
      />
      <section className="section">
        <div className="container">

          {loading && <p style={{ color: 'var(--muted)' }}>Loading hostels…</p>}
          {error && <p style={{ color: '#c0392b' }}>Error: {error}</p>}

          {!loading && !error && (
            <>
              {/* ── Filters row ── */}
              <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 28, alignItems: 'center' }}>
                {/* Campus Tabs */}
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {CAMPUS_TABS.map((tab) => {
                    const isActive = campusFilter === tab
                    return (
                      <button
                        key={tab}
                        onClick={() => handleCampusChange(tab)}
                        style={{
                          padding: '6px 16px',
                          borderRadius: 20,
                          border: '1.5px solid var(--border)',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.82rem',
                          background: isActive ? 'var(--accent)' : 'var(--surface)',
                          color: isActive ? '#fff' : 'var(--text)',
                          transition: 'background 0.15s, color 0.15s',
                        }}
                      >
                        {tab === 'All' ? 'All Campuses' : tab}
                      </button>
                    )
                  })}
                </div>

                {/* Gender Filters */}
                <div style={{ display: 'flex', gap: 8, borderLeft: '1px solid var(--border)', paddingLeft: 24 }}>
                  {TYPE_TABS.map((t) => {
                    const isActive = typeFilter === t
                    return (
                      <button
                        key={t}
                        onClick={() => handleTypeChange(t)}
                        style={{
                          padding: '6px 16px',
                          borderRadius: 8,
                          border: isActive ? '1.5px solid var(--accent)' : '1.5px solid var(--border)',
                          cursor: 'pointer',
                          fontWeight: 600,
                          fontSize: '0.82rem',
                          background: isActive ? 'var(--accent-faint, rgba(124,29,46,0.08))' : 'var(--surface)',
                          color: isActive ? 'var(--accent)' : 'var(--text)',
                          transition: 'border 0.15s, color 0.15s',
                        }}
                      >
                        {t === 'All' ? 'All Genders' : t}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* ── Split Panel Layout ── */}
              <div style={{ display: 'flex', gap: 0, alignItems: 'stretch', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', minHeight: 520, background: 'var(--surface)', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>
                
                {/* List Sidebar */}
                <div style={{ width: 310, flexShrink: 0, borderRight: '1px solid var(--border)', overflowY: 'auto', maxHeight: 620 }}>
                  <AlphaList
                    items={filtered}
                    selectedId={selected?.slug}
                    onSelect={setSelected}
                  />
                </div>

                {/* Right details context */}
                <div style={{ flex: 1, padding: '2rem 2.2rem', overflowY: 'auto', maxHeight: 620 }}>
                  <HostelDetail selected={selected} />
                </div>
              </div>
            </>
          )}

          {/* PG disclaimer footer banner */}
          <div style={{ marginTop: '2.5rem', padding: '1.4rem', border: '1px solid var(--border)', borderRadius: 12, background: 'var(--bg, #fbfbfd)' }}>
            <h2 style={{ fontSize: '1.1rem', margin: '0 0 6px', color: 'var(--heading)' }}>PG / Off-Campus Accommodation</h2>
            <p style={{ margin: '0 0 16px', fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.6 }}>
              Students who do not get hostel allotment often seek Paying Guest (PG) accommodation in areas such as Kamla Nagar, Hudson Lane, GTB Nagar, and Hauz Khas. DUSU recommends verifying safety, rent agreements, and landlord credentials before signing up.
            </p>
            <a
              href="https://accommodation.uod.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              style={{ display: 'inline-flex', padding: '8px 18px', fontSize: '0.85rem' }}
            >
              🔗 DU Accommodation Portal
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
