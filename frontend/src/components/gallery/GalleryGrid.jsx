import Icon from '../Icon.jsx'

export default function GalleryGrid({ items }) {
  return (
    <div className="grid-4">
      {items.map((g) => (
        <figure className="gallery-tile" key={g.caption}>
          <div className="gallery-img" style={{ background: g.gradient }}>
            <Icon name={g.icon} size={32} color="#fff" />
          </div>
          <figcaption>{g.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}
