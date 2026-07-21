import { API_BASE_URL } from '../utils/constants'

class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.status = status
  }
}

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('token')

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  })

  const json = await response.json().catch(() => ({ message: 'Request failed' }))

  if (!response.ok) {
    throw new ApiError(json.message || 'Request failed', response.status)
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
}

export const publicApi = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (data) => api.post('/auth/register', data),
  searchBusinesses: (params = {}) => {
    const query = new URLSearchParams()
    if (params.q) query.set('q', params.q)
    if (params.category) query.set('category', params.category)
    if (params.page) query.set('page', params.page)
    if (params.limit) query.set('limit', params.limit)
    const qs = query.toString()
    return api.get(`/businesses/search${qs ? `?${qs}` : ''}`)
  },
  getBusiness: (idOrSlug) => api.get(`/businesses/${idOrSlug}`),
  getCategories: () => api.get('/businesses/categories'),
  getBusinessReviews: (businessId, limit = 20) =>
    api.get(`/reviews/business/${businessId}?limit=${limit}`),
  getLatestReviews: (limit = 12) => api.get(`/reviews/latest?limit=${limit}`),
}

export { ApiError }
