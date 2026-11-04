import { home } from '../data/home'
import { page as hermesWindowsMigration } from '../data/projects/hermes-windows-migration'
import { page as hermesWechatIntegration } from '../data/projects/hermes-wechat-integration'
import { page as rinaHermesAcp } from '../data/projects/rina-hermes-acp'
import { page as axureUtilities } from '../data/projects/axure-utilities'
import { page as rinovaPlayground } from '../data/projects/rinova-playground'
import { page as rinovaDevtools } from '../data/projects/rinova-devtools'
import { page as rinovaVoid } from '../data/projects/rinova-void'
import { renderHome } from './render-home'
import { renderProject } from './render-project'
import type { ProjectPage } from './types'

const projects: ProjectPage[] = [
  hermesWindowsMigration,
  hermesWechatIntegration,
  rinaHermesAcp,
  axureUtilities,
  rinovaPlayground,
  rinovaDevtools,
  rinovaVoid,
]

export const projectSlugs = projects.map((p) => p.slug)

export function resolvePage(relativePath: string): {
  title: string
  description: string
  markup: string | null
} | null {
  if (relativePath === 'index.html') {
    const { markup } = renderHome(home)
    return { title: 'Jove Rina — Open Source Tools', description: home.sub.zh, markup }
  }

  const match = /^projects\/([^/]+)\/index\.html$/.exec(relativePath)
  if (!match) return null
  const index = projects.findIndex((p) => p.slug === match[1])
  if (index === -1) return null
  const project = projects[index]
  const at = (i: number) => {
    const p = projects[(i + projects.length) % projects.length]
    return { name: p.name, href: `/projects/${p.slug}/` }
  }
  const neighbours = { prev: at(index - 1), next: at(index + 1) }
  const { markup } = renderProject(project, neighbours)
  return { title: project.title, description: project.description.zh, markup }
}
