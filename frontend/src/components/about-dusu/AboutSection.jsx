export default function AboutSection({ title, children }) {
  return (
    <section className="section" style={{ paddingTop: 40, paddingBottom: 0 }}>
      <div className="container prose">
        {title && <h2>{title}</h2>}
        {children}
      </div>
    </section>
  )
}
