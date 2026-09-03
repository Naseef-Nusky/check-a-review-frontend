import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import StarRating from '../../components/common/StarRating'
import ReviewCard from '../../components/review/ReviewCard'
import RatingDistribution from '../../components/review/RatingDistribution'
import AiReviewSummaryCard from '../../components/review/AiReviewSummaryCard'
import Badge from '../../components/common/Badge'
import PageMeta from '../../components/common/PageMeta'
import ReviewScreeningNote from '../../components/common/ReviewScreeningNote'
import { useAuth } from '../../context/AuthContext'
import { publicApi } from '../../services/api'
import { resolveMediaUrl, formatExternalUrl } from '../../utils/constants'

export default function BusinessProfilePage() {
  const { id } = useParams()
  const { isAuthenticated, isCustomer } = useAuth()
  const [business, setBusiness] = useState(null)
  const [reviews, setReviews] = useState([])
  const [aiSummary, setAiSummary] = useState(null)
  const [aiSummaryLoading, setAiSummaryLoading] = useState(false)
  const [myReviewId, setMyReviewId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [selectedStars, setSelectedStars] = useState([])
  const [logoFailed, setLogoFailed] = useState(false)

  useEffect(() => {
    setLogoFailed(false)
  }, [business?.logo_url, id])

  const writeReviewPath = `/businesses/${id}/write-review`
  const reviewActionHref = myReviewId
    ? `/users/reviews/${myReviewId}/edit`
    : isAuthenticated && isCustomer
      ? writeReviewPath
      : `/login?redirect=${encodeURIComponent(writeReviewPath)}`
  const reviewActionLabel = myReviewId ? 'Edit your review' : 'Write a review'

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    setLogoFailed(false)
    setSelectedStars([])
    setMyReviewId(null)
    setAiSummary(null)
    setAiSummaryLoading(true)

    ;(async () => {
      try {
        const profile = await publicApi.getBusiness(id)
        if (!active) return
        setBusiness(profile)
        const [reviewData, summary] = await Promise.all([
          publicApi.getBusinessReviews(profile.id),
          publicApi.getBusinessReviewSummary(profile.id).catch(() => null),
        ])
        if (!active) return
        setReviews(reviewData.reviews || [])
        setAiSummary(summary)

        if (isAuthenticated && isCustomer) {
          try {
            const myReviews = await publicApi.getMyReviews()
            if (!active) return
            const existing = (Array.isArray(myReviews) ? myReviews : []).find(
              (item) =>
                String(item.business_id) === String(profile.id) ||
                String(item.business_slug) === String(profile.slug),
            )
            if (existing?.id) setMyReviewId(existing.id)
          } catch {
            // Ignore — user can still write/edit from My Reviews
          }
        }
      } catch (err) {
        if (!active) return
        setError(err.message || 'Business not found')
      } finally {
        if (active) {
          setLoading(false)
          setAiSummaryLoading(false)
        }
      }
    })()

    return () => {
      active = false
    }
  }, [id, isAuthenticated, isCustomer])

  const filteredReviews = useMemo(() => {
    let list = reviews
    if (selectedStars.length > 0) {
      list = list.filter((review) => selectedStars.includes(Math.round(Number(review.rating) || 0)))
    }
    if (!query.trim()) return list
    const q = query.trim().toLowerCase()
    return list.filter(
      (review) =>
        review.title?.toLowerCase().includes(q) ||
        review.content?.toLowerCase().includes(q) ||
        review.author_name?.toLowerCase().includes(q),
    )
  }, [reviews, query, selectedStars])

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
  const logoSrc = resolveMediaUrl(business.logo_url)
  const profilePath = `/businesses/${business.slug || id}`
  const profileDescription = [
    `Read ${reviewCount} verified customer review${reviewCount === 1 ? '' : 's'} for ${business.name}.`,
    rating > 0 ? `Average rating ${rating.toFixed(1)} out of 5.` : null,
    business.category ? `Listed in ${business.category}.` : null,
    trustScore > 0 ? `Trust score ${trustScore}%.` : null,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-6">
      <PageMeta
        title={`${business.name} reviews & ratings`}
        description={profileDescription}
        path={profilePath}
        image={logoSrc || undefined}
      />
      <div className="flex flex-col rounded-3xl border border-border bg-white shadow-sm">
        <div className="sticky top-16 z-30 shrink-0 lg:static lg:top-auto">
          <div className="relative isolate overflow-hidden rounded-t-3xl border-b border-white/10 shadow-md">
            <div
              className="absolute inset-y-0 left-1/2 w-screen -translate-x-1/2 bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900 lg:inset-0 lg:w-full lg:translate-x-0"
              aria-hidden="true"
            />
            <div className="relative px-6 py-6 sm:px-10 sm:py-7 lg:py-4">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white text-2xl font-semibold text-slate-800 lg:h-14 lg:w-14 lg:text-lg">
                  {!logoFailed && logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={`${business.name} logo`}
                      className="h-full w-full object-contain"
                      onError={() => setLogoFailed(true)}
                    />
                  ) : (
                    business.name?.charAt(0) || 'B'
                  )}
                </div>
                <div className="min-w-0 flex-1 text-white">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-2xl">{business.name}</h1>
                  <p className="mt-1 text-slate-300">{business.category}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 lg:mt-2">
                    <StarRating rating={rating} showValue className="[&_span]:text-white" />
                    <span className="text-sm text-slate-300">{reviewCount} reviews</span>
                    <Badge tone="brand">Trust score {trustScore}%</Badge>
                  </div>
                  <div className="mt-5 lg:mt-3">
                    <Link
                      to={reviewActionHref}
                      className="inline-flex rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600"
                    >
                      {reviewActionLabel}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)] lg:items-start lg:p-8">
          <div className="flex min-h-0 flex-col">
            <div className="shrink-0">
              <AiReviewSummaryCard summary={aiSummary} loading={aiSummaryLoading} />

              <div className="mt-4">
                <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                  <h2 className="text-lg font-semibold text-ink">Customer reviews</h2>
                  <input
                    className="input-field w-full sm:max-w-xs"
                    placeholder="Search reviews"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
                <ReviewScreeningNote variant="inline" className="mt-2" />
                <p className="mt-2 text-sm text-ink-muted">
                  Showing {filteredReviews.length} of {reviews.length} reviews
                  {selectedStars.length > 0
                    ? ` · filtered by ${selectedStars
                        .slice()
                        .sort((a, b) => b - a)
                        .map((s) => `${s}-star`)
                        .join(', ')}`
                    : ''}
                </p>
              </div>
            </div>

            <div className="mt-4">
              <div className="space-y-4">
                {filteredReviews.length === 0 ? (
                  <div className="rounded-2xl border border-border px-4 py-8 text-center text-sm text-ink-muted">
                    No reviews match your filters.
                  </div>
                ) : (
                  filteredReviews.map((review) => (
                    <ReviewCard
                      key={review.id}
                      variant="detailed"
                      review={{
                        ...review,
                        author: review.author_name,
                        authorAvatar: resolveMediaUrl(review.author_avatar),
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
                      businessLogo={business.logo_url}
                    />
                  ))
                )}
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:z-20 lg:self-start">
            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-ink">Rating</h3>
              <div className="mt-4 flex items-end gap-3">
                <span className="text-5xl font-semibold tabular-nums text-ink">{rating.toFixed(1)}</span>
                <div>
                  <StarRating rating={rating} size="md" />
                  <p className="mt-1 text-sm text-ink-muted">{reviewCount} total reviews</p>
                </div>
              </div>
              <div className="mt-5">
                <RatingDistribution
                  reviews={reviews}
                  selectedStars={selectedStars}
                  onChange={setSelectedStars}
                />
              </div>
              {selectedStars.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setSelectedStars([])}
                  className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Clear rating filters
                </button>
              ) : null}
            </div>

            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-ink">Company details</h3>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-ink-muted">Website</dt>
                  <dd className="mt-1 text-ink">
                    {business.website ? (
                      <a
                        href={formatExternalUrl(business.website)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all font-medium text-primary-700 hover:text-primary-800 hover:underline"
                      >
                        {business.website}
                      </a>
                    ) : (
                      '—'
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Email</dt>
                  <dd className="mt-1 text-ink">
                    {business.email ? (
                      <a href={`mailto:${business.email}`} className="break-all text-primary-700 hover:underline">
                        {business.email}
                      </a>
                    ) : (
                      '—'
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Phone</dt>
                  <dd className="mt-1 text-ink">
                    {business.phone ? (
                      <a href={`tel:${business.phone.replace(/\s+/g, '')}`} className="text-primary-700 hover:underline">
                        {business.phone}
                      </a>
                    ) : (
                      '—'
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-ink-muted">Address</dt>
                  <dd className="mt-1 text-ink">{business.address || '—'}</dd>
                </div>
              </dl>
            </div>

            <div className="rounded-2xl border border-border p-5">
              <h3 className="font-semibold text-ink">
                {myReviewId ? 'Update your review' : 'Share your experience'}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                {myReviewId
                  ? `You already reviewed ${business.name}. You can edit your review anytime.`
                  : `Help others by writing an honest review of ${business.name}.`}
              </p>
              <Link
                to={reviewActionHref}
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {reviewActionLabel}
              </Link>
              {!isAuthenticated || !isCustomer ? (
                <p className="mt-3 text-xs text-ink-muted">
                  You&apos;ll need to log in with a user account first.
                </p>
              ) : null}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
