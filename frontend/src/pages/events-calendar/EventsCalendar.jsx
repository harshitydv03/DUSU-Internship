import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import EventCalendarView from '../../components/events-calendar/EventCalendarView.jsx'
import { SAMPLE_EVENTS } from '../../utils/constants.js'
import apiClient from '../../utils/apiClient.js'

const withEventDefaults = (events) =>
  events.map((event, index) => ({
    gradient: SAMPLE_EVENTS[index % SAMPLE_EVENTS.length]?.gradient || 'linear-gradient(135deg,#662d91,#9455c8)',
    icon: SAMPLE_EVENTS[index % SAMPLE_EVENTS.length]?.icon || 'Calendar',
    ...event,
  }))

export default function EventsCalendar() {
  const [events, setEvents] = useState(SAMPLE_EVENTS)

  useEffect(() => {
    let active = true

    apiClient
      .get('/events')
      .then((data) => {
        if (active && data?.length) setEvents(withEventDefaults(data))
      })
      .catch(() => {
        if (active) setEvents(SAMPLE_EVENTS)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <>
      <PageHeader
        crumb="Campus Life"
        title="Events Calendar"
        lede="Fests, drives, debates and camps organised or supported by DUSU across campuses."
      />
      <section className="section">
        <div className="container">
          <EventCalendarView events={SAMPLE_EVENTS} />
          <p style={{ marginTop: 30, fontSize: '0.9rem', color: 'var(--muted)' }}>
            Want DUSU to support your college event? Send a proposal from the Contact page.
          </p>
        </div>
      </section>
    </>
  )
}
