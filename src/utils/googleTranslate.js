import { DEFAULT_LANGUAGE, SITE_LANGUAGE_KEY, toGoogleLang } from './languages'

function clearGoogTransCookies() {
  const expire = 'expires=Thu, 01 Jan 1970 00:00:00 GMT'
  const host = window.location.hostname
  const parts = host.split('.')
  const domains = ['', host]
  if (parts.length > 1) {
    domains.push(`.${parts.slice(-2).join('.')}`)
  }

  domains.forEach((domain) => {
    const domainPart = domain ? `; domain=${domain}` : ''
    document.cookie = `googtrans=; ${expire}; path=/;${domainPart}`
    document.cookie = `googtrans=/en/en; ${expire}; path=/;${domainPart}`
  })
}

function setGoogTransCookie(googleLang) {
  clearGoogTransCookies()
  if (!googleLang || googleLang === 'en') return

  const value = `/en/${googleLang}`
  document.cookie = `googtrans=${value}; path=/`
  const host = window.location.hostname
  if (host && host !== 'localhost') {
    const parts = host.split('.')
    if (parts.length > 1) {
      document.cookie = `googtrans=${value}; path=/; domain=.${parts.slice(-2).join('.')}`
    }
  }
}

export function getSavedSiteLanguage() {
  try {
    return localStorage.getItem(SITE_LANGUAGE_KEY) || DEFAULT_LANGUAGE
  } catch {
    return DEFAULT_LANGUAGE
  }
}

export function saveSiteLanguage(locale) {
  try {
    localStorage.setItem(SITE_LANGUAGE_KEY, locale || DEFAULT_LANGUAGE)
  } catch {
    /* ignore */
  }
}

function selectGoogleCombo(googleLang) {
  const combo = document.querySelector('.goog-te-combo')
  if (!combo) return false
  const target = googleLang === 'en' ? '' : googleLang
  if (combo.value === target) return true
  combo.value = target
  combo.dispatchEvent(new Event('change'))
  return true
}

/** Apply language via Google Translate. Reloads when cookies need a fresh pass. */
export function applyGoogleTranslate(locale, { reload = true } = {}) {
  const googleLang = toGoogleLang(locale || DEFAULT_LANGUAGE)
  saveSiteLanguage(locale || DEFAULT_LANGUAGE)

  const current = document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/)?.[1] || 'en'
  const needsCookieChange =
    (googleLang === 'en' && current !== 'en') || (googleLang !== 'en' && current !== googleLang)

  if (googleLang === 'en') {
    clearGoogTransCookies()
  } else {
    setGoogTransCookie(googleLang)
  }

  const comboReady = selectGoogleCombo(googleLang)

  if (needsCookieChange && reload) {
    window.location.reload()
    return
  }

  if (!comboReady && needsCookieChange && reload) {
    window.location.reload()
  }
}

export function getCurrentGoogleLangFromCookie() {
  return document.cookie.match(/(?:^|;\s*)googtrans=\/[^/]+\/([^;]+)/)?.[1] || 'en'
}

export function ensureGoogleTranslateScript(includedLanguages) {
  if (window.google?.translate?.TranslateElement) {
    return Promise.resolve()
  }

  return new Promise((resolve, reject) => {
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages,
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element',
      )
      resolve()
    }

    const existing = document.getElementById('google-translate-script')
    if (existing) {
      resolve()
      return
    }

    const script = document.createElement('script')
    script.id = 'google-translate-script'
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'
    script.async = true
    script.onerror = () => reject(new Error('Failed to load Google Translate'))
    document.body.appendChild(script)
  })
}
