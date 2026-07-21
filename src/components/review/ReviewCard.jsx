import { useState } from 'react'
import { MapPin, Share2, ThumbsUp } from 'lucide-react'
import StarRating from '../common/StarRating'
import Badge from '../common/Badge'
import ProfileAvatar from '../common/ProfileAvatar'
import { REVIEW_STATUS } from '../../utils/constants'

const statusTone = {
  [REVIEW_STATUS.PENDING]: 'warning',
  [REVIEW_STATUS.PUBLISHED]: 'success',
  [REVIEW_STATUS.REJECTED]: 'danger',
  [REVIEW_STATUS.REPORTED]: 'warning',
}

export default function ReviewCard({
  review,
  showStatus = false,
  variant = 'compact',
  businessName,
}) {
  const [helpfulCount, setHelpfulCount] = useState(review.helpfulCount || 0)
  const [markedHelpful, setMarkedHelpful] = useState(false)

  const author = review.author || 'Anonymous'
  const isDetailed = variant === 'detailed'

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
              {review.status}
            </Badge>
          )}
        </div>
        {review.title && (
          <h3 className="mt-4 text-base font-semibold text-ink">{review.title}</h3>
        )}
        <p className="mt-2 text-sm leading-relaxed text-ink-muted line-clamp-3">{review.content}</p>
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
    <article className="card p-6 sm:p-7">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3">
          <ProfileAvatar name={author} src={review.authorAvatar} size="lg" />
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-ink">{author}</h3>
              {review.verified && <Badge tone="success">Verified</Badge>}
              {showStatus && review.status && (
                <Badge tone={statusTone[review.status] || 'default'} className="capitalize">
                  {review.status}
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
        <h4 className="mt-5 text-lg font-semibold tracking-tight text-ink">{review.title}</h4>
      )}
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{review.content}</p>

      {review.experienceDate && (
        <p className="mt-4 text-xs text-ink-muted">
          Date of experience: <span className="font-medium text-slate-700">{review.experienceDate}</span>
        </p>
      )}

      <div className="mt-5 flex flex-wrap items-center gap-2 border-t border-border pt-4">
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
      </div>

      {reply && (
        <div className="mt-5 rounded-2xl border border-border bg-slate-50 p-4 sm:p-5">
          <div className="flex items-start gap-3">
            {reply.avatar || review.businessLogo ? (
              <ProfileAvatar
                name={reply.author || businessName || 'Business'}
                src={reply.avatar || review.businessLogo}
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
