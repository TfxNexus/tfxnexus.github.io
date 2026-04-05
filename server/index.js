import express from 'express'
import cors from 'cors'
import profileRouter from './routes/profile.js'
import projectsRouter from './routes/projects.js'
import resumeRouter from './routes/resume.js'

const app = express()
const PORT = 3001

app.use(cors({
  origin: [
    'http://localhost:5173',
    /\.vercel\.app$/,
    /\.github\.io$/,
  ]
}))
app.use(express.json())

app.use('/api', profileRouter)
app.use('/api', projectsRouter)
app.use('/api', resumeRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

export default app
