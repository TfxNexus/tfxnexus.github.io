import { useDarkMode } from '../hooks/useDarkMode'

export function DarkModeToggle() {
  const [isDark, toggle] = useDarkMode()

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white
                 border border-gray-700 transition-all duration-150"
    >
      <span>{isDark ? '☀️' : '🌙'}</span>
      <span>{isDark ? 'Light' : 'Dark'}</span>
    </button>
  )
}
