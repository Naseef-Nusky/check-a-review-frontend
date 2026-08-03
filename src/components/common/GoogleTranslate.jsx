import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { getIncludedGoogleLanguages, toGoogleLang } from '../../utils/languages'
import {
  applyGoogleTranslate,
  ensureGoogleTranslateScript,
  getCurrentGoogleLangFromCookie,
  getSavedSiteLanguage,
  saveSiteLanguage,
} from '../../utils/googleTranslate'

const APPLY_FLAG = 'gt_apply_once'

function prefsKey(userId) {
  return `user_settings_${userId || 'guest'}`
}

function languageFromUserPrefs(userId) {
  try {
    const raw = localStorage.getItem(prefsKey(userId))
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed?.language || null
  } catch {
    return null
  }
}

export default function GoogleTranslate() {
  const { user } = useAuth()

  useEffect(() => {
    const fromPrefs = languageFromUserPrefs(user?.id)
    const locale = fromPrefs || getSavedSiteLanguage()
    saveSiteLanguage(locale)

    const desired = toGoogleLang(locale)
    const current = getCurrentGoogleLangFromCookie()
    const alreadyTried = sessionStorage.getItem(APPLY_FLAG) === desired
    const shouldReload = desired !== current && !alreadyTried

    if (shouldReload) {
      sessionStorage.setItem(APPLY_FLAG, desired)
    }

    let cancelled = false
    ensureGoogleTranslateScript(getIncludedGoogleLanguages())
      .then(() => {
        if (cancelled) return
        applyGoogleTranslate(locale, { reload: shouldReload })
      })
      .catch(() => {
        /* Translate unavailable — site still works in English */
      })

    return () => {
      cancelled = true
    }
  }, [user?.id])

  return (
    <div
      id="google_translate_element"
      aria-hidden="true"
      className="google-translate-host"
    />
  )
}
