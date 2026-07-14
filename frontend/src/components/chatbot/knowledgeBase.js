// DU Assist knowledge base — keyword-matched FAQ answers.
// To teach the bot something new, add a topic: keywords it should react to,
// the reply, and optional links into the site. Multi-word phrases score
// higher than single keywords, so put distinctive phrases first.

export const GREETING = {
  text: "Hi! I'm DU Assist 🎓 — ask me anything about scholarships, grievances, hostels, elections, safety or campus life at Delhi University.",
  links: [],
}

export const QUICK_CHIPS = [
  'How do I get a scholarship?',
  'I want to file a complaint',
  'Anti-ragging help',
  'Track my query',
  'DUSU election info',
]

export const FALLBACK = {
  text: "I don't have an answer for that yet 😅 — but a real person does! You can raise a query and the DUSU team will reply to you, or call the helpline for urgent matters.",
  links: [
    { label: 'Raise a Query', to: '/help/raise-query' },
    { label: 'All Helplines', to: '/help/helplines' },
    { label: 'Contact DUSU', to: '/contact' },
  ],
}

const KNOWLEDGE_BASE = [
  {
    keywords: ['hi', 'hello', 'hey', 'namaste', 'hii', 'good morning', 'good evening'],
    reply: GREETING.text,
    links: [],
  },
  {
    keywords: ['scholarship', 'scholarships', 'fss', 'fee waiver', 'financial aid', 'csss', 'financial help', 'money help'],
    reply:
      'DU students can apply for several schemes — the DU Financial Support Scheme (up to 100% fee waiver), the Central Sector Scheme (₹12,000–₹20,000/yr), Post-Matric scholarships for SC/ST/OBC, and Delhi Govt Merit-cum-Means aid. DUSU help desks assist with the paperwork.',
    links: [
      { label: 'Scholarships page', to: '/services/scholarships' },
      { label: 'Downloads & Forms', to: '/services/downloads' },
    ],
  },
  {
    keywords: ['fee concession', 'fees', 'fee', 'ews', 'concession', 'tuition'],
    reply:
      'For fee concessions, check the DU Financial Support Scheme and the EWS facilitation camps DUSU runs. Your college admin office accepts the fee-concession application — the format is in our Downloads section.',
    links: [
      { label: 'Scholarships & aid', to: '/services/scholarships' },
      { label: 'Fee concession form', to: '/services/downloads' },
    ],
  },
  {
    keywords: ['ragging', 'ragged', 'harassment', 'harass', 'bully', 'bullying', 'threat', 'unsafe', 'safety', 'sos'],
    reply:
      '🚨 Ragging is a punishable offence and DU has zero tolerance. Call the 24×7 UGC Anti-Ragging Helpline 1800-180-5522 right now, or dial 112 in an emergency. You can also complain anonymously at antiragging.in — DUSU will stand with you at every step.',
    links: [
      { label: 'Anti-Ragging & SOS', to: '/help/anti-ragging' },
      { label: 'Report through DUSU', to: '/help/raise-query' },
    ],
  },
  {
    keywords: ['complaint', 'complain', 'grievance', 'raise query', 'file a complaint', 'problem', 'issue', 'report'],
    reply:
      'You can file a grievance right on this site — fill the form and you\'ll get a reference ID (like DUSU-2026-123456). The team reviews every query, updates its status and replies to you on the tracker.',
    links: [{ label: 'Raise a Query / Grievance', to: '/help/raise-query' }],
  },
  {
    keywords: ['track', 'status', 'reference id', 'refid', 'my query', 'reply', 'response'],
    reply:
      'Enter your reference ID (format: DUSU-YYYY-XXXXXX) on the Track My Query page — you\'ll see the current status and any replies from the DUSU team.',
    links: [{ label: 'Track My Query', to: '/help/track-query' }],
  },
  {
    keywords: ['helpline', 'helplines', 'emergency', 'police', 'ambulance', 'women helpline', 'phone number'],
    reply:
      'Key numbers: Anti-Ragging 1800-180-5522 (24×7) · Emergency 112 · Women Helpline 181 · Ambulance 102 · Mental health (Tele-MANAS) 14416. All are toll-free.',
    links: [{ label: 'All Helplines', to: '/help/helplines' }],
  },
  {
    keywords: ['election', 'elections', 'vote', 'voting', 'president', 'candidate', 'lyngdoh', 'panel'],
    reply:
      'DUSU elections are held every year (usually September). All regular students of affiliated colleges vote for the four central office bearers — President, Vice President, Secretary and Joint Secretary — under Lyngdoh Committee guidelines.',
    links: [
      { label: 'Elections explained', to: '/about/elections' },
      { label: 'Current office bearers', to: '/team/office-bearers' },
    ],
  },
  {
    keywords: ['member', 'membership', 'join dusu', 'part of dusu'],
    reply:
      'Good news — you already are one! Every student of a DUSU-affiliated DU college or department is automatically a member of the union. No registration needed.',
    links: [{ label: 'About DUSU', to: '/about' }],
  },
  {
    keywords: ['hostel', 'hostels', 'accommodation', 'pg', 'room', 'rent', 'stay'],
    reply:
      'Hostel seats are allotted by individual colleges/departments — apply through your college after admission. Struggling with accommodation? DUSU has been pushing for more hostel capacity; raise a query and the team will guide you with PG/hostel options.',
    links: [{ label: 'Raise a hostel query', to: '/help/raise-query' }],
  },
  {
    keywords: ['event', 'events', 'fest', 'fests', 'calendar', 'camp', 'workshop', 'competition'],
    reply:
      'DUSU organises orientation drives, blood donation camps, debates, career fairs and more across campuses. The Events Calendar has dates and venues.',
    links: [{ label: 'Events Calendar', to: '/events' }],
  },
  {
    keywords: ['admission', 'admissions', 'cuet', 'csas', 'apply', 'enroll', 'seat allocation'],
    reply:
      'DU admissions (UG & PG) run through the CSAS portal based on CUET scores. Official info is on the DU admission portal — and if you hit a problem during admission, DUSU help desks can assist.',
    links: [
      { label: 'Useful DU portals', to: '/resources' },
      { label: 'Get admission help', to: '/help/raise-query' },
    ],
  },
  {
    keywords: ['exam', 'exams', 'result', 'results', 'datesheet', 'marksheet', 'revaluation', 'backlog'],
    reply:
      'Exam schedules and results are published by the University on du.ac.in and your college portal. Issues like wrong marks, missing results or revaluation delays are exactly what the grievance desk handles — file a query with your details.',
    links: [
      { label: 'DU portals', to: '/resources' },
      { label: 'File an exam grievance', to: '/help/raise-query' },
    ],
  },
  {
    keywords: ['office', 'address', 'located', 'location', 'visit', 'reach', 'contact'],
    reply:
      'The DUSU office is on Chhatra Marg, near the University Stadium, North Campus, Delhi-110007. Office hours: Mon–Fri, 10 AM–5 PM on University working days.',
    links: [{ label: 'Contact & directions', to: '/contact' }],
  },
  {
    keywords: ['stress', 'stressed', 'depression', 'depressed', 'anxiety', 'mental health', 'counselling', 'sad', 'lonely'],
    reply:
      "You're not alone, and reaching out is the right move 💛. Tele-MANAS (14416) is the Govt. of India's free 24×7 mental-health helpline. For campus-related stress, DUSU can also connect you with college counsellors — just raise a query.",
    links: [{ label: 'Helplines & support', to: '/help/helplines' }],
  },
  {
    keywords: ['volunteer', 'volunteering', 'internship', 'intern', 'join team', 'work with', 'campus ambassador'],
    reply:
      'DUSU takes student volunteers for the web team, grievance cell, event crews and the campus ambassador programme — great experience and a real contribution to campus life.',
    links: [{ label: 'Opportunities', to: '/services/opportunities' }],
  },
  {
    keywords: ['form', 'forms', 'download', 'downloads', 'affidavit', 'rti', 'template'],
    reply:
      'The Downloads section has the grievance form, fee-concession application, anti-ragging affidavit guide, RTI guide and event proposal templates.',
    links: [{ label: 'Downloads & Forms', to: '/services/downloads' }],
  },
  {
    keywords: ['shuttle', 'bus', 'metro', 'transport', 'travel'],
    reply:
      'The North Campus shuttle runs between Vishwavidyalaya Metro and the Arts Faculty (every ~15 min on working days). DUSU continues to push for better student transport and metro concessions.',
    links: [{ label: 'News & notices', to: '/news' }],
  },
  {
    keywords: ['thanks', 'thank you', 'thankyou', 'shukriya', 'dhanyawad'],
    reply: "You're welcome! 😊 All the best — and remember, DUSU is always here for you. Jai Hind!",
    links: [],
  },
]

const normalize = (s) => ` ${s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim()} `

// Phrase matches score double so "fee concession" beats a lone "fee".
export function findAnswer(input) {
  const text = normalize(input)
  let best = null
  let bestScore = 0
  for (const topic of KNOWLEDGE_BASE) {
    let score = 0
    for (const kw of topic.keywords) {
      if (kw.includes(' ') ? text.includes(kw) : text.includes(` ${kw} `)) {
        score += kw.includes(' ') ? 2 : 1
      }
    }
    if (score > bestScore) {
      bestScore = score
      best = topic
    }
  }
  return best ? { text: best.reply, links: best.links } : FALLBACK
}
