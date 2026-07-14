// Initial content, loaded once when a collection is empty.
import { createRequire } from 'module'
const _require = createRequire(import.meta.url)
const COLLEGES = _require('../../../colleges.json')


export const SEED = {
  notices: [
    { date: '2026-07-10', tag: 'Notice', title: 'Volunteers invited for the Student Grievance Cell', body: 'Applications are open for student volunteers to assist the grievance redressal desk for the 2026–27 session.' },
    { date: '2026-07-04', tag: 'Update', title: 'Memorandum on hostel accommodation submitted', body: 'DUSU submitted a memorandum seeking expansion of hostel capacity across North and South Campus.' },
    { date: '2026-06-28', tag: 'News', title: 'Special fee-concession camp for EWS students announced', body: 'A week-long facilitation camp will help EWS students complete fee-concession paperwork.' },
    { date: '2026-06-15', tag: 'Notice', title: 'North Campus shuttle service — revised timings', body: 'The campus shuttle will now run every 15 minutes between Vishwavidyalaya Metro and the Arts Faculty.' },
  ],
  events: [
    { date: '2026-08-03', title: 'Freshers Orientation Drive', venue: 'Conference Centre, North Campus', desc: 'Campus tours, society stalls and help desks for the incoming batch.', icon: '🎉' },
    { date: '2026-08-19', title: 'Blood Donation Camp', venue: 'University Stadium', desc: 'Annual donation camp in association with the Red Cross Society.', icon: '🩸' },
    { date: '2026-09-08', title: 'Inter-College Debate Championship', venue: 'Arts Faculty Auditorium', desc: 'Teams from 40+ colleges compete for the DUSU rolling trophy.', icon: '🎤' },
    { date: '2026-09-22', title: 'Career & Higher-Studies Fair', venue: 'SRCC Grounds', desc: 'Counselling sessions, exam-prep workshops and university stalls.', icon: '💼' },
  ],
  team: [
    { role: 'President', name: 'To be updated', college: 'University of Delhi' },
    { role: 'Vice President', name: 'To be updated', college: 'University of Delhi' },
    { role: 'Secretary', name: 'To be updated', college: 'University of Delhi' },
    { role: 'Joint Secretary', name: 'To be updated', college: 'University of Delhi' },
  ],
  scholarships: [
    { name: 'DU Financial Support Scheme (FSS)', provider: 'University of Delhi', benefit: 'Up to 100% fee waiver for students with family income below the notified limit', link: 'https://fssdu.uod.ac.in/' },
    { name: 'PM-USP / Central Sector Scheme (CSSS)', provider: 'Ministry of Education, Govt. of India', benefit: '₹12,000–₹20,000 per annum for meritorious students from low-income families', link: 'https://scholarships.gov.in/' },
    { name: 'Post-Matric Scholarship (SC/ST/OBC)', provider: 'Govt. of NCT of Delhi / State Govts.', benefit: 'Maintenance allowance and fee reimbursement for eligible categories', link: 'https://scholarships.gov.in/' },
    { name: 'Merit-cum-Means Income Linked Financial Assistance', provider: 'Govt. of NCT of Delhi', benefit: 'Reimbursement of tuition fee for Delhi-domicile students', link: 'https://edistrict.delhigovt.nic.in/' },
  ],
  faqs: [
    { q: 'Who is a member of DUSU?', a: 'Every student enrolled in a DUSU-affiliated college or department of the University of Delhi is automatically a member of the union. There is no separate registration.' },
    { q: 'How are DUSU office bearers elected?', a: 'The four central office bearers are elected annually by direct vote of students, conducted as per University rules and Lyngdoh Committee guidelines.' },
    { q: 'How do I raise a grievance with DUSU?', a: 'Use the "Raise Query / Grievance" form on the website. You will receive a reference ID to track the status of your complaint.' },
    { q: 'What should I do if I face ragging?', a: 'Call the 24×7 UGC Anti-Ragging Helpline 1800-180-5522 immediately, or file a complaint at antiragging.in. Complaints can be made anonymously.' },
  ],
  milestones: [
    { year: '1949', title: 'DUSU is founded', desc: "The Delhi University Students' Union is established as the representative body of DU students." },
    { year: '2006', title: 'Lyngdoh guidelines adopted', desc: 'Elections align with Lyngdoh Committee recommendations on spending, eligibility and campaigning.' },
    { year: '2026', title: 'Digital DUSU (sample)', desc: 'Launch of the DUSU portal — online grievances, helplines, scholarships and event updates in one place.' },
  ],
  resources: [
    { name: 'University of Delhi — Official Website', url: 'https://www.du.ac.in/', desc: 'Notifications, academic calendar and official circulars' },
    { name: 'DU Admissions Portal', url: 'https://admission.uod.ac.in/', desc: 'UG and PG admissions through CSAS' },
    { name: 'National Scholarship Portal', url: 'https://scholarships.gov.in/', desc: 'Central and state scholarship applications' },
    { name: 'UGC Anti-Ragging Portal', url: 'https://antiragging.in/', desc: 'File anti-ragging complaints and affidavits' },
  ],
  colleges: COLLEGES,
}
