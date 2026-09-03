import { APP_NAME, CONTACT_EMAIL, GOOGLE_SITE_VERIFICATION, PUBLIC_SITE_URL } from './constants'

export const DEFAULT_SEO = {
  title: `${APP_NAME} — Trusted customer reviews`,
  description:
    'Discover verified customer reviews, compare business reputation, and make confident decisions with Check A Review.',
}

export function siteOrigin() {
  return PUBLIC_SITE_URL.replace(/\/$/, '')
}

export function buildCanonical(path = '/') {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${siteOrigin()}${normalized}`
}

export function formatPageTitle(title) {
  if (!title) return DEFAULT_SEO.title
  if (title.includes(APP_NAME)) return title
  return `${title} | ${APP_NAME}`
}

function upsertMeta(name, content, attribute = 'name') {
  if (content === undefined || content === null || content === '') {
    const existing = document.head.querySelector(`meta[${attribute}="${name}"]`)
    existing?.remove()
    return
  }
  let tag = document.head.querySelector(`meta[${attribute}="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  let tag = document.head.querySelector(`link[rel="${rel}"]`)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

export function applyPageMeta({
  title = DEFAULT_SEO.title,
  description = DEFAULT_SEO.description,
  path = '/',
  robots = 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  image,
  type = 'website',
  jsonLd,
} = {}) {
  const pageTitle = formatPageTitle(title)
  const canonical = buildCanonical(path)
  const imageUrl = image || `${siteOrigin()}/favicon.svg`

  document.title = pageTitle
  document.documentElement.lang = 'en'

  upsertMeta('description', description)
  upsertMeta(
    'keywords',
    'Check A Review, CheckAReview, customer reviews, business ratings, verified reviews, trust score',
  )
  upsertMeta('robots', robots)
  upsertMeta('googlebot', robots.startsWith('noindex') ? 'noindex, nofollow' : 'index, follow')

  upsertMeta('og:type', type, 'property')
  upsertMeta('og:site_name', APP_NAME, 'property')
  upsertMeta('og:title', pageTitle, 'property')
  upsertMeta('og:description', description, 'property')
  upsertMeta('og:url', canonical, 'property')
  upsertMeta('og:locale', 'en_GB', 'property')
  upsertMeta('og:image', imageUrl, 'property')

  upsertMeta('twitter:card', 'summary')
  upsertMeta('twitter:title', pageTitle)
  upsertMeta('twitter:description', description)
  upsertMeta('twitter:image', imageUrl)

  upsertLink('canonical', canonical)

  const existingPageLd = document.getElementById('page-jsonld')
  if (jsonLd) {
    let script = existingPageLd
    if (!script) {
      script = document.createElement('script')
      script.id = 'page-jsonld'
      script.type = 'application/ld+json'
      document.head.appendChild(script)
    }
    script.textContent = JSON.stringify(jsonLd)
  } else if (existingPageLd) {
    existingPageLd.remove()
  }
}

export function applySiteDefaults() {
  upsertMeta('application-name', APP_NAME)
  upsertMeta('theme-color', '#0f172a')
  upsertMeta('google-site-verification', GOOGLE_SITE_VERIFICATION)
  upsertMeta(
    'keywords',
    'Check A Review, CheckAReview, customer reviews, business ratings, verified reviews',
  )

  const siteLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteOrigin()}/#organization`,
        name: APP_NAME,
        alternateName: ['CheckAReview', 'Check a Review', 'checkareview.com'],
        url: siteOrigin(),
        logo: {
          '@type': 'ImageObject',
          url: `${siteOrigin()}/logo-check-a-review.png`,
        },
        email: CONTACT_EMAIL,
        description: DEFAULT_SEO.description,
        address: {
          '@type': 'PostalAddress',
          streetAddress: '125 Deansgate',
          addressLocality: 'Greater Manchester',
          postalCode: 'M3 2BY',
          addressCountry: 'GB',
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${siteOrigin()}/#website`,
        name: APP_NAME,
        alternateName: ['CheckAReview', 'Check a Review'],
        url: siteOrigin(),
        description: DEFAULT_SEO.description,
        publisher: { '@id': `${siteOrigin()}/#organization` },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteOrigin()}/search?q={search_term_string}`,
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  }

  let script = document.getElementById('site-jsonld')
  if (!script) {
    script = document.createElement('script')
    script.id = 'site-jsonld'
    script.type = 'application/ld+json'
    document.head.appendChild(script)
  }
  script.textContent = JSON.stringify(siteLd)
}

/**
 * Build LocalBusiness + AggregateRating (+ sample Review) JSON-LD for Google rich results.
 */
export function buildBusinessJsonLd(business, reviews = []) {
  if (!business) return null

  const rating = Number(business.average_rating || 0)
  const reviewCount = Number(business.review_count || 0)
  const path = `/businesses/${business.slug || business.id}`
  const pageUrl = buildCanonical(path)
  const logo = business.logo_url
    ? business.logo_url.startsWith('http')
      ? business.logo_url
      : `${siteOrigin()}${business.logo_url.startsWith('/') ? '' : '/'}${business.logo_url}`
    : undefined

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${pageUrl}#business`,
    name: business.name,
    url: pageUrl,
    description:
      business.description ||
      `Customer reviews and ratings for ${business.name} on Check A Review.`,
    image: logo,
    category: business.category || undefined,
    sameAs: business.website ? [business.website] : undefined,
  }

  if (reviewCount > 0 && rating > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: Number(rating.toFixed(2)),
      bestRating: 5,
      worstRating: 1,
      ratingCount: reviewCount,
      reviewCount,
    }
  }

  const published = (Array.isArray(reviews) ? reviews : [])
    .filter((r) => r && (r.status === 'published' || !r.status) && r.content)
    .slice(0, 10)

  if (published.length > 0) {
    schema.review = published.map((r) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: r.author_name || 'Customer',
      },
      datePublished: r.created_at || r.updated_at,
      name: r.title || undefined,
      reviewBody: r.content,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: Number(r.rating) || 0,
        bestRating: 5,
        worstRating: 1,
      },
      publisher: {
        '@type': 'Organization',
        name: APP_NAME,
        url: siteOrigin(),
      },
    }))
  }

  return schema
}

