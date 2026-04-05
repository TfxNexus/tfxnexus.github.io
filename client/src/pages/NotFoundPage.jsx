import { Link } from 'react-router-dom'

export function NotFoundPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-32 text-center">
      <p className="text-purple-400 text-sm font-medium tracking-widest uppercase mb-3">Error</p>
      <h1 className="text-7xl font-bold text-white mb-4">404</h1>
      <p className="text-gray-400 text-lg mb-8">This page doesn't exist.</p>
      <Link
        to="/"
        className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg
                   font-medium text-sm transition-colors duration-150"
      >
        Back to Home
      </Link>
    </div>
  )
}
