export async function fetchResume() {
  const res = await fetch('/api/resume')
  if (!res.ok) throw new Error('Failed to fetch resume')
  return res.json()
}
