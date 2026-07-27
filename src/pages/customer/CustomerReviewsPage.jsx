import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageSquare, Pencil } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import ReviewCard from '../../components/review/ReviewCard'
import { useAuth } from '../../context/AuthContext'
import { publicApi } from '../../services/api'

export default function CustomerReviewsPage() {
  const { user } = useAuth()
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    publicApi
      .getMyReviews()
      .then((data) => {
        if (!active) return
        setReviews(Array.isArray(data) ? data : [])
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Failed to load your reviews')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  return (
    <div>
      <PageHeader
        kicker="Your activity"
        title="My reviews"
        description="All reviews you have written on Check A Review. You can edit any of them anytime."
      >
        <Link
          to="/search"
          className="inline-flex rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
        >
          Write a review
        </Link>
      </PageHeader>

      {loading && <p className="text-sm text-ink-muted">Loading your reviews...</p>}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {!loading && !error && reviews.length === 0 && (
        <div className="rounded-3xl border border-border bg-white px-6 py-14 text-center shadow-sm">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
            <MessageSquare className="h-5 w-5" />
          </div>
          <p className="mt-4 text-lg font-semibold text-ink">No reviews yet</p>
          <p className="mt-2 text-sm text-ink-muted">Share your experience with a business you know.</p>
          <Link
            to="/search"
            className="mt-6 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Find a business
          </Link>
        </div>
      )}

      {!loading && reviews.length > 0 && (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="rounded-3xl border border-border bg-white p-5 shadow-sm">
              <ReviewCard
                review={{
                  ...review,
                  author: user?.name || 'You',
                  date: review.created_at ? new Date(review.created_at).toLocaleDateString() : '',
                }}
                businessName={review.business_name}
                showStatus
              />
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <Link
                  to={`/users/reviews/${review.id}/edit`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <Pencil className="h-4 w-4" />
                  Edit review
                </Link>
                {review.business_slug && (
                  <Link
                    to={`/businesses/${review.business_slug}`}
                    className="text-sm font-medium text-primary-700 hover:text-primary-800"
                  >
                    View {review.business_name} →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
