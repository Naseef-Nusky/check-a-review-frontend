import { Outlet } from 'react-router-dom'
import {
  BarChart3,
  Building2,
  Code2,
  CreditCard,
  LayoutDashboard,
  Mail,
  MessageSquare,
} from 'lucide-react'
import Header from '../components/common/Header'
import SidebarNav from '../components/common/SidebarNav'

const sidebarLinks = [
  { to: '/business-portal', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/business-portal/profile', label: 'Company Profile', icon: Building2 },
  { to: '/business-portal/reviews', label: 'Reviews', icon: MessageSquare },
  { to: '/business-portal/invitations', label: 'Invitations', icon: Mail },
  { to: '/business-portal/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/business-portal/subscription', label: 'Subscription', icon: CreditCard },
  { to: '/business-portal/widget', label: 'Review Widget', icon: Code2 },
]

export default function BusinessLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-surface-muted">
      <Header />
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-8 sm:px-6 lg:px-8">
        <aside className="hidden w-64 shrink-0 md:block">
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
