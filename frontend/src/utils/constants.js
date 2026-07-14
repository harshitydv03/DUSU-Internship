// Central place for site-wide data. Replace the sample entries with real
// content from the DUSU office / backend API as it becomes available.

export const SITE = {
  name: "Delhi University Students' Union",
  short: 'DUSU',
  established: 1949,
  address:
    "DUSU Office, Chhatra Marg, near University Stadium, University of Delhi, Delhi - 110007",
  email: 'contact@dusu.example.in', // sample — replace with official email
  phone: '+91-11-XXXX-XXXX', // sample — replace with official number
}

export const NAV_MENU = [
  {
    label: 'About DUSU',
    to: '/about',
    children: [
      { label: 'About DUSU', to: '/about' },
      { label: 'History & Mandate', to: '/about/history' },
      { label: 'Structure & Constitution', to: '/about/structure' },
      { label: 'Elections', to: '/about/elections' },
    ],
  },
  {
    label: 'Our Team',
    to: '/team',
    children: [
      { label: 'Team Overview', to: '/team' },
      { label: 'Office Bearers', to: '/team/office-bearers' },
      { label: 'College Representatives', to: '/team/college-representatives' },
    ],
  },
  {
    label: 'Student Help',
    to: '/help',
    children: [
      { label: 'Help Centre', to: '/help' },
      { label: 'Raise Query / Grievance', to: '/help/raise-query' },
      { label: 'Track My Query', to: '/help/track-query' },
      { label: 'FAQs & Knowledge Base', to: '/help/faqs' },
      { label: 'Helplines & Emergency', to: '/help/helplines' },
      { label: 'Anti-Ragging & Safety', to: '/help/anti-ragging' },
    ],
  },
  {
    label: 'Services',
    to: '/services',
    children: [
      { label: 'All Services', to: '/services' },
      { label: 'Scholarships', to: '/services/scholarships' },
      { label: 'Opportunities', to: '/services/opportunities' },
      { label: 'Downloads & Forms', to: '/services/downloads' },
    ],
  },
  {
    label: 'Campus Life',
    to: '/events',
    children: [
      { label: 'Events Calendar', to: '/events' },
      { label: 'News & Notices', to: '/news' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'Resources', to: '/resources' },
      { label: 'Work & Milestones', to: '/milestones' },
    ],
  },
  { label: 'Contact', to: '/contact' },
]

export const HELPLINES = [
  {
    name: 'UGC Anti-Ragging Helpline',
    number: '1800-180-5522',
    note: '24×7 toll-free national helpline (helpline@antiragging.in)',
    icon: '🛡️',
  },
  { name: 'National Emergency Number', number: '112', note: 'Police / fire / medical emergency', icon: '🚨' },
  { name: 'Women Helpline', number: '181', note: 'All-India women helpline', icon: '👩' },
  { name: 'Ambulance', number: '102', note: 'Medical assistance', icon: '🚑' },
  { name: 'Student Mental Health (Tele-MANAS)', number: '14416', note: 'Govt. of India mental health support', icon: '💬' },
  { name: 'DUSU Help Desk', number: '+91-11-XXXX-XXXX', note: 'Sample — replace with the official DUSU desk number', icon: '🎓' },
]

// ---- Sample content below (replace via admin panel / backend later) ----

export const SAMPLE_NOTICES = [
  {
    id: 1,
    date: '2026-07-10',
    tag: 'Notice',
    title: 'Volunteers invited for the Student Grievance Cell',
    body: 'Applications are open for student volunteers to assist the grievance redressal desk for the 2026–27 session.',
  },
  {
    id: 2,
    date: '2026-07-04',
    tag: 'Update',
    title: 'Memorandum on hostel accommodation submitted',
    body: 'DUSU submitted a memorandum seeking expansion of hostel capacity across North and South Campus.',
  },
  {
    id: 3,
    date: '2026-06-28',
    tag: 'News',
    title: 'Special fee-concession camp for EWS students announced',
    body: 'A week-long facilitation camp will help EWS students complete fee-concession paperwork.',
  },
  {
    id: 4,
    date: '2026-06-15',
    tag: 'Notice',
    title: 'North Campus shuttle service — revised timings',
    body: 'The campus shuttle will now run every 15 minutes between Vishwavidyalaya Metro and the Arts Faculty.',
  },
]

