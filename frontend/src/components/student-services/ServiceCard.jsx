import { Link } from 'react-router-dom'

export default function ServiceCard({ icon, title, desc, to, linkLabel = 'Open →' }) {
  return (
    <Link to={to} className="card">
      <div className="card-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className="card-link">{linkLabel}</span>
    </Link>
  )
}
