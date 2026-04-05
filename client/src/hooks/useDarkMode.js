import { useState, useEffect } from 'react'

function getInitialTheme() {
  try {
    const stored = localStorage.getItem('theme')
    if (stored) return stored === 'dark'
  } catch {
    // localStorage unavailable (e.g. private browsing)
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

export function useDarkMode() {
  const [isDark, setIsDark] = useState(getInitialTheme)

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    try {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
    } catch {
      // ignore
    }
  }, [isDark])

  return [isDark, () => setIsDark(prev => !prev)]
}
