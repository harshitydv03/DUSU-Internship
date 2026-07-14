import { useState } from 'react'
import { Link } from 'react-router-dom'
import apiClient from '../../utils/apiClient.js'
import { QUERY_CATEGORIES, QUERY_STORAGE_KEY } from '../../utils/constants.js'

// Submits to the backend API; falls back to localStorage when it is offline
// so students never lose a filed grievance.
export default function QueryForm() {
  const [submitted, setSubmitted] = useState(null)
  const [form, setForm] = useState({
    name: '',
    email: '',
    college: '',
    category: QUERY_CATEGORIES[0],
    subject: '',
    details: '',
  })

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const saved = await apiClient.post('/queries', form)
      setSubmitted(saved.refId)
    } catch {
      const refId = `DUSU-${new Date().getFullYear()}-${String(Date.now()).slice(-6)}`
      const record = { ...form, refId, status: 'Submitted', createdAt: new Date().toISOString() }
      const existing = JSON.parse(localStorage.getItem(QUERY_STORAGE_KEY) || '[]')
      localStorage.setItem(QUERY_STORAGE_KEY, JSON.stringify([...existing, record]))
      setSubmitted(refId)
    }
  }

  if (submitted) {
    return (
      <div className="form-card">
        <div className="alert alert-success">
          ✅ Your query has been registered. Your reference ID is <strong>{submitted}</strong>.
          Save it to check the status later.
        </div>
        <Link to="/help/track-query" className="btn btn-primary">
          Track my query
        </Link>
      </div>
    )
  }

  return (
    <form className="form-card" onSubmit={handleSubmit}>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" required value={form.name} onChange={update} placeholder="Your name" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required value={form.email} onChange={update} placeholder="you@example.com" />
        </div>
        <div className="form-field">
          <label htmlFor="college">College / Department</label>
          <input id="college" name="college" required value={form.college} onChange={update} placeholder="e.g. Hindu College" />
        </div>
        <div className="form-field">
          <label htmlFor="category">Category</label>
          <select id="category" name="category" value={form.category} onChange={update}>
            {QUERY_CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="form-field full">
          <label htmlFor="subject">Subject</label>
          <input id="subject" name="subject" required value={form.subject} onChange={update} placeholder="One-line summary of the issue" />
        </div>
        <div className="form-field full">
          <label htmlFor="details">Details</label>
          <textarea id="details" name="details" rows="5" required value={form.details} onChange={update} placeholder="Describe the issue, with dates and college office responses if any" />
        </div>
      </div>
      <button type="submit" className="btn btn-primary" style={{ marginTop: 22 }}>
        Submit query
      </button>
    </form>
  )
}
