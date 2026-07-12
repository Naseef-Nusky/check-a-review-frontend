import StarRating from '../common/StarRating'
import Badge from '../common/Badge'
import { REVIEW_STATUS } from '../../utils/constants'

const statusTone = {
  [REVIEW_STATUS.PENDING]: 'warning',
  [REVIEW_STATUS.PUBLISHED]: 'success',
  [REVIEW_STATUS.REJECTED]: 'danger',
  [REVIEW_STATUS.REPORTED]: 'warning',
}

export default function ReviewCard({ review, showStatus = false }) {
  return (
    <article className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <StarRating rating={review.rating} size="sm" />
          <h3 className="mt-3 text-base font-semibold text-ink">{review.title}</h3>
        </div>
        {showStatus && review.status && (
          <Badge tone={statusTone[review.status] || 'default'} className="capitalize">
            {review.status}
          </Badge>
        )}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-muted line-clamp-3">{review.content}</p>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs text-ink-muted">
        <span>{review.author || 'Anonymous'}</span>
        <span>{review.date || 'Recently'}</span>
      </div>
      {review.businessReply && (
        <div className="mt-4 rounded-xl bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Business reply</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{review.businessReply}</p>
        </div>
      )}
    </article>
  )
}
