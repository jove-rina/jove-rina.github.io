import { animate, inView, scroll, stagger } from 'motion'
import { getLang, initLang, type Dict, type Lang } from './i18n'

const REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches

function readJson<T>(id: string): T | null {
  const el = document.getElementById(id)
  if (!el?.textContent) return null
  try {
    return JSON.parse(el.textContent) as T
  } catch {
    return null
  }
}

/* ── Background field (motion) ── */
function initBackground(): void {
  const root = document.querySelector('.bg')
  if (!root || REDUCE) return

  const scrollLayer = root.querySelector('.bg-scroll')
  const orbs = Array.from(root.querySelectorAll<HTMLElement>('.bg-orb'))
  const sweep = root.querySelector<HTMLElement>('.bg-sweep')

  const drift = [
    { x: [0, 36, -18, 0], y: [0, -28, 22, 0], scale: [1, 1.06, 0.97, 1] },
    { x: [0, -30, 20, 0], y: [0, 24, -18, 0], scale: [1, 0.95, 1.05, 1] },
    { x: [0, 26, -24, 0], y: [0, -20, 16, 0], scale: [1, 1.08, 0.98, 1] },
  ]
  orbs.forEach((orb, i) => {
    animate(orb, drift[i % drift.length], {
      duration: 26 + i * 6,
      repeat: Infinity,
      ease: 'easeInOut',
    })
  })

  if (sweep) {
    animate(sweep, { rotate: 360 }, { duration: 90, repeat: Infinity, ease: 'linear' })
  }

  if (scrollLayer) {
    scroll(animate(scrollLayer, { y: [0, -90] }, { ease: 'linear' }))
  }

  const glow = root.querySelector<HTMLElement>('.bg-glow')
  if (glow && window.matchMedia('(pointer: fine)').matches) {
    const size = 420
    document.addEventListener(
      'pointermove',
      (e) => {
        glow.classList.add('active')
        animate(
          glow,
          { x: e.clientX - size / 2, y: e.clientY - size / 2 },
          { type: 'spring', stiffness: 70, damping: 22, mass: 0.6 },
        )
      },
      { passive: true },
    )
    document.addEventListener('pointerleave', () => glow.classList.remove('active'))
  }
}

/* ── Nav hide on scroll ── */
function initNav(): void {
  const nav = document.getElementById('nav')
  if (!nav) return
  let lastScroll = 0
  window.addEventListener('scroll', () => {
    const cur = window.scrollY
    if (cur > lastScroll && cur > 100) nav.classList.add('hidden')
    else nav.classList.remove('hidden')
    lastScroll = cur
  })
}

/* ── Reveal on scroll ── */
function initReveal(): void {
  const targets = document.querySelectorAll(
    '.reveal,.project-card,.contact-link,.about-card,.update-item,.stat-card,.workflow-step,.qa-table-wrap,.repo-card,.shot',
  )
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('visible')
      })
    },
    { threshold: 0.15 },
  )
  targets.forEach((el) => observer.observe(el))
}

/* ── Typing effect ── */
function initTyping(): void {
  const el = document.getElementById('typing')
  if (!el) return
  const phrases = readJson<{ zh: string[]; en: string[] }>('typing-data')
  if (!phrases) return

  let phraseIdx = 0
  let charIdx = 0
  let deleting = false
  let lang: Lang = getLang()

  const tick = (): void => {
    const list = phrases[lang]
    const current = list[phraseIdx % list.length]
    if (deleting) {
      el.textContent = current.substring(0, charIdx--)
      if (charIdx < 0) {
        deleting = false
        phraseIdx = (phraseIdx + 1) % list.length
        setTimeout(tick, 600)
        return
      }
    } else {
      el.textContent = current.substring(0, charIdx++)
      if (charIdx > current.length) {
        deleting = true
        setTimeout(tick, 1500)
        return
      }
    }
    setTimeout(tick, deleting ? 50 : 80)
  }
  tick()

  const select = document.getElementById('langSelect')
  select?.addEventListener('change', () => {
    lang = getLang()
    phraseIdx = 0
    charIdx = 0
    deleting = false
  })
}

/* ── Smooth anchors ── */
function initAnchors(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href')
      if (!href || href === '#') return
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) target.scrollIntoView({ behavior: 'smooth' })
    })
  })
}

/* ── Scroll progress bar ── */
function initProgress(): void {
  if (REDUCE) return
  const bar = document.createElement('div')
  bar.className = 'scroll-progress'
  bar.setAttribute('aria-hidden', 'true')
  document.body.appendChild(bar)
  scroll(animate(bar, { scaleX: [0, 1] }, { ease: 'linear' }))
}

