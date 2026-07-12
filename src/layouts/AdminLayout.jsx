import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  Building2,
  MessageSquare,
  AlertTriangle,
  CreditCard,
  Receipt,
  Settings,
} from 'lucide-react'

const sidebarLinks = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/users', label: 'Customers', icon: Users },
  { to: '/admin/businesses', label: 'Businesses', icon: Building2 },
  { to: '/admin/reviews', label: 'Reviews', icon: MessageSquare },
  { to: '/admin/flagged', label: 'AI Flagged', icon: AlertTriangle },
  { to: '/admin/subscriptions', label: 'Subscriptions', icon: CreditCard },
  { to: '/admin/payments', label: 'Payments', icon: Receipt },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
]

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-gray-200 bg-gray-900">
        <div className="flex h-16 items-center border-b border-gray-800 px-6">
          <span className="text-lg font-bold text-white">Admin Panel</span>
        </div>
        <nav className="space-y-1 p-4">
          {sidebarLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-gray-800 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`
              }
            >
              <link.icon className="h-5 w-5" />
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="ml-64 flex-1 p-8">
        <Outlet />
      </main>
    </div>
  )
}
