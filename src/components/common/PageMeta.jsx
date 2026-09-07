import { useEffect } from 'react'
import { applyPageMeta } from '../../utils/seo'

export default function PageMeta({
  title,
  description,
  path = '/',
  robots,
  image,
  type = 'website',
  jsonLd,
  keywords,
  extraTags,
}) {
  useEffect(() => {
    applyPageMeta({ title, description, path, robots, image, type, jsonLd, keywords, extraTags })
    return () => {
      // Clear page-specific schema when leaving dynamic pages
      if (jsonLd) {
        document.getElementById('page-jsonld')?.remove()
      }
    }
  }, [title, description, path, robots, image, type, jsonLd, keywords, extraTags])

  return null
}
