import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import PageMeta from '../../components/common/PageMeta'
import { publicApi } from '../../services/api'
import { BUSINESS_PORTAL_URL } from '../../utils/constants'

export default function ClaimVerifyPage() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') || ''
  const [status, setStatus] = useState('loading')
  const [message, setMessage] = useState('')
  const [businessName, setBusinessName] = useState('')

  useEffect(() => {
    let active = true
    if (!token) {
      setStatus('error')
      setMessage('Missing verification token.')
      return
    }
    publicApi
      .verifyBusinessClaimEmail(token)
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
  }, [token])

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
        {status === 'error' ? (
          <>
            <p className="text-sm font-semibold uppercase tracking-wide text-red-600">Verification failed</p>
            <h1 className="mt-2 text-2xl font-semibold text-ink">Could not verify</h1>
            <p className="mt-4 text-sm text-ink-muted">{message}</p>
            <Link to="/" className="mt-8 inline-flex text-sm font-semibold text-primary-700 hover:underline">
              Back to home
            </Link>
          </>
        ) : null}
      </div>
    </div>
  )
}
