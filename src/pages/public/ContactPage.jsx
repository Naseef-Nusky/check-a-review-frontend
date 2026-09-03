import { useState } from 'react'
import { Mail, MapPin } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { ApiError, publicApi } from '../../services/api'
import { CONTACT_EMAIL } from '../../utils/constants'

const contactItems = [
  { label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
  { label: 'Office', value: '125 Deansgate, Greater Manchester M3 2BY', icon: MapPin },
]

const emptyForm = { name: '', email: '', subject: '', message: '' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateSimpleContact(form) {
  const errors = {}
  const name = String(form.name || '').trim()
  const email = String(form.email || '').trim()
  const subject = String(form.subject || '').trim()
  const message = String(form.message || '').trim()

  if (!name) errors.name = 'Please enter your name'
  else if (name.length > 120) errors.name = 'Name must be 120 characters or fewer'

  if (!email) errors.email = 'Please enter your email'
  else if (!EMAIL_RE.test(email)) errors.email = 'Enter a valid email address'
  else if (email.length > 254) errors.email = 'Email address is too long'

  if (!subject) errors.subject = 'Please enter a subject'
  else if (subject.length > 200) errors.subject = 'Subject must be 200 characters or fewer'

  if (!message) errors.message = 'Please enter a message'
  else if (message.length < 10) errors.message = 'Message must be at least 10 characters'
  else if (message.length > 5000) errors.message = 'Message must be 5000 characters or fewer'

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
    normalized: { name, email: email.toLowerCase(), subject, message },
  }
}

export default function ContactPage() {
  const [form, setForm] = useState(emptyForm)
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setFieldErrors((prev) => ({ ...prev, [field]: '' }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    const { errors, isValid, normalized } = validateSimpleContact(form)
    if (!isValid) {
      setFieldErrors(errors)
      return
    }

    setSubmitting(true)

    try {
      await publicApi.submitContact(normalized)
      setSuccess('Thank you for contacting us. We will get back to you shortly.')
      setForm(emptyForm)
      setFieldErrors({})
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        kicker="Support"
        title="Get in touch with us"
        description="Have questions about the platform, your account, or business listings? Our team is ready to help."
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <form noValidate onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
          {success ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {success}
            </div>
          ) : null}
          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
          <Input
            id="name"
            label="Name"
            type="text"
            required
            maxLength={120}
            value={form.name}
            onChange={update('name')}
            disabled={submitting}
            error={fieldErrors.name}
          />
          <Input
            id="email"
            label="Email"
            type="email"
            required
            maxLength={254}
            value={form.email}
            onChange={update('email')}
            disabled={submitting}
            error={fieldErrors.email}
          />
          <Input
            id="subject"
            label="Subject"
            type="text"
            required
            maxLength={200}
            value={form.subject}
            onChange={update('subject')}
            disabled={submitting}
            error={fieldErrors.subject}
          />
          <div>
            <label htmlFor="message" className="label-text text-slate-700">
              Message
            </label>
            <textarea
              id="message"
              rows={5}
              required
              maxLength={5000}
              value={form.message}
              onChange={update('message')}
              className={`input-field ${fieldErrors.message ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10' : ''}`}
              disabled={submitting}
              aria-invalid={fieldErrors.message ? 'true' : undefined}
              aria-describedby={fieldErrors.message ? 'message-error' : undefined}
            />
            {fieldErrors.message ? (
              <p id="message-error" className="mt-1.5 text-sm text-red-600">
                {fieldErrors.message}
              </p>
            ) : null}
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? 'Sending...' : 'Send Message'}
          </Button>
        </form>

        <div className="space-y-5">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-ink">Get in touch</h3>
            <dl className="mt-5 space-y-4">
              {contactItems.map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                    <item.icon className="h-4 w-4 stroke-[1.5]" strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">{item.label}</dt>
                    <dd className="mt-1 text-sm text-ink">
                      {item.href ? (
                        <a href={item.href} className="hover:text-primary-600">{item.value}</a>
                      ) : (
                        item.value
                      )}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
          <div className="rounded-2xl border border-primary-100 bg-primary-50 p-6">
            <h3 className="font-semibold text-ink">Business inquiries</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-muted">
              Interested in listing your business or upgrading your subscription? Visit the business portal to contact our sales team.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
