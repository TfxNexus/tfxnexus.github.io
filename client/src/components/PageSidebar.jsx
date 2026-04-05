import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
  { to: '/', label: 'Home', icon: '🏠' },
  { to: '/about', label: 'About', icon: '👤' },
  { to: '/projects', label: 'Projects', icon: '🎮' },
  { to: '/resume', label: 'Resume', icon: '📄' },
  { to: '/history', label: 'My History', icon: '📅' },
]

const quickStats = [
  { label: 'osu! PP', value: '11,808', color: '#FF66AA' },
  { label: 'YT Subs', value: '1.4K', color: '#FF0000' },
  { label: 'Chess Blitz', value: '1774', color: '#D4AF37' },
  { label: 'Fortnite', value: 'Unreal', color: '#00D4FF' },
]

export function LeftSidebar() {
  return (
    <aside className="hidden xl:flex flex-col gap-6 w-52 flex-shrink-0">
      {/* Blurred nav card */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm p-4">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Navigation</p>
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-all duration-150 ${
                  isActive
                    ? 'bg-purple-600/20 text-purple-300 border border-purple-600/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`
              }
            >
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Quick stats card */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm p-4">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-900/10 to-transparent pointer-events-none" />
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Quick Stats</p>
        <div className="flex flex-col gap-2">
          {quickStats.map(({ label, value, color }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">{label}</span>
              <span className="text-xs font-bold" style={{ color }}>{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative blurred orbs */}
      <div className="relative h-32 rounded-2xl overflow-hidden border border-gray-700/30">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-gray-900 to-indigo-900/20" />
        <div className="absolute top-2 left-2 w-16 h-16 bg-purple-500/20 rounded-full blur-xl" />
        <div className="absolute bottom-2 right-2 w-12 h-12 bg-indigo-500/20 rounded-full blur-xl" />
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-600 text-xs text-center px-3">Based in Vietnam 🇻🇳</p>
        </div>
      </div>
    </aside>
  )
}

export function RightSidebar() {
  return (
    <aside className="hidden xl:flex flex-col gap-6 w-52 flex-shrink-0">
      {/* Profile card */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm p-4">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none" />
        <div className="flex flex-col items-center text-center gap-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center text-xl font-bold text-white shadow-lg shadow-purple-900/40">
            JT
          </div>
          <div>
            <p className="text-white text-sm font-semibold">Johnny Tran</p>
            <p className="text-purple-400 text-xs">@TfxNexus</p>
          </div>
          <div className="flex gap-1.5 flex-wrap justify-center mt-1">
            <span className="text-xs px-2 py-0.5 bg-purple-900/40 border border-purple-700/40 rounded-full text-purple-300">osu!</span>
            <span className="text-xs px-2 py-0.5 bg-gray-700/40 border border-gray-600/40 rounded-full text-gray-300">Dev</span>
            <span className="text-xs px-2 py-0.5 bg-red-900/30 border border-red-700/30 rounded-full text-red-300">YT</span>
          </div>
        </div>
      </div>

      {/* Activity card */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm p-4">
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/10 to-transparent pointer-events-none" />
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Currently</p>
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <span className="text-gray-300 text-xs">Studying at RMIT</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse flex-shrink-0" style={{ animationDelay: '0.5s' }} />
            <span className="text-gray-300 text-xs">Playing osu!</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse flex-shrink-0" style={{ animationDelay: '1s' }} />
            <span className="text-gray-300 text-xs">Building projects</span>
          </div>
        </div>
      </div>

      {/* Decorative card */}
      <div className="relative h-36 rounded-2xl overflow-hidden border border-gray-700/30">
        <img
          src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=400&q=60"
          alt="Vietnam"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <p className="text-white text-xs font-medium">Ho Chi Minh City</p>
          <p className="text-gray-400 text-xs">Vietnam 🇻🇳</p>
        </div>
      </div>

      {/* Links */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-700/50 bg-gray-800/40 backdrop-blur-sm p-4">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Links</p>
        <div className="flex flex-col gap-2">
          <a href="https://github.com/TfxNexus" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 text-gray-400 hover:text-white text-xs transition-colors">
            <span>🐙</span> GitHub
          </a>
          <a href="https://www.youtube.com/@TfxNexusOsu" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 text-gray-400 hover:text-red-400 text-xs transition-colors">
            <span>▶️</span> YouTube
          </a>
          <a href="https://osu.ppy.sh/users/Tfx%20Nexus" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 text-gray-400 hover:text-pink-400 text-xs transition-colors">
            <span>🎵</span> osu! Profile
          </a>
          <a href="https://chess.com/member/Tfx_Nexus" target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-2 text-gray-400 hover:text-yellow-400 text-xs transition-colors">
            <span>♟️</span> Chess.com
          </a>
        </div>
      </div>
    </aside>
  )
}
