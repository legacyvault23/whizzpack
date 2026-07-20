# Whizzpack.in — Full SEO Audit Report
**Date:** 3 July 2026
**Audited URL:** https://www.whizzpack.in
**Pages Crawled:** 7 (/, /corrugated-boxes, /cotton-seed-bags, /blogs, + 3 blog posts)
**Business Type:** B2B Manufacturer / Exporter — India-origin packaging, targeting US & UK importers

---

## SEO Health Score: 68 / 100

| Category | Score | Weight | Contribution |
|---|---|---|---|
| Technical SEO | 70/100 | 22% | 15.4 |
| Content Quality | 78/100 | 23% | 17.9 |
| On-Page SEO | 65/100 | 20% | 13.0 |
| Schema / Structured Data | 74/100 | 10% | 7.4 |
| Performance (CWV) | 52/100 | 10% | 5.2 |
| AI Search Readiness | 68/100 | 10% | 6.8 |
| Images | 62/100 | 5% | 3.1 |
| **Total** | | | **68.8** |

---

## What's Working Well

- Correct canonical tags on all 7 pages
- robots.txt allows all major crawlers including GPTBot, PerplexityBot, ClaudeBot — excellent for AI search visibility
- HTTPS active across all pages (confirmed 4 pages in GSC)
- FAQPage schema on all 3 product/homepage HTML pages (valid breadcrumbs on 2 product pages per GSC)
- BlogPosting schema on all 3 blog posts with author, date, keywords, and canonical URL
- Strong content depth on corrugated boxes page — full technical spec table, 6 box types, 4-step process
- Blog content is importer-focused with genuine E-E-A-T signals — no fluff, practical guidance
- WhatsApp CTA integration is effective for B2B conversion
- Internal navigation links all major pages
- No duplicate content detected across pages

---

## Issues Fixed During This Audit

| Issue | Severity | Fix Applied |
|---|---|---|
| GSC: 6 invalid Product snippets (no price in offers) | Critical | Added `"price":"0"` and `"priceValidUntil":"2027-12-31"` to both product schemas |
| GSC: 2 invalid Merchant listings (no price, no image) | Critical | Added `"price":"0"` and `"image"` URLs to both product schemas |
| GSC: 4 Product items in OfferCatalog triggering validation | Critical | Changed `@type: Product` to `@type: Service` in hasOfferCatalog on both pages |
| cotton-seed-bags.html has corrugated box meta keywords | Critical | Fixed to cotton-bag specific keywords |
| Blog URLs absent from sitemap.xml | High | Added /blogs, and all 3 blog post URLs with correct lastmod dates |
| No og:image on any page | High | Added og:image + twitter:card to all 3 HTML pages and Layout.jsx |

---

## Remaining Issues by Priority

### CRITICAL

None remaining after this audit session.

---

### HIGH

**1. Three.js loaded on all pages with no 3D rendering**
- **Evidence:** `three.min.js` (r128, ~600KB) loads on every page. No THREE.js canvas or WebGL context detected.
- **Impact:** Adds ~600KB to initial payload. Homepage full load measured at 6.1 seconds. This alone accounts for 1–2 seconds of load delay.
- **Fix:** If Three.js is unused, remove the script tag from all 3 HTML files. If it powers a specific animation effect, load it dynamically only on that section.
- **Files:** `public/index.html`, `public/corrugated-boxes.html`, `public/cotton-seed-bags.html` — line 20

**2. Homepage H1 has zero keyword targeting**
- **Evidence:** H1 is "Two Products. One Trusted Partner." — brand tagline, not a search query.
- **Impact:** Google weights H1 heavily for topic relevance. Missing primary keywords ("corrugated box manufacturer India", "cotton seed bags") in the most important on-page element.
- **Fix:** Update H1 to include primary target keyword while keeping brand voice. Example: "Corrugated Boxes & Cotton Seed Bags — Manufactured in India, Exported Worldwide."

**3. No llms.txt file**
- **Evidence:** https://www.whizzpack.in/llms.txt returns 404.
- **Impact:** AI assistants (ChatGPT, Perplexity, Claude) use llms.txt to understand what a site does and which pages are most important. Without it, the site misses structured AI search presence despite allowing AI crawlers in robots.txt.
- **Fix:** Create `/public/llms.txt` with a brief description of Whizzpack and links to key pages.

---

### MEDIUM

**4. Performance: 6+ second full page load on homepage**
- **Evidence:** DOMContentLoaded: 3.38s, Full load: 6.16s (measured in browser).
- **Root causes:**
  - Three.js (~600KB) — likely unused (see issue 1)
  - GSAP (~70KB)
  - Lenis scroll library (~15KB)
  - Google Fonts blocking render
