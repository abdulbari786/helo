import { StrictMode } from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { HelmetProvider, type HelmetServerState } from 'react-helmet-async'
import { Writable } from 'node:stream'
import App from './App'
export { staticPaths } from './staticPaths'

/** Renders a route to HTML, waiting for all lazy routes to resolve (used by scripts/prerender.mjs). */
export function render(url: string): Promise<{ html: string; head: string; htmlAttrs: string }> {
  const helmetContext: { helmet?: HelmetServerState } = {}
  return new Promise((resolve, reject) => {
    let html = ''
    const sink = new Writable({
      write(chunk, _enc, cb) {
        html += chunk.toString()
        cb()
      },
      final(cb) {
        const h = helmetContext.helmet
        const head = h ? [h.title.toString(), h.meta.toString(), h.link.toString(), h.script.toString()].join('\n    ') : ''
        resolve({ html, head, htmlAttrs: h ? h.htmlAttributes.toString() : '' })
        cb()
      },
    })
    const stream = renderToPipeableStream(
      <StrictMode>
        <HelmetProvider context={helmetContext}>
          <StaticRouter location={url}>
            <App />
          </StaticRouter>
        </HelmetProvider>
      </StrictMode>,
      {
        onAllReady() {
          stream.pipe(sink)
        },
        onShellError: reject,
        onError(err) {
          reject(err)
        },
      },
    )
  })
}
