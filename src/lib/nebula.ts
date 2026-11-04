import { FRAG, VERT } from './nebula-shader'

export interface NebulaHandle {
  start(): void
  stop(): void
  render(time: number): void
  destroy(): void
}

const MAX_WIDTH = 1280
const QUALITY_DESKTOP = 0.5
const QUALITY_MOBILE = 0.42

export function createNebula(canvas: HTMLCanvasElement): NebulaHandle | null {
  const gl = canvas.getContext('webgl', {
    antialias: false,
    alpha: false,
    depth: false,
    stencil: false,
    powerPreference: 'high-performance',
  })
  if (!gl) return null

  const compile = (type: number, source: string): WebGLShader | null => {
    const shader = gl.createShader(type)
    if (!shader) return null
    gl.shaderSource(shader, source)
    gl.compileShader(shader)
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('[nebula]', gl.getShaderInfoLog(shader))
      return null
    }
    return shader
  }

  const vs = compile(gl.VERTEX_SHADER, VERT)
  const fs = compile(gl.FRAGMENT_SHADER, FRAG)
  if (!vs || !fs) return null

  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn('[nebula]', gl.getProgramInfoLog(program))
    return null
  }
  gl.useProgram(program)

  const buffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
  const aPos = gl.getAttribLocation(program, 'aPos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(program, 'uRes')
  const uTime = gl.getUniformLocation(program, 'uTime')
  const uMouse = gl.getUniformLocation(program, 'uMouse')
  const uScroll = gl.getUniformLocation(program, 'uScroll')

  let raf = 0
  let running = false
  let quality = window.innerWidth < 768 ? QUALITY_MOBILE : QUALITY_DESKTOP
  let frames = 0
  let frameTime = 0
  let lastFrame = performance.now()
  const start = performance.now()
  const mouse = { x: 0, y: 0 }
  const target = { x: 0, y: 0 }
  const scroll = { v: 0 }

  const resize = (): void => {
    const rect = canvas.getBoundingClientRect()
    const w = Math.max(320, Math.min(MAX_WIDTH, Math.round(rect.width * quality)))
    const h = Math.max(180, Math.round(rect.height * quality))
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w
      canvas.height = h
    }
  }

  const draw = (time: number): void => {
    resize()
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.useProgram(program)
    gl.uniform2f(uRes, canvas.width, canvas.height)
    gl.uniform1f(uTime, time)
    gl.uniform2f(uMouse, mouse.x, mouse.y)
    gl.uniform1f(uScroll, scroll.v)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  const frame = (): void => {
    if (!running) return
    const now = performance.now()
    const t = (now - start) / 1000
    mouse.x += (target.x - mouse.x) * 0.06
    mouse.y += (target.y - mouse.y) * 0.06
    const height = Math.max(1, canvas.getBoundingClientRect().height)
    scroll.v = Math.max(-1, Math.min(1, -window.scrollY / height))
    draw(t)

    frameTime += now - lastFrame
    lastFrame = now
    frames += 1
    if (frames >= 90) {
      if (frameTime / frames > 26 && quality > 0.42) {
        quality *= 0.82
        resize()
      }
      frames = 0
      frameTime = 0
    }

    raf = requestAnimationFrame(frame)
  }

  const onPointerMove = (event: PointerEvent): void => {
    const rect = canvas.getBoundingClientRect()
    target.x = ((event.clientX - rect.left) / rect.width - 0.5) * 2
    target.y = -((event.clientY - rect.top) / rect.height - 0.5) * 2
  }

  const onResize = (): void => {
    if (!running) draw(0)
  }

  window.addEventListener('pointermove', onPointerMove, { passive: true })
  window.addEventListener('resize', onResize)

  return {
    start(): void {
      if (running) return
      running = true
      raf = requestAnimationFrame(frame)
    },
    stop(): void {
      running = false
      cancelAnimationFrame(raf)
    },
    render(time: number): void {
      draw(time)
    },
    destroy(): void {
      running = false
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('resize', onResize)
    },
  }
}
