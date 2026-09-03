import { Outlet } from 'react-router-dom'
import Header from '../components/common/Header'
import Footer from '../components/common/Footer'
import PublicRouteMeta from '../components/common/PublicRouteMeta'

export default function PublicLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicRouteMeta />
      <Header />
      <main className="min-w-0 flex-1 overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
