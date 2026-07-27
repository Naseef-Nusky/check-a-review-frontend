import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

/** Password input with show/hide eye toggle */
export default function PasswordInput({
  id = 'password',
  label = 'Password',
  className = '',
  labelClassName = 'mb-1.5 block text-sm font-medium text-slate-700',
  wrapperClassName = '',
  labelRight = null,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={wrapperClassName}>
      {(label || labelRight) && (
        <div className="mb-1.5 flex items-center justify-between gap-2">
          {label ? (
            <label htmlFor={id} className={labelClassName}>
              {label}
            </label>
          ) : (
            <span />
          )}
          {labelRight}
        </div>
      )}
      <div className="relative">
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          className={`input-field pr-11 ${className}`}
          {...props}
        />
        <button
          type="button"
          onClick={() => setShowPassword((v) => !v)}
          className="absolute inset-y-0 right-0 flex items-center px-3 text-slate-400 hover:text-slate-700"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          tabIndex={-1}
        >
          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
        </button>
      </div>
    </div>
  )
}
