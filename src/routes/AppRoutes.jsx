import { Routes, Route } from 'react-router-dom'

import PublicLayout from '../layouts/PublicLayout'
import CustomerLayout from '../layouts/CustomerLayout'
import AdminLayout from '../layouts/AdminLayout'
import BusinessPortalRedirect from '../components/common/BusinessPortalRedirect'

import HomePage from '../pages/public/HomePage'
import SearchPage from '../pages/public/SearchPage'
import BusinessProfilePage from '../pages/public/BusinessProfilePage'
import CategoriesPage from '../pages/public/CategoriesPage'
import LatestReviewsPage from '../pages/public/LatestReviewsPage'
import ContactPage from '../pages/public/ContactPage'

import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'

import CustomerDashboardPage from '../pages/customer/CustomerDashboardPage'
import CustomerProfilePage from '../pages/customer/CustomerProfilePage'
import CustomerNotificationsPage from '../pages/customer/CustomerNotificationsPage'

import AdminDashboardPage from '../pages/admin/AdminDashboardPage'
import AdminUsersPage from '../pages/admin/AdminUsersPage'
import AdminBusinessesPage from '../pages/admin/AdminBusinessesPage'
import AdminReviewsPage from '../pages/admin/AdminReviewsPage'
import AdminFlaggedReviewsPage from '../pages/admin/AdminFlaggedReviewsPage'
import AdminSubscriptionsPage from '../pages/admin/AdminSubscriptionsPage'
import AdminPaymentsPage from '../pages/admin/AdminPaymentsPage'
import AdminSettingsPage from '../pages/admin/AdminSettingsPage'

import NotFoundPage from '../pages/NotFoundPage'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="businesses/:id" element={<BusinessProfilePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="reviews" element={<LatestReviewsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      <Route path="business/setup" element={<BusinessPortalRedirect path="/setup" />} />
      <Route path="business-portal/*" element={<BusinessPortalRedirect path="/" />} />

      <Route path="customer" element={<CustomerLayout />}>
        <Route index element={<CustomerDashboardPage />} />
        <Route path="profile" element={<CustomerProfilePage />} />
        <Route path="notifications" element={<CustomerNotificationsPage />} />
      </Route>

      <Route path="admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboardPage />} />
        <Route path="users" element={<AdminUsersPage />} />
        <Route path="businesses" element={<AdminBusinessesPage />} />
        <Route path="reviews" element={<AdminReviewsPage />} />
        <Route path="flagged" element={<AdminFlaggedReviewsPage />} />
        <Route path="subscriptions" element={<AdminSubscriptionsPage />} />
        <Route path="payments" element={<AdminPaymentsPage />} />
        <Route path="settings" element={<AdminSettingsPage />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
