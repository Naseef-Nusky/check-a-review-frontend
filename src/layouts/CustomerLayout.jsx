import { Outlet } from 'react-router-dom'
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
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="hidden w-60 shrink-0 md:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-white p-3 shadow-sm">
            <SidebarNav links={sidebarLinks} />
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
