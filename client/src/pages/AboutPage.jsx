import { motion } from 'framer-motion'
import { useFetch } from '../hooks/useFetch'
import { API_BASE } from '../lib/apiBase'
import { AnimatedPage } from '../components/AnimatedPage'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { SkillTag } from '../components/SkillTag'

const skillIcons = {
  HTML: '🌐', CSS: '🎨', JavaScript: '⚡', React: '⚛️',
  Java: '☕', SQL: '🗄️',
}

export function AboutPage() {
  const { data: profile, loading, error } = useFetch(`${API_BASE}/api/profile`)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <AnimatedPage>
      {/* Hero banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-950/30 to-gray-900 border-b border-gray-800">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600
                            flex items-center justify-center text-3xl font-bold text-white shadow-lg
                            shadow-purple-900/40 flex-shrink-0">
              JT
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white mb-1">{profile.name}</h1>
              <p className="text-purple-400 font-medium">{profile.tagline}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 space-y-14">

        {/* Bio */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">👋</span>
            <h2 className="text-2xl font-semibold text-white">About Me</h2>
          </div>
          <div className="bg-gray-800/60 border border-gray-700/60 rounded-2xl p-6">
            <p className="text-gray-300 text-base leading-relaxed">{profile.bio}</p>
          </div>
        </section>

        {/* RMIT highlight */}
        <section>
          <div className="relative overflow-hidden rounded-2xl border border-purple-700/40
                          bg-gradient-to-br from-purple-900/30 to-gray-800/60 p-6">
            <div className="absolute top-0 right-0 w-40 h-40 bg-purple-500/10 rounded-full blur-2xl" />
            <div className="flex items-start gap-4 relative">
              <div className="text-4xl">🎓</div>
              <div>
                <p className="text-purple-300 text-xs font-semibold tracking-widest uppercase mb-1">
                  Academic Achievement
                </p>
                <h3 className="text-xl font-bold text-white mb-2">50% Merit Scholarship, RMIT University</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Awarded a 50% merit scholarship at RMIT University, recognising academic excellence
                  and commitment to the field of technology. This achievement drives me to keep
                  pushing my limits every day.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Skills */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">🛠️</span>
            <h2 className="text-2xl font-semibold text-white">Skills</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {profile.skills.map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06, duration: 0.3 }}
                className="flex items-center gap-3 bg-gray-800/60 border border-gray-700/60
                           rounded-xl px-4 py-3 hover:border-purple-600/50 transition-colors"
              >
                <span className="text-xl">{skillIcons[skill] || '💡'}</span>
                <span className="text-gray-200 text-sm font-medium">{skill}</span>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section>
          <div className="flex items-center gap-3 mb-5">
            <span className="text-2xl">📬</span>
            <h2 className="text-2xl font-semibold text-white">Get in Touch</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`mailto:${profile.contact.email}`}
              className="flex items-center gap-4 bg-gray-800/60 border border-gray-700/60
                         rounded-xl px-5 py-4 hover:border-purple-600/50 hover:bg-gray-800
                         transition-all group"
            >
              <span className="text-2xl">✉️</span>
              <div>
                <p className="text-gray-500 text-xs mb-0.5">Email</p>
                <p className="text-purple-400 group-hover:text-purple-300 text-sm transition-colors">
                  {profile.contact.email}
                </p>
              </div>
            </a>
            <a
              href={profile.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 bg-gray-800/60 border border-gray-700/60
                         rounded-xl px-5 py-4 hover:border-purple-600/50 hover:bg-gray-800
                         transition-all group"
            >
              <span className="text-2xl">🐙</span>
              <div>
                <p className="text-gray-500 text-xs mb-0.5">GitHub</p>
                <p className="text-purple-400 group-hover:text-purple-300 text-sm transition-colors">
                  TfxNexus
                </p>
              </div>
            </a>
          </div>
        </section>

      </div>
    </AnimatedPage>
  )
}
