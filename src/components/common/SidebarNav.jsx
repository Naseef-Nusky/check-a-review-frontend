import { NavLink } from 'react-router-dom'
import { NavIcon } from './AppIcon'

export default function SidebarNav({ links }) {
  return (
    <nav className="space-y-1">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end={link.end}
          className={({ isActive }) =>
            `sidebar-link flex items-center gap-3 ${isActive ? 'sidebar-link-active' : ''}`
          }
        >
          <NavIcon icon={link.icon} />
          {link.label}
        </NavLink>
      ))}
    </nav>
  )
}
