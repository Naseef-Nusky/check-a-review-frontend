import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SearchBar from '../../components/common/SearchBar'
import BusinessCard from '../../components/business/BusinessCard'
import RecentReviewsSection from '../../components/review/RecentReviewsSection'
import Button from '../../components/common/Button'
import HeroBackground from '../../components/common/HeroBackground'
import HomeStatsSection from '../../components/common/HomeStatsSection'
import ReviewScreeningNote from '../../components/common/ReviewScreeningNote'
import ReviewMarquee from '../../components/review/ReviewMarquee'
import { getCategoryIcon } from '../../utils/categoryIcons'
import { CategoryIcon } from '../../components/common/AppIcon'
import { BUSINESS_PORTAL_URL } from '../../utils/constants'
import { publicApi } from '../../services/api'

const stats = [
  { label: 'Verified reviews', numeric: 50, suffix: 'K+', decimals: 0, detail: 'From real customers' },
  { label: 'Active businesses', numeric: 10, suffix: 'K+', decimals: 0, detail: 'Listed & growing' },
  { label: 'Average trust score', numeric: 4.7, suffix: '', decimals: 1, detail: 'Out of 5.0' },
]

function mapBusiness(business) {
  return {
    ...business,
    logo: business.logo_url || business.logo,
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
          publicApi.getFeaturedBusinesses(),
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
          author: review.author_name || review.author || 'Customer',
          author_name: review.author_name || review.author || 'Customer',
          authorAvatar: review.author_avatar || review.authorAvatar || '',
          date: review.created_at ? new Date(review.created_at).toLocaleDateString() : '',
          business_name: review.business_name,
          business_slug: review.business_slug,
          business_id: review.business_id,
          business_category: review.business_category,
          business_website: review.business_website,
          business_logo: review.business_logo,
          business: {
            id: review.business_id,
            name: review.business_name || 'Business',
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
            author_name: review.author,
            rating: review.rating,
            text: review.content,
            business: review.business.name,
            business_name: review.business.name,
            slug: review.business.slug,
            business_slug: review.business.slug,
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
          <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Find businesses you can trust with confidence.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Discover verified reviews, compare reputation signals, and make better decisions with a professional review platform.
          </p>
          <div className="mx-auto mt-10 max-w-2xl">
            <SearchBar placeholder="Search companies..." variant="dark" />
          </div>
        </div>
      </section>

      <ReviewMarquee reviews={marqueeReviews} loading={reviewsLoading} />

      <HomeStatsSection stats={stats} />

      <ReviewScreeningNote variant="band" />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
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
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
                <span className="min-w-0 line-clamp-2">{category}</span>
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
