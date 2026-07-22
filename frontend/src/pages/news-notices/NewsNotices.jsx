import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import NoticeCard from '../../components/news-notices/NoticeCard.jsx'
import { SAMPLE_NOTICES } from '../../utils/constants.js'
import apiClient from '../../utils/apiClient.js'

export default function NewsNotices() {
  const [notices, setNotices] = useState(SAMPLE_NOTICES)

  useEffect(() => {
    let active = true

    apiClient
      .get('/notices')
      .then((data) => {
        if (active && data?.length) setNotices(data)
      })
      .catch(() => {
        if (active) setNotices(SAMPLE_NOTICES)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <PageHeader
        crumb="Campus Life"
        title="News & Notices"
        lede="Official announcements, campaign updates and university circulars relevant to students."
      />
      <section className="section">
        <div className="container" style={{ display: 'grid', gap: 18, maxWidth: 820 }}>
          {notices.map((n) => (
            <NoticeCard notice={n} key={n.id} />
          ))}
        </div>
      </section>
    </>
  )
}
