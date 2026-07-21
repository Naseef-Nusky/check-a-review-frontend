import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import StarRating from '../../components/common/StarRating'
import ReviewCard from '../../components/review/ReviewCard'
import Badge from '../../components/common/Badge'
import { publicApi } from '../../services/api'

export default function BusinessProfilePage() {
  const { id } = useParams()
  const [business, setBusiness] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [logoFailed, setLogoFailed] = useState(false)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    setLogoFailed(false)

    ;(async () => {
      try {
        const profile = await publicApi.getBusiness(id)
        if (!active) return
        setBusiness(profile)
        const reviewData = await publicApi.getBusinessReviews(profile.id)
        if (!active) return
        setReviews(reviewData.reviews || [])
      } catch (err) {
        if (!active) return
        setError(err.message || 'Business not found')
      } finally {
        if (active) setLoading(false)
      }
    })()

    return () => {
      active = false
    }
  }, [id])

  const filteredReviews = useMemo(() => {
    if (!query.trim()) return reviews
    const q = query.trim().toLowerCase()
    return reviews.filter(
      (review) =>
        review.title?.toLowerCase().includes(q) ||
        review.content?.toLowerCase().includes(q) ||
        review.author_name?.toLowerCase().includes(q),
    )
  }, [reviews, query])

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-sm text-ink-muted">Loading business...</div>
  }

  if (error || !business) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700">
          {error || 'Business not found'}
        </div>
      </div>
    )
  }

  const rating = Number(business.average_rating || 0)
  const reviewCount = Number(business.review_count || 0)
  const trustScore = Math.round(Number(business.trust_score || 0))

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 px-6 py-10 sm:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end">
            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white text-2xl font-semibold text-slate-800">
              {!logoFailed && business.logo_url ? (
                <img
                  src={business.logo_url}
                  alt={`${business.name} logo`}
                  className="h-full w-full object-cover"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                business.name?.charAt(0) || 'B'
              )}
            </div>
            <div className="min-w-0 flex-1 text-white">
              <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{business.name}</h1>
              <p className="mt-1 text-slate-300">{business.category}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <StarRating rating={rating} showValue />
                <span className="text-sm text-slate-300">{reviewCount} reviews</span>
                <Badge tone="brand">Trust score {trustScore}%</Badge>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.4fr_0.8fr]">
          <div>
            <p className="text-sm leading-relaxed text-ink-muted">
              {business.description || 'This business has not added a description yet.'}
            </p>

            <div className="mt-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="text-lg font-semibold text-ink">Customer reviews</h2>
                <input
                  className="input-field max-w-xs"
                  placeholder="Search reviews"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>
              <p className="mt-2 text-sm text-ink-muted">
                Showing {filteredReviews.length} of {reviews.length} reviews
              </p>

              <div className="mt-6 space-y-4">
                {filteredReviews.length === 0 ? (
                  <div className="rounded-2xl border border-border px-4 py-8 text-center text-sm text-ink-muted">
                    No reviews yet.
                  </div>
                ) : (
                  filteredReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      review={{
                        ...review,
                        author: review.author_name,
                        date: review.created_at ? new Date(review.created_at).toLocaleDateString() : '',
                        reply: review.business_reply
                          ? {
                              content: review.business_reply,
                              author: business.name,
                              date: review.business_reply_at
                                ? new Date(review.business_reply_at).toLocaleDateString()
                                : '',
                            }
                          : null,
                      }}
                      businessName={business.name}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <aside className="space-y-4">
            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-ink">Company details</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-ink-muted">Website</dt>
                  <dd className="mt-1 text-ink">{business.website || '—'}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Email</dt>
                  <dd className="mt-1 text-ink">{business.email || '—'}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Phone</dt>
                  <dd className="mt-1 text-ink">{business.phone || '—'}</dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Address</dt>
                  <dd className="mt-1 text-ink">{business.address || '—'}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-ink">Rating summary</h3>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-5xl font-semibold tabular-nums text-ink">{rating.toFixed(1)}</span>
                <div>
                  <StarRating rating={rating} size="md" />
                  <p className="mt-1 text-sm text-ink-muted">{reviewCount} total reviews</p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
