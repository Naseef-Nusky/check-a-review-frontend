import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Info, Lightbulb, Shield, Star } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { publicApi } from '../../services/api'
import Button from '../../components/common/Button'
import { resolveMediaUrl } from '../../utils/constants'

const SUGGESTED_TAGS = ['Service', 'Technology', 'Recommendation', 'Value', 'Support', 'Quality']

export default function WriteReviewPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { isAuthenticated, isCustomer } = useAuth()

  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [logoFailed, setLogoFailed] = useState(false)
  const [showTip, setShowTip] = useState(false)

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [experienceDate, setExperienceDate] = useState('')
  const [selectedTags, setSelectedTags] = useState([])

  useEffect(() => {
    if (!isAuthenticated) {
      const invite = searchParams.get('invite')
      const returnTo = invite
        ? `/businesses/${id}/write-review?invite=${encodeURIComponent(invite)}`
        : `/businesses/${id}/write-review`
      navigate(`/login?redirect=${encodeURIComponent(returnTo)}`, { replace: true })
      return
    }
    if (!isCustomer) {
      setError('Only user accounts can write reviews. Please sign in with a user account.')
      setLoading(false)
    }
  }, [isAuthenticated, isCustomer, id, navigate, searchParams])

  useEffect(() => {
    if (!isAuthenticated || !isCustomer) return

    let active = true
    setLoading(true)
    setError('')
    setLogoFailed(false)

    publicApi
      .getBusiness(id)
      .then(async (profile) => {
        if (!active) return
        setBusiness(profile)

        try {
          const myReviews = await publicApi.getMyReviews()
          if (!active) return
          const existing = (Array.isArray(myReviews) ? myReviews : []).find(
            (item) =>
              String(item.business_id) === String(profile.id) ||
              String(item.business_slug) === String(profile.slug) ||
              String(item.business_slug) === String(id) ||
              String(item.business_id) === String(id),
          )
          if (existing?.id) {
            navigate(`/users/reviews/${existing.id}/edit`, { replace: true })
            return
          }
        } catch {
          // Continue to write form if existing-review lookup fails
        }
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Business not found')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [id, isAuthenticated, isCustomer, navigate])

  useEffect(() => {
    const preset = Number(searchParams.get('rating') || 0)
    if (preset >= 1 && preset <= 5) setRating(preset)
  }, [searchParams])

  const displayRating = hoverRating || rating
  const websiteHost = useMemo(() => {
    if (!business?.website) return ''
    try {
      return new URL(business.website.startsWith('http') ? business.website : `https://${business.website}`).hostname
    } catch {
      return business.website
    }
  }, [business])

  const toggleTag = (tag) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((item) => item !== tag) : [...prev, tag]))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!rating) {
      setError('Please select a star rating.')
      return
    }
    if (content.trim().length < 10) {
      setError('Please write a little more about your experience (at least 10 characters).')
      return
    }
    if (!title.trim()) {
      setError('Please give your review a title.')
      return
    }

    setSubmitting(true)
    try {
      const tagLine = selectedTags.length ? `\n\nMentioned: ${selectedTags.join(', ')}` : ''
      const dateLine = experienceDate ? `\n\nDate of experience: ${experienceDate}` : ''
      const result = await publicApi.createReview({
        businessId: business.id,
        rating,
        title: title.trim(),
        content: `${content.trim()}${tagLine}${dateLine}`,
        inviteToken: searchParams.get('invite') || undefined,
      })

      const status = result?.review?.status || 'pending'
      setSuccess(
        status === 'published'
          ? 'Thanks! Your review passed our checks and is now live.'
          : 'Thanks! Your review was submitted and is being processed. Most reviews go live within a few minutes after automated checks.',
      )

      setTimeout(() => {
        navigate(`/businesses/${business.slug || business.id}`)
      }, 1400)
    } catch (err) {
      setError(err.message || 'Failed to submit review')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-ink-muted">Redirecting to login...</div>
  }

  if (loading) {
    return <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-ink-muted">Loading review form...</div>
  }

  if (!business && error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700">{error}</div>
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] bg-[#f7f7f5]">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 flex items-center gap-4 rounded-2xl border border-border bg-white p-4 shadow-sm">
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-xl bg-slate-100 text-lg font-semibold text-slate-700">
            {!logoFailed && business?.logo_url ? (
              <img
                src={resolveMediaUrl(business.logo_url)}
                alt=""
                className="h-full w-full object-contain"
                onError={() => setLogoFailed(true)}
              />
            ) : (
              business?.name?.charAt(0) || 'B'
            )}
          </div>
          <div className="min-w-0">
            <p className="truncate text-lg font-semibold text-slate-900">{business?.name}</p>
            {websiteHost ? <p className="truncate text-sm text-slate-500">{websiteHost}</p> : null}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
          ) : null}
          {success ? (
            <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{success}</div>
          ) : null}

          <div className="flex justify-center gap-2" role="radiogroup" aria-label="Star rating">
            {Array.from({ length: 5 }, (_, index) => {
              const value = index + 1
              const active = value <= displayRating
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={rating === value}
                  aria-label={`${value} star${value > 1 ? 's' : ''}`}
                  className="rounded-lg p-1 transition hover:scale-105"
                  onMouseEnter={() => setHoverRating(value)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(value)}
                >
                  <Star
                    className={`h-12 w-12 sm:h-14 sm:w-14 ${
                      active ? 'fill-amber-400 text-amber-400' : 'fill-slate-200 text-slate-200'
                    }`}
                    strokeWidth={1.5}
                  />
                </button>
              )
            })}
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between gap-3">
              <label htmlFor="content" className="text-base font-semibold text-slate-900">
                Tell us more about your experience
              </label>
              <button
                type="button"
                onClick={() => setShowTip((v) => !v)}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                <Lightbulb className="h-4 w-4" />
                Want a tip?
              </button>
            </div>
            {showTip ? (
              <div className="mb-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                Mention what happened, what went well, and what could improve. Keep it honest and specific.{' '}
                <Link to="/review-tips" className="font-semibold underline underline-offset-2 hover:text-amber-950">
                  See all 8 tips
                </Link>
              </div>
            ) : null}
            <textarea
              id="content"
              rows={7}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What did you like or dislike? What is this company doing well, or how can they improve? Remember to be honest, helpful, and constructive!"
              className="input-field min-h-40 resize-y"
            />

            <div className="mt-4">
              <p className="text-sm font-medium text-slate-700">Other people mention</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {SUGGESTED_TAGS.map((tag) => {
                  const selected = selectedTags.includes(tag)
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`rounded-full border px-3 py-1.5 text-sm transition ${
                        selected
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {tag}
                    </button>
                  )
                })}
              </div>
            </div>

            <Link to="/review-tips" className="mt-4 inline-block text-sm font-medium text-primary-600 hover:text-primary-700">
              Read our tips for writing great reviews
            </Link>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              After you submit, your review enters a processing stage. We check for spam, guideline issues, and duplicates.
              Most reviews go live within a few minutes; flagged ones may take longer for manual review.
            </p>
          </div>

          <div>
            <label htmlFor="title" className="mb-2 block text-base font-semibold text-slate-900">
              Give your review a title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What's important for people to know?"
              className="input-field"
              maxLength={120}
            />
          </div>

          <div>
            <label htmlFor="experienceDate" className="mb-2 flex items-center gap-2 text-base font-semibold text-slate-900">
              Date of experience
              <Info className="h-4 w-4 text-slate-400" />
            </label>
            <input
              id="experienceDate"
              type="date"
              value={experienceDate}
              onChange={(e) => setExperienceDate(e.target.value)}
              className="input-field max-w-xs"
            />
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 text-sm text-slate-600">
            <div className="flex gap-3">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
              <p>
                Check A Review doesn&apos;t allow companies to offer payments or benefits in exchange for leaving a review.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              to={`/businesses/${business?.slug || id}`}
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              Cancel
            </Link>
            <Button type="submit" className="rounded-full px-8" disabled={submitting || !!success}>
              {submitting ? 'Submitting...' : 'Submit review'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
