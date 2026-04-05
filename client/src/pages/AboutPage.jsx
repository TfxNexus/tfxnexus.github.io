import { useFetch } from '../hooks/useFetch'
import { API_BASE } from '../lib/apiBase'
import { AnimatedPage } from '../components/AnimatedPage'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { SkillTag } from '../components/SkillTag'

export function AboutPage() {
  const { data: profile, loading, error } = useFetch('/api/profile')

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <AnimatedPage>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-14">

        {/* Bio */}
        <section>
          <h1 className="text-4xl font-bold text-white mb-5">About Me</h1>
          <p className="text-gray-300 text-base leading-relaxed">{profile.bio}</p>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {profile.skills.map(skill => (
              <SkillTag key={skill} skill={skill} />
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <h2 className="text-2xl font-semibold text-white mb-4">Contact</h2>
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-3">
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm w-16">Email</span>
              <a
                href={`mailto:${profile.contact.email}`}
                className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
              >
                {profile.contact.email}
              </a>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-gray-500 text-sm w-16">GitHub</span>
              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
              >
                {profile.contact.github}
              </a>
            </div>
          </div>
        </section>

      </div>
    </AnimatedPage>
  )
}
