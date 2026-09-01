import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Lightbulb, Shield, Star } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { publicApi } from '../../services/api'
import Button from '../../components/common/Button'
import { businessProfilePath, formatExternalUrl } from '../../utils/constants'

function stripExtraLines(content = '') {
  return String(content)
    .replace(/\n\nMentioned:.*$/s, '')
    .replace(/\n\nDate of experience:.*$/s, '')
    .trim()
}

function parseExperienceDate(content = '') {
  const match = String(content).match(/Date of experience:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})/)
  return match?.[1] || ''
}

export default function EditReviewPage() {
  const { reviewId } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, isCustomer } = useAuth()

  const [review, setReview] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showTip, setShowTip] = useState(false)

  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [experienceDate, setExperienceDate] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=${encodeURIComponent(`/users/reviews/${reviewId}/edit`)}`, { replace: true })
      return
    }
    if (!isCustomer) {
      setError('Only user accounts can edit reviews.')
      setLoading(false)
    }
  }, [isAuthenticated, isCustomer, navigate, reviewId])

  useEffect(() => {
    if (!isAuthenticated || !isCustomer) return

    let active = true
    setLoading(true)
    setError('')

    publicApi
      .getMyReviews()
      .then((data) => {
        if (!active) return
        const found = (Array.isArray(data) ? data : []).find((item) => String(item.id) === String(reviewId))
        if (!found) {
          setError('Review not found.')
          return
        }
        setReview(found)
        setRating(Number(found.rating) || 0)
        setTitle(found.title || '')
        setContent(stripExtraLines(found.content || ''))
        setExperienceDate(parseExperienceDate(found.content || ''))
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Failed to load review')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [isAuthenticated, isCustomer, reviewId])

  const displayRating = hoverRating || rating
  const websiteHost = useMemo(() => {
    if (!review?.business_website) return ''
    try {
      const value = review.business_website
      return new URL(value.startsWith('http') ? value : `https://${value}`).hostname
    } catch {
      return review.business_website
    }
  }, [review])

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
      const dateLine = experienceDate ? `\n\nDate of experience: ${experienceDate}` : ''
      await publicApi.updateReview(reviewId, {
        rating,
        title: title.trim(),
        content: `${content.trim()}${dateLine}`,
      })

      setSuccess(
        'Your review was updated and is being processed again. It may take a few minutes before it goes live.',
      )

      setTimeout(() => navigate('/users/reviews'), 900)
    } catch (err) {
      setError(err.message || 'Failed to update review')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isAuthenticated) {
    return <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-ink-muted">Redirecting to login...</div>
  }

  if (loading) {
    return <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-ink-muted">Loading review...</div>
  }

  if (!review && error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700">{error}</div>
        <div className="mt-4 text-center">
          <Link to="/users/reviews" className="text-sm font-medium text-primary-700 hover:text-primary-800">
            Back to my reviews
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[70vh] bg-[#f7f7f5]">
      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8 rounded-2xl border border-border bg-white p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-600">Edit review</p>
          {review?.business_slug || review?.business_id ? (
            <Link
              to={businessProfilePath(review)}
              className="mt-2 block truncate text-lg font-semibold text-primary-700 hover:text-primary-800 hover:underline"
            >
              {review?.business_name}
            </Link>
          ) : (
            <p className="mt-2 truncate text-lg font-semibold text-slate-900">{review?.business_name}</p>
          )}
          {websiteHost && review?.business_website ? (
            <a
              href={formatExternalUrl(review.business_website)}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 block truncate text-sm text-slate-500 hover:text-primary-700 hover:underline"
            >
              {websiteHost}
            </a>
          ) : null}
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
            <div className="mb-2 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
              <label htmlFor="content" className="text-sm font-semibold text-slate-900 sm:text-base">
                Tell us more about your experience
              </label>
              <button
                type="button"
                onClick={() => setShowTip((v) => !v)}
                className="inline-flex w-fit items-center gap-1.5 text-sm font-medium text-primary-600 hover:text-primary-700"
              >
                <Lightbulb className="h-4 w-4 shrink-0" />
                Want a tip?
              </button>
            </div>
            {showTip ? (
              <div className="mb-3 rounded-xl border border-amber-200 bg-amber-50 px-3 py-3 text-sm text-amber-900 sm:px-4">
                Mention what happened, what went well, and what could improve. Keep it honest and specific.{' '}
                <Link to="/review-tips" className="font-semibold underline underline-offset-2 hover:text-amber-950">
                  See all 8 tips
                </Link>
              </div>
            ) : null}
            <textarea
              id="content"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What did you like or dislike? What is this company doing well, or how can they improve? Remember to be honest, helpful, and constructive!"
              className="input-field min-h-32 w-full resize-y text-base sm:min-h-40"
            />
            <Link to="/review-tips" className="mt-4 inline-block text-sm font-medium text-primary-600 hover:text-primary-700">
              Read our tips for writing great reviews
            </Link>
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
              className="input-field"
              maxLength={120}
            />
          </div>

          <div>
            <label htmlFor="experienceDate" className="mb-2 block text-base font-semibold text-slate-900">
              Date of experience
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
              <p>Edited reviews re-enter processing and may take a few minutes before they stay live.</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link to="/users/reviews" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Cancel
            </Link>
            <Button type="submit" className="rounded-full px-8" disabled={submitting || !!success}>
              {submitting ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
