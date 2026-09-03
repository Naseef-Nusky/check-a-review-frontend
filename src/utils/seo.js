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
} = {}) {
  const pageTitle = formatPageTitle(title)
  const canonical = buildCanonical(path)
  const imageUrl = image || `${siteOrigin()}/favicon.svg`

  document.title = pageTitle
  document.documentElement.lang = 'en'

  upsertMeta('description', description)
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
}

export function applySiteDefaults() {
  upsertMeta('application-name', APP_NAME)
  upsertMeta('theme-color', '#0f172a')
  upsertMeta('google-site-verification', GOOGLE_SITE_VERIFICATION)

  if (!document.getElementById('site-jsonld')) {
    const script = document.createElement('script')
    script.id = 'site-jsonld'
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: APP_NAME,
      url: siteOrigin(),
      logo: `${siteOrigin()}/favicon.svg`,
      email: CONTACT_EMAIL,
      description: DEFAULT_SEO.description,
    })
    document.head.appendChild(script)
  }
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
