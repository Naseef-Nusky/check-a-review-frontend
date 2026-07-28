import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'

function Stars({ rating }) {
  const safe = Math.max(0, Math.min(5, Number(rating) || 0))
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: safe }).map((_, i) => (
        <Star
          key={i}
          className="h-3 w-3 fill-amber-400 text-amber-400"
          strokeWidth={0}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

function MarqueeCard({ item }) {
  const author = item.author || item.author_name || 'Customer'
  const businessName = item.business || item.business_name || 'Business'
  const href = `/businesses/${item.slug || item.businessId || item.business_slug || ''}`

  return (
    <Link to={href} className="review-marquee-card block transition hover:border-primary-200 hover:shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
            {author.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900" title={author}>
              {author}
            </p>
            <p className="truncate text-[11px] text-slate-500" title={businessName}>
              reviewed {businessName}
            </p>
          </div>
        </div>
        <Stars rating={item.rating} />
      </div>
      <p className="mt-2.5 line-clamp-2 text-sm leading-relaxed text-slate-600">{item.text}</p>
    </Link>
  )
}

export default function ReviewMarquee({ reviews = [], loading = false }) {
  if (loading) {
    return (
      <section className="review-marquee border-b border-border bg-white py-8" aria-label="Recent customer feedback">
        <div className="mb-5 px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
            Live from the community
          </p>
        </div>
        <p className="px-4 text-center text-sm text-ink-muted">Loading latest reviews...</p>
      </section>
    )
  }

  if (!reviews.length) {
    return (
      <section className="review-marquee border-b border-border bg-white py-8" aria-label="Recent customer feedback">
        <div className="mb-5 px-4 text-center sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
            Live from the community
          </p>
          <p className="mt-2 text-sm text-ink-muted">
            New customer reviews will appear here as soon as they are published.
          </p>
        </div>
      </section>
    )
  }

  const loop = reviews.length === 1 ? [...reviews, ...reviews, ...reviews, ...reviews] : [...reviews, ...reviews]

  return (
    <section className="review-marquee border-b border-border bg-white py-8" aria-label="Recent customer feedback">
      <div className="mb-5 px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
          Live from the community
        </p>
      </div>
      <div className="review-marquee-row">
        <div className="review-marquee-track review-marquee-left">
          {loop.map((item, index) => (
            <MarqueeCard key={`${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}
