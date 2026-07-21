import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../../components/common/SearchBar'
import BusinessCard from '../../components/business/BusinessCard'
import PageHeader from '../../components/common/PageHeader'
import { publicApi } from '../../services/api'

function mapBusiness(business) {
  return {
    ...business,
    rating: Number(business.average_rating || 0),
    reviewCount: Number(business.review_count || 0),
  }
}

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    publicApi
      .searchBusinesses({ q: query || undefined, category: category || undefined, limit: 24 })
      .then((data) => {
        if (!active) return
        setResults((data.businesses || []).map(mapBusiness))
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Failed to search businesses')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [query, category])

  const label = query || category

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        kicker="Discover"
        title="Find Businesses"
        description="Search for companies and read verified customer reviews"
      />
      <SearchBar className="max-w-2xl" />
      {label && (
        <p className="mt-4 text-sm text-ink-muted">
          {loading
            ? 'Searching...'
            : `Showing ${results.length} result${results.length === 1 ? '' : 's'} for "${label}"`}
        </p>
      )}
      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {!loading && !error && results.length === 0 && (
        <p className="mt-8 text-sm text-ink-muted">No businesses found. Try another search or category.</p>
      )}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  )
}
