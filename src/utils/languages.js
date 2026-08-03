export const LANGUAGES = [
  { value: 'da-DK', label: 'Dansk', google: 'da' },
  { value: 'de-DE', label: 'Deutsch', google: 'de' },
  { value: 'de-AT', label: 'Deutsch (Österreich)', google: 'de' },
  { value: 'de-CH', label: 'Deutsch (Schweiz)', google: 'de' },
  { value: 'en-AU', label: 'English (Australia)', google: 'en' },
  { value: 'en-CA', label: 'English (Canada)', google: 'en' },
  { value: 'en-IE', label: 'English (Ireland)', google: 'en' },
  { value: 'en-NZ', label: 'English (New Zealand)', google: 'en' },
  { value: 'en-GB', label: 'English (United Kingdom)', google: 'en' },
  { value: 'en-US', label: 'English (United States)', google: 'en' },
  { value: 'es-ES', label: 'Español', google: 'es' },
  { value: 'fr-FR', label: 'Français', google: 'fr' },
  { value: 'fr-BE', label: 'Français (Belgique)', google: 'fr' },
  { value: 'it-IT', label: 'Italiano', google: 'it' },
  { value: 'nl-NL', label: 'Nederlands', google: 'nl' },
  { value: 'nl-BE', label: 'Nederlands (België)', google: 'nl' },
  { value: 'nb-NO', label: 'Norsk', google: 'no' },
  { value: 'pl-PL', label: 'polski', google: 'pl' },
  { value: 'pt-PT', label: 'Português', google: 'pt' },
  { value: 'pt-BR', label: 'Português (Brasil)', google: 'pt' },
  { value: 'fi-FI', label: 'Suomi', google: 'fi' },
  { value: 'sv-SE', label: 'Svenska', google: 'sv' },
  { value: 'ja-JP', label: '日本語', google: 'ja' },
]

export const SITE_LANGUAGE_KEY = 'site_language'
export const DEFAULT_LANGUAGE = 'en-US'

export function toGoogleLang(locale) {
  const match = LANGUAGES.find((item) => item.value === locale)
  return match?.google || 'en'
}

export function getIncludedGoogleLanguages() {
  return [...new Set(LANGUAGES.map((item) => item.google))].join(',')
}
