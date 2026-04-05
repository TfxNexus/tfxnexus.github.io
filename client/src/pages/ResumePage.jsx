import { useFetch } from '../hooks/useFetch'
import { AnimatedPage } from '../components/AnimatedPage'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'
import { SkillTag } from '../components/SkillTag'

export function ResumePage() {
  const { data: resume, loading, error } = useFetch('/api/resume')

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <AnimatedPage>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 space-y-14">

        {/* Header */}
        <div className="flex items-start justify-between flex-wrap gap-4">
          <h1 className="text-4xl font-bold text-white">Resume</h1>
          <a
            href="/resume.pdf"
            download="Johnny_Tran_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-purple-600 hover:bg-purple-500 text-white rounded-lg
                       text-sm font-medium transition-colors duration-150"
          >
            Download PDF
          </a>
        </div>

        {/* Experience */}
        {resume.experience.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold text-white whitespace-nowrap">Experience</h2>
              <div className="flex-1 h-px bg-gray-800" />
            </div>
            <div className="space-y-5">
              {resume.experience.map((entry, i) => (
                <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl p-5">
                  <div className="flex items-start justify-between flex-wrap gap-2 mb-2">
                    <div>
                      <h3 className="text-base font-semibold text-white">{entry.title}</h3>
                      <p className="text-purple-400 text-sm">{entry.company}</p>
                    </div>
                    <span className="text-gray-500 text-xs bg-gray-700/60 px-2.5 py-1 rounded-full">
                      {entry.period}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed">{entry.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <section>
            <div className="flex items-center gap-4 mb-6">
              <h2 className="text-xl font-semibold text-white whitespace-nowrap">Education</h2>
              <div className="flex-1 h-px bg-gray-800" />
            </div>
            <div className="space-y-5">
              {resume.education.map((entry, i) => (
                <div key={i} className="bg-gray-800 border border-gray-700 rounded-xl p-5">
                  <div className="flex items-start justify-between flex-wrap gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-white">{entry.degree}</h3>
                      <p className="text-purple-400 text-sm">{entry.institution}</p>
                    </div>
                    <span className="text-gray-500 text-xs bg-gray-700/60 px-2.5 py-1 rounded-full">
                      {entry.period}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl font-semibold text-white whitespace-nowrap">Skills</h2>
            <div className="flex-1 h-px bg-gray-800" />
          </div>
          <div className="flex flex-wrap gap-2">
            {resume.skills.map(skill => (
              <SkillTag key={skill} skill={skill} />
            ))}
          </div>
        </section>

      </div>
    </AnimatedPage>
  )
}
