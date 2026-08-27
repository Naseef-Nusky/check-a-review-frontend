import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { USER_ROLES } from '../utils/constants'
import { publicApi, SESSION_EXPIRED_EVENT, ApiError } from '../services/api'

const AuthContext = createContext(null)

function clearStoredAuth() {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
}

function readStoredUser() {
  try {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const navigate = useNavigate()
  const [user, setUser] = useState(() => readStoredUser())
  const [authReady, setAuthReady] = useState(() => !localStorage.getItem('token'))

  const login = useCallback((userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
    setUser(userData)
  }, [])

  const clearSession = useCallback(() => {
    clearStoredAuth()
    setUser(null)
  }, [])

  const logout = useCallback(() => {
    clearStoredAuth()
    setUser(null)
    navigate('/', { replace: true })
  }, [navigate])

  // Keep React state in sync when API layer clears a dead session
  useEffect(() => {
    const onExpired = () => setUser(null)
    window.addEventListener(SESSION_EXPIRED_EVENT, onExpired)
    return () => window.removeEventListener(SESSION_EXPIRED_EVENT, onExpired)
  }, [])

  // On app load: validate stored token once. Refresh profile or force re-login.
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      setAuthReady(true)
      return undefined
    }

    let active = true
    publicApi
      .getMe()
      .then((profile) => {
        if (!active || !profile) return
        login(profile, token)
      })
      .catch((err) => {
        if (!active) return
        // request() already clears + redirects on SESSION_EXPIRED
        if (err instanceof ApiError && err.status === 401) {
          setUser(null)
        }
      })
      .finally(() => {
        if (active) setAuthReady(true)
      })

    return () => {
      active = false
    }
  }, [login])

  const isAuthenticated = !!user
  const isCustomer = user?.role === USER_ROLES.CUSTOMER
  const isBusiness = user?.role === USER_ROLES.BUSINESS
  const isAdmin = user?.role === USER_ROLES.ADMIN

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        clearSession,
        authReady,
        isAuthenticated,
        isCustomer,
        isBusiness,
        isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
