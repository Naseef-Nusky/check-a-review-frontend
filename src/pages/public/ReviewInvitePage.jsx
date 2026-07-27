import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { publicApi } from '../../services/api'

export default function ReviewInvitePage() {
  const { token } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated, isCustomer } = useAuth()
  const [invite, setInvite] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const writePath = invite
    ? `/businesses/${invite.business_id}/write-review?invite=${encodeURIComponent(token)}`
    : ''
  const invitePath = `/review-invite/${token}`

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    publicApi
      .getReviewInvite(token)
      .then((data) => {
        if (!active) return
        setInvite(data)
      })
      .catch((err) => {
        if (!active) return
        setError(err.message || 'Invitation not found')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [token])

  useEffect(() => {
    if (!invite || loading) return
    if (isAuthenticated && isCustomer) {
      navigate(writePath, { replace: true })
    }
  }, [invite, loading, isAuthenticated, isCustomer, navigate, writePath])

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center text-sm text-slate-500">
        Loading invitation...
      </div>
    )
  }

  if (error || !invite) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">Invitation unavailable</h1>
        <p className="mt-3 text-sm text-slate-600">{error || 'This invite link is invalid or expired.'}</p>
        <Link to="/" className="mt-6 inline-block text-sm font-semibold text-primary-600 hover:text-primary-700">
          Go to homepage
        </Link>
      </div>
    )
  }

  if (isAuthenticated && !isCustomer) {
    return (
      <div className="mx-auto max-w-lg px-4 py-16 text-center">
        <h1 className="text-2xl font-semibold text-slate-900">Customer account required</h1>
        <p className="mt-3 text-sm text-slate-600">
          Please sign in with a customer account to review {invite.business_name}.
        </p>
        <Link
          to={`/login?redirect=${encodeURIComponent(invitePath)}`}
          className="mt-6 inline-block text-sm font-semibold text-primary-600"
        >
          Switch account
        </Link>
      </div>
    )
  }

  return (
    <div className="bg-slate-100">
      <section className="mx-auto max-w-xl px-4 py-14 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-600">Review invitation</p>
          <h1 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
            You&apos;re invited to review {invite.business_name}
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            To leave a review, please log in or create a free Check A Review account. After that you&apos;ll go straight
            to the review form.
          </p>

          {invite.status === 'reviewed' && (
            <p className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
              This invitation was already used. You can still write a review if you haven&apos;t reviewed this business yet.
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              to={`/login?redirect=${encodeURIComponent(writePath)}`}
              className="inline-flex items-center justify-center rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-600"
            >
              Log in to review
            </Link>
            <Link
              to={`/register?redirect=${encodeURIComponent(writePath)}&email=${encodeURIComponent(invite.email || '')}`}
              className="inline-flex items-center justify-center rounded-full border-2 border-primary-500 px-6 py-3 text-sm font-semibold text-primary-600 transition hover:bg-primary-50"
            >
              Sign up to review
            </Link>
          </div>

          <p className="mt-6 text-xs text-slate-400">
            Invited email: {invite.email}
          </p>
        </div>
      </section>
    </div>
  )
}
