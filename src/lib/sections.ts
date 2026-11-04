import { icon, githubIcon, type IconName } from './icons'
import { Loc, esc } from './loc'
import type { L10n, Section, Step, Stat, Cta, InstallBlock, InstallPart } from './types'

const NAV: Record<string, L10n> = {
  'nav.home': { zh: '首页', en: 'Home' },
  'nav.projects': { zh: '项目', en: 'Projects' },
  'nav.focus': { zh: '核心', en: 'Focus' },
  'nav.about': { zh: '关于', en: 'About' },
  'nav.contact': { zh: '联系', en: 'Contact' },
  'nav.features': { zh: '特性', en: 'Features' },
  'nav.install': { zh: '安装', en: 'Install' },
  'nav.workflow': { zh: '流程', en: 'Workflow' },
  'nav.qa': { zh: '审查', en: 'Review' },
  'nav.architecture': { zh: '架构', en: 'Architecture' },
  'nav.screenshots': { zh: '截图', en: 'Screens' },
  'nav.updates': { zh: '更新', en: 'Updates' },
  'install.title': { zh: '快速安装', en: 'Quick Install' },
  'footer.made': { zh: '开源 · 匠心工具', en: 'Open Source · Craft Tools' },
}

export function sharedDict(): Record<string, L10n> {
  return { ...NAV }
}

function langSelect(): string {
  return `<select class="lang-select" id="langSelect" aria-label="Language">
        <option value="en">EN</option>
        <option value="zh">中</option>
      </select>`
}

export function renderHomeNav(loc: Loc): string {
  return `<nav class="nav" id="nav">
  <div class="nav-inner">
    <a href="/" class="nav-brand">Jove Rina</a>
    <div class="nav-right">
      <div class="nav-links">
        <a href="#projects" ${loc.attr('nav.projects', NAV['nav.projects'])}>${NAV['nav.projects'].zh}</a>
        <a href="#updates" ${loc.attr('nav.updates', NAV['nav.updates'])}>${NAV['nav.updates'].zh}</a>
        <a href="#focus" ${loc.attr('nav.focus', NAV['nav.focus'])}>${NAV['nav.focus'].zh}</a>
        <a href="#about" ${loc.attr('nav.about', NAV['nav.about'])}>${NAV['nav.about'].zh}</a>
        <a href="#contact" ${loc.attr('nav.contact', NAV['nav.contact'])}>${NAV['nav.contact'].zh}</a>
        <a href="https://github.com/jove-rina" target="_blank" rel="noopener">GitHub</a>
      </div>
      ${langSelect()}
    </div>
  </div>
</nav>`
}

export function renderProjectNav(loc: Loc, brand: string, links: { href: string; label: L10n }[], repo: string): string {
  const items = links
    .map((l) => {
      const key = `nav.${l.href.replace('#', '')}`
      const label = NAV[key] ? NAV[key] : l.label
      return `<a href="${esc(l.href)}" ${loc.attr(key, label)}>${label.zh}</a>`
    })
    .join('\n        ')
  return `<nav class="nav" id="nav">
  <div class="nav-inner">
    <div class="nav-back">
      <a href="/">${icon('arrow-left', 'ico ico-sm')} ${loc.span('nav.home', NAV['nav.home'])}</a>
    </div>
    <div class="nav-brand">${esc(brand)}</div>
    <div class="nav-right">
      <div class="nav-links">
        ${items}
        <a href="${esc(repo)}" target="_blank" rel="noopener">GitHub</a>
      </div>
      ${langSelect()}
    </div>
  </div>
</nav>`
}

export function renderFooter(loc: Loc, opts: { repo: string; license?: string }): string {
  return `<footer class="footer">
  <p>
    <a href="/">Jove Rina</a>
    &nbsp;·&nbsp; ${icon('heart', 'ico ico-sm heart')}
    &nbsp;·&nbsp; <a href="https://github.com/jove-rina" target="_blank" rel="noopener">GitHub</a>
    ${opts.license ? `&nbsp;·&nbsp; ${esc(opts.license)}` : ''}
    &nbsp;·&nbsp; <span ${loc.attr('footer.made', NAV['footer.made'])}>${NAV['footer.made'].zh}</span>
  </p>
  <p class="footer-repo"><a href="${esc(opts.repo)}" target="_blank" rel="noopener">${esc(
    opts.repo.replace('https://github.com/', ''),
  )}</a></p>
</footer>`
}

