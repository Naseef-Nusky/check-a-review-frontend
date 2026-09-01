import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Star } from 'lucide-react'
import { businessProfilePath } from '../../utils/constants'

/** Pixels the strip travels per second, kept constant however many copies are rendered. */
const SCROLL_SPEED = 55

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
  const href = businessProfilePath({
    slug: item.slug || item.business_slug,
    id: item.businessId || item.business_id,
  })

  return (
    <Link to={href} className="review-marquee-card group block transition hover:border-primary-200 hover:shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-50 text-xs font-semibold text-primary-700">
            {author.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-slate-900" title={author}>
              {author}
            </p>
            <p className="truncate text-[11px] text-slate-500">
              reviewed{' '}
              <span className="font-medium text-primary-700 group-hover:underline">{businessName}</span>
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

  return (
    <section className="review-marquee border-b border-border bg-white py-8" aria-label="Recent customer feedback">
      <div className="mb-5 px-4 text-center sm:px-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">
          Live from the community
        </p>
      </div>
      <MarqueeTrack reviews={reviews} />
    </section>
  )
}

function MarqueeTrack({ reviews }) {
  const rowRef = useRef(null)
  const setRef = useRef(null)
  // One extra copy beyond what fills the viewport guarantees the strip never runs out mid-scroll.
  const [copies, setCopies] = useState(2)
  const [duration, setDuration] = useState(0)

  const measure = useCallback(() => {
    const row = rowRef.current
    const set = setRef.current
    if (!row || !set) return

    const setWidth = set.scrollWidth
    if (!setWidth) return

    setCopies(Math.max(2, Math.ceil(row.offsetWidth / setWidth) + 1))
    setDuration(setWidth / SCROLL_SPEED)
  }, [])

  useLayoutEffect(() => {
    measure()
  }, [measure, reviews])

  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }

    const observer = new ResizeObserver(measure)
    if (rowRef.current) observer.observe(rowRef.current)
    if (setRef.current) observer.observe(setRef.current)
    return () => observer.disconnect()
  }, [measure])

  return (
    <div className="review-marquee-row" ref={rowRef}>
      <div
        className="review-marquee-track review-marquee-left"
        style={{
          '--marquee-shift': `${-100 / copies}%`,
          '--marquee-duration': duration ? `${duration}s` : '42s',
        }}
      >
        {Array.from({ length: copies }, (_, copyIndex) => (
          <div
            key={copyIndex}
            className="review-marquee-set"
            ref={copyIndex === 0 ? setRef : null}
            aria-hidden={copyIndex > 0 ? 'true' : undefined}
          >
            {reviews.map((item, index) => (
              <MarqueeCard key={`${item.id}-${index}`} item={item} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
