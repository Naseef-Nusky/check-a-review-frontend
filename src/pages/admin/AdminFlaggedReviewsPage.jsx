import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'

const flaggedReviews = [
  { id: 1, business: 'AutoCare Pro', author: 'Unknown', reason: 'Spam Detection', risk: 'High', content: 'Best service ever!!! Click here!!!' },
  { id: 2, business: 'Digital Works', author: 'user123', reason: 'Duplicate Review', risk: 'Medium', content: 'Same review posted 3 times.' },
  { id: 3, business: 'Green Cafe', author: 'angry_user', reason: 'Offensive Language', risk: 'High', content: 'Contains inappropriate language.' },
  { id: 4, business: 'FitLife Gym', author: 'fake_reviewer', reason: 'Fake Review Pattern', risk: 'High', content: 'Suspicious review pattern detected.' },
]

export default function AdminFlaggedReviewsPage() {
  return (
    <div>
      <PageHeader
        title="AI Flagged Reviews"
        description="Reviews flagged by AI for manual admin review"
      />
      <div className="space-y-4">
        {flaggedReviews.map((review) => (
          <div key={review.id} className="rounded-xl border border-orange-200 bg-white p-5 shadow-sm">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{review.business}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-sm text-gray-500">{review.author}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{review.content}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-800">
                  {review.reason}
                </span>
                <span className={`text-xs font-medium ${review.risk === 'High' ? 'text-red-600' : 'text-yellow-600'}`}>
                  {review.risk} Risk
                </span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm">Approve & Publish</Button>
              <Button size="sm" variant="danger">Reject</Button>
              <Button size="sm" variant="ghost">View Details</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
