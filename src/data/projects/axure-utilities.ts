import type { ProjectPage } from '../../lib/types'

export const page: ProjectPage = {
  slug: 'axure-utilities',
  name: 'Axure Utilities',
  title: 'Axure Utilities — 蓝湖原型转 Markdown',
  description: {
    zh: 'Chrome / Edge 扩展：从蓝湖 Axure 原型框选提取内容，组装为结构化 Markdown 文档。',
    en: 'Chrome / Edge extension that turns Lanhu Axure prototypes into structured Markdown documents.',
  },
  repo: 'https://github.com/jove-rina/lanhu-axure-extractor-ext',
  hero: {
    icon: 'puzzle',
    title: 'Axure Utilities',
    sub: {
      zh: '从蓝湖 Axure 原型中框选提取内容，组装为结构化 Markdown 文档',
      en: 'Drag-select content from Lanhu Axure prototypes and assemble structured Markdown documents.',
    },
    badges: [
      { icon: 'puzzle', text: 'Chrome Extension' },
      { icon: 'package', text: 'Manifest V3', tone: 'green' },
      { icon: 'zap', text: 'Vite + TypeScript', tone: 'pink' },
      { icon: 'package', text: 'v2.0.0' },
    ],
    install: {
      blocks: [
        { kind: 'comment', text: { zh: '从 GitHub Releases 下载预编译包', en: 'Download the prebuilt package from GitHub Releases' } },
        {
          kind: 'inline',
          parts: [
            { text: { zh: '前往 ', en: 'Open ' } },
            {
              text: { zh: 'GitHub Releases v2.0.0', en: 'GitHub Releases v2.0.0' },
              href: 'https://github.com/jove-rina/lanhu-axure-extractor-ext/releases/tag/v2.0.0',
              cls: 'link',
            },
            {
              text: {
                zh: ' → 下载 zip → 解压 → chrome://extensions → 开发者模式 → 加载已解压的扩展 → 选择 dist 目录',
                en: ' → download zip → unzip → chrome://extensions → developer mode → Load unpacked → pick the dist folder',
              },
            },
          ],
        },
      ],
    },
  },
  nav: [
    { href: '#features', label: { zh: '功能', en: 'Features' } },
    { href: '#install-detail', label: { zh: '安装', en: 'Install' } },
  ],
  sections: [
    {
      type: 'features',
      id: 'features',
      label: { zh: '功能', en: 'FEATURES' },
      title: { zh: '核心能力', en: 'Core Capabilities' },
      desc: {
        zh: '内容提取 · 文档构建 · 编辑增强 · 导出 · 按页保存 · 深色 UI',
        en: 'Extract · build · edit · export · per-page save · dark UI.',
      },
      cards: [
        {
          icon: 'target',
          title: { zh: '内容提取', en: 'Extraction' },
          desc: {
            zh: '拖拽框选提取页面内容；Axure 表格智能识别（按 Y/X 坐标重组）；文本降级提取；跨 iframe 拾取。',
            en: 'Drag-select content; smart Axure table reconstruction by Y/X coordinates; text fallback; cross-iframe picking.',
          },
        },
        {
          icon: 'package',
          title: { zh: '文档构建', en: 'Document Builder' },
          desc: {
            zh: '模块化标题 + 多条目组织；拖拽排序；独立展开/收起；全选/批量删除；聚焦模式高亮当前模块。',
            en: 'Section headings with multiple entries; drag reordering; expand/collapse; bulk select/delete; focus mode.',
          },
        },
        {
          icon: 'pen-line',
          title: { zh: '编辑增强', en: 'Editing' },
          desc: {
            zh: '独立编辑弹窗（可拖拽/全屏）；分栏 Markdown 编辑器；撤销/重做；拾取填充条目；可折叠条目。',
            en: 'Draggable / fullscreen editor modal; split Markdown editor; undo & redo; pick-to-fill; collapsible entries.',
          },
        },
        {
          icon: 'upload',
          title: { zh: '导出', en: 'Export' },
          desc: {
            zh: '整文档/单模块：预览（深色主题 HTML）、复制、下载。文件名含真实 Axure 页面标题，日期后缀。',
            en: 'Whole doc or one section: preview, copy, download. Filenames use the real Axure page title plus a date suffix.',
          },
        },
        {
          icon: 'save',
          title: { zh: '按页保存', en: 'Per-Page Save' },
          desc: {
            zh: '按 versionId + pageId 缓存模块数据至 chrome.storage.local。切换页面自动保存，关闭浏览器不丢失。',
            en: 'Caches per versionId + pageId in chrome.storage.local — autosaved when switching pages, survives restarts.',
          },
        },
        {
          icon: 'moon',
          title: { zh: '深色玻璃态 UI', en: 'Dark Glass UI' },
          desc: {
            zh: '全暗色主题；可拖拽浮动面板；内联 SVG 图标系统；暗色细滚动条；中/英文随时切换。',
            en: 'Dark theme; draggable floating panel; inline SVG icons; slim scrollbars; instant zh/en switch.',
          },
        },
      ],
    },
    {
      type: 'text',
      id: 'product',
      label: { zh: '产品介绍', en: 'INTRO' },
      title: { zh: '为什么需要 Axure Utilities？', en: 'Why Axure Utilities?' },
      desc: { zh: '让原型到文档的转换变得流畅自然', en: 'Make prototype-to-document feel effortless.' },
      html: {
        zh: '产品经理、交互设计师和开发每天在蓝湖上查看 Axure 原型、对照表格、整理需求文档。Axure Utilities 将这一过程压缩为：<strong>在原型页框选区域 → 自动识别表格/文本 → 填入模块化文档 → 预览/复制/下载 Markdown</strong>。',
        en: 'PMs, designers and developers read Axure prototypes on Lanhu every day, cross-check tables and rewrite requirement docs. Axure Utilities compresses that into: <strong>drag-select on the prototype → auto-detect table/text → fill modular sections → preview / copy / download Markdown</strong>.',
      },
    },
    {
      type: 'steps',
      id: 'workflow',
      label: { zh: '工作流', en: 'WORKFLOW' },
      title: { zh: '使用流程', en: 'How it works' },
      desc: { zh: '三步完成从原型到文档的转换', en: 'Three steps from prototype to document.' },
      steps: [
        {
          title: { zh: '打开原型', en: 'Open the prototype' },
          desc: {
            zh: '登录蓝湖 → 打开 Axure 原型页面 → 点击扩展图标 → 打开文档构建器。',
            en: 'Sign in to Lanhu → open the Axure page → click the extension icon → open the builder.',
          },
        },
        {
          title: { zh: '框选提取', en: 'Drag-select' },
          desc: {
            zh: '新增模块 → 点击「拾取」→ 在页面上拖拽框选 → 自动识别并填入。',
            en: 'Add a section → click Pick → drag on the page → content is detected and inserted.',
          },
        },
        {
          title: { zh: '导出文档', en: 'Export' },
          desc: {
            zh: '预览确认 → 下载 Markdown 文件 → 直接用于文档、Wiki 或 AI 工具。',
            en: 'Preview → download the Markdown → drop it into docs, a wiki or any AI tool.',
          },
        },
      ],
    },
    {
      type: 'steps',
      id: 'install-detail',
      label: { zh: '安装', en: 'INSTALL' },
      title: { zh: '安装说明', en: 'Installation' },
      desc: { zh: '两步完成，无需编译', en: 'Two steps, no build required.' },
      steps: [
        {
          title: { zh: '前置条件', en: 'Prerequisites' },
          desc: {
            zh: '<strong>浏览器</strong>：Chrome 或 Edge<br /><strong>站点</strong>：蓝湖 Axure 页面（lanhuapp.com）',
            en: '<strong>Browser</strong>: Chrome or Edge<br /><strong>Site</strong>: Lanhu Axure pages (lanhuapp.com)',
          },
        },
        {
          title: { zh: '安装步骤', en: 'Steps' },
          desc: {
            zh: '① 前往 GitHub Releases 下载 lanhu-axure-extractor-ext-v2.0.0.zip<br />② 解压 zip 文件<br />③ 打开 chrome://extensions 或 edge://extensions<br />④ 开启「开发者模式」→「加载已解压的扩展」，选择解压后的 dist 目录',
            en: '① Download lanhu-axure-extractor-ext-v2.0.0.zip from GitHub Releases<br />② Unzip it<br />③ Open chrome://extensions or edge://extensions<br />④ Enable Developer mode → Load unpacked → pick the dist folder',
          },
        },
        {
          title: { zh: '商店安装', en: 'Store listing' },
          desc: {
            zh: 'Chrome Web Store / Edge Add-ons 上架筹备中。',
            en: 'Chrome Web Store / Edge Add-ons listing is in preparation.',
          },
        },
      ],
    },
    {
      type: 'repo',
      label: { zh: '源代码', en: 'SOURCE' },
      name: 'jove-rina/lanhu-axure-extractor-ext',
      href: 'https://github.com/jove-rina/lanhu-axure-extractor-ext',
    },
  ],
  footer: { license: 'GPL-3.0' },
}