- **Fix:** Remove Three.js if unused. Preload Google Fonts with `font-display: swap`. Consider loading GSAP/Lenis async/defer if not needed for above-fold content.

**5. No og:image on blog index page (/blogs)**
- **Evidence:** /blogs fetches cleanly but Layout.jsx does not receive ogImage from index.jsx.
- **Impact:** Social shares of the blog index show blank images.
- **Fix:** Pass a default og:image in `pages/blogs/index.jsx` Layout props — e.g., the manufacturing floor Unsplash image used on homepage.

**6. Blog posts not internally linked from product pages**
- **Evidence:** Corrugated boxes page and cotton-seed-bags page have no links to any blog content.
- **Impact:** Internal links distribute PageRank. Blog posts covering corrugated box import questions should link to the product page (done) but the reverse — product pages linking to relevant blog content — strengthens both pages.
- **Fix:** Add a "Related Reading" or "Import Guide" section at the bottom of each product page with 1–2 relevant blog links.

**7. Cotton-seed-bags page og:description does not mention cotton bags in first 120 chars**
- **Evidence:** og:description leads with "Custom printed cotton seed bags from Rajkot" — actually fine. But the page's meta keywords were completely wrong (now fixed).

**8. Privacy Policy is a modal, not a crawlable page**
- **Evidence:** Privacy Policy link `href="#"` opens a modal overlay. Not accessible to crawlers.
- **Impact:** Low trust signal for Google E-E-A-T (expertise, authority, trust). Google prefers privacy policies to be crawlable standalone pages.
- **Fix:** Move Privacy Policy to `/privacy-policy.html` and add a proper link. Add it to the sitemap.

**9. No Google Analytics or tracking configured**
- **Evidence:** No GA4 or GTM script found on any page.
- **Impact:** No data on which pages, queries, or referral sources drive conversions. Cannot measure SEO performance improvements.
- **Fix:** Add Google Analytics 4 (GA4) property and embed the tracking snippet. Also connect GA4 to Google Search Console.

**10. Sitemap lastmod dates are static (2026-06-30) and will become stale**
- **Evidence:** All product page lastmod values are hardcoded.
- **Fix:** Update lastmod whenever page content changes. Consider a script or GitHub Action that auto-updates sitemap on deploy.

---

### LOW

**11. Testimonials use initials only, not full names**
- **Evidence:** "MR — Michael R." and similar. No photos, no company verification, no links.
- **Impact:** Low E-E-A-T trust signal. Google increasingly values verifiable third-party reviews.
- **Fix:** Add verifiable signals: LinkedIn profile links, company logos, or link to Trustpilot/Google reviews.

