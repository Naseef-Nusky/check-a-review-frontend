import { Check } from 'lucide-react'

const steps = [
  { id: 1, label: 'Business details' },
  { id: 2, label: 'Additional details' },
  { id: 3, label: 'Personal details' },
  { id: 4, label: 'Activate account' },
]

export default function OnboardingStepper({ currentStep, variant = 'light' }) {
  const dark = variant === 'dark'

  return (
    <nav aria-label="Business setup progress" className="hidden items-center gap-5 lg:flex">
      {steps.map((step, index) => {
        const done = currentStep > step.id
        const active = currentStep === step.id

        return (
          <div key={step.id} className="flex items-center gap-5">
            <div className="flex items-center gap-2.5">
              <span
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition ${
                  done
                    ? 'bg-primary-500 text-white'
                    : active
                      ? dark
                        ? 'bg-white text-slate-900'
                        : 'bg-slate-900 text-white'
                      : dark
                        ? 'border border-slate-600 text-slate-400'
                        : 'border border-slate-300 bg-white text-slate-400'
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} aria-hidden="true" /> : step.id}
              </span>
              <span
                className={`text-sm ${
                  active
                    ? dark
                      ? 'font-semibold text-white'
                      : 'font-semibold text-slate-900'
                    : done
                      ? dark
                        ? 'font-medium text-slate-200'
                        : 'font-medium text-slate-700'
                      : dark
                        ? 'text-slate-500'
                        : 'text-slate-400'
                }`}
              >
                {step.label}
              </span>
            </div>
            {index < steps.length - 1 && (
              <span className={`h-px w-5 ${dark ? 'bg-slate-700' : 'bg-slate-200'}`} aria-hidden="true" />
            )}
          </div>
        )
      })}
    </nav>
  )
}

export function OnboardingStepperMobile({ currentStep, variant = 'light' }) {
  const step = steps.find((s) => s.id === currentStep) || steps[0]
  const dark = variant === 'dark'

  return (
    <div className="flex items-center gap-3 lg:hidden">
      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
          dark ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
        }`}
      >
        {step.id}
      </span>
      <div>
        <p className={`text-xs font-medium uppercase tracking-wide ${dark ? 'text-slate-500' : 'text-slate-400'}`}>
          Step {step.id} of {steps.length}
        </p>
        <p className={`text-sm font-semibold ${dark ? 'text-white' : 'text-slate-900'}`}>{step.label}</p>
      </div>
    </div>
  )
}
