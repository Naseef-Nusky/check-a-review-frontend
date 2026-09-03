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
}) {
  useEffect(() => {
    applyPageMeta({ title, description, path, robots, image, type, jsonLd })
    return () => {
      // Clear page-specific schema when leaving dynamic pages
      if (jsonLd) {
        document.getElementById('page-jsonld')?.remove()
      }
    }
  }, [title, description, path, robots, image, type, jsonLd])

  return null
}
