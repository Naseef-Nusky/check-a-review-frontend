import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'

export const REVIEW_SCREENING_COPY =
  'Every review is screened by automated fraud/safety checks and AI before going live. Safe, genuine reviews publish automatically; suspicious ones are held for admin approval.'

export default function ReviewScreeningNote({
  variant = 'card',
  showTrustLink = true,
  className = '',
}) {
  const link = showTrustLink ? (
    <Link to="/trust-centre" className="font-semibold text-primary-700 hover:text-primary-800">
      Trust Centre
    </Link>
  ) : null

  if (variant === 'band') {
    return (
      <section className={`border-y border-border bg-primary-50/70 px-4 py-8 sm:px-6 lg:px-8 ${className}`}>
        <div className="mx-auto flex max-w-4xl items-start gap-3 sm:items-center sm:gap-4">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white text-primary-700 shadow-sm">
            <Shield className="h-5 w-5" strokeWidth={1.75} />
          </div>
          <p className="text-sm leading-relaxed text-slate-700 sm:text-base">
            {REVIEW_SCREENING_COPY}
            {link ? (
              <>
                {' '}
                Learn more in our {link}.
              </>
            ) : null}
          </p>
        </div>
      </section>
    )
  }

  if (variant === 'inline') {
    return (
      <p className={`text-sm leading-relaxed text-ink-muted ${className}`}>
        {REVIEW_SCREENING_COPY}
        {link ? (
          <>
            {' '}
            {link}
          </>
        ) : null}
      </p>
    )
  }

  return (
    <div className={`rounded-2xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600 sm:px-4 sm:py-4 ${className}`}>
      <div className="flex gap-3">
        <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
        <p>
          {REVIEW_SCREENING_COPY}
          {link ? (
            <>
              {' '}
              Learn more in our {link}.
            </>
          ) : null}
        </p>
      </div>
    </div>
  )
}
