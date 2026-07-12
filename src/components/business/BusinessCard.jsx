import { Link } from 'react-router-dom'
import StarRating from '../common/StarRating'

export default function BusinessCard({ business }) {
  return (
    <Link to={`/businesses/${business.slug || business.id}`} className="card card-hover block p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-base font-semibold text-slate-700">
          {business.name?.charAt(0) || 'B'}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-base font-semibold text-ink">{business.name}</h3>
          <p className="mt-1 text-sm text-ink-muted">{business.category}</p>
          <div className="mt-3 flex items-center gap-3">
            <StarRating rating={business.rating || 0} size="sm" />
            <span className="text-xs text-ink-muted">{business.reviewCount || 0} reviews</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
