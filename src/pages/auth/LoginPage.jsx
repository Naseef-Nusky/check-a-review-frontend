import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { BUSINESS_PORTAL_URL, GOOGLE_CLIENT_ID } from '../../utils/constants'
import { publicApi } from '../../services/api'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import PasswordInput from '../../components/common/PasswordInput'

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

function AppleIcon() {
  return (
    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M16.4 12.7c0-1.8 1.5-2.7 1.5-2.7s-1.2-1.8-3.1-1.8c-1.7 0-2.4.8-3.1.8-.8 0-1.7-.9-3.1-.8-2 0-4.1 1.7-4.1 5.1 0 2 .7 4.1 1.7 5.5.7 1 1.5 2.1 2.6 2.1.9 0 1.3-.7 2.6-.7s1.6.7 2.6.7c1.1 0 1.8-1 2.5-2 .8-1.1 1.1-2.2 1.1-2.2s-2.2-.8-2.2-3.9zM14.4 6.5c.8-.9 1.3-2.2 1.2-3.5-1.1.1-2.5.8-3.3 1.7-.7.8-1.4 2.1-1.2 3.3 1.3.1 2.5-.6 3.3-1.5z" />
    </svg>
  )
}

function loadGoogleScript() {
  if (window.google?.accounts?.id) return Promise.resolve()
  const existing = document.querySelector('script[data-google-gsi]')
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener('load', () => resolve())
      existing.addEventListener('error', () => reject(new Error('Failed to load Google sign-in')))
    })
  }
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = 'https://accounts.google.com/gsi/client'
    script.async = true
    script.defer = true
    script.dataset.googleGsi = 'true'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Google sign-in'))
    document.head.appendChild(script)
  })
}

/** Sign in with Apple is shown only on iPhone / iPad / Mac. */
function isAppleDevice() {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent || ''
  const platform = navigator.platform || ''
  if (/iPhone|iPad|iPod/i.test(ua)) return true
  if (/Macintosh|Mac OS X/i.test(ua)) return true
  // iPadOS 13+ may report as MacIntel with touch
  if (platform === 'MacIntel' && navigator.maxTouchPoints > 1) return true
  return false
}

