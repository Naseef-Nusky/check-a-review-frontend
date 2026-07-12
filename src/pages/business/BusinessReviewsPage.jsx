import { useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import ReviewCard from '../../components/review/ReviewCard'
import Button from '../../components/common/Button'

const reviews = [
  { id: 1, rating: 5, title: 'Excellent', content: 'Top quality service.', author: 'John D.', date: 'Today' },
  { id: 2, rating: 3, title: 'Could be better', content: 'Average experience.', author: 'Jane S.', date: '2 days ago' },
]

export default function BusinessReviewsPage() {
  const [replyingTo, setReplyingTo] = useState(null)
  const [reply, setReply] = useState('')

  const handleReply = (id) => {
    alert(`Reply sent for review ${id}! (Connect to backend API)`)
    setReplyingTo(null)
    setReply('')
  }

  return (
    <div>
      <PageHeader title="Reviews" description="View and reply to customer reviews" />
      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id}>
            <ReviewCard review={review} />
            {replyingTo === review.id ? (
              <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
                <textarea
                  rows={3}
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Write your reply..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                />
                <div className="mt-2 flex gap-2">
                  <Button size="sm" onClick={() => handleReply(review.id)}>Send Reply</Button>
                  <Button size="sm" variant="ghost" onClick={() => setReplyingTo(null)}>Cancel</Button>
                </div>
              </div>
            ) : (
              <Button size="sm" variant="outline" className="mt-2" onClick={() => setReplyingTo(review.id)}>
                Reply
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
