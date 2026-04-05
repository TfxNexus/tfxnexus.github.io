import { motion } from 'framer-motion'
import { useFetch } from '../hooks/useFetch'
import { API_BASE } from '../lib/apiBase'

function LiveBadge() {
  return (
    <span className="flex items-center gap-1 text-xs font-medium text-green-400">
      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
      LIVE
    </span>
  )
}

function OsuStats() {
  const { data, loading, error } = useFetch(`${API_BASE}/api/stats/osu`)
  if (loading) return <p className="text-xs text-gray-500">Loading...</p>
  if (error || !data) return <p className="text-xs text-gray-500">Stats unavailable</p>
  return (
    <div className="grid grid-cols-2 gap-1.5 mt-2">
      <Stat label="Global Rank" value={`#${data.rank?.toLocaleString()}`} />
      <Stat label="Country Rank" value={`#${data.countryRank?.toLocaleString()}`} />
      <Stat label="PP" value={`${data.pp}pp`} />
      <Stat label="Accuracy" value={`${data.accuracy}%`} />
    </div>
  )
}

function ChessStats() {
  const { data, loading, error } = useFetch(`${API_BASE}/api/stats/chess`)
  if (loading) return <p className="text-xs text-gray-500">Loading...</p>
  if (error || !data) return <p className="text-xs text-gray-500">Stats unavailable</p>
  return (
    <div className="grid grid-cols-3 gap-1.5 mt-2">
      {data.rapid && <Stat label="Rapid" value={data.rapid} />}
      {data.blitz && <Stat label="Blitz" value={data.blitz} />}
      {data.bullet && <Stat label="Bullet" value={data.bullet} />}
    </div>
  )
}

function ClashRoyaleStats() {
  const { data, loading, error } = useFetch(`${API_BASE}/api/stats/clashroyale`)
  if (loading) return <p className="text-xs text-gray-500">Loading...</p>
  if (error || !data) return <p className="text-xs text-gray-500">Stats unavailable</p>
  return (
    <div className="grid grid-cols-2 gap-1.5 mt-2">
      <Stat label="Trophies" value={data.trophies?.toLocaleString()} />
      <Stat label="Best" value={data.bestTrophies?.toLocaleString()} />
      <Stat label="Wins" value={data.wins?.toLocaleString()} />
      <Stat label="Level" value={data.level} />
    </div>
  )
}

function ClashOfClansStats() {
  const { data, loading, error } = useFetch(`${API_BASE}/api/stats/clashofclans`)
  if (loading) return <p className="text-xs text-gray-500">Loading...</p>
  if (error || !data) return <p className="text-xs text-gray-500">Stats unavailable</p>
  return (
    <div className="grid grid-cols-2 gap-1.5 mt-2">
      <Stat label="Town Hall" value={`TH${data.townHallLevel}`} />
      <Stat label="Trophies" value={data.trophies?.toLocaleString()} />
      <Stat label="Best" value={data.bestTrophies?.toLocaleString()} />
      <Stat label="War Stars" value={data.warStars?.toLocaleString()} />
    </div>
  )
}

function YouTubeStats() {
  const { data, loading, error } = useFetch(`${API_BASE}/api/stats/youtube`)
  if (loading) return <p className="text-xs text-gray-500">Loading...</p>
  if (error || !data) return <p className="text-xs text-gray-500">Stats unavailable</p>
  return (
    <div className="grid grid-cols-3 gap-1.5 mt-2">
      <Stat label="Subscribers" value={data.subscribers >= 1000 ? `${(data.subscribers/1000).toFixed(1)}K` : data.subscribers} />
      <Stat label="Videos" value={data.videos} />
      <Stat label="Views" value={data.views >= 1000 ? `${(data.views/1000).toFixed(1)}K` : data.views} />
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="bg-black/20 rounded-lg px-2 py-1.5 text-center">
      <p className="text-white text-sm font-bold leading-none">{value}</p>
      <p className="text-gray-500 text-xs mt-0.5">{label}</p>
    </div>
  )
}

function LiveStats({ stats }) {
  if (!stats) return null
  if (!stats.live) {
    return (
      <div className="mt-2 bg-black/20 rounded-lg px-3 py-2 flex items-center justify-between">
        <span className="text-gray-400 text-xs">{stats.label}</span>
        <span className="text-white text-sm font-bold">{stats.value}</span>
      </div>
    )
  }
  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-400 font-medium">Stats</span>
        <LiveBadge />
      </div>
      {stats.type === 'osu' && <OsuStats />}
      {stats.type === 'chess' && <ChessStats />}
      {stats.type === 'clashroyale' && <ClashRoyaleStats />}
      {stats.type === 'clashofclans' && <ClashOfClansStats />}
      {stats.type === 'youtube' && <YouTubeStats />}
    </div>
  )
}

export function GameCard({ project, index = 0 }) {
  const { title, description, imageUrl, liveUrl, stats, themeColor, characterImage, characterName } = project
  const color = themeColor || '#8B5CF6'

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.06, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
      className="relative rounded-2xl overflow-hidden border border-gray-700/60 flex flex-col
                 hover:shadow-xl transition-all duration-200 group h-full"
      style={{ background: `linear-gradient(135deg, #1f2937 0%, ${color}18 100%)` }}
    >
      {/* Glow artifact */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 0%, ${color}25 0%, transparent 70%)` }}
      />

      {/* Image */}
      <div className="relative w-full h-36 overflow-hidden bg-gray-900/60 flex-shrink-0 flex items-center justify-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={title}
            className="max-h-full max-w-[80%] object-contain group-hover:scale-105 transition-transform duration-500 drop-shadow-lg"
            onError={e => { e.target.style.display = 'none' }}
          />
        ) : (
          <span className="text-5xl opacity-30">🎮</span>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />

        {/* Character chibi — bottom right of image */}
        {characterImage && (
          <div className="absolute bottom-1 right-2 z-10">
            <img
              src={characterImage}
              alt={characterName}
              className="h-14 w-auto object-contain drop-shadow-lg"
              onError={e => { e.target.style.display = 'none' }}
              title={characterName}
            />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="relative flex-1 flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3
            className="text-base font-bold leading-snug group-hover:opacity-90 transition-opacity"
            style={{ color }}
          >
            {title}
          </h3>
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-gray-300 transition-colors flex-shrink-0 mt-0.5"
            >
              Visit →
            </a>
          )}
        </div>

        <p className="text-gray-400 text-xs leading-relaxed">{description}</p>

        <LiveStats stats={stats} />
      </div>

      {/* Bottom accent line */}
      <div className="h-0.5 w-full" style={{ background: `linear-gradient(to right, transparent, ${color}80, transparent)` }} />
    </motion.div>
  )
}
