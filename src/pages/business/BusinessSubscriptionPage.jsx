import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import { SUBSCRIPTION_PLANS } from '../../utils/constants'

const plans = [
  { id: SUBSCRIPTION_PLANS.FREE, name: 'Free', price: '$0', features: ['Basic profile', '5 review invitations/mo', 'View reviews'] },
  { id: SUBSCRIPTION_PLANS.STARTER, name: 'Starter', price: '$29/mo', features: ['Everything in Free', 'Unlimited invitations', 'Reply to reviews', 'Basic analytics'], current: true },
  { id: SUBSCRIPTION_PLANS.PREMIUM, name: 'Premium', price: '$79/mo', features: ['Everything in Starter', 'Review widget', 'Advanced analytics', 'Priority support'] },
]

export default function BusinessSubscriptionPage() {
  return (
    <div>
      <PageHeader title="Subscription" description="Manage your plan and billing via Square" />
      <div className="grid gap-6 md:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`rounded-xl border p-6 ${
              plan.current
                ? 'border-primary-500 bg-primary-50 ring-2 ring-primary-500'
                : 'border-gray-200 bg-white'
            }`}
          >
            {plan.current && (
              <span className="rounded-full bg-primary-600 px-2 py-0.5 text-xs font-medium text-white">
                Current Plan
              </span>
            )}
            <h3 className="mt-2 text-xl font-bold text-gray-900">{plan.name}</h3>
            <p className="mt-1 text-3xl font-bold text-gray-900">{plan.price}</p>
            <ul className="mt-4 space-y-2">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                  <span className="text-primary-600">✓</span> {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.current ? 'secondary' : 'primary'}
              className="mt-6 w-full"
              disabled={plan.current}
            >
              {plan.current ? 'Current Plan' : 'Upgrade'}
            </Button>
          </div>
        ))}
      </div>
      <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-gray-900">Payment History</h2>
        <p className="mt-2 text-sm text-gray-500">Square payment history will appear here once connected.</p>
      </div>
    </div>
  )
}
