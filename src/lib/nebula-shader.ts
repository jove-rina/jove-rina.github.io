export const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}`

export const FRAG = `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uScroll;

float hash21(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(17.1, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  p += uMouse * 0.035;
  p.y += uScroll * 0.06;
  float t = uTime * 0.05;

  // domain-warped clouds
  vec2 q = vec2(
    fbm(p * 2.0 + vec2(0.0, t)),
    fbm(p * 2.0 + vec2(5.2, -t * 0.8))
  );
  float f = fbm(p * 4.0 + q * 1.7 + vec2(t * 0.6, -t * 0.2));

  // ridged filaments
  float ridge = pow(1.0 - abs(f * 2.0 - 1.0), 3.0);

  // diagonal ribbon
  vec2 dir = normalize(vec2(0.6, 0.8));
  float band = dot(p, vec2(-dir.y, dir.x));
  float bandMod = band + 0.08 * sin(p.x * 2.2 + uTime * 0.07);
  float ribbon = exp(-pow(bandMod / 0.16, 2.0));
  float ribbonOuter = exp(-pow((bandMod - 0.34) / 0.16, 2.0));

  float density = pow(ridge, 1.8) * ribbon;

  vec3 col = vec3(0.008, 0.01, 0.028);
  col += vec3(0.28, 0.08, 0.62) * density * 1.5;
  col += vec3(0.9, 0.16, 0.55) * pow(density, 2.0) * 0.9;
  col += vec3(0.16, 0.08, 0.4) * ribbonOuter * ridge * 0.5;

  // warm core along the ribbon (overrides the purple instead of adding to it)
  float warm = exp(-pow((bandMod + 0.02) / 0.085, 2.0)) * smoothstep(0.1, 0.55, ridge);
  col = mix(col, vec3(1.0, 0.38, 0.08), clamp(warm * 1.1, 0.0, 0.85));
  float gold = exp(-pow((bandMod - 0.01) / 0.05, 2.0)) * smoothstep(0.3, 0.8, f);
  col = mix(col, vec3(1.0, 0.68, 0.28), clamp(gold * 0.55, 0.0, 0.5));

  // cyan cluster
  float cluster = exp(-pow(length(p - vec2(0.36, 0.26)) / 0.22, 2.0)) * smoothstep(0.3, 0.75, f);
  col += vec3(0.15, 0.85, 1.0) * cluster * 1.5;

  // core bloom
  float core = exp(-pow(length(p - vec2(0.0, 0.05)) / 0.07, 2.0));
  col += vec3(1.0, 0.78, 0.92) * core * 0.7 * (0.7 + 0.3 * sin(uTime * 0.5));

  // stars
  vec2 sp = uv * 220.0;
  vec2 id = floor(sp);
  vec2 gv = fract(sp) - 0.5;
  float rnd = hash21(id);
  float star = step(0.9975, rnd) * smoothstep(0.5, 0.0, length(gv));
  float tw = 0.6 + 0.4 * sin(uTime * 2.0 + rnd * 40.0);
  col += vec3(0.75, 0.9, 1.0) * star * tw * 1.2;

  vec2 sp2 = uv * 90.0;
  vec2 id2 = floor(sp2);
  float rnd2 = hash21(id2 + 7.0);
  float bigStar = step(0.9995, rnd2) * smoothstep(0.5, 0.0, length(fract(sp2) - 0.5));
  col += vec3(0.9, 0.95, 1.0) * bigStar * 1.2;

  // mountains (two ridged ranges)
  float farH = 0.1 + 0.13 * pow(1.0 - abs(fbm(vec2(uv.x * 3.0, 1.7)) * 2.0 - 1.0), 1.6);
  float nearH = 0.02 + 0.13 * pow(1.0 - abs(fbm(vec2(uv.x * 6.0 + 4.0, 8.0)) * 2.0 - 1.0), 1.2);
  float farMask = smoothstep(farH, farH - 0.004, uv.y);
  float nearMask = smoothstep(nearH, nearH - 0.003, uv.y);
  col = mix(col, vec3(0.01, 0.012, 0.032), farMask * 0.85);
  col = mix(col, vec3(0.004, 0.004, 0.012), nearMask);
  float farRim = smoothstep(farH + 0.006, farH, uv.y) - smoothstep(farH, farH - 0.035, uv.y);
  col += vec3(0.3, 0.45, 0.95) * farRim * 0.32;

  // grain + vignette
  col += (hash21(gl_FragCoord.xy + uTime) - 0.5) * 0.025;
  float vig = smoothstep(0.95, 0.3, length(uv - 0.5));
  col *= 0.82 + 0.18 * vig;

  col = 1.0 - exp(-col * 1.35);
  gl_FragColor = vec4(col, 1.0);
}`
