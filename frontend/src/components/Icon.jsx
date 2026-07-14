import * as LucideIcons from 'lucide-react'

export default function Icon({ name, size = 20, className = '', ...props }) {
  const Comp = LucideIcons[name] || LucideIcons['Circle']
  return <Comp size={size} className={className} {...props} />
}
