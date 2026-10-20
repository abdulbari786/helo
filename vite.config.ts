import { defineConfig, type Plugin } from 'vite'
import type { IncomingMessage, ServerResponse } from 'node:http'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

/**
 * Local stand-in for the Vercel function at /api/contact during `vite dev` / `vite preview`.
 * It only logs the enquiry. In production the real function in /api/contact.ts sends the email.
 * (Use `vercel dev` to run the real function locally.)
 */
function devContactApi(): Plugin {
  const handler = (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (req.url !== '/api/contact') return next()
    let body = ''
    req.on('data', (c) => (body += c))
    req.on('end', () => {
      let data: Record<string, unknown> = {}
      try {
        data = JSON.parse(body || '{}')
      } catch {
        /* ignore */
      }
      const ok = req.method === 'POST' && typeof data.email === 'string' && typeof data.name === 'string'
      console.log(`[dev /api/contact] ${ok ? 'received' : 'rejected'} enquiry from ${String(data.email ?? 'unknown')}`)
      res.statusCode = ok ? 200 : 400
      res.setHeader('Content-Type', 'application/json')
      res.end(JSON.stringify(ok ? { ok: true, dev: true } : { error: 'Invalid request.' }))
    })
  }
  return {
    name: 'dev-contact-api',
    configureServer: (server) => void server.middlewares.use(handler),
    configurePreviewServer: (server) => void server.middlewares.use(handler),
  }
}

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), devContactApi()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@content': fileURLToPath(new URL('./content', import.meta.url)),
    },
  },
  build: {
    target: 'es2020',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks(id) {
              if (!id.includes('node_modules')) return
              if (/[\\/](react|react-dom|scheduler|react-router|react-router-dom|@remix-run|react-helmet-async)[\\/]/.test(id)) return 'vendor-react'
              if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils')) return 'vendor-motion'
              if (id.includes('gsap') || id.includes('lenis')) return 'vendor-scroll'
              if (id.includes('react-hook-form') || id.includes('zod') || id.includes('@hookform')) return 'vendor-forms'
            },
          },
        },
  },
  ssr: { noExternal: ['react-helmet-async'] },
}))
