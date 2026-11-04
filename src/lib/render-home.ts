import { icon, githubIcon } from './icons'
import { Loc, dictScript, esc } from './loc'
import { renderHomeNav, renderFooter, sharedDict } from './sections'
import type { HomeData } from './types'

export function renderHome(data: HomeData): { markup: string; dict: Record<string, { zh: string; en: string }> } {
  const loc = new Loc()

  const hero = `<section class="hero">
  <div class="hero-inner hero-grid">
    <div class="hero-copy">
      <div class="hero-badge">
        <span class="dot"></span>
        ${loc.span('hero.badge', data.badge)}
      </div>
      <h1 class="hero-title">
        ${loc.span('hero.title1', data.title1)}<br />
        <span class="gradient">${esc(data.brand)}</span>
      </h1>
      ${loc.el('p', 'hero.sub', data.sub, 'hero-sub')}
      <div class="hero-type"><span id="typing"></span><span class="cursor"></span></div>
      <div class="hero-cta">
        <a href="${esc(data.ctas[0].href)}" class="btn-primary">
          ${loc.span('hero.cta0', data.ctas[0].label)} ${icon('arrow-right', 'ico ico-sm')}
        </a>
        <a href="${esc(data.ctas[1].href)}" target="_blank" rel="noopener" class="btn-secondary">
          ${githubIcon('ico ico-sm')} ${loc.span('hero.cta1', data.ctas[1].label)}
        </a>
      </div>
      <div class="hero-stats">
        ${data.stats
          .map(
            (st, i) => `<div class="stat-item">
          <div class="stat-num">${esc(st.num)}</div>
          ${loc.el('div', `hero.stat${i + 1}`, st.label, 'stat-label')}
        </div>`,
          )
          .join('\n        ')}
      </div>
    </div>
    <aside class="hero-panel" aria-label="Latest releases">
      <div class="panel-head">
        <span class="pulse-dot"></span>
        ${loc.span('hero.panel.label', data.heroPanel.label, 'panel-label')}
        <span class="panel-count">${esc(data.heroPanel.count)}</span>
      </div>
      <ul class="release-list">
        ${data.heroPanel.items
          .map(
            (it) => `<li>
          <a href="${esc(it.href)}" class="release-row">
            <span class="release-dot ${it.tone}"></span>
            <span class="release-name">${esc(it.name)}</span>
            <span class="release-meta">${esc(it.meta)}</span>
            ${icon('arrow-up-right', 'ico ico-xs release-arrow')}
          </a>
        </li>`,
          )
          .join('\n        ')}
      </ul>
      <div class="panel-note">${loc.span('hero.panel.note', data.heroPanel.note)}</div>
    </aside>
  </div>
  <div class="scroll-ind">
    ${loc.span('hero.scroll', { zh: '向下滚动', en: 'SCROLL' })}
    <div class="mouse"></div>
  </div>
</section>

<div class="marquee" aria-hidden="true">
  <div class="marquee-track">
    ${[...data.marquee, ...data.marquee]
      .map((word) => `<span>${esc(word)}</span>`)
      .join('\n    ')}
  </div>
</div>`

  const projects = `<section class="section" id="projects">
  <div class="section-inner">
    <div class="section-header">
      <div class="section-label">${loc.span('projects.label', data.projects.label)}</div>
      ${loc.el('h2', 'projects.title', data.projects.title, 'section-title')}
      ${loc.el('p', 'projects.desc', data.projects.desc, 'section-desc')}
    </div>
    <div class="projects-grid">
      ${data.projects.groups
        .map(
          (g) => `<div class="project-group">
        <div class="project-group-header">
          ${loc.el('h3', `projects.group.${g.id}`, g.title, 'project-group-title')}
          ${loc.el('span', `projects.group.${g.id}.count`, g.count, 'project-group-count')}
          ${g.href ? `<a href="${esc(g.href)}" class="group-link">${icon('arrow-up-right', 'ico ico-xs')}</a>` : ''}
        </div>
        ${g.items
          .map(
            (p) => `<a href="projects/${p.slug}/" class="project-card reveal">
          <div class="project-icon">${icon(p.icon)}</div>
          <div class="project-info">
            <h3>${esc(p.name)} <span class="arrow">${icon('arrow-right', 'ico ico-sm')}</span></h3>
            ${loc.el('p', `projects.card.${p.slug}`, p.desc)}
            <div class="project-meta">
              ${p.meta.map((m) => `<span>${esc(m)}</span>`).join('\n              ')}
            </div>
          </div>
        </a>`,
          )
          .join('\n        ')}
      </div>`,
        )
        .join('\n      ')}
    </div>
  </div>
</section>`

  const updates = `<section class="section" id="updates">
  <div class="section-inner">
    <div class="section-header">
      <div class="section-label">${loc.span('updates.label', data.updates.label)}</div>
      ${loc.el('h2', 'updates.title', data.updates.title, 'section-title')}
      ${loc.el('p', 'updates.desc', data.updates.desc, 'section-desc')}
    </div>
    <ol class="updates-list">
      ${data.updates.items
        .map(
          (u, i) => `<li class="update-item reveal">
        <span class="update-date">${esc(u.date)}</span>
        <div class="update-body">
          <a class="update-project" href="${esc(u.href)}">${esc(u.project)} ${icon('arrow-up-right', 'ico ico-xs')}</a>
          ${loc.el('p', `updates.item${i}`, u.text)}
        </div>
      </li>`,
        )
        .join('\n      ')}
    </ol>
  </div>
</section>`

  const focus = `<section class="section" id="focus">
  <div class="section-inner">
    <div class="section-header">
      <div class="section-label">${loc.span('focus.label', data.focus.label)}</div>
      ${loc.el('h2', 'focus.title', data.focus.title, 'section-title')}
      ${loc.el('p', 'focus.desc', data.focus.desc, 'section-desc')}
    </div>
    <div class="focus-grid">
      ${data.focus.items
        .map(
          (f, i) => `<div class="focus-item reveal">
        <div class="icon">${icon(f.icon)}</div>
        ${loc.el('h3', `focus.item${i + 1}.title`, f.title)}
        ${loc.el('p', `focus.item${i + 1}.desc`, f.desc)}
      </div>`,
        )
        .join('\n      ')}
    </div>
  </div>
</section>`

  const about = `<section class="section" id="about">
  <div class="section-inner">
    <div class="section-header">
      <div class="section-label">${loc.span('about.label', data.about.label)}</div>
      ${loc.el('h2', 'about.title', data.about.title, 'section-title')}
      ${loc.el('p', 'about.desc', data.about.desc, 'section-desc')}
    </div>
    <div class="about-grid">
      ${data.about.cards
        .map(
          (c, i) => `<div class="about-card reveal">
        <div class="icon">${icon(c.icon)}</div>
        ${loc.el('h3', `about.card${i + 1}.title`, c.title)}
        ${loc.el('p', `about.card${i + 1}.desc`, c.desc)}
        <div class="accent-text">${esc(c.tag)}</div>
      </div>`,
        )
        .join('\n      ')}
    </div>
    <div class="stack-row reveal">
      ${data.stack.map((s) => `<span class="chip">${esc(s)}</span>`).join('\n      ')}
    </div>
  </div>
</section>`

  const contact = `<section class="section" id="contact">
  <div class="section-inner">
    <div class="section-header">
      <div class="section-label">${loc.span('contact.label', data.contact.label)}</div>
      ${loc.el('h2', 'contact.title', data.contact.title, 'section-title')}
      ${loc.el('p', 'contact.desc', data.contact.desc, 'section-desc')}
    </div>
    <div class="contact-grid">
      ${data.contact.links
        .map(
          (l, i) => `<a href="${esc(l.href)}" class="contact-link reveal"${
            l.href.startsWith('http') ? ' target="_blank" rel="noopener"' : ''
          }>
        ${icon(l.icon, 'ico ico-sm')} ${loc.span(`contact.link${i}`, l.text)}
      </a>`,
        )
        .join('\n      ')}
    </div>
  </div>
</section>`

  const typingData = `<script id="typing-data" type="application/json">${JSON.stringify(data.phrases).replace(
    /</g,
    '\\u003c',
  )}</script>`

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

${renderHomeNav(loc)}

${hero}

${projects}

${updates}

${focus}

${about}

${contact}

${renderFooter(loc, { repo: 'https://github.com/jove-rina' })}

${typingData}
${dictScript({ ...sharedDict(), ...loc.dict })}`

  return { markup, dict: { ...sharedDict(), ...loc.dict } }
}
