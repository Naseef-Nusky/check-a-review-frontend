import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import PageMeta from '../../components/common/PageMeta'
import { publicApi } from '../../services/api'

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  jobTitle: '',
  relationship: '',
  verificationInfo: '',
  password: '',
  confirmPassword: '',
}

export default function ClaimBusinessPage() {
  const { id } = useParams()
  const [business, setBusiness] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [form, setForm] = useState(initialForm)
  const [files, setFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(null)

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')
    publicApi
      .getBusiness(id)
      .then((profile) => {
        if (!active) return
        setBusiness(profile)
        if (profile.claimed) {
          setError('This business profile has already been claimed.')
        }
      })
      .catch((err) => {
        if (active) setError(err.message || 'Business not found')
      })
      .finally(() => {
        if (active) setLoading(false)
      })
    return () => {
      active = false
    }
  }, [id])

  const onChange = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const onSubmit = async (e) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match')
      return
    }
    setSubmitting(true)
    setError('')
    try {
      const result = await publicApi.submitBusinessClaim(
        business.slug || business.id || id,
        {
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          jobTitle: form.jobTitle,
          relationship: form.relationship,
          verificationInfo: form.verificationInfo,
          password: form.password,
        },
        files,
      )
      setSubmitted(result)
    } catch (err) {
      setError(err.message || 'Failed to submit claim')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className="mx-auto max-w-3xl px-4 py-16 text-sm text-ink-muted">Loading...</div>
  }

  if (!business && error) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-10 text-center text-red-700">
          {error}
        </div>
      </div>
    )
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <PageMeta title={`Claim request submitted | Check A Review`} path={`/businesses/${id}/claim`} />
        <div className="rounded-3xl border border-border bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Claim request created</p>
          <h1 className="mt-2 text-3xl font-semibold text-ink">Check your email</h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">
            Your claim for <strong className="text-ink">{business.name}</strong> is pending. We sent a verification
            link to your email. After you verify, our team will review your request.
          </p>
          <p className="mt-3 text-sm text-ink-muted">Status: Pending · Email: Unverified until you click the link</p>
          <Link
            to={`/businesses/${business.slug || id}`}
            className="mt-8 inline-flex rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Back to profile
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:py-14">
      <PageMeta
        title={`Claim ${business?.name || 'business'} | Check A Review`}
        description={`Claim the Check A Review profile for ${business?.name || 'this business'}.`}
        path={`/businesses/${id}/claim`}
      />
      <div className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-600">Claim this business</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-ink">{business.name}</h1>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Tell us who you are and how you are connected to this business. After you submit, verify your email so we
          can review your claim.
        </p>

        {error ? (
          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
        ) : null}

        {!business.claimed ? (
          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            {[
              { key: 'fullName', label: 'Full name', type: 'text' },
              { key: 'email', label: 'Email', type: 'email' },
              { key: 'phone', label: 'Phone number', type: 'tel' },
              { key: 'jobTitle', label: 'Job title / position', type: 'text' },
              { key: 'relationship', label: 'Relationship with the business', type: 'text', placeholder: 'e.g. Owner, Manager, Marketing lead' },
            ].map((field) => (
              <label key={field.key} className="block">
                <span className="text-sm font-medium text-ink">{field.label}</span>
                <input
                  required
                  type={field.type}
                  className="input-field mt-1.5"
                  value={form[field.key]}
                  onChange={onChange(field.key)}
                  placeholder={field.placeholder || ''}
                />
              </label>
            ))}

            <label className="block">
              <span className="text-sm font-medium text-ink">Verification information</span>
              <textarea
                required
                rows={5}
                className="input-field mt-1.5"
                value={form.verificationInfo}
                onChange={onChange('verificationInfo')}
                placeholder="Describe how you can prove your connection (business email domain, phone, ownership docs, company registration, etc.)"
              />
            </label>

            <label className="block">
              <span className="text-sm font-medium text-ink">Supporting attachments (optional)</span>
              <input
                type="file"
                accept=".png,.jpg,.jpeg,.webp,.pdf,image/png,image/jpeg,image/webp,application/pdf"
                multiple
                className="mt-1.5 block w-full text-sm text-ink-muted file:mr-4 file:rounded-full file:border-0 file:bg-primary-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-primary-700 hover:file:bg-primary-100"
                onChange={(e) => {
                  const selected = Array.from(e.target.files || []).slice(0, 5)
                  setFiles(selected)
                }}
              />
              <p className="mt-1.5 text-xs text-ink-muted">
                Upload up to 5 files (PNG, JPG, WEBP, or PDF). Max 8MB each. Examples: company registration, utility bill,
                domain proof, or ID.
              </p>
              {files.length > 0 ? (
                <ul className="mt-2 space-y-1 text-xs text-ink">
                  {files.map((file) => (
                    <li key={`${file.name}-${file.size}`}>• {file.name}</li>
                  ))}
                </ul>
              ) : null}
            </label>

            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block">
                <span className="text-sm font-medium text-ink">Create dashboard password</span>
                <input
                  required
                  type="password"
                  minLength={8}
                  className="input-field mt-1.5"
                  value={form.password}
                  onChange={onChange('password')}
                />
              </label>
              <label className="block">
                <span className="text-sm font-medium text-ink">Confirm password</span>
                <input
                  required
                  type="password"
                  minLength={8}
                  className="input-field mt-1.5"
                  value={form.confirmPassword}
                  onChange={onChange('confirmPassword')}
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center rounded-full bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
            >
              {submitting ? 'Submitting...' : 'Submit claim request'}
            </button>
          </form>
        ) : null}
      </div>
    </div>
  )
}
