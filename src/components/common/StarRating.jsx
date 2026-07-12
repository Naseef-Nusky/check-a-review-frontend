export default function StarRating({ rating = 0, max = 5, size = 'md', showValue = true }) {
  const percent = Math.max(0, Math.min(100, (rating / max) * 100))
  const barWidth = {
    sm: 'w-14',
    md: 'w-16',
    lg: 'w-20',
  }

  return (
    <div className="flex items-center gap-2">
      <div className={`h-1.5 overflow-hidden rounded-full bg-slate-200 ${barWidth[size]}`}>
        <div
          className="h-full rounded-full bg-gradient-to-r from-primary-500 to-primary-600"
          style={{ width: `${percent}%` }}
        />
      </div>
      {showValue && (
        <span className="text-sm font-semibold tabular-nums text-slate-700">
          {Number(rating).toFixed(1)}
        </span>
      )}
    </div>
  )
}
