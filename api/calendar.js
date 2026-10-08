const { put, list } = require('@vercel/blob');

const BLOB_PATH = 'alpha-calendar/booked-dates.json';
const DEFAULT_BOOKED_DATES = [
  '2026-12-12',
  '2026-12-25',
  '2026-12-26',
  '2026-12-28',
  '2026-12-30'
];

module.exports = async function handler(req, res) {
  // Universal CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    if (req.method === 'GET') {
      try {
        const { blobs } = await list({ prefix: BLOB_PATH });
        const targetBlob = blobs.find(b => b.pathname === BLOB_PATH) || blobs[0];
        if (targetBlob && targetBlob.url) {
          const freshUrl = `${targetBlob.url}${targetBlob.url.includes('?') ? '&' : '?'}t=${Date.now()}`;
          const response = await fetch(freshUrl, {
            cache: 'no-store',
            headers: { 'Cache-Control': 'no-cache, no-store' }
          });
          if (response.ok) {
            const data = await response.json();
            return res.status(200).json({
              dates: Array.isArray(data.dates) ? data.dates : DEFAULT_BOOKED_DATES,
              updatedAt: data.updatedAt || null
            });
          }
        }
      } catch (err) {
        console.warn('Could not read existing blob:', err);
      }
      return res.status(200).json({ dates: DEFAULT_BOOKED_DATES, updatedAt: null });
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        try {
          body = JSON.parse(body);
        } catch (e) {
          return res.status(400).json({ error: 'Invalid JSON body' });
        }
      }

      if (!body || !Array.isArray(body.dates)) {
        return res.status(400).json({ error: 'Field "dates" must be an array of ISO date strings' });
      }

      // Filter and validate date strings (YYYY-MM-DD)
      const validDates = body.dates
        .filter(d => typeof d === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(d))
        .sort();

      const payload = {
        dates: validDates,
        updatedAt: new Date().toISOString()
      };

      const result = await put(BLOB_PATH, JSON.stringify(payload), {
        access: 'public',
        addRandomSuffix: false,
        allowOverwrite: true
      });

      return res.status(200).json({
        success: true,
        dates: validDates,
        updatedAt: payload.updatedAt,
        url: result.url
      });
    }

    return res.status(405).json({ error: 'Method Not Allowed' });
  } catch (error) {
    console.error('Calendar API error:', error);
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
