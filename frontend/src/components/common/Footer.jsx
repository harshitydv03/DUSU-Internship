import { Link } from 'react-router-dom'
import { SITE } from '../../utils/constants.js'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <h4>Delhi University Students&apos; Union</h4>
            <p>
              The elected representative body of the students of the University of Delhi,
              working since {SITE.established} for student welfare, rights and campus life.
            </p>
          </div>
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/about">About DUSU</Link></li>
              <li><Link to="/team">Our Team</Link></li>
              <li><Link to="/events">Events Calendar</Link></li>
              <li><Link to="/news">News &amp; Notices</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
            </ul>
          </div>
          <div>
            <h4>Student Help</h4>
            <ul>
              <li><Link to="/help/raise-query">Raise a Grievance</Link></li>
              <li><Link to="/help/track-query">Track My Query</Link></li>
              <li><Link to="/help/helplines">Helplines</Link></li>
              <li><Link to="/help/anti-ragging">Anti-Ragging &amp; SOS</Link></li>
              <li><Link to="/services/scholarships">Scholarships</Link></li>
            </ul>
          </div>
          <div>
            <h4>Contact</h4>
            <p>{SITE.address}</p>
            <p style={{ marginTop: 10 }}>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Delhi University Students&apos; Union. All rights reserved.</span>
          <span>Built by the DUSU Web Team</span>
        </div>
      </div>
    </footer>
  )
}