/* ── Pointer spotlight on cards ── */
function initSpotlight(): void {
  if (REDUCE) return
  const selector = '.project-card, .feature-card, .about-card, .focus-item, .stat-card, .hero-panel, .update-item'
  document.addEventListener(
    'pointermove',
    (e) => {
      const target = e.target as Element | null
      const el = target?.closest?.(selector) as HTMLElement | null
      if (!el) return
      const r = el.getBoundingClientRect()
      el.style.setProperty('--mx', `${e.clientX - r.left}px`)
      el.style.setProperty('--my', `${e.clientY - r.top}px`)
    },
    { passive: true },
  )
}

/* ── Magnetic buttons ── */
function initMagnetic(): void {
  if (REDUCE || !window.matchMedia('(pointer: fine)').matches) return
  document.querySelectorAll<HTMLElement>('.btn-primary, .btn-secondary').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      const r = btn.getBoundingClientRect()
      const dx = ((e.clientX - r.left) / r.width - 0.5) * 10
      const dy = ((e.clientY - r.top) / r.height - 0.5) * 6
      animate(btn, { x: dx, y: dy }, { type: 'spring', stiffness: 260, damping: 18 })
    })
    btn.addEventListener('pointerleave', () => {
      animate(btn, { x: 0, y: 0 }, { type: 'spring', stiffness: 260, damping: 20 })
    })
  })
}

/* ── Number counters ── */
function initCounters(): void {
  document.querySelectorAll<HTMLElement>('.stat-card .num, .stat-item .stat-num').forEach((el) => {
    const raw = el.textContent?.trim() ?? ''
    if (!/^\d{1,4}$/.test(raw)) return
    const target = Number(raw)
    if (!target) return
    let stop: (() => void) | undefined
    stop = inView(
      el,
      () => {
        if (REDUCE) {
          el.textContent = String(target)
          stop?.()
          return
        }
        animate(0, target, {
          duration: 1.1,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (v) => {
            el.textContent = String(Math.round(Number(v)))
          },
        })
        stop?.()
      },
      { amount: 0.6 },
    )
  })
}

/* ── Hero release rows ── */
function initHeroPanel(): void {
  if (REDUCE) return
  const rows = Array.from(document.querySelectorAll('.release-row'))
  if (!rows.length) return
  animate(
    rows,
    { opacity: [0, 1], x: [18, 0] },
    { delay: stagger(0.07, { startDelay: 0.55 }), duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  )
}

/* ── Copy install commands ── */
async function writeClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    /* fall through to execCommand */
  }
  const area = document.createElement('textarea')
  area.value = text
  area.setAttribute('readonly', '')
  area.style.position = 'fixed'
  area.style.top = '-1000px'
  document.body.appendChild(area)
  area.select()
  let ok = false
  try {
    ok = document.execCommand('copy')
  } catch {
    ok = false
  }
  area.remove()
  return ok
}

function initCopy(): void {
  document.addEventListener('click', async (e) => {
    const btn = (e.target as Element | null)?.closest?.('[data-copy]') as HTMLElement | null
    if (!btn) return
    const box = btn.closest('.install-box')
    const body = box?.querySelector('.install-body') as HTMLElement | null
    if (!body) return
    const label = btn.querySelector('.copy-label')
    const previous = label?.textContent ?? ''
    const ok = await writeClipboard(btn.dataset.copyText || body.innerText.trim())
    if (!ok) return
    if (label) label.textContent = getLang() === 'zh' ? '已复制' : 'Copied'
    btn.classList.add('copied')
    setTimeout(() => {
      if (label) label.textContent = previous
      btn.classList.remove('copied')
    }, 1400)
  })
}

/* ── Hero video loop ── */
function initHeroVideo(): void {
  const video = document.getElementById('heroVideo') as HTMLVideoElement | null
  if (!video || REDUCE) return

  let active = false
  let requested = false

  const tryPlay = (): void => {
    if (!active || document.hidden) return
    if (video.readyState < 2) {
      if (!requested) {
        requested = true
        video.preload = 'auto'
        video.load()
      }
      return
    }
    void video.play().catch(() => {})
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        active = entry.isIntersecting
        if (active) tryPlay()
        else video.pause()
      })
    },
    { threshold: 0.05 },
  )
  observer.observe(video)

  video.addEventListener('loadeddata', tryPlay)
  video.addEventListener('canplay', tryPlay)

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) video.pause()
    else tryPlay()
  })

  // Some browsers block autoplay until the first interaction; retry then.
  const wake = (): void => {
    tryPlay()
  }
  window.addEventListener('pointerdown', wake, { once: true, passive: true })
  window.addEventListener('scroll', wake, { once: true, passive: true })
  window.addEventListener('keydown', wake, { once: true })

  tryPlay()
}

export function boot(): void {
  const dict = readJson<Dict>('i18n-data') ?? {}
  initLang(dict)
  initBackground()
  initHeroVideo()
  initNav()
  initReveal()
  initTyping()
  initAnchors()
  initProgress()
  initSpotlight()
  initMagnetic()
  initCounters()
  initHeroPanel()
  initCopy()
}
