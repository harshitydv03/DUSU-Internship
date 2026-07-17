import { useState, useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import apiClient from '../../utils/apiClient.js'

export default function HealthServices() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('student')

  useEffect(() => {
    apiClient.get('/medical')
      .then((res) => {
        if (res && res.length > 0) {
          setData(res[0])
        }
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <>
        <PageHeader
          crumb="Student Services"
          title="Health Services"
          lede="The Wellness & University Health Service (WUS) provides comprehensive medical care to Delhi University."
        />
        <section className="section">
          <div className="container" style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ color: 'var(--muted)', fontSize: '1.1rem' }}>Loading health services directory…</div>
          </div>
        </section>
      </>
    )
  }

  if (error || !data) {
    return (
      <>
        <PageHeader
          crumb="Student Services"
          title="Health Services"
          lede="The Wellness & University Health Service (WUS) provides comprehensive medical care to Delhi University."
        />
        <section className="section">
          <div className="container" style={{ textAlign: 'center', padding: '3rem 0' }}>
            <div style={{ color: '#c0392b', fontSize: '1.1rem' }}>Error loading medical directory: {error || 'No data found'}</div>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      <PageHeader
        crumb="Student Services"
        title="Health Services"
        lede="The World World University Service (W.U.S.) Health Centre provides comprehensive primary healthcare to students and staff."
      />
      
      <section className="section" style={{ background: 'var(--bg-faint, #fafafa)', paddingBottom: '4rem' }}>
        <div className="container" style={{ maxWidth: 1000 }}>
          
          {/* About WUS Main card */}
          <div style={{
            background: 'var(--surface, #fff)',
            border: '1px solid var(--border)',
            borderRadius: 16,
            padding: '2.2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
            marginBottom: 32,
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: 'linear-gradient(90deg, var(--accent) 0%, var(--accent-gold) 100%)'
            }} />
            <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1rem' }}>🏥</span>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 850, color: 'var(--heading)', margin: '0 0 12px' }}>
              About World University Service (W.U.S.) Health Centre
            </h2>
            <p style={{ lineHeight: 1.7, color: 'var(--text)', fontSize: '0.94rem', margin: '0 0 16px' }}>
              {data.about}
            </p>
            <div style={{
              background: 'var(--bg, #fcfcfd)',
              borderLeft: '4px solid var(--accent)',
              padding: '12px 18px',
              borderRadius: 4,
              fontSize: '0.86rem',
              color: 'var(--text)',
              lineHeight: 1.5
            }}>
              <strong>🕒 Nodal Center Operations:</strong> {data.nodalOperations}
            </div>
          </div>

          {/* Locations Directory Grid */}
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--heading)', marginBottom: 20 }}>
            📍 Health Centers Directory
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 16,
            marginBottom: 36
          }}>
            {data.locations.map((loc, idx) => (
              <div key={idx} style={{
                background: 'var(--surface, #fff)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '1.2rem',
                boxShadow: '0 2px 8px rgba(0,0,0,0.02)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 150
              }}>
                <div>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 750, color: 'var(--heading)', margin: '0 0 6px' }}>
                    {loc.name}
                  </h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--muted)', margin: '0 0 10px', lineHeight: 1.4 }}>
                    {loc.address}
                  </p>
                </div>
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 10, marginTop: 10 }}>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span>🕒</span> {loc.hours}
                  </div>
                  {loc.contact && (
                    <div style={{ fontSize: '0.74rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span>📞</span> {loc.contact}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Service Tabs */}
          <div style={{
            display: 'flex',
            borderBottom: '1px solid var(--border)',
            gap: 8,
            marginBottom: 24,
            overflowX: 'auto'
          }}>
            {[
              { id: 'student', label: '🎓 For Students', icon: '🧑‍🎓' },
              { id: 'staff', label: '💼 For University Staff', icon: '👔' },
              { id: 'specialists', label: '🩺 Clinical & Specialty Directory', icon: '🔬' }
            ].map((tab) => {
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    padding: '12px 20px',
                    background: 'transparent',
                    border: 'none',
                    borderBottom: active ? '3px solid var(--accent)' : '3px solid transparent',
                    color: active ? 'var(--accent)' : 'var(--text)',
                    fontWeight: active ? 750 : 500,
                    fontSize: '0.9rem',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    transition: 'all 0.15s'
                  }}
                >
                  <span>{tab.icon}</span> {tab.label}
                </button>
              )
            })}
          </div>

          {/* ACTIVE TAB CONTENT */}
          
          {/* TAB 1: students */}
          {activeTab === 'student' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Contribution summary */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(124, 29, 46, 0.04) 0%, rgba(230, 175, 46, 0.04) 100%)',
                border: '1px solid var(--border)',
                borderRadius: 12,
                padding: '1.5rem',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 20,
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem', fontWeight: 800, color: 'var(--heading)' }}>
                    Affordable Student Membership Rates
                  </h4>
                  <p style={{ margin: 0, fontSize: '0.84rem', color: 'var(--text)' }}>
                    Membership contribution is gathered annually and integrated directly into your college admissions fee.
                  </p>
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  <div style={{ background: 'var(--surface)', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600 }}>UG / PG ANNUAL FEE</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)' }}>₹120</div>
                  </div>
                  <div style={{ background: 'var(--surface)', padding: '10px 16px', borderRadius: 8, border: '1px solid var(--border)', textAlign: 'center' }}>
                    <div style={{ fontSize: '0.72rem', color: 'var(--muted)', fontWeight: 600 }}>PH.D / M.PHIL FEE</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent)' }}>₹240</div>
                  </div>
                </div>
              </div>

              {/* Benefits */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.8rem' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem', fontWeight: 800, color: 'var(--heading)', display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span>🎁</span> Key Clinical Benefits
                </h3>
                <ul style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {data.studentEnrollment.benefits.map((b, i) => (
                    <li key={i} style={{ fontSize: '0.86rem', color: 'var(--text)', lineHeight: 1.5 }}>
                      {b}
                    </li>
                  ))}
                </ul>
                <div style={{
                  marginTop: 20,
                  padding: '12px 16px',
                  borderRadius: 8,
                  background: 'var(--bg, #fcfcfd)',
                  border: '1px solid var(--border)',
                  fontSize: '0.8rem',
                  color: 'var(--muted)',
                  lineHeight: '1.45'
                }}>
                  ⚠️ <strong>Non-Reimbursement Policy:</strong> Student cardholders are eligible for in-house treatments only. They are not entitled to claim medical reimbursement for medicines, diagnostic tests, or hospitalization purchased from external open-market pharmacies or private hospitals.
                </div>
              </div>

              {/* What to Expect checklist */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.8rem' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem', fontWeight: 800, color: 'var(--heading)' }}>
                  Newly Enrolled Student? What to Expect
                </h3>
                <div style={{ display: 'grid', gap: 16 }}>
                  {data.whatToExpect.map((item, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      gap: 14,
                      paddingBottom: idx !== data.whatToExpect.length - 1 ? 16 : 0,
                      borderBottom: idx !== data.whatToExpect.length - 1 ? '1px solid var(--border)' : 'none'
                    }}>
                      <div style={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        background: 'var(--accent-faint, rgba(124,29,46,0.08))',
                        color: 'var(--accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.82rem',
                        fontWeight: 700,
                        flexShrink: 0,
                        marginTop: 2
                      }}>
                        {idx + 1}
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 4px', fontSize: '0.94rem', fontWeight: 700, color: 'var(--heading)' }}>
                          {item.title}
                        </h4>
                        <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text)', lineHeight: 1.5 }}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: staff */}
          {activeTab === 'staff' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.8rem' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem', fontWeight: 800, color: 'var(--heading)' }}>
                  Staff Eligibility & Dependents
                </h3>
                <p style={{ fontSize: '0.86rem', color: 'var(--text)', lineHeight: 1.6, margin: '0 0 16px' }}>
                  {data.staffEligibility}
                </p>
                <div style={{
                  padding: '12px 16px',
                  background: 'var(--bg, #fcfcfd)',
                  border: '1px solid var(--border)',
                  borderRadius: 8,
                  fontSize: '0.8rem',
                  lineHeight: '1.45',
                  color: 'var(--muted)'
                }}>
                  📖 <strong>Health Booklets:</strong> Every enrolled employee is issued a Treatment Card. In case a health booklet is misplaced, a duplicate one can be acquired from the respective branch for a fee of <strong>₹25</strong> upon submission of a formal police report.
                </div>
              </div>

              {/* Contribution slabs table */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.8rem' }}>
                <h3 style={{ margin: '0 0 12px', fontSize: '1.1rem', fontWeight: 800, color: 'var(--heading)' }}>
                  Monthly Contribution & Life Membership Slabs (7th CPC Pay Matrix)
                </h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--muted)', margin: '0 0 16px' }}>
                  Monthly deductions and membership fees calculated directly based on the Pay Matrix of the 7th Central Pay Commission.
                </p>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid var(--border)', background: 'var(--bg, #fcfcfd)' }}>
                      <th style={{ padding: '10px 12px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--heading)' }}>Pay Matrix Level</th>
                      <th style={{ padding: '10px 12px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--heading)' }}>Active Monthly Contribution</th>
                      <th style={{ padding: '10px 12px', fontSize: '0.8rem', fontWeight: 700, color: 'var(--heading)' }}>Retiree Life Membership Fee</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.staffSlabs.map((slab, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '12px', fontSize: '0.82rem', fontWeight: 600, color: 'var(--heading)' }}>{slab.level}</td>
                        <td style={{ padding: '12px', fontSize: '0.82rem', color: 'var(--text)' }}>{slab.monthly}</td>
                        <td style={{ padding: '12px', fontSize: '0.82rem', color: 'var(--text)' }}>{slab.life}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: clinical */}
          {activeTab === 'specialists' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {/* Specialization List */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.8rem' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem', fontWeight: 800, color: 'var(--heading)' }}>
                  🏥 Core Medical Specialty Areas
                </h3>
                <div style={{ display: 'grid', gap: 14 }}>
                  {data.specialties.map((spec, i) => (
                    <div key={i} style={{
                      padding: 14,
                      background: 'var(--bg, #fcfcfd)',
                      borderRadius: 8,
                      border: '1px solid var(--border)'
                    }}>
                      <div style={{ fontSize: '0.92rem', fontWeight: 750, color: 'var(--heading)', marginBottom: 4 }}>
                        {spec.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text)', lineHeight: 1.45 }}>
                        {spec.domain}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Lab Diagnostics */}
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 12, padding: '1.8rem' }}>
                <h3 style={{ margin: '0 0 16px', fontSize: '1.1rem', fontWeight: 800, color: 'var(--heading)' }}>
                  🔬 Diagnostics, Lab Imaging & Physiotherapy
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
                  {data.diagnostics.map((d, i) => (
                    <div key={i} style={{
                      padding: 16,
                      borderRadius: 10,
                      border: '1px solid var(--border)',
                      background: 'var(--surface)'
                    }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 800, color: 'var(--heading)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span>⚡</span> {d.name}
                      </div>
                      <p style={{ margin: 0, fontSize: '0.78rem', color: 'var(--text)', lineHeight: 1.5 }}>
                        {d.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick link button to site */}
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2.5rem' }}>
            <a
              href="https://wus.uod.ac.in"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-gold"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '10px 24px',
                fontSize: '0.88rem',
                fontWeight: 700,
                borderRadius: '30px'
              }}
            >
              🔗 Visit Official WUS Health Centre Website
            </a>
          </div>

        </div>
      </section>
    </>
  )
}
