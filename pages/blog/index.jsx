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
      canonical="https://www.whizzpack.in/blog"
      navHtml={navHtml}
      footerHtml={footerHtml}
    >
      <div className="blog-container">
        <h1>Packaging Insights</h1>
        <p>Guides and resources for US &amp; UK importers sourcing packaging from India.</p>
        <ul className="blog-list">
          {posts.map(post => (
            <li key={post.slug}>
              <Link href={`/blog/${post.slug}`}>{post.title}</Link>
              <p>{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getAllPosts();
  const navHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/nav-sub.html'), 'utf8');
  const footerHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/footer.html'), 'utf8');
  return { props: { posts, navHtml, footerHtml } };
}
