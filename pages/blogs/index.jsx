import Layout from '../../components/Layout';
import { getAllPosts } from '../../lib/posts';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { useRouter } from 'next/router';

const POSTS_PER_PAGE = 9;

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

export default function BlogIndex({ posts, navHtml, footerHtml, totalPages, currentPage }) {
  const router = useRouter();

  function goToPage(page) {
    router.push(page === 1 ? '/blogs' : `/blogs?page=${page}`);
  }

  const itemListSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Packaging Insights Blog",
    "description": "Expert guides for US and UK importers sourcing packaging from India.",
    "url": "https://www.whizzpack.in/blogs",
    "itemListElement": posts.map((post, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "url": `https://www.whizzpack.in/blogs/${post.slug}`,
      "name": post.title
    }))
  });

  return (
    <Layout
      title={currentPage > 1 ? `Packaging Insights for US & UK Importers — Page ${currentPage} | Whizzpack` : "Packaging Insights for US & UK Importers | Whizzpack"}
      description="Expert guides on importing corrugated boxes and cotton seed bags from India. Resources for US and UK buyers sourcing bulk packaging."
      canonical={currentPage > 1 ? `https://www.whizzpack.in/blogs?page=${currentPage}` : "https://www.whizzpack.in/blogs"}
      ogImage="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&auto=format&fit=crop&q=80"
      schema={itemListSchema}
      navHtml={navHtml}
      footerHtml={footerHtml}
    >
      {/* Hero */}
      <div className="blog-hero">
        <div className="blog-hero-inner">
          <h1>Packaging Insights</h1>
          <p>Expert guides for US &amp; UK importers sourcing packaging from India</p>
        </div>
      </div>

      {/* Card Grid */}
      <div className="blog-grid-wrap">
        <div className="blog-grid">
          {posts.length === 0 && (
            <div className="blog-empty">
              <h2>Coming Soon</h2>
              <p>Our first articles are on their way.</p>
            </div>
          )}
          {posts.map(post => (
            <Link href={`/blogs/${post.slug}`} key={post.slug} className="blog-card">
              <div className="blog-card-accent" />
              <div className="blog-card-body">
                <span className="blog-card-tag">Article</span>
                <h2>{post.title}</h2>
                <p>{post.excerpt}</p>
                <div className="blog-card-meta">
                  {post.author && <span>{post.author}</span>}
                  {post.date && <span>{formatDate(post.date)}</span>}
                </div>
                <span className="blog-card-cta">Read More &#8594;</span>
              </div>
            </Link>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="blog-pagination">
            <button
              className="blog-pg-btn"
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              &#8592; Previous
            </button>
            <span className="blog-pg-info">Page {currentPage} of {totalPages}</span>
            <button
              className="blog-pg-btn"
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next &#8594;
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const allPosts = getAllPosts();
  const currentPage = Math.max(1, parseInt(query.page) || 1);
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));
  const safePage = Math.min(currentPage, totalPages);
  const start = (safePage - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  const navHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/nav-sub.html'), 'utf8');
  const footerHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/footer.html'), 'utf8');
  return { props: { posts, navHtml, footerHtml, totalPages, currentPage: safePage } };
}
