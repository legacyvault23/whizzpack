import Layout from '../../components/Layout';
import { getPost, getAllPosts } from '../../lib/posts';
import { marked } from 'marked';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useState } from 'react';

function NewsletterStrip() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/wp-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'newsletter', name, email, source: 'blog-footer-strip' }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  return (
    <div style={{
      background: 'linear-gradient(135deg, #0F1F4B 0%, #1a2f6e 100%)',
      borderRadius: '14px',
      padding: '36px 32px',
      margin: '40px 0',
      color: '#fff',
    }}>
      {status === 'success' ? (
        <div style={{ textAlign: 'center', padding: '8px 0' }}>
          <div style={{ fontSize: '2rem', marginBottom: '10px' }}>&#10003;</div>
          <p style={{ fontWeight: 700, fontSize: '1.1rem', margin: '0 0 6px', color: '#fff' }}>You are on the list.</p>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '.9rem', margin: 0 }}>We will send you practical packaging sourcing tips - no spam, unsubscribe any time.</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '22px' }}>
            <p style={{ fontSize: '.78rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: '#F05A28', margin: '0 0 8px' }}>Packaging Sourcing Tips</p>
            <h3 style={{ margin: '0 0 8px', fontSize: '1.3rem', fontWeight: 800, color: '#fff', lineHeight: 1.3 }}>Get monthly tips sent to your inbox</h3>
            <p style={{ margin: 0, fontSize: '.9rem', color: 'rgba(255,255,255,.65)', lineHeight: 1.6 }}>Board grades, MOQ guidance, certification decisions - practical sourcing advice for UK and US importers, once a month.</p>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', alignItems: 'flex-end' }}>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={e => setName(e.target.value)}
              style={{ flex: '1 1 140px', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,.22)', background: 'rgba(255,255,255,.09)', color: '#fff', fontSize: '.9rem', outline: 'none' }}
            />
            <input
              type="email"
              placeholder="Work email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ flex: '2 1 200px', padding: '11px 14px', borderRadius: '8px', border: '1.5px solid rgba(255,255,255,.22)', background: 'rgba(255,255,255,.09)', color: '#fff', fontSize: '.9rem', outline: 'none' }}
            />
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{ padding: '11px 24px', background: '#F05A28', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 700, fontSize: '.92rem', cursor: 'pointer', whiteSpace: 'nowrap', opacity: status === 'loading' ? .7 : 1 }}
            >
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
          {status === 'error' && <p style={{ margin: '10px 0 0', fontSize: '.83rem', color: '#fca5a5' }}>Something went wrong. Email us at contact@whizzpack.in to subscribe.</p>}
        </>
      )}
    </div>
  );
}

// Custom renderer: add width/height to images to prevent CLS
marked.use({
  renderer: {
    image(href, title, text) {
      const alt = text || '';
      const titleAttr = title ? ` title="${title}"` : '';
      const base = href.split('?')[0];
      let srcset = '', sizes = '';
      if (base.includes('images.unsplash.com')) {
        srcset = `${base}?w=400&q=75 400w, ${base}?w=700&q=80 700w, ${base}?w=900&q=80 900w`;
        sizes = '(max-width: 600px) 400px, (max-width: 900px) 700px, 900px';
      } else if (base.includes('images.pexels.com')) {
        srcset = `${base}?auto=compress&cs=tinysrgb&w=400 400w, ${base}?auto=compress&cs=tinysrgb&w=700 700w, ${base}?auto=compress&cs=tinysrgb&w=900 900w`;
        sizes = '(max-width: 600px) 400px, (max-width: 900px) 700px, 900px';
      }
      const srcsetAttr = srcset ? ` srcset="${srcset}" sizes="${sizes}"` : '';
      return `<img src="${href}" alt="${alt}"${titleAttr}${srcsetAttr} width="900" height="600" loading="lazy" style="max-width:100%;height:auto;border-radius:8px">`;
    }
  }
});

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function extractFirstImage(html) {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1].split('?')[0] + '?w=1200&auto=format&fit=crop&q=80' : null;
}

