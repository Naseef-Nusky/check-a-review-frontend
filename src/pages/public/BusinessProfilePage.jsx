import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { Check, ExternalLink, Globe, MapPin, Pencil, Phone, Sparkles } from 'lucide-react'
import StarRating from '../../components/common/StarRating'
import ReviewCard from '../../components/review/ReviewCard'
import RatingDistribution from '../../components/review/RatingDistribution'
import AiReviewSummaryCard from '../../components/review/AiReviewSummaryCard'
import Badge from '../../components/common/Badge'
import PageMeta from '../../components/common/PageMeta'
import ReviewScreeningNote from '../../components/common/ReviewScreeningNote'
import { useAuth } from '../../context/AuthContext'
import { publicApi } from '../../services/api'
import {
  resolveMediaUrl,
  formatExternalUrl,
  businessProfilePath,
  businessClaimPath,
  businessWriteReviewPath,
} from '../../utils/constants'
import { buildBusinessJsonLd } from '../../utils/seo'

const TABS = [
  { id: 'summary', label: 'Summary' },
  { id: 'about', label: 'About' },
  { id: 'reviews', label: 'Reviews' },
]

/** Site header is h-16; tab bar is ~48px */
const STICKY_OFFSET = 64 + 48

function websiteHost(url) {
  if (!url) return ''
  try {
    return new URL(formatExternalUrl(url)).hostname.replace(/^www\./, '')
  } catch {
    return String(url).replace(/^https?:\/\//i, '').replace(/^www\./, '').split('/')[0]
  }
}

function TopicCarousel({ highlights = [], cons = [] }) {
  const topics = [
    ...highlights.map((text) => ({ text, tone: 'positive' })),
    ...cons.map((text) => ({ text, tone: 'caution' })),
  ].slice(0, 6)

  if (topics.length === 0) return null

  return (
    <section className="mt-8">
      <h3 className="text-lg font-semibold text-ink">What people talk about most</h3>
      <div className="-mx-4 mt-3 flex gap-3 overflow-x-auto px-4 pb-2">
        {topics.map((topic) => (
          <article
            key={topic.text}
            className={`w-[78%] max-w-xs shrink-0 rounded-2xl border p-4 ${
              topic.tone === 'caution'
                ? 'border-amber-200 bg-gradient-to-br from-amber-50 to-white'
                : 'border-primary-200 bg-gradient-to-br from-primary-50 to-white'
            }`}
          >
            <p className="text-sm leading-relaxed text-ink">{topic.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

function mapReviewCard(review, business) {
  return {
    ...review,
    author: review.author_name,
    authorAvatar: resolveMediaUrl(review.author_avatar),
    helpfulCount: Number(review.helpful_count || review.helpfulCount || 0),
    authorReviewCount: Number(review.author_review_count ?? review.authorReviewCount ?? 0),
    date: review.created_at ? new Date(review.created_at).toLocaleDateString() : '',
    reply: review.business_reply
      ? {
          content: review.business_reply,
          author: business.name,
          date: review.business_reply_at
            ? new Date(review.business_reply_at).toLocaleDateString()
            : '',
        }
      : null,
  }
}

export default function BusinessProfilePage() {
  const { id, domain } = useParams()
  const identifier = domain || id
  const navigate = useNavigate()
  const location = useLocation()
  const { isAuthenticated, isCustomer } = useAuth()
  const [business, setBusiness] = useState(null)
  const [reviews, setReviews] = useState([])
  const [reviewsTotal, setReviewsTotal] = useState(0)
  const [aiSummary, setAiSummary] = useState(null)
  const [aiSummaryLoading, setAiSummaryLoading] = useState(false)
  const [summaryExpanded, setSummaryExpanded] = useState(false)
  const [myReviewId, setMyReviewId] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [query, setQuery] = useState('')
  const [selectedStars, setSelectedStars] = useState([])
  const [logoFailed, setLogoFailed] = useState(false)
  const [activeTab, setActiveTab] = useState('summary')
  const scrollingToRef = useRef(null)
  const sectionRefs = useRef({})

  useEffect(() => {
    setLogoFailed(false)
  }, [business?.logo_url, identifier])

  const writeReviewPath = business
    ? businessWriteReviewPath(business)
    : `/businesses/${identifier}/write-review`
  const claimPath = business ? businessClaimPath(business) : `/businesses/${identifier}/claim`
  const reviewActionHref = myReviewId
    ? `/users/reviews/${myReviewId}/edit`
    : isAuthenticated && isCustomer
      ? writeReviewPath
      : `/login?redirect=${encodeURIComponent(writeReviewPath)}`
  const reviewActionLabel = myReviewId ? 'Edit your review' : 'Write a review'

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    setLogoFailed(false)
    setSelectedStars([])
    setMyReviewId(null)
    setAiSummary(null)
    setReviewsTotal(0)
    setSummaryExpanded(false)
    setActiveTab('summary')
    setAiSummaryLoading(true)

    ;(async () => {
      try {
        const profile = await publicApi.getBusiness(identifier)
        if (!active) return
        setBusiness(profile)
        const canonical = businessProfilePath(profile)
        if (
          location.pathname.startsWith('/businesses/') &&
          canonical.startsWith('/review/') &&
          !location.pathname.includes('/claim') &&
          !location.pathname.includes('/write-review')
        ) {
          navigate(canonical, { replace: true })
        }
        const [reviewData, summary] = await Promise.all([
          publicApi.getBusinessReviews(profile.id),
          publicApi.getBusinessReviewSummary(profile.id).catch(() => null),
        ])
        if (!active) return
        const loaded = reviewData.reviews || []
        setReviews(loaded)
        setReviewsTotal(
          Number(reviewData.total ?? profile.review_count ?? loaded.length ?? 0),
        )
        setAiSummary(summary)

        if (isAuthenticated && isCustomer) {
          try {
            const myReviews = await publicApi.getMyReviews()
            if (!active) return
            const existing = (Array.isArray(myReviews) ? myReviews : []).find(
              (item) =>
                String(item.business_id) === String(profile.id) ||
                String(item.business_slug) === String(profile.slug),
            )
            if (existing?.id) setMyReviewId(existing.id)
          } catch {
            // Ignore — user can still write/edit from My Reviews
          }
        }
      } catch (err) {
        if (!active) return
        setError(err.message || 'Business not found')
      } finally {
        if (active) {
          setLoading(false)
          setAiSummaryLoading(false)
        }
      }
    })()

    return () => {
      active = false
    }
  }, [identifier, isAuthenticated, isCustomer, location.pathname, navigate])

  const filteredReviews = useMemo(() => {
    let list = reviews
    if (selectedStars.length > 0) {
      list = list.filter((review) => selectedStars.includes(Math.round(Number(review.rating) || 0)))
    }
    if (!query.trim()) return list
    const q = query.trim().toLowerCase()
    return list.filter(
      (review) =>
        review.title?.toLowerCase().includes(q) ||
        review.content?.toLowerCase().includes(q) ||
        review.author_name?.toLowerCase().includes(q),
    )
  }, [reviews, query, selectedStars])

  const businessJsonLd = useMemo(
    () => (business ? buildBusinessJsonLd(business, reviews) : null),
    [business, reviews],
  )

  const scrollToTab = useCallback((tabId) => {
    const el = sectionRefs.current[tabId]
    if (!el) return
    setActiveTab(tabId)
    scrollingToRef.current = tabId
    const top = Math.max(0, el.getBoundingClientRect().top + window.scrollY - STICKY_OFFSET + 1)
    window.scrollTo({ top, behavior: 'smooth' })

    const clearLock = () => {
      if (scrollingToRef.current === tabId) scrollingToRef.current = null
    }

    if ('onscrollend' in window) {
      window.addEventListener('scrollend', clearLock, { once: true })
      window.setTimeout(clearLock, 1200)
    } else {
      window.setTimeout(clearLock, 900)
    }
  }, [])

  useEffect(() => {
    if (loading || !business) return undefined

    let frame = 0

    const updateActiveTab = () => {
      if (scrollingToRef.current) return
      if (window.matchMedia('(min-width: 1024px)').matches) return

      const probeY = STICKY_OFFSET + 16
      const doc = document.documentElement
      const nearBottom = window.innerHeight + window.scrollY >= doc.scrollHeight - 48

      if (nearBottom) {
        const last = TABS[TABS.length - 1].id
        setActiveTab((prev) => (prev === last ? prev : last))
        return
      }

      let current = TABS[0].id
      for (const tab of TABS) {
        const el = sectionRefs.current[tab.id]
        if (!el) continue
        if (el.getBoundingClientRect().top <= probeY) {
          current = tab.id
        }
      }

      setActiveTab((prev) => (prev === current ? prev : current))
    }

    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(updateActiveTab)
    }

    updateActiveTab()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [loading, business, aiSummaryLoading, reviews.length])

  if (loading) {
    return <div className="mx-auto max-w-7xl px-4 py-16 text-sm text-ink-muted">Loading business...</div>
  }

  if (error || !business) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700">
          {error || 'Business not found'}
        </div>
      </div>
    )
  }

  const rating = Number(business.average_rating || 0)
  const reviewCount = Number(reviewsTotal || business.review_count || reviews.length || 0)
  const trustScore = Math.round(Number(business.trust_score || 0))
  const logoSrc = resolveMediaUrl(business.logo_url)
  const profilePath = businessProfilePath(business)
  const host = websiteHost(business.website)
  const profileDescription = [
    `${business.name} reviews on Check A Review.`,
    `Read ${reviewCount} verified customer review${reviewCount === 1 ? '' : 's'}.`,
    rating > 0 ? `Average rating ${rating.toFixed(1)} out of 5.` : null,
    business.category ? `Listed in ${business.category}.` : null,
    trustScore > 0 ? `Trust score ${trustScore}%.` : null,
  ]
    .filter(Boolean)
    .join(' ')

  const summaryText = aiSummary?.summary || ''
  const showSeeMore = summaryText.length > 180
  const filterNote =
    selectedStars.length > 0
      ? ` · filtered by ${selectedStars
          .slice()
          .sort((a, b) => b - a)
          .map((s) => `${s}-star`)
          .join(', ')}`
      : ''

  const statusBadges = (
    <>
      {business.claimed ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
          <Check className="h-3.5 w-3.5 text-emerald-600" strokeWidth={2.5} />
          Claimed profile
        </span>
      ) : (
        <Link
          to={claimPath}
          className="inline-flex items-center gap-1.5 rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700 hover:bg-primary-100"
        >
          Unclaimed · Claim this business
        </Link>
      )}
      {trustScore > 0 ? (
        <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700">
          Trust score {trustScore}%
        </span>
      ) : null}
    </>
  )

  return (
    <>
      <PageMeta
        title={String(business.seo_title || '').trim() || `${business.name} Reviews | Check A Review`}
        description={String(business.seo_description || '').trim() || profileDescription}
        keywords={String(business.seo_keywords || '').trim() || undefined}
        extraTags={Array.isArray(business.seo_extra_tags) ? business.seo_extra_tags : undefined}
        path={profilePath}
        image={logoSrc || undefined}
        jsonLd={businessJsonLd}
      />

      {/* ===== Mobile layout only ===== */}
      <div className="bg-white lg:hidden">
        <div className="bg-white">
          <div className="relative h-28 overflow-hidden bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900">
            {business.category ? (
              <p className="absolute inset-x-0 bottom-10 px-4 text-center text-[11px] font-semibold uppercase tracking-[0.18em] text-white/85">
                {business.category}
              </p>
            ) : null}
          </div>

          <div className="relative px-4 pb-5">
            <div className="-mt-10 flex items-center justify-between gap-3">
              <div className="flex h-[4.5rem] w-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-slate-100 text-2xl font-semibold text-slate-700 shadow-md">
                {!logoFailed && logoSrc ? (
                  <img
                    src={logoSrc}
                    alt={`${business.name} logo`}
                    className="h-full w-full object-contain"
                    onError={() => setLogoFailed(true)}
                  />
                ) : (
                  business.name?.charAt(0) || 'B'
                )}
              </div>
              {business.website ? (
                <a
                  href={formatExternalUrl(business.website)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 max-w-[58%] shrink-0 items-center justify-center gap-1.5 rounded-full border-2 border-primary-500 bg-white px-3.5 text-sm font-semibold text-primary-600 transition hover:bg-primary-50 active:bg-primary-100"
                >
                  <span className="truncate">Visit website</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0" strokeWidth={2.25} />
                </a>
              ) : null}
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-ink">{business.name}</h1>

            <div className="mt-2.5 flex flex-wrap gap-2">{statusBadges}</div>

            <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink">
              <button
                type="button"
                onClick={() => scrollToTab('reviews')}
                className="font-medium text-primary-600 underline-offset-2 hover:underline"
              >
                Reviews {reviewCount.toLocaleString()}
              </button>
              <span className="text-slate-300" aria-hidden="true">
                ·
              </span>
              <StarRating rating={rating} size="sm" showValue />
              {business.category ? (
                <>
                  <span className="text-slate-300" aria-hidden="true">
                    ·
                  </span>
                  <span className="font-medium text-primary-600">{business.category}</span>
                </>
              ) : null}
            </div>

            <Link
              to={reviewActionHref}
              className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-primary-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 active:bg-primary-800"
            >
              <Pencil className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              {reviewActionLabel}
            </Link>

            <div className="mt-5 rounded-2xl border border-border p-4">
              <div className="flex items-end gap-4">
                <span className="text-5xl font-semibold tabular-nums leading-none text-ink">
                  {rating.toFixed(1)}
                </span>
                <div className="min-w-0 flex-1">
                  <StarRating rating={rating} size="md" />
                  <p className="mt-1 text-sm text-ink-muted">
                    {reviewCount.toLocaleString()} total review{reviewCount === 1 ? '' : 's'}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <RatingDistribution
                  className="rounded-none border-0 bg-transparent p-0 sm:p-0"
                  reviews={reviews}
                  selectedStars={selectedStars}
                  onChange={(stars) => {
                    setSelectedStars(stars)
                    if (stars.length > 0) scrollToTab('reviews')
                  }}
                />
              </div>
              {selectedStars.length > 0 ? (
                <button
                  type="button"
                  onClick={() => setSelectedStars([])}
                  className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
                >
                  Clear rating filters
                </button>
              ) : null}
            </div>
          </div>

          <div className="sticky top-16 z-40 border-b border-slate-200 bg-white/95 shadow-[0_1px_0_rgba(15,23,42,0.06)] backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
            <nav className="flex" aria-label="Business profile sections">
              {TABS.map((tab) => {
                const isActive = activeTab === tab.id
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => scrollToTab(tab.id)}
                    className={`relative flex-1 px-2 py-3.5 text-sm font-semibold transition ${
                      isActive ? 'text-ink' : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab.label}
                    <span
                      className={`absolute inset-x-3 bottom-0 h-[3px] rounded-full transition ${
                        isActive ? 'bg-ink' : 'bg-transparent'
                      }`}
                    />
                  </button>
                )
              })}
            </nav>
          </div>

          <section
            id="section-summary"
            ref={(node) => {
              sectionRefs.current.summary = node
            }}
            style={{ scrollMarginTop: STICKY_OFFSET }}
            className="border-b border-slate-100 px-4 py-8"
          >
            <h2 className="text-xl font-semibold text-ink">Review summary</h2>
            <p className="mt-1.5 flex items-center gap-1.5 text-sm text-ink-muted">
              <Sparkles className="h-3.5 w-3.5 text-primary-600" strokeWidth={2} />
              Created with AI, based on recent reviews
            </p>

            {aiSummaryLoading ? (
              <p className="mt-4 text-sm text-ink-muted">Summarizing customer reviews…</p>
            ) : summaryText ? (
              <>
                <p className="mt-4 text-sm leading-relaxed text-ink">
                  {showSeeMore && !summaryExpanded
                    ? `${summaryText.slice(0, 180).trim()}… `
                    : `${summaryText} `}
                  {showSeeMore ? (
                    <button
                      type="button"
                      onClick={() => setSummaryExpanded((v) => !v)}
                      className="font-semibold text-primary-700 hover:underline"
                    >
                      {summaryExpanded ? 'See less' : 'See more'}
                    </button>
                  ) : null}
                </p>
                <TopicCarousel
                  highlights={aiSummary?.highlights || []}
                  cons={aiSummary?.cons || []}
                />
              </>
            ) : (
              <p className="mt-4 text-sm text-ink-muted">
                No AI summary yet. Summaries appear once enough published reviews are available.
              </p>
            )}
          </section>

          <section
            id="section-about"
            ref={(node) => {
              sectionRefs.current.about = node
            }}
            style={{ scrollMarginTop: STICKY_OFFSET }}
            className="border-b border-slate-100 px-4 py-8"
          >
            <h2 className="text-xl font-semibold text-ink">Contact info</h2>
            <ul className="mt-5 space-y-4 text-sm text-ink">
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" strokeWidth={1.75} />
                <span>{business.address || 'Address not listed'}</span>
              </li>
              {business.phone ? (
                <li className="flex gap-3">
                  <Phone className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" strokeWidth={1.75} />
                  <a
                    href={`tel:${business.phone.replace(/\s+/g, '')}`}
                    className="underline underline-offset-2 hover:text-primary-700"
                  >
                    {business.phone}
                  </a>
                </li>
              ) : null}
              {business.website ? (
                <li className="flex gap-3">
                  <Globe className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" strokeWidth={1.75} />
                  <a
                    href={formatExternalUrl(business.website)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-2 hover:text-primary-700"
                  >
                    {host || business.website}
                  </a>
                </li>
              ) : null}
            </ul>

            {business.claimed ? (
              <div className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                <p className="text-sm font-semibold text-emerald-900">
                  ✓ This business has claimed their Check A Review profile.
                </p>
                {(business.verified_contact || business.verified_identity || business.verified_ownership) ? (
                  <ul className="mt-3 space-y-2 text-sm text-ink">
                    {business.verified_contact ? <li>✓ Business contact details</li> : null}
                    {business.verified_identity ? <li>✓ User identity</li> : null}
                    {business.verified_ownership ? <li>✓ Business ownership</li> : null}
                  </ul>
                ) : null}
              </div>
            ) : (
              <div className="mt-8 rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-ink">Own this business?</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  Claim this profile for free to manage your reputation and respond to reviews.
                </p>
                <Link
                  to={claimPath}
                  className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary-600 px-4 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 active:bg-primary-800"
                >
                  Claim this business
                </Link>
              </div>
            )}
          </section>

          <section
            id="section-reviews"
            ref={(node) => {
              sectionRefs.current.reviews = node
            }}
            style={{ scrollMarginTop: STICKY_OFFSET }}
            className="px-4 py-8"
          >
            <div className="flex flex-col gap-3">
              <h2 className="text-xl font-semibold text-ink">Reviews</h2>
              <input
                className="input-field w-full"
                placeholder="Search reviews"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <ReviewScreeningNote variant="inline" className="mt-2" />
            <p className="mt-2 text-sm text-ink-muted">
              Showing {filteredReviews.length} of {reviewCount} review
              {reviewCount === 1 ? '' : 's'}
              {filterNote}
            </p>

            <div className="mt-5 space-y-4">
              {filteredReviews.length === 0 ? (
                <div className="rounded-2xl border border-border px-4 py-8 text-center text-sm text-ink-muted">
                  No reviews match your filters.
                </div>
              ) : (
                filteredReviews.map((review) => (
                  <ReviewCard
                    key={`m-${review.id}`}
                    variant="detailed"
                    review={mapReviewCard(review, business)}
                    businessName={business.name}
                    businessLogo={business.logo_url}
                  />
                ))
              )}
            </div>
          </section>
        </div>
      </div>

      {/* ===== Desktop layout — original design unchanged ===== */}
      <div className="mx-auto hidden max-w-7xl px-4 py-8 sm:px-6 lg:block lg:px-8 lg:py-6">
        <div className="flex flex-col rounded-3xl border border-border bg-white shadow-sm">
          <div className="relative isolate overflow-hidden rounded-t-3xl border-b border-white/10 shadow-md">
            <div
              className="absolute inset-0 bg-slate-900 bg-gradient-to-br from-slate-900 via-slate-800 to-primary-900"
              aria-hidden="true"
            />
            <div className="relative px-6 py-6 sm:px-10 lg:py-4">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:gap-6">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white text-2xl font-semibold text-slate-800 lg:h-14 lg:w-14 lg:text-lg">
                  {!logoFailed && logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={`${business.name} logo`}
                      className="h-full w-full object-contain"
                      onError={() => setLogoFailed(true)}
                    />
                  ) : (
                    business.name?.charAt(0) || 'B'
                  )}
                </div>
                <div className="min-w-0 flex-1 text-white">
                  <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl lg:text-2xl">
                    {business.name}
                  </h1>
                  <p className="mt-1 text-slate-300">{business.category}</p>
                  <div className="mt-4 flex flex-wrap items-center gap-3 lg:mt-2">
                    <StarRating rating={rating} showValue className="[&_span]:text-white" />
                    <span className="text-sm text-slate-300">{reviewCount} reviews</span>
                    <Badge tone="brand">Trust score {trustScore}%</Badge>
                    {business.claimed ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-100 ring-1 ring-emerald-400/30">
                        ✓ Verified claimed business
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-3 lg:mt-3">
                    <Link
                      to={reviewActionHref}
                      className="inline-flex rounded-full bg-primary-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600"
                    >
                      {reviewActionLabel}
                    </Link>
                    {!business.claimed ? (
                      <Link
                        to={claimPath}
                        className="inline-flex rounded-full border border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-white/20"
                      >
                        Claim this business
                      </Link>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)] lg:items-start lg:p-8">
            <div className="flex min-h-0 flex-col">
              <div className="shrink-0">
                <AiReviewSummaryCard summary={aiSummary} loading={aiSummaryLoading} />

                <div className="mt-4">
                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-ink">Customer reviews</h2>
                    <input
                      className="input-field w-full sm:max-w-xs"
                      placeholder="Search reviews"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <ReviewScreeningNote variant="inline" className="mt-2" />
                  <p className="mt-2 text-sm text-ink-muted">
                    Showing {filteredReviews.length} of {reviewCount} review
                    {reviewCount === 1 ? '' : 's'}
                    {filterNote}
                  </p>
                </div>
              </div>

              <div className="mt-4">
                <div className="space-y-4">
                  {filteredReviews.length === 0 ? (
                    <div className="rounded-2xl border border-border px-4 py-8 text-center text-sm text-ink-muted">
                      No reviews match your filters.
                    </div>
                  ) : (
                    filteredReviews.map((review) => (
                      <ReviewCard
                        key={`d-${review.id}`}
                        variant="detailed"
                        review={mapReviewCard(review, business)}
                        businessName={business.name}
                        businessLogo={business.logo_url}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>

            <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:z-20 lg:self-start">
              <div className="rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-ink">Rating</h3>
                <div className="mt-4 flex items-end gap-3">
                  <span className="text-5xl font-semibold tabular-nums text-ink">{rating.toFixed(1)}</span>
                  <div>
                    <StarRating rating={rating} size="md" />
                    <p className="mt-1 text-sm text-ink-muted">{reviewCount} total reviews</p>
                  </div>
                </div>
                <div className="mt-5">
                  <RatingDistribution
                    reviews={reviews}
                    selectedStars={selectedStars}
                    onChange={setSelectedStars}
                  />
                </div>
                {selectedStars.length > 0 ? (
                  <button
                    type="button"
                    onClick={() => setSelectedStars([])}
                    className="mt-3 text-sm font-medium text-primary-600 hover:text-primary-700"
                  >
                    Clear rating filters
                  </button>
                ) : null}
              </div>

              <div className="rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-ink">Company details</h3>
                <dl className="mt-4 space-y-3 text-sm">
                  <div>
                    <dt className="text-ink-muted">Website</dt>
                    <dd className="mt-1 text-ink">
                      {business.website ? (
                        <a
                          href={formatExternalUrl(business.website)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="break-all font-medium text-primary-700 hover:text-primary-800 hover:underline"
                        >
                          {business.website}
                        </a>
                      ) : (
                        '—'
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted">Phone</dt>
                    <dd className="mt-1 text-ink">
                      {business.phone ? (
                        <a
                          href={`tel:${business.phone.replace(/\s+/g, '')}`}
                          className="text-primary-700 hover:underline"
                        >
                          {business.phone}
                        </a>
                      ) : (
                        '—'
                      )}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-ink-muted">Address</dt>
                    <dd className="mt-1 text-ink">{business.address || '—'}</dd>
                  </div>
                </dl>
              </div>

              {business.claimed ? (
                <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-5">
                  <p className="text-sm font-semibold text-emerald-900">
                    ✓ This business has claimed their Check A Review profile.
                  </p>
                  {(business.verified_contact || business.verified_identity || business.verified_ownership) ? (
                    <div className="mt-4">
                      <h3 className="text-sm font-semibold text-ink">Confirmed details</h3>
                      <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                        This business has chosen to confirm specific details about their business with Check A Review.
                      </p>
                      <ul className="mt-3 space-y-2 text-sm text-ink">
                        {business.verified_contact ? <li>✓ Business contact details</li> : null}
                        {business.verified_identity ? <li>✓ User identity</li> : null}
                        {business.verified_ownership ? <li>✓ Business ownership</li> : null}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : (
                <div className="rounded-2xl border border-border p-5">
                  <h3 className="font-semibold text-ink">Own this business?</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    Claim this profile for free to manage your reputation and respond to reviews.
                  </p>
                  <Link
                    to={claimPath}
                    className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
                  >
                    Claim this business
                  </Link>
                </div>
              )}

              <div className="rounded-2xl border border-border p-5">
                <h3 className="font-semibold text-ink">
                  {myReviewId ? 'Update your review' : 'Share your experience'}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {myReviewId
                    ? `You already reviewed ${business.name}. You can edit your review anytime.`
                    : `Help others by writing an honest review of ${business.name}.`}
                </p>
                <Link
                  to={reviewActionHref}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  {reviewActionLabel}
                </Link>
                {!isAuthenticated || !isCustomer ? (
                  <p className="mt-3 text-xs text-ink-muted">
                    You&apos;ll need to log in with a user account first.
                  </p>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  )
}
