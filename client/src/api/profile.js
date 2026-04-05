const BASE = import.meta.env.VITE_API_URL ?? 'https://tfxnexus.onrender.com'

export async function fetchProfile() {
  const res = await fetch(`${BASE}/api/profile`)
  if (!res.ok) throw new Error('Failed to fetch profile')
  return res.json()
}
