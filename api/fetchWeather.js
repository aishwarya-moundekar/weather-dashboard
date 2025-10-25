// api/fetchWeather.js
// Vercel Serverless Function (Node) — proxies Open-Meteo forecast requests.
// Saves the client from calling the upstream directly (CORS/rate-limit control)
// and allows simple caching / logging later.

export default async function handler(req, res) {
  try {
    const lat = req.query.lat || req.query.latitude;
    const lon = req.query.lon || req.query.longitude;
    if(!lat || !lon) return res.status(400).json({ error: 'lat and lon query params required' });

    const params = new URLSearchParams({
      latitude: lat,
      longitude: lon,
      hourly: 'temperature_2m,precipitation,weathercode',
      current_weather: 'true',
      timezone: 'auto'
    });

    const url = `https://api.open-meteo.com/v1/forecast?${params.toString()}`;

    // Proxy the request
    const upstream = await fetch(url);
    if(!upstream.ok) {
      // forward upstream status
      return res.status(502).json({ error: 'Upstream weather API error', status: upstream.status });
    }
    const data = await upstream.json();

    // Cache at the CDN edge for 60s; allow stale while revalidate
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=120');

    // Optional: add logging here (e.g., write to DB). Keep minimal for now.
    return res.status(200).json(data);
  } catch (err) {
    console.error('api/fetchWeather error', err);
    return res.status(500).json({ error: 'internal error' });
  }
}
