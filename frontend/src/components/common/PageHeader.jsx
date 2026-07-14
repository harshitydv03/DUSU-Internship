export default function PageHeader({ crumb, title, lede }) {
  return (
    <div className="page-header">
      <div className="container">
        {crumb && <div className="crumb">{crumb}</div>}
        <h1>{title}</h1>
        {lede && <p>{lede}</p>}
      </div>
    </div>
  )
}
