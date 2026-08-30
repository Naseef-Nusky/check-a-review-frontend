import { useState } from 'react'
import { Mail, MapPin, Phone } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import { ApiError, publicApi } from '../../services/api'
import { CONTACT_EMAIL } from '../../utils/constants'

const contactItems = [
  { label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, icon: Mail },
  { label: 'Phone', value: '+1 (800) 123-4567', icon: Phone },
  { label: 'Office', value: '123 Review Street, New York, NY', icon: MapPin },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')

    try {
      await publicApi.submitContact({
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        message: form.message.trim(),
      })
      setSuccess('Thank you for contacting us. We will get back to you shortly.')
      setForm({ name: '', email: '', subject: '', message: '' })
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
        title="Contact us"
        description="Have questions about the platform, your account, or business listings? Our team is ready to help."
      />
      <div className="grid gap-8 lg:grid-cols-2">
        <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
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
          <Input id="name" label="Name" type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} disabled={submitting} />
          <Input id="email" label="Email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} disabled={submitting} />
          <Input id="subject" label="Subject" type="text" required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} disabled={submitting} />
          <div>
            <label htmlFor="message" className="label-text">Message</label>
            <textarea
              id="message"
              rows={5}
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="input-field"
              disabled={submitting}
            />
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
              Interested in listing your business or upgrading your subscription? Our team can guide you through onboarding and growth options.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
