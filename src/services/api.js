import { API_BASE_URL } from '../utils/constants'

export const SESSION_EXPIRED_EVENT = 'car:session-expired'

class ApiError extends Error {
  constructor(message, status, code = null) {
    super(message)
    this.status = status
    this.code = code
  }
}

let redirectingToLogin = false

function isSessionExpiredError(status, message, code) {
  if (status !== 401) return false
  if (code === 'SESSION_EXPIRED' || code === 'AUTH_REQUIRED') return true
  return /invalid or expired token|authentication required/i.test(String(message || ''))
}

function clearStoredAuth() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

/** Clear dead session and send user to login (once). */
export function handleSessionExpired({ redirect = true } = {}) {
  clearStoredAuth()
  window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT))

  if (!redirect || redirectingToLogin) return
  const path = window.location.pathname || ''
  if (
    path.startsWith('/login') ||
    path.startsWith('/register') ||
    path.startsWith('/verify-email')
  ) {
    return
  }

  redirectingToLogin = true
  const current = `${path}${window.location.search || ''}`
  const params = new URLSearchParams()
  params.set('session', 'expired')
  if (current && current !== '/') {
    params.set('redirect', current)
  }
  window.location.assign(`/login?${params.toString()}`)
}

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token')
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  })

  const json = await response.json().catch(() => ({ message: 'Request failed' }))

  if (!response.ok) {
    const message = json.message || 'Request failed'
    const code = json.code || null
    if (isSessionExpiredError(response.status, message, code)) {
      handleSessionExpired()
    }
    throw new ApiError(message, response.status, code)
  }

  if (response.status === 204) return null
  return json.data !== undefined ? json.data : json
}

export const api = {
  get: (endpoint) => request(endpoint),
  post: (endpoint, data) => request(endpoint, { method: 'POST', body: JSON.stringify(data) }),
  put: (endpoint, data) => request(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
  patch: (endpoint, data) => request(endpoint, { method: 'PATCH', body: JSON.stringify(data) }),
  delete: (endpoint) => request(endpoint, { method: 'DELETE' }),
  upload: (endpoint, formData) => request(endpoint, { method: 'POST', body: formData }),
}

export const publicApi = {
  login: (email, password) => api.post('/auth/login', { email, password, role: 'customer' }),
  loginWithGoogle: (credential) => api.post('/auth/google', { credential }),
  register: (data) => api.post('/auth/register', { ...data, role: data.role || 'customer' }),
  verifyEmail: (email, code) => api.post('/auth/verify-email', { email, code, role: 'customer' }),
  resendVerification: (email) => api.post('/auth/resend-verification', { email, role: 'customer' }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email, role: 'customer' }),
  resetPassword: (token, password) => api.post('/auth/reset-password', { token, password }),
  changePassword: (data) => api.post('/auth/change-password', data),
  searchBusinesses: (params = {}) => {
    const query = new URLSearchParams()
    if (params.q) query.set('q', params.q)
    if (params.category) query.set('category', params.category)
    if (params.page) query.set('page', params.page)
    if (params.limit) query.set('limit', params.limit)
    const qs = query.toString()
    return api.get(`/businesses/search${qs ? `?${qs}` : ''}`)
  },
  getFeaturedBusinesses: () => api.get('/businesses/featured'),
  getBusiness: (idOrSlug) => api.get(`/businesses/${idOrSlug}`),
  getBusinessReviewSummary: (idOrSlug) => api.get(`/businesses/${idOrSlug}/review-summary`),
  submitBusinessClaim: (idOrSlug, data, files = []) => {
    const formData = new FormData()
    Object.entries(data || {}).forEach(([key, value]) => {
      if (value !== undefined && value !== null) formData.append(key, value)
    })
    ;(files || []).forEach((file) => {
      if (file) formData.append('attachments', file)
    })
    return api.upload(`/claims/businesses/${idOrSlug}/claim`, formData)
  },
  verifyBusinessClaimEmail: (token) => api.post('/claims/verify-email', { token }),
  getCategories: () => api.get('/businesses/categories'),
  getBusinessReviews: (businessId, limit = 20) =>
    api.get(`/reviews/business/${businessId}?limit=${limit}`),
  getLatestReviews: (params = {}) => {
    const options = typeof params === 'number' ? { limit: params } : params
    const query = new URLSearchParams()
    if (options.page) query.set('page', options.page)
    if (options.limit) query.set('limit', options.limit)
    const qs = query.toString()
    return api.get(`/reviews/latest${qs ? `?${qs}` : ''}`)
  },
  getReviewInvite: (token) => api.get(`/reviews/invite/${token}`),
  createReview: (data) => api.post('/reviews', data),
  updateReview: (id, data) => api.put(`/reviews/${id}`, data),
  getMyReviews: () => api.get('/reviews/my'),
  updateProfile: (data) => api.put('/auth/me', data),
  getMe: () => api.get('/auth/me'),
  uploadAvatar: (file) => {
    const formData = new FormData()
    formData.append('avatar', file)
    return api.upload('/auth/me/avatar', formData)
  },
  removeAvatar: () => api.delete('/auth/me/avatar'),
  deleteAccount: () => api.delete('/auth/me'),
  submitContact: (data) => api.post('/contact', data),
  reportReview: (reviewId, data) => api.post(`/reviews/${reviewId}/report`, data),
}

export { ApiError }
