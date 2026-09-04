/**
 * Production static server for the public SPA.
 * - Normal users get the React app
 * - Search bots get prerendered business HTML (title + reviews) from the API
 * - /sitemap.xml is proxied to the live API sitemap
 *
 * Usage:
 *   npm run build
 *   API_ORIGIN=https://api.checkareview.com PORT=4173 npm run start
 */
import http from 'node:http'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, 'dist')
const port = Number(process.env.PORT || 4173)
const apiOrigin = String(process.env.API_ORIGIN || process.env.VITE_API_URL || 'http://localhost:5000')
  .replace(/\/api\/?$/, '')
  .replace(/\/$/, '')

const BOT_UA =
  /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|linkedinbot|embedly|pinterest|applebot|semrushbot|ahrefsbot|dotbot|rogerbot|whatsapp|telegram|discordbot|redditbot|ia_archiver|gptbot|chatgpt|claudebot|anthropic|perplexity|bytespider/i

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.webmanifest': 'application/manifest+json',
}

function send(res, status, body, headers = {}) {
  res.writeHead(status, headers)
  res.end(body)
}

async function proxy(url, res, contentType) {
  try {
    const upstream = await fetch(url, {
      headers: { Accept: contentType || '*/*' },
    })
    const text = await upstream.text()
    send(res, upstream.status, text, {
      'Content-Type': contentType || upstream.headers.get('content-type') || 'text/plain; charset=utf-8',
      'Cache-Control': upstream.headers.get('cache-control') || 'public, max-age=300',
    })
  } catch (err) {
    send(res, 502, `Upstream error: ${err.message}`, { 'Content-Type': 'text/plain; charset=utf-8' })
  }
}

function serveFile(filePath, res) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      send(res, 404, 'Not found', { 'Content-Type': 'text/plain; charset=utf-8' })
      return
    }
    const ext = path.extname(filePath).toLowerCase()
    send(res, 200, data, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable',
    })
  })
}

function serveSpa(res) {
  serveFile(path.join(distDir, 'index.html'), res)
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`)
  const pathname = decodeURIComponent(url.pathname)
  const ua = String(req.headers['user-agent'] || '')
  const forcePrerender = url.searchParams.get('prerender') === '1'
  const isBot = forcePrerender || BOT_UA.test(ua)

  if (pathname === '/sitemap.xml') {
    await proxy(`${apiOrigin}/api/sitemap.xml`, res, 'application/xml; charset=utf-8')
    return
  }

  const businessMatch = pathname.match(/^\/businesses\/([^/]+)\/?$/)
  if (businessMatch && isBot) {
    const slug = businessMatch[1]
    await proxy(
      `${apiOrigin}/api/prerender/businesses/${encodeURIComponent(slug)}`,
      res,
      'text/html; charset=utf-8',
    )
    return
  }

  const safePath = path.normalize(pathname).replace(/^(\.\.[/\\])+/, '')
  const filePath = path.join(distDir, safePath === '/' ? 'index.html' : safePath)

  if (!filePath.startsWith(distDir)) {
    send(res, 403, 'Forbidden', { 'Content-Type': 'text/plain; charset=utf-8' })
    return
  }

  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isFile()) {
      serveFile(filePath, res)
      return
    }
    // SPA fallback for client routes
    serveSpa(res)
  })
})

server.listen(port, () => {
  console.log(`Public site listening on http://localhost:${port}`)
  console.log(`API origin for prerender/sitemap: ${apiOrigin}`)
})
