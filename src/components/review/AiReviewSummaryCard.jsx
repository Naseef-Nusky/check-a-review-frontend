function sentimentLabel(sentiment) {
  switch (sentiment) {
    case 'positive':
      return { text: 'Mostly positive', className: 'bg-emerald-50 text-emerald-700' }
    case 'negative':
      return { text: 'Mostly negative', className: 'bg-red-50 text-red-700' }
    case 'mixed':
      return { text: 'Mixed', className: 'bg-amber-50 text-amber-800' }
    default:
      return { text: 'Neutral', className: 'bg-slate-100 text-slate-700' }
  }
}

export default function AiReviewSummaryCard({ summary, loading, className = '' }) {
  if (loading) {
    return (
      <div className={`rounded-2xl border border-border bg-white p-4 lg:p-3.5 ${className}`}>
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">AI summary</p>
        <p className="mt-2 text-sm text-ink-muted">Summarizing customer reviews…</p>
      </div>
    )
  }

  if (!summary?.summary) return null

  const tone = sentimentLabel(summary.sentiment)
  const hasLists =
    (summary.highlights?.length || 0) > 0 ||
    (summary.cons?.length || 0) > 0

  return (
    <div className={`rounded-2xl border border-border bg-gradient-to-br from-primary-50/80 via-white to-slate-50 p-4 lg:p-3.5 ${className}`}>
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-primary-600">AI summary</p>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${tone.className}`}>
          {tone.text}
        </span>
      </div>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink">{summary.summary}</p>

      {hasLists ? (
        <div className="mt-4 space-y-3">
          {summary.highlights?.length > 0 ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-ink-muted">Highlights</p>
              <ul className="mt-1.5 flex flex-wrap gap-2">
                {summary.highlights.slice(0, 3).map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-white px-2.5 py-1 text-xs text-ink"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {summary.cons?.length > 0 ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">Cons</p>
              <ul className="mt-1.5 space-y-1 text-sm text-ink">
                {summary.cons.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          ) : null}
        </div>
      ) : null}

      <p className="mt-4 text-[11px] text-ink-muted">
        Generated from published reviews
        {summary.reviewCount != null ? ` (${summary.reviewCount})` : ''}.
      </p>
    </div>
  )
}
