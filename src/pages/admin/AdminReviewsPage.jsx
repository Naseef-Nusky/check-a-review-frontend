import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import StarRating from '../../components/common/StarRating'
import { REVIEW_STATUS } from '../../utils/constants'

const reviews = [
  { id: 1, business: 'Tech Solutions', author: 'John D.', rating: 5, status: REVIEW_STATUS.PUBLISHED, date: 'Today' },
  { id: 2, business: 'Green Cafe', author: 'Sarah M.', rating: 2, status: REVIEW_STATUS.PENDING, date: 'Yesterday' },
  { id: 3, business: 'FitLife Gym', author: 'Mike R.', rating: 4, status: REVIEW_STATUS.REJECTED, date: '2 days ago' },
]

const statusColors = {
  [REVIEW_STATUS.PENDING]: 'bg-yellow-100 text-yellow-800',
  [REVIEW_STATUS.PUBLISHED]: 'bg-green-100 text-green-800',
  [REVIEW_STATUS.REJECTED]: 'bg-red-100 text-red-800',
  [REVIEW_STATUS.REPORTED]: 'bg-orange-100 text-orange-800',
}

export default function AdminReviewsPage() {
  return (
    <div>
      <PageHeader title="Moderate Reviews" description="Review and manage all platform reviews" />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700">Business</th>
              <th className="px-4 py-3 font-medium text-gray-700">Author</th>
              <th className="px-4 py-3 font-medium text-gray-700">Rating</th>
              <th className="px-4 py-3 font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 font-medium text-gray-700">Date</th>
              <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review) => (
              <tr key={review.id} className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">{review.business}</td>
                <td className="px-4 py-3">{review.author}</td>
                <td className="px-4 py-3">
                  <StarRating rating={review.rating} size="sm" />
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${statusColors[review.status]}`}>
                    {review.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500">{review.date}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <Button size="sm" variant="ghost">Approve</Button>
                    <Button size="sm" variant="ghost">Reject</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
