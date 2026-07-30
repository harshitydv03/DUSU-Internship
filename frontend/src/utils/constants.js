// Central place for site-wide data. Replace the sample entries with real
// content from the DUSU office / backend API as it becomes available.

export const SITE = {
  name: "Delhi University Students' Union",
  short: 'DUSU',
  established: 1949,
  address:
    "DUSU Office, Chhatra Marg, near University Stadium, University of Delhi, Delhi - 110007",
  email: 'dusu@du.ac.in',
  phone: '+91-11-2766-7727',
}

export const NAV_MENU = [
  {
    label: 'About DUSU',
    to: '/about',
    children: [
      { label: 'Mission & Vision', to: '/about/mission' },
      { label: 'History & Initiatives', to: '/about/history' },
      { label: 'Mandate / Constitution', to: '/about/structure' },
      { label: "President's Message", to: '/about/presidents-message' },
      { label: 'Handbook', to: '/about/handbook' },
      { label: 'Elections', to: '/about/elections' },
      { label: 'Gallery', to: '/gallery' },
      { label: 'DU Fest Calendar', to: '/fests' },
      { label: 'DUSU Cells', to: '/about/dusu-cells' },
    ],
  },
  {
    label: 'Student Services',
    to: '/services',
    children: [
      { label: 'Scholarships', to: '/services/scholarships' },
      { label: 'Opportunities', to: '/services/opportunities' },
      { label: 'Downloads & Forms', to: '/services/downloads' },
      { label: 'Hostel / PG Information', to: '/services/hostel-pg' },
      { label: 'Health Services', to: '/services/health' },
      { label: 'Samarth DU Portal', to: 'https://slc.uod.ac.in/', external: true },
      { label: 'Sports Facilities', to: '/services/facilities/sports' },
      { label: 'DUCC', to: '/services/facilities/ducc' },
    ],
  },
  {
    label: 'Student Help',
    to: '/help',
    children: [
      { label: 'Help Centre', to: '/help' },
      { label: "Freshers' Guide", to: '/help/freshers' },
      { label: 'Raise Query / Grievance', to: '/help/raise-query' },
      { label: 'Track My Query', to: '/help/track-query' },
      { label: 'FAQs & Knowledge Base', to: '/help/faqs' },
      { label: 'Helplines & Emergency', to: '/help/helplines' },
      { label: 'Anti-Ragging & Safety', to: '/help/anti-ragging' },
    ],
  },
  {
    label: 'Administration',
    to: '/team/office-bearers',
    children: [
      { label: 'Office Bearers', to: '/team/office-bearers' },
      { label: 'Staff Advisors', to: '/team/staff-advisors' },
      { label: 'Alumni in Public Life', to: '/team/alumni' },
    ],
  },
  {
    label: 'Campuses',
    to: '/campuses',
    children: [
      { label: 'Colleges & Departments', to: '/colleges' },
      { label: 'Prerana Bhawan', to: '/campuses/prerana-bhawan' },
      { label: 'DUSU Office', to: '/campuses/dusu-office' },
    ],
  },
  { label: 'Contact', to: '/contact' },
]

export const HELPLINES = [
  {
    name: 'UGC Anti-Ragging Helpline',
    number: '1800-180-5522',
    note: '24×7 toll-free national helpline (helpline@antiragging.in)',
    icon: 'ShieldAlert',
  },
  { name: 'National Emergency Number', number: '112', note: 'Police / fire / medical emergency', icon: 'AlertCircle' },
  { name: 'Women Helpline', number: '181', note: 'All-India women helpline', icon: 'User' },
  { name: 'Ambulance', number: '102', note: 'Medical assistance', icon: 'Phone' },
  { name: 'Student Mental Health (Tele-MANAS)', number: '14416', note: 'Govt. of India mental health support', icon: 'MessageCircle' },
  { name: 'DUSU Help Desk', number: '+91-11-2766-7727', note: 'Official DUSU Office desk number', icon: 'GraduationCap' },
]

// ---- Content definitions ----

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
    gradient: 'linear-gradient(135deg,#9900cc,#c14ae8)',
    icon: 'Star',
  },
  {
    id: 2,
    date: '2026-08-19',
    title: 'Blood Donation Camp',
    venue: 'University Stadium',
    desc: 'Annual donation camp in association with the Red Cross Society.',
    gradient: 'linear-gradient(135deg,#8f1f1f,#d9763a)',
    icon: 'Droplet',
  },
  {
    id: 3,
    date: '2026-09-08',
    title: 'Inter-College Debate Championship',
    venue: 'Arts Faculty Auditorium',
    desc: 'Teams from 40+ colleges compete for the DUSU rolling trophy.',
    gradient: 'linear-gradient(135deg,#7a00a3,#b03ddb)',
    icon: 'Mic',
  },
  {
    id: 4,
    date: '2026-09-22',
    title: 'Career & Higher-Studies Fair',
    venue: 'SRCC Grounds',
    desc: 'Counselling sessions, exam-prep workshops and university stalls.',
    gradient: 'linear-gradient(135deg,#1d4c7c,#3a8fd9)',
    icon: 'Briefcase',
  },
]

