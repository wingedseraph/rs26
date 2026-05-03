const BASE = 'https://api.vam.ac.uk/v2/objects' as const

export async function getImages() {
  const res = await fetch(BASE)

  if (!res.ok) {
    // todo, use variable instead of plain string?
    throw new Error('Issue with API')
  }

  return res.json()
}
export async function getQueryImages(query: string) {
  const res = await fetch(`${BASE}/search?q=${query}`)

  if (!res.ok) {
    // todo, use variable instead of plain string?
    throw new Error('Issue with API')
  }

  return res.json()
}
