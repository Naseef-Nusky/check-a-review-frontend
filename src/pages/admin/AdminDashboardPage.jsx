import { Users, Building2, MessageSquare, DollarSign } from 'lucide-react'
import PageHeader from '../../components/common/PageHeader'

const stats = [
  { icon: Users, label: 'Total Users', value: '12,450', change: '+12%' },
  { icon: Building2, label: 'Total Businesses', value: '3,280', change: '+8%' },
  { icon: MessageSquare, label: 'Total Reviews', value: '48,920', change: '+15%' },
  { icon: DollarSign, label: 'Monthly Revenue', value: '$24,500', change: '+22%' },
]

export default function AdminDashboardPage() {
  return (
    <div>
      <PageHeader title="Admin Dashboard" description="Platform overview and statistics" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <stat.icon className="h-8 w-8 text-primary-600" />
            <p className="mt-2 text-2xl font-bold text-gray-900">{stat.value}</p>
            <div className="mt-1 flex items-center justify-between">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <span className="text-xs font-medium text-green-600">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          <ul className="mt-4 space-y-3 text-sm text-gray-600">
            <li>New business registered: Green Cafe</li>
            <li>Review flagged by AI: Spam detection</li>
            <li>Subscription upgraded: FitLife Gym → Premium</li>
            <li>New user registered: john@example.com</li>
          </ul>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">AI Flagged Reviews</h2>
          <p className="mt-2 text-3xl font-bold text-orange-600">7</p>
          <p className="text-sm text-gray-500">Pending admin review</p>
        </div>
      </div>
    </div>
  )
}
