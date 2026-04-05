import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { DarkModeToggle } from './DarkModeToggle'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/resume', label: 'Resume' },
]

function navLinkClass({ isActive }) {
  return isActive
    ? 'text-purple-400 font-medium'
    : 'text-gray-400 hover:text-white transition-colors duration-150'
}

export function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <NavLink to="/" className="text-white font-semibold text-base tracking-tight">
          Johnny Tran
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(({ to, label }) => (
            <NavLink key={to} to={to} className={navLinkClass} end={to === '/'}>
              {label}
            </NavLink>
          ))}
          <DarkModeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <DarkModeToggle />
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            aria-label="Toggle menu"
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-800 bg-gray-900 pb-2">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `block px-5 py-3 text-sm ${
                  isActive ? 'text-purple-400 font-medium' : 'text-gray-400 hover:text-white'
                } transition-colors`
              }
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </nav>
  )
}