export const SAMPLE_EVENTS = [
  {
    id: 1,
    date: '2026-08-03',
    title: 'Freshers Orientation Drive',
    venue: 'Conference Centre, North Campus',
    desc: 'Campus tours, society stalls and help desks for the incoming batch.',
    gradient: 'linear-gradient(135deg,#7c1d2e,#b0553f)',
    icon: '🎉',
  },
  {
    id: 2,
    date: '2026-08-19',
    title: 'Blood Donation Camp',
    venue: 'University Stadium',
    desc: 'Annual donation camp in association with the Red Cross Society.',
    gradient: 'linear-gradient(135deg,#8f1f1f,#d9763a)',
    icon: '🩸',
  },
  {
    id: 3,
    date: '2026-09-08',
    title: 'Inter-College Debate Championship',
    venue: 'Arts Faculty Auditorium',
    desc: 'Teams from 40+ colleges compete for the DUSU rolling trophy.',
    gradient: 'linear-gradient(135deg,#5a1421,#9a3d63)',
    icon: '🎤',
  },
  {
    id: 4,
    date: '2026-09-22',
    title: 'Career & Higher-Studies Fair',
    venue: 'SRCC Grounds',
    desc: 'Counselling sessions, exam-prep workshops and university stalls.',
    gradient: 'linear-gradient(135deg,#1d4c7c,#3a8fd9)',
    icon: '💼',
  },
]

export const OFFICE_BEARERS = [
  { role: 'President', name: 'To be updated', college: 'University of Delhi', initials: 'P' },
  { role: 'Vice President', name: 'To be updated', college: 'University of Delhi', initials: 'VP' },
  { role: 'Secretary', name: 'To be updated', college: 'University of Delhi', initials: 'S' },
  { role: 'Joint Secretary', name: 'To be updated', college: 'University of Delhi', initials: 'JS' },
]

export const FAQS = [
  {
    q: 'Who is a member of DUSU?',
    a: 'Every student enrolled in a DUSU-affiliated college or department of the University of Delhi is automatically a member of the union. There is no separate registration.',
  },
  {
    q: 'How are DUSU office bearers elected?',
    a: 'The four central office bearers — President, Vice President, Secretary and Joint Secretary — are elected annually by direct vote of students, conducted as per University rules and Lyngdoh Committee guidelines.',
  },
  {
    q: 'How do I raise a grievance with DUSU?',
    a: 'Use the "Raise Query / Grievance" form on this website. You will receive a reference ID to track the status of your complaint. Urgent safety issues should go directly to the helplines listed on the Helplines page.',
  },
  {
    q: 'Does DUSU help with scholarships and fee concessions?',
    a: 'Yes. The Student Services section lists major scholarships available to DU students, and DUSU help desks assist with applications and university paperwork.',
  },
  {
    q: 'What should I do if I face ragging?',
    a: 'Call the 24×7 UGC Anti-Ragging Helpline 1800-180-5522 immediately, or file a complaint at antiragging.in. Ragging is a punishable offence and complaints can be made anonymously.',
  },
  {
    q: 'How can my college society collaborate with DUSU for an event?',
    a: 'Write to the DUSU office through the Contact page with your proposal, expected footfall and dates. The events team reviews proposals every week.',
  },
]

export const SCHOLARSHIPS = [
  {
    name: 'DU Financial Support Scheme (FSS)',
    provider: 'University of Delhi',
    benefit: 'Up to 100% fee waiver for students with family income below the notified limit',
    link: 'https://fssdu.uod.ac.in/',
  },
  {
    name: 'PM-USP / Central Sector Scheme (CSSS)',
    provider: 'Ministry of Education, Govt. of India',
    benefit: '₹12,000–₹20,000 per annum for meritorious students from low-income families',
    link: 'https://scholarships.gov.in/',
  },
  {
    name: 'Post-Matric Scholarship (SC/ST/OBC)',
    provider: 'Govt. of NCT of Delhi / State Govts.',
    benefit: 'Maintenance allowance and fee reimbursement for eligible categories',
    link: 'https://scholarships.gov.in/',
  },
  {
    name: 'Merit-cum-Means Income Linked Financial Assistance',
    provider: 'Govt. of NCT of Delhi',
    benefit: 'Reimbursement of tuition fee for Delhi-domicile students',
    link: 'https://edistrict.delhigovt.nic.in/',
  },
]

