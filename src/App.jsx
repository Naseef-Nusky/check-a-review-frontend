import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/common/ScrollToTop'
import SeoDefaults from './components/common/SeoDefaults'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SeoDefaults />
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
