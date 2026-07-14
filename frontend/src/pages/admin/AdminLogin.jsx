import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import apiClient, { TOKEN_KEY } from '../../utils/apiClient.js'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { token, username } = await apiClient.post('/auth/login', form)
      localStorage.setItem(TOKEN_KEY, token)
      localStorage.setItem('dusu_admin_user', username)
      navigate('/admin')
    } catch {
      setError('Invalid username or password.')
    }
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: 420 }}>
        <div className="section-head" style={{ textAlign: 'center', maxWidth: 'none' }}>
          <span className="eyebrow">Admin Panel</span>
          <h2>Team Login</h2>
          <p>Sign in to manage content and respond to student queries.</p>
        </div>
        <form className="form-card" onSubmit={handleSubmit}>
          {error && <div className="alert alert-error">{error}</div>}
          <div className="form-field" style={{ marginBottom: 16 }}>
            <label htmlFor="username">Username</label>
            <input id="username" name="username" required value={form.username} onChange={update} autoComplete="username" />
          </div>
          <div className="form-field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required value={form.password} onChange={update} autoComplete="current-password" />
          </div>
          <button type="submit" className="btn btn-primary" style={{ marginTop: 22, width: '100%', justifyContent: 'center' }}>
            Log in
          </button>
        </form>
      </div>
    </section>
  )
}
