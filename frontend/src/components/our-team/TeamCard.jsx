export default function TeamCard({ member }) {
  return (
    <article className="card team-card">
      <div className="team-avatar">{member.initials}</div>
      <div className="role">{member.role}</div>
      <h3>{member.name}</h3>
      <p>{member.college}</p>
    </article>
  )
}
