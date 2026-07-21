import { useEffect } from 'react'
import { BUSINESS_PORTAL_URL } from '../../utils/constants'

/** Redirects the browser to the standalone business portal (port 5175). */
export default function BusinessPortalRedirect({ path = '' }) {
  useEffect(() => {
    const target = `${BUSINESS_PORTAL_URL}${path}`
    window.location.replace(target)
  }, [path])

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 text-sm text-slate-300">
      Redirecting to business portal...
    </div>
  )
}
