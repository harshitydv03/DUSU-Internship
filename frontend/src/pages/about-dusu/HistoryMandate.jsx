import PageHeader from '../../components/common/PageHeader.jsx'
import AboutSection from '../../components/about-dusu/AboutSection.jsx'
import Timeline from '../../components/work-milestones/Timeline.jsx'
import { MILESTONES } from '../../utils/constants.js'

export default function HistoryMandate() {
  return (
    <>
      <PageHeader
        crumb="About"
        title="History & Mandate"
        lede="From 1949 to today — the journey of one of India's most influential student bodies."
      />
      <AboutSection>
        <p>
          DUSU was established in 1949, soon after independence, as the umbrella union for
          students of the University of Delhi. Over the decades it has been a training ground
          for public life — many national leaders began their careers in DUSU — and a
          consistent advocate for accessible, high-quality public education.
        </p>
        <h2>Our mandate</h2>
        <ul>
          <li>Represent the interests of DU students before the University and government</li>
          <li>Safeguard student rights and ensure fair academic administration</li>
          <li>Promote an inclusive, safe and vibrant campus culture</li>
          <li>Provide welfare services — help desks, concessions, emergency support</li>
        </ul>
      </AboutSection>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Milestones</span>
            <h2>Through the years</h2>
          </div>
          <Timeline items={MILESTONES} />
        </div>
      </section>
    </>
  )
}
