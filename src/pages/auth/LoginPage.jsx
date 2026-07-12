import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { APP_NAME } from '../../utils/constants'
import AuthLayout from '../../components/common/AuthLayout'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    login({ id: 1, name: 'Demo User', email, role: 'customer' }, 'demo-token')
    navigate('/customer')
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle={`Sign in to your ${APP_NAME} account`}
      footer={
        <>
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-medium text-primary-700 hover:text-primary-800">
            Sign up
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
        <Input
          id="email"
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label htmlFor="password" className="text-sm font-medium text-slate-700">Password</label>
            <Link to="/forgot-password" className="text-sm font-medium text-primary-700 hover:text-primary-800">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <Button type="submit" className="w-full">Sign in</Button>
      </form>
    </AuthLayout>
  )
}
