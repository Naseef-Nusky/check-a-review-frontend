import { MessageSquare, Star, TrendingUp, Users } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import StatCard from '../../components/common/StatCard'
import StarRating from '../../components/common/StarRating'
import ReviewCard from '../../components/review/ReviewCard'

const recentReviews = [
  { id: 1, rating: 5, title: 'Amazing service', content: 'Best tech company we have worked with.', author: 'Client A', date: 'Today' },
  { id: 2, rating: 4, title: 'Good work', content: 'Delivered on time with quality results.', author: 'Client B', date: 'Yesterday' },
]

export default function BusinessDashboardPage() {
  return (
    <div>
      <PageHeader
        kicker="Business portal"
        title="Business Dashboard"
        description="Overview of your reputation, reviews, and customer engagement."
      />
      <div className="card mb-8 p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-2xl font-semibold text-slate-700">T</div>
          <div>
            <h2 className="text-xl font-semibold text-ink">Tech Solutions Inc</h2>
            <StarRating rating={4.8} showValue />
          </div>
        </div>
      </div>
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Average rating" value="4.8" icon={Star} />
        <StatCard label="Total reviews" value="234" icon={MessageSquare} />
        <StatCard label="Trust score" value="92%" icon={TrendingUp} />
        <StatCard label="Invitations sent" value="156" icon={Users} />
      </div>
      <h2 className="mb-4 text-lg font-semibold text-ink">Recent reviews</h2>
      <div className="grid gap-5 md:grid-cols-2">
        {recentReviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  )
}
