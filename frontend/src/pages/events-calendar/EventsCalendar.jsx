import PageHeader from '../../components/common/PageHeader.jsx'
import EventCalendarView from '../../components/events-calendar/EventCalendarView.jsx'
import { SAMPLE_EVENTS } from '../../utils/constants.js'

export default function EventsCalendar() {
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
