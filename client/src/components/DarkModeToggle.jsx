import { useDarkMode } from '../hooks/useDarkMode'

export function DarkModeToggle() {
  const [isDark, toggle] = useDarkMode()

  return (
    <button
      onClick={toggle}
      aria-label="Toggle dark mode"
      className="p-2 rounded-md text-gray-400 hover:text-white transition-colors"
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
