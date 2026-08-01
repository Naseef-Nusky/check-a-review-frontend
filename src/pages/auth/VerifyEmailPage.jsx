import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { BUSINESS_PORTAL_URL } from '../../utils/constants'
import { publicApi } from '../../services/api'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

export default function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState(searchParams.get('email') || '')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState(
    searchParams.get('email')
      ? 'We sent a 6-digit code to your email. Enter it below to create and activate your account.'
      : '',
  )
  const [loading, setLoading] = useState(false)
  const [resending, setResending] = useState(false)
  const redirectTo = searchParams.get('redirect') || '/users'

  useEffect(() => {
    const fromQuery = searchParams.get('email')
    if (fromQuery) setEmail(fromQuery)
  }, [searchParams])

  const finish = (user, token) => {
    if (user.role === 'business') {
      // Business sessions live on the portal origin, so send them there to sign in.
      window.location.href = `${BUSINESS_PORTAL_URL}/login?email=${encodeURIComponent(user.email)}&verified=1`
      return
    }
    login(user, token)
    navigate(redirectTo.startsWith('/') ? redirectTo : '/users')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const result = await publicApi.verifyEmail(email.trim(), code.trim())
      finish(result.user, result.token)
    } catch (err) {
      setError(err.message || 'Verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    setError('')
    setInfo('')
    if (!email.trim()) {
      setError('Enter your email address first')
      return
    }
    setResending(true)
    try {
      const result = await publicApi.resendVerification(email.trim())
      setInfo(result.message || 'A new code has been sent')
    } catch (err) {
      setError(err.message || 'Could not resend code')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="bg-slate-100">
      <section className="px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Verify your email
          </h1>
          <p className="mt-3 text-sm text-slate-600">
            Enter the 6-digit code we sent to your inbox. Codes expire after 15 minutes.
          </p>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              ) : null}
              {info ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                  {info}
                </div>
              ) : null}

              <Input
                id="email"
                label="Email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
              />

              <div>
                <label htmlFor="code" className="label-text">
                  Verification code
                </label>
                <input
                  id="code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  className="input-field tracking-[0.35em] text-center text-lg font-semibold"
                  placeholder="000000"
                />
              </div>

              <Button type="submit" className="w-full rounded-full" disabled={loading || code.length !== 6}>
                {loading ? 'Verifying...' : 'Verify email'}
              </Button>
            </form>

            <div className="mt-5 flex flex-col items-center gap-2 text-sm text-slate-600">
              <button
                type="button"
                onClick={handleResend}
                disabled={resending}
                className="font-medium text-primary-600 hover:text-primary-700 disabled:opacity-50"
              >
                {resending ? 'Sending...' : 'Resend code'}
              </button>
              <Link to="/login" className="hover:text-slate-900">
                Back to log in
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
