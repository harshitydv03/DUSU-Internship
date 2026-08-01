import React, { useState, useEffect, useRef } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import TeamCard from '../../components/our-team/TeamCard.jsx'
import { OFFICE_BEARERS } from '../../utils/constants.js'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import apiClient from '../../utils/apiClient.js'

const RESPONSIBILITIES = [
  { role: 'President', duties: 'Leads the union, chief spokesperson before the University and public authorities.' },
  { role: 'Vice President', duties: 'Deputises for the President and oversees campaigns and college coordination.' },
  { role: 'Secretary', duties: 'Manages union correspondence, records, meetings and official communication.' },
  { role: 'Joint Secretary', duties: 'Supports the Secretary and coordinates events, drives and volunteer teams.' },
]

export default function OfficeBearers() {
  const [officeBearers, setOfficeBearers] = useState(OFFICE_BEARERS)
  const [selectedMember, setSelectedMember] = useState(null)
  const [slideIndex, setSlideIndex] = useState(2)
  const [isTransitioning, setIsTransitioning] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const autoplayRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    apiClient.get('/officebearers')
      .then((data) => {
        if (data && data[0] && data[0].officeBearers) {
          const formatted = data[0].officeBearers.map((ob) => ({
            ...ob,
            initials: ob.name.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase(),
          }))
          setOfficeBearers(formatted)
        }
      })
      .catch((err) => {
        console.error('Failed to fetch office bearers:', err)
      })
  }, [])

  const slides = officeBearers.length >= 2 ? [
    officeBearers[officeBearers.length - 2], // Clone of second to last slide (C)
    officeBearers[officeBearers.length - 1], // Clone of last slide (D)
    ...officeBearers,
    officeBearers[0], // Clone of first slide (A)
    officeBearers[1], // Clone of second slide (B)
  ] : []

  const totalRealSlides = officeBearers.length

  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
    autoplayRef.current = setInterval(() => {
      handleNext()
    }, 3500) // Autoplay every 10 seconds
  }

  // Initial and reset autoplay trigger
  useEffect(() => {
    resetAutoplay()
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current)
    }
  }, [slideIndex])

  const handleNext = () => {
    if (!isTransitioning) return
    if (slideIndex >= totalRealSlides + 2) return
    setSlideIndex((prev) => prev + 1)
  }

  const handlePrev = () => {
    if (!isTransitioning) return
    if (slideIndex <= 1) return
    setSlideIndex((prev) => prev - 1)
  }

  const handleDotClick = (index) => {
    if (!isTransitioning) return
    setSlideIndex(index + 2)
  }

  const handleTransitionEnd = () => {
    if (slideIndex === 1) {
      setIsTransitioning(false)
      setSlideIndex(totalRealSlides + 1)
    } else if (slideIndex === totalRealSlides + 2) {
      setIsTransitioning(false)
      setSlideIndex(2)
    }
  }

  // Turn transitions back on after jumping
  useEffect(() => {
    if (!isTransitioning) {
      const raf = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsTransitioning(true)
        })
      })
      return () => cancelAnimationFrame(raf)
    }
  }, [isTransitioning])

  // Get active dot index
  const activeDot = (slideIndex - 2 + totalRealSlides) % totalRealSlides

  const slideWidth = isMobile ? '100%' : '33.3333%'
  const translateValue = isMobile ? slideIndex * 100 : (slideIndex - 1) * 33.3333

  return (
    <>
      <PageHeader
        crumb="Our Team"
        title="Office Bearers"
        lede="The four directly elected members of the DUSU central panel."
      />
      <section className="section" style={{ overflow: 'hidden' }}>
        <div className="container">

          {/* Infinite Carousel Section */}
          <div className="carousel-wrapper" style={{
            position: 'relative',
            width: '100%',
            maxWidth: isMobile ? '480px' : '1160px',
            margin: '0 auto 20px',
            padding: isMobile ? '0 40px' : '0 60px',
            boxSizing: 'border-box'
          }}>

            {/* Viewport */}
            <div className="carousel-viewport" style={{
              overflow: 'hidden',
              width: '100%',
              borderRadius: '16px',
              padding: isMobile ? '10px 0' : '20px 0'
            }}>
              {/* Slider Track */}
              <div
                className="carousel-track"
                onTransitionEnd={handleTransitionEnd}
                style={{
                  display: 'flex',
                  transform: `translateX(-${translateValue}%)`,
                  transition: isTransitioning ? 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' : 'none',
                }}
              >
                {slides.map((m, idx) => {
                  const isCenter = idx === slideIndex;
                  return (
                    <div
                      key={`${m.role}-${idx}`}
                      className="carousel-slide"
                      style={{
                        flex: `0 0 ${slideWidth}`,
                        width: slideWidth,
                        padding: isMobile ? '16px 8px' : '32px 16px',
                        boxSizing: 'border-box',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        transition: 'all 0.5s ease',
                        cursor: 'pointer'
                      }}
                      onClick={() => setSelectedMember(m)}
                    >
                      <div style={{
                        width: '100%',
                        maxWidth: isMobile ? '340px' : '360px',
                        transform: isCenter ? 'scale(1.12)' : 'scale(0.88)',
                        opacity: isCenter ? 1 : 0.5,
                        transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.6s ease',
                      }}>
                        <TeamCard member={m} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Left Control Arrow */}
            <button
              onClick={handlePrev}
              aria-label="Previous slide"
              style={{
                position: 'absolute',
                left: isMobile ? '0px' : '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow)',
                color: 'var(--primary)',
                zIndex: 10,
                transition: 'background 0.2s, color 0.2s, transform 0.1s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--primary-soft)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--surface)';
              }}
            >
              <ChevronLeft size={22} />
            </button>

            {/* Right Control Arrow */}
            <button
              onClick={handleNext}
              aria-label="Next slide"
              style={{
                position: 'absolute',
                right: isMobile ? '0px' : '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: 'var(--shadow)',
                color: 'var(--primary)',
                zIndex: 10,
                transition: 'background 0.2s, color 0.2s, transform 0.1s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--primary-soft)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'var(--surface)';
              }}
            >
              <ChevronRight size={22} />
            </button>
          </div>

          {/* Dots/Bar Pagination Indicator */}
          <div className="carousel-dots" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '48px'
          }}>
            {Array.from({ length: totalRealSlides }).map((_, idx) => {
              const isActive = activeDot === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  style={{
                    width: isActive ? '32px' : '12px',
                    height: '12px',
                    borderRadius: '6px',
                    border: isActive ? '2px solid var(--primary)' : '2px solid var(--border)',
                    background: isActive ? 'var(--primary)' : 'transparent',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                />
              )
            })}
          </div>
          <div className="section-head" style={{ margin: '48px 0 22px' }}>
            <h2>Roles &amp; responsibilities</h2>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Position</th>
                  <th>Responsibilities</th>
                </tr>
              </thead>
              <tbody>
                {RESPONSIBILITIES.map((r) => (
                  <tr key={r.role}>
                    <td style={{ fontWeight: 600 }}>{r.role}</td>
                    <td>{r.duties}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Member Details Modal */}
      {selectedMember && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
          padding: '16px'
        }} onClick={() => setSelectedMember(null)}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            maxWidth: '640px',
            width: '100%',
            maxHeight: '85vh',
            overflowY: 'auto',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            padding: '32px',
            position: 'relative'
          }} onClick={(e) => e.stopPropagation()}>
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedMember(null)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '25px',
                background: 'var(--primary-soft)',
                border: 'none',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.25rem',
                cursor: 'pointer',
                color: 'var(--primary)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'rotate(90deg)';
                e.currentTarget.style.background = 'var(--primary)';
                e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.background = 'var(--primary-soft)';
                e.currentTarget.style.color = 'var(--primary)';
              }}
            >
              ×
            </button>
            
            {/* Header info */}
            <div style={{ display: 'flex', gap: '24px', alignItems: 'center', marginBottom: '24px', flexWrap: 'wrap' }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '24px',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--primary-soft), var(--border))',
                border: '3px solid var(--primary)',
                boxShadow: '0 8px 16px rgba(0,0,0,0.08)'
              }}>
                {selectedMember.image ? (
                  <img src={selectedMember.image} alt={selectedMember.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '2.5rem', fontWeight: 800, color: 'var(--primary)' }}>
                    {selectedMember.initials || 'OB'}
                  </div>
                )}
              </div>
              <div style={{ flex: '1', minWidth: 'min(220px, 100%)' }}>
                <span style={{ 
                  fontSize: '0.75rem', 
                  textTransform: 'uppercase', 
                  color: 'var(--primary)', 
                  fontWeight: 800, 
                  letterSpacing: '0.1em',
                  background: 'var(--primary-soft)',
                  padding: '4px 10px',
                  borderRadius: '12px'
                }}>
                  {selectedMember.role}
                </span>
                <h2 style={{ margin: '8px 0 4px', fontSize: '1.75rem', fontWeight: 800, color: 'var(--heading)' }}>
                  {selectedMember.name}
                </h2>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem', fontWeight: 500 }}>
                  {selectedMember.college}
                </p>
              </div>
            </div>
            
            {/* Biography */}
            <div style={{ marginBottom: '28px' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, margin: '0 0 10px', color: 'var(--heading)' }}>About & Leadership</h3>
              <p style={{ 
                margin: 0, 
                lineHeight: 1.7, 
                fontSize: '0.95rem', 
                color: 'var(--text)', 
                whiteSpace: 'pre-line',
                background: 'var(--surface-soft, rgba(0,0,0,0.02))',
                padding: '16px',
                borderRadius: '16px',
                border: '1.5px dashed var(--border)'
              }}>
                {selectedMember.bio || "No biography provided yet."}
              </p>
            </div>
            
            {/* Social Connect links */}
            {selectedMember.socials && selectedMember.socials.length > 0 && (
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
                <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--muted)', fontWeight: 700, letterSpacing: '0.05em', margin: '0 0 12px' }}>
                  Connect with {selectedMember.name.split(' ')[0]}
                </h4>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {selectedMember.socials.map((s) => (
                    <a
                      key={s.url}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        color: 'var(--text)',
                        background: 'var(--surface)',
                        border: '1px solid var(--border)',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontWeight: 600,
                        fontSize: '0.85rem',
                        textDecoration: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.02)',
                        transition: 'all 0.2s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'var(--primary)';
                        e.currentTarget.style.color = 'var(--primary)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)';
                        e.currentTarget.style.color = 'var(--text)';
                        e.currentTarget.style.transform = 'none';
                      }}
                    >
                      {s.platform.charAt(0).toUpperCase() + s.platform.slice(1)}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
