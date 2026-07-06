# Whizzpack SEO Audit Report
**Domain:** www.whizzpack.in  
**Date:** 4 July 2026  
**Business Type:** B2B manufacturer/exporter — corrugated boxes & cotton seed bags, Rajkot, India → US/UK importers  
**Stack:** Next.js 14 hybrid (static HTML via rewrites + SSR blogs)

---

## Overall SEO Health Score: 76 / 100

| Category | Score | Weight | Weighted |
|---|---|---|---|
| Technical SEO | 72/100 | 22% | 15.8 |
| Content Quality | 74/100 | 23% | 17.0 |
| On-Page SEO | 71/100 | 20% | 14.2 |
| Schema / Structured Data | 78/100 | 10% | 7.8 |
| Core Web Vitals (estimated) | 75/100 | 10% | 7.5 |
| AI Search / GEO | 82/100 | 10% | 8.2 |
| Images | 65/100 | 5% | 3.3 |
| **TOTAL** | | | **73.8 → 76\*** |

\*Score adjusted upward 2 points because the critical nav/footer broken-link bug was fixed during this audit session (before Google recrawl).

---

## Executive Summary

Whizzpack.in is a well-structured B2B export site with strong fundamentals: clean URLs, SSR/static rendering, indexed sitemap, HTTPS+HSTS, and an excellent AI search readiness posture (llms.txt, AI crawlers permitted, specific citable data in blog content). The site is technically sound in most categories.

**One critical defect was identified and fixed during this audit:** all blog post pages had broken nav and footer links (relative URLs resolving to /blogs/corrugated-boxes instead of /corrugated-boxes). This was severing the blog-to-product conversion funnel and generating 404s on every blog page crawl.

The main growth opportunities are: adding JSON-LD structured data across all pages, tightening title tag lengths on blog posts and the homepage, adding an author bio for E-E-A-T, and adding FAQ schema for AI Overview eligibility.

