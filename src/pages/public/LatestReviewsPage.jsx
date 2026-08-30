import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import HomeReviewCard from '../../components/review/HomeReviewCard'
import { publicApi } from '../../services/api'

const PAGE_SIZE = 12

function mapReview(review) {
  return {
    id: review.id,
    rating: review.rating,
    title: review.title,
    content: review.content || review.title,
    author: review.author_name || review.author || 'Customer',
    author_name: review.author_name || review.author || 'Customer',
    authorAvatar: review.author_avatar || review.authorAvatar || '',
    date: review.created_at ? new Date(review.created_at).toLocaleDateString() : '',
    business_name: review.business_name,
    business_slug: review.business_slug,
    business_id: review.business_id,
    business_category: review.business_category,
    business_website: review.business_website,
    business_logo: review.business_logo,
    business: {
      id: review.business_id,
      name: review.business_name || 'Business',
      slug: review.business_slug,
      website: review.business_website,
      category: review.business_category,
      logo: review.business_logo,
    },
  }
}

export default function LatestReviewsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)

  const [reviews, setReviews] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const rangeStart = total === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(safePage * PAGE_SIZE, total)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    publicApi
      .getLatestReviews({ page: safePage, limit: PAGE_SIZE })
      .then((data) => {
        if (!active) return
        setReviews((data.reviews || []).map(mapReview))
        setTotal(data.total ?? 0)
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Failed to load reviews')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [safePage])

  useEffect(() => {
    if (page > totalPages && total > 0) {
      setSearchParams(totalPages <= 1 ? {} : { page: String(totalPages) }, { replace: true })
    }
  }, [page, totalPages, total, setSearchParams])

  const goToPage = (nextPage) => {
    const clamped = Math.max(1, Math.min(totalPages, nextPage))
    setSearchParams(clamped <= 1 ? {} : { page: String(clamped) })
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Latest Reviews"
        description="Recently published customer reviews. Every review is screened by automated fraud/safety checks and AI before going live."
      />

      {loading && <p className="mt-8 text-sm text-ink-muted">Loading reviews...</p>}
      {error && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {!loading && !error && reviews.length === 0 && (
        <div className="mt-8 rounded-2xl border border-border bg-white px-6 py-10 text-center text-sm text-ink-muted">
          No published reviews yet.
        </div>
      )}

      {!loading && !error && reviews.length > 0 && (
        <>
          <p className="mt-6 text-sm text-ink-muted">
            Showing {rangeStart}–{rangeEnd} of {total} reviews
          </p>

          <div className="mt-4 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {reviews.map((review) => (
              <div key={review.id} className="h-full">
                <HomeReviewCard review={review} />
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
              aria-label="Reviews pagination"
            >
              <p className="text-sm text-ink-muted">
                Page {safePage} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage <= 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-ink transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage >= totalPages}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-ink transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  )
}
