import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import GoogleTranslate from './components/common/GoogleTranslate'
import ScrollToTop from './components/common/ScrollToTop'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <AuthProvider>
        <GoogleTranslate />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