export const OFFICE_BEARERS = [
  {
    role: 'President',
    name: 'Aryan Maan',
    college: 'University of Delhi',
    initials: 'AM',
    image: '/images/president.jpeg',
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/aryanmaan' },
      { platform: 'twitter', url: 'https://x.com/aryanmaan09' },
      { platform: 'facebook', url: 'https://facebook.com/aryanmaan11' }
    ]
  },
  {
    role: 'Vice President',
    name: 'Rahul Jhansla',
    college: 'University of Delhi',
    initials: 'RJ',
    image: '/images/vicepresident.jpeg',
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/rahuljhansla.delhiuniversity' },
      { platform: 'twitter', url: 'https://x.com/rahuljhanslaa' },
      { platform: 'facebook', url: 'https://facebook.com/rahuljhanslaofficial' },
      { platform: 'website', url: 'https://rahuljhansla.in' }
    ]
  },
  {
    role: 'Secretary',
    name: 'Kunal Choudhary',
    college: 'University of Delhi',
    initials: 'KC',
    image: '/images/secretary.jpeg',
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/kunalchoudhary05' },
      { platform: 'twitter', url: 'https://x.com/kunalchoudhry05' },
      { platform: 'facebook', url: 'https://facebook.com/kuunal.chaudhary.2025' }
    ]
  },
  {
    role: 'Joint Secretary',
    name: 'Deepika Jha',
    college: 'University of Delhi',
    initials: 'DJ',
    image: '/images/jointsec.jpeg',
    socials: [
      { platform: 'instagram', url: 'https://instagram.com/deepika.jhaa' },
      { platform: 'threads', url: 'https://threads.net/@deepika.jhaa' }
    ]
  }
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
  { title: 'DUSU Web & Design Team', type: 'Volunteering', desc: 'Students with web, design or content skills can join the team maintaining this portal.', icon: 'Laptop' },
  { title: 'Campus Ambassador Programme', type: 'Leadership', desc: 'Represent DUSU in your college and coordinate campaigns and camps.', icon: 'Megaphone' },
  { title: 'Grievance Cell Internship', type: 'Internship', desc: 'Assist the redressal desk, learn case handling and university procedure.', icon: 'Clipboard' },
  { title: 'Event Management Crew', type: 'Volunteering', desc: 'Help organise fests, debates, donation drives and sports meets.', icon: 'Calendar' },
]

export const DOWNLOAD_FORMS = [
  { name: 'Grievance / Complaint Form (offline)', type: 'PDF', note: 'For submitting complaints physically at the DUSU office' },
  { name: 'Fee Concession Application', type: 'PDF', note: 'Format accepted by most DU colleges' },
  { name: 'Anti-Ragging Affidavit', type: 'Link', note: 'Generate at antiragging.in — mandatory at admission' },
  { name: 'Event Collaboration Proposal Template', type: 'DOCX', note: 'For societies seeking DUSU support for events' },
  { name: 'RTI Application Guide', type: 'PDF', note: 'How to file an RTI with the University of Delhi' },
]

export const RESOURCES = [
  { name: 'University of Delhi — Official Website', url: 'https://www.du.ac.in/', desc: 'Notifications, academic calendar and official circulars', icon: 'Bank' },
  { name: 'DU Admissions Portal', url: 'https://admission.uod.ac.in/', desc: 'UG and PG admissions through CSAS', icon: 'FileText' },
  { name: 'School of Open Learning (SOL)', url: 'https://sol.du.ac.in/', desc: 'Distance and open learning programmes', icon: 'BookOpen' },
  { name: 'National Scholarship Portal', url: 'https://scholarships.gov.in/', desc: 'Central and state scholarship applications', icon: 'GraduationCap' },
  { name: 'UGC Anti-Ragging Portal', url: 'https://antiragging.in/', desc: 'File anti-ragging complaints and affidavits', icon: 'ShieldAlert' },
  { name: 'DigiLocker', url: 'https://www.digilocker.gov.in/', desc: 'Digital marksheets and certificates', icon: 'Folder' },
]

export const MILESTONES = [
  { year: '1949', title: 'DUSU is founded', desc: 'The Delhi University Students\' Union is established as the representative body of DU students.' },
  { year: '1970s–80s', title: 'A national voice', desc: 'DUSU becomes one of the most influential student bodies in India, launching campaigns on education policy and student welfare.' },
  { year: '2006', title: 'Lyngdoh guidelines adopted', desc: 'Elections align with Lyngdoh Committee recommendations on spending, eligibility and campaigning.' },
  { year: '2024', title: 'Campus connectivity campaign', desc: 'Sustained advocacy for better shuttle services and concessional metro travel for students.' },
  { year: '2026', title: 'Digital DUSU Portal', desc: 'Launch of this portal — online grievances, helplines, scholarships and event updates in one place.' },
]

export const GALLERY_ITEMS = [
  { caption: 'Freshers Orientation 2025', gradient: 'linear-gradient(135deg,#9900cc,#c14ae8)', icon: 'Star' },
  { caption: 'Blood Donation Camp', gradient: 'linear-gradient(135deg,#8f1f1f,#d9763a)', icon: 'Droplet' },
  { caption: 'Inter-College Sports Meet', gradient: 'linear-gradient(135deg,#1d5c7c,#3aa8d9)', icon: 'Trophy' },
  { caption: 'Tree Plantation Drive', gradient: 'linear-gradient(135deg,#1d7c40,#7cb95a)', icon: 'Leaf' },
  { caption: 'Debate Championship Finals', gradient: 'linear-gradient(135deg,#7a00a3,#b03ddb)', icon: 'Mic' },
  { caption: 'Winter Book Donation', gradient: 'linear-gradient(135deg,#7c5a1d,#d9a53a)', icon: 'BookOpen' },
  { caption: 'Republic Day at North Campus', gradient: 'linear-gradient(135deg,#284b8f,#d97a3a)', icon: 'Flag' },
  { caption: 'Cultural Fest Night', gradient: 'linear-gradient(135deg,#4b1d7c,#a53ad9)', icon: 'Theater' },
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