export function renderHero(
  loc: Loc,
  p: {
    icon: IconName
    title: string
    sub: L10n
    badges: { icon?: IconName; text: string; tone?: string }[]
    install: { title?: L10n; blocks: InstallBlock[] }
  },
): string {
  const badges = p.badges
    .map(
      (b) =>
        `<span class="hero-badge${b.tone ? ` ${b.tone}` : ''}">${b.icon ? icon(b.icon, 'ico ico-xs') : ''}${esc(
          b.text,
        )}</span>`,
    )
    .join('\n      ')
  const installTitle = p.install.title ?? NAV['install.title']
  return `<section class="project-hero" id="install">
  <div class="hero-inner">
    <div class="hero-icon">${icon(p.icon, 'ico ico-hero')}</div>
    <h1>${esc(p.title)}</h1>
    ${loc.el('p', 'hero.sub', p.sub, 'hero-sub')}
    <div class="hero-badges">
      ${badges}
    </div>
    <div class="install-box">
      <div class="install-header">${icon('zap', 'ico ico-xs')} ${loc.span('install.label', installTitle)}</div>
      <div class="install-body">
        ${p.install.blocks.map((b, i) => renderInstallBlock(b, loc, i)).join('\n        ')}
      </div>
    </div>
  </div>
</section>`
}

function renderInstallBlock(block: InstallBlock, loc: Loc, index: number): string {
  switch (block.kind) {
    case 'comment':
      return `<span class="comment"># ${loc.span(`install.b${index}.comment`, block.text)}</span><br />`
    case 'code':
      return `<span class="${block.cls ?? 'string'}">${block.text}</span><br />`
    case 'inline':
      return `<span>${block.parts.map((part, j) => renderPart(part, loc, `install.b${index}.p${j}`)).join('')}</span><br />`
    case 'gap':
      return '<br />'
  }
}

function renderPart(part: InstallPart, loc: Loc, key: string): string {
  if (typeof part === 'string') return part
  const inner = loc.span(key, part.text)
  if (part.href) {
    return `<a href="${esc(part.href)}" target="_blank" rel="noopener">${inner}</a>`
  }
  return part.cls ? `<span class="${part.cls}">${inner}</span>` : inner
}

