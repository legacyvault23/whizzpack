import Layout from '../../components/Layout';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { getAllPosts } from '../../lib/posts';

const AUTHOR_POSTS = [
  'why-import-packaging-from-india',
  'how-to-import-corrugated-boxes-from-india',
  'cotton-seed-bags-sourcing-guide-usa-uk',
  'eco-friendly-packaging-from-india',
  'pizza-boxes-from-india-sourcing-guide',
  'single-wall-vs-double-wall-corrugated-boxes',
  'custom-printed-boxes-with-logo-buyers-guide',
  'cardboard-shipping-boxes-bulk-guide',
  'drawstring-cotton-seed-bags-guide',
  'sourcing-cotton-seed-bags-from-india',
  'bulk-cotton-seed-bags-commercial-farms',
  'custom-printed-cotton-seed-bags-retail-brands',
  'heavy-duty-corrugated-boxes-export-shipping',
  'jute-vs-cotton-seed-bags-comparison',
  'corrugated-box-sizes-grades-buyers-guide',
  'cotton-seed-bags-organic-farming-guide',
  'india-packaging-lead-times-shipping-guide',
];

const EXPERTISE = [
  'Corrugated box manufacturing and export',
  'Cotton and jute textile packaging',
  'B2B export documentation and Incoterms',
  'GOTS and OEKO-TEX textile certifications',
  'Custom printed packaging for retail brands',
  'Sea freight logistics: India to USA and UK',
];

