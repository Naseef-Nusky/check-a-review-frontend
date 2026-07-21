import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { ADMIN_CRM_URL, BUSINESS_PORTAL_URL } from '../../utils/constants'
import { SAMPLE_NOTIFICATIONS } from '../../data/sampleNotifications'
import Button from './Button'
import MobileMenuButton from './MobileMenuButton'
import NotificationPanel, { NotificationBell } from './NotificationPanel'

const navLinks = [
  { to: '/search', label: 'Find Businesses' },
  { to: '/categories', label: 'Categories' },
  { to: '/reviews', label: 'Latest Reviews' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  const isAdmin = user?.role === 'admin'
  const unreadCount = SAMPLE_NOTIFICATIONS.filter((n) => !n.read).length

  const openNotifications = () => {
    setMobileOpen(false)
    setNotificationsOpen(true)
  }

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link to="/" className="flex items-center py-2">
            <img
              src="/logo-check-a-review.png"
              alt="Check A Review"
              className="h-9 w-auto object-contain sm:h-10"
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => `nav-pill ${isActive ? 'nav-pill-active' : ''}`}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            {isAuthenticated ? (
              <>
                <NotificationBell unreadCount={unreadCount} onClick={openNotifications} />
                {isAdmin ? (
                  <a href={ADMIN_CRM_URL}>
                    <Button variant="secondary" size="sm" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                      Admin CRM
                    </Button>
                  </a>
                ) : user?.role === 'business' ? (
                  <a href={BUSINESS_PORTAL_URL}>
                    <Button variant="secondary" size="sm" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                      Dashboard
                    </Button>
                  </a>
                ) : (
                  <Link to="/customer">
                    <Button variant="secondary" size="sm" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                      Dashboard
                    </Button>
                  </Link>
                )}
                <Button variant="ghost" size="sm" className="text-slate-300 hover:bg-white/10 hover:text-white" onClick={logout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:bg-white/10 hover:text-white">
                    Log in
                  </Button>
                </Link>
                <a href={BUSINESS_PORTAL_URL}>
                  <Button size="sm" className="rounded-full bg-primary-500 hover:bg-primary-600">
                    For businesses
                  </Button>
                </a>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 md:hidden">
            {isAuthenticated && (
              <NotificationBell unreadCount={unreadCount} onClick={openNotifications} />
            )}
            <MobileMenuButton dark open={mobileOpen} onClick={() => setMobileOpen(!mobileOpen)} />
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-slate-800 bg-slate-950 px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-4 py-3 text-sm font-medium ${isActive ? 'bg-white/10 text-white' : 'text-slate-300 hover:bg-white/5 hover:text-white'}`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="my-2 h-px bg-slate-800" />
              {isAuthenticated ? (
                <>
                  <button
                    type="button"
                    onClick={openNotifications}
                    className="rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-200"
                  >
                    Notifications{unreadCount > 0 ? ` (${unreadCount})` : ''}
                  </button>
                  {isAdmin ? (
                    <a href={ADMIN_CRM_URL} onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200">Admin CRM</a>
                  ) : user?.role === 'business' ? (
                    <a href={BUSINESS_PORTAL_URL} onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200">Dashboard</a>
                  ) : (
                    <Link to="/customer" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200">Dashboard</Link>
                  )}
                  <button type="button" onClick={() => { logout(); setMobileOpen(false) }} className="rounded-xl px-4 py-3 text-left text-sm font-medium text-red-400">Logout</button>
                </>
              ) : (
                <>
                <Link to="/login" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200">Log in</Link>
                <a href={BUSINESS_PORTAL_URL} onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-primary-300">For businesses</a>
                </>
              )}
            </nav>
          </div>
        )}
      </header>

      {isAuthenticated && (
        <NotificationPanel open={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
      )}
    </>
  )
}
