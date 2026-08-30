import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import GoogleTranslate from './components/common/GoogleTranslate'
import ScrollToTop from './components/common/ScrollToTop'
import SeoDefaults from './components/common/SeoDefaults'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SeoDefaults />
      <AuthProvider>
        <GoogleTranslate />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
