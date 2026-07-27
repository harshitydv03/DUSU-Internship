import { useState, useEffect } from 'react'
import PageHeader from '../../components/common/PageHeader.jsx'
import Icon from '../../components/Icon.jsx'
import apiClient from '../../utils/apiClient.js'

const DEFAULT_POSTS = [
  { post: "President", electorate: "All eligible DU students (Central DUSU)", votingMethod: "Electronic Voting Machine (EVM)", responsibilities: "Official head of DUSU; represents students in University Academic and Executive Council meetings; leads policy negotiations.", order: 1 },
  { post: "Vice-President", electorate: "All eligible DU students (Central DUSU)", votingMethod: "Electronic Voting Machine (EVM)", responsibilities: "Assists the President; presides over union activities in the President's absence; oversees internal committee functions.", order: 2 },
  { post: "Secretary", electorate: "All eligible DU students (Central DUSU)", votingMethod: "Electronic Voting Machine (EVM)", responsibilities: "Chief administrative officer of the Union; responsible for official correspondence, records and organizing union conventions.", order: 3 },
  { post: "Joint Secretary", electorate: "All eligible DU students (Central DUSU)", votingMethod: "Electronic Voting Machine (EVM)", responsibilities: "Manages financial records, event organization, intra-campus communication and student grievance documentation.", order: 4 },
  { post: "Central Council Representatives (CCRs)", electorate: "Students of respective affiliated colleges", votingMethod: "Paper Ballot / College EVM", responsibilities: "Each affiliated college elects 2 Central Councillors to represent the college body in the DUSU Central Council.", order: 5 }
]

const DEFAULT_PHASES = [
  { phase: 1, label: "Phase 1", title: "Official Notification & Appointment of Election Officers", desc: "The Vice-Chancellor appoints the Chief Election Officer (CEO), Chief Returning Officer (CRO) and Returning Officers. Official notification of the schedule, voter list publication and code of conduct takes place.", icon: "FileText" },
  { phase: 2, label: "Phase 2", title: "Nomination Filing & Financial Bond Submission", desc: "Candidates file nomination papers at the CEO Office (Conference Centre, North Campus). Submission includes affidavits of academic standing, attendance verification and surety bonds.", icon: "PenLine" },
  { phase: 3, label: "Phase 3", title: "Scrutiny & Provisional List Publication", desc: "The election committee scrutinizes nomination papers against Lyngdoh Committee criteria. Provisional lists of validly nominated candidates are published for each post.", icon: "Search" },
  { phase: 4, label: "Phase 4", title: "Nomination Withdrawal Window & Final Ballot List", desc: "Candidates are given a fixed time frame (usually until 12:00 PM on the designated day) to withdraw candidatures. Final candidate lists and ballot numbers are allotted thereafter.", icon: "ListChecks" },
  { phase: 5, label: "Phase 5", title: "Campaigning Window & Wall of Democracy", desc: "Strictly regulated campaigning occurs over 4–5 days. Physical canvassing is restricted to designated areas (the \"Wall of Democracy\"). Public rallies, printed poster pasting and vehicle parades are prohibited.", icon: "Megaphone" },
  { phase: 6, label: "Phase 6", title: "Polling Day (Dual Shift Voting)", desc: "Voting takes place across all member colleges in two shifts: morning classes (08:30 AM – 01:00 PM) and evening classes (03:00 PM – 07:30 PM). EVMs are sealed and transported to the central counting centre.", icon: "Vote" },
  { phase: 7, label: "Phase 7", title: "Counting of Votes & Official Result Declaration", desc: "Counting occurs at the central venue (e.g. Community Hall, Police Lines or the DU Conference Centre). Results are announced post-validation by the CEO, followed by oath-taking.", icon: "Award" }
]

