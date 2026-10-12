import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        paises: resolve(import.meta.dirname, 'src/pages/paises.html'),
        pais: resolve(import.meta.dirname, 'src/pages/pais.html'),
      },
    },
  },
})