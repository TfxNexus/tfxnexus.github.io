import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useFetch } from '../hooks/useFetch'
import { API_BASE } from '../lib/apiBase'
import { AnimatedPage } from '../components/AnimatedPage'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { GameCard } from '../components/GameCard'
import { ProjectCard } from '../components/ProjectCard'

const CATEGORY_ORDER = ['Games', 'Hobbies', 'Personal Projects', 'Interests']
const CATEGORY_ICONS = {
  Games: '🎮',
  Hobbies: '🎯',
  'Personal Projects': '💻',
  Interests: '✨',
}
const SUBCATEGORIES = {
  Games: ['All', 'Rhythm', 'FPS', 'Battle Royale', 'RPG', 'Strategy', 'Speedrun', 'Action RPG', 'Strategy RPG'],
  Hobbies: ['All'],
  'Personal Projects': ['All'],
  Interests: ['All'],
}
const PAGE_SIZE = 6

function groupByCategory(projects) {
  return CATEGORY_ORDER.reduce((acc, cat) => {
    const items = projects.filter(p => p.category === cat)
    if (items.length > 0) acc[cat] = items
    return acc
  }, {})
}

export function ProjectsPage() {
  const { data: projects, loading, error } = useFetch(`${API_BASE}/api/projects`)
  const [activeFilter, setActiveFilter] = useState({})
  const [visibleCount, setVisibleCount] = useState({})
  const [searchQuery, setSearchQuery] = useState({})

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  const grouped = groupByCategory(projects)

  return (
    <AnimatedPage>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 space-y-20">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Projects & Games</h1>
          <p className="text-gray-400">Everything I play, build, and care about.</p>
        </div>

        {Object.entries(grouped).map(([category, items]) => {
          const subs = SUBCATEGORIES[category] || ['All']
          const filter = activeFilter[category] || 'All'
          const query = (searchQuery[category] || '').toLowerCase()
          const filtered = (filter === 'All' ? items : items.filter(p => p.subcategory === filter))
            .filter(p => !query || p.title.toLowerCase().includes(query) || p.description.toLowerCase().includes(query))
          const shown = visibleCount[category] ?? PAGE_SIZE
          const visible = filtered.slice(0, shown)
          const hasMore = filtered.length > shown

          return (
            <section key={category}>
              {/* Section header */}
              <div className="flex items-center gap-3 mb-5">
                <span className="text-2xl">{CATEGORY_ICONS[category]}</span>
                <h2 className="text-2xl font-bold text-white">{category}</h2>
                <div className="flex-1 h-px bg-gray-800" />
                <span className="text-gray-500 text-sm">{filtered.length} items</span>
              </div>

              {/* Subcategory filter tabs + search */}
              {subs.length > 1 && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {subs.map(sub => (
                    <button
                      key={sub}
                      onClick={() => {
                        setActiveFilter(prev => ({ ...prev, [category]: sub }))
                        setVisibleCount(prev => ({ ...prev, [category]: PAGE_SIZE }))
                      }}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-150 ${
                        filter === sub
                          ? 'bg-purple-600 text-white'
                          : 'bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700 border border-gray-700'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery[category] || ''}
                    onChange={e => setSearchQuery(prev => ({ ...prev, [category]: e.target.value }))}
                    className="ml-auto px-3 py-1.5 rounded-full text-xs bg-gray-800 border border-gray-700
                               text-gray-300 placeholder-gray-600 focus:outline-none focus:border-purple-600/60 w-32"
                  />
                </div>
              )}

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
                <AnimatePresence mode="popLayout">
                  {visible.map((project, index) =>
                    category === 'Games' || category === 'Hobbies' ? (
                      <GameCard key={project.id} project={project} index={index} />
                    ) : (
                      <ProjectCard key={project.id} project={project} index={index} category={category} />
                    )
                  )}
                </AnimatePresence>
              </div>

              {/* Load more */}
              {hasMore && (
                <div className="mt-6 text-center">
                  <button
                    onClick={() => setVisibleCount(prev => ({ ...prev, [category]: (prev[category] ?? PAGE_SIZE) + PAGE_SIZE }))}
                    className="px-6 py-2.5 bg-gray-800 hover:bg-gray-700 border border-gray-700
                               text-gray-300 hover:text-white rounded-lg text-sm font-medium transition-all"
                  >
                    Load more ({filtered.length - shown} remaining)
                  </button>
                </div>
              )}
            </section>
          )
        })}
      </div>
    </AnimatedPage>
  )
}
