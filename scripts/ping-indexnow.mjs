/**
 * Post-deploy IndexNow ping script
 * Run after build: node scripts/ping-indexnow.mjs
 *
 * Submits all site URLs to IndexNow (Bing, Yandex, Naver) for fast indexing.
 * IndexNow key: 8249d520fb029e61ad839dfdd862ff69
 */

const INDEXNOW_KEY = '8249d520fb029e61ad839dfdd862ff69';
const HOST = 'www.whizzpack.in';

const URLS = [
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
  'https://www.whizzpack.in/blogs/custom-printed-corrugated-boxes-ecommerce-guide',
];

async function ping() {
  console.log(`Pinging IndexNow with ${URLS.length} URLs...`);

  const body = JSON.stringify({
    host: HOST,
    key: INDEXNOW_KEY,
    keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
    urlList: URLS,
  });

  try {
    const res = await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body,
    });

    if (res.ok || res.status === 202) {
      console.log(`IndexNow ping successful (HTTP ${res.status}). ${URLS.length} URLs submitted.`);
    } else {
      const text = await res.text();
      console.warn(`IndexNow ping returned HTTP ${res.status}: ${text}`);
    }
  } catch (err) {
    // Non-fatal - don't fail the build
    console.warn('IndexNow ping failed (non-fatal):', err.message);
  }
}

ping();
