import { useEffect, useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import { CategoryIcon } from '../../components/common/AppIcon'
import { getCategoryIcon } from '../../utils/categoryIcons'
import { publicApi } from '../../services/api'

export default function CategoriesPage() {
  const [searchParams] = useSearchParams()
  const selected = searchParams.get('cat')
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

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

  const totals = useMemo(
    () => ({
      mainCount: categories.length,
      businessCount: categories.reduce((sum, main) => sum + Number(main.count || 0), 0),
    }),
    [categories],
  )

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        kicker="Explore"
        title="Explore companies by category"
        description="Browse main categories and subcategories to find trusted businesses."
      />

      {selected && (
        <p className="mb-6 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-800">
          Viewing category: <strong>{selected}</strong>
        </p>
      )}

      {!loading && !error && (
        <div className="mb-8 flex flex-wrap gap-4 text-sm text-ink-muted">
          <span>{totals.mainCount} main categories</span>
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

      {!loading && !error && categories.length > 0 && (
        <div className="space-y-10">
          {categories.map((main) => {
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
