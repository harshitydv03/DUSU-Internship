import { useEffect } from 'react'
import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import { TOKEN_KEY } from './utils/apiClient.js'
import Navbar from './components/common/Navbar.jsx'
import Footer from './components/common/Footer.jsx'

import Home from './pages/home/Home.jsx'
import NotFound from './pages/NotFound.jsx'

import AboutDUSU from './pages/about-dusu/AboutDUSU.jsx'
import HistoryMandate from './pages/about-dusu/HistoryMandate.jsx'
import StructureConstitution from './pages/about-dusu/StructureConstitution.jsx'
import Elections from './pages/about-dusu/Elections.jsx'

import OurTeam from './pages/our-team/OurTeam.jsx'
import OfficeBearers from './pages/our-team/OfficeBearers.jsx'
import CollegeRepresentatives from './pages/our-team/CollegeRepresentatives.jsx'

import StudentHelp from './pages/student-help/StudentHelp.jsx'
import RaiseQueryGrievance from './pages/student-help/RaiseQueryGrievance.jsx'
import TrackMyQuery from './pages/student-help/TrackMyQuery.jsx'
import FAQKnowledgeBase from './pages/student-help/FAQKnowledgeBase.jsx'
import HelplinesEmergency from './pages/student-help/HelplinesEmergency.jsx'
import AntiRaggingSafetySOS from './pages/student-help/AntiRaggingSafetySOS.jsx'

import StudentServices from './pages/student-services/StudentServices.jsx'
import Scholarships from './pages/student-services/Scholarships.jsx'
import Opportunities from './pages/student-services/Opportunities.jsx'
import DownloadsForms from './pages/student-services/DownloadsForms.jsx'

import EventsCalendar from './pages/events-calendar/EventsCalendar.jsx'
import Gallery from './pages/gallery/Gallery.jsx'
import NewsNotices from './pages/news-notices/NewsNotices.jsx'
import Resources from './pages/resources/Resources.jsx'
import WorkMilestones from './pages/work-milestones/WorkMilestones.jsx'
import ContactReachUs from './pages/contact/ContactReachUs.jsx'

import AdminLogin from './pages/admin/AdminLogin.jsx'
import AdminDashboardAnalytics from './pages/admin/AdminDashboardAnalytics.jsx'
import ContentManagement from './pages/admin/ContentManagement.jsx'
import QueryManagement from './pages/admin/QueryManagement.jsx'
import UserRoleManagement from './pages/admin/UserRoleManagement.jsx'
import SettingsAuditLog from './pages/admin/SettingsAuditLog.jsx'

// Client-side gate for admin pages; the API enforces real security.
function RequireAdmin({ children }) {
  return localStorage.getItem(TOKEN_KEY) ? children : <Navigate to="/admin/login" replace />
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/about" element={<AboutDUSU />} />
          <Route path="/about/history" element={<HistoryMandate />} />
          <Route path="/about/structure" element={<StructureConstitution />} />
          <Route path="/about/elections" element={<Elections />} />

          <Route path="/team" element={<OurTeam />} />
          <Route path="/team/office-bearers" element={<OfficeBearers />} />
          <Route path="/team/college-representatives" element={<CollegeRepresentatives />} />

          <Route path="/help" element={<StudentHelp />} />
          <Route path="/help/raise-query" element={<RaiseQueryGrievance />} />
          <Route path="/help/track-query" element={<TrackMyQuery />} />
          <Route path="/help/faqs" element={<FAQKnowledgeBase />} />
          <Route path="/help/helplines" element={<HelplinesEmergency />} />
          <Route path="/help/anti-ragging" element={<AntiRaggingSafetySOS />} />

          <Route path="/services" element={<StudentServices />} />
          <Route path="/services/scholarships" element={<Scholarships />} />
          <Route path="/services/opportunities" element={<Opportunities />} />
          <Route path="/services/downloads" element={<DownloadsForms />} />

          <Route path="/events" element={<EventsCalendar />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<NewsNotices />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/milestones" element={<WorkMilestones />} />
          <Route path="/contact" element={<ContactReachUs />} />

          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<RequireAdmin><AdminDashboardAnalytics /></RequireAdmin>} />
          <Route path="/admin/content" element={<RequireAdmin><ContentManagement /></RequireAdmin>} />
          <Route path="/admin/queries" element={<RequireAdmin><QueryManagement /></RequireAdmin>} />
          <Route path="/admin/users" element={<RequireAdmin><UserRoleManagement /></RequireAdmin>} />
          <Route path="/admin/settings" element={<RequireAdmin><SettingsAuditLog /></RequireAdmin>} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
