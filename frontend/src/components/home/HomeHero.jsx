import { Link } from 'react-router-dom'

export default function HomeHero() {
  return (
    <section className="hero">
      <div className="container" style={{ position: 'relative' }}>
        <span className="hero-badge">Est. 1949 · University of Delhi</span>
        <h1>
          The voice of every <em>Delhi University</em> student
        </h1>
        <p className="hero-lede">
          From grievances and scholarships to events and emergency helplines — the
          Delhi University Students&apos; Union stands with you through campus life.
        </p>
        <div className="hero-actions">
          <Link to="/help/raise-query" className="btn btn-primary">
            Raise a Grievance
          </Link>
          <Link to="/services" className="btn btn-outline-light text-primary">
            Explore Student Services
          </Link>
        </div>
      </div>
      <div className="hero-stats container">
        <div className="hero-stat">
          <strong>90+</strong>
          <span>Colleges &amp; Departments</span>
        </div>
        <div className="hero-stat">
          <strong>5 lakh+</strong>
          <span>Students Represented</span>
        </div>
        <div className="hero-stat stat-with-img">
          <strong>75+</strong>
          <span>Years of Student Advocacy</span>
          <img src="/images/aryaan-speaker.png" alt="DUSU Speaker" className="hero-speaker" />
        </div>
      </div>
    </section>
  )
}
