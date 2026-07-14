import PageHeader from '../../components/common/PageHeader.jsx'
import AboutSection from '../../components/about-dusu/AboutSection.jsx'

export default function StructureConstitution() {
  return (
    <>
      <PageHeader
        crumb="About"
        title="Structure & Constitution"
        lede="How the union is organised — from the central panel to college-level representation."
      />
      <AboutSection>
        <h2>Central panel</h2>
        <p>
          The union is led by four directly elected office bearers — the <strong>President</strong>,{' '}
          <strong>Vice President</strong>, <strong>Secretary</strong> and{' '}
          <strong>Joint Secretary</strong> — who together form the DUSU central panel for an
          academic year.
        </p>
        <h2>College representation</h2>
        <p>
          Each affiliated college union sends representatives to DUSU, ensuring that issues from
          every campus — North Campus, South Campus, and off-campus colleges — reach the central
          panel. College presidents and central councillors form the broader DUSU council.
        </p>
        <h2>Governance</h2>
        <ul>
          <li>Functioning is governed by the DUSU constitution and University of Delhi rules</li>
          <li>Elections follow the Lyngdoh Committee guidelines notified by the Supreme Court</li>
          <li>The Chief Election Officer appointed by the University conducts the annual election</li>
          <li>Union accounts and activities are subject to University oversight</li>
        </ul>
        <p style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>
          Note: The full text of the constitution will be uploaded to the Downloads section once
          digitised by the DUSU office.
        </p>
      </AboutSection>
    </>
  )
}
