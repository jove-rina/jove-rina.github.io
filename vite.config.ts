import { defineConfig, type Plugin } from 'vite'
import { resolve } from 'node:path'
import { projectSlugs, resolvePage } from './src/lib/pages'
import { esc } from './src/lib/loc'

const ROOT = import.meta.dirname

function pagePlugin(): Plugin {
  return {
    name: 'jove-rina-pages',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const relative = ctx.filename.replace(ROOT + '/', '')
        const page = resolvePage(relative)
        if (!page) return html
        return html
          .replaceAll('<!--TITLE-->', esc(page.title))
          .replaceAll('<!--DESC-->', esc(page.description))
          .replace('<!--APP-->', page.markup ?? '')
      },
    },
  }
}

export default defineConfig({
  plugins: [pagePlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(ROOT, 'index.html'),
        ...Object.fromEntries(projectSlugs.map((slug) => [slug, resolve(ROOT, `projects/${slug}/index.html`)])),
      },
    },
  },
})
