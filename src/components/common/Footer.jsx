import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { APP_NAME, BUSINESS_PORTAL_URL, CONTACT_EMAIL } from '../../utils/constants'

const footerLinks = {
  Company: [
    { to: '/about', label: 'About us' },
    { to: '/trust-centre', label: 'Trust Centre' },
    { to: '/contact', label: 'Contact us' },
  ],
  Platform: [
    { to: '/search', label: 'Find Businesses' },
    { to: '/categories', label: 'Categories' },
    { to: '/reviews', label: 'Latest Reviews' },
  ],
  'For Business': [
    { href: `${BUSINESS_PORTAL_URL}/setup`, label: 'Register Business' },
    { href: `${BUSINESS_PORTAL_URL}/login`, label: 'Business Dashboard' },
    { href: `${BUSINESS_PORTAL_URL}/contact`, label: 'Contact Sales' },
  ],
  Support: [
    { to: '/help', label: 'Help Center' },
    { to: '/help/reviewers', label: 'For reviewers' },
    { to: '/help/businesses', label: 'For businesses' },
    { to: '/review-tips', label: 'Review tips' },
  ],
  Legal: [
    { to: '/privacy', label: 'Privacy Policy' },
    { to: '/terms', label: 'Terms & Conditions' },
    { to: '/posting-guidelines', label: 'Posting Guidelines' },
    { to: '/cookies', label: 'Cookie Policy' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          <div>
            <Link to="/" className="inline-flex items-center">
              <img src="/logo-check-a-review.png" alt="Check A Review" className="h-8 w-auto object-contain" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              Trusted reviews platform helping customers make informed decisions and businesses build reputation.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-white"
            >
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              {CONTACT_EMAIL}
            </a>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-white">{title}</h3>
              <ul className="mt-4 space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    {link.href ? (
                      <a href={link.href} className="text-sm text-slate-400 transition hover:text-white">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.to} className="text-sm text-slate-400 transition hover:text-white">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-slate-800 pt-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-4">
            <Link to="/privacy" className="text-slate-400 transition hover:text-white">
              Privacy
            </Link>
            <Link to="/terms" className="text-slate-400 transition hover:text-white">
              Terms
            </Link>
            <Link to="/cookies" className="text-slate-400 transition hover:text-white">
              Cookie Preferences
            </Link>
            <a href={`mailto:${CONTACT_EMAIL}`} className="inline-flex items-center gap-2 text-slate-400 transition hover:text-white">
              <Mail className="h-4 w-4" strokeWidth={1.5} />
              {CONTACT_EMAIL}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
