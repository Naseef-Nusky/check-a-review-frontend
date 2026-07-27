import { useMemo } from 'react'

function formatPercent(value, total) {
  if (!total) return '0%'
  const pct = (value / total) * 100
  if (pct > 0 && pct < 1) return '<1%'
  return `${Math.round(pct)}%`
}

function barWidthPercent(value, total) {
  if (!total || value <= 0) return 0
  const pct = (value / total) * 100
  // Keep a visible dot for very small shares (like the reference UI)
  return Math.max(pct, pct > 0 ? 2.5 : 0)
}

/**
 * Trustpilot-style rating distribution with optional star filters.
 * selectedStars: number[] — empty means show all
 */
export default function RatingDistribution({
  reviews = [],
  selectedStars = [],
  onChange,
  className = '',
}) {
  const distribution = useMemo(() => {
    const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
    reviews.forEach((review) => {
      const rating = Math.round(Number(review.rating) || 0)
      if (rating >= 1 && rating <= 5) counts[rating] += 1
    })
    const total = reviews.length
    return [5, 4, 3, 2, 1].map((stars) => ({
      stars,
      count: counts[stars],
      label: `${stars}-star`,
      percentLabel: formatPercent(counts[stars], total),
      width: barWidthPercent(counts[stars], total),
    }))
  }, [reviews])

  const toggleStar = (stars) => {
    if (!onChange) return
    if (selectedStars.includes(stars)) {
      onChange(selectedStars.filter((s) => s !== stars))
    } else {
      onChange([...selectedStars, stars])
    }
  }

  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-4 sm:p-5 ${className}`}>
      <ul className="space-y-3.5">
        {distribution.map((row) => {
          const checked = selectedStars.includes(row.stars)
          return (
            <li key={row.stars}>
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleStar(row.stars)}
                  className="h-4 w-4 shrink-0 rounded border-slate-300 text-slate-900 focus:ring-slate-400"
                  aria-label={`Filter ${row.label} reviews`}
                />
                <span className="w-14 shrink-0 text-sm text-slate-600">{row.label}</span>
                <div className="h-2.5 min-w-0 flex-1 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-slate-800 transition-[width] duration-300"
                    style={{ width: `${row.width}%` }}
                  />
                </div>
                <span className="w-10 shrink-0 text-right text-sm tabular-nums text-slate-600">
                  {row.percentLabel}
                </span>
              </label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
