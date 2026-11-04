import type { ProjectPage } from '../../lib/types'

export const page: ProjectPage = {
  slug: 'rinova-void',
  name: 'Void',
  title: 'Void — Tauri 2 桌面工具箱',
  description: {
    zh: '轻量桌面工具箱：Clash 订阅服务、屏幕取色器、图片编辑器，托盘常驻，macOS 与 Windows。',
    en: 'A lightweight desktop toolbox: Clash subscription service, screen color picker and image editor — tray-first, macOS and Windows.',
  },
  repo: 'https://github.com/jove-rina/rinova-void',
  hero: {
    icon: 'app-window',
    title: 'Void',
    sub: {
      zh: 'Tauri 2 + Vue 3 桌面工具箱 —— 托盘常驻，需要时出现，不需要时不打扰',
      en: 'A Tauri 2 + Vue 3 desktop toolbox — lives in the tray, appears when needed, stays out of the way.',
    },
    badges: [
      { icon: 'package', text: 'v0.4.0' },
      { icon: 'cpu', text: 'Tauri 2', tone: 'green' },
      { icon: 'monitor', text: 'macOS', tone: 'cyan' },
      { icon: 'monitor', text: 'Windows', tone: 'pink' },
    ],
    install: {
      title: { zh: '安装', en: 'Install' },
      blocks: [
        {
          kind: 'comment',
          text: { zh: '从 GitHub Releases 下载安装包（.dmg / .msi）', en: 'Download an installer from GitHub Releases (.dmg / .msi)' },
        },
        {
          kind: 'inline',
          parts: [
            {
              text: { zh: 'GitHub Releases ↗', en: 'GitHub Releases ↗' },
              href: 'https://github.com/jove-rina/rinova-void/releases',
              cls: 'link',
            },
            { text: { zh: '（当前为 v0.3.4；v0.4.0 见仓库）', en: ' (currently v0.3.4; v0.4.0 lives in the repo)' } },
          ],
        },
        { kind: 'gap' },
        { kind: 'comment', text: { zh: '或从源码构建', en: 'Or build from source' } },
        { kind: 'code', text: 'pnpm install &amp;&amp; pnpm tauri:build' },
        {
          kind: 'inline',
          parts: [
            {
              text: { zh: '需要 Rust 工具链与 Tauri CLI ↗', en: 'Requires the Rust toolchain and Tauri CLI ↗' },
              href: 'https://github.com/jove-rina/rinova-void#from-source-development--local-build',
              cls: 'link',
            },
          ],
        },
      ],
    },
  },
  nav: [
    { href: '#features', label: { zh: '工具', en: 'Tools' } },
    { href: '#architecture', label: { zh: '架构', en: 'Architecture' } },
    { href: '#numbers', label: { zh: '版本', en: 'Versions' } },
  ],
  sections: [
    {
      type: 'features',
      id: 'features',
      label: { zh: '工具', en: 'TOOLS' },
      title: { zh: '一个托盘，三件工具', en: 'Three tools, one tray' },
      desc: {
        zh: '每个工具都是独立页面，通过一个注册表接入',
        en: 'Every tool is a self-contained page plugged into one registry.',
      },
      cards: [
        {
          icon: 'network',
          title: { zh: 'Clash 订阅服务', en: 'Clash subscription service' },
          desc: {
            zh: '把机场订阅变成本地 HTTP 端点 http://127.0.0.1:{port}/clash.yaml，Clash Verge 直接引用；每 60 分钟刷新上游。',
            en: 'Turns a subscription URL into a local endpoint at http://127.0.0.1:{port}/clash.yaml for Clash Verge; refreshes upstream every 60 minutes.',
          },
        },
        {
          icon: 'pipette',
          title: { zh: '屏幕取色器', en: 'Color picker' },
          desc: {
            zh: '快照式取色：缩放、平移、像素网格放大镜；左键连续采集，HEX / RGB / HSL 随时复制，最多 1000 条记录。',
            en: 'Snapshot-based picking with zoom, pan and a pixel magnifier; left-click to collect, copy HEX / RGB / HSL, up to 1,000 records.',
          },
        },
        {
          icon: 'image',
          title: { zh: '图片编辑器', en: 'Image editor' },
          desc: {
            zh: '多图上传后进入独立编辑窗口：方形 / 矩形 / 圆形 / 椭圆裁剪、链式裁剪、项目保存、单图 / 缩略图 / ICO 批量导出。',
            en: 'Upload multiple images into a dedicated editor window: square / rect / circle / ellipse crops, chained crops, saved projects, single / thumbnail / ICO export.',
          },
        },
        {
          icon: 'keyboard',
          title: { zh: '全局快捷键', en: 'Global shortcut' },
          desc: {
            zh: 'Cmd+Shift+V（macOS）/ Ctrl+Shift+V（Windows）随时显示或隐藏，配合托盘菜单直接进入取色。',
            en: 'Cmd+Shift+V (macOS) / Ctrl+Shift+V (Windows) toggles the window; the tray menu jumps straight into picking.',
          },
        },
        {
          icon: 'layers',
          title: { zh: '模块化工具', en: 'Modular tools' },
          desc: {
            zh: '每个工具自成一页，新增工具只需在注册表登记一项；界面共用 ToolEntryLayout、VoidButton、VoidToast。',
            en: 'Each tool is its own page; adding one is a single registry entry. Shared ToolEntryLayout, VoidButton and VoidToast.',
          },
        },
        {
          icon: 'package',
          title: { zh: '轻量原生', en: 'Lightweight native' },
          desc: {
            zh: 'Tauri 2 原生包，运行时不依赖 Node；macOS（Apple Silicon / Intel）与 Windows 同一套代码。',
            en: 'A native Tauri 2 bundle with no Node runtime; the same code ships for macOS (Apple Silicon / Intel) and Windows.',
          },
        },
      ],
    },
    {
      type: 'text',
      id: 'architecture',
      label: { zh: '架构', en: 'ARCHITECTURE' },
      title: { zh: 'Rust 在进程内，不做 sidecar', en: 'Rust in-process, no sidecar' },
      desc: { zh: '前端 Vue 3，后端 Rust，共用一层 IPC', en: 'Vue 3 on the front end, Rust behind one IPC layer.' },
      html: {
        zh: '订阅转换不靠外部进程：<strong>rinova-proxy-sdk</strong> 直接编进应用，本地端口由 Rust 侧管理，能回收旧 Void 进程占用的端口，也能在其他应用占用时回退。取色在 Windows 走 GDI、在 macOS 走屏幕录制权限，隐藏应用后再抓快照，避免把 Void 自己的界面拍进去。图片编辑通过批量 IPC（begin / append / commit + take）把会话交给独立的 image-editor WebView。',
        en: 'Subscription conversion needs no sidecar: <strong>rinova-proxy-sdk</strong> is compiled into the app, and the Rust side owns the local port — reclaiming ports left by stale Void processes or falling back when another app holds it. Picking uses GDI on Windows and Screen Recording on macOS, hiding the app before the snapshot so Void never appears in it. The image editor hands its session to a dedicated image-editor WebView over batched IPC (begin / append / commit + take).',
      },
    },
    {
      type: 'stats',
      id: 'numbers',
      label: { zh: '版本', en: 'VERSIONS' },
      title: { zh: '版本与平台', en: 'Versions & platforms' },
      stats: [
        { num: 'v0.4.0', label: { zh: '源码版本', en: 'Source version' }, sub: { zh: '含图片编辑器', en: 'Includes the image editor' } },
        { num: 'v0.3.4', label: { zh: 'GitHub Releases', en: 'GitHub Releases' }, sub: { zh: 'macOS / Windows 安装包', en: 'macOS / Windows installers' } },
        { num: '3', label: { zh: '内置工具', en: 'Built-in tools' }, sub: { zh: 'Clash · 取色 · 图片', en: 'Clash · Picker · Image' } },
      ],
      ctas: [
        {
          label: { zh: 'GitHub 仓库', en: 'GitHub Repository' },
          href: 'https://github.com/jove-rina/rinova-void',
          kind: 'primary',
          icon: 'git-branch',
        },
        {
          label: { zh: '下载安装包', en: 'Download' },
          href: 'https://github.com/jove-rina/rinova-void/releases',
          kind: 'secondary',
          icon: 'download',
        },
      ],
    },
  ],
}
