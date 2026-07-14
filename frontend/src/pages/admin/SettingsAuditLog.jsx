import AdminSidebar from '../../components/admin/AdminSidebar.jsx'
import Icon from '../../components/Icon.jsx'

export default function SettingsAuditLog() {
  return (
    <div className="container admin-layout">
      <AdminSidebar />
      <div>
        <h1 style={{ marginBottom: 6 }}>Settings &amp; Audit Log</h1>
        <p style={{ color: 'var(--muted)', marginBottom: 26 }}>
          Site configuration and a record of every admin action, for accountability.
        </p>
        <div className="grid-2">
          <div className="card">
            <div className="card-icon"><Icon name="Settings" /></div>
            <h3>Site Settings</h3>
            <p>Contact details, helpline numbers, social links and homepage banners will be editable here.</p>
          </div>
          <div className="card">
            <div className="card-icon"><Icon name="FileText" /></div>
            <h3>Audit Log</h3>
            <p>Every create / edit / delete by an admin will be recorded with a timestamp and user ID.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
