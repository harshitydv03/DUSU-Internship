import { useEffect, useState } from 'react'
import apiClient from '../../utils/apiClient.js'
import { QUERY_STORAGE_KEY } from '../../utils/constants.js'

export default function AdminStats() {
  const [counts, setCounts] = useState({ queries: '…', notices: '…', events: '…' })

  useEffect(() => {
    Promise.all([
      apiClient.get('/queries'),
      apiClient.get('/notices'),
      apiClient.get('/events'),
    ])
      .then(([q, n, e]) => setCounts({ queries: q.length, notices: n.length, events: e.length }))
      .catch(() =>
        setCounts({
          queries: JSON.parse(localStorage.getItem(QUERY_STORAGE_KEY) || '[]').length,
          notices: '—',
          events: '—',
        }),
      )
  }, [])

  const stats = [
    { label: 'Open queries', value: counts.queries },
    { label: 'Notices published', value: counts.notices },
    { label: 'Upcoming events', value: counts.events },
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
