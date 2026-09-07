import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import {
  applyPageMeta,
  DEFAULT_SEO,
  getPublicRouteSeo,
  isDynamicPublicPage,
} from '../../utils/seo'
import { publicApi } from '../../services/api'

let cachedSiteSeo = null
let siteSeoPromise = null

function loadSiteSeo() {
  if (cachedSiteSeo) return Promise.resolve(cachedSiteSeo)
  if (!siteSeoPromise) {
    siteSeoPromise = publicApi
      .getSiteSeo()
      .then((data) => {
        cachedSiteSeo = data || null
        return cachedSiteSeo
      })
      .catch(() => null)
  }
  return siteSeoPromise
}

export default function PublicRouteMeta() {
  const { pathname, search } = useLocation()
  const [, setTick] = useState(0)

  useEffect(() => {
    if (isDynamicPublicPage(pathname)) return undefined

    let active = true

    const apply = async () => {
      const routeMeta = getPublicRouteSeo(pathname, search)

      if (pathname === '/') {
        const siteSeo = await loadSiteSeo()
        if (!active) return
        if (siteSeo) {
          applyPageMeta({
            title: siteSeo.title || routeMeta?.title || DEFAULT_SEO.title,
            description: siteSeo.description || routeMeta?.description || DEFAULT_SEO.description,
            keywords: siteSeo.keywords || undefined,
            extraTags: siteSeo.extraTags || undefined,
            path: '/',
          })
          return
        }
      }

      if (routeMeta) {
        applyPageMeta(routeMeta)
        return
      }

      applyPageMeta(DEFAULT_SEO)
    }

    apply().then(() => {
      if (active) setTick((n) => n + 1)
    })

    return () => {
      active = false
    }
  }, [pathname, search])

  return null
}
