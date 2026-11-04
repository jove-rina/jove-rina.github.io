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

/* ── Particle background ── */
function initParticles(): void {
  if (REDUCE) return
  const canvas = document.getElementById('canvas-bg') as HTMLCanvasElement | null
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  let W = 0
  let H = 0
  const mouse = { x: 0, y: 0 }

  class Particle {
    x = 0
    y = 0
    size = 0
    speedX = 0
    speedY = 0
    opacity = 0
    hue = 0

    constructor() {
      this.reset()
    }

    reset(): void {
      this.x = Math.random() * W
      this.y = Math.random() * H
      this.size = Math.random() * 2 + 1
      this.speedX = (Math.random() - 0.5) * 0.5
      this.speedY = (Math.random() - 0.5) * 0.5
      this.opacity = Math.random() * 0.5 + 0.1
      this.hue = 250 + Math.random() * 60
    }

    update(): void {
      this.x += this.speedX
      this.y += this.speedY
      const dx = mouse.x - this.x
      const dy = mouse.y - this.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      if (dist < 150) {
        const force = ((150 - dist) / 150) * 0.3
        this.x -= (dx / dist) * force
        this.y -= (dy / dist) * force
      }
      if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset()
    }

    draw(): void {
      if (!ctx) return
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = `hsla(${this.hue},70%,70%,${this.opacity})`
      ctx.fill()
    }
  }

  const particles: Particle[] = []
  for (let i = 0; i < 120; i++) particles.push(new Particle())

  const resize = (): void => {
    W = canvas.width = window.innerWidth
    H = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', resize)
  resize()

  const drawLines = (): void => {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          ctx.beginPath()
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.strokeStyle = `hsla(260,60%,70%,${0.06 * (1 - dist / 180)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }
    }
  }

  const animate = (): void => {
    ctx.clearRect(0, 0, W, H)
    particles.forEach((p) => {
      p.update()
      p.draw()
    })
    drawLines()
    requestAnimationFrame(animate)
  }
  animate()

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
  })
  document.addEventListener(
    'touchmove',
    (e) => {
      const t = e.touches[0]
      if (!t) return
      mouse.x = t.clientX
      mouse.y = t.clientY
    },
    { passive: true },
  )
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

export function boot(): void {
  const dict = readJson<Dict>('i18n-data') ?? {}
  initLang(dict)
  initParticles()
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
