import PageHeader from '../../components/common/PageHeader'
import Button from '../../components/common/Button'
import StarRating from '../../components/common/StarRating'
import { SAMPLE_BUSINESSES } from '../../data/sampleBusinesses'

export default function AdminBusinessesPage() {
  return (
    <div>
      <PageHeader title="Manage Businesses" description="View and manage business accounts" />
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700">Business</th>
              <th className="px-4 py-3 font-medium text-gray-700">Category</th>
              <th className="px-4 py-3 font-medium text-gray-700">Rating</th>
              <th className="px-4 py-3 font-medium text-gray-700">Plan</th>
              <th className="px-4 py-3 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {SAMPLE_BUSINESSES.map((biz) => (
              <tr key={biz.id} className="border-b border-gray-100">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={biz.logo}
                      alt=""
                      className="h-10 w-10 rounded-xl object-cover"
                      loading="lazy"
                    />
                    <span className="font-medium">{biz.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-gray-500">{biz.category}</td>
                <td className="px-4 py-3"><StarRating rating={biz.rating} size="sm" /></td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-primary-100 px-2 py-0.5 text-xs font-medium text-primary-800">
                    {biz.plan}
                  </span>
                </td>
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
