import PageHeader from '../../components/common/PageHeader.jsx'
import ResourceList from '../../components/resources/ResourceList.jsx'
import { RESOURCES } from '../../utils/constants.js'

export default function Resources() {
  return (
    <>
      <PageHeader
        crumb="Campus Life"
        title="Resources"
        lede="Official portals every DU student should have bookmarked."
      />
      <section className="section">
        <div className="container">
          <ResourceList resources={RESOURCES} />
        </div>
      </section>
    </>
  )
}