export default function JashBAuthorPage({ navHtml, footerHtml, posts }) {
  const canonical = 'https://www.whizzpack.in/authors/jash-b';

  const schema = JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.whizzpack.in/" },
        { "@type": "ListItem", "position": 2, "name": "Authors", "item": "https://www.whizzpack.in/authors" },
        { "@type": "ListItem", "position": 3, "name": "Jash B.", "item": canonical },
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Jash B.",
      "url": canonical,
      "jobTitle": "Head of Operations and Export",
      "worksFor": {
        "@type": "Organization",
        "name": "Whizzpack Packing Solutions",
        "url": "https://www.whizzpack.in",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Rajkot",
          "addressRegion": "Gujarat",
          "addressCountry": "IN"
        }
      },
      "description": "Jash B. has over a decade of experience in packaging manufacturing and export from India. He oversees production, quality assurance, and client operations at Whizzpack, supplying corrugated boxes and cotton seed bags to importers in the USA, UK, and worldwide.",
      "knowsAbout": [
        "Corrugated box manufacturing",
        "Cotton seed bag production",
        "Packaging export from India",
        "B2B export documentation",
        "GOTS certification",
        "OEKO-TEX Standard 100",
        "Custom printed packaging"
      ],
      "sameAs": [
        "https://www.linkedin.com/company/whizzpack/",
        "https://www.whizzpack.in"
      ],
      "author": posts.map(p => ({
        "@type": "Article",
        "name": p.title,
        "url": `https://www.whizzpack.in/blogs/${p.slug}`
      }))
    }
  ]);

  return (
    <Layout
      title="Jash B. - Packaging Export Specialist | Author at Whizzpack"
      description="Jash B. oversees production and export operations at Whizzpack, Rajkot. Over a decade of experience in corrugated box and cotton seed bag manufacturing for the US and UK markets."
      canonical={canonical}
      ogType="profile"
      ogImage="https://www.whizzpack.in/Whizzpack-logo-header.png"
      schema={schema}
      navHtml={navHtml}
      footerHtml={footerHtml}
    >
      <style>{`
        .author-hero{background:linear-gradient(135deg,#0F1F4B 0%,#1a3268 100%);padding:80px 0 60px;position:relative;overflow:hidden}
        .author-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 70% 40%,rgba(26,107,58,.15),transparent 60%)}
        .author-hero .wrap{max-width:960px;margin:0 auto;padding:0 24px;position:relative;display:flex;gap:40px;align-items:center}
        @media(max-width:640px){.author-hero .wrap{flex-direction:column;text-align:center}}
        .author-avatar{width:120px;height:120px;border-radius:50%;background:linear-gradient(135deg,#1A6B3A,#4ade80);display:flex;align-items:center;justify-content:center;font-size:3rem;flex-shrink:0;color:#fff;font-weight:900;box-shadow:0 8px 30px rgba(0,0,0,.25)}
        .author-hero-text h1{font-size:clamp(1.6rem,3.5vw,2.2rem);font-weight:900;color:#fff;margin:0 0 8px}
        .author-hero-text .title{font-size:.95rem;color:#4ade80;font-weight:600;margin-bottom:12px}
        .author-hero-text p{color:rgba(255,255,255,.75);font-size:.97rem;line-height:1.7;max-width:620px;margin:0}
        .author-breadcrumb{font-size:.78rem;color:rgba(255,255,255,.5);margin-bottom:18px;display:flex;gap:6px;align-items:center;flex-wrap:wrap}
        .author-breadcrumb a{color:rgba(255,255,255,.5);text-decoration:none}.author-breadcrumb a:hover{color:#4ade80}
        .author-breadcrumb span{color:rgba(255,255,255,.3)}

        .author-body{max-width:960px;margin:0 auto;padding:0 24px}
        .author-section{padding:56px 0}
        .author-section h2{font-size:1.25rem;font-weight:800;color:#0F1F4B;margin:0 0 24px;padding-bottom:12px;border-bottom:2px solid #e8ecf0}
        .author-tag{display:inline-block;font-size:.7rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:#1A6B3A;background:rgba(26,107,58,.1);border:1px solid rgba(26,107,58,.25);padding:4px 12px;border-radius:100px;margin-bottom:14px}

        .expertise-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
        @media(max-width:580px){.expertise-grid{grid-template-columns:1fr}}
        .expertise-item{display:flex;align-items:center;gap:10px;background:#f7f8fb;border:1px solid #e8ecf0;border-radius:8px;padding:12px 16px;font-size:.9rem;color:#0F1F4B;font-weight:600}
        .expertise-dot{width:8px;height:8px;border-radius:50%;background:#1A6B3A;flex-shrink:0}

        .posts-grid{display:grid;grid-template-columns:1fr 1fr;gap:16px}
        @media(max-width:620px){.posts-grid{grid-template-columns:1fr}}
        .post-card{background:#fff;border:1px solid #e8ecf0;border-radius:12px;padding:20px 20px 16px;text-decoration:none;display:block;transition:box-shadow .2s,transform .2s}
        .post-card:hover{box-shadow:0 8px 24px rgba(15,31,75,.1);transform:translateY(-2px)}
        .post-card-date{font-size:.75rem;color:#999;margin-bottom:8px}
        .post-card-title{font-size:.95rem;font-weight:700;color:#0F1F4B;line-height:1.35;margin:0 0 8px}
        .post-card-excerpt{font-size:.82rem;color:#666;line-height:1.6;margin:0}
        .post-card-tag{font-size:.7rem;font-weight:700;color:#1A6B3A;margin-top:10px;display:block}

        .author-cta{background:linear-gradient(135deg,#0a2d1a,#1A6B3A);border-radius:16px;padding:40px 36px;color:#fff;text-align:center;margin:0 0 56px}
        .author-cta h2{font-size:1.5rem;font-weight:800;margin:0 0 10px}
        .author-cta p{color:rgba(255,255,255,.8);margin:0 0 24px;font-size:.95rem}
        .author-cta-btn{display:inline-flex;align-items:center;gap:8px;background:#fff;color:#1A6B3A;padding:13px 28px;border-radius:10px;font-weight:700;font-size:.95rem;text-decoration:none;box-shadow:0 6px 20px rgba(0,0,0,.15)}
        .author-cta-btn:hover{background:#f0faf4}

        .about-text p{font-size:.97rem;color:#444;line-height:1.8;margin-bottom:16px}
      `}</style>

      {/* Hero */}
      <section className="author-hero">
        <div className="wrap">
          <div>
            <nav className="author-breadcrumb" aria-label="Breadcrumb">
              <Link href="/">Home</Link><span>/</span>
              <Link href="/blogs">Blog</Link><span>/</span>
              <span style={{color:'rgba(255,255,255,.8)'}}>Jash B.</span>
            </nav>
            <div className="author-avatar">J</div>
          </div>
          <div className="author-hero-text">
            <h1>Jash B.</h1>
            <div className="title">Head of Operations and Export - Whizzpack, Rajkot, India</div>
            <p>Over a decade of experience in packaging manufacturing and export. Specialises in corrugated boxes and cotton seed bags for B2B importers in the USA and UK.</p>
          </div>
        </div>
      </section>

      <div className="author-body">

        {/* About */}
        <section className="author-section">
          <div className="author-tag">About</div>
          <h2>About Jash B.</h2>
          <div className="about-text">
            <p>
              Jash B. leads operations and export at Whizzpack Packing Solutions, a factory-direct packaging manufacturer based in the GIDC Industrial Estate, Rajkot, Gujarat, India. He has spent over a decade working at the intersection of packaging manufacturing, quality control, and international trade - helping importers in the USA, UK, and Europe source corrugated boxes and cotton seed bags directly from Indian factories at competitive FOB pricing.
            </p>
            <p>
              His day-to-day work spans production planning for corrugated box orders (RSC, double-wall, and custom die-cut), quality assurance on cotton fabric and print runs, export documentation (commercial invoice, packing list, certificate of origin, HS code classification), and client communication with purchasing teams at international brands and distributors.
            </p>
            <p>
              Jash writes for the Whizzpack blog to share practical knowledge that helps overseas buyers make informed sourcing decisions - covering topics from flute type selection and burst factor ratings to GOTS certification, OEKO-TEX compliance, and navigating sea freight logistics from India's west coast ports.
            </p>
          </div>
        </section>

        {/* Expertise */}
        <section className="author-section" style={{paddingTop:0}}>
          <div className="author-tag">Specialisation</div>
          <h2>Areas of Expertise</h2>
          <div className="expertise-grid">
            {EXPERTISE.map((e, i) => (
              <div className="expertise-item" key={i}>
                <div className="expertise-dot" />
                <span>{e}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Articles */}
        <section className="author-section" style={{paddingTop:0}}>
          <div className="author-tag">Published Work</div>
          <h2>Articles by Jash B.</h2>
          <div className="posts-grid">
            {posts.map(post => (
              <Link href={`/blogs/${post.slug}`} className="post-card" key={post.slug}>
                <div className="post-card-date">{post.date}</div>
                <div className="post-card-title">{post.title}</div>
                {post.excerpt && <div className="post-card-excerpt">{post.excerpt.slice(0, 100)}...</div>}
                {post.tags && post.tags[0] && <span className="post-card-tag">{post.tags[0]}</span>}
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="author-cta">
          <h2>Source Packaging Factory-Direct from India</h2>
          <p>Get in touch with our team to discuss your corrugated box or cotton seed bag requirements.</p>
          <a href="/#contact" className="author-cta-btn">Contact Whizzpack</a>
        </div>

      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const navHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/nav-sub.html'), 'utf8');
  const footerHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/footer.html'), 'utf8');

  const allPosts = getAllPosts();
  const posts = allPosts
    .filter(p => AUTHOR_POSTS.includes(p.slug))
    .map(p => ({
      slug: p.slug,
      title: p.title,
      date: p.date,
      excerpt: p.excerpt || '',
      tags: p.tags || [],
    }));

  return { props: { navHtml, footerHtml, posts } };
}