const DEFAULT_RULES = [
  { category: "Academic & Age Eligibility", rule: "Undergraduate Students", detail: "Age between 17 and 22 years.", icon: "GraduationCap" },
  { category: "Academic & Age Eligibility", rule: "Postgraduate Students", detail: "Age cap of 24–25 years.", icon: "GraduationCap" },
  { category: "Academic & Age Eligibility", rule: "Research Scholars", detail: "Age cap of 28 years.", icon: "GraduationCap" },
  { category: "Academic & Age Eligibility", rule: "Attendance Requirement", detail: "Minimum 75% mandatory attendance in previous academic terms.", icon: "CalendarCheck" },
  { category: "Academic & Age Eligibility", rule: "Academic Record", detail: "No backlogs, compartments or failed subjects; must be a regular student without academic disciplinary actions.", icon: "ClipboardCheck" },
  { category: "Academic & Age Eligibility", rule: "Attempt Limit", detail: "A candidate can contest only once for a central office bearer post.", icon: "RotateCcw" },
  { category: "Expenditure & Anti-Defacement Rules", rule: "Spending Cap", detail: "Maximum campaign expenditure capped at ₹5,000 per candidate. Audited accounts must be submitted post-election.", icon: "IndianRupee" },
  { category: "Expenditure & Anti-Defacement Rules", rule: "Strict Anti-Defacement Policy", detail: "Complete ban on printed posters, spray painting, wall pasting and pamphlets on campus or metro property.", icon: "Ban" },
  { category: "Expenditure & Anti-Defacement Rules", rule: "Wall of Democracy", detail: "Campaign material restricted strictly to handmade posters displayed on designated university boards.", icon: "LayoutPanelTop" },
  { category: "Expenditure & Anti-Defacement Rules", rule: "Vehicle Restrictions", detail: "Prohibition of heavy vehicles, open jeeps, tractors and convoy parades on campus roads.", icon: "CarFront" }
]

const DEFAULT_ORGS = [
  { name: "ABVP", fullName: "Akhil Bharatiya Vidyarthi Parishad", affiliation: "RSS / BJP aligned", focus: "Focuses on national development, campus security, Indian ethos, skill development and infrastructure expansion.", order: 1 },
  { name: "NSUI", fullName: "National Students' Union of India", affiliation: "INC aligned", focus: "Focuses on student rights, social justice, fee-hike opposition, hostel equality and democratic inclusion.", order: 2 },
  { name: "AISA / SFI", fullName: "All India Students' Association / Students' Federation of India", affiliation: "Left-wing student fronts (CPIML / CPIM aligned)", focus: "Focuses on public education preservation, affordable transportation (metro passes), social representation and anti-privatization.", order: 3 },
  { name: "CYSS / Independent", fullName: "Chhatra Yuva Sangharsh Samiti / Regional groups", affiliation: "Regional and independent groups", focus: "Focuses on alternative governance, student welfare amenities, digital learning support and anti-defacement campaigns.", order: 4 }
]