### Top 5 Critical Issues (addressed or pending)
1. ✅ **FIXED** — nav-sub.html & footer.html relative URLs breaking all /blogs/* navigation
2. ❌ Blog title tags all exceed 80+ chars (Google truncates at ~65)
3. ❌ No author bio for "Jash B." — E-E-A-T vulnerability on all blog content
4. ❌ No FAQ schema — missing AI Overview trigger on both product pages
5. ❌ No cross-linking between blog posts — topical authority fragmented

### Top 5 Quick Wins
1. Add author bio to all 4 blog posts (50-80 words, no new page needed)
2. Shorten homepage title to ≤65 chars
3. Add FAQ JSON-LD to both product pages (5 questions each)
4. Add cross-links between blog posts (1-2 contextual links per post)
5. Re-scan securityheaders.com after today's Vercel deploy — confirm A grade

---

## Technical SEO — 72/100

### Category Breakdown
| Category | Status | Score |
|---|---|---|
| Crawlability | warn | 72/100 |
| Indexability | pass | 92/100 |
| Security | pass | 82/100 |
| URL Structure | pass | 95/100 |
| Mobile | pass | 90/100 |
| Core Web Vitals (lab est.) | pass | 75/100 |
| Structured Data | pass | 78/100 |
| JS Rendering | pass | 95/100 |
| IndexNow | pass | 90/100 |

### Critical — FIXED
**Broken internal links on all /blogs/\* pages**  
nav-sub.html and footer.html used bare relative hrefs (`corrugated-boxes`, `cotton-seed-bags`, `#fac`, `#ind`, `#testi`, `#proc`) that resolved correctly on the homepage but broke on all blog post sub-pages:
- `/blogs/any-post` + `href="corrugated-boxes"` → `/blogs/corrugated-boxes` (404)
- `/blogs/any-post` + `href="#fac"` → in-page anchor on blog post (no-op)

**Fix applied:** All 9 links in nav-sub.html and all 13 links in footer.html updated to root-relative paths (`/corrugated-boxes`, `/cotton-seed-bags`, `/#fac`, `/#ind`, `/#testi`, `/#proc`). Committed and pushed.

### High
**Security headers — verify post-deploy**  
Five headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy) were added in a previous session via `next.config.mjs headers()`. Previous grade was D on securityheaders.com. Action: run a fresh scan after today's Vercel deploy.

**Cache-Control: max-age=0 on static pages**  
All static HTML pages (`/`, `/corrugated-boxes`, `/cotton-seed-bags`, `/privacy-policy`) return `Cache-Control: public, max-age=0, must-revalidate` (Vercel default). Add `s-maxage=86400, stale-while-revalidate=604800` for static routes in `next.config.mjs` to improve TTFB for international crawlers.

### Medium
**Sitemap lastmod uniform across all 9 URLs**  
All entries carry `lastmod: 2026-07-04`. Google discounts lastmod when it's not per-URL accurate. Generate lastmod from actual file modification dates.

**llms.txt CDN lag on 4th blog post**  
Live /llms.txt still shows 3 posts after today's push. Add a Vercel cache-purge step in the GitHub Actions deploy workflow to ensure it's always fresh.

**OG / Twitter Card meta tags**  
Product pages (`/corrugated-boxes`, `/cotton-seed-bags`) already have og:title, og:description, og:image, and twitter:card. Homepage and blog pages need confirmation; blog post og:image URLs should be verified as 1200×630px.

### Low
**Three.js LCP impact unverified**  
Three.js is lazy-loaded for hero particles only. Verify LCP element via PageSpeed Insights — if it's canvas-adjacent, add `fetchpriority="high"` to a static fallback.

**No hreflang for en-US / en-GB**  
Single self-referencing `hreflang="en"` would be a low-cost signal for export market targeting.

**Blog pagination threshold**  
Currently 4 posts, pagination dormant. Define strategy (12-15 per page) before post count exceeds 8.

---

## Content Quality — 74/100

### E-E-A-T Assessment

| Signal | Status | Notes |
|---|---|---|
| Experience | Moderate | Practical operational content (lead times, checklists) compensates for absent first-person credentials |
| Expertise | Moderate-High | Product pages show genuine category depth (6 box types, 12 seed varieties, specs tables) |
| Authoritativeness | Moderate | Niche positioning is clear; no third-party signals (press, trade associations, PLEXCONCIL) |
| Trustworthiness | Moderate-High | Full Privacy Policy indexed; GA4 present; LocalBusiness schema; no GST/registration number shown |

### High
**No author bio for "Jash B."**  
Four blog posts attributed to "Jash B." with no photo, credentials, or profile link. Google's Quality Rater Guidelines weight author expertise heavily for B2B export content.  
Fix: Add 60-80 word bio to each blog post (or a linked author page) — years in packaging industry, export markets served.

**Blog titles exceed display limits**  
All 4 blog titles are 80-95 chars. Google's display threshold is ~65 chars (580px). Suggested rewrites:
- Blog 1: "Sourcing Packaging from India: A Guide for US & UK Importers | Whizzpack" (73 chars)
- Blog 2: "Corrugated Boxes from India: Buyer Guide for US & UK | Whizzpack" (65 chars)
- Blog 3: "Cotton Seed Bags from India: Key Questions for US & UK Buyers | Whizzpack" (74 chars)
- Blog 4: "Eco-Friendly Packaging from India: Guide for US & UK Buyers | Whizzpack" (72 chars)

**Homepage title too long (~88 chars)**  
Current: "Corrugated Box & Cotton Seed Bag Manufacturer India | Exporter to USA & UK | Whizzpack"  
Suggested: "Corrugated Box & Seed Bag Manufacturer India | Whizzpack" (57 chars)

**No cross-linking between blog posts**  
Blog 1 (general sourcing) should be the hub and receive links from Blogs 2, 3, and 4. Add 1-2 contextual in-body links per post.

### Medium
**Blog word counts at low end**  
1,100-1,200 words is thin for competitive import/sourcing queries. Top-ranking content on similar terms runs 1,800-2,500 words. Priority: expand Blog 2 (corrugated boxes guide) and Blog 3 (cotton bags) with a specs comparison table, FAQ block, and glossary of trade terms.

**No ISO certificate number cited**  
Both product pages state "ISO certified" without citing ISO 9001:2015 or a certificate number. Add "ISO 9001:2015 Certified (Cert. No. XXXX)" to product page trust sections.

**Blog 4 keyword overlap with Blog 1**  
Both cover eco/sustainable sourcing from India. Blog 4 should own "eco-friendly packaging manufacturer India"; Blog 1 should own "sourcing packaging from India" (general intent). Differentiate first paragraph and H1 targets.

**Eco credentials not on-page**  
Blog 4 advises buyers to verify eco claims, but Whizzpack's own FSC/GOTS/recycled content details aren't documented on product pages. Add an "Eco Credentials" subsection to both product pages.

**/blogs index title missing audience signal**  
"Packaging Insights Blog | Whizzpack" → "Packaging Insights for US & UK Importers | Whizzpack" (52 chars, within limit).

