import PageHeader from '../../components/common/PageHeader.jsx'
import GalleryGrid from '../../components/gallery/GalleryGrid.jsx'
import useContent from '../../utils/useContent.js'
import { GALLERY_ITEMS } from '../../utils/constants.js'

export default function Gallery() {
  const { items: galleryItems } = useContent('gallery', GALLERY_ITEMS)

  return (
    <>
      <PageHeader
        crumb="Campus Life"
        title="Gallery"
        lede="Moments from union events across the University of Delhi. Photographs will replace these placeholders soon."
      />
      <section className="section">
        <div className="container">
          <GalleryGrid items={galleryItems} />
        </div>
      </section>
    </>
  )
}
