import { useState } from 'react'
import { Link } from 'react-router-dom'
import { publicApi } from '../../services/api'
import AuthLayout from '../../components/common/AuthLayout'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      await publicApi.forgotPassword(email.trim())
      setSent(true)
    } catch (err) {
      setError(err.message || 'Could not send reset link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter your email and we'll send you a secure reset link"
      footer={
        <Link to="/login" className="font-medium text-primary-700 hover:text-primary-800">
          Back to sign in
        </Link>
      }
    >
      {sent ? (
        <div className="card space-y-4 p-6 sm:p-8">
          <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            If an account exists for <strong>{email}</strong>, a password reset link has been sent.
            Check your inbox and spam folder.
          </div>
          <Link
            to="/login"
            className="block text-center text-sm font-medium text-primary-700 hover:text-primary-800"
          >
            Return to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
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
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>
      )}
    </AuthLayout>
  )
}
