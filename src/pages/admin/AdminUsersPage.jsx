import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'

const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', reviews: 5, joined: 'Jan 2026' },
  { id: 2, name: 'Sarah Miller', email: 'sarah@example.com', reviews: 12, joined: 'Feb 2026' },
  { id: 3, name: 'Mike Ross', email: 'mike@example.com', reviews: 3, joined: 'Mar 2026' },
]

export default function AdminUsersPage() {
  return (
    <div>
      <PageHeader title="Manage Users" description="View and manage user accounts" />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700">Name</th>
              <th className="px-4 py-3 font-medium text-gray-700">Email</th>
              <th className="px-4 py-3 font-medium text-gray-700">Reviews</th>
              <th className="px-4 py-3 font-medium text-gray-700">Joined</th>
              <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-gray-100">
                <td className="px-4 py-3 font-medium">{user.name}</td>
                <td className="px-4 py-3 text-gray-500">{user.email}</td>
                <td className="px-4 py-3">{user.reviews}</td>
                <td className="px-4 py-3 text-gray-500">{user.joined}</td>
                <td className="px-4 py-3">
                  <Button size="sm" variant="ghost">View</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
