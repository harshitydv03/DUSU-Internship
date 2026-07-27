import Icon from '../Icon.jsx'

export default function ResourceList({ resources }) {
  return (
    <div className="grid-3">
      {resources.map((r) => (
        <a className="card" href={r.url} target="_blank" rel="noreferrer" key={r.name}>
          <div className="card-icon">
            <Icon name={r.icon} size={20} />
          </div>
          <h3>{r.name}</h3>
          <p>{r.desc}</p>
          <span className="card-link">Visit ↗</span>
        </a>
      ))}
    </div>
  )
}