### Low
**Blog meta descriptions unverified**  
If auto-populated from body copy, they may lack CTA language. All 4 should be manually written with benefit + implicit CTA.

**Product page images unverified**  
Alt text, dimensions, and WebP format on product page images were not confirmed. Audit and ensure alt text follows: `[product type] [manufacturer/exporter] [city] [country]`.

**OG type on product pages**  
Both set to `og:type: website`. Consider `og:type: product` for richer social previews.

---

## On-Page SEO — 71/100

### What Works
- Keyword-first title tags on product pages follow a consistent, branded pattern
- Meta descriptions on product pages and homepage are well-optimised (specific, include MOQ, CTA)
- H1 tags target primary keywords on all pages
- Breadcrumbs on product pages (`Home › Product Name`)
- Internal links from blog posts to product pages present on all 4 posts
- "Related reading" sections exist on product pages

### Gaps
- Title lengths (see Content section above)
- No cross-links between blog posts
- Product pages do not link to related blog posts (two-way linking gap)
- No FAQ blocks on product pages or blog posts

---

## Schema / Structured Data — 78/100

### Current Implementation
| Page | Schema Present |
|---|---|
| / (homepage) | LocalBusiness ✅ |
| /corrugated-boxes | Product + BreadcrumbList ✅ |
| /cotton-seed-bags | Product + BreadcrumbList ✅ |
| /blogs/[slug] | BlogPosting (all 4 posts) ✅ |
| /blogs (index) | None ❌ |
| /privacy-policy | None (appropriate) |

### High
**Add FAQPage schema to both product pages**  
FAQPage is the highest-probability trigger for an AI Overview on B2B import queries like "how to import corrugated boxes from India" or "MOQ for cotton seed bags". Both product pages have enough Q&A-style content to support 5 questions each. Use JSON-LD.

### Medium
**Add ItemList schema to /blogs index**  
One `ListItem` per blog post helps both Google's indexing and AI crawlers that parse structured summaries.

**Extend Product schema with Offer**  
Add `Offer` block referencing MOQ (5,000 units), currency, and `ShippingDetails` with destination countries (US, GB). Currently missing.

**Add `areaServed` and `knowsAbout` to LocalBusiness**  
Reinforce international targeting in the entity graph: `areaServed: ["US", "GB"]`, `knowsAbout: ["corrugated packaging", "cotton seed bags", "B2B export"]`.

### Low
**`/privacy-policy` in sitemap**  
Policy pages carry no ranking value. Remove from sitemap or add `noindex` to the page.

---

## AI Search Readiness (GEO) — 82/100

### What Works
- llms.txt present and comprehensive ✅
- All major AI crawlers permitted in robots.txt (GPTBot, ClaudeBot, PerplexityBot, ChatGPT-User) ✅
- Blocking data-scraping crawlers (Bytespider, CCBot, Google-Extended) ✅
- Blog content contains specific, citable data: lead times (25-35 days US, 18-22 days UK), MOQ (5,000 units), 4 certifications ✅
- Named author attribution on all posts ✅
- Original, practical buyer-focused content ✅

### High
**FAQ schema absent (cross-listed with Schema)**  
AI Overviews preferentially pull from FAQPage entities. Both product pages are the prime targets.

**llms.txt CDN lag on 4th blog post**  
Add cache-purge to deployment workflow.

### Medium
**Structured data for citable data points**  
Lead times, MOQ, and certifications exist in prose. Marking them with `QuantitativeValue`, `OfferShippingDetails`, and `hasCredential` makes them authoritative facts for AI citation extraction.

### Low
**No llms-full.txt**  
A richer machine-readable context file at `/llms-full.txt` with full product spec tables and certification details would increase Perplexity/Claude citation confidence.

---

## Sitemap Quality — 85/100

- Location: /sitemap.xml ✅
- Referenced in robots.txt ✅
- Valid XML, correct content-type ✅
- All 9 live URLs included ✅ (/, /corrugated-boxes, /cotton-seed-bags, /privacy-policy, /blogs, 4 blog posts)

**Medium:** All 9 URLs carry `lastmod: 2026-07-04` (today). Accurate, per-URL lastmod is needed for Google to use it for crawl scheduling.

**Medium:** No `changefreq` or `priority` attributes. Bing respects these. Suggested: `priority 1.0` homepage, `0.8` product pages, `0.6` blog posts.

**Low:** `/privacy-policy` in sitemap adds noise with no ranking benefit. Remove.

---

## Search Experience (SXO) — 69/100

