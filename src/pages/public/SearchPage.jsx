import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../../components/common/SearchBar'
import BusinessCard from '../../components/business/BusinessCard'
import PageHeader from '../../components/common/PageHeader'
import { publicApi } from '../../services/api'

function mapBusiness(business) {
  return {
    ...business,
    logo: business.logo_url || business.logo,
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
        description="Search companies and read verified customer reviews"
      />
      <SearchBar className="max-w-2xl" />
      {label && (
        <p className="mt-4 text-sm text-ink-muted">
          {loading
            ? 'Searching...'
            : category
              ? `Showing ${results.length} business${results.length === 1 ? '' : 'es'} in "${label}"`
              : `Showing ${results.length} compan${results.length === 1 ? 'y' : 'ies'} matching "${label}"`}
        </p>
      )}
      {error && (
        <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {!loading && !error && results.length === 0 && (
        <p className="mt-8 text-sm text-ink-muted">No companies found. Try another company name.</p>
      )}
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        {results.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  )
}
