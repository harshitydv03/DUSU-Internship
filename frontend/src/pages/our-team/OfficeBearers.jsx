import React, { useState, useEffect, useRef } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import TeamCard from '../../components/our-team/TeamCard.jsx'
import { OFFICE_BEARERS } from '../../utils/constants.js'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const RESPONSIBILITIES = [
  { role: 'President', duties: 'Leads the union, chief spokesperson before the University and public authorities.' },
  { role: 'Vice President', duties: 'Deputises for the President and oversees campaigns and college coordination.' },
  { role: 'Secretary', duties: 'Manages union correspondence, records, meetings and official communication.' },
  { role: 'Joint Secretary', duties: 'Supports the Secretary and coordinates events, drives and volunteer teams.' },
]

export default function OfficeBearers() {
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

  const slides = [
    OFFICE_BEARERS[OFFICE_BEARERS.length - 2], // Clone of second to last slide (C)
    OFFICE_BEARERS[OFFICE_BEARERS.length - 1], // Clone of last slide (D)
    ...OFFICE_BEARERS,
    OFFICE_BEARERS[0], // Clone of first slide (A)
    OFFICE_BEARERS[1], // Clone of second slide (B)
  ]

  const totalRealSlides = OFFICE_BEARERS.length

  const resetAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current)
    }
    autoplayRef.current = setInterval(() => {
      handleNext()
    }, 7000) // Autoplay every 10 seconds
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
                        transition: 'all 0.5s ease'
                      }}
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
    </>
  )
}
