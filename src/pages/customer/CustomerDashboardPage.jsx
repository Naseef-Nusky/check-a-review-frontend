import { Bell, MessageSquare, Star } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import StatCard from '../../components/common/StatCard'
import ReviewCard from '../../components/review/ReviewCard'
import { useAuth } from '../../context/AuthContext'

const myReviews = [
  { id: 1, rating: 5, title: 'Great experience', content: 'Really enjoyed the service.', author: 'You', date: '1 week ago', status: 'published' },
  { id: 2, rating: 3, title: 'Average', content: 'It was okay, nothing special.', author: 'You', date: '2 weeks ago', status: 'pending' },
]

export default function CustomerDashboardPage() {
  const { user } = useAuth()

  return (
    <div>
      <PageHeader
        kicker="Customer portal"
        title={`Welcome, ${user?.name || 'Customer'}`}
        description="Manage your reviews, profile, and notifications in one place."
      />
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="My reviews" value="12" icon={MessageSquare} />
        <StatCard label="Average rating given" value="4.2" icon={Star} />
        <StatCard label="Unread notifications" value="3" icon={Bell} />
      </div>
      <h2 className="mb-4 text-lg font-semibold text-ink">Recent reviews</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {myReviews.map((review) => (
          <ReviewCard key={review.id} review={review} showStatus />
        ))}
      </div>
    </div>
  )
}
