export interface CountryName {
  common: string
  official: string
  translations?: { spa?: { common?: string } }
}

export interface CountryFlag {
  url_png: string
  url_svg?: string
}

export interface CountryCapital {
  name: string
}

export interface Country {
  names: CountryName
  codes?: { alpha_3?: string }
  flag?: CountryFlag
  population?: number | null
  region?: string | null
  capitals?: CountryCapital[] | null
}