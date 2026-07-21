import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { APP_NAME, BUSINESS_PORTAL_URL } from '../../utils/constants'
import { publicApi } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import AuthLayout from '../../components/common/AuthLayout'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

export default function RegisterPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (searchParams.get('type') === 'business') {
      window.location.href = `${BUSINESS_PORTAL_URL}/setup`
    }
  }, [searchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setLoading(true)
    try {
      const { user, token } = await publicApi.register({
        name: form.name,
        email: form.email,
        password: form.password,
        role: 'customer',
      })
      login(user, token)
      navigate('/customer')
    } catch (err) {
      setError(err.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Create an account"
      subtitle={`Join ${APP_NAME} and start sharing trusted feedback`}
      footer={
        <>
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-primary-700 hover:text-primary-800">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
        {error && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        )}
        <Input
          id="name"
          label="Full Name"
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
        <Input
          id="password"
          label="Password"
          type="password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          required
          value={form.confirmPassword}
          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
        />
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'}
        </Button>
        <p className="text-center text-sm text-slate-500">
          Registering a company?{' '}
          <a href={`${BUSINESS_PORTAL_URL}/setup`} className="font-medium text-primary-700 hover:text-primary-800">
            Go to business portal
          </a>
        </p>
      </form>
    </AuthLayout>
  )
}
