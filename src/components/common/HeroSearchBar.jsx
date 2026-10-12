import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowRight, Folder, Search, Star } from 'lucide-react'
import { publicApi } from '../../services/api'
import { businessProfilePath, resolveMediaUrl } from '../../utils/constants'
import { getCategoryIcon } from '../../utils/categoryIcons'

function websiteHost(url) {
  if (!url) return ''
  try {
    const value = String(url).trim()
    const withProtocol = /^https?:\/\//i.test(value) ? value : `https://${value}`
    return new URL(withProtocol).hostname.replace(/^www\./, '')
  } catch {
    return String(url)
      .replace(/^https?:\/\//i, '')
      .replace(/^www\./, '')
      .split('/')[0]
  }
}

function formatReviewCount(count) {
  const n = Number(count) || 0
  if (n >= 1000) {
    const k = n / 1000
    return `${k >= 10 ? Math.round(k) : k.toFixed(1).replace(/\.0$/, '')}K`
  }
  return String(n)
}

function flattenCategories(tree = []) {
  const rows = []
  for (const main of tree) {
    for (const sub of main.subcategories || []) {
      rows.push({
        id: sub.id || `${main.name}-${sub.name}`,
        name: sub.name,
        mainName: main.name,
        count: Number(sub.count || 0),
      })
    }
  }
  return rows
}

/** Live dropdown search used only on the home page hero. */
export default function HeroSearchBar({
  placeholder = 'Search company or category...',
  className = '',
  variant = 'dark',
}) {
  const listId = useId()
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const [query, setQuery] = useState(initialQuery)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [companies, setCompanies] = useState([])
  const [categoryTree, setCategoryTree] = useState([])
  const rootRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  useEffect(() => {
    let active = true
    publicApi
      .getCategories()
      .then((data) => {
        if (active) setCategoryTree(Array.isArray(data) ? data : [])
      })
      .catch(() => {
        if (active) setCategoryTree([])
      })
    return () => {
      active = false
    }
  }, [])

  useEffect(() => {
    const q = query.trim()
    if (q.length < 2) {
      setCompanies([])
      setLoading(false)
      return undefined
    }

    let active = true
    const timer = window.setTimeout(() => {
      setLoading(true)
      publicApi
        .searchBusinesses({ q, limit: 6, page: 1 })
        .then((data) => {
          if (!active) return
          setCompanies(data.businesses || [])
        })
        .catch(() => {
          if (!active) return
          setCompanies([])
        })
        .finally(() => {
          if (active) setLoading(false)
        })
    }, 220)

    return () => {
      active = false
      window.clearTimeout(timer)
    }
  }, [query])

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', onPointerDown)
    return () => document.removeEventListener('mousedown', onPointerDown)
  }, [])

  const matchedCategories = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (term.length < 2) return []
    return flattenCategories(categoryTree)
      .filter((item) => item.name.toLowerCase().includes(term) || item.mainName.toLowerCase().includes(term))
      .slice(0, 4)
  }, [categoryTree, query])

  const showDropdown = open && query.trim().length >= 2
  const hasResults = companies.length > 0 || matchedCategories.length > 0

  const goToCompanyResults = useCallback(
    (value = query) => {
      const q = String(value || '').trim()
      if (!q) return
      setOpen(false)
      navigate(`/search?q=${encodeURIComponent(q)}&type=companies`)
    },
    [navigate, query],
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    goToCompanyResults()
  }

  const inputStyles =
    variant === 'dark'
      ? 'border-white/20 bg-white/10 text-white placeholder:text-white/55 focus:border-primary-300 focus:ring-primary-500/25'
      : 'border-border bg-white text-ink placeholder:text-ink-muted/70 focus:border-primary-400 focus:ring-primary-500/10'

  return (
    <form onSubmit={handleSubmit} className={`relative z-40 ${className}`} ref={rootRef} role="search">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false)
          }}
          placeholder={placeholder}
          autoComplete="off"
          aria-autocomplete="list"
          aria-controls={listId}
          aria-expanded={showDropdown}
          className={`input-field rounded-full py-2.5 pl-5 pr-11 [&::-webkit-search-cancel-button]:appearance-none [&::-webkit-search-decoration]:appearance-none ${inputStyles}`}
        />
        <button
          type="submit"
          title="Search companies"
          aria-label="Search companies"
          className="absolute inset-y-[3px] right-[3px] inline-flex aspect-square items-center justify-center rounded-full bg-primary-600 text-white transition hover:bg-primary-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
        >
          <Search className="h-4 w-4" strokeWidth={2.25} aria-hidden="true" />
        </button>
      </div>

      {showDropdown ? (
        <div
          id={listId}
          className="absolute left-0 right-0 z-50 mt-2 max-h-[min(28rem,70vh)] overflow-y-auto rounded-2xl border border-primary-200 bg-white text-ink shadow-[0_18px_50px_rgba(230,54,111,0.16)] ring-1 ring-primary-100"
          role="listbox"
        >
          {loading && companies.length === 0 && matchedCategories.length === 0 ? (
            <p className="px-4 py-5 text-sm text-primary-600/80">Searching…</p>
          ) : null}

          {!loading && !hasResults ? (
            <div className="px-4 py-5">
              <p className="text-sm text-ink-muted">No matches for “{query.trim()}”.</p>
              <button
                type="button"
                onClick={() => goToCompanyResults()}
                className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 hover:text-primary-700 hover:underline"
              >
                Search companies for “{query.trim()}”
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : null}

          {companies.length > 0 ? (
            <section className={matchedCategories.length > 0 ? 'border-b border-primary-100' : ''}>
              <p className="px-4 pb-2 pt-3 text-xs font-semibold uppercase tracking-wide text-primary-600">
                Companies
              </p>
              <ul>
                {companies.map((business) => {
                  const rating = Number(business.average_rating || 0)
                  const reviewCount = Number(business.review_count || 0)
                  const host = websiteHost(business.website)
                  const logoSrc = resolveMediaUrl(business.logo_url || business.logo)
                  return (
                    <li key={business.id}>
                      <Link
                        to={businessProfilePath(business)}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 transition hover:bg-primary-50"
                        role="option"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary-50 text-sm font-semibold text-primary-700 ring-1 ring-primary-200">
                          {logoSrc ? (
                            <img
                              src={logoSrc}
                              alt=""
                              className="h-full w-full object-contain"
                              loading="lazy"
                            />
                          ) : (
                            business.name?.charAt(0) || 'B'
                          )}
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="truncate font-semibold text-ink">{business.name}</p>
                          <p className="mt-0.5 truncate text-xs text-ink-muted">
                            {host || business.category || 'Company'}
                            {reviewCount > 0 ? ` · ${formatReviewCount(reviewCount)} reviews` : ''}
                          </p>
                        </div>
                        <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary-50 px-2.5 py-1 text-xs font-semibold tabular-nums text-primary-700 ring-1 ring-primary-200">
                          <Star
                            className="h-3.5 w-3.5 fill-primary-500 text-primary-500"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                          {rating > 0 ? rating.toFixed(1) : '—'}
                        </span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}

          {matchedCategories.length > 0 ? (
            <section>
              <p className="px-4 pb-2 pt-3 text-xs font-semibold uppercase tracking-wide text-primary-600">
                Categories
              </p>
              <ul>
                {matchedCategories.map((category) => {
                  const Icon = getCategoryIcon(category.mainName) || Folder
                  return (
                    <li key={category.id}>
                      <Link
                        to={`/search?category=${encodeURIComponent(category.name)}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 transition hover:bg-primary-50"
                        role="option"
                      >
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700 ring-1 ring-primary-200">
                          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                        </div>
                        <div className="min-w-0 flex-1 text-left">
                          <p className="truncate font-semibold text-ink">{category.name}</p>
                          <p className="mt-0.5 truncate text-xs text-ink-muted">
                            The best companies in the category “{category.name}”
                          </p>
                        </div>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </section>
          ) : null}

          {query.trim().length >= 2 ? (
            <div className="sticky bottom-0 border-t border-primary-100 bg-primary-50/40 p-3">
              <button
                type="button"
                onClick={() => goToCompanyResults()}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                Show all company results
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          ) : null}
        </div>
      ) : null}
    </form>
  )
}
