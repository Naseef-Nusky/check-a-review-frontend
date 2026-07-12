import { useParams } from 'react-router-dom'
import StarRating from '../../components/common/StarRating'
import ReviewCard from '../../components/review/ReviewCard'
import Button from '../../components/common/Button'
import Badge from '../../components/common/Badge'

const mockBusiness = {
  name: 'Tech Solutions Inc',
  category: 'Technology',
  rating: 4.8,
  reviewCount: 234,
  trustScore: 92,
  description: 'Leading technology solutions provider specializing in software development, cloud services, and IT consulting.',
  website: 'https://techsolutions.example.com',
  email: 'contact@techsolutions.example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Tech Street, San Francisco, CA',
}

const mockReviews = [
  { id: 1, rating: 5, title: 'Outstanding support', content: 'Their team went above and beyond to help us migrate to the cloud.', author: 'Alice K.', date: '1 week ago' },
  { id: 2, rating: 4, title: 'Good value', content: 'Competitive pricing and solid deliverables. Minor delays but overall satisfied.', author: 'Bob T.', date: '2 weeks ago', businessReply: 'Thank you for your feedback! We are working on improving our timelines.' },
  { id: 3, rating: 5, title: 'Expert team', content: 'Highly knowledgeable developers who understood our requirements perfectly.', author: 'Carol W.', date: '3 weeks ago' },
]

export default function BusinessProfilePage() {
  useParams()

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="card p-6 sm:p-8">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-3xl font-semibold text-slate-700">
            {mockBusiness.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold tracking-tight text-ink">{mockBusiness.name}</h1>
            <p className="mt-1 text-ink-muted">{mockBusiness.category}</p>
            <div className="mt-4 flex flex-wrap items-center gap-4">
              <StarRating rating={mockBusiness.rating} showValue />
              <span className="text-sm text-ink-muted">{mockBusiness.reviewCount} reviews</span>
              <Badge tone="brand">Trust score {mockBusiness.trustScore}%</Badge>
            </div>
          </div>
          <Button>Write a Review</Button>
        </div>

        <p className="mt-8 max-w-3xl text-sm leading-relaxed text-ink-muted">{mockBusiness.description}</p>

        <dl className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Website</dt>
            <dd className="mt-1 text-sm text-ink">{mockBusiness.website}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</dt>
            <dd className="mt-1 text-sm text-ink">{mockBusiness.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</dt>
            <dd className="mt-1 text-sm text-ink">{mockBusiness.phone}</dd>
          </div>
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">Address</dt>
            <dd className="mt-1 text-sm text-ink">{mockBusiness.address}</dd>
          </div>
        </dl>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-semibold tracking-tight text-ink">Customer reviews</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {mockReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      </div>
    </div>
  )
}
