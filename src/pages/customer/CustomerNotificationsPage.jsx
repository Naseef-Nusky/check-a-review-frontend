import PageHeader from '../../components/common/PageHeader'

const notifications = [
  { id: 1, title: 'Review Published', message: 'Your review for Tech Solutions Inc has been published.', time: '2 hours ago', read: false },
  { id: 2, title: 'Business Reply', message: 'Green Cafe replied to your review.', time: '1 day ago', read: false },
  { id: 3, title: 'Review Confirmation', message: 'Your review is being analyzed by AI.', time: '3 days ago', read: true },
]

export default function CustomerNotificationsPage() {
  return (
    <div>
      <PageHeader title="Notifications" description="Stay updated on your reviews and activity" />
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`rounded-xl border p-4 ${
              notif.read
                ? 'border-gray-200 bg-white'
                : 'border-primary-200 bg-primary-50'
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-gray-900">{notif.title}</h3>
                <p className="mt-1 text-sm text-gray-600">{notif.message}</p>
              </div>
              <span className="shrink-0 text-xs text-gray-400">{notif.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
