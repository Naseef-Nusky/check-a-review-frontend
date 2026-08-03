import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import GoogleTranslate from './components/common/GoogleTranslate'
import AppRoutes from './routes/AppRoutes'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GoogleTranslate />
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  )
}
