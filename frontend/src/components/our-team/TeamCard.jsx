import { Instagram, Facebook, Globe, AtSign } from 'lucide-react'

// X (formerly Twitter) logo — lucide has no official X brand icon
const XIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-label="X">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

export default function TeamCard({ member }) {
  const getSocialIcon = (platform) => {
    switch (platform) {
      case 'instagram':
        return <Instagram size={18} />
      case 'twitter':
        return <XIcon size={18} />
      case 'facebook':
        return <Facebook size={18} />
      case 'threads':
        return <AtSign size={18} />
      case 'website':
        return <Globe size={18} />
      default:
        return <Globe size={18} />
    }
  }

  return (
    <article className="card team-card" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      minHeight: '420px',
      padding: '24px 20px',
      width: '100%',
      boxSizing: 'border-box',
      textAlign: 'center'
    }}>
      <div className="team-photo-rect" style={{ 
        width: '100%', 
        height: '240px', 
        overflow: 'hidden', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        borderRadius: '12px',
        background: 'linear-gradient(135deg, var(--primary-soft), var(--border))',
        marginBottom: '18px',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        {member.image ? (
          <img src={member.image} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <span style={{ fontSize: '2.5rem', fontWeight: 700, color: 'var(--primary)' }}>{member.initials}</span>
        )}
      </div>
      <div className="role">{member.role}</div>
      <h3 style={{ margin: '8px 0 4px', fontSize: '1.2rem', fontWeight: 700 }}>{member.name}</h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', margin: '0 0 18px' }}>{member.college}</p>
      
      {member.socials && member.socials.length > 0 && (
        <div style={{ display: 'flex', gap: 14, justifyContent: 'center', marginTop: 'auto' }}>
          {member.socials.map((s, i) => (
            <a
              key={`${s.platform}-${i}`}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-link"
              style={{
                color: 'var(--muted)',
                transition: 'color 0.2s, transform 0.2s',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              title={s.platform}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = 'var(--primary)';
                e.currentTarget.style.transform = 'scale(1.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--muted)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              {getSocialIcon(s.platform)}
            </a>
          ))}
        </div>
      )}
    </article>
  )
}
