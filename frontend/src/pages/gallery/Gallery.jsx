import PageHeader from '../../components/common/PageHeader.jsx'
import GalleryGrid from '../../components/gallery/GalleryGrid.jsx'
import { GALLERY_ITEMS } from '../../utils/constants.js'

export default function Gallery() {
  return (
    <>
      <PageHeader
        crumb="Campus Life"
        title="Gallery"
        lede="Moments from union events across the University of Delhi. Photographs will replace these placeholders soon."
      />
      <section className="section">
        <div className="container">
          <GalleryGrid items={GALLERY_ITEMS} />
        </div>
      </section>
    </>
  )
}
