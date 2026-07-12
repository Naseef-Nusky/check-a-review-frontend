import { useSearchParams } from 'react-router-dom'
import SearchBar from '../../components/common/SearchBar'
import BusinessCard from '../../components/business/BusinessCard'
import PageHeader from '../../components/common/PageHeader'

const mockResults = [
  { id: 1, name: 'Tech Solutions Inc', category: 'Technology', rating: 4.8, reviewCount: 234 },
  { id: 2, name: 'Digital Works', category: 'Technology', rating: 4.3, reviewCount: 89 },
  { id: 3, name: 'Cloud Services Ltd', category: 'Technology', rating: 4.6, reviewCount: 156 },
]

export default function SearchPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Find Businesses"
        description="Search for companies and read verified customer reviews"
      />
      <SearchBar className="max-w-2xl" />
      {query && (
        <p className="mt-4 text-sm text-gray-500">
          Showing results for &quot;{query}&quot;
        </p>
      )}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {mockResults.map((business) => (
          <BusinessCard key={business.id} business={business} />
        ))}
      </div>
    </div>
  )
}