export default function LoginPage() {
  const [mode, setMode] = useState('providers') // providers | email | forgot | reset
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [forgotSent, setForgotSent] = useState(false)
  const [resetDone, setResetDone] = useState(false)
  const [forgotFromMode, setForgotFromMode] = useState('email')
  const [showAppleSignIn] = useState(() => isAppleDevice())
  const { login, clearSession } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/users'
  const resetToken = searchParams.get('token') || ''
  const sessionExpired = searchParams.get('session') === 'expired'

  useEffect(() => {
    if (resetToken) {
      // Reset link means any old login session must be cleared
      clearSession()
      setMode('reset')
      setResetDone(false)
      setError('')
      return
    }
    if (searchParams.get('forgot') === '1') {
      setMode('forgot')
      setForgotSent(false)
      setError('')
    }
  }, [searchParams, resetToken, clearSession])

  useEffect(() => {
    if (sessionExpired) {
      clearSession()
      setMode('email')
      setError('Your session expired after a password change or long time away. Please sign in again.')
    }
  }, [sessionExpired, clearSession])

  const openForgotMode = (from = mode) => {
    setForgotFromMode(from === 'providers' ? 'providers' : 'email')
    setError('')
    setForgotSent(false)
    setMode('forgot')
    setSearchParams((params) => {
      const next = new URLSearchParams(params)
      next.delete('token')
      next.set('forgot', '1')
      return next
    }, { replace: true })
  }

  const leaveForgotMode = () => {
    setError('')
    setForgotSent(false)
    setMode(forgotFromMode)
    setSearchParams((params) => {
      const next = new URLSearchParams(params)
      next.delete('forgot')
      return next
    }, { replace: true })
  }

  const leaveResetMode = (nextMode = 'email') => {
    setError('')
    setResetDone(false)
    setNewPassword('')
    setConfirmPassword('')
    setMode(nextMode)
    setSearchParams((params) => {
      const next = new URLSearchParams(params)
      next.delete('token')
      next.delete('forgot')
      return next
    }, { replace: true })
  }

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
    navigate(redirectTo.startsWith('/') ? redirectTo : '/users')
  }

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { user, token } = await publicApi.login(email, password)
      finishLogin(user, token)
    } catch (err) {
      if (err.code === 'EMAIL_NOT_VERIFIED') {
        navigate(`/verify-email?email=${encodeURIComponent(email)}&redirect=${encodeURIComponent(redirectTo)}`)
        return
      }
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleCredential = async (response) => {
    if (!response?.credential) {
      setError('Google sign-in was cancelled or failed')
      return
    }
    setLoading(true)
    setError('')
    try {
      const { user, token } = await publicApi.loginWithGoogle(response.credential)
      finishLogin(user, token)
    } catch (err) {
      setError(err.message || 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }

  const handleGoogle = async () => {
    setError('')
    if (!GOOGLE_CLIENT_ID) {
      setError(
        'Google sign-in is not configured. Add VITE_GOOGLE_CLIENT_ID to the frontend .env (and GOOGLE_CLIENT_ID on the backend).',
      )
      return
    }

    setLoading(true)
    try {
      await loadGoogleScript()
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredential,
        ux_mode: 'popup',
      })
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback: render a temporary One Tap / button click via google.accounts.id.renderButton
          const host = document.createElement('div')
          host.style.position = 'fixed'
          host.style.left = '-9999px'
          document.body.appendChild(host)
          window.google.accounts.id.renderButton(host, {
            type: 'standard',
            theme: 'outline',
            size: 'large',
            width: 320,
          })
          const btn = host.querySelector('div[role="button"]')
          if (btn) btn.click()
          else {
            setError(
              'Google sign-in popup was blocked. Allow popups for this site, or check Authorized JavaScript origins in Google Cloud Console.',
            )
          }
          setTimeout(() => host.remove(), 2000)
        }
        setLoading(false)
      })
    } catch (err) {
      setError(err.message || 'Could not start Google sign-in')
      setLoading(false)
    }
  }

  const handleSocial = (provider) => {
    setError(`${provider} sign-in is not connected yet. Please use email login.`)
    setMode('email')
  }

  const handleForgotSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await publicApi.forgotPassword(email.trim())
      setForgotSent(true)
    } catch (err) {
      setError(err.message || 'Could not send reset link')
    } finally {
      setLoading(false)
    }
  }

  const handleResetSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (!resetToken) {
      setError('Invalid or missing reset link. Please request a new one.')
      return
    }

    setLoading(true)
    try {
      await publicApi.resetPassword(resetToken, newPassword)
      clearSession()
      setResetDone(true)
      setTimeout(() => {
        leaveResetMode('email')
        setError('')
        setPassword('')
        setNewPassword('')
        setConfirmPassword('')
      }, 2000)
    } catch (err) {
      // Reset-token errors should not look like login-session errors
      const message = err.message || 'Could not reset password'
      if (/invalid or expired reset token/i.test(message)) {
        setError('This reset link is invalid or has expired. Please request a new one.')
      } else {
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  const cardTitle =
    mode === 'reset'
      ? resetDone
        ? 'Password updated'
        : 'Choose a new password'
      : mode === 'forgot'
        ? forgotSent
          ? 'Check your email'
          : 'Reset your password'
        : 'Log in or sign up below'

  const cardSubtitle =
    mode === 'reset'
      ? resetDone
        ? 'You can now sign in with your new password.'
        : 'Enter a new password for your account.'
      : mode === 'forgot'
        ? forgotSent
          ? 'If an account exists for this email, we sent a secure reset link.'
          : 'Enter your email and we will send you a reset link.'
        : null

  return (
    <div className="bg-slate-100">
      <section className="px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Read reviews. Write reviews. Find companies.
          </h1>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm sm:p-8">
            <p className="text-center text-sm font-medium text-slate-600">{cardTitle}</p>
            {cardSubtitle && (
              <p className="mt-2 text-center text-sm text-slate-500">{cardSubtitle}</p>
            )}

            {error && mode === 'providers' && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {mode === 'providers' ? (
              <div className="mt-6 space-y-3">
                <button
                  type="button"
                  onClick={handleGoogle}
                  disabled={loading}
                  className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 disabled:opacity-60"
                >
                  <GoogleIcon />
                  {loading ? 'Connecting...' : 'Continue with Google'}
                </button>
                {showAppleSignIn && (
                  <button
                    type="button"
                    onClick={() => handleSocial('Apple')}
                    className="flex w-full items-center justify-center gap-3 rounded-full bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    <AppleIcon />
                    Sign in with Apple
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setMode('email')}
                  className="mt-2 block w-full pt-2 text-center text-sm font-semibold text-primary-600 underline-offset-2 hover:text-primary-700 hover:underline"
                >
                  Continue with email
                </button>

                <p className="pt-2 text-center text-sm text-slate-500">
                  <button
                    type="button"
                    onClick={() => openForgotMode('providers')}
                    className="font-medium text-primary-700 hover:text-primary-800"
                  >
                    Forgot your password?
                  </button>
                </p>
              </div>
            ) : mode === 'reset' ? (
              resetDone ? (
                <div className="mt-6 space-y-4">
                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    Your password has been updated. Please sign in with your new password.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleResetSubmit} className="mt-6 space-y-4">
                  {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}
                  <PasswordInput
                    id="new-password"
                    label="New password"
                    required
                    minLength={8}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <PasswordInput
                    id="confirm-password"
                    label="Confirm new password"
                    required
                    minLength={8}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <Button type="submit" className="w-full rounded-full" disabled={loading}>
                    {loading ? 'Updating...' : 'Update password'}
                  </Button>
                  <button
                    type="button"
                    onClick={() => leaveResetMode('providers')}
                    className="w-full text-center text-sm font-medium text-slate-500 hover:text-slate-800"
                  >
                    Back to sign in
                  </button>
                  {error && (
                    <p className="text-center text-sm text-slate-500">
                      Link expired?{' '}
                      <button
                        type="button"
                        onClick={() => openForgotMode('email')}
                        className="font-medium text-primary-700 hover:text-primary-800"
                      >
                        Request a new reset link
                      </button>
                    </p>
                  )}
                </form>
              )
            ) : mode === 'forgot' ? (
              forgotSent ? (
                <div className="mt-6 space-y-4">
                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    If an account exists for <strong>{email}</strong>, a password reset link has been sent.
                    Check your inbox and spam folder.
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setForgotSent(false)
                      leaveForgotMode()
                    }}
                    className="w-full text-center text-sm font-medium text-primary-700 hover:text-primary-800"
                  >
                    Back to sign in
                  </button>
                </div>
              ) : (
                <form onSubmit={handleForgotSubmit} className="mt-6 space-y-4">
                  {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}
                  <Input
                    id="forgot-email"
                    label="Email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Button type="submit" className="w-full rounded-full" disabled={loading}>
                    {loading ? 'Sending...' : 'Send reset link'}
                  </Button>
                  <button
                    type="button"
                    onClick={leaveForgotMode}
                    className="w-full text-center text-sm font-medium text-slate-500 hover:text-slate-800"
                  >
                    Back to sign in
                  </button>
                </form>
              )
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
                <PasswordInput
                  id="password"
                  label="Password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  labelRight={
                    <button
                      type="button"
                      onClick={() => openForgotMode('email')}
                      className="text-sm font-medium text-primary-700 hover:text-primary-800"
                    >
                      Forgot password?
                    </button>
                  }
                />
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
                  <Link
                    to={redirectTo !== '/users' ? `/register?redirect=${encodeURIComponent(redirectTo)}` : '/register'}
                    className="font-medium text-primary-700 hover:text-primary-800"
                  >
                    Create an account
                  </Link>
                </p>
              </form>
            )}
          </div>

          <div className="mt-14">
            <h2 className="text-xl font-semibold text-slate-900">Are you a business?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Business and reviewer logins are separate. You can create a business account with the same email as
              your reviewer account.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`${BUSINESS_PORTAL_URL}/login`}
                className="rounded-full bg-primary-500 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-600"
              >
                Business log in
              </a>
              <a
                href={`${BUSINESS_PORTAL_URL}/setup`}
                className="rounded-full border-2 border-primary-500 px-6 py-2.5 text-sm font-semibold text-primary-600 transition hover:bg-primary-50"
              >
                Create business account
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
