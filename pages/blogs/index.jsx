import Layout from '../../components/Layout';
import { getAllPosts } from '../../lib/posts';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useState, useMemo } from 'react';

const POSTS_PER_PAGE = 9;

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogIndex({ allPosts, navHtml, footerHtml }) {
  const [activeTag, setActiveTag] = useState(null);
  const [page, setPage] = useState(1);

  const allTags = useMemo(() => {
    const counts = {};
    allPosts.forEach(p => (p.tags || []).forEach(t => { counts[t] = (counts[t] || 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([t, c]) => ({ tag: t, count: c }));
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    if (!activeTag) return allPosts;
    return allPosts.filter(p => (p.tags || []).includes(activeTag));
  }, [allPosts, activeTag]);

  const showPagination = !activeTag;
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE));
  const displayedPosts = showPagination
    ? filteredPosts.slice((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE)
    : filteredPosts;

  function handleTagClick(tag) {
    if (activeTag === tag) {
      setActiveTag(null);
      setPage(1);
    } else {
      setActiveTag(tag);
      setPage(1);
    }
  }

  const schema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Packaging Insights Blog',
    description: 'Expert guides for US and UK importers sourcing packaging from India.',
    url: 'https://www.whizzpack.in/blogs',
    itemListElement: allPosts.map((post, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `https://www.whizzpack.in/blogs/${post.slug}`,
      name: post.title,
    })),
  });

  return (
    <Layout
      title="Packaging Insights for US & UK Importers | Whizzpack"
      description="Expert guides on importing corrugated boxes and Cotton Bags for Seeds from India. Resources for US and UK buyers sourcing bulk packaging."
      canonical="https://www.whizzpack.in/blogs"
      ogImage="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&auto=format&fit=crop&q=80"
      ogType="website"
      schema={schema}
      navHtml={navHtml}
      footerHtml={footerHtml}
    >
      <style>{`
        .bi-tag-bar{padding:20px 0;background:#f7f8fb;border-bottom:1px solid #e4e9f0}
        .bi-tag-bar-inner{max-width:1100px;margin:0 auto;padding:0 24px;display:flex;flex-wrap:wrap;gap:8px;align-items:center}
        .bi-tag-label{font-size:.75rem;font-weight:700;color:#999;text-transform:uppercase;letter-spacing:.1em;margin-right:4px;white-space:nowrap}
        .bi-tag-chip{display:inline-flex;align-items:center;gap:4px;padding:6px 14px;border-radius:100px;border:1.5px solid #e4e9f0;font-size:.78rem;font-weight:600;color:#555;background:#fff;cursor:pointer;transition:border-color .15s,color .15s,background .15s;white-space:nowrap;line-height:1}
        .bi-tag-chip:hover{border-color:#F05A28;color:#F05A28}
        .bi-tag-chip.active{background:#F05A28;border-color:#F05A28;color:#fff}
        .bi-tag-cnt{font-size:.68rem;opacity:.65}
        .bi-clear-btn{font-size:.78rem;color:#F05A28;background:none;border:none;cursor:pointer;padding:6px 4px;font-weight:600;text-decoration:underline;white-space:nowrap}
        .bi-results-row{max-width:1100px;margin:12px auto 0;padding:0 24px;font-size:.85rem;color:#888}
        .bi-results-row strong{color:#0F1F4B}
        .blog-card-tags{display:flex;flex-wrap:wrap;gap:5px;margin:8px 0 4px}
        .blog-card-tag-chip{font-size:.68rem;padding:3px 9px;border-radius:100px;background:rgba(240,90,40,.07);color:#c04010;font-weight:600;border:1px solid rgba(240,90,40,.18)}
      `}</style>

      {/* Hero */}
      <div className="blog-hero">
        <div className="blog-hero-inner">
          <h1>Packaging Insights</h1>
          <p>Expert guides for US &amp; UK importers sourcing packaging from India</p>
        </div>
      </div>

      {/* Tag Filter Bar */}
      <div className="bi-tag-bar">
        <div className="bi-tag-bar-inner">
          <span className="bi-tag-label">Filter:</span>
          {allTags.slice(0, 18).map(({ tag, count }) => (
            <button
              key={tag}
              className={`bi-tag-chip${activeTag === tag ? ' active' : ''}`}
              onClick={() => handleTagClick(tag)}
            >
              {tag} <span className="bi-tag-cnt">({count})</span>
            </button>
          ))}
          {activeTag && (
            <button className="bi-clear-btn" onClick={() => { setActiveTag(null); setPage(1); }}>
              Clear filter
            </button>
          )}
        </div>
      </div>

      {activeTag && (
        <div className="bi-results-row">
          <strong>{filteredPosts.length}</strong> article{filteredPosts.length !== 1 ? 's' : ''} tagged &ldquo;{activeTag}&rdquo;
        </div>
      )}

      {/* Card Grid */}
      <div className="blog-grid-wrap">
        <div className="blog-grid">
          {displayedPosts.length === 0 && (
            <div className="blog-empty">
              <h2>No articles found</h2>
              <p>Try a different topic filter.</p>
            </div>
          )}
          {displayedPosts.map(post => (
            <Link href={`/blogs/${post.slug}`} key={post.slug} className="blog-card">
              <div className="blog-card-accent" />
              <div className="blog-card-body">
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                {post.tags && post.tags.length > 0 && (
                  <div className="blog-card-tags">
                    {post.tags.slice(0, 3).map(t => (
                      <span key={t} className="blog-card-tag-chip">{t}</span>
                    ))}
                  </div>
                )}
                <div className="blog-card-meta">
                  {post.author && <span>{post.author}</span>}
                  {post.date && <span>{formatDate(post.date)}</span>}
                </div>
                <span className="blog-card-cta">Read More &#8594;</span>
              </div>
            </Link>
          ))}
        </div>

        {showPagination && totalPages > 1 && (
          <div className="blog-pagination">
            <button
              className="blog-pg-btn"
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              &#8592; Previous
            </button>
            <span className="blog-pg-info">Page {page} of {totalPages}</span>
            <button
              className="blog-pg-btn"
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
            >
              Next &#8594;
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const allPosts = getAllPosts();
  const navHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/nav-sub.html'), 'utf8');
  const footerHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/footer.html'), 'utf8');
  return { props: { allPosts, navHtml, footerHtml } };
}
