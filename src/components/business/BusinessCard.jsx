import { useState } from 'react'
import { Link } from 'react-router-dom'
import StarRating from '../common/StarRating'

export default function BusinessCard({ business }) {
  const [imageFailed, setImageFailed] = useState(false)
  const imageSrc = business.image || business.logo
  const showImage = imageSrc && !imageFailed

  return (
    <Link to={`/businesses/${business.slug || business.id}`} className="card card-hover block overflow-hidden">
      <div className="relative h-36 w-full bg-slate-100">
        {showImage ? (
          <img
            src={imageSrc}
            alt={business.name}
            className="h-full w-full object-cover"
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-slate-400">
            {business.name?.charAt(0) || 'B'}
          </div>
        )}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 to-transparent" />
      </div>

      <div className="p-5">
        <div className="flex items-start gap-3">
          <CompanyAvatar business={business} />
          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-ink">{business.name}</h3>
            <p className="mt-1 text-sm text-ink-muted">{business.category}</p>
            <div className="mt-3 flex items-center gap-3">
              <StarRating rating={business.rating || 0} size="sm" />
              <span className="text-xs text-ink-muted">{business.reviewCount || 0} reviews</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function CompanyAvatar({ business }) {
  const [failed, setFailed] = useState(false)
  const logo = business.logo

  if (logo && !failed) {
    return (
      <img
        src={logo}
        alt=""
        className="h-11 w-11 shrink-0 rounded-xl object-cover ring-2 ring-white"
        loading="lazy"
        onError={() => setFailed(true)}
      />
    )
  }

  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-semibold text-slate-700">
      {business.name?.charAt(0) || 'B'}
    </div>
  )
}
