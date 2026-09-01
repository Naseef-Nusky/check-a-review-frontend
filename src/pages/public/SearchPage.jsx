import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../../components/common/SearchBar'
import BusinessCard from '../../components/business/BusinessCard'
import PageHeader from '../../components/common/PageHeader'
import { publicApi } from '../../services/api'

const PAGE_SIZE = 12

function mapBusiness(business) {
  return {
    ...business,
    logo: business.logo_url || business.logo,
    rating: Number(business.average_rating || 0),
    reviewCount: Number(business.review_count || 0),
  }
}

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const category = searchParams.get('category') || ''
  const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10) || 1)

  const [results, setResults] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const rangeStart = total === 0 ? 0 : (safePage - 1) * PAGE_SIZE + 1
  const rangeEnd = Math.min(safePage * PAGE_SIZE, total)
  const label = query || category

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    publicApi
      .searchBusinesses({
        q: query || undefined,
        category: category || undefined,
        page: safePage,
        limit: PAGE_SIZE,
      })
      .then((data) => {
        if (!active) return
        setResults((data.businesses || []).map(mapBusiness))
        setTotal(data.total ?? 0)
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
  }, [query, category, safePage])

  useEffect(() => {
    if (page > totalPages && total > 0) {
      const next = new URLSearchParams(searchParams)
      if (totalPages <= 1) {
        next.delete('page')
      } else {
        next.set('page', String(totalPages))
      }
      setSearchParams(next, { replace: true })
    }
  }, [page, totalPages, total, searchParams, setSearchParams])

  const goToPage = (nextPage) => {
    const clamped = Math.max(1, Math.min(totalPages, nextPage))
    const next = new URLSearchParams()
    if (query) next.set('q', query)
    if (category) next.set('category', category)
    if (clamped > 1) next.set('page', String(clamped))
    setSearchParams(next)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        kicker="Discover"
        title="Find Businesses"
        description="Search companies and read verified customer reviews"
      />
      <SearchBar className="max-w-2xl" />

      {loading && <p className="mt-8 text-sm text-ink-muted">Loading businesses...</p>}
      {error && (
        <div className="mt-8 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {!loading && !error && results.length === 0 && (
        <p className="mt-8 text-sm text-ink-muted">
          {label ? 'No companies found. Try another company name.' : 'No businesses found.'}
        </p>
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <p className="mt-6 text-sm text-ink-muted">
            {label
              ? category
                ? `Showing ${rangeStart}–${rangeEnd} of ${total} business${total === 1 ? '' : 'es'} in "${label}"`
                : `Showing ${rangeStart}–${rangeEnd} of ${total} compan${total === 1 ? 'y' : 'ies'} matching "${label}"`
              : `Showing ${rangeStart}–${rangeEnd} of ${total} business${total === 1 ? '' : 'es'}`}
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {results.map((business) => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav
              className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-between"
              aria-label="Businesses pagination"
            >
              <p className="text-sm text-ink-muted">
                Page {safePage} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => goToPage(safePage - 1)}
                  disabled={safePage <= 1}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-ink transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => goToPage(safePage + 1)}
                  disabled={safePage >= totalPages}
                  className="inline-flex items-center gap-1 rounded-lg border border-border bg-white px-3 py-2 text-sm font-medium text-ink transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Next
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </nav>
          )}
        </>
      )}
    </div>
  )
}
