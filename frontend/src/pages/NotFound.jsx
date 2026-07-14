import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="notfound container">
      <h1>404</h1>
      <p style={{ marginBottom: 22 }}>The page you are looking for doesn&apos;t exist or has moved.</p>
      <Link to="/" className="btn btn-primary">Back to Home</Link>
    </div>
  )
}
