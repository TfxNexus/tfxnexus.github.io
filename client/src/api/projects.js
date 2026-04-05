const BASE = import.meta.env.VITE_API_URL ?? 'https://tfxnexus.onrender.com'

export async function fetchProjects() {
  const res = await fetch(`${BASE}/api/projects`)
  if (!res.ok) throw new Error('Failed to fetch projects')
  return res.json()
}
