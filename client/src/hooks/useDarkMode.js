import { useState, useEffect } from 'react'

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('theme')
    if (stored === 'dark') return true
    if (stored === 'light') return false
  } catch { /* ignore */ }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function applyTheme(isDark) {
  const root = document.documentElement
  if (isDark) {
    root.classList.add('dark')
  } else {
    root.classList.remove('dark')
  }
  try {
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  } catch { /* ignore */ }
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState(() => {
    const initial = getInitialTheme()
    applyTheme(initial)
    return initial
  })

  useEffect(() => {
    applyTheme(isDark)
  }, [isDark])

  return [isDark, () => setIsDark(prev => !prev)]
}
