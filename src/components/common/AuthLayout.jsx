import { Link } from 'react-router-dom'

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      <div className="hero-grid relative hidden flex-col justify-between p-10 text-white lg:flex">
        <Link to="/">
          <img src="/logo-check-a-review.png" alt="Check A Review" className="h-10 w-auto object-contain" />
        </Link>
        <div>
          <p className="section-kicker text-primary-200">Trusted reviews platform</p>
          <h2 className="mt-4 max-w-md text-4xl font-semibold tracking-tight">
            Make confident decisions with verified customer feedback.
          </h2>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300">
            Discover businesses, share experiences, and build reputation with a modern review ecosystem.
          </p>
        </div>
        <p className="text-xs text-slate-400">Secure access · Professional moderation · Real insights</p>
      </div>

      <div className="flex items-center justify-center px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="mb-8 lg:hidden">
            <Link to="/">
              <img src="/logo-check-a-review.png" alt="Check A Review" className="h-10 w-auto object-contain" />
            </Link>
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-ink">{title}</h1>
            {subtitle && <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>}
          </div>
          <div className="mt-8">{children}</div>
          {footer && <div className="mt-6 text-center text-sm text-ink-muted">{footer}</div>}
        </div>
      </div>
    </div>
  )
}
