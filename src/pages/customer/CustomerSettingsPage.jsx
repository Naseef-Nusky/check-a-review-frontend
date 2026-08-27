import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { publicApi } from '../../services/api'
import Button from '../../components/common/Button'
import ProfileAvatar from '../../components/common/ProfileAvatar'
import PasswordInput from '../../components/common/PasswordInput'
import { resolveMediaUrl } from '../../utils/constants'
import { DEFAULT_LANGUAGE, LANGUAGES } from '../../utils/languages'
import { applyGoogleTranslate, getSavedSiteLanguage } from '../../utils/googleTranslate'

const COUNTRIES = [
  'Sri Lanka',
  'United States',
  'United Kingdom',
  'Canada',
  'Australia',
  'India',
  'United Arab Emirates',
]

function prefsKey(userId) {
  return `user_settings_${userId || 'guest'}`
}

function loadPrefs(userId) {
  try {
    const raw = localStorage.getItem(prefsKey(userId))
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export default function CustomerSettingsPage() {
  const { user, login, logout } = useAuth()
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const saved = useMemo(() => loadPrefs(user?.id), [user?.id])

  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    country: saved?.country || 'Sri Lanka',
    language: saved?.language || getSavedSiteLanguage() || DEFAULT_LANGUAGE,
  })
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || '')
  const [reviewCount, setReviewCount] = useState(0)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [changingPassword, setChangingPassword] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordError, setPasswordError] = useState('')

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      name: user?.name || '',
      email: user?.email || '',
    }))
    setAvatarUrl(user?.avatar_url || '')
  }, [user])

  useEffect(() => {
    let active = true
    publicApi
      .getMyReviews()
      .then((data) => {
        if (!active) return
        setReviewCount(Array.isArray(data) ? data.length : 0)
      })
      .catch(() => {
        if (!active) return
        setReviewCount(0)
      })
    return () => {
      active = false
    }
  }, [])

  const needsPassword = user?.has_password === false

  const syncUser = (updated) => {
    const token = localStorage.getItem('token')
    const next = { ...user, ...updated }
    login(next, token)
    setAvatarUrl(next.avatar_url || '')
  }

  const updateField = (field) => (e) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleUploadClick = () => fileInputRef.current?.click()

  const handleAvatarSelected = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file) return

    setUploading(true)
    setError('')
    setMessage('')
    try {
      const updated = await publicApi.uploadAvatar(file)
      syncUser(updated)
      setMessage('Profile picture updated.')
    } catch (err) {
      setError(err.message || 'Failed to upload profile picture')
    } finally {
      setUploading(false)
    }
  }

  const handleRemoveAvatar = async () => {
    setUploading(true)
    setError('')
    setMessage('')
    try {
      const updated = await publicApi.removeAvatar()
      syncUser(updated)
      setMessage('Profile picture removed. Showing your name initials.')
    } catch (err) {
      setError(err.message || 'Failed to remove profile picture')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const updated = await publicApi.updateProfile({ name: form.name.trim() })
      syncUser(updated)
      localStorage.setItem(
        prefsKey(user?.id),
        JSON.stringify({
          country: form.country,
          language: form.language,
        }),
      )
      setMessage('Your information has been saved. Applying language…')
      applyGoogleTranslate(form.language, { reload: true })
    } catch (err) {
      setError(err.message || 'Failed to save settings')
      setSaving(false)
    }
  }

  const handleChangePassword = async (e) => {
    e.preventDefault()
    setPasswordError('')
    setPasswordMessage('')

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('Passwords do not match')
      return
    }
    if (passwordForm.newPassword.length < 8) {
      setPasswordError('Password must be at least 8 characters')
      return
    }

    setChangingPassword(true)
    try {
      const payload = { password: passwordForm.newPassword }
      if (!needsPassword) {
        payload.currentPassword = passwordForm.currentPassword
      }

      // Backend invalidates other sessions and returns a fresh token for this device
      const result = await publicApi.changePassword(payload)
      if (!result?.user || !result?.token) {
        throw new Error('Password saved, but session refresh failed. Please sign in again.')
      }

      login(result.user, result.token)
      setAvatarUrl(result.user.avatar_url || '')
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setPasswordMessage(
        result.first_password
          ? 'Password added. You can now also sign in with email.'
          : 'Password updated successfully.',
      )
    } catch (err) {
      setPasswordError(err.message || (needsPassword ? 'Failed to add password' : 'Failed to update password'))
    } finally {
      setChangingPassword(false)
    }
  }

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      'Delete your account permanently?\n\nThis removes your profile and reviews from Check A Review. This cannot be undone.',
    )
    if (!confirmed) return

    setDeleting(true)
    setError('')
    setMessage('')
    try {
      await publicApi.deleteAccount()
      try {
        localStorage.removeItem(prefsKey(user?.id))
      } catch {
        /* ignore */
      }
      logout()
      navigate('/', { replace: true })
    } catch (err) {
      setError(err.message || 'Failed to delete account')
      setDeleting(false)
    }
  }

  const displayName = form.name || user?.name || 'User'
  const avatarSrc = resolveMediaUrl(avatarUrl)

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-3xl border border-border bg-white shadow-sm">
        <div className="flex flex-col gap-6 px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div className="flex items-center gap-4">
            <ProfileAvatar name={displayName} src={avatarSrc} size="xl" />
            <div>
              <h1 className="text-2xl font-semibold text-ink">{displayName}</h1>
              <p className="mt-1 text-sm text-ink-muted">{user?.email}</p>
            </div>
          </div>
          <div className="flex gap-8">
            <Link to="/users/reviews" className="text-center">
              <p className="text-2xl font-semibold tabular-nums text-ink">{reviewCount}</p>
              <p className="text-sm text-ink-muted">{reviewCount === 1 ? 'Review' : 'Reviews'}</p>
            </Link>
            <div className="text-center">
              <p className="text-2xl font-semibold tabular-nums text-ink">—</p>
              <p className="text-sm text-ink-muted">Read</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-semibold tabular-nums text-ink">—</p>
              <p className="text-sm text-ink-muted">Useful</p>
            </div>
          </div>
        </div>
      </section>

      <div className="space-y-6">
          <form onSubmit={handleSave} className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-ink">Personal settings</h2>
            <p className="mt-1 text-sm text-ink-muted">Update your profile picture, name, and preferences.</p>

            {error && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
            )}
            {message && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">{message}</div>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <ProfileAvatar name={displayName} src={avatarSrc} size="lg" />
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarSelected}
              />
              <Button type="button" variant="secondary" onClick={handleUploadClick} disabled={uploading || saving}>
                {uploading ? 'Uploading...' : avatarUrl ? 'Change profile picture' : 'Upload a profile picture'}
              </Button>
              {avatarUrl ? (
                <button
                  type="button"
                  className="text-sm font-medium text-slate-500 hover:text-slate-800 disabled:opacity-50"
                  onClick={handleRemoveAvatar}
                  disabled={uploading || saving}
                >
                  Remove my picture
                </button>
              ) : null}
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <label htmlFor="email" className="label-text text-slate-700">Email</label>
                <input id="email" type="email" value={form.email} disabled className="input-field bg-slate-50" />
              </div>
              <div>
                <label htmlFor="name" className="label-text text-slate-700">Name</label>
                <input id="name" type="text" required value={form.name} onChange={updateField('name')} className="input-field" />
              </div>
              <div>
                <label htmlFor="country" className="label-text text-slate-700">Country</label>
                <select id="country" value={form.country} onChange={updateField('country')} className="input-field">
                  {COUNTRIES.map((country) => (
                    <option key={country} value={country}>{country}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="language" className="label-text text-slate-700">Language</label>
                <select id="language" value={form.language} onChange={updateField('language')} className="input-field">
                  {LANGUAGES.map((language) => (
                    <option key={language.value} value={language.value}>{language.label}</option>
                  ))}
                </select>
                <p className="mt-1.5 text-xs text-ink-muted">
                  Powered by Google Translate. The site will refresh after you save.
                </p>
              </div>
            </div>

            <Button type="submit" className="mt-6 rounded-full" disabled={saving || uploading}>
              {saving ? 'Saving...' : 'Save information'}
            </Button>
          </form>

          <form
            onSubmit={handleChangePassword}
            className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8"
          >
            <h2 className="text-xl font-semibold text-ink">
              {needsPassword ? 'Add password' : 'Change password'}
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              {needsPassword
                ? 'You signed in with Google. Add a password so you can also sign in with email next time.'
                : 'Update the password you use to sign in with email. You will stay signed in on this device.'}
            </p>

            {passwordError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {passwordError}
              </div>
            )}
            {passwordMessage && (
              <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {passwordMessage}
              </div>
            )}

            <div className="mt-6 space-y-4">
              {!needsPassword && (
                <PasswordInput
                  id="currentPassword"
                  label="Current password"
                  required
                  value={passwordForm.currentPassword}
                  onChange={(e) =>
                    setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))
                  }
                />
              )}
              <PasswordInput
                id="newPassword"
                label={needsPassword ? 'Password' : 'New password'}
                required
                minLength={8}
                value={passwordForm.newPassword}
                onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
              />
              <PasswordInput
                id="confirmPassword"
                label={needsPassword ? 'Confirm password' : 'Confirm new password'}
                required
                minLength={8}
                value={passwordForm.confirmPassword}
                onChange={(e) =>
                  setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))
                }
              />
            </div>

            <Button type="submit" className="mt-6 rounded-full" disabled={changingPassword || saving || uploading}>
              {changingPassword
                ? needsPassword
                  ? 'Adding...'
                  : 'Updating...'
                : needsPassword
                  ? 'Add password'
                  : 'Update password'}
            </Button>
          </form>

          <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-ink">Log out everywhere</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Sign out of Check A Review on this device. You can sign back in anytime.
            </p>
            <Button type="button" className="mt-5 rounded-full" onClick={logout}>
              Log out
            </Button>
          </section>

          <section className="rounded-3xl border border-border bg-white p-6 shadow-sm sm:p-8">
            <h2 className="text-xl font-semibold text-ink">Delete user</h2>
            <p className="mt-2 text-sm text-ink-muted">
              Permanently remove your profile and personal data from Check A Review.
            </p>
            <Button
              type="button"
              variant="secondary"
              className="mt-5 rounded-full border-red-200 text-red-700 hover:bg-red-50"
              onClick={handleDeleteAccount}
              disabled={deleting || saving || uploading}
            >
              {deleting ? 'Deleting...' : 'Delete my profile'}
            </Button>
          </section>
      </div>
    </div>
  )
}
