import PageHeader from '../../components/common/PageHeader'

const payments = [
  { id: 'pi_001', business: 'Tech Solutions Inc', amount: '$79.00', plan: 'Premium', date: 'Jul 1, 2026', status: 'Succeeded' },
  { id: 'pi_002', business: 'Green Cafe', amount: '$29.00', plan: 'Starter', date: 'Jun 15, 2026', status: 'Succeeded' },
  { id: 'pi_003', business: 'FitLife Gym', amount: '$79.00', plan: 'Premium', date: 'Jun 28, 2026', status: 'Succeeded' },
]

export default function AdminPaymentsPage() {
  return (
    <div>
      <PageHeader title="Payments" description="Square payment history and transactions" />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700">Payment ID</th>
              <th className="px-4 py-3 font-medium text-gray-700">Business</th>
              <th className="px-4 py-3 font-medium text-gray-700">Amount</th>
              <th className="px-4 py-3 font-medium text-gray-700">Plan</th>
              <th className="px-4 py-3 font-medium text-gray-700">Date</th>
              <th className="px-4 py-3 font-medium text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr key={payment.id} className="border-b border-gray-100">
                <td className="px-4 py-3 font-mono text-xs">{payment.id}</td>
                <td className="px-4 py-3 font-medium">{payment.business}</td>
                <td className="px-4 py-3">{payment.amount}</td>
                <td className="px-4 py-3">{payment.plan}</td>
                <td className="px-4 py-3 text-gray-500">{payment.date}</td>
                <td className="px-4 py-3 text-green-600">{payment.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
