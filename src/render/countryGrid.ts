import type { Country } from '../types/country'
import { createCountryCard } from './countryCard'

function createMessageBox(): HTMLDivElement {
  const box = document.createElement('div')
  box.className =
    'col-span-full rounded-md border-2 border-border p-8 text-center bg-surface dark:bg-slate-800'
  return box
}

export function renderCountries(grid: HTMLElement, countries: Country[]): void {
  grid.replaceChildren(...countries.map(createCountryCard))
}

export function renderLoading(grid: HTMLElement, count = 8): void {
  const skeletons = Array.from({ length: count }, () => {
    const skeleton = document.createElement('div')
    skeleton.className = 'h-80 rounded-sm bg-slate-200 dark:bg-slate-800 animate-pulse'
    return skeleton
  })
  grid.replaceChildren(...skeletons)
}

export function renderEmpty(grid: HTMLElement): void {
  const box = createMessageBox()

  const title = document.createElement('p')
  title.className = 'text-heading-card font-bold mb-2'
  title.textContent = 'No se encontraron países con esos criterios.'

  const hint = document.createElement('p')
  hint.className = 'text-body text-ink-muted dark:text-slate-400'
  hint.textContent = 'Prueba con otro nombre o cambia la región.'

  box.append(title, hint)
  grid.replaceChildren(box)
}

export function renderError(grid: HTMLElement, onRetry: () => void): void {
  const box = createMessageBox()

  const message = document.createElement('p')
  message.className = 'text-body mb-4'
  message.textContent =
    'No fue posible obtener los países. Revisa tu conexión e inténtalo de nuevo.'

  const button = document.createElement('button')
  button.type = 'button'
  button.className =
    'rounded-md px-6 py-2 font-bold bg-primary text-ink-inverse hover:bg-accent transition-colors dark:bg-slate-700 dark:text-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent'
  button.textContent = 'Reintentar'
  button.addEventListener('click', onRetry)

  box.append(message, button)
  grid.replaceChildren(box)
}