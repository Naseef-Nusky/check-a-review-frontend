import { Routes, Route } from 'react-router-dom'

import PublicLayout from '../layouts/PublicLayout'
import CustomerLayout from '../layouts/CustomerLayout'
import AdminLayout from '../layouts/AdminLayout'
import BusinessPortalRedirect from '../components/common/BusinessPortalRedirect'

import HomePage from '../pages/public/HomePage'
import SearchPage from '../pages/public/SearchPage'
import BusinessProfilePage from '../pages/public/BusinessProfilePage'
import WriteReviewPage from '../pages/public/WriteReviewPage'
import ReviewInvitePage from '../pages/public/ReviewInvitePage'
import CategoriesPage from '../pages/public/CategoriesPage'
import LatestReviewsPage from '../pages/public/LatestReviewsPage'
import ContactPage from '../pages/public/ContactPage'
import ReviewTipsPage from '../pages/public/ReviewTipsPage'
import AboutUsPage from '../pages/public/AboutUsPage'
import TrustCentrePage from '../pages/public/TrustCentrePage'
import HelpCenterPage from '../pages/public/HelpCenterPage'
import HelpReviewersPage from '../pages/public/HelpReviewersPage'
import HelpBusinessesPage from '../pages/public/HelpBusinessesPage'
import PrivacyPolicyPage from '../pages/public/PrivacyPolicyPage'
import TermsConsumersPage from '../pages/public/TermsConsumersPage'
import TermsBusinessPage from '../pages/public/TermsBusinessPage'

import LoginPage from '../pages/auth/LoginPage'
import RegisterPage from '../pages/auth/RegisterPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'
import ResetPasswordPage from '../pages/auth/ResetPasswordPage'
import VerifyEmailPage from '../pages/auth/VerifyEmailPage'

import CustomerDashboardPage from '../pages/customer/CustomerDashboardPage'
import CustomerProfilePage from '../pages/customer/CustomerProfilePage'
import CustomerReviewsPage from '../pages/customer/CustomerReviewsPage'
import CustomerSettingsPage from '../pages/customer/CustomerSettingsPage'
import CustomerNotificationsPage from '../pages/customer/CustomerNotificationsPage'
import EditReviewPage from '../pages/customer/EditReviewPage'

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
        <Route path="businesses/:id/write-review" element={<WriteReviewPage />} />
        <Route path="review-invite/:token" element={<ReviewInvitePage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="reviews" element={<LatestReviewsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="about" element={<AboutUsPage />} />
        <Route path="trust-centre" element={<TrustCentrePage />} />
        <Route path="help" element={<HelpCenterPage />} />
        <Route path="help/reviewers" element={<HelpReviewersPage />} />
        <Route path="help/businesses" element={<HelpBusinessesPage />} />
        <Route path="review-tips" element={<ReviewTipsPage />} />
        <Route path="privacy" element={<PrivacyPolicyPage />} />
        <Route path="terms" element={<TermsConsumersPage />} />
        <Route path="terms/business" element={<TermsBusinessPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="verify-email" element={<VerifyEmailPage />} />
        <Route path="forgot-password" element={<ForgotPasswordPage />} />
        <Route path="reset-password" element={<ResetPasswordPage />} />
      </Route>

      <Route path="business/setup" element={<BusinessPortalRedirect path="/setup" />} />
      <Route path="business-portal/*" element={<BusinessPortalRedirect path="/" />} />

      <Route path="users" element={<CustomerLayout />}>
        <Route index element={<CustomerDashboardPage />} />
        <Route path="profile" element={<CustomerProfilePage />} />
        <Route path="reviews" element={<CustomerReviewsPage />} />
        <Route path="reviews/:reviewId/edit" element={<EditReviewPage />} />
        <Route path="settings" element={<CustomerSettingsPage />} />
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
