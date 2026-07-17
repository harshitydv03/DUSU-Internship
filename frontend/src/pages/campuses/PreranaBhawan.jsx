import React, { useState } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Icon from '../../components/Icon.jsx'

export default function PreranaBhawan() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <>
      <PageHeader
        crumb="Campuses"
        title="Prerana Bhawan"
        lede="The DUSU cultural and student activity centre at the University of Delhi."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 800 }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '2rem 2.4rem',
            boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          }}>
            <h2 style={{ marginTop: 0 }}>About Prerana Bhawan</h2>
            <p style={{ lineHeight: 1.8, color: 'var(--text)' }}>
              Prerana Bhawan serves as a hub for student activities, cultural events, and union
              operations at the University of Delhi. It houses meeting rooms, a multi-purpose hall,
              and various student welfare facilities managed by DUSU.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 16, marginTop: '1.5rem' }}>
              {[
                { label: 'Location', value: 'North Campus, University of Delhi', icon: 'MapPin' },
                { label: 'Facilities', value: 'Meeting rooms, auditorium, helpdesks', icon: 'Building' },
                { label: 'Managed by', value: 'DUSU', icon: 'GraduationCap' },
              ].map(({ label, value, icon }, idx) => (
                <div 
                  key={label}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{ 
                    padding: '1.2rem 1rem', 
                    background: 'var(--bg, #f8f8fa)', 
                    borderRadius: 10, 
                    border: '1px solid var(--border)',
                    transform: hoveredIndex === idx ? 'translateY(-4px)' : 'translateY(0)',
                    boxShadow: hoveredIndex === idx ? 'var(--shadow-md, 0 4px 12px rgba(0,0,0,0.08))' : 'none',
                    transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                    cursor: 'default'
                  }}
                >
                  <div style={{ marginBottom: 10, color: 'var(--primary)', display: 'flex', alignItems: 'center' }}>
                    <Icon name={icon} size={22} />
                  </div>
                  <div style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--heading)', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
