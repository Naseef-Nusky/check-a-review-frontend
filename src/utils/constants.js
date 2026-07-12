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

export const ADMIN_CRM_URL = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'
