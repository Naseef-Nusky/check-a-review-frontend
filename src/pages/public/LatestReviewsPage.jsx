import { useEffect, useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import HomeReviewCard from '../../components/review/HomeReviewCard'
import { publicApi } from '../../services/api'

export default function LatestReviewsPage() {
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    publicApi
      .getLatestReviews(24)
      .then((data) => {
        if (!active) return
        const mapped = (data.reviews || []).map((review) => ({
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
        setReviews(mapped)
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Failed to load reviews')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Latest Reviews"
        description="Recently published customer reviews"
      />

      {loading && <p className="mt-8 text-sm text-ink-muted">Loading reviews...</p>}
      {error && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {!loading && !error && reviews.length === 0 && (
        <div className="mt-8 rounded-2xl border border-border bg-white px-6 py-10 text-center text-sm text-ink-muted">
          No published reviews yet.
        </div>
      )}

      <div className="mt-8 grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {reviews.map((review) => (
          <div key={review.id} className="h-full">
            <HomeReviewCard review={review} />
          </div>
        ))}
      </div>
    </div>
  )
}
