import { useState } from 'react'
import { CheckCircle } from 'lucide-react'

// Messages are acknowledged locally for now; wire to POST /api/contact when
// the backend is ready.
export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  if (sent) {
    return (
      <div className="alert alert-success" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <CheckCircle size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
        <span>
          Thanks, {form.name.split(' ')[0] || 'friend'}! Your message has been recorded. The DUSU office typically responds within 3–5 working days.
        </span>
      </div>
    )
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="c-name">Name</label>
          <input id="c-name" name="name" required value={form.name} onChange={update} placeholder="Your name" />
        </div>
        <div className="form-field">
          <label htmlFor="c-email">Email</label>
          <input id="c-email" name="email" type="email" required value={form.email} onChange={update} placeholder="you@example.com" />
        </div>
        <div className="form-field full">
          <label htmlFor="c-subject">Subject</label>
          <input id="c-subject" name="subject" required value={form.subject} onChange={update} placeholder="What is this about?" />
        </div>
        <div className="form-field full">
          <label htmlFor="c-message">Message</label>
          <textarea id="c-message" name="message" rows="5" required value={form.message} onChange={update} placeholder="Write your message…" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary" style={{ marginTop: 22 }}>
        Send message
      </button>
    </form>
  )
}