const NOINDEX = 'noindex, nofollow'

/** Static public routes — dynamic business pages set meta in-page. */
export const PUBLIC_ROUTE_SEO = [
  {
    test: (path) => path === '/',
    meta: {
      title: 'Trusted customer reviews',
      description:
        'Find businesses you can trust. Search verified reviews, compare ratings, and make better decisions with Check A Review.',
      path: '/',
    },
  },
  {
    test: (path) => path === '/search',
    meta: {
      title: 'Find businesses',
      description: 'Search companies and read verified customer reviews before you buy or book.',
      path: '/search',
    },
  },
  {
    test: (path) => path === '/categories',
    meta: {
      title: 'Browse categories',
      description: 'Browse business categories and subcategories to find trusted companies near you.',
      path: '/categories',
    },
  },
  {
    test: (path) => path === '/reviews',
    meta: {
      title: 'Latest reviews',
      description:
        'Recently published customer reviews. Every review is screened by automated fraud checks and AI before going live.',
      path: '/reviews',
    },
  },
  {
    test: (path) => path === '/about',
    meta: {
      title: 'About us',
      description: `Learn about ${APP_NAME}, our mission to strengthen trust between customers and businesses, and how we protect review integrity.`,
      path: '/about',
    },
  },
  {
    test: (path) => path === '/trust-centre',
    meta: {
      title: 'Trust Centre',
      description:
        'How Check A Review screens reviews with automated checks and AI, keeps feedback genuine, and protects platform integrity.',
      path: '/trust-centre',
    },
  },
  {
    test: (path) => path === '/contact',
    meta: {
      title: 'Get in touch with us',
      description: 'Contact the Check A Review team for help with your account, business listings, or platform questions.',
      path: '/contact',
    },
  },
  {
    test: (path) => path === '/help',
    meta: {
      title: 'Help Center',
      description: `Get help using ${APP_NAME} as a reviewer or business owner — guides, FAQs, and support resources.`,
      path: '/help',
    },
  },
  {
    test: (path) => path === '/help/reviewers',
    meta: {
      title: 'Help for reviewers',
      description: 'Learn how to create an account, find businesses, write and edit reviews, and understand moderation.',
      path: '/help/reviewers',
    },
  },
  {
    test: (path) => path === '/help/businesses',
    meta: {
      title: 'Help for businesses',
      description: 'Guides for businesses on registering, managing reviews, invitations, widgets, and subscriptions.',
      path: '/help/businesses',
    },
  },
  {
    test: (path) => path === '/review-tips',
    meta: {
      title: 'Review writing tips',
      description: 'Tips for writing helpful, honest, and constructive customer reviews on Check A Review.',
      path: '/review-tips',
    },
  },
  {
    test: (path) => path === '/privacy',
    meta: {
      title: 'Privacy Policy',
      description: 'CheckAReview Privacy Policy: how we collect, use, and protect personal data on our open review platform.',
      path: '/privacy',
    },
  },
  {
    test: (path) => path === '/terms',
    meta: {
      title: 'Terms & Conditions',
      description: 'Terms and conditions for Check a Review services, including commencement, fees, feedback, and data protection.',
      path: '/terms',
    },
  },
  {
    test: (path) => path === '/terms/business',
    meta: {
      title: 'Terms & Conditions',
      description: 'Terms and conditions for Check a Review services, including commencement, fees, feedback, and data protection.',
      path: '/terms/business',
    },
  },
  {
    test: (path) => path === '/posting-guidelines',
    meta: {
      title: 'Posting Guidelines',
      description: 'CheckAReview posting guidelines for authentic, respectful, and genuine reviews.',
      path: '/posting-guidelines',
    },
  },
  {
    test: (path) => path === '/cookies',
    meta: {
      title: 'Cookie Policy',
      description: 'Cookie Policy for CheckAReview: how we use cookies and similar technologies on our website.',
      path: '/cookies',
    },
  },
  {
    test: (path) => path === '/login',
    meta: {
      title: 'Log in',
      description: `Sign in to your ${APP_NAME} customer account.`,
      path: '/login',
      robots: NOINDEX,
    },
  },
  {
    test: (path) => path === '/register',
    meta: {
      title: 'Sign up',
      description: `Create a ${APP_NAME} account to write and manage customer reviews.`,
      path: '/register',
      robots: NOINDEX,
    },
  },
  {
    test: (path) => path === '/verify-email',
    meta: {
      title: 'Verify email',
      description: `Verify your ${APP_NAME} account email address.`,
      path: '/verify-email',
      robots: NOINDEX,
    },
  },
  {
    test: (path) => /^\/businesses\/[^/]+\/write-review$/.test(path),
    meta: (path) => ({
      title: 'Write a review',
      description: 'Share your experience with a verified customer review.',
      path,
      robots: NOINDEX,
    }),
  },
  {
    test: (path) => path.startsWith('/review-invite/'),
    meta: (path) => ({
      title: 'Review invitation',
      description: 'Leave a review for a business that invited you.',
      path,
      robots: NOINDEX,
    }),
  },
  {
    test: (path) => path.startsWith('/users'),
    meta: (path) => ({
      title: 'Your account',
      description: `Your ${APP_NAME} customer account.`,
      path,
      robots: NOINDEX,
    }),
  },
  {
    test: (path) => path.startsWith('/admin'),
    meta: (path) => ({
      title: 'Admin',
      description: `${APP_NAME} administration.`,
      path,
      robots: NOINDEX,
    }),
  },
]

export function getPublicRouteSeo(pathname, search = '') {
  const path = pathname || '/'
  for (const route of PUBLIC_ROUTE_SEO) {
    if (!route.test(path)) continue
    const meta = typeof route.meta === 'function' ? route.meta(path) : { ...route.meta }
    if (path === '/categories') {
      const params = new URLSearchParams(search)
      const category = params.get('cat')
      if (category) {
        return {
          ...meta,
          title: `${category} businesses`,
          description: `Browse ${category} businesses and read verified customer reviews on Check A Review.`,
          path: `${path}?cat=${encodeURIComponent(category)}`,
        }
      }
    }
    if (search && path !== '/categories') {
      return { ...meta, path: `${path}${search}` }
    }
    return meta
  }
  return null
}

export function isDynamicPublicPage(pathname) {
  return /^\/businesses\/[^/]+$/.test(pathname || '')
}
