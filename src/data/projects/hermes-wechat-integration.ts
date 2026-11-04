import { icon } from '../../lib/icons'
import type { ProjectPage } from '../../lib/types'

export const page: ProjectPage = {
  slug: 'hermes-wechat-integration',
  name: 'WeChat Integration',
  title: 'WeChat Integration — Hermes Agent 技能',
  description: {
    zh: '将 Hermes Agent 连接到个人微信：官方 iLink Bot API、QR 登录、双层门控授权、多 Profile 隔离。',
    en: 'Connect Hermes Agent to personal WeChat — official iLink Bot API, QR login, two-gate authorization, multi-profile isolation.',
  },
  repo: 'https://github.com/jove-rina/jove-hermes-skills',
  hero: {
    icon: 'messages-square',
    title: 'WeChat Integration',
    sub: {
      zh: '将 Hermes Agent 连接到个人微信 — 消息收发、多配置隔离与故障排查',
      en: 'Connect Hermes Agent to personal WeChat — messaging, multi-profile isolation and troubleshooting.',
    },
    badges: [
      { icon: 'package', text: 'v1.9.0' },
      { icon: 'wrench', text: 'Hermes Agent', tone: 'green' },
      { icon: 'qr-code', text: 'iLink Bot API', tone: 'pink' },
    ],
    install: {
      copy: 'hermes skills tap add jove-rina/jove-hermes-skills\nhermes skills install jove-rina/jove-hermes-skills/hermes-wechat-integration\n/skill hermes-wechat-integration',
      blocks: [
        { kind: 'comment', text: { zh: '添加技能源', en: 'Add the skills tap' } },
        { kind: 'code', text: 'hermes skills tap add jove-rina/jove-hermes-skills' },
        { kind: 'gap' },
        { kind: 'comment', text: { zh: '安装微信集成技能', en: 'Install the WeChat skill' } },
        { kind: 'code', text: 'hermes skills install jove-rina/jove-hermes-skills/hermes-wechat-integration' },
        { kind: 'gap' },
        { kind: 'comment', text: { zh: '在对话中加载', en: 'Load in chat' } },
        { kind: 'code', text: '/skill hermes-wechat-integration', cls: 'cmd' },
      ],
    },
  },
  nav: [
    { href: '#features', label: { zh: '特性', en: 'Features' } },
    { href: '#workflow', label: { zh: '流程', en: 'Workflow' } },
    { href: '#qa', label: { zh: '审查', en: 'QA' } },
  ],
  sections: [
    {
      type: 'features',
      id: 'features',
      label: { zh: '特性', en: 'FEATURES' },
      title: { zh: '核心特性', en: 'Core Features' },
      desc: { zh: '六大特性让 WeChat 集成安全、高效、易于管理', en: 'Six features make the WeChat integration safe, efficient and manageable.' },
      cards: [
        {
          icon: 'qr-code',
          title: { zh: 'QR 码认证', en: 'QR Code Auth' },
          desc: {
            zh: '官方 iLink Bot API，无需逆向工程。QR 代理协议：AI 展示 URL，用户扫码即可配对。',
            en: 'Official iLink Bot API, no reverse engineering. QR proxy protocol: the agent shows a URL, the user scans.',
          },
        },
        {
          icon: 'shield-check',
          title: { zh: '双门授权', en: 'Two-Gate Auth' },
          desc: {
            zh: '策略门（环境变量）+ 路由门（channel_directory.json），诊断矩阵精确定位问题。',
            en: 'Policy gate (env vars) + routing gate (channel_directory.json); a diagnosis matrix pinpoints issues.',
          },
        },
        {
          icon: 'zap',
          title: { zh: 'context_token 感知', en: 'context_token Awareness' },
          desc: {
            zh: '防止消息静默丢失：send_message 成功 ≠ 投递成功。实时连接 vs 一次性适配器。',
            en: 'Prevents silent drops: send_message success ≠ delivery. Live connection vs throwaway adapter.',
          },
        },
        {
          icon: 'lock',
          title: { zh: '多配置隔离', en: 'Multi-Profile Isolation' },
          desc: {
            zh: '每个 Hermes 配置文件使用独立的 WeChat 账号，机器人之间零干扰。',
            en: 'Each Hermes profile uses its own WeChat account — zero interference between bots.',
          },
        },
        {
          icon: 'globe',
          title: { zh: '跨平台', en: 'Cross-Platform' },
          desc: {
            zh: 'Linux / macOS / Windows Git Bash。所有平台命令一致。',
            en: 'Linux / macOS / Windows Git Bash. The same commands everywhere.',
          },
        },
        {
          icon: 'package',
          title: { zh: 'Token 高效', en: 'Token-Efficient' },
          desc: {
            zh: '核心 SKILL.md 仅 4.3K tokens。FAQ 和占位表延迟加载，比原版节省 64% tokens。',
            en: 'Core SKILL.md is 4.3K tokens; FAQ and placeholder tables load lazily — 64% fewer tokens.',
          },
        },
      ],
    },
    {
      type: 'compare',
      id: 'product',
      label: { zh: '方案', en: 'WHY' },
      title: { zh: '问题 vs 解决方案', en: 'Problem vs Solution' },
      desc: {
        zh: 'WeChat 没有官方个人 bot API，逆向工程有封号风险。这个技能用官方渠道解决了问题。',
        en: 'WeChat has no official personal bot API and reverse engineering risks bans. This skill uses the official route.',
      },
      cards: [
        {
          tone: 'problem',
          label: { zh: '问题', en: 'Problem' },
          title: { zh: 'WeChat 没有官方 Bot API', en: 'No official WeChat bot API' },
          desc: {
            zh: '微信没有面向个人的官方 Bot API。逆向工程（如 ItChat、WeChatFerry）违反用户协议，轻则封号，重则法律风险。现有第三方方案部署复杂、维护困难，且缺乏 AI-native 协议支持。',
            en: 'There is no official personal bot API. Reverse-engineered clients (ItChat, WeChatFerry) violate the terms — account bans, or worse. Third-party options are complex to deploy and lack AI-native protocols.',
          },
        },
        {
          tone: 'solution',
          label: { zh: '解决方案', en: 'Solution' },
          title: { zh: '官方 iLink Bot API + AI-Native 协议', en: 'Official iLink Bot API + AI-native protocol' },
          desc: {
            zh: '技能使用官方 iLink Bot API，通过 QR 码配对安全连接个人微信。AI-native 协议处理 AI 无法完成的操作（扫码、发送测试消息）。双门授权提供精细访问控制，context_token 机制防止静默投递失败。',
            en: 'Uses the official iLink Bot API and QR pairing. The AI-native protocol handles what the agent cannot (scanning, sending test messages). Two-gate auth controls access; context_token prevents silent delivery failures.',
          },
        },
      ],
    },
    {
      type: 'steps',
      id: 'workflow',
      label: { zh: '流程', en: 'WORKFLOW' },
      title: { zh: '快速上手', en: 'Quick Start' },
      desc: { zh: '5 步完成从安装到验证', en: 'Five steps from install to verification.' },
      steps: [
        {
          title: { zh: '安装依赖', en: 'Install dependencies' },
          desc: { zh: '安装 Python 依赖包 aiohttp 和 cryptography。', en: 'Install the aiohttp and cryptography Python packages.' },
          code: 'pip install aiohttp cryptography',
        },
        {
          title: { zh: '初始化网关', en: 'Initialize the gateway' },
          desc: { zh: '运行 hermes gateway setup，AI 展示 QR URL，用户手机扫码完成配对。', en: 'Run hermes gateway setup; the agent shows a QR URL for pairing.' },
          code: 'hermes gateway setup',
        },
        {
          title: { zh: '提取 Account ID 并配置 .env', en: 'Extract account ID into .env' },
          desc: { zh: '从 setup 输出中提取 account_id，写入 HERMES_HOME/.env。', en: 'Copy account_id from the setup output into HERMES_HOME/.env.' },
          code: 'echo "WEIXIN_ACCOUNT_ID=&lt;account_id&gt;" &gt;&gt; $HERMES_HOME/.env',
        },
        {
          title: { zh: '配置授权策略', en: 'Configure authorization' },
          desc: { zh: '设置 DM 策略和允许用户列表，控制谁能与 AI 对话。', en: 'Set the DM policy and allowlist to control who can talk to the agent.' },
          code: 'echo "WEIXIN_DM_POLICY=allowlist" &gt;&gt; $HERMES_HOME/.env<br />echo "WEIXIN_ALLOWED_USERS=&lt;user_id&gt;" &gt;&gt; $HERMES_HOME/.env',
        },
        {
          title: { zh: '启动并验证', en: 'Start and verify' },
          desc: { zh: '启动网关，等待 3 秒后检查日志确认连接正常。', en: 'Start the gateway, wait 3 seconds, then check the logs.' },
          code: 'hermes gateway start<br />sleep 3 &amp;&amp; grep "gateway" $HERMES_HOME/logs/*.log',
        },
      ],
    },
    {
      type: 'qa',
      id: 'qa',
      label: { zh: '审查', en: 'QA' },
      title: { zh: '审查历史', en: 'Review History' },
      desc: { zh: '7 轮跨模型审查，约 400 项改进', en: '7 rounds of cross-model review, ~400 improvements.' },
      stats: [
        { num: '2', label: { zh: '技能数量', en: 'Skills' }, sub: { zh: '持续增长中', en: 'Growing' } },
        { num: '7', label: { zh: '审查轮次', en: 'Review rounds' }, sub: { zh: '跨模型全面覆盖', en: 'Cross-model coverage' } },
        { num: '~400', label: { zh: '改进项', en: 'Improvements' }, sub: { zh: '死代码 · 边界条件 · 文档一致性', en: 'Dead code · Edge cases · Docs' } },
      ],
      table: {
        head: [
          { zh: '轮次', en: 'Round' },
          { zh: '模型', en: 'Model' },
          { zh: '发现', en: 'Findings' },
        ],
        rows: [
          ['① Mixed', 'DeepSeek V4 Flash', '~383 冗余行'],
          ['② Mixed', 'DeepSeek V4 Flash', '~12K tokens'],
          ['③ AI-only', 'DeepSeek V4 Flash', '方向反转'],
          ['④ AI-only', 'DeepSeek V4 Flash', '方向反转'],
          ['⑤ Final', 'Agnes-2.0-Flash', '2 个 P1-P2 调整'],
          ['⑥ Cold start', 'DeepSeek V4 Pro', '8 个问题'],
          ['⑦ Family', 'Rina+Jove+Hebe', '2 个遗留项'],
        ],
        final: ['总计', '7 轮', `<span class="check">${icon('check', 'ico ico-xs')} ~400 改进</span>`],
      },
    },
  ],
  footer: { license: 'CC0 1.0' },
}
