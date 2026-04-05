import { Routes, Route } from 'react-router-dom'
import { NavBar } from './components/NavBar'
import { LeftSidebar, RightSidebar } from './components/PageSidebar'
import { HomePage } from './pages/HomePage'
import { AboutPage } from './pages/AboutPage'
import { ProjectsPage } from './pages/ProjectsPage'
import { ResumePage } from './pages/ResumePage'
import { HistoryPage } from './pages/HistoryPage'
import { NotFoundPage } from './pages/NotFoundPage'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <NavBar />
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 xl:px-8">
        <div className="flex gap-6 xl:gap-8 py-0">
          <LeftSidebar />
          <main className="flex-1 min-w-0">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/resume" element={<ResumePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <RightSidebar />
        </div>
      </div>
    </div>
  )
}
