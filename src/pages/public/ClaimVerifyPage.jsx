import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageMeta from '../../components/common/PageMeta'
import { publicApi } from '../../services/api'
import { BUSINESS_PORTAL_URL } from '../../utils/constants'

export default function ClaimVerifyPage() {
  const [searchParams] = useSearchParams()
  const tokenFromUrl = searchParams.get('token') || searchParams.get('code') || ''
  const [status, setStatus] = useState(tokenFromUrl ? 'loading' : 'idle')
  const [message, setMessage] = useState('')
  const [businessName, setBusinessName] = useState('')
  const [code, setCode] = useState('')
  const [email, setEmail] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [resending, setResending] = useState(false)

  useEffect(() => {
    let active = true
    if (!tokenFromUrl) return undefined
    publicApi
      .verifyBusinessClaimEmail(tokenFromUrl)
      .then((data) => {
        if (!active) return
        setBusinessName(data.businessName || '')
        setStatus('success')
        setMessage(
          data.alreadyVerified
            ? 'Your email was already verified. Our team can continue reviewing your claim.'
            : 'Email verified. Your claim is now under review.',
        )
      })
      .catch((err) => {
        if (!active) return
        setStatus('error')
        setMessage(err.message || 'Verification failed')
      })
    return () => {
      active = false
    }
  }, [tokenFromUrl])

  const onSubmitCode = async (e) => {
    e.preventDefault()
    const value = String(code || '').trim()
    if (!value) {
      setStatus('error')
      setMessage('Enter the 6-digit verification code from your email.')
      return
    }
    setSubmitting(true)
    setStatus('loading')
    setMessage('')
    try {
      const data = await publicApi.verifyBusinessClaimEmail(value)
      setBusinessName(data.businessName || '')
      setStatus('success')
      setMessage(
        data.alreadyVerified
          ? 'Your email was already verified. Our team can continue reviewing your claim.'
          : 'Email verified. Your claim is now under review.',
      )
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Verification failed')
    } finally {
      setSubmitting(false)
    }
  }

  const onResend = async () => {
    if (!email.trim()) {
      setStatus('error')
      setMessage('Enter the email you used on the claim form to resend the code.')
      return
    }
    setResending(true)
    try {
      const data = await publicApi.resendClaimVerification(email.trim())
      setStatus('idle')
      setMessage(data.message || 'A new 6-digit code has been sent to your email.')
    } catch (err) {
      setStatus('error')
      setMessage(err.message || 'Could not resend code')
    } finally {
      setResending(false)
    }
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <PageMeta title="Verify claim email | Check A Review" path="/claim/verify" />
      <div className="rounded-3xl border border-border bg-white p-8 text-center shadow-sm">
        {status === 'loading' ? <p className="text-sm text-ink-muted">Verifying your email...</p> : null}
        {status === 'success' ? (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-600">Email verified</p>
            <h1 className="mt-2 text-2xl font-semibold text-ink">You&apos;re verified</h1>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted">
              {message}
              {businessName ? (
                <>
                  {' '}
                  Claim for <strong className="text-ink">{businessName}</strong>.
                </>
              ) : null}
            </p>
            <a
              href={`${BUSINESS_PORTAL_URL}/login`}
              className="mt-8 inline-flex rounded-full bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
            >
              Go to business login
            </a>
          </>
        ) : null}
        {status === 'error' || status === 'idle' ? (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Verify claim email</p>
            <h1 className="mt-2 text-2xl font-semibold text-ink">Enter your code</h1>
            <p className="mt-4 text-sm text-ink-muted">
              {message ||
                'We emailed a 6-digit verification code when you submitted your claim. Enter it below.'}
            </p>
            <form className="mt-6 space-y-4 text-left" onSubmit={onSubmitCode}>
              <label className="block">
                <span className="text-sm font-medium text-ink">6-digit code</span>
                <input
                  className="input-field mt-1.5"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="123456"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                />
              </label>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
              >
                {submitting ? 'Verifying...' : 'Verify email'}
              </button>
            </form>
            <div className="mt-6 space-y-3 border-t border-border pt-6 text-left">
              <label className="block">
                <span className="text-sm font-medium text-ink">Resend code to email</span>
                <input
                  type="email"
                  className="input-field mt-1.5"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                />
              </label>
              <button
                type="button"
                disabled={resending}
                onClick={onResend}
                className="text-sm font-semibold text-primary-700 hover:underline disabled:opacity-60"
              >
                {resending ? 'Sending...' : 'Resend verification code'}
              </button>
            </div>
            <Link to="/" className="mt-8 inline-flex text-sm font-semibold text-primary-700 hover:underline">
              Back to home
            </Link>
          </>
        ) : null}
      </div>
    </div>
  )
}
