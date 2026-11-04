import type { IconName } from './icons'

export interface L10n {
  zh: string
  en: string
}

export type Tone = 'green' | 'pink' | 'orange' | 'cyan'

export interface Badge {
  icon?: IconName
  text: string
  tone?: Tone
}

export type InstallPart =
  | string
  | { text: L10n; href?: string; cls?: 'cmd' | 'string' | 'link' }

export type InstallBlock =
  | { kind: 'comment'; text: L10n }
  | { kind: 'code'; text: string; cls?: 'cmd' }
  | { kind: 'inline'; parts: InstallPart[] }
  | { kind: 'gap' }

export interface FeatureCard {
  icon: IconName
  title: L10n
  desc: L10n
}

export interface CompareCard {
  tone: 'problem' | 'solution'
  label: L10n
  title: L10n
  desc: L10n
}

export interface Step {
  title: L10n
  desc?: L10n
  code?: string
}

export interface Stat {
  num: string
  label: L10n
  sub?: L10n
}

export interface Cta {
  label: L10n
  href: string
  kind: 'primary' | 'secondary'
  icon?: IconName
}

export interface Screenshot {
  src: string
  alt: string
  caption?: L10n
  size?: 'wide' | 'half'
}

export type Section =
  | { type: 'features'; id?: string; label: L10n; title: L10n; desc?: L10n; cards: FeatureCard[] }
  | { type: 'compare'; id?: string; label: L10n; title: L10n; desc?: L10n; cards: CompareCard[] }
  | { type: 'steps'; id?: string; label: L10n; title: L10n; desc?: L10n; steps: Step[] }
  | { type: 'stats'; id?: string; label?: L10n; title?: L10n; desc?: L10n; stats: Stat[]; ctas?: Cta[] }
  | {
      type: 'qa'
      id?: string
      label: L10n
      title: L10n
      desc?: L10n
      stats: Stat[]
      table: { head: L10n[]; rows: string[][]; final?: string[] }
    }
  | { type: 'text'; id?: string; label: L10n; title: L10n; desc?: L10n; html: L10n }
  | { type: 'repo'; id?: string; label: L10n; name: string; href: string }
  | { type: 'screenshots'; id?: string; label: L10n; title: L10n; desc?: L10n; items: Screenshot[] }

export interface ProjectPage {
  slug: string
  name: string
  title: string
  description: L10n
  repo: string
  hero: {
    icon: IconName
    title: string
    sub: L10n
    badges: Badge[]
    install: { title?: L10n; blocks: InstallBlock[] }
  }
  nav: { href: string; label: L10n }[]
  sections: Section[]
  footer?: { license?: string; repo?: string }
}

export interface HomeProject {
  slug: string
  icon: IconName
  name: string
  desc: L10n
  meta: string[]
}

export interface HomeGroup {
  id: string
  title: L10n
  count: L10n
  href?: string
  items: HomeProject[]
}

export interface HomeData {
  badge: L10n
  title1: L10n
  brand: string
  sub: L10n
  phrases: { zh: string[]; en: string[] }
  ctas: Cta[]
  stats: Stat[]
  projects: {
    label: L10n
    title: L10n
    desc: L10n
    groups: HomeGroup[]
  }
  updates: {
    label: L10n
    title: L10n
    desc: L10n
    items: { date: string; project: string; text: L10n; href: string }[]
  }
  focus: {
    label: L10n
    title: L10n
    desc: L10n
    items: FeatureCard[]
  }
  about: {
    label: L10n
    title: L10n
    desc: L10n
    cards: { icon: IconName; title: L10n; desc: L10n; tag: string }[]
  }
  contact: {
    label: L10n
    title: L10n
    desc: L10n
    links: { icon: IconName; text: L10n; href: string }[]
  }
}