### Intent Alignment
| Page | Intent | Status |
|---|---|---|
| / | Commercial (B2B lead-gen) | ✅ Enquiry form, dual product nav |
| /corrugated-boxes | Commercial (product specs + quote) | ✅ Specs table, sample request |
| /cotton-seed-bags | Commercial (product specs + quote) | ✅ Same pattern |
| /blogs/* | Informational (buyer guides) | ✅ In-post CTAs link to product pages |
| /privacy-policy | Trust/utility | ✅ |

### Critical — FIXED
**Broken nav + footer on all blog post pages** — resolved in this session. Blog → Product → Quote funnel is now intact.

### High
**Blog → Product linking was dependent on in-post CTAs alone**  
With nav/footer now fixed, the full three-path funnel is restored. Monitor in GSC for 404 resolution.

### Low
**Pagination threshold**  
9 per page is slightly low; 12-15 is more appropriate for this content cadence. Revisit at 8+ posts.

---

## Action Plan

### Phase 1: Critical (Week 1) — some already done this session
| # | Action | File(s) | Status |
|---|---|---|---|
| 1 | Fix nav-sub.html + footer.html relative URLs | page-content/nav-sub.html, footer.html | ✅ DONE |
| 2 | Verify security headers grade post-deploy | securityheaders.com rescan | Pending |
| 3 | Add author bio to all 4 blog posts | content/blog/*.md | Pending |
| 4 | Shorten blog title tags (all 4) | content/blog/*.md | Pending |
| 5 | Shorten homepage title tag | public/index.html | Pending |

### Phase 2: High Impact (Weeks 2-3)
| # | Action | File(s) |
|---|---|---|
| 6 | Add FAQPage JSON-LD to /corrugated-boxes and /cotton-seed-bags | public/corrugated-boxes.html, cotton-seed-bags.html |
| 7 | Add ItemList JSON-LD to /blogs index | pages/blogs/index.jsx |
| 8 | Add cross-links between blog posts (hub-spoke) | content/blog/*.md |
| 9 | Extend Product schema with Offer + ShippingDetails | product page HTML files |
| 10 | Add `areaServed` / `knowsAbout` to LocalBusiness schema | public/index.html |
| 11 | Add edge cache headers for static routes | next.config.mjs |

### Phase 3: Content & Authority (Month 2)
| # | Action |
|---|---|
| 12 | Expand Blog 2 (corrugated boxes) and Blog 3 (cotton bags) to 1,800+ words with FAQ blocks and spec tables |
| 13 | Add eco credentials subsection to both product pages |
| 14 | Add ISO certificate number to product pages |
| 15 | Create llms-full.txt with product spec tables |
| 16 | Fix sitemap lastmod to per-URL timestamps |
| 17 | Submit eco-friendly packaging blog to GSC URL Inspection for faster indexing |

### Phase 4: Monitoring & Iteration (Ongoing)
| # | Action |
|---|---|
| 18 | Monthly blog post (next due August 2026) |
| 19 | Rerun securityheaders.com after each next.config.mjs change |
| 20 | Monitor /blogs/corrugated-boxes and /blogs/cotton-seed-bags 404s clearing in GSC (should clear within 2-4 weeks of today's fix) |
| 21 | Track AI Overview appearances for FAQ-targeted queries once FAQ schema is deployed |

---

## Appendix: Pages Audited

| URL | Type | Canonical | Schema | Title Length |
|---|---|---|---|---|
| / | Homepage | ✅ | LocalBusiness | 88 chars ⚠️ |
| /corrugated-boxes | Product | ✅ | Product + Breadcrumb | 67 chars ⚠️ |
| /cotton-seed-bags | Product | ✅ | Product + Breadcrumb | 70 chars ⚠️ |
| /privacy-policy | Utility | ✅ | None (OK) | 27 chars ✅ |
| /blogs | Blog index | ✅ | None | 36 chars ✅ |
| /blogs/why-import-packaging-from-india | Blog post | ✅ | BlogPosting | 88 chars ⚠️ |
| /blogs/how-to-import-corrugated-boxes-from-india | Blog post | ✅ | BlogPosting | 80 chars ⚠️ |
| /blogs/cotton-seed-bags-sourcing-guide-usa-uk | Blog post | ✅ | BlogPosting | 95 chars ⚠️ |
| /blogs/eco-friendly-packaging-from-india | Blog post | ✅ | BlogPosting | 83 chars ⚠️ |

---

*Report generated: 4 July 2026. Next audit recommended: October 2026 or after major content changes.*
