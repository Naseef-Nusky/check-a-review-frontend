import { useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'

export default function BusinessProfileManagePage() {
  const [form, setForm] = useState({
    name: 'Tech Solutions Inc',
    category: 'Technology',
    description: 'Leading technology solutions provider.',
    website: 'https://techsolutions.example.com',
    email: 'contact@techsolutions.example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Tech Street, San Francisco, CA',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Business profile updated! (Connect to backend API)')
  }

  return (
    <div>
      <PageHeader title="Company Profile" description="Manage your business information" />
      <form onSubmit={handleSubmit} className="max-w-2xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        {Object.entries({
          name: 'Business Name',
          category: 'Category',
          website: 'Website',
          email: 'Email',
          phone: 'Phone',
          address: 'Address',
        }).map(([key, label]) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700">{label}</label>
            <input
              id={key}
              type="text"
              value={form[key]}
              onChange={(e) => setForm({ ...form, [key]: e.target.value })}
              className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
            />
          </div>
        ))}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <Button type="submit">Save Profile</Button>
      </form>
    </div>
  )
}
