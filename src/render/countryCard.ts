import type { Country } from '../types/country'
import { formatPopulation, getCapital, getDisplayName } from '../utils/format'

const DETAIL_LINK_CLASSES =
  'block text-center rounded-md px-4 py-2 font-bold transition-colors bg-primary text-ink-inverse hover:bg-accent active:opacity-80 dark:bg-transparent dark:border dark:border-border dark:text-sky-400 dark:hover:bg-sky-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'

function createInfoLine(label: string, value: string, extraClasses = ''): HTMLParagraphElement {
  const line = document.createElement('p')
  line.className = `text-body text-ink-muted dark:text-slate-400 ${extraClasses}`.trim()
  line.textContent = `${label}: ${value}`
  return line
}

function createFlag(country: Country): HTMLElement {
  const url = country.flag?.url_png
  const name = getDisplayName(country)

  if (url) {
    const image = document.createElement('img')
    image.src = url
    image.alt = `Bandera de ${name}`
    image.loading = 'lazy'
    image.className = 'aspect-[3/2] w-full object-cover'
    return image
  }

  // Dato ausente: algunos territorios no traen bandera
  const placeholder = document.createElement('div')
  placeholder.className =
    'aspect-[3/2] w-full flex items-center justify-center bg-gray-500 text-white font-bold text-center p-4'
  placeholder.textContent = 'Bandera no disponible'
  return placeholder
}

export function createCountryCard(country: Country): HTMLElement {
  const card = document.createElement('article')
  card.className =
    'bg-surface dark:bg-slate-800 border-2 border-border rounded-sm overflow-hidden transition-colors'

  const body = document.createElement('div')
  body.className = 'p-4'

  const title = document.createElement('h3')
  title.className = 'text-heading-card font-bold'
  title.textContent = getDisplayName(country)

  const link = document.createElement('a')
  link.href = '/src/pages/pais.html'
  link.className = DETAIL_LINK_CLASSES
  link.textContent = 'Ver detalles →'

  body.append(
    title,
    createInfoLine('Población', formatPopulation(country.population)),
    createInfoLine('Región', country.region || 'Sin región'),
    createInfoLine('Capital', getCapital(country), 'mb-3'),
    link,
  )
  card.append(createFlag(country), body)
  return card
}