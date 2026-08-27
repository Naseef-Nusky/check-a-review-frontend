import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Info } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import OnboardingStepper, { OnboardingStepperMobile } from '../../components/business/OnboardingStepper'
import OnboardingTestimonial from '../../components/business/OnboardingTestimonial'

const categories = [
  'Technology',
  'Food & Drink',
  'Health & Fitness',
  'Retail',
  'Automotive',
  'Travel',
  'Finance',
  'Education',
  'Other',
]

const companySizes = ['1-9', '10-49', '50-249', '250-999', '1000+']

const initialForm = {
  businessName: '',
  website: '',
  category: '',
  jobTitle: '',
  companySize: '',
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
}

export default function BusinessOnboardingPage() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [sent, setSent] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const validateStep = () => {
    const next = {}

    if (step === 1) {
      if (!form.businessName.trim()) next.businessName = 'Please enter your business name'
      if (!form.website.trim()) next.website = 'Please enter your website'
      if (!form.category) next.category = 'Please select a category'
    }

    if (step === 2) {
      if (!form.jobTitle.trim()) next.jobTitle = 'Please enter your job title'
      if (!form.companySize) next.companySize = 'Please select company size'
    }

    if (step === 3) {
      if (!form.firstName.trim()) next.firstName = 'Please enter your first name'
      if (!form.lastName.trim()) next.lastName = 'Please enter your last name'
      if (!form.phone.trim()) next.phone = 'Please enter your phone number'
    }

    if (step === 4) {
      if (!form.email.trim()) next.email = 'Please enter your email address'
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address'
      if (!form.password || form.password.length < 6) next.password = 'Password must be at least 6 characters'
      if (form.password !== form.confirmPassword) next.confirmPassword = 'Passwords do not match'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleNext = (e) => {
    e.preventDefault()
    if (!validateStep()) return

    if (step < 4) {
      setStep((s) => s + 1)
      return
    }

    const fullName = `${form.firstName} ${form.lastName}`.trim()
    login(
      {
        id: Date.now(),
        name: fullName,
        email: form.email,
        role: 'business',
        businessName: form.businessName,
        website: form.website,
        category: form.category,
        jobTitle: form.jobTitle,
        companySize: form.companySize,
        phone: form.phone,
      },
      'demo-business-token'
    )
    setSent(true)
  }

  const titles = {
    1: 'Tell us about your business',
    2: 'A few more details help us customize your experience',
    3: 'Now, add your personal details',
    4: 'Create your account to get started',
  }

  if (sent) {
    return (
      <div className="min-h-screen bg-slate-50">
        <header className="border-b border-slate-800 bg-slate-950">
          <div className="mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6">
            <Link to="/">
              <img src="/logo-check-a-review.png" alt="Check A Review" className="h-9 w-auto object-contain" />
            </Link>
          </div>
        </header>
        <main className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-500 text-2xl font-bold text-white">
            ✓
          </span>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-slate-900">
            Your business profile is ready
          </h1>
          <p className="mt-3 text-slate-600">
            Welcome, {form.firstName}. We saved {form.businessName} and opened your business portal.
          </p>
          <Button className="mt-8" onClick={() => navigate('/business-portal')}>
            Go to dashboard
          </Button>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-800 bg-slate-950">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
          <Link to="/" className="shrink-0">
            <img
              src="/logo-check-a-review.png"
              alt="Check A Review"
              className="h-9 w-auto object-contain"
            />
          </Link>
          <OnboardingStepper currentStep={step} variant="dark" />
          <OnboardingStepperMobile currentStep={step} variant="dark" />
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-12 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_380px] lg:py-16">
        <section>
          <h1 className="max-w-xl text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
            {titles[step]}
          </h1>

          <form onSubmit={handleNext} className="mt-8 max-w-xl space-y-5">
            {step === 1 && (
              <>
                <Field error={errors.businessName}>
                  <Input
                    id="businessName"
                    label="Business name"
                    required
                    value={form.businessName}
                    onChange={update('businessName')}
                    className={errors.businessName ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10' : ''}
                  />
                </Field>
                <Field error={errors.website}>
                  <Input
                    id="website"
                    label="Website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    required
                    value={form.website}
                    onChange={update('website')}
                    className={errors.website ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10' : ''}
                  />
                </Field>
                <Field error={errors.category}>
                  <label htmlFor="category" className="label-text text-slate-700">Category</label>
                  <select
                    id="category"
                    required
                    value={form.category}
                    onChange={update('category')}
                    className={`input-field ${errors.category ? 'border-red-400' : ''}`}
                  >
                    <option value="">Select a category</option>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </Field>
              </>
            )}

            {step === 2 && (
              <>
                <Field error={errors.jobTitle}>
                  <Input
                    id="jobTitle"
                    label="Your job title"
                    required
                    value={form.jobTitle}
                    onChange={update('jobTitle')}
                    className={errors.jobTitle ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10' : ''}
                  />
                </Field>
                <Field error={errors.companySize}>
                  <label htmlFor="companySize" className="label-text text-slate-700">Number of employees</label>
                  <select
                    id="companySize"
                    required
                    value={form.companySize}
                    onChange={update('companySize')}
                    className={`input-field ${errors.companySize ? 'border-red-400' : ''}`}
                  >
                    <option value="">Select company size</option>
                    {companySizes.map((size) => (
                      <option key={size} value={size}>{size}</option>
                    ))}
                  </select>
                </Field>
                <InfoNote>
                  These details help us tailor review invitations, analytics, and plan recommendations for your team.
                </InfoNote>
              </>
            )}

            {step === 3 && (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field error={errors.firstName}>
                    <Input
                      id="firstName"
                      label="First name"
                      required
                      value={form.firstName}
                      onChange={update('firstName')}
                      className={errors.firstName ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10' : ''}
                    />
                  </Field>
                  <Field error={errors.lastName}>
                    <Input
                      id="lastName"
                      label="Last name"
                      required
                      value={form.lastName}
                      onChange={update('lastName')}
                      className={errors.lastName ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10' : ''}
                    />
                  </Field>
                </div>
                <Field error={errors.phone}>
                  <Input
                    id="phone"
                    label="Phone number"
                    type="tel"
                    required
                    value={form.phone}
                    onChange={update('phone')}
                    className={errors.phone ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10' : ''}
                  />
                </Field>
              </>
            )}

            {step === 4 && (
              <>
                <Field error={errors.email}>
                  <Input
                    id="email"
                    label="Work email address"
                    type="email"
                    required
                    value={form.email}
                    onChange={update('email')}
                    className={errors.email ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10' : ''}
                  />
                </Field>
                <InfoNote>
                  Use your work email for faster verification. We’ll use it for account access and review invitations.
                </InfoNote>
                <Field error={errors.password}>
                  <Input
                    id="password"
                    label="Password"
                    type="password"
                    required
                    value={form.password}
                    onChange={update('password')}
                    className={errors.password ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10' : ''}
                  />
                </Field>
                <Field error={errors.confirmPassword}>
                  <Input
                    id="confirmPassword"
                    label="Confirm password"
                    type="password"
                    required
                    value={form.confirmPassword}
                    onChange={update('confirmPassword')}
                    className={errors.confirmPassword ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10' : ''}
                  />
                </Field>
              </>
            )}

            <div className="flex items-center justify-between gap-3 pt-4">
              {step > 1 ? (
                <Button
                  type="button"
                  variant="outline"
                  className="border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white"
                  onClick={() => setStep((s) => s - 1)}
                >
                  Back
                </Button>
              ) : (
                <Link
                  to="/login"
                  className="text-sm font-medium text-slate-500 hover:text-slate-800"
                >
                  Already have an account?
                </Link>
              )}
              <Button type="submit">
                {step === 4 ? 'Create account' : 'Next'}
              </Button>
            </div>
          </form>

          <p className="mt-10 max-w-xl text-xs leading-relaxed text-slate-400">
            By continuing, you agree to our{' '}
            <Link to="/terms/business" className="text-slate-300 underline-offset-2 hover:text-white hover:underline">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="text-slate-300 underline-offset-2 hover:text-white hover:underline">
              Privacy Policy
            </Link>
            . We use your details to set up your business profile and review collection tools.
          </p>
        </section>

        <OnboardingTestimonial step={step} />
      </main>
    </div>
  )
}

function Field({ children, error }) {
  return (
    <div>
      {children}
      {error && <p className="mt-1.5 text-sm text-red-600">{error}</p>}
    </div>
  )
}

function InfoNote({ children }) {
  return (
    <div className="flex gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-600">
      <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary-500" strokeWidth={1.5} aria-hidden="true" />
      <p>{children}</p>
    </div>
  )
}
