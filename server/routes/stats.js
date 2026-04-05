import { Router } from 'express'

const router = Router()

// osu! — API v2 with client credentials OAuth
// Needs OSU_CLIENT_ID and OSU_CLIENT_SECRET from https://osu.ppy.sh/home/account/edit (OAuth section)
router.get('/stats/osu', async (req, res) => {
  try {
    // Step 1: get access token
    const tokenRes = await fetch('https://osu.ppy.sh/oauth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: process.env.OSU_CLIENT_ID,
        client_secret: process.env.OSU_CLIENT_SECRET,
        grant_type: 'client_credentials',
        scope: 'public',
      }),
    })
    if (!tokenRes.ok) {
      const err = await tokenRes.text()
      console.error('osu token error:', err)
      throw new Error('osu token failed')
    }
    const { access_token } = await tokenRes.json()

    // Step 2: get user stats
    const userRes = await fetch(
      'https://osu.ppy.sh/api/v2/users/Tfx%20Nexus/osu?key=username',
      { headers: { Authorization: `Bearer ${access_token}` } }
    )
    if (!userRes.ok) {
      const err = await userRes.text()
      console.error('osu user error:', err)
      throw new Error('osu user fetch failed')
    }
    const user = await userRes.json()
    const s = user.statistics

    res.json({
      rank: s?.global_rank ?? null,
      countryRank: s?.country_rank ?? null,
      pp: s?.pp ? parseFloat(s.pp).toFixed(0) : null,
      accuracy: s?.hit_accuracy ? parseFloat(s.hit_accuracy).toFixed(2) : null,
      playCount: s?.play_count ?? null,
      country: user.country_code ?? null,
      level: s?.level?.current ?? null,
    })
  } catch (e) {
    console.error('osu stats error:', e.message)
    res.status(500).json({ error: 'Failed to fetch osu stats' })
  }
})

// Chess.com — fully public, no API key needed
router.get('/stats/chess', async (req, res) => {
  try {
    const r = await fetch('https://api.chess.com/pub/player/Tfx_Nexus/stats', {
      headers: { 'User-Agent': 'portfolio-site/1.0' },
    })
    if (!r.ok) throw new Error(`Chess.com ${r.status}`)
    const data = await r.json()
    res.json({
      rapid: data.chess_rapid?.last?.rating ?? null,
      blitz: data.chess_blitz?.last?.rating ?? null,
      bullet: data.chess_bullet?.last?.rating ?? null,
    })
  } catch (e) {
    console.error('chess stats error:', e.message)
    res.status(500).json({ error: 'Failed to fetch chess stats' })
  }
})

// Clash Royale — requires API key from https://developer.clashroyale.com
// IMPORTANT: you must whitelist your Render server IP in the developer portal
router.get('/stats/clashroyale', async (req, res) => {
  try {
    const tag = encodeURIComponent('#8GC8LR2C')
    const r = await fetch(`https://api.clashroyale.com/v1/players/${tag}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_ROYALE_API_KEY}`,
        Accept: 'application/json',
      },
    })
    if (!r.ok) {
      const err = await r.text()
      console.error('Clash Royale error:', r.status, err)
      throw new Error(`Clash Royale ${r.status}`)
    }
    const data = await r.json()
    res.json({
      name: data.name,
      trophies: data.trophies,
      bestTrophies: data.bestTrophies,
      level: data.expLevel,
      wins: data.wins,
    })
  } catch (e) {
    console.error('clashroyale stats error:', e.message)
    res.status(500).json({ error: 'Failed to fetch Clash Royale stats' })
  }
})

// Clash of Clans — requires API key from https://developer.clashofclans.com
// IMPORTANT: you must whitelist your Render server IP in the developer portal
router.get('/stats/clashofclans', async (req, res) => {
  try {
    const tag = encodeURIComponent('#89LC00PL8')
    const r = await fetch(`https://api.clashofclans.com/v1/players/${tag}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLASH_OF_CLANS_API_KEY}`,
        Accept: 'application/json',
      },
    })
    if (!r.ok) {
      const err = await r.text()
      console.error('Clash of Clans error:', r.status, err)
      throw new Error(`Clash of Clans ${r.status}`)
    }
    const data = await r.json()
    res.json({
      name: data.name,
      townHallLevel: data.townHallLevel,
      trophies: data.trophies,
      bestTrophies: data.bestTrophies,
      warStars: data.warStars,
    })
  } catch (e) {
    console.error('clashofclans stats error:', e.message)
    res.status(500).json({ error: 'Failed to fetch Clash of Clans stats' })
  }
})

// YouTube Data API v3
// Get your API key from https://console.cloud.google.com — enable YouTube Data API v3
router.get('/stats/youtube', async (req, res) => {
  try {
    const r = await fetch(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=TfxNexusOsu&key=${process.env.YOUTUBE_API_KEY}`
    )
    if (!r.ok) {
      const err = await r.text()
      console.error('YouTube error:', r.status, err)
      throw new Error(`YouTube ${r.status}`)
    }
    const data = await r.json()
    if (data.error) {
      console.error('YouTube API error:', JSON.stringify(data.error))
      throw new Error(data.error.message)
    }
    const stats = data.items?.[0]?.statistics
    if (!stats) {
      console.error('YouTube: no items found, response:', JSON.stringify(data))
      throw new Error('Channel not found')
    }
    res.json({
      subscribers: parseInt(stats.subscriberCount),
      views: parseInt(stats.viewCount),
      videos: parseInt(stats.videoCount),
    })
  } catch (e) {
    console.error('youtube stats error:', e.message)
    res.status(500).json({ error: 'Failed to fetch YouTube stats' })
  }
})

export default router
