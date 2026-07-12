import { useSearchParams, Link } from 'react-router-dom'
import PageHeader from '../../components/common/PageHeader'
import { CategoryIcon } from '../../components/common/AppIcon'
import { getCategoryIcon } from '../../utils/categoryIcons'

const categories = [
  { name: 'Technology', count: 1240 },
  { name: 'Food & Drink', count: 890 },
  { name: 'Health & Fitness', count: 654 },
  { name: 'Retail', count: 1102 },
  { name: 'Automotive', count: 432 },
  { name: 'Travel', count: 567 },
  { name: 'Finance', count: 321 },
  { name: 'Education', count: 278 },
  { name: 'Real Estate', count: 445 },
  { name: 'Entertainment', count: 389 },
  { name: 'Beauty & Spa', count: 512 },
  { name: 'Home Services', count: 678 },
]

export default function CategoriesPage() {
  const [searchParams] = useSearchParams()
  const selected = searchParams.get('cat')

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <PageHeader
        kicker="Explore"
        title="Browse categories"
        description="Explore businesses by industry and category"
      />
      {selected && (
        <p className="mb-6 rounded-xl border border-primary-100 bg-primary-50 px-4 py-3 text-sm text-primary-800">
          Viewing category: <strong>{selected}</strong>
        </p>
      )}
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => {
          const Icon = getCategoryIcon(cat.name)
          return (
            <Link
              key={cat.name}
              to={`/search?q=${encodeURIComponent(cat.name)}`}
              className="card card-hover flex items-center gap-4 p-5"
            >
              <CategoryIcon icon={Icon} />
              <div>
                <h3 className="font-semibold text-ink">{cat.name}</h3>
                <p className="text-sm text-ink-muted">{cat.count} businesses</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
