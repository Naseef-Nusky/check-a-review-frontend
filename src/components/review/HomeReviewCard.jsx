import { useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../common/StarRating'
import { resolveMediaUrl } from '../../utils/constants'
import ProfileAvatar from '../common/ProfileAvatar'

export default function HomeReviewCard({ review }) {
  const [logoFailed, setLogoFailed] = useState(false)
  const author = review.author || 'Anonymous'
  const business = review.business || {}
  const href = `/businesses/${business.slug || business.id || 1}`
  const logoSrc = resolveMediaUrl(business.logo || business.logo_url)

  return (
    <article className="card flex h-full flex-col p-5">
      <div className="flex items-start gap-3">
        <ProfileAvatar name={author} src={review.authorAvatar} size="md" />
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{author}</p>
          <div className="mt-1">
            <StarRating rating={review.rating} size="sm" />
          </div>
        </div>
      </div>

      <p className="mt-4 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-4">
        {review.content}
      </p>

      <Link
        to={href}
        className="mt-5 flex items-center gap-3 border-t border-border pt-4 transition hover:opacity-90"
      >
        {!logoFailed && logoSrc ? (
          <img
            src={logoSrc}
            alt=""
            className="h-10 w-10 shrink-0 rounded-xl object-contain bg-white"
            loading="lazy"
            onError={() => setLogoFailed(true)}
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-600">
            {business.name?.charAt(0) || 'B'}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-ink">{business.name || 'Business'}</p>
          <p className="truncate text-xs text-ink-muted">
            {business.website || business.category || 'View profile'}
          </p>
        </div>
      </Link>
    </article>
  )
}
