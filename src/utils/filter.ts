import type { Country } from '../types/country'

// "México" y "mexico" deben coincidir: minúsculas y sin acentos
function normalize(text: string): string {
  return text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function filterCountries(countries: Country[], search: string, region: string): Country[] {
  const term = normalize(search.trim())

  return countries.filter((country) => {
    const matchesName = [country.names.common, country.names.translations?.spa?.common ?? '']
      .some((name) => normalize(name).includes(term))
    const matchesRegion = region === '' || country.region === region
    return matchesName && matchesRegion
  })
}