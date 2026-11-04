import type { ProjectPage } from '../../lib/types'

export const page: ProjectPage = {
  slug: 'rinova-playground',
  name: 'Rinova Playground',
  title: 'Rinova Playground — Vue3「文件即场景」组件演示框架',
  description: {
    zh: '放一个 .vue 就是场景：侧栏、源码、输入/输出、API 契约表与 AI 可读的 manifest。',
    en: 'Drop a .vue file and it becomes a scene — sidebar, source, I/O, API contracts and an AI-readable manifest.',
  },
  repo: 'https://github.com/jove-rina/rinova-playground',
  hero: {
    icon: 'blocks',
    title: 'Rinova Playground',
    sub: {
      zh: '面向 Vue3 的「文件即场景」组件演示框架 —— 你只放 .vue 文件，它负责其余一切',
      en: 'A file-as-scene component playground for Vue 3 — you drop a .vue file, it handles the rest.',
    },
    badges: [
      { icon: 'package', text: 'npm 0.1.5' },
      { icon: 'code', text: 'Vue 3', tone: 'green' },
      { icon: 'cpu', text: 'MCP', tone: 'cyan' },
      { icon: 'shield-check', text: 'MIT', tone: 'pink' },
    ],
    install: {
      title: { zh: '快速开始', en: 'Quick Start' },
      blocks: [
        { kind: 'comment', text: { zh: '创建项目', en: 'Create a project' } },
        { kind: 'code', text: 'pnpm create rinova-playground my-lib' },
        { kind: 'code', text: 'cd my-lib &amp;&amp; pnpm i &amp;&amp; pnpm dev' },
        { kind: 'gap' },
        { kind: 'comment', text: { zh: '写这一个文件，侧栏立刻出现「Button / Size」', en: 'Write one file — the sidebar shows Button / Size' } },
        { kind: 'code', text: 'src/scenes/button/size.vue' },
        {
          kind: 'inline',
          parts: [
            {
              text: { zh: '仓库与文档 ↗', en: 'Repository & docs ↗' },
              href: 'https://github.com/jove-rina/rinova-playground',
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
    { href: '#contract', label: { zh: '契约', en: 'Contract' } },
  ],
  sections: [
    {
      type: 'screenshots',
      id: 'screenshots',
      label: { zh: '界面', en: 'UI' },
      title: { zh: '实机界面', en: 'In action' },
      desc: {
        zh: '左侧目录树、场景内源码卡片、输入 / 输出面板，以及从 TS 类型与 JSDoc 生成的 API 表（真实运行截图）',
        en: 'Directory tree, in-scene source cards, I/O panels and API tables generated from TS types and JSDoc — real screenshots.',
      },
      items: [
        {
          src: '/projects/rinova-playground/scenes.png',
          alt: 'Rinova Playground scene view',
          caption: { zh: '场景视图 · Button / 11 个场景', en: 'Scene view · Button / 11 scenes' },
          size: 'wide',
        },
        {
          src: '/projects/rinova-playground/api.png',
          alt: 'Rinova Playground API view',
          caption: { zh: 'API 视图 · MyInput 17 个 API', en: 'API view · MyInput, 17 APIs' },
          size: 'wide',
        },
      ],
    },
    {
      type: 'features',
      id: 'features',
      label: { zh: '特性', en: 'FEATURES' },
      title: { zh: '核心特性', en: 'Core Features' },
      desc: {
        zh: '只管三件事：组件能力怎么被看见、被试用、被 AI 读到',
        en: 'Three jobs only: make component capabilities visible, tryable and readable by AI.',
      },
      cards: [
        {
          icon: 'file-code',
          title: { zh: '文件即场景', en: 'File as scene' },
          desc: {
            zh: 'scenes/&lt;分组&gt;/&lt;页&gt;/&lt;场景&gt;.vue，保存即出现；目录即侧栏，不需要注册路由或写 stories 文件。',
            en: 'scenes/&lt;group&gt;/&lt;page&gt;/&lt;scene&gt;.vue appears on save. Directories become the sidebar — no route registry, no stories file.',
          },
        },
        {
          icon: 'wand-sparkles',
          title: { zh: '自动契约提取', en: 'Automatic contracts' },
          desc: {
            zh: '用 vue-component-meta 从 TS 类型与 JSDoc 提取 props / events / slots / exposes，过滤 Vue 透传属性。',
            en: 'vue-component-meta extracts props, events, slots and exposes from TS types and JSDoc, filtering Vue fallthrough props.',
          },
        },
        {
          icon: 'table',
          title: { zh: 'API 文档表', en: 'API tables' },
          desc: {
            zh: 'Props / Events / Slots / Exposes / Types 页签，类型可复制、缺说明有标记、每个 API 列出引用它的场景。',
            en: 'Props / Events / Slots / Exposes / Types tabs; copyable types, missing-description markers, and scenes that use each API.',
          },
        },
        {
          icon: 'search',
          title: { zh: '场景内源码与搜索', en: 'Source & search' },
          desc: {
            zh: '每个场景下方一张源码卡片，shiki 高亮、多文件 Tab、⌘/Ctrl+F 搜索（跨 token 匹配、全词、大小写）。',
            en: 'A source card under each scene: shiki highlighting, file tabs, ⌘/Ctrl+F search with whole-word and case options.',
          },
        },
        {
          icon: 'sliders-horizontal',
          title: { zh: '输入 / 输出面板', en: 'Input / Output' },
          desc: {
            zh: 'useSceneArgs + useSceneOutput 就地驱动参数与结果；对象与对象数组字段可展开，事件参数带完整签名。',
            en: 'useSceneArgs + useSceneOutput drive args and results in place; object fields expand and event params show full signatures.',
          },
        },
        {
          icon: 'book-open',
          title: { zh: 'Markdown 内容页', en: 'Markdown pages' },
          desc: {
            zh: '页面里放 .md 就是内容页：frontmatter、callout、步骤条、文档排版，写文档不用单独做一个页面。',
            en: 'A .md file becomes a content page: frontmatter, callouts, steps and doc layout — no separate page needed.',
          },
        },
        {
          icon: 'layout-grid',
          title: { zh: '预览宽度与设备外壳', en: 'Preview widths' },
          desc: {
            zh: '自适应 / 390 / 820 / 1280 / 自定义，手机与平板带设备外壳；容器查询驱动场景内单栏布局。',
            en: 'Auto / 390 / 820 / 1280 / custom with device shells; container queries collapse scene layouts to one column.',
          },
        },
        {
          icon: 'cpu',
          title: { zh: 'AI 可读', en: 'AI-readable' },
          desc: {
            zh: '构建产出 manifest.json / llms.txt / coverage.md；@rinova/playground-mcp 提供 4 个只读工具给 Claude Code / Cursor。',
            en: 'Builds emit manifest.json / llms.txt / coverage.md; @rinova/playground-mcp exposes four read-only tools to Claude Code / Cursor.',
          },
        },
      ],
    },
    {
      type: 'text',
      id: 'contract',
      label: { zh: '契约', en: 'CONTRACT' },
      title: { zh: '为什么不是 Storybook？', en: 'Why not Storybook?' },
      desc: { zh: '比的是「加一个场景要写多少代码」', en: 'The metric is how much code one scene costs.' },
      html: {
        zh: 'Storybook 要写 <strong>*.stories.ts</strong> + 手写 argTypes + 维护 main.ts；Histoire 要写 <strong>.story.vue</strong> 且仍需注册。Rinova Playground 的答案是：<strong>放一个 .vue，侧栏自动出现</strong>。契约不靠手写 argTypes，而由 vue-component-meta 从源码提取；构建产物是纯静态站点，运行时包 1.1MB，不含编辑器代码。',
        en: 'Storybook needs a <strong>*.stories.ts</strong>, hand-written argTypes and a maintained main.ts; Histoire needs <strong>.story.vue</strong> plus registration. Rinova Playground answers with: <strong>drop one .vue and it appears</strong>. Contracts come from vue-component-meta instead of hand-written argTypes; the build is a static site and the runtime bundle is 1.1MB with no editor code.',
      },
    },
    {
      type: 'stats',
      id: 'numbers',
      label: { zh: '数据', en: 'NUMBERS' },
      title: { zh: '版本与产物', en: 'Versions & artifacts' },
      stats: [
        { num: '0.1.5', label: { zh: 'npm 稳定版', en: 'npm stable' }, sub: { zh: '4 个包同步发布', en: '4 packages published' } },
        { num: '0.3.0', label: { zh: '仓库版本', en: 'Repo version' }, sub: { zh: '类型页签 / Markdown 页 / 预览宽度', en: 'Types tabs / Markdown / widths' } },
        { num: '4', label: { zh: 'npm 包', en: 'Packages' }, sub: { zh: 'core · vite · mcp · create', en: 'core · vite · mcp · create' } },
      ],
      ctas: [
        {
          label: { zh: 'GitHub 仓库', en: 'GitHub Repository' },
          href: 'https://github.com/jove-rina/rinova-playground',
          kind: 'primary',
          icon: 'git-branch',
        },
        {
          label: { zh: 'npm 包', en: 'npm package' },
          href: 'https://www.npmjs.com/package/@rinova/playground',
          kind: 'secondary',
          icon: 'package',
        },
      ],
    },
  ],
  footer: { license: 'MIT' },
}
