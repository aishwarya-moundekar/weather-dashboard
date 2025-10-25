// netlify/functions/fetchWeather.js
export async function handler(event, context) {
  try {
    const params = event.queryStringParameters;
    const lat = params.lat || params.latitude;
    const lon = params.lon || params.longitude;

    if (!lat || !lon) {
      return { statusCode: 400, body: JSON.stringify({ error: 'lat and lon required' }) };
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,weathercode&current_weather=true&timezone=auto`;

    const response = await fetch(url);
    if (!response.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: 'Upstream error' }) };
    }

    const data = await response.json();

    // 1-minute CDN cache
    return {
      statusCode: 200,
      headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=120' },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error('Function error:', err);
    return { statusCode: 500, body: JSON.stringify({ error: 'internal error' }) };
  }
}
