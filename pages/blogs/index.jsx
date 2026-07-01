import Layout from '../../components/Layout';
import { getAllPosts } from '../../lib/posts';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function BlogIndex({ posts, navHtml, footerHtml }) {
  return (
    <Layout
      title="Packaging Insights Blog | Whizzpack"
      description="Expert guides on importing corrugated boxes and cotton seed bags from India. Resources for US and UK buyers sourcing bulk packaging."
      canonical="https://www.whizzpack.in/blogs"
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
                {post.date && <div className="blog-card-meta">{post.date}</div>}
                <span className="blog-card-cta">Read More →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const posts = getAllPosts();
  const navHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/nav-sub.html'), 'utf8');
  const footerHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/footer.html'), 'utf8');
  return { props: { posts, navHtml, footerHtml } };
}
