import './style.css'

import { fetchCountries } from './api/countries'
import type { Country } from './types/country'
import { filterCountries } from './utils/filter'
import { debounce } from './utils/debounce'
import { renderCountries, renderEmpty, renderError, renderLoading } from './render/countryGrid'

// MODO OSCURO

function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle('dark', isDark)

  document.querySelectorAll<HTMLInputElement>('[data-theme-toggle]')
    .forEach((toggle) => {
      toggle.checked = isDark
    })
}

const storedTheme = localStorage.getItem('theme')

const prefersDark = window.matchMedia(
  '(prefers-color-scheme: dark)'
).matches

const startDark = storedTheme
  ? storedTheme === 'dark'
  : prefersDark

applyTheme(startDark)

document.querySelectorAll<HTMLInputElement>('[data-theme-toggle]')
  .forEach((toggle) => {

    toggle.addEventListener('change', () => {

      const isDark = toggle.checked

      applyTheme(isDark)

      localStorage.setItem(
        'theme',
        isDark ? 'dark' : 'light'
      )
    })

  })

  // MENÚ HAMBURGUESA
  // 
  document.querySelectorAll<HTMLButtonElement>('[data-menu-button]')
  .forEach((button) => {

    button.addEventListener('click', () => {

      const menu = document.querySelector<HTMLElement>(
        '[data-mobile-menu]'
      )

      if (!menu) {
        return
      }

      const isOpen =
        button.getAttribute('aria-expanded') === 'true'

      button.setAttribute(
        'aria-expanded',
        String(!isOpen)
      )

      menu.classList.toggle('max-h-0', isOpen)
      menu.classList.toggle('opacity-0', isOpen)

      menu.classList.toggle('max-h-96', !isOpen)
      menu.classList.toggle('opacity-100', !isOpen)

      menu.classList.toggle('pb-4', !isOpen)
    })

  })

  function initCountries(): void {
  const grid = document.querySelector<HTMLElement>('#country-grid')
  const form = document.querySelector<HTMLFormElement>('#filters-form')
  const searchInput = document.querySelector<HTMLInputElement>('#search-input')
  const regionSelect = document.querySelector<HTMLSelectElement>('#region-select')
  const status = document.querySelector<HTMLElement>('#status-message')

  // Esta función corre en todas las páginas; si no hay grid (ej. pais.html), no hace nada
  if (!grid || !form || !searchInput || !regionSelect || !status) return

  let allCountries: Country[] = []
  let isLoaded = false

  function updateGrid(): void {
    if (!isLoaded || !grid || !status) return
    const filtered = filterCountries(allCountries, searchInput!.value, regionSelect!.value)

    if (filtered.length === 0) {
      renderEmpty(grid)
      status.textContent = 'Sin resultados'
      return
    }

    renderCountries(grid, filtered)
    status.textContent = `Mostrando ${filtered.length} de ${allCountries.length} países`
  }

  async function loadCountries(): Promise<void> {
    if (!grid || !status) return
    status.textContent = 'Cargando países...'
    renderLoading(grid)

    try {
      allCountries = await fetchCountries()
      isLoaded = true
      updateGrid()
    } catch (error) {
      console.error(error)
      status.textContent = ''
      renderError(grid, () => void loadCountries())
    }
  }

  const debouncedUpdate = debounce(updateGrid, 300)
  searchInput.addEventListener('input', debouncedUpdate) // texto: espera 300 ms
  regionSelect.addEventListener('change', updateGrid) // región: inmediato
  form.addEventListener('submit', (event) => {
    event.preventDefault()
    updateGrid()
  })

  void loadCountries()
}

initCountries()