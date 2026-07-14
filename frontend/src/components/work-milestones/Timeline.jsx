export default function Timeline({ items }) {
  return (
    <ul className="timeline">
      {items.map((m) => (
        <li key={m.year + m.title}>
          <div className="year">{m.year}</div>
          <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', margin: '2px 0 4px' }}>
            {m.title}
          </h3>
          <p style={{ color: 'var(--muted)', fontSize: '0.93rem' }}>{m.desc}</p>
        </li>
      ))}
    </ul>
  )
}
