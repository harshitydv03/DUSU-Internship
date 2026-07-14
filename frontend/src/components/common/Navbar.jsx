import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { NAV_MENU } from '../../utils/constants.js'
import Icon from '../Icon.jsx'
import duLogo from '../../assets/du-logo.png'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openIndex, setOpenIndex] = useState(null)

  const closeAll = () => {
    setMobileOpen(false)
    setOpenIndex(null)
  }

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>
            <Icon name="ShieldAlert" size={14} /> Anti-Ragging Helpline: <a href="tel:18001805522">1800-180-5522</a> · Emergency:{' '}
            <a href="tel:112">112</a>
          </span>
          <span>
            <Link to="/help/raise-query" style={{ color: '#fff', marginRight: 16 }}>
              Raise a Grievance
            </Link>
            <Link to="/admin">Admin</Link>
          </span>
        </div>
      </div>

      <header className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="brand" onClick={closeAll}>
            <img src={duLogo} alt="Delhi University logo" className="brand-crest" />
            <span>
              <span className="brand-name">Delhi University<br />Students&apos; Union</span>
            </span>
          </Link>

          <button
            className="nav-toggle"
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>

          <ul className={`nav-links${mobileOpen ? ' open' : ''}`}>
            {NAV_MENU.map((item, i) => (
              <li key={item.label} className={`nav-item${openIndex === i ? ' open' : ''}`}>
                {item.children ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    >
                      {item.label} <span className="caret">▼</span>
                    </button>
                    <ul className="dropdown">
                      {item.children.map((child) => (
                        <li key={child.to}>
                          {child.external ? (
                            <a href={child.to} target="_blank" rel="noopener noreferrer" onClick={closeAll}>
                              {child.label} ↗
                            </a>
                          ) : (
                            <Link to={child.to} onClick={closeAll}>
                              {child.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <NavLink to={item.to} onClick={closeAll}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  )
}
