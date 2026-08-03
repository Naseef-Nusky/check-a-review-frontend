import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../common/StarRating'
import { resolveMediaUrl } from '../../utils/constants'
import ProfileAvatar from '../common/ProfileAvatar'

function resolveReviewerName(review = {}) {
  return (
    review.author ||
    review.author_name ||
    review.reviewer_name ||
    review.user_name ||
    'Customer'
  )
}

function resolveBusiness(review = {}) {
  const nested = review.business || {}
  return {
    id: nested.id || review.business_id || '',
    name: nested.name || review.business_name || 'Business',
    slug: nested.slug || review.business_slug || '',
    website: nested.website || review.business_website || '',
    category: nested.category || review.business_category || '',
    logo: nested.logo || nested.logo_url || review.business_logo || '',
  }
}

export default function HomeReviewCard({ review }) {
  const [logoFailed, setLogoFailed] = useState(false)
  const author = resolveReviewerName(review)
  const business = resolveBusiness(review)
  const href = `/businesses/${business.slug || business.id}`
  const logoSrc = resolveMediaUrl(business.logo)
  const body = review.content || review.title || ''
  const title = review.title || ''

  useEffect(() => {
    setLogoFailed(false)
  }, [logoSrc])

  return (
    <article className="card flex h-full min-h-[280px] flex-col p-5">
      <div className="flex items-start gap-3">
        <ProfileAvatar name={author} src={resolveMediaUrl(review.authorAvatar || review.author_avatar)} size="md" />
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Reviewer</p>
          <p className="truncate font-semibold text-ink" title={author}>
            {author}
          </p>
          <div className="mt-1">
            <StarRating rating={review.rating} size="sm" />
          </div>
          {review.date ? <p className="mt-1 text-xs text-ink-muted">{review.date}</p> : null}
        </div>
      </div>

      {title ? (
        <h3 className="mt-4 line-clamp-1 text-sm font-semibold text-ink" title={title}>
          {title}
        </h3>
      ) : (
        <div className="mt-4 h-5" aria-hidden="true" />
      )}

      <p className="mt-2 line-clamp-4 min-h-[5.5rem] flex-1 text-sm leading-relaxed text-slate-600">
        {body}
      </p>

      <Link
        to={href}
        className="mt-5 flex items-center gap-3 border-t border-border pt-4 transition hover:opacity-90"
        title={`View ${business.name}`}
      >
        {!logoFailed && logoSrc ? (
          <img
            src={logoSrc}
            alt=""
            className="h-10 w-10 shrink-0 rounded-xl bg-slate-50 object-contain p-1 ring-1 ring-slate-200/80"
            loading="lazy"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-600">
            {(business.name || 'B').charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">Business</p>
          <p className="truncate text-sm font-semibold text-ink">{business.name}</p>
          <p className="truncate text-xs text-ink-muted">
            {business.category || business.website || 'View profile'}
          </p>
        </div>
      </Link>
    </article>
  )
}
