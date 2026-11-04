export type Lang = 'zh' | 'en'
export type Dict = Record<string, { zh: string; en: string }>

const LANG_KEY = 'jove-lang'

export function getLang(): Lang {
  return localStorage.getItem(LANG_KEY) === 'zh' ? 'zh' : 'en'
}

export function applyLang(dict: Dict, lang: Lang): void {
  localStorage.setItem(LANG_KEY, lang)
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  const select = document.getElementById('langSelect') as HTMLSelectElement | null
  if (select) select.value = lang
  document.querySelectorAll<HTMLElement>('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n
    if (!key) return
    const value = dict[key]?.[lang]
    if (value != null) el.innerHTML = value
  })
}

export function initLang(dict: Dict, onChange?: (lang: Lang) => void): void {
  const select = document.getElementById('langSelect') as HTMLSelectElement | null
  applyLang(dict, getLang())
  if (!select) return
  select.addEventListener('change', () => {
    const lang: Lang = select.value === 'zh' ? 'zh' : 'en'
    applyLang(dict, lang)
    onChange?.(lang)
  })
}
