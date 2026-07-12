import { Link } from 'react-router-dom'
import { Building2, ShieldCheck, Star } from 'lucide-react'
import SearchBar from '../../components/common/SearchBar'
import BusinessCard from '../../components/business/BusinessCard'
import ReviewCard from '../../components/review/ReviewCard'
import Button from '../../components/common/Button'
import StatCard from '../../components/common/StatCard'
import { getCategoryIcon } from '../../utils/categoryIcons'
import { CategoryIcon } from '../../components/common/AppIcon'

const featuredBusinesses = [
  { id: 1, name: 'Tech Solutions Inc', category: 'Technology', rating: 4.8, reviewCount: 234 },
  { id: 2, name: 'Green Cafe', category: 'Food & Drink', rating: 4.6, reviewCount: 189 },
  { id: 3, name: 'FitLife Gym', category: 'Health & Fitness', rating: 4.9, reviewCount: 412 },
  { id: 4, name: 'AutoCare Pro', category: 'Automotive', rating: 4.5, reviewCount: 156 },
]

const latestReviews = [
  { id: 1, rating: 5, title: 'Excellent service!', content: 'Had a wonderful experience. Staff was friendly and professional.', author: 'John D.', date: '2 days ago' },
  { id: 2, rating: 4, title: 'Great product quality', content: 'Very satisfied with my purchase. Delivery was fast and packaging was great.', author: 'Sarah M.', date: '3 days ago' },
  { id: 3, rating: 5, title: 'Highly recommend', content: 'Best in the area. Will definitely come back again.', author: 'Mike R.', date: '5 days ago' },
]

const categories = [
  'Technology', 'Food & Drink', 'Health & Fitness', 'Retail',
  'Automotive', 'Travel', 'Finance', 'Education',
]

const stats = [
  { label: 'Verified reviews', value: '50K+', icon: Star },
  { label: 'Active businesses', value: '10K+', icon: Building2 },
  { label: 'Average trust score', value: '4.7', icon: ShieldCheck },
]

export default function HomePage() {
  return (
    <div>
      <section className="hero-grid px-4 py-24 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <p className="section-kicker text-primary-200">Customer trust, measured</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Find businesses you can trust with confidence.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Discover verified reviews, compare reputation signals, and make better decisions with a professional review platform.
          </p>
          <div className="mt-10 max-w-2xl">
            <SearchBar placeholder="Search companies, categories, or locations..." variant="dark" />
          </div>
        </div>
      </section>

      <section className="border-b border-border bg-white py-12">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {stats.map((stat) => (
            <StatCard key={stat.label} label={stat.label} value={stat.value} icon={stat.icon} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Featured</p>
            <h2 className="section-title mt-2">Top-rated businesses</h2>
          </div>
          <Link to="/search" className="text-sm font-medium text-primary-700 hover:text-primary-800">
            View all
          </Link>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="section-kicker">Community</p>
              <h2 className="section-title mt-2">Latest reviews</h2>
            </div>
            <Link to="/reviews" className="text-sm font-medium text-primary-700 hover:text-primary-800">
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {latestReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="section-kicker">Explore</p>
        <h2 className="section-title mt-2">Browse by category</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category)
            return (
              <Link
                key={category}
                to={`/categories?cat=${encodeURIComponent(category)}`}
                className="card card-hover flex items-center gap-3 px-4 py-4 text-sm font-medium text-slate-700"
              >
                <CategoryIcon icon={Icon} boxClassName="!h-8 !w-8 rounded-lg" />
                <span>{category}</span>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="border-t border-border bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <p className="section-kicker text-primary-200">For business owners</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
            Build reputation with verified customer feedback
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 sm:text-base">
            Claim your profile, respond to reviews, send invitations, and grow your reputation with Check A Review.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link to="/register?type=business">
              <Button>Register Your Business</Button>
            </Link>
            <Link to="/business-portal">
              <Button variant="secondary">Business Dashboard</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