export default function Elections() {
  const [posts, setPosts] = useState([])
  const [phases, setPhases] = useState([])
  const [rules, setRules] = useState([])
  const [orgs, setOrgs] = useState([])

  useEffect(() => {
    apiClient.get('/electionposts').then(data => { if (data && data.length > 0) setPosts(data) }).catch(() => {})
    apiClient.get('/electionphases').then(data => { if (data && data.length > 0) setPhases(data) }).catch(() => {})
    apiClient.get('/electionrules').then(data => { if (data && data.length > 0) setRules(data) }).catch(() => {})
    apiClient.get('/studentorgs').then(data => { if (data && data.length > 0) setOrgs(data) }).catch(() => {})
  }, [])

  const postList = posts.length > 0 ? posts : DEFAULT_POSTS
  const phaseList = phases.length > 0 ? phases : DEFAULT_PHASES
  const ruleList = rules.length > 0 ? rules : DEFAULT_RULES
  const orgList = orgs.length > 0 ? orgs : DEFAULT_ORGS

  // Group rules by category
  const groupedRules = ruleList.reduce((acc, r) => {
    const cat = r.category || 'General Guidelines'
    if (!acc[cat]) acc[cat] = []
    acc[cat].push(r)
    return acc
  }, {})

  return (
    <>
      <PageHeader
        crumb="About DUSU"
        title="DUSU Elections"
        lede="One student, one vote — the annual democratic process choosing the Union's central leadership."
      />

      <section className="section">
        <div className="container">
          
          {/* Section 1: Central Panel Posts */}
          <div style={{ marginBottom: '3rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge" style={{ marginBottom: 8, display: 'inline-block' }}>Governance Structure</span>
              <h2 style={{ fontSize: '1.75rem', margin: 0, color: 'var(--heading)' }}>Central Office Bearer Posts</h2>
            </div>
            <div style={{ display: 'grid', gap: 18, gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
              {postList.map((p) => (
                <div key={p.post} style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: '1.5rem',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                      <h3 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--heading)' }}>{p.post}</h3>
                      <span style={{ fontSize: '0.75rem', padding: '3px 8px', background: 'var(--primary-soft)', color: 'var(--primary)', borderRadius: 6, fontWeight: 600 }}>
                        {p.votingMethod}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.88rem', color: 'var(--muted)', margin: '0 0 14px', lineHeight: 1.6 }}>
                      {p.responsibilities}
                    </p>
                  </div>
                  <div style={{ paddingTop: 12, borderTop: '1px solid var(--border)', fontSize: '0.8rem', color: 'var(--text)', opacity: 0.8 }}>
                    <strong>Electorate:</strong> {p.electorate}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Election Timeline & Phases */}
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge" style={{ marginBottom: 8, display: 'inline-block' }}>Election Schedule</span>
              <h2 style={{ fontSize: '1.75rem', margin: 0, color: 'var(--heading)' }}>Election Process & Phases</h2>
            </div>
            <div style={{ display: 'grid', gap: 16 }}>
              {phaseList.map((item) => (
                <div key={item.phase} style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: '1.4rem 1.6rem',
                  display: 'flex',
                  gap: 16,
                  alignItems: 'flex-start'
                }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    background: 'var(--primary-soft)',
                    color: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    fontWeight: 700
                  }}>
                    <Icon name={item.icon || 'CheckCircle'} size={22} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Phase {item.phase}
                      </span>
                    </div>
                    <h3 style={{ margin: '0 0 6px', fontSize: '1.08rem', color: 'var(--heading)' }}>{item.title}</h3>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Lyngdoh Code of Conduct & Rules */}
          <div style={{ marginBottom: '3.5rem' }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge" style={{ marginBottom: 8, display: 'inline-block' }}>Lyngdoh Committee Guidelines</span>
              <h2 style={{ fontSize: '1.75rem', margin: 0, color: 'var(--heading)' }}>Rules & Eligibility Criteria</h2>
            </div>
            
            {Object.entries(groupedRules).map(([category, items]) => (
              <div key={category} style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.2rem', color: 'var(--heading)', marginBottom: '1rem', borderLeft: '4px solid var(--primary)', paddingLeft: 10 }}>
                  {category}
                </h3>
                <div style={{ display: 'grid', gap: 14, gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
                  {items.map((r, idx) => (
                    <div key={idx} style={{
                      background: 'var(--surface)',
                      border: '1px solid var(--border)',
                      borderRadius: 12,
                      padding: '1.2rem 1.4rem',
                      display: 'flex',
                      gap: 12
                    }}>
                      <div style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 2 }}>
                        <Icon name={r.icon || 'ShieldCheck'} size={20} />
                      </div>
                      <div>
                        <h4 style={{ margin: '0 0 4px', fontSize: '0.98rem', color: 'var(--heading)' }}>{r.rule}</h4>
                        <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.5 }}>{r.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Section 4: Student Organizations */}
          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <span className="badge" style={{ marginBottom: 8, display: 'inline-block' }}>Campus Representation</span>
              <h2 style={{ fontSize: '1.75rem', margin: 0, color: 'var(--heading)' }}>Recognised Student Organisations</h2>
            </div>
            <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
              {orgList.map((org) => (
                <div key={org.name} style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: 14,
                  padding: '1.4rem',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                    <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--heading)' }}>{org.name}</h3>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted)', background: 'var(--bg)', padding: '2px 8px', borderRadius: 4 }}>
                      {org.affiliation}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--primary)', marginBottom: 8 }}>
                    {org.fullName}
                  </div>
                  <p style={{ margin: 0, fontSize: '0.86rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                    {org.focus}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </>
  )
}
