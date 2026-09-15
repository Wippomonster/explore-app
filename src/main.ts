import './style.css'

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