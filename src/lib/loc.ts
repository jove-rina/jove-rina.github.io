import type { L10n } from './types'

export class Loc {
  dict: Record<string, L10n> = {}

  add(key: string, value: L10n): string {
    if (key in this.dict) throw new Error(`Duplicate i18n key: ${key}`)
    this.dict[key] = value
    return key
  }

  attr(key: string, value: L10n): string {
    this.add(key, value)
    return `data-i18n="${key}"`
  }

  span(key: string, value: L10n, cls?: string): string {
    this.add(key, value)
    return `<span${cls ? ` class="${cls}"` : ''} data-i18n="${key}">${value.zh}</span>`
  }

  el(tag: string, key: string, value: L10n, cls?: string): string {
    this.add(key, value)
    return `<${tag}${cls ? ` class="${cls}"` : ''} data-i18n="${key}">${value.zh}</${tag}>`
  }
}

export function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function dictScript(dict: Record<string, L10n>): string {
  const json = JSON.stringify(dict).replace(/</g, '\\u003c')
  return `<script id="i18n-data" type="application/json">${json}</script>`
}
