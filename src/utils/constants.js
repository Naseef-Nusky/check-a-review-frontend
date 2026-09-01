export const APP_NAME = 'Check A Review'
export const CONTACT_EMAIL = 'info@checkareview.com'

export const USER_ROLES = {
  CUSTOMER: 'customer',
  BUSINESS: 'business',
  ADMIN: 'admin',
}

export const REVIEW_STATUS = {
  PENDING: 'pending',
  PUBLISHED: 'published',
  REJECTED: 'rejected',
  REPORTED: 'reported',
}

export const SUBSCRIPTION_PLANS = {
  FREE: 'free',
  STARTER: 'starter',
  PREMIUM: 'premium',
}

export const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

/** Public consumer site origin (used for SEO canonical URLs and sitemap) */
export const PUBLIC_SITE_URL = import.meta.env.VITE_PUBLIC_SITE_URL || 'http://localhost:5173'

/** Google Search Console HTML tag verification */
export const GOOGLE_SITE_VERIFICATION = 'zAqYnx3X42ATAbzT-ro31y6POhiR67AncXoG-uCdN6o'

/** Google Identity Services client ID (must match backend GOOGLE_CLIENT_ID) */
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || ''

export const ADMIN_CRM_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'

/** Business portal (subdomain in production, local business app in development) */
export const BUSINESS_PORTAL_URL =
  import.meta.env.VITE_BUSINESS_URL || 'http://localhost:5175'

/** Resolve uploaded media (e.g. /uploads/logos/...) against the API host */
export function resolveMediaUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path) || path.startsWith('blob:') || path.startsWith('data:')) {
    return path
  }
  const normalized = path.startsWith('/') ? path : `/${path}`
  try {
    if (/^https?:\/\//i.test(API_BASE_URL)) {
      return `${new URL(API_BASE_URL).origin}${normalized}`
    }
  } catch {
    // fall through
  }
  return normalized
}

export function formatExternalUrl(url) {
  const value = String(url || '').trim()
  if (!value) return ''
  return /^https?:\/\//i.test(value) ? value : `https://${value}`
}

export function businessProfilePath(business) {
  if (!business) return '/search'
  const slug = business.slug || business.business_slug
  const id = business.id || business.business_id
  if (slug) return `/businesses/${slug}`
  if (id) return `/businesses/${id}`
  return '/search'
}
