import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  applyPageMeta,
  DEFAULT_SEO,
  getPublicRouteSeo,
  isDynamicPublicPage,
} from '../../utils/seo'

export default function PublicRouteMeta() {
  const { pathname, search } = useLocation()

  useEffect(() => {
    if (isDynamicPublicPage(pathname)) return

    const routeMeta = getPublicRouteSeo(pathname, search)
    if (routeMeta) {
      applyPageMeta(routeMeta)
      return
    }

    applyPageMeta(DEFAULT_SEO)
  }, [pathname, search])

  return null
}
