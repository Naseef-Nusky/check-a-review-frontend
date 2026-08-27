import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { publicApi } from '../../services/api'
import AuthLayout from '../../components/common/AuthLayout'
import Button from '../../components/common/Button'
import PasswordInput from '../../components/common/PasswordInput'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token') || ''
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }
    if (!token) {
      setError('Invalid or missing reset link. Please request a new one.')
      return
    }

    setLoading(true)
    try {
      await publicApi.resetPassword(token, password)
      setDone(true)
      setTimeout(() => navigate('/login', { replace: true }), 2500)
    } catch (err) {
      setError(err.message || 'Could not reset password')
    } finally {
      setLoading(false)
    }
  }

  if (!token) {
    return (
      <AuthLayout
        title="Invalid reset link"
        subtitle="This password reset link is missing or invalid."
        footer={
          <Link to="/forgot-password" className="font-medium text-primary-700 hover:text-primary-800">
            Request a new reset link
          </Link>
        }
      >
        <div className="card p-6 sm:p-8">
          <p className="text-sm text-ink-muted">
            Reset links expire after one hour. Please request a new link and try again.
          </p>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout
      title="Choose a new password"
      subtitle="Enter a new password for your account"
      footer={
        <Link to="/login" className="font-medium text-primary-700 hover:text-primary-800">
          Back to sign in
        </Link>
      }
    >
      {done ? (
        <div className="card space-y-4 p-6 sm:p-8">
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            Your password has been updated. Redirecting you to sign in...
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}
          <PasswordInput
            id="password"
            label="New password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordInput
            id="confirmPassword"
            label="Confirm new password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Updating...' : 'Update password'}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
