import Icon from '../Icon.jsx'

export default function GalleryGrid({ items }) {
  return (
    <div className="grid-4">
      {items.map((g) => (
        <figure className="gallery-tile" key={g.id || g.caption}>
          {/* An externally hosted image when one is set, otherwise the gradient placeholder */}
          <div className="gallery-img" style={{ background: g.gradient }}>
            {g.imageUrl ? (
              <img
                src={g.imageUrl}
                alt={g.caption}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                loading="lazy"
              />
            ) : (
              <Icon name={g.icon} size={32} color="#fff" />
            )}
          </div>
          <figcaption>{g.caption}</figcaption>
        </figure>
      ))}
    </div>
  )
}
