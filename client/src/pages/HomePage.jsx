import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { useFetch } from '../hooks/useFetch'
import { API_BASE } from '../lib/apiBase'
import { LoadingSpinner } from '../components/LoadingSpinner'
import { ErrorMessage } from '../components/ErrorMessage'

// Carousel images for RMIT section (high quality Unsplash)
const rmitSlides = [
  {
    url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=1200&q=80',
    caption: 'University life at RMIT',
  },
  {
    url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&q=80',
    caption: 'Pursuing excellence',
  },
  {
    url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&q=80',
    caption: 'Building the future',
  },
]

function Carousel() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % rmitSlides.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden shadow-2xl shadow-purple-900/30">
      {rmitSlides.map((slide, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={{ opacity: i === current ? 1 : 0, scale: i === current ? 1 : 1.05 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <img
            src={slide.url}
            alt={slide.caption}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-transparent to-transparent" />
          <p className="absolute bottom-3 left-4 text-xs text-gray-300 font-medium">{slide.caption}</p>
        </motion.div>
      ))}
      {/* Dots */}
      <div className="absolute bottom-3 right-4 flex gap-1.5">
        {rmitSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              i === current ? 'bg-purple-400 w-4' : 'bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

function SlideSection({ children, fromRight = false, delay = 0 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: fromRight ? 60 : -60 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// Animated background blobs
function BackgroundBlobs() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-700/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-indigo-600/15 rounded-full blur-3xl animate-pulse"
           style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-20 left-1/4 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-pulse"
           style={{ animationDelay: '2s' }} />
    </div>
  )
}

export function HomePage() {
  const { data: profile, loading, error } = useFetch(`${API_BASE}/api/profile`)

  if (loading) return <LoadingSpinner />
  if (error) return <ErrorMessage message={error} />

  return (
    <div className="relative">
      <BackgroundBlobs />

      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-24 sm:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-purple-400 font-medium text-sm tracking-widest uppercase mb-3">
            Hi, I'm
          </p>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-4">
            {profile.name}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-400 mb-6">{profile.tagline}</p>
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
            {profile.bio}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/projects"
              className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white rounded-lg
                         font-medium text-sm transition-colors duration-150 shadow-lg shadow-purple-900/40"
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
        </motion.div>
      </section>

      {/* Divider */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
      </div>

      {/* Story sections */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20 space-y-24">

        {/* Section 1: Origin story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <SlideSection fromRight={false}>
            <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-2">My Story</p>
            <h2 className="text-3xl font-bold text-white mb-4">Born in Bangkok, raised in Vietnam</h2>
            <p className="text-gray-400 leading-relaxed mb-3">
              I was born in Bangkok, Thailand to Vietnamese parents, both holding American passports.
              Growing up between cultures gave me a unique perspective on the world. In 2020, my family
              moved to Vietnam, where I've been building my life and career ever since.
            </p>
            <p className="text-gray-400 leading-relaxed">
              That multicultural background shapes how I think about problems, how I communicate, and
              how I approach building things for people from all walks of life.
            </p>
            <div className="flex gap-2 mt-4">
              <span className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300">🇹🇭 Born in Bangkok</span>
              <span className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300">🇻🇳 Based in Vietnam</span>
              <span className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-xs text-gray-300">🇺🇸 American Passport</span>
            </div>
          </SlideSection>
          <SlideSection fromRight={true} delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden h-64 shadow-xl shadow-purple-900/20">
              <img
                src="https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&q=80"
                alt="Vietnam cityscape"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 to-transparent" />
              <div className="absolute bottom-3 left-4 text-xs text-gray-300 font-medium">Ho Chi Minh City, Vietnam</div>
            </div>
          </SlideSection>
        </div>

        {/* Section 1b: Developer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <SlideSection fromRight={false} delay={0.05}>
            <div className="relative rounded-2xl overflow-hidden h-56 shadow-xl shadow-purple-900/20">
              <img
                src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80"
                alt="Developer at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-transparent" />
            </div>
          </SlideSection>
          <SlideSection fromRight={true}>
            <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-2">Who I Am</p>
            <h2 className="text-3xl font-bold text-white mb-4">A developer with a passion for craft</h2>
            <p className="text-gray-400 leading-relaxed">
              I started coding because I wanted to build things that felt alive. From my first HTML page
              to full-stack React apps, every project has been a step toward mastering the craft of
              software development. I care deeply about clean code, good design, and building things
              that actually work.
            </p>
          </SlideSection>
        </div>

        {/* Section 2: RMIT Scholarship (visual left, text right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <SlideSection fromRight={false} delay={0.05}>
            <Carousel />
          </SlideSection>
          <SlideSection fromRight={true}>
            <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-2">Academic Achievement</p>
            <h2 className="text-3xl font-bold text-white mb-4">50% RMIT Scholarship</h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Earning a 50% merit scholarship at RMIT University is one of the achievements I'm most
              proud of. It represents not just academic performance, but the recognition that hard work
              and dedication genuinely pay off.
            </p>
            <p className="text-gray-400 leading-relaxed">
              This scholarship motivates me every day to push further, learn deeper, and give back
              through the quality of work I produce. It's a reminder that the effort I put in matters.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 px-4 py-2 bg-purple-900/40 border border-purple-700/50 rounded-lg">
              <span className="text-purple-300 text-2xl font-bold">50%</span>
              <span className="text-gray-400 text-sm">Merit Scholarship, RMIT University</span>
            </div>
          </SlideSection>
        </div>

        {/* Section 3: Gaming & creativity (text left, visual right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <SlideSection fromRight={false}>
            <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-2">Beyond the Code</p>
            <h2 className="text-3xl font-bold text-white mb-4">Gaming sharpens my thinking</h2>
            <p className="text-gray-400 leading-relaxed">
              Games like osu!, Valorant, and Fortnite aren't just hobbies. They've trained my
              reaction time, strategic thinking, and ability to stay calm under pressure. The same
              focus I bring to a ranked match is the same focus I bring to debugging a tricky problem
              at 2am.
            </p>
          </SlideSection>
          <SlideSection fromRight={true} delay={0.1}>
            <div className="relative rounded-2xl overflow-hidden h-56 shadow-xl shadow-purple-900/20">
              <img
                src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80"
                alt="Gaming setup"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/40 to-transparent" />
            </div>
          </SlideSection>
        </div>

        {/* Section 4: What's next (visual left, text right) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <SlideSection fromRight={false} delay={0.05}>
            <div className="relative rounded-2xl overflow-hidden h-56 shadow-xl shadow-purple-900/20">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80"
                alt="Team collaboration"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-900/40 to-transparent" />
            </div>
          </SlideSection>
          <SlideSection fromRight={true}>
            <p className="text-purple-400 text-xs font-semibold tracking-widest uppercase mb-2">What's Next</p>
            <h2 className="text-3xl font-bold text-white mb-4">Building toward something real</h2>
            <p className="text-gray-400 leading-relaxed mb-6">
              I'm actively looking for opportunities to grow as a developer, whether that's through
              internships, collaborative projects, or open source contributions. I want to work on
              things that matter and with people who care about quality.
            </p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300
                         font-medium text-sm transition-colors"
            >
              See my work
              <span>→</span>
            </Link>
          </SlideSection>
        </div>

      </div>
    </div>
  )
}
