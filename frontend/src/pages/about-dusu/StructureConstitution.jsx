import { useState, useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import AboutSection from '../../components/about-dusu/AboutSection.jsx'
import apiClient from '../../utils/apiClient.js'

export default function StructureConstitution() {
  const [constitution, setConstitution] = useState([])
  const [search, setSearch] = useState('')
  const [expandedChapter, setExpandedChapter] = useState('CHAPTER – I')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiClient.get('/dusuconstitution')
      .then((data) => {
        if (data && data.length > 0) {
          // Sort items by chapter number
          const sorted = [...data].sort((a,b) => {
            const getNum = (ch) => {
              const matches = ch.match(/CHAPTER\s*–?\s*([IVXLCDM]+)/i)
              if (!matches) return 99
              const roman = matches[1].toUpperCase()
              const map = { I: 1, II: 2, III: 3, IV: 4, V: 5, VI: 6, VII: 7, VIII: 8 }
              return map[roman] || 99
            }
            return getNum(a.chapter) - getNum(b.chapter)
          })
          setConstitution(sorted)
        }
        setLoading(false)
      })
      .catch((err) => {
        console.error('Failed to fetch constitution:', err)
        setLoading(false)
      })
  }, [])

  // Search logic covering chapter titles, clause numbers, titles, contents, and subpoints
  const filteredConstitution = constitution.map(ch => {
    const matchingArticles = ch.articles.filter(art => {
      const q = search.toLowerCase()
      const titleMatches = art.title.toLowerCase().includes(q)
      const contentMatches = art.content.toLowerCase().includes(q)
      const numberMatches = String(art.number).includes(q)
      const subPointsMatches = art.subPoints && art.subPoints.some(pt => pt.toLowerCase().includes(q))
      return titleMatches || contentMatches || numberMatches || subPointsMatches
    })
    return { ...ch, articles: matchingArticles }
  }).filter(ch => ch.articles.length > 0)

  return (
    <>
      <PageHeader
        crumb="About"
        title="Structure & Constitution"
        lede="How the union is organised — from the central panel to college-level representation."
      />
      <AboutSection>
        <h2>Central panel</h2>
        <p>
          The union is led by four directly elected office bearers — the <strong>President</strong>,{' '}
          <strong>Vice President</strong>, <strong>Secretary</strong> and{' '}
          <strong>Joint Secretary</strong> — who together form the DUSU central panel for an
          academic year.
        </p>
        <h2>College representation</h2>
        <p>
          Each affiliated college union sends representatives to DUSU, ensuring that issues from
          every campus — North Campus, South Campus, and off-campus colleges — reach the central
          panel. College presidents and central councillors form the broader DUSU council.
        </p>
        <h2>Governance</h2>
        <ul>
          <li>Functioning is governed by the DUSU constitution and University of Delhi rules</li>
          <li>Elections follow the Lyngdoh Committee guidelines notified by the Supreme Court</li>
          <li>The Chief Election Officer appointed by the University conducts the annual election</li>
          <li>Union accounts and activities are subject to University oversight</li>
        </ul>

        <h2 style={{ marginTop: '2.5rem' }}>Interactive Constitution Explorer</h2>
        <p style={{ marginBottom: '1.5rem', color: 'var(--muted)' }}>
          Search the official DUSU Constitution clauses, chapters, or conditions to learn details about student membership, duties, funds, and organizational structures.
        </p>

        {/* Search Bar */}
        <div style={{ marginBottom: '22px' }}>
          <input
            type="text"
            placeholder="🔍 Search articles, chapters, or keywords (e.g. Patron, quorum, age, no-confidence)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px',
              borderRadius: '14px',
              border: '1.5px solid var(--border)',
              background: 'var(--surface)',
              color: 'var(--text)',
              fontSize: '0.95rem',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              outline: 'none',
              transition: 'all 0.2s ease',
              boxSizing: 'border-box'
            }}
          />
        </div>

        {/* Accordion Explorer */}
        {loading ? (
          <p style={{ color: 'var(--muted)' }}>Loading constitution...</p>
        ) : filteredConstitution.length > 0 ? (
          filteredConstitution.map((ch) => {
            const isExpanded = expandedChapter === ch.chapter || search.length > 0
            return (
              <div 
                key={ch.chapter} 
                style={{
                  background: 'var(--surface)',
                  border: '1.5px solid var(--border)',
                  borderRadius: '16px',
                  marginBottom: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                }}
              >
                <div 
                  onClick={() => setExpandedChapter(isExpanded ? null : ch.chapter)}
                  style={{
                    padding: '16px 24px',
                    background: 'var(--surface-soft, rgba(0,0,0,0.015))',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderBottom: isExpanded ? '1.5px solid var(--border)' : 'none',
                    userSelect: 'none'
                  }}
                >
                  <span style={{ fontWeight: 700, color: 'var(--primary)', letterSpacing: '0.05em' }}>{ch.chapter}</span>
                  <span style={{ fontSize: '0.85rem', color: 'var(--muted)', fontWeight: 600 }}>
                    {isExpanded ? '▲ Hide Sections' : `▼ View (${ch.articles.length} Articles)`}
                  </span>
                </div>
                
                {isExpanded && (
                  <div style={{ padding: '20px 24px' }}>
                    {ch.articles.map((art) => (
                      <div 
                        key={art.number} 
                        style={{ 
                          marginBottom: '20px', 
                          borderBottom: '1px dashed var(--border)', 
                          paddingBottom: '16px'
                        }}
                      >
                        <h4 style={{ margin: '0 0 10px', fontSize: '1.05rem', color: 'var(--heading)', fontWeight: 700 }}>
                          Clause {art.number}: {art.title}
                        </h4>
                        <p style={{ margin: '0 0 8px', lineHeight: 1.6, fontSize: '0.92rem', color: 'var(--text)' }}>
                          {art.content}
                        </p>
                        {art.subPoints && art.subPoints.length > 0 && (
                          <ul style={{ margin: 0, paddingLeft: '15px', listStyleType: 'none' }}>
                            {art.subPoints.map((pt, i) => (
                              <li key={i} style={{ marginBottom: '6px', lineHeight: 1.6, fontSize: '0.88rem', color: 'var(--muted)', position: 'relative', paddingLeft: '14px' }}>
                                <span style={{ position: 'absolute', left: 0, color: 'var(--primary)' }}>•</span>
                                {pt}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })
        ) : (
          <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '20px' }}>No matching articles found.</p>
        )}
      </AboutSection>
    </>
  )
}
