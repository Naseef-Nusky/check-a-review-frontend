import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import StarRating from '../common/StarRating'
import { businessProfilePath, resolveMediaUrl } from '../../utils/constants'

export default function BusinessCard({ business }) {
  const logoSrc = resolveMediaUrl(business.logo || business.logo_url)
  const [logoFailed, setLogoFailed] = useState(false)
  const showLogo = Boolean(logoSrc) && !logoFailed
  const rating = Number(business.rating || business.average_rating || 0)
  const reviewCount = Number(business.reviewCount || business.review_count || 0)

  useEffect(() => {
    setLogoFailed(false)
  }, [logoSrc])

  return (
    <Link
      to={businessProfilePath(business)}
      className="group flex items-center gap-4 rounded-2xl border border-border bg-white p-4 transition hover:border-primary-200 hover:bg-primary-50/30 sm:p-5"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200/80">
        {showLogo ? (
          <img
            src={logoSrc}
            alt=""
            className="h-full w-full object-contain"
            loading="lazy"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <span className="text-lg font-semibold text-slate-500">{business.name?.charAt(0) || 'B'}</span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-ink group-hover:text-primary-700">
              {business.name}
            </h3>
            <p className="mt-0.5 truncate text-sm text-ink-muted">{business.category || 'Business'}</p>
          </div>
          <ArrowUpRight className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition group-hover:text-primary-500" />
        </div>

        <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1">
          <StarRating rating={rating} size="sm" />
          <span className="text-xs tabular-nums text-ink-muted">
            {rating.toFixed(1)} · {reviewCount} review{reviewCount === 1 ? '' : 's'}
          </span>
        </div>
      </div>
    </Link>
  )
}
