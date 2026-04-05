const BASE = import.meta.env.VITE_API_URL || ''

export async function fetchResume() {
  const res = await fetch(`${BASE}/api/resume`)
  if (!res.ok) throw new Error('Failed to fetch resume')
  return res.json()
}
