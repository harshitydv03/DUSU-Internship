const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

export default function NoticeCard({ notice }) {
  const d = new Date(notice.date)
  return (
    <article className="notice-item">
      <div className="notice-date">
        <strong>{d.getDate()}</strong>
        <span>{MONTHS[d.getMonth()]} {d.getFullYear()}</span>
      </div>
      <div>
        <span className="badge red">{notice.tag}</span>
        <h3>{notice.title}</h3>
        <p>{notice.body}</p>
      </div>
    </article>
  )
}
