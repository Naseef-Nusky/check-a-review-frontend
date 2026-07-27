import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, CheckCheck, MessageSquareReply, ShieldCheck, Star, X } from 'lucide-react'
import { SAMPLE_NOTIFICATIONS } from '../../data/sampleNotifications'
import { useAuth } from '../../context/AuthContext'
import Button from './Button'

const typeIcon = {
  review: Star,
  reply: MessageSquareReply,
  trust: ShieldCheck,
  system: Bell,
}

function NotificationIcon({ type }) {
  const Icon = typeIcon[type] || Bell
  return (
    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 ring-1 ring-primary-100">
      <Icon className="h-4 w-4" strokeWidth={1.5} aria-hidden="true" />
    </span>
  )
}

export default function NotificationPanel({ open, onClose }) {
  const { isCustomer } = useAuth()
  const [items, setItems] = useState(SAMPLE_NOTIFICATIONS)

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const unreadCount = items.filter((n) => !n.read).length

  const markAllRead = () => {
    setItems((prev) => prev.map((n) => ({ ...n, read: true })))
  }

  const markRead = (id) => {
    setItems((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60]" role="dialog" aria-modal="true" aria-label="Notifications">
      <button
        type="button"
        className="absolute inset-0 bg-slate-950/40 backdrop-blur-[2px] transition-opacity"
        aria-label="Close notifications"
        onClick={onClose}
      />

      <aside className="notification-drawer absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-white shadow-2xl ring-1 ring-slate-900/5">
        <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
          <div>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900">Notifications</h2>
            <p className="mt-0.5 text-sm text-slate-500">
              {unreadCount > 0 ? `${unreadCount} unread` : 'You are all caught up'}
            </p>
          </div>
          <div className="flex items-center gap-1">
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllRead}
                className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs font-medium text-primary-700 hover:bg-primary-50"
              >
                <CheckCheck className="h-3.5 w-3.5" strokeWidth={1.5} />
                Mark all read
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center px-6 text-center">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                <Bell className="h-5 w-5" strokeWidth={1.5} />
              </span>
              <p className="mt-4 text-sm font-medium text-slate-800">No notifications yet</p>
              <p className="mt-1 text-sm text-slate-500">Activity on your reviews will show up here.</p>
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {items.map((notif) => (
                <li key={notif.id}>
                  <button
                    type="button"
                    onClick={() => markRead(notif.id)}
                    className={`flex w-full gap-3 px-5 py-4 text-left transition hover:bg-slate-50 ${
                      notif.read ? 'bg-white' : 'bg-primary-50/40'
                    }`}
                  >
                    <NotificationIcon type={notif.type} />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <p className={`text-sm ${notif.read ? 'font-medium text-slate-800' : 'font-semibold text-slate-900'}`}>
                          {notif.title}
                        </p>
                        {!notif.read && (
                          <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary-500" aria-label="Unread" />
                        )}
                      </div>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">{notif.message}</p>
                      <p className="mt-2 text-xs text-slate-400">{notif.time}</p>
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {isCustomer && (
          <div className="border-t border-slate-100 p-4">
            <Link to="/users/notifications" onClick={onClose} className="block">
              <Button variant="secondary" className="w-full">
                View all notifications
              </Button>
            </Link>
          </div>
        )}
      </aside>
    </div>
  )
}

export function NotificationBell({ onClick, unreadCount = 0 }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white"
      aria-label={unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}
    >
      <Bell className="h-5 w-5" strokeWidth={1.5} />
      {unreadCount > 0 && (
        <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary-500 px-1 text-[10px] font-semibold leading-none text-white">
          {unreadCount > 9 ? '9+' : unreadCount}
        </span>
      )}
    </button>
  )
}
