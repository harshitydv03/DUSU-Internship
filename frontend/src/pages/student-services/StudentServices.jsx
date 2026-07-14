import PageHeader from '../../components/common/PageHeader.jsx'
import ServiceCard from '../../components/student-services/ServiceCard.jsx'

const SERVICES = [
  { icon: 'GraduationCap', title: 'Scholarships', desc: 'Fee waivers, merit awards and government schemes with application links.', to: '/services/scholarships' },
  { icon: 'Rocket', title: 'Opportunities', desc: 'Volunteering, internships and leadership roles within the union.', to: '/services/opportunities' },
  { icon: 'Download', title: 'Downloads & Forms', desc: 'Grievance forms, affidavits, templates and how-to guides.', to: '/services/downloads' },
  { icon: 'BookOpen', title: 'Resources', desc: 'Official DU portals, scholarship sites and student tools.', to: '/resources' },
  { icon: 'Clipboard', title: 'Grievance Redressal', desc: 'A trackable process for academic and administrative complaints.', to: '/help/raise-query' },
  { icon: 'Phone', title: 'Helplines', desc: 'Emergency and support numbers for every situation.', to: '/help/helplines' },
]

export default function StudentServices() {
  return (
    <>
      <PageHeader
        crumb="Services"
        title="Student Services"
        lede="Practical support for your life at Delhi University — money, paperwork and opportunities."
      />
      <section className="section">
        <div className="container grid-3">
          {SERVICES.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>
    </>
  )
}
