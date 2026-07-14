import { Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader.jsx'
import AboutSection from '../../components/about-dusu/AboutSection.jsx'
import Icon from '../../components/Icon.jsx'

export default function AboutDUSU() {
  return (
    <>
      <PageHeader
        crumb="About"
        title="About DUSU"
        lede="The Delhi University Students' Union is the elected representative body of the students of the University of Delhi."
      />
      <AboutSection>
        <p>
          Founded in 1949, the Delhi University Students&apos; Union (DUSU) represents students
          across the affiliated colleges and departments of the University of Delhi. Every student
          enrolled in a DUSU-affiliated college is automatically a member of the union.
        </p>
        <p>
          DUSU takes up issues that matter to students — admissions, examinations, fee structures,
          hostel accommodation, campus safety, transport and student welfare — and represents the
          student voice before the University administration and public authorities.
        </p>
        <h2>What we do</h2>
        <ul>
          <li>Grievance redressal for academic and administrative issues</li>
          <li>Help desks for admissions, scholarships and fee concessions</li>
          <li>Campaigns on student welfare, safety and campus infrastructure</li>
          <li>Cultural festivals, sports meets, donation drives and social initiatives</li>
          <li>Coordination with college unions and student representatives</li>
        </ul>
      </AboutSection>
      <section className="section">
        <div className="container grid-3">
          <Link to="/about/history" className="card">
            <div className="card-icon"><Icon name="FileText" /></div>
            <h3>History &amp; Mandate</h3>
            <p>Seven decades of student representation at DU.</p>
            <span className="card-link">Read more →</span>
          </Link>
          <Link to="/about/structure" className="card">
            <div className="card-icon"><Icon name="Bank" /></div>
            <h3>Structure &amp; Constitution</h3>
            <p>How the union is organised and governed.</p>
            <span className="card-link">Read more →</span>
          </Link>
          <Link to="/about/elections" className="card">
            <div className="card-icon"><Icon name="Ballot" /></div>
            <h3>Elections</h3>
            <p>How office bearers are elected every year.</p>
            <span className="card-link">Read more →</span>
          </Link>
        </div>
      </section>
    </>
  )
}
