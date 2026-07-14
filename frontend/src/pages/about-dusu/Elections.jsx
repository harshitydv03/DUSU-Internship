import PageHeader from '../../components/common/PageHeader.jsx'
import AboutSection from '../../components/about-dusu/AboutSection.jsx'

export default function Elections() {
  return (
    <>
      <PageHeader
        crumb="About"
        title="DUSU Elections"
        lede="One student, one vote — the annual election that chooses the union's central panel."
      />
      <AboutSection>
        <p>
          DUSU elections are held every year, usually in September, across DUSU-affiliated
          colleges and departments. All regular students of affiliated colleges are eligible to
          vote for the four central office bearers.
        </p>
        <h2>Key rules (Lyngdoh Committee guidelines)</h2>
        <ul>
          <li>Candidates must be regular students within the prescribed age limits</li>
          <li>Strict ceilings on campaign expenditure; no printed posters defacing public property</li>
          <li>Minimum attendance and academic criteria for candidates</li>
          <li>Elections are conducted and supervised by the University administration</li>
        </ul>
        <h2>How voting works</h2>
        <ul>
          <li>Voting is by secret ballot on EVMs at each college/department</li>
          <li>Day colleges and evening colleges vote in separate time slots on polling day</li>
          <li>Counting is centralised and results are declared by the Chief Election Officer</li>
        </ul>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
          Election notifications, candidate lists and results for the current session will be
          published on this page when announced by the University.
        </p>
      </AboutSection>
    </>
  )
}
