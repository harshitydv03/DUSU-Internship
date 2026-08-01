import PageHeader from '../../components/common/PageHeader.jsx'
import ResourceList from '../../components/resources/ResourceList.jsx'
import useContent from '../../utils/useContent.js'
import { RESOURCES } from '../../utils/constants.js'

export default function Resources() {
  const { items: resources } = useContent('resources', RESOURCES)

  return (
    <>
      <PageHeader
        crumb="Campus Life"
        title="Resources"
        lede="Official portals every DU student should have bookmarked."
      />
      <section className="section">
        <div className="container">
          <ResourceList resources={resources} />
        </div>
      </section>
    </>
  )
}
