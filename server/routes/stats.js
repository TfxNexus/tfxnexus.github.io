import { Router } from 'express'

const router = Router()

// osu! — public API v1 (no auth needed for basic stats)
router.get('/stats/osu', async (req, res) => {
  try {
    const r = await fetch(
      `https://osu.ppy.sh/api/get_user?k=${process.env.OSU_API_KEY}&u=Tfx%20Nexus&m=0`
    )
    if (!r.ok) throw new Error('osu API error')
    const data = await r.json()
    const user = data[0]
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({
      rank: parseInt(user.pp_rank),
      countryRank: parseInt(user.pp_country_rank),
      pp: parseFloat(user.pp_raw).toFixed(0),
      accuracy: parseFloat(user.accuracy).toFixed(2),
      playCount: parseInt(user.playcount),
      country: user.country,
    })
  } catch {
    res.status(500).json({ error: 'Failed to fetch osu stats' })
  }
})

// Chess.com — fully public, no API key needed
router.get('/stats/chess', async (req, res) => {
  try {
    const r = await fetch('https://api.chess.com/pub/player/Tfx_Nexus/stats')
    if (!r.ok) throw new Error('Chess.com API error')
    const data = await r.json()
    res.json({
      rapid: data.chess_rapid?.last?.rating ?? null,
      blitz: data.chess_blitz?.last?.rating ?? null,
      bullet: data.chess_bullet?.last?.rating ?? null,
    })
  } catch {
    res.status(500).json({ error: 'Failed to fetch chess stats' })
  }
})

// Clash Royale — requires API key
router.get('/stats/clashroyale', async (req, res) => {
  try {
    const tag = encodeURIComponent('#8GC8LR2C')
    const r = await fetch(`https://api.clashroyale.com/v1/players/${tag}`, {
      headers: { Authorization: `Bearer ${process.env.CLASH_API_KEY}` },
    })
    if (!r.ok) throw new Error('Clash Royale API error')
    const data = await r.json()
    res.json({
      name: data.name,
      trophies: data.trophies,
      bestTrophies: data.bestTrophies,
      level: data.expLevel,
      wins: data.wins,
    })
  } catch {
    res.status(500).json({ error: 'Failed to fetch Clash Royale stats' })
  }
})

// Clash of Clans — requires API key
router.get('/stats/clashofclans', async (req, res) => {
  try {
    const tag = encodeURIComponent('#89LC00PL8')
    const r = await fetch(`https://api.clashofclans.com/v1/players/${tag}`, {
      headers: { Authorization: `Bearer ${process.env.CLASH_API_KEY}` },
    })
    if (!r.ok) throw new Error('Clash of Clans API error')
    const data = await r.json()
    res.json({
      name: data.name,
      townHallLevel: data.townHallLevel,
      trophies: data.trophies,
      bestTrophies: data.bestTrophies,
      warStars: data.warStars,
    })
  } catch {
    res.status(500).json({ error: 'Failed to fetch Clash of Clans stats' })
  }
})

// YouTube — requires API key
router.get('/stats/youtube', async (req, res) => {
  try {
    const channelId = process.env.YOUTUBE_CHANNEL_ID || 'UCTfxNexusOsu'
    const r = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=TfxNexusOsu&key=${process.env.YOUTUBE_API_KEY}`
    )
    if (!r.ok) throw new Error('YouTube API error')
    const data = await r.json()
    const stats = data.items?.[0]?.statistics
    if (!stats) throw new Error('Channel not found')
    res.json({
      subscribers: parseInt(stats.subscriberCount),
      views: parseInt(stats.viewCount),
      videos: parseInt(stats.videoCount),
    })
  } catch {
    res.status(500).json({ error: 'Failed to fetch YouTube stats' })
  }
})

export default router
