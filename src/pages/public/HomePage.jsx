import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, ShieldCheck, Star } from 'lucide-react'
import SearchBar from '../../components/common/SearchBar'
import BusinessCard from '../../components/business/BusinessCard'
import RecentReviewsSection from '../../components/review/RecentReviewsSection'
import Button from '../../components/common/Button'
import HeroBackground from '../../components/common/HeroBackground'
import ReviewMarquee from '../../components/review/ReviewMarquee'
import { getCategoryIcon } from '../../utils/categoryIcons'
import { CategoryIcon } from '../../components/common/AppIcon'
import { BUSINESS_PORTAL_URL } from '../../utils/constants'
import { publicApi } from '../../services/api'

const stats = [
  { label: 'Verified reviews', value: '50K+', icon: Star, detail: 'From real customers' },
  { label: 'Active businesses', value: '10K+', icon: Building2, detail: 'Listed & growing' },
  { label: 'Average trust score', value: '4.7', icon: ShieldCheck, detail: 'Out of 5.0' },
]

function mapBusiness(business) {
  return {
    ...business,
    rating: Number(business.average_rating || 0),
    reviewCount: Number(business.review_count || 0),
  }
}

export default function HomePage() {
  const [featuredBusinesses, setFeaturedBusinesses] = useState([])
  const [categories, setCategories] = useState([])
  const [latestReviews, setLatestReviews] = useState([])
  const [marqueeReviews, setMarqueeReviews] = useState([])
  const [reviewsLoading, setReviewsLoading] = useState(true)

  useEffect(() => {
    let active = true
    ;(async () => {
      try {
        const [search, tree, reviews] = await Promise.all([
          publicApi.searchBusinesses({ limit: 4 }),
          publicApi.getCategories(),
          publicApi.getLatestReviews(16).catch(() => ({ reviews: [] })),
        ])
        if (!active) return
        setFeaturedBusinesses((search.businesses || []).map(mapBusiness))
        setCategories((tree || []).slice(0, 8).map((main) => main.name))

        const mapped = (reviews.reviews || []).map((review) => ({
          id: review.id,
          rating: review.rating,
          title: review.title,
          content: review.content || review.title,
          author: review.author_name || 'Customer',
          date: review.created_at ? new Date(review.created_at).toLocaleDateString() : '',
          business: {
            id: review.business_id,
            name: review.business_name,
            slug: review.business_slug,
            website: review.business_website,
            category: review.business_category,
            logo: review.business_logo,
          },
        }))

        setLatestReviews(mapped)
        setMarqueeReviews(
          mapped.map((review) => ({
            id: review.id,
            author: review.author,
            rating: review.rating,
            text: review.content,
            business: review.business.name,
            slug: review.business.slug,
            businessId: review.business.id,
          })),
        )
      } catch {
        if (!active) return
        setFeaturedBusinesses([])
        setCategories([])
      } finally {
        if (active) setReviewsLoading(false)
      }
    })()
    return () => {
      active = false
    }
  }, [])

  return (
    <div>
      <section className="relative overflow-hidden px-4 py-24 text-white sm:px-6 lg:px-8">
        <HeroBackground />
        <div className="relative z-10 mx-auto max-w-5xl text-center">
          <p className="section-kicker text-primary-200">Customer trust, measured</p>
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">
            Find businesses you can trust with confidence.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Discover verified reviews, compare reputation signals, and make better decisions with a professional review platform.
          </p>
          <div className="mx-auto mt-10 max-w-2xl">
            <SearchBar placeholder="Search companies, categories, or locations..." variant="dark" />
          </div>
        </div>
      </section>

      <ReviewMarquee reviews={marqueeReviews} loading={reviewsLoading} />

      <section className="relative overflow-hidden border-b border-border bg-slate-50">
        <div
          className="pointer-events-none absolute inset-0 opacity-70"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse at 20% 0%, rgb(255 64 129 / 0.08), transparent 45%), radial-gradient(ellipse at 80% 100%, rgb(15 23 42 / 0.04), transparent 40%)',
          }}
        />
        <div className="relative mx-auto grid max-w-7xl divide-y divide-slate-200/80 px-4 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:px-6 lg:px-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="group flex flex-col items-center px-4 py-12 text-center sm:py-14"
              >
                <span className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-primary-600 shadow-[0_1px_2px_rgb(15_23_42/0.06),0_8px_24px_rgb(255_64_129/0.12)] ring-1 ring-slate-200/80 transition duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_1px_2px_rgb(15_23_42/0.06),0_12px_28px_rgb(255_64_129/0.18)]">
                  <Icon className="h-5 w-5" strokeWidth={1.5} aria-hidden="true" />
                </span>
                <p className="text-4xl font-semibold tracking-tight text-slate-900 tabular-nums sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-slate-800">{stat.label}</p>
                <p className="mt-1 text-xs text-slate-500">{stat.detail}</p>
              </div>
            )
          })}
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
        {featuredBusinesses.length === 0 ? (
          <p className="mt-8 text-sm text-ink-muted">No businesses listed yet. Register a business to appear here.</p>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredBusinesses.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        )}
      </section>

      <RecentReviewsSection reviews={latestReviews} loading={reviewsLoading} />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <p className="section-kicker">Explore</p>
        <h2 className="section-title mt-2">Browse by category</h2>
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {(categories.length > 0
            ? categories
            : ['Restaurants & Bars', 'Electronics & Technology', 'Health & Medical', 'Home Services']
          ).map((category) => {
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
            <a href={`${BUSINESS_PORTAL_URL}/setup`}>
              <Button>Register Your Business</Button>
            </a>
            <a href={`${BUSINESS_PORTAL_URL}/login`}>
              <Button variant="secondary">Business Dashboard</Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
