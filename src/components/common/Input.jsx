import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export default function Input({ label, id, className = '', type = 'text', error = '', ...props }) {
  const [showPassword, setShowPassword] = useState(false)
  const isPassword = type === 'password'
  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type

  return (
    <div>
      {label && (
        <label htmlFor={id} className="label-text text-slate-700">
          {label}
        </label>
      )}
      <div className={isPassword ? 'relative' : undefined}>
        <input
          id={id}
          type={inputType}
          className={`input-field ${isPassword ? 'pr-11' : ''} ${error ? 'border-red-400 focus:border-red-400 focus:ring-red-500/10' : ''} ${className}`}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-700"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            tabIndex={-1}
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  )
}
