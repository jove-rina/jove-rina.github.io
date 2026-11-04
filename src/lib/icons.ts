/**
 * Build-time icon renderer.
 * lucide ships icon nodes as plain arrays, so we can inline SVG at build time —
 * the browser downloads no icon runtime at all.
 */
import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Bot,
  Boxes,
  Blocks,
  Brain,
  Braces,
  Bug,
  ChartLine,
  ChartNetwork,
  Check,
  CircleCheck,
  Clock,
  Code,
  Command,
  Compass,
  Component,
  Copy,
  Cpu,
  Crop,
  Database,
  Download,
  ExternalLink,
  FileCheck,
  FileCode,
  FileText,
  FolderTree,
  GitBranch,
  GitPullRequest,
  Globe,
  HardDrive,
  Heart,
  Image,
  Images,
  Keyboard,
  Languages,
  Layers,
  LayoutGrid,
  ListTree,
  Lock,
  Mail,
  MessagesSquare,
  Monitor,
  Moon,
  MousePointerClick,
  Network,
  Package,
  PanelLeft,
  PanelRight,
  PenLine,
  Pipette,
  Play,
  Plug,
  Puzzle,
  QrCode,
  Repeat,
  RotateCcw,
  Rocket,
  Ruler,
  Save,
  Scan,
  Scissors,
  Search,
  Server,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  SquareCode,
  SwatchBook,
  Table,
  Target,
  Terminal,
  TestTube,
  Upload,
  WandSparkles,
  Wrench,
  X,
  Zap,
  type IconNode,
} from 'lucide'

const ICONS = {
  'app-window': AppWindow,
  'arrow-left': ArrowLeft,
  'arrow-right': ArrowRight,
  'arrow-up-right': ArrowUpRight,
  'book-open': BookOpen,
  bot: Bot,
  boxes: Boxes,
  blocks: Blocks,
  brain: Brain,
  braces: Braces,
  bug: Bug,
  'chart-line': ChartLine,
  'chart-network': ChartNetwork,
  check: Check,
  'circle-check': CircleCheck,
  clock: Clock,
  code: Code,
  command: Command,
  compass: Compass,
  component: Component,
  copy: Copy,
  cpu: Cpu,
  crop: Crop,
  database: Database,
  download: Download,
  'external-link': ExternalLink,
  'file-check': FileCheck,
  'file-code': FileCode,
  'file-text': FileText,
  'folder-tree': FolderTree,
  'git-branch': GitBranch,
  'git-pull-request': GitPullRequest,
  globe: Globe,
  'hard-drive': HardDrive,
  heart: Heart,
  image: Image,
  images: Images,
  keyboard: Keyboard,
  languages: Languages,
  layers: Layers,
  'layout-grid': LayoutGrid,
  'list-tree': ListTree,
  lock: Lock,
  mail: Mail,
  'messages-square': MessagesSquare,
  monitor: Monitor,
  moon: Moon,
  'mouse-pointer-click': MousePointerClick,
  network: Network,
  package: Package,
  'panel-left': PanelLeft,
  'panel-right': PanelRight,
  'pen-line': PenLine,
  pipette: Pipette,
  play: Play,
  plug: Plug,
  puzzle: Puzzle,
  'qr-code': QrCode,
  repeat: Repeat,
  'rotate-ccw': RotateCcw,
  rocket: Rocket,
  ruler: Ruler,
  save: Save,
  scan: Scan,
  scissors: Scissors,
  search: Search,
  server: Server,
  settings: Settings,
  'shield-check': ShieldCheck,
  'sliders-horizontal': SlidersHorizontal,
  sparkles: Sparkles,
  'square-code': SquareCode,
  'swatch-book': SwatchBook,
  table: Table,
  target: Target,
  terminal: Terminal,
  'test-tube': TestTube,
  upload: Upload,
  'wand-sparkles': WandSparkles,
  wrench: Wrench,
  x: X,
  zap: Zap,
} satisfies Record<string, IconNode>

export type IconName = keyof typeof ICONS

const BRAND_GITHUB: IconNode = [
  [
    'path',
    {
      d: 'M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.54v-1.9c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .3.21.66.8.54A11.5 11.5 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z',
      fill: 'currentColor',
      stroke: 'none',
    },
  ],
]

function serialize(children: IconNode, cls: string, brand = false): string {
  const attrs: Record<string, string | number> = brand
    ? {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: 24,
        height: 24,
        class: `lucide ${cls}`,
        'aria-hidden': 'true',
      }
    : {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 24 24',
        width: 24,
        height: 24,
        fill: 'none',
        stroke: 'currentColor',
        'stroke-width': 1.75,
        'stroke-linecap': 'round',
        'stroke-linejoin': 'round',
        class: `lucide ${cls}`,
        'aria-hidden': 'true',
      }
  const attrText = Object.entries(attrs)
    .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
    .join(' ')
  const inner = children
    .map(([tag, nodeAttrs]) => {
      const text = Object.entries(nodeAttrs)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`)
        .join(' ')
      return `<${tag} ${text} />`
    })
    .join('')
  return `<svg ${attrText}>${inner}</svg>`
}

export function icon(name: IconName, cls = 'ico'): string {
  const node = ICONS[name]
  if (!node) throw new Error(`Unknown icon: ${name}`)
  return serialize(node, cls)
}

export function githubIcon(cls = 'ico'): string {
  return serialize(BRAND_GITHUB, cls, true)
}

export const ICON_NAMES = Object.keys(ICONS) as IconName[]
