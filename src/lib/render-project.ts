import { Loc, dictScript } from './loc'
import { renderProjectNav, renderHero, renderSection, renderFooter, sharedDict } from './sections'
import type { ProjectPage } from './types'

export function renderProject(page: ProjectPage): { markup: string; dict: Record<string, { zh: string; en: string }> } {
  const loc = new Loc()

  const sections = page.sections.map((s, i) => renderSection(s, loc, i)).join('\n\n')

  const markup = `<canvas id="canvas-bg"></canvas>

${renderProjectNav(loc, page.name, page.nav, page.repo)}

${renderHero(loc, page.hero)}

${sections}

${renderFooter(loc, { repo: page.repo, license: page.footer?.license })}

${dictScript({ ...sharedDict(), ...loc.dict })}`

  return { markup, dict: { ...sharedDict(), ...loc.dict } }
}
