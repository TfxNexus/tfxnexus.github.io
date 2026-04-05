import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { AnimatedPage } from '../components/AnimatedPage'

const events = [
  {
    year: '2006',
    date: 'May 24, 2006',
    title: 'Born in Bangkok, Thailand',
    description: 'Born to Vietnamese parents with American passports in Bangkok, Thailand. The beginning of a multicultural journey.',
    icon: '👶',
    color: '#FF66AA',
    side: 'left',
  },
  {
    year: '2010',
    date: '2010',
    title: 'Early Childhood in Bangkok',
    description: 'Growing up in Bangkok, attending Lertlah Kaset Nawamin School. Early exposure to technology and games.',
    icon: '🏫',
    color: '#4A90D9',
    side: 'right',
  },
  {
    year: '2014',
    date: '2014',
    title: 'First Steps into Gaming',
    description: 'Discovered a passion for video games. Started with casual games and quickly developed competitive instincts.',
    icon: '🎮',
    color: '#8B5CF6',
    side: 'left',
  },
  {
    year: '2018',
    date: '2018',
    title: 'Discovered osu!',
    description: 'Started playing osu! competitively. This rhythm game became a defining part of my identity and sharpened my precision and focus.',
    icon: '🎵',
    color: '#FF66AA',
    side: 'right',
  },
  {
    year: '2020',
    date: '2020',
    title: 'Moved to Vietnam',
    description: 'Family relocated from Bangkok to Ho Chi Minh City, Vietnam. A major life transition that opened new opportunities.',
    icon: '🇻🇳',
    color: '#10B981',
    side: 'left',
  },
  {
    year: '2021',
    date: '2021',
    title: 'Started Coding',
    description: 'Wrote my first lines of HTML and CSS. Immediately fell in love with the idea of building things from scratch on the web.',
    icon: '💻',
    color: '#06B6D4',
    side: 'right',
  },
  {
    year: '2022',
    date: '2022',
    title: 'Reached Fortnite Unreal Rank',
    description: 'Achieved Unreal rank in Fortnite — the highest competitive rank. Proof that dedication and practice pay off.',
    icon: '🏆',
    color: '#00D4FF',
    side: 'left',
  },
  {
    year: '2023',
    date: '2023',
    title: 'Started YouTube Channel',
    description: 'Launched @TfxNexusOsu on YouTube, sharing osu! gameplay and gaming content. Grew to over 1,000 subscribers.',
    icon: '▶️',
    color: '#FF0000',
    side: 'right',
  },
  {
    year: '2024',
    date: '2024',
    title: 'Backend Internship',
    description: 'Completed a backend internship working with SQL databases, designing tables and views, and connecting to frontend applications.',
    icon: '🗄️',
    color: '#F59E0B',
    side: 'left',
  },
  {
    year: '2025',
    date: 'March 2025',
    title: 'RMIT University — 50% Scholarship',
    description: 'Enrolled at RMIT University with a 50% merit scholarship. A proud achievement that reflects years of hard work and dedication.',
    icon: '🎓',
    color: '#A78BFA',
    side: 'right',
  },
  {
    year: '2025',
    date: 'Present',
    title: 'Building & Growing',
    description: 'Actively developing full-stack projects, improving osu! rank, creating content, and looking for opportunities to grow as a developer.',
    icon: '🚀',
    color: '#8B5CF6',
    side: 'left',
  },
]

function TimelineEvent({ event, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const isLeft = event.side === 'left'

  return (
    <div ref={ref} className={`flex items-start gap-4 ${isLeft ? 'flex-row' : 'flex-row-reverse'} relative`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="flex-1"
      >
        <div
          className="relative overflow-hidden rounded-2xl border p-5 backdrop-blur-sm"
          style={{
            borderColor: `${event.color}30`,
            background: `linear-gradient(135deg, #1f2937 0%, ${event.color}10 100%)`,
          }}
        >
          <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 pointer-events-none"
               style={{ background: event.color }} />
          <div className="flex items-start gap-3">
            <span className="text-2xl flex-shrink-0">{event.icon}</span>
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-1" style={{ color: event.color }}>
                {event.date}
              </p>
              <h3 className="text-base font-bold text-white mb-2">{event.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{event.description}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="flex-shrink-0 w-10 h-10 rounded-full border-2 flex items-center justify-center z-10 bg-gray-900"
        style={{ borderColor: event.color, boxShadow: `0 0 12px ${event.color}40` }}
      >
        <span className="text-sm">{event.icon}</span>
      </motion.div>

      {/* Spacer for opposite side */}
      <div className="flex-1" />
    </div>
  )
}

export function HistoryPage() {
  return (
    <AnimatedPage>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="mb-12">
          <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-2">Timeline</p>
          <h1 className="text-4xl font-bold text-white mb-3">My History</h1>
          <p className="text-gray-400">From Bangkok to Vietnam, from HTML to full-stack. Here's my journey.</p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-600/50 via-gray-700 to-transparent -translate-x-1/2" />

          <div className="flex flex-col gap-8">
            {events.map((event, i) => (
              <TimelineEvent key={i} event={event} index={i} />
            ))}
          </div>
        </div>

        {/* End marker */}
        <div className="flex justify-center mt-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-4 h-4 rounded-full bg-purple-500 shadow-lg shadow-purple-500/50" />
            <p className="text-gray-500 text-xs">To be continued...</p>
          </div>
        </div>
      </div>
    </AnimatedPage>
  )
}
