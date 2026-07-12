import { createContext, useContext, useState, useCallback } from 'react'
import { USER_ROLES } from '../utils/constants'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })

  const login = useCallback((userData, token) => {
    localStorage.setItem('user', JSON.stringify(userData))
    localStorage.setItem('token', token)
    setUser(userData)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    setUser(null)
  }, [])

  const isAuthenticated = !!user
  const isCustomer = user?.role === USER_ROLES.CUSTOMER
  const isBusiness = user?.role === USER_ROLES.BUSINESS
  const isAdmin = user?.role === USER_ROLES.ADMIN

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isCustomer, isBusiness, isAdmin }}
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
