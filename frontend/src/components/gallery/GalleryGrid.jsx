export default function GalleryGrid({ items }) {
  return (
    <div className="grid-4">
      {items.map((g) => (
        <figure className="gallery-tile" key={g.caption}>
          <div className="gallery-img" style={{ background: g.gradient }}>
            {g.icon}
          </div>
          <figcaption>{g.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}
