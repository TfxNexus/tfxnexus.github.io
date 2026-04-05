import { motion } from 'framer-motion'
import { SkillTag } from './SkillTag'

// Accent colors per category for the glow artifact
const categoryGlow = {
  Games: 'from-purple-600/20 to-indigo-600/10',
  'Personal Projects': 'from-blue-600/20 to-cyan-600/10',
  Interests: 'from-violet-600/20 to-pink-600/10',
}

export function ProjectCard({ project, index = 0, category }) {
  const { title, description, techStack, repoUrl, liveUrl, imageUrl } = project
  const glow = categoryGlow[category] || categoryGlow['Personal Projects']

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ scale: 1.03, transition: { duration: 0.15 } }}
      className="relative bg-gray-800/80 border border-gray-700 rounded-2xl overflow-hidden
                 flex flex-col hover:border-purple-600/60 hover:shadow-xl hover:shadow-purple-900/25
                 transition-all duration-200 h-full group"
    >
      {/* Background artifact glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${glow} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />

      {/* Image area */}
      {imageUrl ? (
        <div className="relative w-full h-40 overflow-hidden bg-gray-900 flex-shrink-0">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
          />
          {/* Lingering gradient artifact */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-800/90 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-gray-800 to-transparent" />
        </div>
      ) : (
        <div className="relative w-full h-24 bg-gradient-to-br from-gray-900 to-gray-800 flex-shrink-0
                        flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent" />
          <span className="text-4xl opacity-20 group-hover:opacity-40 transition-opacity">
            {category === 'Games' ? '🎮' : category === 'Interests' ? '✨' : '💻'}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="relative flex-1 flex flex-col gap-2.5 p-5">
        <h3 className="text-base font-semibold text-white leading-snug group-hover:text-purple-200 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-1">{description}</p>

        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {techStack.map(skill => (
              <SkillTag key={skill} skill={skill} />
            ))}
          </div>
        )}

        {(repoUrl || liveUrl) && (
          <div className="flex gap-4 pt-2 mt-auto border-t border-gray-700/50">
            {repoUrl && (
              <a
                href={repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                GitHub →
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-purple-400 hover:text-purple-300 transition-colors font-medium"
              >
                Visit →
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
