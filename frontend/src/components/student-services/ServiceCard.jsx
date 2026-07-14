import { Link } from 'react-router-dom'
import Icon from '../Icon.jsx'

export default function ServiceCard({ icon, title, desc, to, linkLabel = 'Open →' }) {
  return (
    <Link to={to} className="card">
      <div className="card-icon"><Icon name={icon} size={20} /></div>
      <h3>{title}</h3>
      <p>{desc}</p>
      <span className="card-link">{linkLabel}</span>
    </Link>
  )
}
