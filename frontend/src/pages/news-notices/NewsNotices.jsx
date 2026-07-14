import PageHeader from '../../components/common/PageHeader.jsx'
import NoticeCard from '../../components/news-notices/NoticeCard.jsx'
import { SAMPLE_NOTICES } from '../../utils/constants.js'

export default function NewsNotices() {
  return (
    <>
      <PageHeader
        crumb="Campus Life"
        title="News & Notices"
        lede="Official announcements, campaign updates and university circulars relevant to students."
      />
      <section className="section">
        <div className="container" style={{ display: 'grid', gap: 18, maxWidth: 820 }}>
          {SAMPLE_NOTICES.map((n) => (
            <NoticeCard notice={n} key={n.id} />
          ))}
        </div>
      </section>
    </>
  )
}
