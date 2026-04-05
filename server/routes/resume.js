import { Router } from 'express'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const router = Router()

router.get('/resume', (req, res) => {
  try {
    const data = JSON.parse(readFileSync(join(__dirname, '../data/resume.json'), 'utf-8'))
    res.json(data)
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' })
  }
})

export default router
