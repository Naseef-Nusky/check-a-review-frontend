export const APP_NAME = 'Check A Review'

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
