/**
 * IndexNow auto-ping API route
 * POST /api/indexnow  { urls: ["https://www.whizzpack.in/blogs/slug"] }
 * GET  /api/indexnow  — pings all sitemap URLs (used by deploy script)
 *
 * IndexNow key: 8249d520fb029e61ad839dfdd862ff69
 * Key file must be served at: https://www.whizzpack.in/8249d520fb029e61ad839dfdd862ff69.txt
 */

const INDEXNOW_KEY = '8249d520fb029e61ad839dfdd862ff69';
const HOST = 'www.whizzpack.in';
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

// All site URLs - update this list when new pages are added
const ALL_URLS = [
  'https://www.whizzpack.in/',
  'https://www.whizzpack.in/corrugated-boxes',
  'https://www.whizzpack.in/corrugated-boxes/rsc-boxes',
  'https://www.whizzpack.in/corrugated-boxes/double-wall',
  'https://www.whizzpack.in/corrugated-boxes/custom-printed',
  'https://www.whizzpack.in/cotton-seed-bags',
  'https://www.whizzpack.in/cotton-seed-bags/drawstring',
  'https://www.whizzpack.in/cotton-seed-bags/organic',
  'https://www.whizzpack.in/cotton-seed-bags/custom-printed',
  'https://www.whizzpack.in/about',
  'https://www.whizzpack.in/authors/jash-b',
  'https://www.whizzpack.in/blogs',
  'https://www.whizzpack.in/blogs/why-import-packaging-from-india',
  'https://www.whizzpack.in/blogs/how-to-import-corrugated-boxes-from-india',
  'https://www.whizzpack.in/blogs/cotton-seed-bags-sourcing-guide-usa-uk',
  'https://www.whizzpack.in/blogs/eco-friendly-packaging-from-india',
  'https://www.whizzpack.in/blogs/pizza-boxes-from-india-sourcing-guide',
  'https://www.whizzpack.in/blogs/single-wall-vs-double-wall-corrugated-boxes',
  'https://www.whizzpack.in/blogs/custom-printed-boxes-with-logo-buyers-guide',
  'https://www.whizzpack.in/blogs/cardboard-shipping-boxes-bulk-guide',
  'https://www.whizzpack.in/blogs/drawstring-cotton-seed-bags-guide',
  'https://www.whizzpack.in/blogs/sourcing-cotton-seed-bags-from-india',
  'https://www.whizzpack.in/blogs/bulk-cotton-seed-bags-commercial-farms',
  'https://www.whizzpack.in/blogs/custom-printed-cotton-seed-bags-retail-brands',
  'https://www.whizzpack.in/blogs/heavy-duty-corrugated-boxes-export-shipping',
  'https://www.whizzpack.in/blogs/jute-vs-cotton-seed-bags-comparison',
  'https://www.whizzpack.in/blogs/corrugated-box-sizes-grades-buyers-guide',
  'https://www.whizzpack.in/blogs/cotton-seed-bags-organic-farming-guide',
  'https://www.whizzpack.in/blogs/india-packaging-lead-times-shipping-guide',
  'https://www.whizzpack.in/blogs/b-flute-vs-c-flute-vs-e-flute-corrugated-boxes',
  'https://www.whizzpack.in/blogs/amazon-fba-corrugated-boxes-india',
  'https://www.whizzpack.in/blogs/cotton-bags-vs-plastic-bags-seed-storage',
  'https://www.whizzpack.in/blogs/muslin-bags-wholesale-india',
  'https://www.whizzpack.in/blogs/corrugated-box-manufacturer-india-guide',
];

async function pingIndexNow(urls) {
  const body = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  });

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body,
  });

  return { status: res.status, ok: res.ok };
}

export default async function handler(req, res) {
  // Only allow from Vercel deploy hooks or internal calls
  const secret = req.headers['x-indexnow-secret'];
  if (secret !== process.env.INDEXNOW_SECRET && req.method !== 'GET') {
    // For GET, allow with no auth (used for manual triggers and deploy script)
  }

  if (req.method === 'POST') {
    const { urls } = req.body || {};
    if (!urls || !Array.isArray(urls) || urls.length === 0) {
      return res.status(400).json({ error: 'urls array required' });
    }

    // Batch in groups of 10,000 (IndexNow limit)
    const batches = [];
    for (let i = 0; i < urls.length; i += 10000) {
      batches.push(urls.slice(i, i + 10000));
    }

    const results = [];
    for (const batch of batches) {
      const result = await pingIndexNow(batch);
      results.push(result);
    }

    return res.status(200).json({ pinged: urls.length, results });
  }

  if (req.method === 'GET') {
    // Ping all known site URLs
    const result = await pingIndexNow(ALL_URLS);
    return res.status(200).json({
      pinged: ALL_URLS.length,
      urls: ALL_URLS,
      indexnow: result,
    });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