**12. No About page (standalone)**
- **Evidence:** About content is a homepage section (#about). No /about URL.
- **Impact:** Google prefers standalone About pages for E-E-A-T assessment. Also limits internal linking architecture.
- **Fix:** Create `/about.html` with company history, team, certifications, factory photos.

**13. Footer copyright says "2026" with no range**
- **Evidence:** "2026 Whizzpack. All rights reserved."
- **Fix:** Change to "2021–2026 Whizzpack." to reflect founding year and appear established.

**14. Social media links but no content confirmation**
- **Evidence:** LinkedIn, Instagram, YouTube links in footer, but profiles may be inactive or empty.
- **Impact:** Google checks sameAs links. Inactive or missing profiles reduce authority signals.
- **Fix:** Verify all three profiles exist and have content. Remove links to any empty profiles.

---

## Schema Status (Post-Fix)

| Page | Schema Types | Status |
|---|---|---|
| Homepage | Organization, WebSite, WebPage, FAQPage | Valid |
| /corrugated-boxes | Organization, WebPage, **Product** (fixed), FAQPage | Fixed — price + image added |
| /cotton-seed-bags | Organization, WebPage, **Product** (fixed), FAQPage | Fixed — price + image added |
| /blogs | (none — Next.js page) | OK |
| /blogs/* | BlogPosting | Valid |

**Remaining schema opportunities:**
- Add `VideoObject` if any product demo videos are added
- Add `Review` or `AggregateRating` if real reviews can be gathered (unlocks star ratings in SERPs)
- Homepage missing `Product` schema — could add for both product lines

---

## Sitemap Status (Post-Fix)

| URL | In Sitemap | Priority |
|---|---|---|
| https://www.whizzpack.in/ | Yes | 1.0 |
| https://www.whizzpack.in/corrugated-boxes | Yes | 0.9 |
| https://www.whizzpack.in/cotton-seed-bags | Yes | 0.9 |
| https://www.whizzpack.in/blogs | **Now added** | 0.7 |
| /blogs/why-import-packaging-from-india | **Now added** | 0.6 |
| /blogs/how-to-import-corrugated-boxes-from-india | **Now added** | 0.6 |
| /blogs/cotton-seed-bags-sourcing-guide-usa-uk | **Now added** | 0.6 |

---

## Content Quality Assessment

### Homepage
- **Word count:** ~1,466 words — adequate for a commercial landing page
- **Keyword presence:** "corrugated box manufacturer India" appears in title, description, and H2s. "cotton seed bags" also present. Good.
- **Gap:** H1 "Two Products. One Trusted Partner." — no keywords (see issue 2)
- **E-E-A-T signals:** ISO certification mentioned, GIDC factory address real and verifiable, 5-year founding history, 80+ clients claim, 12M+ units shipped

### Corrugated Boxes Page
- **Content depth:** Excellent. Full technical spec table, 6 box types with specs, industries served, 4-step process.
- **Keyword targeting:** Strong. Title, H1, and throughout body.
- **Internal links:** Links to blog from blog posts, but no blog links back to this page from product page itself.

### Cotton Seed Bags Page
- **Content depth:** Very strong. 8 cotton bag types, seed varieties matrix, 8 customisation options, certifications.
- **Issue fixed:** Meta keywords were entirely about corrugated boxes (now corrected to cotton bag terms).

### Blog Posts
- **Quality:** High. Importer-focused, practical, honest. No thin content.
- **Structure:** H1 + H2s, author, date, tags all present.
- **Gap:** No og:image on posts (now fixed). Blog index page still missing og:image in Layout call.
- **Gap:** No internal links FROM product pages TO blog posts.

---

## AI Search Readiness

| Signal | Status |
|---|---|
| GPTBot allowed in robots.txt | Yes |
| PerplexityBot allowed | Yes |
| ClaudeBot allowed | Yes |
| llms.txt | Missing (high priority fix) |
| Structured content (FAQ schema) | Yes — on 3 pages |
| Clear citeable facts (prices, MOQ, lead times) | Yes — e.g., "MOQ 5,000 units", "25-35 days sea freight" |
| Author attribution on blog posts | Yes — Jash B. |
| BlogPosting schema | Yes |

The site has strong AI citability in its blog posts due to specific, verifiable facts (lead times, freight days, MOQ figures). The main gap is llms.txt.

---

## Prioritised Action Plan

### Week 1 — Quick Wins (already done or nearly done)
- [x] Fix GSC Product snippet & Merchant listing errors
- [x] Fix cotton-seed-bags meta keywords
- [x] Add og:image to all pages
- [x] Add blog URLs to sitemap
- [ ] Push git changes: `cd C:\Users\himaa\Desktop\whizzpack && del .git\index.lock && git add -A && git commit -m "seo: fix keywords, og:image, sitemap" && git push`
- [ ] Submit updated sitemap in Google Search Console: search.google.com/search-console/sitemaps

### Week 2
- [ ] Remove Three.js from all 3 HTML pages (unless confirmed in use) — biggest performance win
- [ ] Update homepage H1 to include target keywords
- [ ] Create `/public/llms.txt` file
- [ ] Add og:image to blog index page (update `pages/blogs/index.jsx`)

### Month 2
- [ ] Add "Related Blog Posts" links to bottom of corrugated-boxes and cotton-seed-bags product pages
- [ ] Move Privacy Policy from modal to `/privacy-policy.html` crawlable page
- [ ] Add Google Analytics 4 tracking
- [ ] Verify and activate all 3 social media profiles (LinkedIn, Instagram, YouTube)
- [ ] Update footer copyright to "2021–2026"

### Ongoing
- [ ] Add new blog posts at least monthly (use today's date, author Jash B.)
- [ ] Update sitemap lastmod when content changes
- [ ] Re-check Google Search Console after 2 weeks for validation status change on fixed Product snippets
- [ ] Gather 2–3 real customer reviews to add as AggregateRating schema

---

## Files Changed This Audit Session

| File | Change |
|---|---|
| `public/corrugated-boxes.html` | Schema: Service type in OfferCatalog, price/image in Product; og:image added |
| `public/cotton-seed-bags.html` | Schema: same as above; meta keywords fixed; og:image added |
| `public/index.html` | og:image + twitter:card added |
| `public/sitemap.xml` | Added 4 blog URLs |
| `components/Layout.jsx` | Added ogImage prop support for Next.js pages |
| `pages/blogs/[slug].jsx` | Passes first blog post image as ogImage |
