import { useState, useEffect, useMemo } from 'react'
import {
  Building,
  MapPin,
  Lightbulb,
  ShieldCheck,
  Lock,
  FileText,
  UserCheck
} from 'lucide-react'
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

/* ── Detail Panel with iframe embed map ── */
function HostelDetail({ selected }) {
  if (!selected) {
    return (
      <div style={{ color: 'var(--muted)', marginTop: '2rem', textAlign: 'center' }}>
        <Building size={48} style={{ color: 'var(--muted)', display: 'block', margin: '0 auto 1rem' }} />
        Select a hostel from the list to see its details and campus location.
      </div>
    )
  }

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <span style={{ display: 'inline-block', padding: '2px 8px', borderRadius: 4, background: selected.type === 'Girls' ? '#fde2e4' : '#e2effd', color: selected.type === 'Girls' ? '#c9184a' : '#005f73', fontWeight: 700, fontSize: '0.72rem', textTransform: 'uppercase', marginBottom: 4 }}>
          {selected.type}
        </span>
        <h2 style={{ margin: 0, fontSize: '1.45rem', fontWeight: 800, color: 'var(--heading)', lineHeight: 1.2 }}>
          {selected.name}
        </h2>
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
          <h3 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            <MapPin size={16} style={{ color: 'var(--primary)' }} />
            <span>Campus Map Location</span>
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
              {/* ── PG Accommodation Quick Link Card ── */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '16px 24px',
                background: 'linear-gradient(135deg, rgba(230,175,46,0.08) 0%, rgba(153,0,204,0.04) 100%)',
                borderLeft: '4px solid var(--accent, #9900cc)',
                borderRadius: '8px',
                marginBottom: '28px',
                gap: '20px',
                flexWrap: 'wrap',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)'
              }}>
                <div style={{ flex: '1', minWidth: '280px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.72rem', fontWeight: 800, color: 'var(--accent, #9900cc)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                    <Lightbulb size={14} /> Private PG & Off-Campus Accommodation
                  </span>
                  <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 750, color: 'var(--heading)', marginBottom: '4px' }}>
                    Looking for a Paying Guest (PG) near Campus?
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text)', lineHeight: '1.45' }}>
                    Didn't receive a university hostel allotment? Check out verified PG resources near campus — see the safety checklist below.
                  </p>
                </div>
              </div>

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
                          background: isActive ? 'var(--accent-faint, rgba(153,0,204,0.08))' : 'var(--surface)',
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

          {/* PG Safety Verification Guide */}
          <div style={{ marginTop: '3rem', padding: '2rem', border: '1px solid var(--border)', borderRadius: 12, background: 'var(--surface)', boxShadow: '0 4px 18px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <ShieldCheck size={28} style={{ color: 'var(--primary)' }} />
              <div>
                <h3 style={{ fontSize: '1.15rem', margin: 0, fontWeight: 800, color: 'var(--heading)' }}>PG & Off-Campus Accommodation Checklist</h3>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--muted)' }}>Essential tips and safety guidelines recommended by DUSU for private rentals</p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '20px' }}>
              <div style={{ padding: '14px', borderRadius: '8px', background: 'var(--bg, #f8f9fa)', border: '1px solid var(--border)' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '0.88rem', fontWeight: 700, color: 'var(--heading)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <Lock size={16} style={{ color: 'var(--primary)' }} /> Security Checks
                </h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text)', lineHeight: '1.45' }}>
                  Verify safety locks, CCTV cameras, active security guards, and neighborhood lighting.
                </p>
              </div>

              <div style={{ padding: '14px', borderRadius: '8px', background: 'var(--bg, #f8f9fa)', border: '1px solid var(--border)' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '0.88rem', fontWeight: 700, color: 'var(--heading)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <FileText size={16} style={{ color: 'var(--primary)' }} /> Agreement Checks
                </h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text)', lineHeight: '1.45' }}>
                  Read terms on tenancy duration, refund policy of deposits, and payment details carefully.
                </p>
              </div>

              <div style={{ padding: '14px', borderRadius: '8px', background: 'var(--bg, #f8f9fa)', border: '1px solid var(--border)' }}>
                <h4 style={{ margin: '0 0 6px', fontSize: '0.88rem', fontWeight: 700, color: 'var(--heading)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <UserCheck size={16} style={{ color: 'var(--primary)' }} /> Landlord Verification
                </h4>
                <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text)', lineHeight: '1.45' }}>
                  Choose properties recommended by DUSU cells or listed officially by the university.
                </p>
              </div>
            </div>

            <div style={{ paddingTop: '14px', borderTop: '1px solid var(--border)' }}>
              <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text)' }}>
                For queries or assistance regarding campus-area rentals, contact the DUSU Student Helpdesk.
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