export default function BlogPost({ frontmatter, contentHtml, navHtml, footerHtml, slug, relatedPosts }) {
  const ogImage = frontmatter.ogImage || extractFirstImage(contentHtml) || 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&auto=format&fit=crop&q=80';
  const schema = JSON.stringify([
    {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.whizzpack.in/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.whizzpack.in/blogs" },
      { "@type": "ListItem", "position": 3, "name": frontmatter.title, "item": `https://www.whizzpack.in/blogs/${slug}` }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": frontmatter.title,
    "description": frontmatter.excerpt,
    "datePublished": frontmatter.date,
    "dateModified": frontmatter.date,
    "image": { "@type": "ImageObject", "url": ogImage, "width": 1200, "height": 630 },
    "author": {
      "@type": "Person",
      "name": frontmatter.author || "Whizzpack Editorial Team",
      "url": frontmatter.author === "Jash B." ? "https://www.whizzpack.in/authors/jash-b" : "https://www.whizzpack.in/about",
      "sameAs": frontmatter.author === "Jash B." ? ["https://www.whizzpack.in/authors/jash-b", "https://www.linkedin.com/company/whizzpack/"] : [],
      "description": frontmatter.authorBio || "Packaging export specialist at Whizzpack, a Rajkot-based manufacturer of corrugated boxes and Cotton Bags for Seeds.",
      "worksFor": { "@type": "Organization", "name": "Whizzpack", "url": "https://www.whizzpack.in" }
    },
    "publisher": {
      "@type": "Organization",
      "name": "Whizzpack",
      "url": "https://www.whizzpack.in",
      "logo": { "@type": "ImageObject", "url": "https://www.whizzpack.in/favicon.png", "width": 512, "height": 512 },
      "sameAs": [
        "https://www.linkedin.com/company/whizzpack/",
        "https://www.instagram.com/whizz_pack/",
        "https://www.facebook.com/profile.php?id=61591832156946"
      ]
    },
    "keywords": (frontmatter.tags || []).join(', '),
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.whizzpack.in/blogs/${slug}` },
    "about": { "@type": "Thing", "name": "Packaging export from India" },
    "inLanguage": "en-US"
  }
  ]);

  const tags = frontmatter.tags || [];

  return (
    <Layout
      title={`${frontmatter.title} | Whizzpack`}
      description={frontmatter.excerpt}
      canonical={`https://www.whizzpack.in/blogs/${slug}`}
      ogType="article"
      schema={schema}
      ogImage={ogImage}
      navHtml={navHtml}
      footerHtml={footerHtml}
    >
      <div className="blog-post-wrap">
        {/* Post hero */}
        <div className="blog-post-hero">
          <div className="blog-post-hero-inner">
            <Link href="/blogs" className="blog-back">← All Posts</Link>
            <h1>{frontmatter.title}</h1>
            <div className="blog-post-meta">
              {frontmatter.author && (
                <span className="blog-post-author">By{' '}
                  {frontmatter.author === 'Jash B.' ? (
                    <Link href="/authors/jash-b" style={{color:'inherit',textDecoration:'underline'}}>{frontmatter.author}</Link>
                  ) : frontmatter.author}
                </span>
              )}
              {frontmatter.date && (
                <span className="blog-post-date">{formatDate(frontmatter.date)}</span>
              )}
            </div>
            {tags.length > 0 && (
              <div className="blog-post-tags">
                {tags.map(tag => (
                  <span key={tag} className="blog-tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Article body */}
        <div className="blog-article-wrap">
          <article
            className="blog-article"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
          {frontmatter.authorBio && (
            <div className="blog-author-box">
              <div className="blog-author-icon" aria-hidden="true">&#9997;</div>
              <div>
                <p className="blog-author-name">About the author: {frontmatter.author}</p>
                <p className="blog-author-bio">{frontmatter.authorBio}</p>
              </div>
            </div>
          )}
          <NewsletterStrip />
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="blog-related">
              <div className="blog-related-header">
                <h2 className="blog-related-title">Related Articles</h2>
                <span className="blog-related-accent"></span>
              </div>
              <div className="blog-related-grid">
                {relatedPosts.map(post => (
                  <Link key={post.slug} href={`/blogs/${post.slug}`} className="blog-related-card">
                    <p className="blog-related-card-title">{post.title}</p>
                    {post.excerpt && <p className="blog-related-card-excerpt">{post.excerpt}</p>}
                    <span className="blog-related-card-cta">Read article →</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { slug } = params;
    const { frontmatter, content } = getPost(slug);
    let contentHtml = marked(content);
    contentHtml = contentHtml.replace(' loading="lazy"', ' fetchpriority="high"');
    contentHtml = contentHtml.replace(/^\s*<h1[^>]*>[\s\S]*?<\/h1>\n*/, '');
    contentHtml = contentHtml.replace(/<table>/g, '<div class="blog-table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
    const navHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/nav-sub.html'), 'utf8');
    const footerHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/footer.html'), 'utf8');
    const allPosts = getAllPosts();
    const currentTags = frontmatter.tags || [];
    const relatedPosts = allPosts
      .filter(p => p.slug !== slug && (p.tags || []).some(t => currentTags.includes(t)))
      .slice(0, 3)
      .map(p => ({ slug: p.slug, title: p.title, excerpt: p.excerpt || '', date: p.date || '' }));
    return { props: { frontmatter, contentHtml, navHtml, footerHtml, slug, relatedPosts } };
  } catch (e) {
    return { notFound: true };
  }
}
