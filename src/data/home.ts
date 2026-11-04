import type { HomeData } from '../lib/types'

export const home: HomeData = {
  badge: { zh: '开源 · 匠心工具', en: 'Open Source · Craft Tools' },
  title1: { zh: 'Build with', en: 'Build with' },
  brand: 'Jove Rina',
  sub: {
    zh: '开源工具开发 · 创意与技术交汇',
    en: 'Open source tools · Where code meets creativity',
  },
  phrases: {
    zh: ['为 Agent 打造更好的工具', '让 AI 技能开箱即用', '创意 · 技术 · 开源'],
    en: ['Better tools for Agents', 'Skills that just work', 'Create · Code · Open Source'],
  },
  ctas: [
    { label: { zh: '探索项目', en: 'Explore Projects' }, href: '#projects', kind: 'primary' },
    { label: { zh: 'GitHub 组织', en: 'GitHub Org' }, href: 'https://github.com/jove-rina', kind: 'secondary' },
  ],
  stats: [
    { num: '2', label: { zh: 'Hermes 技能', en: 'Hermes Skills' } },
    { num: '1', label: { zh: 'IDE 插件', en: 'IDE Plugin' } },
    { num: '1', label: { zh: '浏览器扩展', en: 'Extension' } },
    { num: '3', label: { zh: '工具链项目', en: 'Toolchain' } },
  ],
  projects: {
    label: { zh: '项目', en: 'PROJECTS' },
    title: { zh: '开源项目', en: 'Open Source' },
    desc: {
      zh: '从 AI 技能、IDE 插件到前端工具链与桌面应用 —— 全部开源',
      en: 'From AI skills and IDE plugins to front-end tooling and desktop apps — all open source.',
    },
    groups: [
      {
        id: 'rinova',
        title: { zh: 'Rinova 工具链', en: 'Rinova Toolchain' },
        count: { zh: '3 个项目', en: '3 projects' },
        items: [
          {
            slug: 'rinova-playground',
            icon: 'blocks',
            name: 'Rinova Playground',
            desc: {
              zh: '面向 Vue3 的「文件即场景」组件演示框架：放一个 .vue 就生成侧栏、源码、输入/输出与 API 文档。',
              en: 'Vue 3 component playground where one .vue file becomes a scene — sidebar, source, I/O and API docs included.',
            },
            meta: ['Vue 3', 'Vite 8', 'npm 0.1.5'],
          },
          {
            slug: 'rinova-devtools',
            icon: 'panel-left',
            name: 'Rinova Devtools',
            desc: {
              zh: '框架无关的前端调试面板：配置、网络、存储、日志与插件扩展，一行接入任意 Web 应用。',
              en: 'Framework-agnostic debugging panel: config, network, storage, logs and plugins — one line to mount in any web app.',
            },
            meta: ['Vanilla TS', 'Shadow DOM', 'v0.1.0'],
          },
          {
            slug: 'rinova-void',
            icon: 'app-window',
            name: 'Void',
            desc: {
              zh: 'Tauri 2 + Vue 3 桌面工具箱：Clash 订阅服务、取色器、图片编辑器，托盘常驻。',
              en: 'Tauri 2 + Vue 3 desktop toolbox: Clash subscription service, color picker and image editor, living in the tray.',
            },
            meta: ['Tauri 2', 'macOS', 'Windows'],
          },
        ],
      },
      {
        id: 'skills',
        title: { zh: 'Jove Hermes Skills', en: 'Jove Hermes Skills' },
        count: { zh: '2 个技能', en: '2 skills' },
        href: 'https://github.com/jove-rina/jove-hermes-skills',
        items: [
          {
            slug: 'hermes-windows-migration',
            icon: 'hard-drive',
            name: 'Windows Migration',
            desc: {
              zh: '将 Hermes Agent 数据从 C 盘迁移到自定义目录。零删除、增量复制、自动环境变量配置。',
              en: 'Migrate Hermes Agent data from C: drive to any custom directory. Zero deletion, incremental copy, auto env-var setup.',
            },
            meta: ['Windows', 'v1.0.1'],
          },
          {
            slug: 'hermes-wechat-integration',
            icon: 'messages-square',
            name: 'WeChat Integration',
            desc: {
              zh: 'Hermes Agent 微信集成技能。官方 iLink Bot API、QR 码登录、双层门控授权、多 Profile 隔离。',
              en: 'WeChat integration for Hermes Agent. Official iLink Bot API, QR login, two-gate authorization, multi-profile isolation.',
            },
            meta: ['WeChat', 'v1.9.0'],
          },
        ],
      },
      {
        id: 'ide',
        title: { zh: 'IDE 插件', en: 'IDE Plugins' },
        count: { zh: '1 个插件', en: '1 plugin' },
        items: [
          {
            slug: 'rina-hermes-acp',
            icon: 'panel-right',
            name: 'Rina Hermes ACP',
            desc: {
              zh: '在 VS Code / Cursor 侧边栏中直接与 Hermes Agent 对话：流式回复、代码块一键插入、多会话、权限审批与 MCP 转发。',
              en: 'Chat with Hermes Agent in your VS Code / Cursor sidebar: streaming replies, one-click inserts, multi-session, approvals and MCP forwarding.',
            },
            meta: ['VS Code', 'Cursor', 'v0.3.2'],
          },
        ],
      },
      {
        id: 'extensions',
        title: { zh: '浏览器扩展', en: 'Browser Extensions' },
        count: { zh: '1 个扩展', en: '1 extension' },
        items: [
          {
            slug: 'axure-utilities',
            icon: 'puzzle',
            name: 'Axure Utilities',
            desc: {
              zh: '从蓝湖 Axure 原型框选提取内容，组装为结构化 Markdown 文档；Vite + TypeScript 工程化。',
              en: 'Drag-select Axure prototype content from Lanhu and assemble structured Markdown. Rebuilt with Vite + TypeScript.',
            },
            meta: ['Chrome / Edge', 'Manifest V3', 'v2.0.0'],
          },
        ],
      },
    ],
  },
  updates: {
    label: { zh: '更新', en: 'UPDATES' },
    title: { zh: '最近更新', en: 'What’s New' },
    desc: {
      zh: '正在进行中的开源工作，按时间倒序',
      en: 'Recent open-source work, newest first.',
    },
    items: [
      {
        date: '2026-11',
        project: 'Rinova Devtools v0.1.0',
        href: '/projects/rinova-devtools/',
        text: {
          zh: '框架无关调试面板首发：Shadow DOM 隔离、网络重放、插件扩展；117 + 5 项测试通过，gzip 30.5KB。',
          en: 'First release of the framework-agnostic panel: Shadow DOM isolation, request replay, plugins; 117 + 5 tests green, 30.5KB gzip.',
        },
      },
      {
        date: '2026-11',
        project: 'Rinova Playground 0.3',
        href: '/projects/rinova-playground/',
        text: {
          zh: '新增 API 契约表（Props / Events / Slots / Exposes / Types）、Markdown 内容页与预览宽度切换；npm 稳定版 0.1.5。',
          en: 'API contract tabs (Props / Events / Slots / Exposes / Types), Markdown pages and preview widths; npm stable is 0.1.5.',
        },
      },
      {
        date: '2026-07',
        project: 'Void v0.4.0',
        href: '/projects/rinova-void/',
        text: {
          zh: '加入图片编辑器：多图裁剪、项目保存、单图 / 缩略图 / ICO 批量导出。',
          en: 'Image editor added: multi-image cropping, project persistence, single / thumbnail / ICO batch export.',
        },
      },
      {
        date: '2026-06',
        project: 'Rina Hermes ACP v0.3.2',
        href: '/projects/rina-hermes-acp/',
        text: {
          zh: '环境检测与自愈（L0–L5 发现 + hermes acp --check 自动补依赖），并修复连接卡住、跨会话串流与内容解析。',
          en: 'Environment detection and recovery (L0–L5 discovery + hermes acp --check auto-install), plus fixes for stuck connections and stream bleed.',
        },
      },
    ],
  },
  focus: {
    label: { zh: '核心', en: 'FOCUS' },
    title: { zh: '核心能力', en: 'Core Capabilities' },
    desc: { zh: '四件事，贯穿所有项目', en: 'Four things every project shares.' },
    items: [
      {
        icon: 'bot',
        title: { zh: '为 AI 而建', en: 'AI-Native' },
        desc: {
          zh: '技能与框架都为 Agent 设计：契约清单、MCP 工具、QR 替代协议，让 AI 能读、能跑、能验证。',
          en: 'Skills and frameworks designed for agents: manifests, MCP tools and QR proxy protocols so AI can read, run and verify.',
        },
      },
      {
        icon: 'layers',
        title: { zh: '匠心工具', en: 'Craft Tools' },
        desc: {
          zh: '从技能到 IDE 插件、浏览器扩展与 npm 包，每件作品都经过设计、实测与打磨。',
          en: 'From skills to IDE plugins, browser extensions and npm packages — each piece is designed, measured and polished.',
        },
      },
      {
        icon: 'shield-check',
        title: { zh: '跨模型验证', en: 'Cross-Model QA' },
        desc: {
          zh: '关键项目经过多模型、多轮独立审查，从代码到文档逐条收敛问题。',
          en: 'Key projects go through multi-model, multi-round review — code and docs, issue by issue.',
        },
      },
      {
        icon: 'globe',
        title: { zh: '开源社区', en: 'Open Source' },
        desc: {
          zh: 'MIT / CC0 等开放许可，自由使用、修改与分享。',
          en: 'MIT / CC0 and other open licenses — use, modify and share freely.',
        },
      },
    ],
  },
  about: {
    label: { zh: '关于', en: 'ABOUT' },
    title: { zh: 'Jove Rina', en: 'Jove Rina' },
    desc: {
      zh: '专注于高质量开源工具 —— 从 AI 技能、IDE 插件到前端框架与桌面应用。',
      en: 'Building quality open-source tools — from AI skills and IDE plugins to front-end frameworks and desktop apps.',
    },
    cards: [
      {
        icon: 'target',
        title: { zh: '使命', en: 'Mission' },
        desc: {
          zh: '让每个开源工具开箱即用、质量过硬。好的工具应该让人感觉不到工具的存在。',
          en: 'Make every open-source tool ready to use with solid quality. Good tools should feel invisible.',
        },
        tag: 'Skill First',
      },
      {
        icon: 'test-tube',
        title: { zh: '质量标准', en: 'Quality' },
        desc: {
          zh: '每个项目都经过跨模型审查与实机验证 —— 从文档一致性到边界条件，不放过细节。',
          en: 'Every project is cross-model reviewed and verified on real devices — from doc consistency to edge cases.',
        },
        tag: 'Cross-Model Review',
      },
    ],
  },
  contact: {
    label: { zh: '联系', en: 'CONTACT' },
    title: { zh: '找到我们', en: 'Get in Touch' },
    desc: { zh: '对项目有想法、建议或合作意向？欢迎联系', en: 'Ideas, suggestions or collaboration? Reach out.' },
    links: [
      { icon: 'mail', text: { zh: 'jove.rina@outlook.com', en: 'jove.rina@outlook.com' }, href: 'mailto:jove.rina@outlook.com' },
      { icon: 'git-branch', text: { zh: 'GitHub · jove-rina', en: 'GitHub · jove-rina' }, href: 'https://github.com/jove-rina' },
      {
        icon: 'messages-square',
        text: { zh: '反馈 Issue', en: 'Issues & Feedback' },
        href: 'https://github.com/jove-rina/jove-hermes-skills/issues',
      },
    ],
  },
}
