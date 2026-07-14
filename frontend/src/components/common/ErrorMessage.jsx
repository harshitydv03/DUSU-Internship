import Icon from '../Icon.jsx'

export default function ErrorMessage({ message = 'Something went wrong. Please try again.' }) {
  return (
    <div className="alert alert-error" role="alert">
      <span style={{ display: 'inline-flex', gap: 8, alignItems: 'center' }}><Icon name="AlertTriangle" /> {message}</span>
    </div>
  )
}
