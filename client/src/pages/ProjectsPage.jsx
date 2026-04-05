import { useFetch } from '../hooks/useFetch'
import { API_BASE } from '../lib/apiBase'
import { AnimatedPage } from '../components/AnimatedPage'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { ProjectCard } from '../components/ProjectCard'

const CATEGORY_ORDER = ['Games', 'Personal Projects', 'Interests']

function groupByCategory(projects) {
  return CATEGORY_ORDER.reduce((acc, category) => {
    const items = projects.filter(p => p.category === category)
    if (items.length > 0) acc[category] = items
    return acc
  }, {})
}

export function ProjectsPage() {
  const { data: projects, loading, error } = useFetch(`${API_BASE}/api/projects`)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  const grouped = groupByCategory(projects)

  return (
    <AnimatedPage>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 space-y-16">

        <h1 className="text-4xl font-bold text-white">Projects</h1>

        {Object.entries(grouped).map(([category, items]) => (
          <section key={category}>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold text-white whitespace-nowrap">{category}</h2>
              <div className="flex-1 h-px bg-gray-800" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
              {items.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          </section>
        ))}

      </div>
    </AnimatedPage>
  )
}