export const OPPORTUNITIES = [
  { title: 'DUSU Web & Design Team', type: 'Volunteering', desc: 'Students with web, design or content skills can join the team maintaining this portal.', icon: '💻' },
  { title: 'Campus Ambassador Programme', type: 'Leadership', desc: 'Represent DUSU in your college and coordinate campaigns and camps.', icon: '📣' },
  { title: 'Grievance Cell Internship', type: 'Internship', desc: 'Assist the redressal desk, learn case handling and university procedure.', icon: '📋' },
  { title: 'Event Management Crew', type: 'Volunteering', desc: 'Help organise fests, debates, donation drives and sports meets.', icon: '🎪' },
]

export const DOWNLOAD_FORMS = [
  { name: 'Grievance / Complaint Form (offline)', type: 'PDF', note: 'For submitting complaints physically at the DUSU office' },
  { name: 'Fee Concession Application', type: 'PDF', note: 'Format accepted by most DU colleges' },
  { name: 'Anti-Ragging Affidavit', type: 'Link', note: 'Generate at antiragging.in — mandatory at admission' },
  { name: 'Event Collaboration Proposal Template', type: 'DOCX', note: 'For societies seeking DUSU support for events' },
  { name: 'RTI Application Guide', type: 'PDF', note: 'How to file an RTI with the University of Delhi' },
]

export const RESOURCES = [
  { name: 'University of Delhi — Official Website', url: 'https://www.du.ac.in/', desc: 'Notifications, academic calendar and official circulars', icon: '🏛️' },
  { name: 'DU Admissions Portal', url: 'https://admission.uod.ac.in/', desc: 'UG and PG admissions through CSAS', icon: '📝' },
  { name: 'School of Open Learning (SOL)', url: 'https://sol.du.ac.in/', desc: 'Distance and open learning programmes', icon: '📚' },
  { name: 'National Scholarship Portal', url: 'https://scholarships.gov.in/', desc: 'Central and state scholarship applications', icon: '🎓' },
  { name: 'UGC Anti-Ragging Portal', url: 'https://antiragging.in/', desc: 'File anti-ragging complaints and affidavits', icon: '🛡️' },
  { name: 'DigiLocker', url: 'https://www.digilocker.gov.in/', desc: 'Digital marksheets and certificates', icon: '🗂️' },
]

export const MILESTONES = [
  { year: '1949', title: 'DUSU is founded', desc: 'The Delhi University Students\' Union is established as the representative body of DU students.' },
  { year: '1970s–80s', title: 'A national voice', desc: 'DUSU becomes one of the most influential student bodies in India, launching campaigns on education policy and student welfare.' },
  { year: '2006', title: 'Lyngdoh guidelines adopted', desc: 'Elections align with Lyngdoh Committee recommendations on spending, eligibility and campaigning.' },
  { year: '2024', title: 'Campus connectivity campaign (sample)', desc: 'Sustained advocacy for better shuttle services and concessional metro travel for students.' },
  { year: '2026', title: 'Digital DUSU (sample)', desc: 'Launch of this portal — online grievances, helplines, scholarships and event updates in one place.' },
]

export const GALLERY_ITEMS = [
  { caption: 'Freshers Orientation 2025', gradient: 'linear-gradient(135deg,#7c1d2e,#b0553f)', icon: '🎉' },
  { caption: 'Blood Donation Camp', gradient: 'linear-gradient(135deg,#8f1f1f,#d9763a)', icon: '🩸' },
  { caption: 'Inter-College Sports Meet', gradient: 'linear-gradient(135deg,#1d5c7c,#3aa8d9)', icon: '🏆' },
  { caption: 'Tree Plantation Drive', gradient: 'linear-gradient(135deg,#1d7c40,#7cb95a)', icon: '🌱' },
  { caption: 'Debate Championship Finals', gradient: 'linear-gradient(135deg,#5a1421,#9a3d63)', icon: '🎤' },
  { caption: 'Winter Book Donation', gradient: 'linear-gradient(135deg,#7c5a1d,#d9a53a)', icon: '📚' },
  { caption: 'Republic Day at North Campus', gradient: 'linear-gradient(135deg,#284b8f,#d97a3a)', icon: '🇮🇳' },
  { caption: 'Cultural Fest Night', gradient: 'linear-gradient(135deg,#4b1d7c,#a53ad9)', icon: '🎭' },
]

export const QUERY_CATEGORIES = [
  'Admission / Fees',
  'Examination / Results',
  'Hostel / Accommodation',
  'Scholarship / Financial Aid',
  'Harassment / Ragging',
  'Infrastructure / Facilities',
  'Library / Academics',
  'Other',
]

export const QUERY_STORAGE_KEY = 'dusu_queries'
