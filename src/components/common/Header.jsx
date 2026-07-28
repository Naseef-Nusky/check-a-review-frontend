import { Link, NavLink } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { ChevronDown, LayoutDashboard, LogOut, MessageSquare, Settings, User } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { ADMIN_CRM_URL, BUSINESS_PORTAL_URL, resolveMediaUrl } from '../../utils/constants'
import { SAMPLE_NOTIFICATIONS } from '../../data/sampleNotifications'
import Button from './Button'
import MobileMenuButton from './MobileMenuButton'
import NotificationPanel, { NotificationBell } from './NotificationPanel'
import ProfileAvatar from './ProfileAvatar'

const navLinks = [
  { to: '/search', label: 'Find Businesses' },
  { to: '/categories', label: 'Categories' },
  { to: '/reviews', label: 'Latest Reviews' },
  { to: '/contact', label: 'Contact' },
]

function ProfileMenu({ user, isAdmin, logout }) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef(null)
  const isUserAccount = !isAdmin && user?.role !== 'business'
  const avatarSrc = resolveMediaUrl(user?.avatar_url)

  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const dashboardHref = isAdmin ? ADMIN_CRM_URL : user?.role === 'business' ? BUSINESS_PORTAL_URL : '/users'
  const DashboardLink = dashboardHref.startsWith('http') ? 'a' : Link
  const dashboardProps = dashboardHref.startsWith('http')
    ? { href: dashboardHref }
    : { to: dashboardHref }

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 py-1.5 pl-1.5 pr-3 text-left transition hover:bg-white/10"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <ProfileAvatar name={user?.name || 'User'} src={avatarSrc} size="sm" className="ring-0" />
        <span className="hidden max-w-[9rem] truncate text-sm font-medium text-white lg:inline">
          {user?.name || 'User'}
        </span>
        <ChevronDown className={`h-4 w-4 text-slate-300 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl">
          <div className="border-b border-slate-800 px-4 py-3">
            <p className="truncate text-sm font-semibold text-white">{user?.name || 'User'}</p>
            <p className="truncate text-xs text-slate-400">{user?.email}</p>
          </div>
          <div className="p-2">
            {isUserAccount ? (
              <>
                <Link
                  to="/users/reviews"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 transition hover:bg-white/5"
                >
                  <MessageSquare className="h-4 w-4" />
                  My reviews
                </Link>
                <Link
                  to="/users/settings"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 transition hover:bg-white/5"
                >
                  <Settings className="h-4 w-4" />
                  My settings
                </Link>
                <Link
                  to="/users"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 transition hover:bg-white/5"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </Link>
              </>
            ) : (
              <>
                <DashboardLink
                  {...dashboardProps}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 transition hover:bg-white/5"
                >
                  <LayoutDashboard className="h-4 w-4" />
                  Dashboard
                </DashboardLink>
                <DashboardLink
                  {...dashboardProps}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-200 transition hover:bg-white/5"
                >
                  <User className="h-4 w-4" />
                  My profile
                </DashboardLink>
              </>
            )}
            <button
              type="button"
              onClick={() => {
                setOpen(false)
                logout()
              }}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-red-400 transition hover:bg-white/5"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  const isAdmin = user?.role === 'admin'
  const isUserAccount = isAuthenticated && !isAdmin && user?.role !== 'business'
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
                <ProfileMenu user={user} isAdmin={isAdmin} logout={logout} />
                <a href={BUSINESS_PORTAL_URL}>
                  <Button size="sm" className="rounded-full bg-primary-500 hover:bg-primary-600">
                    For businesses
                  </Button>
                </a>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/15"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center rounded-full bg-primary-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-600"
                >
                  Sign up
                </Link>
                <a href={BUSINESS_PORTAL_URL}>
                  <Button size="sm" className="rounded-full bg-white/10 text-white hover:bg-white/15">
                    For businesses
                  </Button>
                </a>
              </>
            )}
          </div>

          <div className="flex items-center gap-1 md:hidden">
            {isAuthenticated && (
              <>
                <NotificationBell unreadCount={unreadCount} onClick={openNotifications} />
                {isUserAccount ? (
                  <Link
                    to="/users/settings"
                    className="mr-1"
                    aria-label="Open settings"
                  >
                    <ProfileAvatar name={user?.name || 'User'} src={resolveMediaUrl(user?.avatar_url)} size="sm" />
                  </Link>
                ) : (
                  <a
                    href={isAdmin ? ADMIN_CRM_URL : BUSINESS_PORTAL_URL}
                    className="mr-1"
                    aria-label="Open profile"
                  >
                    <ProfileAvatar name={user?.name || 'User'} src={resolveMediaUrl(user?.avatar_url)} size="sm" />
                  </a>
                )}
              </>
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
                  <div className="rounded-xl bg-white/5 px-4 py-3">
                    <p className="text-sm font-semibold text-white">{user?.name || 'User'}</p>
                    <p className="mt-0.5 truncate text-xs text-slate-400">{user?.email}</p>
                  </div>
                  <button
                    type="button"
                    onClick={openNotifications}
                    className="rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-200"
                  >
                    Notifications{unreadCount > 0 ? ` (${unreadCount})` : ''}
                  </button>
                  {isAdmin ? (
                    <a href={ADMIN_CRM_URL} onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200">
                      Admin CRM
                    </a>
                  ) : user?.role === 'business' ? (
                    <a href={BUSINESS_PORTAL_URL} onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200">
                      Dashboard
                    </a>
                  ) : (
                    <>
                      <Link to="/users/reviews" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200">
                        My reviews
                      </Link>
                      <Link to="/users/settings" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200">
                        My settings
                      </Link>
                      <Link to="/users" onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-slate-200">
                        Dashboard
                      </Link>
                    </>
                  )}
                  <a href={BUSINESS_PORTAL_URL} onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-primary-300">
                    For businesses
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      logout()
                      setMobileOpen(false)
                    }}
                    className="rounded-xl px-4 py-3 text-left text-sm font-medium text-red-400"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl bg-primary-500 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Sign up
                  </Link>
                  <a href={BUSINESS_PORTAL_URL} onClick={() => setMobileOpen(false)} className="rounded-xl px-4 py-3 text-sm font-medium text-primary-300">
                    For businesses
                  </a>
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
