import type { ProjectPage } from '../../lib/types'

export const page: ProjectPage = {
  slug: 'rinova-devtools',
  name: 'Rinova Devtools',
  title: 'Rinova Devtools — 框架无关的前端调试面板',
  description: {
    zh: '一行接入任意 Web 应用：环境配置、网络重放、存储、日志与插件扩展，UI 运行在 Shadow DOM。',
    en: 'A framework-agnostic debugging panel: config, request replay, storage, logs and plugins — Shadow DOM isolated.',
  },
  repo: 'https://github.com/jove-rina/rinova-devtools',
  hero: {
    icon: 'panel-left',
    title: 'Rinova Devtools',
    sub: {
      zh: '框架无关的前端调试面板 —— 一行接入，配置、网络、存储、日志与插件扩展',
      en: 'Framework-agnostic debugging panel — one line to mount config, network, storage, logs and plugins.',
    },
    badges: [
      { icon: 'package', text: 'v0.1.0' },
      { icon: 'shield-check', text: 'Shadow DOM', tone: 'green' },
      { icon: 'code', text: 'TypeScript', tone: 'cyan' },
      { icon: 'globe', text: 'Framework-agnostic', tone: 'pink' },
    ],
    install: {
      title: { zh: '本地运行', en: 'Run locally' },
      copy: 'git clone https://github.com/jove-rina/rinova-devtools.git\ncd rinova-devtools && pnpm i && pnpm dev',
      blocks: [
        {
          kind: 'comment',
          text: { zh: 'v0.1 尚未发布 npm，先从仓库运行', en: 'v0.1 is not on npm yet — run it from the repo' },
        },
        { kind: 'code', text: 'git clone https://github.com/jove-rina/rinova-devtools.git' },
        { kind: 'code', text: 'cd rinova-devtools &amp;&amp; pnpm i &amp;&amp; pnpm dev' },
        { kind: 'gap' },
        { kind: 'comment', text: { zh: 'Vue 3 接入（适配器）', en: 'Vue 3 adapter' } },
        { kind: 'code', text: "app.use(createVueDevtools({ appName: 'My App' }))" },
        {
          kind: 'inline',
          parts: [
            {
              text: { zh: '仓库文档：产品定义 / 架构 / 插件开发 ↗', en: 'Docs: product, architecture, plugin guide ↗' },
              href: 'https://github.com/jove-rina/rinova-devtools/tree/master/docs',
              cls: 'link',
            },
          ],
        },
      ],
    },
  },
  nav: [
    { href: '#screenshots', label: { zh: '截图', en: 'Screens' } },
    { href: '#features', label: { zh: '特性', en: 'Features' } },
    { href: '#architecture', label: { zh: '架构', en: 'Architecture' } },
  ],
  sections: [
    {
      type: 'screenshots',
      id: 'screenshots',
      label: { zh: '界面', en: 'UI' },
      title: { zh: '面板实机截图', en: 'The panel' },
      desc: {
        zh: '深色 / 浅色主题、三向停靠与 390px 窄屏（真实运行截图）',
        en: 'Dark and light themes, three dock positions and a 390px viewport — real screenshots.',
      },
      items: [
        {
          src: '/projects/rinova-devtools/panel-dark.png',
          alt: 'Rinova Devtools dark panel',
          caption: { zh: '深色主题 · 网络面板', en: 'Dark theme · network panel' },
        },
        {
          src: '/projects/rinova-devtools/panel-light.png',
          alt: 'Rinova Devtools light panel',
          caption: { zh: '浅色主题 · 配置面板', en: 'Light theme · config panel' },
        },
        {
          src: '/projects/rinova-devtools/panel-mobile.png',
          alt: 'Rinova Devtools on a 390px viewport',
          caption: { zh: '390px 窄屏 · 无横向滚动', en: '390px viewport · no horizontal scroll' },
        },
      ],
    },
    {
      type: 'features',
      id: 'features',
      label: { zh: '特性', en: 'FEATURES' },
      title: { zh: '核心特性', en: 'Core Features' },
      desc: {
        zh: '内置面板与业务插件同构 —— 新增一个面板不超过 40 行',
        en: 'Built-in panels and business plugins share one API — a new panel takes ≤ 40 lines.',
      },
      cards: [
        {
          icon: 'component',
          title: { zh: '框架无关内核', en: 'Framework-agnostic' },
          desc: {
            zh: '内核只依赖 DOM，Vue / React / Svelte / 原生页面同一套能力；适配器只做生命周期与响应式桥接。',
            en: 'The core only depends on the DOM — Vue, React, Svelte and plain pages share it. Adapters just bridge lifecycle and reactivity.',
          },
        },
        {
          icon: 'shield-check',
          title: { zh: 'Shadow DOM 隔离', en: 'Shadow DOM Isolation' },
          desc: {
            zh: 'UI 运行在 Shadow DOM，宿主样式与组件库互不污染；无 UI 库、无 CSS 框架、无远程资源。',
            en: 'The UI lives in a Shadow DOM, so host styles and component libraries never collide. No UI kit, no CSS framework, no remote assets.',
          },
        },
        {
          icon: 'settings',
          title: { zh: 'schema 配置', en: 'Schema-driven config' },
          desc: {
            zh: '下拉 / 文本 / 数字 / 开关字段由 schema 驱动，改动即时生效并持久化；业务用 getValue() 读取。',
            en: 'Select, text, number and switch fields come from a schema — instant apply and persistence, readable via getValue().',
          },
        },
        {
          icon: 'network',
          title: { zh: '网络面板', en: 'Network panel' },
          desc: {
            zh: '补丁 fetch 与 XMLHttpRequest，记录状态、耗时、请求 / 响应体；支持复制 cURL 与重放请求。',
            en: 'Patches fetch and XMLHttpRequest, records status, timing and bodies; copy as cURL or replay a request.',
          },
        },
        {
          icon: 'database',
          title: { zh: '存储与日志', en: 'Storage & logs' },
          desc: {
            zh: '查看、编辑 localStorage / sessionStorage，查看与删除 Cookie；捕获 console 与未捕获异常，按级别过滤。',
            en: 'Inspect and edit localStorage / sessionStorage, view and delete cookies; capture console output and uncaught errors.',
          },
        },
        {
          icon: 'zap',
          title: { zh: '快捷操作', en: 'Quick actions' },
          desc: {
            zh: '接入方注册任意动作：复制 token、切 Mock、清缓存，支持二次确认。',
            en: 'Register any action: copy a token, toggle a mock, clear caches — with optional confirmation.',
          },
        },
        {
          icon: 'blocks',
          title: { zh: '插件系统', en: 'Plugin system' },
          desc: {
            zh: '任意技术栈用 render(container, ctx) 渲染自己的面板；内置面板就是第一方插件。',
            en: 'Any stack can render its own panel via render(container, ctx); built-in panels are first-party plugins.',
          },
        },
        {
          icon: 'layout-grid',
          title: { zh: '主题与停靠', en: 'Theme & docking' },
          desc: {
            zh: '深 / 浅 / 跟随系统，右侧 / 左侧 / 底部停靠，宽度可拖拽；悬浮球可拖拽吸附并记忆位置。',
            en: 'Dark / light / system, dock right / left / bottom with draggable width; the floating ball snaps and remembers its place.',
          },
        },
      ],
    },
    {
      type: 'text',
      id: 'architecture',
      label: { zh: '架构', en: 'ARCHITECTURE' },
      title: { zh: '为什么不是再写一个 Vue 组件？', en: 'Why not another Vue component?' },
      desc: { zh: '从业务组件里拆出来的可复用外壳', en: 'A reusable shell extracted from a business component.' },
      html: {
        zh: '内部的 DevTools 组件证明了两件事：业务开发真正高频需要的是<strong>贴着业务的环境配置、快捷切号、Mock 开关</strong>；而把 1600 行的 Vue 组件复制到下一个项目，会把路由、用户 store、登录接口和 UI 库一起带过去。Rinova Devtools 因此把边界钉死：内核只认 DOM，能力以插件为单元，适配器不超过 150 行。',
        en: 'An internal DevTools component proved two things: teams need <strong>environment switching, quick account changes and mock toggles next to the app</strong>, and copying a 1600-line Vue component to the next project drags routing, user stores, login APIs and UI libraries along. Rinova Devtools fixes the boundary: the core only knows the DOM, capabilities are plugins, adapters stay under 150 lines.',
      },
    },
    {
      type: 'stats',
      id: 'numbers',
      label: { zh: '数据', en: 'NUMBERS' },
      title: { zh: '实测与约束', en: 'Measured' },
      stats: [
        { num: '30.5KB', label: { zh: '核心包 gzip', en: 'Core gzip' }, sub: { zh: '目标 &lt; 35KB', en: 'Budget &lt; 35KB' } },
        { num: '122', label: { zh: '单元测试', en: 'Unit tests' }, sub: { zh: 'core 117 + vue 5', en: 'core 117 + vue 5' } },
        { num: '3', label: { zh: '响应式宽度', en: 'Breakpoints' }, sub: { zh: '1440 / 1024 / 390 无横滚', en: '1440 / 1024 / 390, no scroll' } },
      ],
      ctas: [
        {
          label: { zh: 'GitHub 仓库', en: 'GitHub Repository' },
          href: 'https://github.com/jove-rina/rinova-devtools',
          kind: 'primary',
          icon: 'git-branch',
        },
        {
          label: { zh: '架构文档', en: 'Architecture Docs' },
          href: 'https://github.com/jove-rina/rinova-devtools/blob/master/docs/02-架构设计.md',
          kind: 'secondary',
          icon: 'book-open',
        },
      ],
    },
  ],
  footer: { license: 'MIT' },
}
