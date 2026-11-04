import type { ProjectPage } from '../../lib/types'

export const page: ProjectPage = {
  slug: 'rina-hermes-acp',
  name: 'Rina Hermes ACP',
  title: 'Rina Hermes ACP — VS Code & Cursor 插件',
  description: {
    zh: '在 VS Code / Cursor 侧边栏中直接与 Hermes Agent 对话 —— 无需切换终端。',
    en: 'Chat with Hermes Agent directly inside VS Code / Cursor — no terminal switching required.',
  },
  repo: 'https://github.com/jove-rina/rina-hermes-acp',
  hero: {
    icon: 'panel-right',
    title: 'Rina Hermes ACP',
    sub: {
      zh: '在 VS Code / Cursor 中直接与 Hermes Agent 对话 —— 无需切换终端',
      en: 'Chat with Hermes Agent directly inside VS Code / Cursor — no terminal switching required.',
    },
    badges: [
      { icon: 'package', text: 'v0.3.2' },
      { icon: 'code', text: 'VS Code', tone: 'green' },
      { icon: 'pen-line', text: 'Cursor', tone: 'pink' },
      { icon: 'plug', text: 'ACP Protocol', tone: 'cyan' },
    ],
    install: {
      title: { zh: '快速安装', en: 'Quick Install' },
      copy: 'https://marketplace.visualstudio.com/items?itemName=JoveRina.rina-hermes-acp',
      blocks: [
        { kind: 'comment', text: { zh: 'VS Code — 扩展市场搜索', en: 'VS Code — search extensions for' } },
        { kind: 'inline', parts: ['"Rina Hermes ACP"', ' ', { text: { zh: '或', en: 'or' } }, ' ', '"JoveRina"'] },
        {
          kind: 'inline',
          parts: [
            {
              text: { zh: 'VS Code Marketplace 在线安装 ↗', en: 'Install from VS Code Marketplace ↗' },
              href: 'https://marketplace.visualstudio.com/items?itemName=JoveRina.rina-hermes-acp',
              cls: 'link',
            },
          ],
        },
        { kind: 'gap' },
        {
          kind: 'comment',
          text: { zh: 'Cursor — 设置 → Extensions → 搜索', en: 'Cursor — Settings → Extensions → search' },
        },
        { kind: 'inline', parts: ['"Rina Hermes ACP"'] },
        {
          kind: 'inline',
          parts: [
            {
              text: { zh: 'OpenVSX 在线安装 ↗', en: 'Install from OpenVSX ↗' },
              href: 'https://open-vsx.org/extension/JoveRina/rina-hermes-acp',
              cls: 'link',
            },
          ],
        },
      ],
    },
  },
  nav: [
    { href: '#features', label: { zh: '特性', en: 'Features' } },
    { href: '#install', label: { zh: '安装', en: 'Install' } },
  ],
  sections: [
    {
      type: 'features',
      id: 'features',
      label: { zh: '特性', en: 'FEATURES' },
      title: { zh: '核心特性', en: 'Core Features' },
      desc: {
        zh: '八大特性，让 AI 助手融入编辑器工作流',
        en: 'Eight features that bring the AI assistant into your editor workflow.',
      },
      cards: [
        {
          icon: 'messages-square',
          title: { zh: '聊天与消息', en: 'Chat & Messaging' },
          desc: {
            zh: '流式 Markdown 回复、多会话 Tab 管理、会话内搜索、中断生成，无需切换终端。',
            en: 'Streaming Markdown replies, multi-session tabs, in-conversation search, stop generation — all in the sidebar.',
          },
        },
        {
          icon: 'scissors',
          title: { zh: '编辑器深度联动', en: 'Editor Integration' },
          desc: {
            zh: '代码块一键插入光标、@file 引用打开、右键发送选中代码、终端镜像、MCP 配置转发。',
            en: 'One-click code insert, @file references, send selection to chat, terminal mirror, MCP config forwarding.',
          },
        },
        {
          icon: 'scan',
          title: { zh: '环境检测与自愈', en: 'Environment Recovery' },
          desc: {
            zh: 'L0–L5 分层发现 Hermes、版本校验、hermes acp --check 自检；缺依赖自动 pip 安装并重试，工具栏显示百分比进度。',
            en: 'Layered L0–L5 Hermes discovery, version checks and hermes acp --check; missing dependencies are installed automatically, with progress in the toolbar.',
          },
        },
        {
          icon: 'brain',
          title: { zh: '上下文记忆', en: 'Context Memory' },
          desc: {
            zh: '会话记忆附带（last2 / last10 / all / custom），本地历史恢复，32k 字符截断保护。',
            en: 'Context attach (last2 / last10 / all / custom), local history restoration, 32k character budget.',
          },
        },
        {
          icon: 'sliders-horizontal',
          title: { zh: 'Agent & 模型控制', en: 'Agent & Model Control' },
          desc: {
            zh: '多 Agent 配置快速切换、双路径模型选择、Profile 一键切换、Settings 回退预设。',
            en: 'Multi-agent switching, dual-path model selection, profile switcher, settings fallback presets.',
          },
        },
        {
          icon: 'shield-check',
          title: { zh: '安全透明', en: 'Security & Visibility' },
          desc: {
            zh: '聊天内权限审批、思维链 / 工具调用可选可见、连接日志面板、工作区文件隔离。',
            en: 'In-chat permission approval, optional thoughts & tool calls, connection logs, workspace isolation.',
          },
        },
        {
          icon: 'languages',
          title: { zh: '国际化', en: 'Internationalization' },
          desc: {
            zh: '自动跟随 VS Code 语言（English / 中文），全链路本地化，语言热同步。',
            en: 'Follows the VS Code language (English / 中文), fully localized, hot sync on change.',
          },
        },
        {
          icon: 'sparkles',
          title: { zh: '体验打磨', en: 'UX Polish' },
          desc: {
            zh: 'Token 用量环、智能流式滚动、自动重连、切换中断确认；0.3.2 修复连接卡住与跨会话串流。',
            en: 'Token usage ring, smart streaming scroll, auto-reconnect, switch confirmation; 0.3.2 fixes stuck connections and cross-session stream bleed.',
          },
        },
      ],
    },
    {
      type: 'stats',
      stats: [
        { num: 'v0.3.2', label: { zh: '当前版本', en: 'Version' }, sub: { zh: 'VS Code ≥ 1.85', en: 'VS Code ≥ 1.85' } },
        { num: 'MIT', label: { zh: '开源许可', en: 'License' }, sub: { zh: '自由使用与修改', en: 'Free to use and modify' } },
        { num: 'ACP', label: { zh: '通信协议', en: 'Protocol' }, sub: { zh: 'Agent Client Protocol', en: 'Agent Client Protocol' } },
      ],
      ctas: [
        {
          label: { zh: 'GitHub 仓库', en: 'GitHub Repository' },
          href: 'https://github.com/jove-rina/rina-hermes-acp',
          kind: 'primary',
          icon: 'git-branch',
        },
        {
          label: { zh: 'VS Code Marketplace', en: 'VS Code Marketplace' },
          href: 'https://marketplace.visualstudio.com/items?itemName=JoveRina.rina-hermes-acp',
          kind: 'secondary',
          icon: 'package',
        },
      ],
    },
  ],
  footer: { license: 'MIT' },
}
