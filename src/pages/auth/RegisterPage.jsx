import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { APP_NAME, BUSINESS_PORTAL_URL } from '../../utils/constants'
import { publicApi } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import PasswordInput from '../../components/common/PasswordInput'

export default function RegisterPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const redirectTo = searchParams.get('redirect') || '/users'
  const invitedEmail = searchParams.get('email') || ''
  const [form, setForm] = useState({
    name: '',
    email: invitedEmail,
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchParams.get('type') === 'business') {
      window.location.href = `${BUSINESS_PORTAL_URL}/setup`
    }
  }, [searchParams])

  useEffect(() => {
    if (invitedEmail) {
      setForm((prev) => ({ ...prev, email: invitedEmail }))
    }
  }, [invitedEmail])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const result = await publicApi.register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'customer',
      })
      if (result.requiresEmailVerification) {
        navigate(`/verify-email?email=${encodeURIComponent(form.email)}&redirect=${encodeURIComponent(redirectTo)}`)
        return
      }
      login(result.user, result.token)
      navigate(redirectTo.startsWith('/') ? redirectTo : '/users')
    } catch (err) {
      if (err.code === 'EMAIL_EXISTS' || /already registered|already exists/i.test(err.message || '')) {
        setError(
          `${err.message || 'Email already registered.'} If you already started signup, enter the verification code we emailed you.`,
        )
      } else {
        setError(err.message || 'Registration failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-slate-100">
      <section className="px-4 pb-16 pt-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            Join {APP_NAME} and start sharing trusted feedback.
          </h1>

          <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm sm:p-8">
            <p className="text-center text-sm font-medium text-slate-600">
              Create your customer account below
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  <p>{error}</p>
                  <p className="mt-2">
                    <Link to="/login" className="font-medium underline underline-offset-2">
                      Log in
                    </Link>
                    {' · '}
                    <Link
                      to={`/verify-email?email=${encodeURIComponent(form.email || '')}`}
                      className="font-medium underline underline-offset-2"
                    >
                      Enter verification code
                    </Link>
                  </p>
                </div>
              )}
              <Input
                id="name"
                label="Full name"
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <PasswordInput
                id="password"
                label="Password"
                required
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <PasswordInput
                id="confirmPassword"
                label="Confirm password"
                required
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              />
              <Button type="submit" className="w-full rounded-full" disabled={loading}>
                {loading ? 'Creating account...' : 'Create account'}
              </Button>
              <p className="text-center text-sm text-slate-500">
                Already have an account?{' '}
                <Link
                  to={redirectTo !== '/users' ? `/login?redirect=${encodeURIComponent(redirectTo)}` : '/login'}
                  className="font-medium text-primary-700 hover:text-primary-800"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>

          <div className="mt-14">
            <h2 className="text-xl font-semibold text-slate-900">Are you a business?</h2>
            <p className="mt-2 text-sm text-slate-600">
              Reviewer and business accounts stay separate. You can use the same email for both — create a free
              business account whenever you are ready.
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
