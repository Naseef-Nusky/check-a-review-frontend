import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ReviewCard from '../../components/review/ReviewCard'
import PageHeader from '../../components/common/PageHeader'
import { publicApi } from '../../services/api'

export default function LatestReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    publicApi
      .getLatestReviews(24)
      .then((data) => {
        if (!active) return
        setReviews(data.reviews || [])
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
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Latest Reviews"
        description="Recently published reviews from verified customers"
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

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review) => (
          <div key={review.id} className="space-y-2">
            <ReviewCard
              review={{
                ...review,
                author: review.author_name,
                date: review.created_at ? new Date(review.created_at).toLocaleDateString() : '',
                reply: review.business_reply
                  ? {
                      content: review.business_reply,
                      author: review.business_name,
                      date: review.business_reply_at
                        ? new Date(review.business_reply_at).toLocaleDateString()
                        : '',
                    }
                  : null,
              }}
              businessName={review.business_name}
            />
            {review.business_slug && (
              <Link
                to={`/businesses/${review.business_slug}`}
                className="inline-block text-sm font-medium text-primary-700 hover:text-primary-800"
              >
                View {review.business_name} →
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
