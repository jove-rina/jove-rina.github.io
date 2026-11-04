import * as THREE from 'three'

const W = 1280
const H = 720
const T = 6 // loop seconds
const COUNT = 14000

const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' })
renderer.setPixelRatio(1)
renderer.setSize(W, H)
renderer.setClearColor(0x000000, 0)
document.body.appendChild(renderer.domElement)

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
camera.position.set(0, 0, 7.2)

const stream = new Float32Array(COUNT * 3)
const ring = new Float32Array(COUNT * 3)
const rand = new Float32Array(COUNT)
const size = new Float32Array(COUNT)
const rim = new Float32Array(COUNT)

for (let i = 0; i < COUNT; i++) {
  const r = Math.random()
  const s = i % 9
  const sy = Math.random() * 9.5 - 4.75
  const funnel = 0.5 + 0.5 * ((sy + 4.75) / 9.5)
  stream[i * 3] = (s - 4) * 0.62 * funnel + Math.sin(sy * 0.9 + s) * 0.06
  stream[i * 3 + 1] = sy
  stream[i * 3 + 2] = Math.random() * 1.4 - 0.7

  const spokes = 56
  const spoke = Math.floor(Math.random() * spokes) / spokes
  const angle = spoke * Math.PI * 2 + (Math.random() - 0.5) * 0.03
  const isRim = Math.random() < 0.06 ? 1 : 0
  const radius = isRim ? 0.99 + Math.random() * 0.04 : 1.0 + Math.pow(Math.random(), 2.4) * 2.55
  ring[i * 3] = Math.cos(angle) * radius
  ring[i * 3 + 1] = Math.sin(angle) * radius * 0.62
  ring[i * 3 + 2] = Math.sin(angle * 3) * 0.18 + (Math.random() - 0.5) * 0.12

  rand[i] = r
  rim[i] = isRim
  size[i] = isRim ? 1.7 + Math.random() * 1.5 : 1.1 + Math.random() * 2.6
}

const geometry = new THREE.BufferGeometry()
geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(COUNT * 3), 3))
geometry.setAttribute('aStream', new THREE.BufferAttribute(stream, 3))
geometry.setAttribute('aRing', new THREE.BufferAttribute(ring, 3))
geometry.setAttribute('aRand', new THREE.BufferAttribute(rand, 1))
geometry.setAttribute('aSize', new THREE.BufferAttribute(size, 1))
geometry.setAttribute('aRim', new THREE.BufferAttribute(rim, 1))

const material = new THREE.ShaderMaterial({
  uniforms: {
    uProgress: { value: 0 },
    uTime: { value: 0 },
    uRot: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
    uColorA: { value: new THREE.Color('#a78bfa') },
    uColorB: { value: new THREE.Color('#22d3ee') },
    uColorC: { value: new THREE.Color('#e879f9') },
  },
  vertexShader: /* glsl */ `
    attribute vec3 aStream;
    attribute vec3 aRing;
    attribute float aRand;
    attribute float aSize;
    attribute float aRim;
    uniform float uProgress;
    uniform float uTime;
    uniform float uRot;
    uniform vec2 uMouse;
    varying float vMix;
    varying float vAlpha;
    varying float vRim;

    vec3 rotateZ(vec3 p, float a) {
      float c = cos(a);
      float s = sin(a);
      return vec3(c * p.x - s * p.y, s * p.x + c * p.y, p.z);
    }

    void main() {
      vec3 ringPos = rotateZ(aRing, uRot);
      float morph = smoothstep(0.0, 1.0, uProgress);

      vec3 streamPos = aStream;
      streamPos.y = mod(streamPos.y - uTime * 1.6667 + 5.0, 10.0) - 5.0;

      vec3 pos = mix(streamPos, ringPos, morph);

      float t = uTime;
      pos.x += sin(t * 0.55 + aRand * 6.283) * 0.05;
      pos.y += cos(t * 0.48 + aRand * 9.42) * 0.05;
      pos.z += sin(t * 0.4 + aRand * 4.0) * 0.06;

      pos.xy += uMouse * (0.08 + aRand * 0.18);

      vec4 mv = modelViewMatrix * vec4(pos, 1.0);
      gl_Position = projectionMatrix * mv;
      gl_PointSize = aSize * (14.0 / -mv.z) * (1.0 + aRim * 0.25);
      vMix = aRand;
      vRim = aRim;
      vAlpha = (0.55 + 0.45 * sin(aRand * 6.283 + t * 1.4)) * (1.0 + aRim * 0.3);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 uColorA;
    uniform vec3 uColorB;
    uniform vec3 uColorC;
    varying float vMix;
    varying float vAlpha;
    varying float vRim;

    void main() {
      vec2 uv = gl_PointCoord - 0.5;
      float d = length(uv);
      if (d > 0.5) discard;
      float a = smoothstep(0.5, 0.0, d);
      a *= a;
      vec3 col = vMix < 0.78
        ? mix(uColorA, uColorB, vMix / 0.78)
        : mix(uColorB, uColorC, (vMix - 0.78) / 0.22);
      col = mix(col, vec3(0.82, 0.86, 1.0), vRim * 0.65);
      gl_FragColor = vec4(col, a * 0.62 * min(vAlpha, 1.6));
    }
  `,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
})

const points = new THREE.Points(geometry, material)
points.frustumCulled = false
scene.add(points)

function smoothstep(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return t * t * (3 - 2 * t)
}

function renderFrame(t: number): void {
  const phase = (t / T) * Math.PI * 2
  const u = t / T
  material.uniforms.uProgress.value = smoothstep(0.14, 0.34, u) - smoothstep(0.66, 0.86, u)
  material.uniforms.uRot.value = phase
  material.uniforms.uTime.value = t
  camera.position.z = 7.2 + Math.sin(phase) * 0.35
  renderer.render(scene, camera)
}

;(window as unknown as { renderFrame: (t: number) => void }).renderFrame = renderFrame
renderFrame(0)
;(window as unknown as { __ready: boolean }).__ready = true
