import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import HomeReviewCard from './HomeReviewCard'

const PAGE_SIZE = 8

export default function RecentReviewsSection({ reviews = [], loading = false }) {
  const [page, setPage] = useState(0)
  const totalPages = Math.max(1, Math.ceil(reviews.length / PAGE_SIZE))

  const visibleReviews = useMemo(() => {
    const start = page * PAGE_SIZE
    return reviews.slice(start, start + PAGE_SIZE)
  }, [page, reviews])

  const goPrev = () => setPage((current) => Math.max(0, current - 1))
  const goNext = () => setPage((current) => Math.min(totalPages - 1, current + 1))

  return (
    <section className="latest-reviews-section py-20">
      <div className="latest-reviews-bg" aria-hidden="true" />
      <div className="latest-reviews-overlay" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="section-kicker">Community</p>
            <h2 className="section-title mt-2">Latest reviews</h2>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Link to="/reviews" className="mr-2 hidden text-sm font-medium text-primary-700 hover:text-primary-800 sm:inline">
              View all
            </Link>
            <button
              type="button"
              onClick={goPrev}
              disabled={page === 0 || reviews.length === 0}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-5 w-5 stroke-[1.5]" strokeWidth={1.5} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={goNext}
              disabled={page >= totalPages - 1 || reviews.length === 0}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/90 text-slate-700 shadow-sm backdrop-blur transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-5 w-5 stroke-[1.5]" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>

        {loading ? (
          <p className="mt-8 text-sm text-ink-muted">Loading community reviews...</p>
        ) : reviews.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-border bg-white/90 px-6 py-10 text-center text-sm text-ink-muted backdrop-blur">
            No published reviews yet. Be the first to share feedback on a business.
          </div>
        ) : (
          <div className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {visibleReviews.map((review) => (
              <div key={review.id} className="h-full">
                <HomeReviewCard review={review} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 flex justify-center gap-2 sm:hidden">
          <Link to="/reviews" className="text-sm font-medium text-primary-700">
            View all reviews
          </Link>
        </div>
      </div>
    </section>
  )
}