export function renderSection(s: Section, loc: Loc, index: number): string {
  const base = s.id ?? `s${index}`
  switch (s.type) {
    case 'features':
      return `<section class="section" id="${base}">
  <div class="section-inner">
    ${header(s, loc, base)}
    <div class="feature-grid">
      ${s.cards
        .map(
          (c, i) => `<div class="feature-card reveal">
        <div class="icon">${icon(c.icon)}</div>
        ${loc.el('h4', `${base}.card${i + 1}.title`, c.title)}
        ${loc.el('p', `${base}.card${i + 1}.desc`, c.desc)}
      </div>`,
        )
        .join('\n      ')}
    </div>
  </div>
</section>`
    case 'compare':
      return `<section class="section" id="${base}">
  <div class="section-inner">
    ${header(s, loc, base)}
    <div class="product-grid">
      ${s.cards
        .map(
          (c, i) => `<div class="product-card reveal">
        <div class="card-label ${c.tone}">${icon(c.tone === 'problem' ? 'x' : 'check', 'ico ico-xs')} ${loc.span(
          `${base}.card${i + 1}.label`,
          c.label,
        )}</div>
        ${loc.el('h3', `${base}.card${i + 1}.title`, c.title)}
        ${loc.el('p', `${base}.card${i + 1}.desc`, c.desc)}
      </div>`,
        )
        .join('\n      ')}
    </div>
  </div>
</section>`
    case 'steps':
      return `<section class="section" id="${base}">
  <div class="section-inner">
    ${header(s, loc, base)}
    <div class="workflow-list">
      ${s.steps.map((step, i) => renderStep(step, loc, base, i)).join('\n      ')}
    </div>
  </div>
</section>`
    case 'stats':
      return `<section class="section" id="${base}">
  <div class="section-inner">
    ${s.title ? header({ label: s.label, title: s.title, desc: s.desc }, loc, base) : ''}
    ${statsRow(s.stats, loc, base)}
    ${s.ctas?.length ? `<div class="cta-row">${s.ctas.map((c, i) => renderCta(c, loc, base, i)).join('\n      ')}</div>` : ''}
  </div>
</section>`
    case 'qa':
      return `<section class="section" id="${base}">
  <div class="section-inner">
    ${header(s, loc, base)}
    ${statsRow(s.stats, loc, base)}
    <div class="qa-table-wrap reveal">
      <table class="qa-table">
        <thead><tr>${s.table.head.map((h, i) => `<th ${loc.attr(`${base}.th${i}`, h)}>${h.zh}</th>`).join('')}</tr></thead>
        <tbody>
          ${s.table.rows.map((r) => `<tr>${r.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('\n          ')}
          ${s.table.final ? `<tr class="round-final">${s.table.final.map((cell) => `<td>${cell}</td>`).join('')}</tr>` : ''}
        </tbody>
      </table>
    </div>
  </div>
</section>`
    case 'text':
      return `<section class="section" id="${base}">
  <div class="section-inner">
    ${header(s, loc, base)}
    <div class="workflow-box reveal">
      ${loc.el('p', `${base}.body`, s.html, 'prose')}
    </div>
  </div>
</section>`
    case 'repo':
      return `<section class="section">
  <div class="section-inner">
    <div class="repo-card reveal">
      <div>
        <div class="label">${loc.span('repo.label', s.label)}</div>
        <a href="${esc(s.href)}" target="_blank" rel="noopener" class="name">${esc(s.name)}</a>
      </div>
      <a href="${esc(s.href)}" target="_blank" rel="noopener" class="repo-link">GitHub ${icon(
        'arrow-up-right',
        'ico ico-xs',
      )}</a>
    </div>
  </div>
</section>`
    case 'screenshots':
      return `<section class="section" id="${base}">
  <div class="section-inner">
    ${header(s, loc, base)}
    <div class="shots">
      ${s.items
        .map(
          (shot, i) => `<figure class="shot reveal${shot.size ? ` ${shot.size}` : ''}">
        <img src="${esc(shot.src)}" alt="${esc(shot.alt)}" loading="lazy" />
        ${shot.caption ? `<figcaption ${loc.attr(`${base}.cap${i}`, shot.caption)}>${shot.caption.zh}</figcaption>` : ''}
      </figure>`,
        )
        .join('\n      ')}
    </div>
  </div>
</section>`
  }
}

function header(s: { label?: L10n; title: L10n; desc?: L10n }, loc: Loc, base: string): string {
  return `<div class="section-header">
      ${s.label ? `<div class="section-label">${loc.span(`${base}.label`, s.label)}</div>` : ''}
      ${loc.el('h2', `${base}.title`, s.title, 'section-title')}
      ${s.desc ? loc.el('p', `${base}.desc`, s.desc, 'section-desc') : ''}
    </div>`
}

function renderStep(step: Step, loc: Loc, base: string, i: number): string {
  return `<div class="workflow-step reveal">
        <div class="step-num">${i + 1}</div>
        <div class="step-body">
          ${loc.el('div', `${base}.step${i + 1}.title`, step.title, 'step-title')}
          ${step.desc ? loc.el('div', `${base}.step${i + 1}.desc`, step.desc, 'step-desc') : ''}
          ${step.code ? `<div class="step-code">${step.code}</div>` : ''}
        </div>
      </div>`
}

function statsRow(stats: Stat[], loc: Loc, base: string): string {
  return `<div class="stats-row">
      ${stats
        .map(
          (st, i) => `<div class="stat-card reveal">
        <div class="num">${esc(st.num)}</div>
        ${loc.el('div', `${base}.stat${i + 1}.label`, st.label, 'label')}
        ${st.sub ? loc.el('div', `${base}.stat${i + 1}.sub`, st.sub, 'sub') : ''}
      </div>`,
        )
        .join('\n      ')}
    </div>`
}

function renderCta(cta: Cta, loc: Loc, base: string, index: number): string {
  const iconHtml = cta.icon ? `${icon(cta.icon, 'ico ico-sm')} ` : ''
  const external = cta.href.startsWith('http')
  return `<a href="${esc(cta.href)}" class="btn-${cta.kind}"${external ? ' target="_blank" rel="noopener"' : ''}>
        ${iconHtml}${loc.span(`${base}.cta${index}`, cta.label)}
      </a>`
}

export { githubIcon }
