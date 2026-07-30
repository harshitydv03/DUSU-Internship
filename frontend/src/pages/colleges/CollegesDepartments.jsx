import { useState, useEffect, useMemo } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import apiClient from '../../utils/apiClient.js'

// Tabs for colleges: North / South / Off Campus (East+West+Central merged)
// Plus a separate Departments tab
const COLLEGE_TABS = ['All', 'North', 'South', 'Off Campus']

/** Normalise campus: East, West, or Central → Off Campus */
function normaliseCampus(campus) {
  if (campus === 'East' || campus === 'West' || campus === 'Central') return 'Off Campus'
  return campus
}

/** Group a sorted list by first letter of .name */
function groupByLetter(items) {
  const groups = {}
  for (const item of items) {
    const letter = item.name?.[0]?.toUpperCase() ?? '#'
    if (!groups[letter]) groups[letter] = []
    groups[letter].push(item)
  }
  return groups
}

/* ── Shared detail panel for colleges ─────────────────────────── */
function CollegeDetail({ selected }) {
  if (!selected) {
    return (
      <p style={{ color: 'var(--muted)', marginTop: '2rem' }}>
        Select a college from the list to see its details.
      </p>
    )
  }
  const rows = [
    ['Campus',               selected.campus],
    ['Year Established',     selected.yearEstablished],
    ['Founding Body',        selected.foundingBody],
    ['Awards / Recognition', selected.awards],
    ['Student Union Status', selected.studentUnionStatus],
  ]
  return (
    <>
      <h2 style={{ margin: '0 0 20px', fontSize: '1.7rem', fontWeight: 800, color: 'var(--heading)', lineHeight: 1.2 }}>
        {selected.name}
      </h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <tbody>
          {rows.map(([label, value]) =>
            value && value !== 'NA' ? (
              <tr key={label} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '9px 16px 9px 0', fontWeight: 700, fontSize: '0.88rem', color: 'var(--heading)', whiteSpace: 'nowrap', verticalAlign: 'top', width: 190 }}>
                  {label}
                </td>
                <td style={{ padding: '9px 0', fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.55, verticalAlign: 'top' }}>
                  {value}
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      {selected.shortHistory && (
        <p style={{ margin: '0 0 28px', fontSize: '0.91rem', color: 'var(--text)', lineHeight: 1.75 }}>
          {selected.shortHistory}
        </p>
      )}
      {selected.website && (
        <a
          href={selected.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 22px', background: 'var(--accent)', color: '#fff', borderRadius: 30, fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none', transition: 'opacity 0.15s', boxShadow: '0 2px 8px rgba(0,0,0,0.14)' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {selected.website.replace(/^https?:\/\//, '')}
        </a>
      )}
    </>
  )
}

/* ── Shared detail panel for departments ──────────────────────── */
function DepartmentDetail({ selected }) {
  if (!selected) {
    return (
      <p style={{ color: 'var(--muted)', marginTop: '2rem' }}>
        Select a department from the list to see its details.
      </p>
    )
  }
  const rows = [
    ['Faculty',  selected.faculty],
    ['Campus',   selected.campus],
    ['Phone',    selected.phone],
    ['Email',    selected.email],
    ['Address',  selected.address],
  ]
  return (
    <>
      <h2 style={{ margin: '0 0 20px', fontSize: '1.7rem', fontWeight: 800, color: 'var(--heading)', lineHeight: 1.2 }}>
        {selected.name}
      </h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 24 }}>
        <tbody>
          {rows.map(([label, value]) =>
            value ? (
              <tr key={label} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '9px 16px 9px 0', fontWeight: 700, fontSize: '0.88rem', color: 'var(--heading)', whiteSpace: 'nowrap', verticalAlign: 'top', width: 100 }}>
                  {label}
                </td>
                <td style={{ padding: '9px 0', fontSize: '0.88rem', color: 'var(--text)', lineHeight: 1.55, verticalAlign: 'top' }}>
                  {label === 'Email'
                    ? <a href={`mailto:${value}`} style={{ color: 'var(--accent)' }}>{value}</a>
                    : value}
                </td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      {selected.shortHistory && (
        <p style={{ margin: '0 0 28px', fontSize: '0.91rem', color: 'var(--text)', lineHeight: 1.75 }}>
          {selected.shortHistory}
        </p>
      )}
      {selected.website && (
        <a
          href={selected.website}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 7, padding: '9px 22px', background: 'var(--accent)', color: '#fff', borderRadius: 30, fontWeight: 600, fontSize: '0.88rem', textDecoration: 'none', transition: 'opacity 0.15s', boxShadow: '0 2px 8px rgba(0,0,0,0.14)' }}
          onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
        >
          {selected.website.replace(/^https?:\/\//, '')}
        </a>
      )}
    </>
  )
}

/* ── Scrollable left-panel list ───────────────────────────────── */
function AlphaList({ items, selectedId, onSelect }) {
  const grouped = useMemo(() => groupByLetter(items), [items])
  const letters = Object.keys(grouped).sort()

  if (items.length === 0) {
    return <p style={{ padding: '1.5rem', color: 'var(--muted)', margin: 0 }}>No results found.</p>
  }

  return letters.map((letter) => (
    <div key={letter}>
      <div style={{ padding: '6px 16px 4px', fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', letterSpacing: '0.08em', background: 'var(--bg, #f8f8fa)', borderBottom: '1px solid var(--border)', userSelect: 'none' }}>
        {letter}
      </div>
      {grouped[letter].map((item) => {
        const id = item.id ?? item.slug
        const isActive = selectedId === id
        return (
          <button
            key={id}
            onClick={() => onSelect(item)}
            style={{ width: '100%', textAlign: 'left', background: isActive ? 'var(--accent)' : 'transparent', border: 'none', borderBottom: '1px solid var(--border)', cursor: 'pointer', padding: '10px 16px', fontSize: '0.88rem', fontWeight: isActive ? 600 : 400, color: isActive ? '#fff' : 'var(--text)', lineHeight: 1.4, transition: 'background 0.12s, color 0.12s', display: 'block' }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = 'var(--accent-faint, rgba(153,0,204,0.09))' }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
          >
            {item.name}
          </button>
        )
      })}
    </div>
  ))
}

/* ── Main page ────────────────────────────────────────────────── */
export default function CollegesDepartments() {
  const [colleges, setColleges]         = useState([])
  const [departments, setDepartments]   = useState([])
  const [loading, setLoading]           = useState(true)
  const [error, setError]               = useState(null)
  const [activeTab, setActiveTab]       = useState('All')         // college campus tab or 'Departments'
  const [selectedCollege, setSelectedCollege] = useState(null)
  const [selectedDept, setSelectedDept]       = useState(null)

  useEffect(() => {
    Promise.all([
      apiClient.get('/colleges'),
      apiClient.get('/departments')
    ])
      .then(([collegesData, deptsData]) => {
        // Normalise East/West → Off Campus on load
        const normalised = collegesData.map((c) => ({ ...c, campus: normaliseCampus(c.campus) }))
        setColleges(normalised)
        if (normalised.length > 0) setSelectedCollege(normalised[0])

        setDepartments(deptsData)
        if (deptsData.length > 0) setSelectedDept(deptsData[0])
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  /* ── Derived data ── */
  const isDepts = activeTab === 'Departments'

  const filteredColleges = useMemo(
    () => colleges.filter((c) => activeTab === 'All' || activeTab === 'Departments' || c.campus === activeTab),
    [colleges, activeTab]
  )

  // Dept sub-filter mirrors college campus names
  const filteredDepts = departments   // all shown under Departments tab (already filtered by campus in list if needed)

  const collegeCounts = useMemo(() =>
    COLLEGE_TABS.reduce((acc, tab) => {
      acc[tab] = tab === 'All' ? colleges.length : colleges.filter((c) => c.campus === tab).length
      return acc
    }, {}),
    [colleges]
  )

  const handleTabClick = (tab) => {
    setActiveTab(tab)
    setSelectedCollege(null)
    setSelectedDept(null)
  }

  /* ── IDs for selection tracking ── */
  const selectedCollegeId = selectedCollege?.id ?? selectedCollege?.slug
  const selectedDeptId    = selectedDept?.slug

  const ALL_TABS = [...COLLEGE_TABS, 'Departments']

  return (
    <>
      <PageHeader
        crumb="Campus Life"
        title="Colleges & Departments"
        lede="All DUSU-affiliated colleges and academic departments of the University of Delhi."
      />

      <section className="section">
        <div className="container">

          {/* ── Tab bar ── */}
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 28 }}>
            {ALL_TABS.map((tab) => {
              const isActive = activeTab === tab
              const isDeptTab = tab === 'Departments'
              const count = isDeptTab ? departments.length : (collegeCounts[tab] ?? 0)
              return (
                <button
                  key={tab}
                  onClick={() => handleTabClick(tab)}
                  style={{
                    padding: '7px 18px',
                    borderRadius: 20,
                    border: '1.5px solid var(--border)',
                    cursor: 'pointer',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    background: isActive ? 'var(--accent)' : 'var(--surface)',
                    color: isActive ? '#fff' : 'var(--text)',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                >
                  {tab === 'All' ? 'All Campuses' : tab}{' '}
                  <span style={{ opacity: 0.7 }}>({count})</span>
                </button>
              )
            })}
          </div>

          {loading && <p style={{ color: 'var(--muted)' }}>Loading colleges…</p>}
          {error   && <p style={{ color: '#c0392b' }}>Error: {error}</p>}

          {(!loading || isDepts) && !error && (
            <div style={{ display: 'flex', gap: 0, alignItems: 'stretch', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', minHeight: 520, background: 'var(--surface)', boxShadow: '0 2px 16px rgba(0,0,0,0.07)' }}>

              {/* ── Left: A-Z list ── */}
              <div style={{ width: 290, flexShrink: 0, borderRight: '1px solid var(--border)', overflowY: 'auto', maxHeight: 620 }}>
                {isDepts ? (
                  <AlphaList
                    items={filteredDepts}
                    selectedId={selectedDeptId}
                    onSelect={setSelectedDept}
                  />
                ) : (
                  <AlphaList
                    items={filteredColleges}
                    selectedId={selectedCollegeId}
                    onSelect={setSelectedCollege}
                  />
                )}
              </div>

              {/* ── Right: Detail panel ── */}
              <div style={{ flex: 1, padding: '2rem 2.2rem', overflowY: 'auto', maxHeight: 620 }}>
                {isDepts
                  ? <DepartmentDetail selected={selectedDept} />
                  : <CollegeDetail   selected={selectedCollege} />
                }
              </div>
            </div>
          )}

          {/* Footer count */}
          {!loading && !error && !isDepts && filteredColleges.length > 0 && (
            <p style={{ marginTop: 14, fontSize: '0.82rem', color: 'var(--muted)', textAlign: 'right' }}>
              {filteredColleges.length} college{filteredColleges.length !== 1 ? 's' : ''} · {activeTab === 'All' ? 'All Campuses' : activeTab}
            </p>
          )}
          {isDepts && (
            <p style={{ marginTop: 14, fontSize: '0.82rem', color: 'var(--muted)', textAlign: 'right' }}>
              {departments.length} departments
            </p>
          )}

        </div>
      </section>
    </>
  )
}
