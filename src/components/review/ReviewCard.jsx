import { useState } from 'react'
import { Flag, MapPin, Share2, ThumbsUp, X } from 'lucide-react'
import StarRating from '../common/StarRating'
import Badge from '../common/Badge'
import ProfileAvatar from '../common/ProfileAvatar'
import { REVIEW_STATUS, resolveMediaUrl } from '../../utils/constants'
import { publicApi } from '../../services/api'

const REPORT_REASONS = [
  'Fake or misleading review',
  'Inappropriate or offensive content',
  'Spam or advertising',
  'Conflicts of interest (competitor or owner)',
  'Contains personal or private information',
  'Other',
]

function ReportModal({ reviewId, onClose }) {
  const [reason, setReason] = useState('')
  const [details, setDetails] = useState('')
  const [reporterName, setReporterName] = useState('')
  const [reporterEmail, setReporterEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!reason) { setError('Please select a reason'); return }
    setSubmitting(true)
    setError('')
    try {
      await publicApi.reportReview(reviewId, { reason, details, reporterName, reporterEmail })
      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Failed to submit report')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-end justify-center sm:items-center sm:px-4 sm:py-10" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-base font-semibold text-slate-900">Report this review</h2>
            <p className="mt-0.5 text-sm text-slate-500">Help us keep reviews authentic and trustworthy.</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600">
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="rounded-xl bg-green-50 px-4 py-5 text-center">
            <p className="font-medium text-green-800">Report submitted</p>
            <p className="mt-1 text-sm text-green-700">Thank you. Our team will review your report.</p>
            <button type="button" onClick={onClose} className="mt-4 rounded-xl bg-green-600 px-5 py-2 text-sm font-medium text-white hover:bg-green-700">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Reason <span className="text-red-500">*</span></label>
              <select
                className="input-field"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              >
                <option value="">Select a reason…</option>
                {REPORT_REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Additional details (optional)</label>
              <textarea
                className="input-field min-h-[80px] resize-y"
                placeholder="Describe the issue…"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                maxLength={500}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Your name (optional)</label>
                <input className="input-field" type="text" value={reporterName} onChange={(e) => setReporterName(e.target.value)} placeholder="Jane Smith" />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-slate-700">Your email (optional)</label>
                <input className="input-field" type="email" value={reporterEmail} onChange={(e) => setReporterEmail(e.target.value)} placeholder="jane@example.com" />
              </div>
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <div className="flex justify-end gap-2 pt-1">
              <button type="button" onClick={onClose} className="rounded-xl border border-border px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {submitting ? 'Submitting…' : 'Submit report'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

const statusTone = {
  [REVIEW_STATUS.PENDING]: 'warning',
  [REVIEW_STATUS.PUBLISHED]: 'success',
  [REVIEW_STATUS.REJECTED]: 'danger',
  [REVIEW_STATUS.REPORTED]: 'warning',
}

const statusLabel = {
  [REVIEW_STATUS.PENDING]: 'Processing',
  [REVIEW_STATUS.PUBLISHED]: 'Published',
  [REVIEW_STATUS.REJECTED]: 'Not published',
  [REVIEW_STATUS.REPORTED]: 'Reported',
}

export default function ReviewCard({
  review,
  showStatus = false,
  variant = 'compact',
  businessName,
  businessLogo,
}) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0)
  const [markedHelpful, setMarkedHelpful] = useState(false)
  const [reportOpen, setReportOpen] = useState(false)

  const author = review.author || 'Anonymous'
  const isDetailed = variant === 'detailed'
  const replyLogoSrc = resolveMediaUrl(
    review.reply?.avatar || review.businessLogo || businessLogo || '',
  )

  const handleHelpful = () => {
    if (markedHelpful) {
      setMarkedHelpful(false)
      setHelpfulCount((count) => Math.max(0, count - 1))
      return
    }
    setMarkedHelpful(true)
    setHelpfulCount((count) => count + 1)
  }

  const handleShare = async () => {
    const shareText = `${review.title || 'Review'} — ${author}`
    try {
      if (navigator.share) {
        await navigator.share({ title: review.title, text: shareText, url: window.location.href })
        return
      }
      await navigator.clipboard.writeText(`${shareText}\n${window.location.href}`)
    } catch {
      // User cancelled share or clipboard unavailable
    }
  }

  if (!isDetailed) {
    return (
      <article className="card p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <ProfileAvatar name={author} src={review.authorAvatar} size="md" />
            <div>
              <p className="font-semibold text-ink">{author}</p>
              <div className="mt-1.5">
                <StarRating rating={review.rating} size="sm" />
              </div>
            </div>
          </div>
          {showStatus && review.status && (
            <Badge tone={statusTone[review.status] || 'default'} className="capitalize">
              {statusLabel[review.status] || review.status}
            </Badge>
          )}
        </div>
        {review.title && (
          <h3 className="mt-4 text-base font-semibold text-ink">{review.title}</h3>
        )}
        <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-12">{review.content}</p>
        <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-ink-muted">
          <span>{review.date || 'Recently'}</span>
        </div>
        {(review.businessReply || review.reply) && (
          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Business reply</p>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {review.businessReply || review.reply?.content}
            </p>
          </div>
        )}
      </article>
    )
  }

  const reply = review.reply || (review.businessReply
    ? { content: review.businessReply, author: businessName || 'Business', date: review.replyDate }
    : null)

  return (
    <article className="card p-5 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <ProfileAvatar name={author} src={review.authorAvatar} size="lg" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-ink">{author}</h3>
              {review.verified && <Badge tone="success">Verified</Badge>}
              {showStatus && review.status && (
                <Badge tone={statusTone[review.status] || 'default'} className="capitalize">
                  {statusLabel[review.status] || review.status}
                </Badge>
              )}
            </div>
            <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-muted">
              {typeof review.authorReviewCount === 'number' && (
                <span>{review.authorReviewCount} {review.authorReviewCount === 1 ? 'review' : 'reviews'}</span>
              )}
              {review.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5 stroke-[1.5]" strokeWidth={1.5} aria-hidden="true" />
                  {review.location}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="sm:text-right">
          <StarRating rating={review.rating} size="sm" />
          <p className="mt-1.5 text-xs text-ink-muted">{review.date || 'Recently'}</p>
        </div>
      </div>

      {review.title && (
        <h4 className="mt-4 text-base font-semibold tracking-tight text-ink">{review.title}</h4>
      )}
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{review.content}</p>

      {review.experienceDate && (
        <p className="mt-4 text-xs text-ink-muted">
          Date of experience: <span className="font-medium text-slate-700">{review.experienceDate}</span>
        </p>
      )}

      <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-3">
        <button
          type="button"
          onClick={handleHelpful}
          className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-sm font-medium transition ${
            markedHelpful
              ? 'border-primary-200 bg-primary-50 text-primary-700'
              : 'border-border bg-white text-slate-600 hover:bg-slate-50'
          }`}
        >
          <ThumbsUp className="h-4 w-4 stroke-[1.5]" strokeWidth={1.5} aria-hidden="true" />
          Helpful
          {helpfulCount > 0 && <span className="tabular-nums text-ink-muted">({helpfulCount})</span>}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
        >
          <Share2 className="h-4 w-4 stroke-[1.5]" strokeWidth={1.5} aria-hidden="true" />
          Share
        </button>
        <button
          type="button"
          onClick={() => setReportOpen(true)}
          className="ml-auto inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3 py-2 text-sm font-medium text-slate-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
        >
          <Flag className="h-3.5 w-3.5 stroke-[1.5]" strokeWidth={1.5} aria-hidden="true" />
          Report
        </button>
      </div>

      {reportOpen && review.id && (
        <ReportModal reviewId={review.id} onClose={() => setReportOpen(false)} />
      )}

      {reply && (
        <div className="mt-5 rounded-2xl border border-border bg-slate-50 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            {replyLogoSrc ? (
              <ProfileAvatar
                name={reply.author || businessName || 'Business'}
                src={replyLogoSrc}
                size="sm"
                rounded="xl"
              />
            ) : (
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-xs font-semibold text-white">
                {(reply.author || businessName || 'B').charAt(0)}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-sm font-semibold text-ink">{reply.author || businessName || 'Business'}</p>
                <Badge tone="brand">Company reply</Badge>
              </div>
              {reply.date && <p className="mt-1 text-xs text-ink-muted">{reply.date}</p>}
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{reply.content}</p>
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
