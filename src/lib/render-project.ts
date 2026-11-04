import { Loc, dictScript, esc } from './loc'
import { icon } from './icons'
import { renderProjectNav, renderHero, renderSection, renderFooter, sharedDict } from './sections'
import type { ProjectPage } from './types'

export interface ProjectNeighbour {
  name: string
  href: string
}

export function renderProject(
  page: ProjectPage,
  neighbours?: { prev?: ProjectNeighbour; next?: ProjectNeighbour },
): { markup: string; dict: Record<string, { zh: string; en: string }> } {
  const loc = new Loc()

  const sections = page.sections.map((s, i) => renderSection(s, loc, i)).join('\n\n')

  const projectNav = neighbours
    ? `<nav class="project-nav" aria-label="Project navigation">
  ${
    neighbours.prev
      ? `<a class="project-nav-link prev" href="${esc(neighbours.prev.href)}">
    <span class="nav-kicker">${icon('arrow-left', 'ico ico-xs')} ${loc.span('project.prev', {
      zh: '上一个项目',
      en: 'Previous project',
    })}</span>
    <span class="nav-name">${esc(neighbours.prev.name)}</span>
  </a>`
      : '<span></span>'
  }
  ${
    neighbours.next
      ? `<a class="project-nav-link next" href="${esc(neighbours.next.href)}">
    <span class="nav-kicker">${loc.span('project.next', { zh: '下一个项目', en: 'Next project' })} ${icon(
      'arrow-right',
      'ico ico-xs',
    )}</span>
    <span class="nav-name">${esc(neighbours.next.name)}</span>
  </a>`
      : '<span></span>'
  }
</nav>`
    : ''

  const markup = `<div class="bg" aria-hidden="true">
  <div class="bg-scroll">
    <span class="bg-orb violet"></span>
    <span class="bg-orb cyan"></span>
    <span class="bg-orb pink"></span>
    <span class="bg-sweep"></span>
  </div>
  <div class="bg-grid"></div>
  <div class="bg-glow"></div>
</div>

${renderProjectNav(loc, page.name, page.nav, page.repo)}

${renderHero(loc, page.hero)}

${sections}

${projectNav}

${renderFooter(loc, { repo: page.repo, license: page.footer?.license })}

${dictScript({ ...sharedDict(), ...loc.dict })}`

  return { markup, dict: { ...sharedDict(), ...loc.dict } }
}
