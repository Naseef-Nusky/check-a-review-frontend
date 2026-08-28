import { NavLink, Outlet } from 'react-router-dom'
import { Bell, LayoutDashboard, MessageSquare, Settings, User } from 'lucide-react'
import Header from '../components/common/Header'
import SidebarNav from '../components/common/SidebarNav'

const sidebarLinks = [
  { to: '/users', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/users/reviews', label: 'My Reviews', icon: MessageSquare },
  { to: '/users/settings', label: 'My Settings', icon: Settings },
  { to: '/users/profile', label: 'My Profile', icon: User },
  { to: '/users/notifications', label: 'Notifications', icon: Bell },
]

export default function CustomerLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-muted">
      <Header />
      <div className="border-b border-border bg-white md:hidden">
        <nav className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 py-2 sm:px-6">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  isActive ? 'bg-primary-100 text-primary-800' : 'text-slate-600 hover:bg-slate-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="hidden w-60 shrink-0 md:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-white p-3 shadow-sm">
            <SidebarNav links={sidebarLinks} />
          </div>
        </aside>
        <div className="min-w-0 flex-1 overflow-x-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
