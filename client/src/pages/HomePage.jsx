import { Link } from 'react-router-dom'
import { useFetch } from '../hooks/useFetch'
import { API_BASE } from '../lib/apiBase'
import { AnimatedPage } from '../components/AnimatedPage'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'

export function HomePage() {
  const { data: profile, loading, error } = useFetch('/api/profile')

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <AnimatedPage>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-32">

        <p className="text-purple-400 font-medium text-sm tracking-widest uppercase mb-3">
          Hi, I'm
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-4">
          {profile.name}
        </h1>

        <p className="text-xl sm:text-2xl text-gray-400 mb-6">
          {profile.tagline}
        </p>

        <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
          {profile.bio}
        </p>

        <div className="flex flex-wrap gap-3">
          <Link
            to="/projects"
            className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg
                       font-medium text-sm transition-colors duration-150"
          >
            View Projects
          </Link>
          <Link
            to="/resume"
            className="px-6 py-3 border border-gray-600 hover:border-purple-500
                       text-gray-300 hover:text-white rounded-lg font-medium text-sm
                       transition-colors duration-150"
          >
            View Resume
          </Link>
        </div>

      </div>
    </AnimatedPage>
  )
}
