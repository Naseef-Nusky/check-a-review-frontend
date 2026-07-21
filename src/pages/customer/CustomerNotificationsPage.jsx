import PageHeader from '../../components/common/PageHeader'
import { SAMPLE_NOTIFICATIONS } from '../../data/sampleNotifications'

export default function CustomerNotificationsPage() {
  return (
    <div>
      <PageHeader title="Notifications" description="Stay updated on your reviews and activity" />
      <div className="space-y-3">
        {SAMPLE_NOTIFICATIONS.map((notif) => (
          <div
            key={notif.id}
            className={`rounded-xl border p-4 ${
              notif.read
                ? 'border-border bg-white'
                : 'border-primary-200 bg-primary-50'
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-medium text-slate-900">{notif.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{notif.message}</p>
              </div>
              <span className="shrink-0 text-xs text-slate-400">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
