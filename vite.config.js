import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        // Use 127.0.0.1 — on Windows, localhost often hits ::1 (another app may own port 5000 there)
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
      // Root sitemap for local dev (production uses /api/sitemap.xml or static public/sitemap.xml)
      '/sitemap.xml': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://127.0.0.1:5000',
        changeOrigin: true,
      },
    },
  },
})
