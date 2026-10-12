import type { Country } from '../types/country'

const API_URL =
  'https://api.restcountries.com/countries/v5?limit=25&response_fields=names.common,names.official,names.translations.spa.common,codes.alpha_3,flag.url_png,population,region,capitals'
const API_KEY = import.meta.env.VITE_RESTCOUNTRIES_API_KEY as string | undefined

// TypeScript no revisa el JSON real: esta función sí lo hace
function isCountry(value: unknown): value is Country {
  if (typeof value !== 'object' || value === null) return false
  const item = value as Record<string, unknown>
  const names = item.names as Record<string, unknown> | undefined
  return typeof names?.common === 'string'
}

export async function fetchCountries(): Promise<Country[]> {
  if (!API_KEY) {
    throw new Error('Falta la clave VITE_RESTCOUNTRIES_API_KEY en .env.local')
  }

  const response = await fetch(API_URL, {
    headers: { Authorization: `Bearer ${API_KEY}` },
  })

  if (!response.ok) {
    throw new Error(`No se pudo obtener los países (HTTP ${response.status})`)
  }

  const json: unknown = await response.json()
  const objects = (json as { data?: { objects?: unknown } }).data?.objects

  if (!Array.isArray(objects)) {
    throw new Error('La respuesta de la API no tiene el formato esperado')
  }

  return objects.filter(isCountry)
}