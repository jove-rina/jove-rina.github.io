import { getLang, initLang, type Dict, type Lang } from './i18n'

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

export function boot(): void {
  const dict = readJson<Dict>('i18n-data') ?? {}
  initLang(dict)
  initParticles()
  initNav()
  initReveal()
  initTyping()
  initAnchors()
}
