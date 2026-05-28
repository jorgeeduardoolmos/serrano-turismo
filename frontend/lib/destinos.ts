export const DESTINOS = {
  'san-pedro': 'San Pedro',
  'villa-carlos-paz': 'Villa Carlos Paz',
} as const

export type DestinoSlug = keyof typeof DESTINOS
export type DestinoNombre = typeof DESTINOS[DestinoSlug]

export function getNombre(slug: string): DestinoNombre | null {
  return DESTINOS[slug as DestinoSlug] ?? null
}

export function getSlug(nombre: string): DestinoSlug | null {
  const entry = Object.entries(DESTINOS).find(([, v]) => v === nombre)
  return entry ? (entry[0] as DestinoSlug) : null
}

export const COLOR = {
  'san-pedro': '#2e7d32',
  'villa-carlos-paz': '#1E3A8A',
} as const
