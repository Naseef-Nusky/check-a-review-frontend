const tones = {
  default: 'bg-slate-100 text-slate-700',
  success: 'bg-emerald-50 text-emerald-700',
  warning: 'bg-amber-50 text-amber-700',
  danger: 'bg-red-50 text-red-700',
  brand: 'bg-primary-50 text-primary-700',
}

export default function Badge({ children, tone = 'default', className = '' }) {
  return (
    <span className={`badge ${tones[tone]} ${className}`}>
      {children}
    </span>
  )
}
