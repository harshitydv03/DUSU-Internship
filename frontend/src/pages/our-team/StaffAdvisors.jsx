import React, { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader.jsx'
import apiClient from '../../utils/apiClient.js'
import Icon from '../../components/Icon.jsx'

export default function StaffAdvisors() {
  const [advisors, setAdvisors] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    apiClient.get('/staffadvisors')
      .then((data) => {
        setAdvisors(data || [])
      })
      .catch((err) => {
        console.error('Failed to fetch staff advisors:', err)
        setError(err.message)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <PageHeader
        crumb="Administration"
        title="Staff Advisors"
        lede="Faculty members appointed by the University to guide and advise the Students' Union."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 960 }}>
          <div style={{ marginBottom: 36 }}>
            <p style={{ color: 'var(--muted)', lineHeight: 1.8, fontSize: '1.05rem', margin: 0 }}>
              The Staff Advisory Committee consists of senior faculty members nominated by the University of Delhi. 
              They provide institutional guidance, ensure constitutional compliance, and serve as an important bridge 
              between the DUSU elected student union and the University administration.
            </p>
          </div>

          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem 0' }}>
              <div className="spinner" style={{ border: '3px solid var(--border)', borderTop: '3px solid var(--accent)', borderRadius: '50%', width: 40, height: 40, animation: 'spin 1s linear infinite' }} />
              <style>{`
                @keyframes spin {
                  0% { transform: rotate(0deg); }
                  100% { transform: rotate(360deg); }
                }
              `}</style>
            </div>
          ) : error ? (
            <div style={{ padding: '2rem', background: 'rgba(255,0,0,0.05)', border: '1px solid rgba(255,0,0,0.1)', borderRadius: 12, color: 'var(--ink)' }}>
              <p style={{ fontWeight: 600, margin: '0 0 8px' }}>Unable to load Staff Advisors</p>
              <p style={{ margin: 0, fontSize: '0.88rem', opacity: 0.8 }}>{error}</p>
            </div>
          ) : advisors.length === 0 ? (
            <div style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: '2rem 2.4rem',
              boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
            }}>
              <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: 0, display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                <AlertCircle size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                <span>The list of Staff Advisors for the 2026–27 session will be updated here once officially communicated.</span>
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {advisors.map((advisor) => {
                const initials = advisor.initials || 
                  (advisor.name ? advisor.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase() : 'SK')
                return (
                  <div 
                    key={advisor.id || advisor.name} 
                    style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 16,
                      padding: '2rem 2.5rem',
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      display: 'flex',
                      flexDirection: 'row',
                      gap: 28,
                      alignItems: 'flex-start',
                      flexWrap: 'wrap',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = '0 6px 24px rgba(0,0,0,0.09)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.06)'
                    }}
                  >
                    {/* Left Avatar Column */}
                    <div style={{
                      width: 90,
                      height: 90,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff',
                      fontSize: '2.2rem',
                      fontWeight: 800,
                      boxShadow: 'var(--shadow)',
                      flexShrink: 0
                    }}>
                      {initials}
                    </div>

                    {/* Right Content Column */}
                    <div style={{ flex: 1, minWidth: 280 }}>
                      <div style={{ marginBottom: 16 }}>
                        <h2 style={{ margin: '0 0 4px', fontSize: '1.6rem', color: 'var(--heading)', fontWeight: 800 }}>
                          {advisor.name}
                        </h2>
                        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
                          <span style={{ 
                            color: 'var(--primary)', 
                            fontWeight: 700, 
                            fontSize: '0.92rem', 
                            textTransform: 'uppercase', 
                            letterSpacing: '0.5px' 
                          }}>
                            {advisor.role || 'Staff Advisor'}
                          </span>
                          <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--muted)', opacity: 0.6 }} />
                          <span style={{ color: 'var(--muted)', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <Icon name="Building" size={14} /> {advisor.college || 'University of Delhi'}
                          </span>
                        </div>
                      </div>

                      <p style={{ 
                        margin: 0, 
                        color: 'var(--text)', 
                        fontSize: '1rem', 
                        lineHeight: 1.7,
                        background: 'var(--bg, rgba(0,0,0,0.02))',
                        padding: '1.2rem 1.4rem',
                        borderRadius: 12,
                        borderLeft: '4px solid var(--accent)'
                      }}>
                        {advisor.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
