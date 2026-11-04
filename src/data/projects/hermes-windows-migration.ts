import { icon } from '../../lib/icons'
import type { ProjectPage } from '../../lib/types'

export const page: ProjectPage = {
  slug: 'hermes-windows-migration',
  name: 'Windows Migration',
  title: 'Windows Migration — Hermes Agent 技能',
  description: {
    zh: '将 Hermes Agent 数据从 C 盘迁移到自定义目录：零删除、增量复制、自动环境变量。',
    en: 'Migrate Hermes Agent data from C: drive to any custom directory — zero deletion, incremental copy, auto env-var setup.',
  },
  repo: 'https://github.com/jove-rina/jove-hermes-skills',
  hero: {
    icon: 'hard-drive',
    title: 'Windows Migration',
    sub: {
      zh: '将 Hermes Agent 数据从 C: 盘迁移到任意自定义目录 — 零删除、增量复制、自动环境变量配置。',
      en: 'Migrate Hermes Agent data from C: drive to any custom directory — zero deletion, incremental copy, auto env-var setup.',
    },
    badges: [
      { icon: 'package', text: 'v1.0.1' },
      { icon: 'wrench', text: 'Hermes Agent', tone: 'green' },
      { icon: 'monitor', text: 'Windows Only', tone: 'orange' },
    ],
    install: {
      copy: 'hermes skills tap add jove-rina/jove-hermes-skills\nhermes skills install jove-rina/jove-hermes-skills/hermes-windows-migration\n/skill hermes-windows-migration',
      blocks: [
        { kind: 'comment', text: { zh: '安装技能源', en: 'Add the skills tap' } },
        { kind: 'code', text: 'hermes skills tap add jove-rina/jove-hermes-skills' },
        { kind: 'gap' },
        { kind: 'comment', text: { zh: '安装迁移技能', en: 'Install the migration skill' } },
        { kind: 'code', text: 'hermes skills install jove-rina/jove-hermes-skills/hermes-windows-migration' },
        { kind: 'gap' },
        { kind: 'comment', text: { zh: '加载并执行', en: 'Load & run' } },
        { kind: 'code', text: '/skill hermes-windows-migration', cls: 'cmd' },
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
      desc: { zh: '六大特性让 Windows 迁移安全、高效、零风险', en: 'Six features make Windows migration safe, efficient and risk-free.' },
      cards: [
        {
          icon: 'copy',
          title: { zh: '零删除', en: 'Zero Deletion' },
          desc: { zh: '仅复制，绝不删除原始数据。安全可尝试 — 回滚立即可用。', en: 'Copies only, never deletes original data. Safe to try — rollback is instant.' },
        },
        {
          icon: 'package',
          title: { zh: '增量复制', en: 'Incremental Copy' },
          desc: { zh: '使用 robocopy 多线程复制，支持断点续传，保留 ACL 和文件属性。', en: 'Robocopy with multi-thread, resume support, ACL and file attributes preserved.' },
        },
        {
          icon: 'target',
          title: { zh: '自动检测', en: 'Auto-Detection' },
          desc: { zh: '智能检测源路径：检查现有 HERMES_HOME 环境变量。无需手动猜测路径。', en: 'Locates the source via the existing HERMES_HOME variable. No manual path guessing.' },
        },
        {
          icon: 'settings',
          title: { zh: '自动环境变量', en: 'Auto Env-Var Setup' },
          desc: { zh: '设置用户级 HERMES_HOME 环境变量。无需管理员权限或 PowerShell 专业知识。', en: 'Sets the user-level HERMES_HOME variable. No admin rights or PowerShell expertise needed.' },
        },
        {
          icon: 'file-check',
          title: { zh: '验证清单', en: 'Verification Checklist' },
          desc: { zh: '迁移后输出逐步验证结果：路径、环境变量、数据完整性。', en: 'Post-migration output verifies paths, env var and data integrity step by step.' },
        },
        {
          icon: 'monitor',
          title: { zh: '仅限 Windows', en: 'Windows Only' },
          desc: { zh: '专为 Windows 原生安装设计。不适用于 WSL2、Linux 或 macOS。', en: 'Designed for native Windows installs. Not for WSL2, Linux or macOS.' },
        },
      ],
    },
    {
      type: 'compare',
      id: 'product',
      label: { zh: '方案', en: 'WHY' },
      title: { zh: '问题 vs 解决方案', en: 'Problem vs Solution' },
      desc: { zh: 'C: 盘空间不足？手动迁移风险高。这个技能自动化了整个流程。', en: 'C: drive filling up? Manual migration is risky. This skill automates the whole flow.' },
      cards: [
        {
          tone: 'problem',
          label: { zh: '问题', en: 'Problem' },
          title: { zh: 'C: 盘空间逐渐被占满', en: 'The C: drive keeps filling up' },
          desc: {
            zh: 'Hermes 默认将数据存储在 C:\\Users\\&lt;user&gt;\\AppData\\Local\\hermes。日志、缓存和配置数据可能占用数 GB，逐渐填满 C: 盘。手动迁移要改环境变量、复制文件、保证路径正确 —— 任何一步出错都可能导致数据丢失或 Hermes 无法启动。',
            en: 'Hermes stores data under C:\\Users\\&lt;user&gt;\\AppData\\Local\\hermes. Logs, caches and configs can take gigabytes. Manual migration means editing env vars, copying files and getting every path right — one mistake can lose data or break startup.',
          },
        },
        {
          tone: 'solution',
          label: { zh: '解决方案', en: 'Solution' },
          title: { zh: '全自动迁移 — 零数据丢失', en: 'Fully automated — zero data loss' },
          desc: {
            zh: '技能用 robocopy 做增量传输，零数据丢失；自动检测现有 HERMES_HOME；自动配置用户级环境变量。提供三种方式：一键脚本、手动 PowerShell、AI 全引导。无需管理员权限。',
            en: 'The skill copies incrementally with robocopy, detects existing HERMES_HOME, and sets the user-level variable automatically. Three paths: one-click script, manual PowerShell, or AI-guided. No admin rights needed.',
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
          title: { zh: '安装技能', en: 'Install the skill' },
          desc: { zh: '通过 hermes tap 添加 jove-rina 技能源并安装 windows-migration 技能。', en: 'Add the jove-rina tap and install the windows-migration skill.' },
          code: 'hermes skills tap add jove-rina/jove-hermes-skills<br />hermes skills install jove-rina/jove-hermes-skills/hermes-windows-migration',
        },
        {
          title: { zh: '在聊天中加载技能', en: 'Load it in chat' },
          desc: { zh: '使用 /skill 命令加载迁移技能，让 AI 了解你的环境。', en: 'Use /skill so the agent learns about your environment.' },
          code: '/skill hermes-windows-migration',
        },
        {
          title: { zh: '选择迁移方式', en: 'Pick a path' },
          desc: { zh: '三种方式可选：自动化 (A)、手动 PowerShell (B)、或 AI 引导 (C)。', en: 'Three options: automated (A), manual PowerShell (B) or AI-guided (C).' },
          code: 'A - 一键全自动迁移<br />B - 手动 PowerShell 步骤<br />C - AI 全引导迁移',
        },
        {
          title: { zh: '运行迁移', en: 'Run the migration' },
          desc: { zh: 'AI 代理会自动执行 robocopy 复制和 env var 配置，无需手动干预。', en: 'The agent runs robocopy and env-var setup without manual intervention.' },
          code: '# AI handles all commands automatically',
        },
        {
          title: { zh: '验证迁移结果', en: 'Verify the result' },
          desc: { zh: '使用内置检查清单验证路径、环境变量和数据完整性。', en: 'Use the built-in checklist to verify paths, env var and data integrity.' },
          code: '✓ Source path verified<br />✓ Target path verified<br />✓ HERMES_HOME env var set<br />✓ Data integrity confirmed',
        },
      ],
    },
    {
      type: 'qa',
      id: 'qa',
      label: { zh: '审查', en: 'QA' },
      title: { zh: '审查历史', en: 'Review History' },
      desc: { zh: '8 轮跨 3 个模型审查，34 个问题全部修复', en: '8 rounds across 3 models; all 34 findings fixed.' },
      stats: [
        { num: '1', label: { zh: '技能数量', en: 'Skill' }, sub: { zh: '专属迁移技能', en: 'Dedicated migration skill' } },
        { num: '8', label: { zh: '审查轮次', en: 'Review rounds' }, sub: { zh: '跨模型全面覆盖', en: 'Cross-model coverage' } },
        { num: '34', label: { zh: '修复项', en: 'Fixes' }, sub: { zh: '死代码 · 边界条件 · 文档一致性', en: 'Dead code · Edge cases · Docs' } },
      ],
      table: {
        head: [
          { zh: '轮次', en: 'Round' },
          { zh: '模型', en: 'Model' },
          { zh: '问题', en: 'Findings' },
          { zh: '重点', en: 'Focus' },
        ],
        rows: [
          ['1', 'deepseek-v4-flash', '3', 'Doc consistency, placeholders'],
          ['2', 'deepseek-v4-flash', '1', 'Missing Bypass'],
          ['3', 'DeepSeek Pro', '2', 'Runtime errors, robocopy flags'],
          ['4', 'DeepSeek Pro', '2', 'Dead function removal, regex tightening'],
          ['5', 'kimi-k2.7-code', '8', 'Deep code review + edge cases'],
          ['6', 'kimi-k2.7-code', '5', 'Fresh perspective'],
          ['7', 'deepseek-v4-flash', '1', 'HERMES_HOME root validation'],
          ['8', 'kimi-k2.7-code', '14', 'Final read-through, version sync'],
        ],
        final: ['总计', '3 个模型', '34', `<span class="check">${icon('check', 'ico ico-xs')} 全部修复</span>`],
      },
    },
  ],
  footer: { license: 'CC0 1.0' },
}
