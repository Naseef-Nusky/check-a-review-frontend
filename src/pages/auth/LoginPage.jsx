import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { BUSINESS_PORTAL_URL } from '../../utils/constants'
import { publicApi } from '../../services/api'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="#EA4335" d="M12 10.2v3.6h5.1c-.2 1.2-.9 2.3-1.9 3l3.1 2.4c1.8-1.7 2.9-4.1 2.9-7 0-.7-.1-1.3-.2-1.9H12z" />
      <path fill="#34A853" d="M5.3 14.3l-.8.6-2.5 1.9C3.6 19.7 7.5 22 12 22c2.7 0 5-.9 6.7-2.4l-3.1-2.4c-.9.6-2 1-3.6 1-2.8 0-5.1-1.9-6-4.4z" />
      <path fill="#4A90E2" d="M3.2 7.2C2.4 8.7 2 10.3 2 12s.4 3.3 1.2 4.8l3.3-2.5C6 12.9 5.8 12.5 5.8 12s.2-.9.4-1.3L3.2 7.2z" />
      <path fill="#FBBC05" d="M12 5.8c1.5 0 2.8.5 3.8 1.5l2.8-2.8C16.9 2.9 14.7 2 12 2 7.5 2 3.6 4.3 2 7.2l3.3 2.5C6.9 7.7 9.2 5.8 12 5.8z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12.1C22 6.5 17.5 2 12 2S2 6.5 2 12.1c0 5 3.7 9.1 8.4 9.9v-7H8.1v-2.9h2.3V9.4c0-2.3 1.4-3.5 3.4-3.5.9 0 1.9.1 1.9.1v2.2h-1.1c-1.1 0-1.4.7-1.4 1.3v1.7h2.5l-.4 2.9h-2.1v7C18.3 21.2 22 17.1 22 12.1z" />
    </svg>
  )
}

function AppleIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.4 12.7c0-1.8 1.5-2.7 1.5-2.7s-1.2-1.8-3.1-1.8c-1.7 0-2.4.8-3.1.8-.8 0-1.7-.9-3.1-.8-2 0-4.1 1.7-4.1 5.1 0 2 .7 4.1 1.7 5.5.7 1 1.5 2.1 2.6 2.1.9 0 1.3-.7 2.6-.7s1.6.7 2.6.7c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.2s-2.2-.8-2.2-3.9zM14.4 6.5c.8-.9 1.3-2.2 1.2-3.5-1.1.1-2.5.8-3.3 1.7-.7.8-1.4 2.1-1.2 3.3 1.3.1 2.5-.6 3.3-1.5z" />
    </svg>
  )
}

export default function LoginPage() {
  const [mode, setMode] = useState('providers') // providers | email
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const finishLogin = (user, token) => {
    if (user.role === 'business') {
      window.location.href = `${BUSINESS_PORTAL_URL}/login`
      return
    }
    if (user.role === 'admin') {
      window.location.href = import.meta.env.VITE_ADMIN_URL || 'http://localhost:5174'
      return
    }
    login(user, token)
    navigate('/customer')
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { user, token } = await publicApi.login(email, password)
      finishLogin(user, token)
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleSocial = (provider) => {
    setError(`${provider} sign-in is not connected yet. Please use email login.`)
    setMode('email')
  }

  return (
    <div className="bg-slate-100">
      <section className="px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Read reviews. Write reviews. Find companies.
          </h1>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm sm:p-8">
            <p className="text-center text-sm font-medium text-slate-600">
              Log in or sign up below
            </p>

            {mode === 'providers' ? (
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={() => handleSocial('Google')}
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50"
                >
                  <GoogleIcon />
                  Continue with Google
                </button>
                <button
                  type="button"
                  onClick={() => handleSocial('Facebook')}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-[#1877F2] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#166FE5]"
                >
                  <FacebookIcon />
                  Continue with Facebook
                </button>
                <button
                  type="button"
                  onClick={() => handleSocial('Apple')}
                  className="flex w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  <AppleIcon />
                  Sign in with Apple
                </button>

                <button
                  type="button"
                  onClick={() => setMode('email')}
                  className="mt-2 block w-full pt-2 text-center text-sm font-semibold text-primary-600 underline-offset-2 hover:text-primary-700 hover:underline"
                >
                  Continue with email
                </button>
              </div>
            ) : (
              <form onSubmit={handleEmailSubmit} className="mt-6 space-y-4">
                {error && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div>
                  <div className="mb-1.5 flex items-center justify-between">
                    <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
                    <Link to="/forgot-password" className="text-sm font-medium text-primary-700 hover:text-primary-800">
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-field"
                  />
                </div>
                <Button type="submit" className="w-full rounded-full" disabled={loading}>
                  {loading ? 'Signing in...' : 'Continue'}
                </Button>
                <button
                  type="button"
                  onClick={() => setMode('providers')}
                  className="w-full text-center text-sm font-medium text-slate-500 hover:text-slate-800"
                >
                  Back to all options
                </button>
                <p className="text-center text-sm text-slate-500">
                  New here?{' '}
                  <Link to="/register" className="font-medium text-primary-700 hover:text-primary-800">
                    Create an account
                  </Link>
                </p>
              </form>
            )}
          </div>

          <div className="mt-14">
            <h2 className="text-xl font-semibold text-slate-900">Are you a business?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Set up your business account on Check A Review for free
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`${BUSINESS_PORTAL_URL}/login`}
                className="rounded-full bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600"
              >
                Log in
              </a>
              <a
                href={`${BUSINESS_PORTAL_URL}/setup`}
                className="rounded-full border-2 border-primary-500 px-6 py-2.5 text-sm font-semibold text-primary-600 transition hover:bg-primary-50"
              >
                Sign up
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
