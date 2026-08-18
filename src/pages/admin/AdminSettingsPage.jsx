import { useState } from 'react'
import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: 'Check A Review',
    supportEmail: 'support@checkareview.com',
    aiModeration: true,
    autoPublishThreshold: '85',
    emailProvider: 'sendgrid',
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Settings saved! (Connect to backend API)')
  }

  return (
    <div>
      <PageHeader title="Website Settings" description="Configure platform settings" />
      <form onSubmit={handleSubmit} className="max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div>
          <label htmlFor="siteName" className="block text-sm font-medium text-gray-700">Site Name</label>
          <input
            id="siteName"
            type="text"
            value={settings.siteName}
            onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <div>
          <label htmlFor="supportEmail" className="block text-sm font-medium text-gray-700">Support Email</label>
          <input
            id="supportEmail"
            type="email"
            value={settings.supportEmail}
            onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <div className="flex items-center gap-3">
          <input
            id="aiModeration"
            type="checkbox"
            checked={settings.aiModeration}
            onChange={(e) => setSettings({ ...settings, aiModeration: e.target.checked })}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label htmlFor="aiModeration" className="text-sm font-medium text-gray-700">Enable AI Review Moderation</label>
        </div>
        <div>
          <label htmlFor="autoPublishThreshold" className="block text-sm font-medium text-gray-700">
            Auto-Publish Trust Threshold (%)
          </label>
          <input
            id="autoPublishThreshold"
            type="number"
            min="0"
            max="100"
            value={settings.autoPublishThreshold}
            onChange={(e) => setSettings({ ...settings, autoPublishThreshold: e.target.value })}
            className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
          />
        </div>
        <div>
          <label htmlFor="emailProvider" className="block text-sm font-medium text-gray-700">Email Provider</label>
          <input
            id="emailProvider"
            value="SendGrid"
            readOnly
            className="mt-1 w-full rounded-lg border border-gray-300 bg-gray-50 px-3 py-2 text-gray-600"
          />
        </div>
        <Button type="submit">Save Settings</Button>
      </form>
    </div>
  )
}
