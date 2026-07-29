import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'

const MESSAGE = [
  '"Dear fellow students, it is an honour to serve as the President of DUSU. Our union exists for one reason alone — to make your student life better. Whether it is fighting for fair fee structures, safer campuses, better hostel facilities, or ensuring that every grievance is heard, we are committed to standing by you."',
  '"Together, we will continue to build a more inclusive, responsive, and empowered student community at the University of Delhi."',
]

const FULL_TEXT = MESSAGE.join('\n\n')
const TYPING_SPEED_MS = 18

export default function PresidentsMessage() {
  const [charCount, setCharCount] = useState(0)
  const done = charCount >= FULL_TEXT.length

  useEffect(() => {
    if (done) return
    const timer = setInterval(
      () => setCharCount((n) => Math.min(n + 1, FULL_TEXT.length)),
      TYPING_SPEED_MS,
    )
    return () => clearInterval(timer)
  }, [done])

  const typed = FULL_TEXT.slice(0, charCount)
  // Split back into paragraphs so the break appears as soon as typing reaches it
  const paragraphs = typed.split('\n\n')

  return (
    <>
      <PageHeader
        crumb="About DUSU"
        title="President's Message"
        lede="A word from the President of the Delhi University Students' Union."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 14,
            padding: '2rem 2.4rem',
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              <div style={{
                width: 80, height: 80, borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontSize: '2rem', fontWeight: 800, flexShrink: 0,
              }}>P</div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.3rem' }}>President, DUSU</h2>
                <p style={{ margin: 0, color: 'var(--muted)', fontSize: '0.9rem' }}>2026–27 Session</p>
              </div>
            </div>
            <blockquote style={{
              borderLeft: '4px solid var(--accent)',
              paddingLeft: '1.2rem',
              margin: 0,
              color: 'var(--text)',
              lineHeight: 1.8,
              fontStyle: 'italic',
              fontSize: '0.95rem',
            }}>
              {paragraphs.map((p, i) => (
                <p key={i}>
                  {p}
                  {/* blinking cursor rides on the last typed paragraph until done */}
                  {!done && i === paragraphs.length - 1 && (
                    <span style={{
                      display: 'inline-block',
                      width: 2,
                      height: '1em',
                      marginLeft: 2,
                      verticalAlign: 'text-bottom',
                      background: 'var(--accent)',
                      animation: 'blink-cursor 0.9s steps(2) infinite',
                    }} />
                  )}
                </p>
              ))}
            </blockquote>
            <style>{'@keyframes blink-cursor { 0% { opacity: 1; } 50% { opacity: 0; } 100% { opacity: 1; } }'}</style>
            <p style={{ marginTop: '1.2rem', color: 'var(--muted)', fontSize: '0.85rem', opacity: done ? 1 : 0, transition: 'opacity 0.6s ease' }}>
              — President's message will be updated after election results are declared.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
