import { Link } from 'react-router-dom'
import { APP_NAME, BUSINESS_PORTAL_URL } from '../../utils/constants'

const footerLinks = {
  Platform: [
    { to: '/search', label: 'Find Businesses' },
    { to: '/categories', label: 'Categories' },
    { to: '/reviews', label: 'Latest Reviews' },
  ],
  'For Business': [
    { href: `${BUSINESS_PORTAL_URL}/setup`, label: 'Register Business' },
    { href: `${BUSINESS_PORTAL_URL}/login`, label: 'Business Dashboard' },
    { to: '/contact', label: 'Contact Sales' },
  ],
  Support: [
    { to: '/contact', label: 'Contact Us' },
    { to: '/login', label: 'Help Center' },
  ],
}

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <Link to="/" className="inline-flex items-center">
              <img src="/logo-check-a-review.png" alt="Check A Review" className="h-8 w-auto object-contain" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
              Trusted reviews platform helping customers make informed decisions and businesses build reputation.
            </p>
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

        <div className="mt-12 border-t border-slate-800 pt-8 text-sm text-slate-500">
          © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
