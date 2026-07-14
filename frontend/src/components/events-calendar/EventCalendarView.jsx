const fmt = (iso) =>
  new Date(iso).toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

export default function EventCalendarView({ events }) {
  const byMonth = events.reduce((acc, e) => {
    const key = new Date(e.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
    ;(acc[key] = acc[key] || []).push(e)
    return acc
  }, {})

  return (
    <div>
      {Object.entries(byMonth).map(([month, list]) => (
        <div key={month}>
          <div className="month-label">{month}</div>
          <div className="grid-2">
            {list.map((e) => (
              <article className="event-card" key={e.id} style={{ display: 'flex' }}>
                <div className="event-banner" style={{ background: e.gradient, width: 96, height: 'auto', flexShrink: 0 }}>
                  {e.icon}
                </div>
                <div className="event-body">
                  <span className="event-meta">{fmt(e.date)}</span>
                  <h3>{e.title}</h3>
                  <p className="event-meta">📍 {e.venue}</p>
                  <p className="event-meta" style={{ marginTop: 6 }}>{e.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
