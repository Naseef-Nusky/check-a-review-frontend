import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import { CategoryIcon } from '../../components/common/AppIcon'
import { getCategoryIcon } from '../../utils/categoryIcons'
import { publicApi } from '../../services/api'

function matchesTerm(text, term) {
  return String(text || '').toLowerCase().includes(term)
}

export default function CategoriesPage() {
  const [searchParams] = useSearchParams()
  const selected = searchParams.get('cat')
  const [categories, setCategories] = useState([])
  const [categoryQuery, setCategoryQuery] = useState(selected || '')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (selected) setCategoryQuery(selected)
  }, [selected])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    publicApi
      .getCategories()
      .then((data) => {
        if (!active) return
        setCategories(data || [])
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Failed to load categories')
      })
      .finally(() => {
        if (active) setLoading(false)
      })

    return () => {
      active = false
    }
  }, [])

  const filteredCategories = useMemo(() => {
    const term = categoryQuery.trim().toLowerCase()
    if (!term) return categories

    return categories
      .map((main) => {
        const mainMatches = matchesTerm(main.name, term)
        const subcategories = (main.subcategories || []).filter(
          (sub) => mainMatches || matchesTerm(sub.name, term),
        )
        if (!mainMatches && subcategories.length === 0) return null
        return {
          ...main,
          subcategories,
          count: subcategories.reduce((sum, sub) => sum + Number(sub.count || 0), 0),
        }
      })
      .filter(Boolean)
  }, [categories, categoryQuery])

  const totals = useMemo(
    () => ({
      mainCount: filteredCategories.length,
      businessCount: filteredCategories.reduce((sum, main) => sum + Number(main.count || 0), 0),
      subCount: filteredCategories.reduce((sum, main) => sum + (main.subcategories?.length || 0), 0),
    }),
    [filteredCategories],
  )

  const hasFilter = Boolean(categoryQuery.trim())

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        kicker="Explore"
        title="Explore companies by category"
        description="Browse main categories and subcategories to find trusted businesses."
      />

      <form
        className="mb-8 max-w-2xl"
        onSubmit={(e) => e.preventDefault()}
        role="search"
        aria-label="Search categories"
      >
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 stroke-[1.5] text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={categoryQuery}
            onChange={(e) => setCategoryQuery(e.target.value)}
            placeholder="Search categories..."
            className="input-field pl-11"
          />
        </div>
      </form>

      {!loading && !error && (
        <div className="mb-8 flex flex-wrap gap-4 text-sm text-ink-muted">
          <span>
            {hasFilter
              ? `${totals.subCount} matching subcategories`
              : `${totals.mainCount} main categories`}
          </span>
          <span>{totals.businessCount} businesses listed</span>
        </div>
      )}

      {loading && (
        <div className="rounded-2xl border border-border bg-white px-6 py-12 text-center text-ink-muted">
          Loading categories...
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-12 text-center text-red-700">
          {error}
        </div>
      )}

      {!loading && !error && categories.length === 0 && (
        <div className="rounded-2xl border border-border bg-white px-6 py-12 text-center text-ink-muted">
          Categories will appear here once they are configured in the admin panel.
        </div>
      )}

      {!loading && !error && categories.length > 0 && filteredCategories.length === 0 && (
        <div className="rounded-2xl border border-border bg-white px-6 py-12 text-center text-ink-muted">
          No categories match &ldquo;{categoryQuery.trim()}&rdquo;. Try another name.
        </div>
      )}

      {!loading && !error && filteredCategories.length > 0 && (
        <div className="space-y-10">
          {filteredCategories.map((main) => {
            const Icon = getCategoryIcon(main.name)
            return (
              <section key={main.id} className="rounded-2xl border border-border bg-white p-6 shadow-sm">
                <div className="mb-5 flex items-center gap-4">
                  <CategoryIcon icon={Icon} />
                  <div>
                    <h2 className="text-xl font-semibold text-ink">{main.name}</h2>
                    <p className="text-sm text-ink-muted">
                      {main.subcategories.length} subcategories · {main.count} businesses
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {main.subcategories.map((sub) => (
                    <Link
                      key={sub.id}
                      to={`/search?category=${encodeURIComponent(sub.name)}`}
                      className="rounded-xl border border-border px-4 py-3 transition hover:border-primary-200 hover:bg-primary-50/40"
                    >
                      <p className="font-medium text-ink">{sub.name}</p>
                      <p className="text-sm text-ink-muted">{sub.count} businesses</p>
                    </Link>
                  ))}
                </div>
              </section>
            )
          })}
        </div>
      )}
    </div>
  )
}
