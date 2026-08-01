import PageHeader from '../../components/common/PageHeader.jsx'
import FAQList from '../../components/student-help/FAQList.jsx'
import useContent from '../../utils/useContent.js'
import { FAQS } from '../../utils/constants.js'

export default function FAQKnowledgeBase() {
  const { items: faqs } = useContent('faqs', FAQS)

  return (
    <>
      <PageHeader
        crumb="Student Help"
        title="FAQs & Knowledge Base"
        lede="Quick answers about the union, elections, grievances and student services."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 780 }}>
          <FAQList faqs={faqs} />
        </div>
      </section>
    </>
  )
}
