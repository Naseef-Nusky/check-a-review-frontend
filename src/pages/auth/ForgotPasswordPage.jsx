import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from '../../components/common/AuthLayout'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Password reset email sent! (Connect to backend API)')
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
      <form onSubmit={handleSubmit} className="card space-y-5 p-6 sm:p-8">
        <Input
          id="email"
          label="Email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" className="w-full">Send Reset Link</Button>
      </form>
    </AuthLayout>
  )
}
