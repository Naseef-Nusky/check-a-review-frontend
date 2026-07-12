import PageHeader from '../../components/common/PageHeader'
import StarRating from '../../components/common/StarRating'

const ratingBreakdown = [
  { stars: 5, count: 180, percent: 77 },
  { stars: 4, count: 35, percent: 15 },
  { stars: 3, count: 12, percent: 5 },
  { stars: 2, count: 4, percent: 2 },
  { stars: 1, count: 3, percent: 1 },
]

export default function BusinessAnalyticsPage() {
  return (
    <div>
      <PageHeader kicker="Insights" title="Analytics" description="Rating distribution and review performance trends." />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-ink">Rating summary</h2>
          <div className="mt-4 flex items-center gap-4">
            <span className="text-5xl font-semibold tabular-nums text-ink">4.8</span>
            <div>
              <StarRating rating={4.8} size="lg" />
              <p className="mt-1 text-sm text-ink-muted">Based on 234 reviews</p>
            </div>
          </div>
          <div className="mt-6 space-y-3">
            {ratingBreakdown.map((row) => (
              <div key={row.stars} className="grid grid-cols-[2rem_1fr_2rem] items-center gap-3 text-sm">
                <span className="font-medium tabular-nums text-slate-600">{row.stars}</span>
                <div className="h-2 rounded-full bg-slate-100">
                  <div className="h-2 rounded-full bg-gradient-to-r from-primary-500 to-primary-600" style={{ width: `${row.percent}%` }} />
                </div>
                <span className="text-right tabular-nums text-slate-500">{row.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-ink">Monthly trend</h2>
          <div className="mt-8 flex h-48 items-end justify-between gap-2">
            {[42, 58, 49, 71, 63, 80, 74].map((value, index) => (
              <div key={index} className="flex flex-1 flex-col items-center gap-2">
                <div className="w-full rounded-t-lg bg-gradient-to-t from-primary-600 to-primary-400" style={{ height: `${value}%` }} />
                <span className="text-xs text-slate-500">W{index + 1}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
