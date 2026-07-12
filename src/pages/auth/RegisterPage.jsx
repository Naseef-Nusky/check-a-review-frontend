import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { APP_NAME } from '../../utils/constants'
import AuthLayout from '../../components/common/AuthLayout'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

export default function RegisterPage() {
  const [searchParams] = useSearchParams()
  const defaultType = searchParams.get('type') === 'business' ? 'business' : 'customer'
  const [accountType, setAccountType] = useState(defaultType)
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(`Registration submitted for ${accountType} account. Connect to backend API.`)
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
      <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl border border-border bg-slate-50 p-1">
        {['customer', 'business'].map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setAccountType(type)}
            className={`rounded-xl py-2.5 text-sm font-medium capitalize transition ${
              accountType === type ? 'bg-white text-ink shadow-sm' : 'text-ink-muted hover:text-ink'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
        <Input
          id="name"
          label={accountType === 'business' ? 'Business Name' : 'Full Name'}
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
        <Button type="submit" className="w-full">
          {accountType === 'business' ? 'Register Business' : 'Create Account'}
        </Button>
      </form>
    </AuthLayout>
  )
}
