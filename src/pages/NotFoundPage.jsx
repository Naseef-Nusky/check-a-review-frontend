import { Link } from 'react-router-dom'
import Button from '../components/common/Button'
import PageMeta from '../components/common/PageMeta'

export default function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <PageMeta
        title="Page not found"
        description="The page you are looking for does not exist on Check A Review."
        path="/404"
        robots="noindex, nofollow"
      />
      <h1 className="text-6xl font-bold text-gray-900">404</h1>
      <p className="mt-4 text-xl text-gray-600">Page not found</p>
      <p className="mt-2 text-gray-500">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link to="/" className="mt-8">
        <Button>Go Home</Button>
      </Link>
    </div>
  )
}
