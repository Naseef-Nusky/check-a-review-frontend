import PageHeader from '../../components/common/PageHeader'

const subscriptions = [
  { business: 'Tech Solutions Inc', plan: 'Premium', status: 'Active', renews: 'Aug 1, 2026' },
  { business: 'Green Cafe', plan: 'Starter', status: 'Active', renews: 'Jul 15, 2026' },
  { business: 'FitLife Gym', plan: 'Premium', status: 'Active', renews: 'Jul 28, 2026' },
  { business: 'AutoCare Pro', plan: 'Free', status: 'Active', renews: '—' },
]

export default function AdminSubscriptionsPage() {
  return (
    <div>
      <PageHeader title="Subscription Plans" description="Manage business subscriptions" />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700">Business</th>
              <th className="px-4 py-3 font-medium text-gray-700">Plan</th>
              <th className="px-4 py-3 font-medium text-gray-700">Status</th>
              <th className="px-4 py-3 font-medium text-gray-700">Renews</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((sub) => (
              <tr key={sub.business} className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">{sub.business}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
                    {sub.plan}
                  </span>
                </td>
                <td className="px-4 py-3 text-green-600">{sub.status}</td>
                <td className="px-4 py-3 text-gray-500">{sub.renews}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
