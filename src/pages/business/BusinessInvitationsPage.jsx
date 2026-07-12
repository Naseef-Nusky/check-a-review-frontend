import { useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'

export default function BusinessInvitationsPage() {
  const [email, setEmail] = useState('')

  const handleSend = (e) => {
    e.preventDefault()
    alert(`Invitation sent to ${email}! (Connect to backend API)`)
    setEmail('')
  }

  return (
    <div>
      <PageHeader title="Review Invitations" description="Invite customers to leave a review" />
      <form onSubmit={handleSend} className="max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Customer Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="customer@example.com"
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <Button type="submit">Send Invitation</Button>
      </form>
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Recent Invitations</h2>
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 font-medium text-gray-700">Email</th>
                <th className="px-4 py-3 font-medium text-gray-700">Sent</th>
                <th className="px-4 py-3 font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { email: 'alice@example.com', sent: '2 days ago', status: 'Reviewed' },
                { email: 'bob@example.com', sent: '5 days ago', status: 'Pending' },
              ].map((inv) => (
                <tr key={inv.email} className="border-b border-gray-100">
                  <td className="px-4 py-3">{inv.email}</td>
                  <td className="px-4 py-3 text-gray-500">{inv.sent}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                      inv.status === 'Reviewed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {inv.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
