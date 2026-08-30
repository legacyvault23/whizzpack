// Clean pagination URLs: /blogs/page/2, /blogs/page/3, etc.
// Renders the same component as the blog index, with proper canonical for each page.
import Layout from '../../../components/Layout';
import { getAllPosts } from '../../../lib/posts';
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

export default function BlogPage({ posts, navHtml, footerHtml, totalPages, currentPage }) {
  const router = useRouter();

  function goToPage(page) {
    if (page === 1) router.push('/blogs');
    else router.push(`/blogs/page/${page}`);
  }

  const itemListSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `Packaging Insights Blog - Page ${currentPage}`,
    "description": "Expert guides for US and UK importers sourcing packaging from India.",
    "url": `https://www.whizzpack.in/blogs/page/${currentPage}`,
    "itemListElement": posts.map((post, idx) => ({
      "@type": "ListItem",
      "position": (currentPage - 1) * POSTS_PER_PAGE + idx + 1,
      "url": `https://www.whizzpack.in/blogs/${post.slug}`,
      "name": post.title
    }))
  });

  return (
    <Layout
      title={`Packaging Insights for US & UK Importers - Page ${currentPage} | Whizzpack`}
      description="Expert guides on importing corrugated boxes and Cotton Bags for Seeds from India. Resources for US and UK buyers sourcing bulk packaging."
      canonical={`https://www.whizzpack.in/blogs/page/${currentPage}`}
      ogImage="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&auto=format&fit=crop&q=80"
      ogType="website"
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

export async function getServerSideProps({ params }) {
  const pageNum = parseInt(params.page);

  // Page 1 should be at /blogs, not /blogs/page/1
  if (!pageNum || pageNum < 2 || isNaN(pageNum)) {
    return { redirect: { destination: '/blogs', permanent: true } };
  }

  const allPosts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(allPosts.length / POSTS_PER_PAGE));

  if (pageNum > totalPages) {
    return { redirect: { destination: '/blogs', permanent: false } };
  }

  const start = (pageNum - 1) * POSTS_PER_PAGE;
  const posts = allPosts.slice(start, start + POSTS_PER_PAGE);

  const navHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/nav-sub.html'), 'utf8');
  const footerHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/footer.html'), 'utf8');
  return { props: { posts, navHtml, footerHtml, totalPages, currentPage: pageNum } };
}
