import type { Country } from '../types/country'

export function formatPopulation(population?: number | null): string {
  if (population == null) return 'No disponible'
  return new Intl.NumberFormat('es-MX').format(population)
}

export function getCapital(country: Country): string {
  return country.capitals?.[0]?.name || 'Sin capital'
}

export function getDisplayName(country: Country): string {
  return country.names.translations?.spa?.common || country.names.common
}