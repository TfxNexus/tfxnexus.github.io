import { motion } from 'framer-motion'
import { SkillTag } from './SkillTag'

export function ProjectCard({ project, index = 0 }) {
  const { title, description, techStack, repoUrl, liveUrl, imageUrl } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ scale: 1.02, transition: { duration: 0.15 } }}
      className="bg-gray-800 border border-gray-700 rounded-xl p-5 flex flex-col gap-3
                 hover:border-purple-600/60 hover:shadow-lg hover:shadow-purple-900/20
                 transition-colors duration-200 h-full"
    >
      {imageUrl && (
        <div className="w-full h-32 rounded-lg overflow-hidden bg-gray-700 flex items-center justify-center">
          <img
            src={imageUrl}
            alt={title}
            className="max-h-full max-w-full object-contain p-2"
          />
        </div>
      )}

      <div className="flex-1 flex flex-col gap-2">
        <h3 className="text-base font-semibold text-white leading-snug">{title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-1">{description}</p>
      </div>

      {techStack.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pt-1">
          {techStack.map(skill => (
            <SkillTag key={skill} skill={skill} />
          ))}
        </div>
      )}

      {(repoUrl || liveUrl) && (
        <div className="flex gap-4 pt-1 border-t border-gray-700/60">
          {repoUrl && (
            <a
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              GitHub →
            </a>
          )}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
            >
              Live →
            </a>
          )}
        </div>
      )}
    </motion.div>
  )
}
