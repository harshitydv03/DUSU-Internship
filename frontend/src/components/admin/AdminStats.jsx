import { QUERY_STORAGE_KEY } from '../../utils/constants.js'

export default function AdminStats() {
  const queries = JSON.parse(localStorage.getItem(QUERY_STORAGE_KEY) || '[]')

  const stats = [
    { label: 'Open queries (this browser)', value: queries.length },
    { label: 'Notices published', value: '—' },
    { label: 'Upcoming events', value: '—' },
    { label: 'Registered admins', value: '—' },
  ]

  return (
    <div className="grid-4">
      {stats.map((s) => (
        <div className="card stat-card" key={s.label}>
          <strong>{s.value}</strong>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  )
}
