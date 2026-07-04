import Layout from '../../components/Layout';
import { getPost } from '../../lib/posts';
import { marked } from 'marked';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr + 'T00:00:00');
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}

function extractFirstImage(html) {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1].split('?')[0] + '?w=1200&auto=format&fit=crop&q=80' : null;
}

export default function BlogPost({ frontmatter, contentHtml, navHtml, footerHtml, slug }) {
  const ogImage = frontmatter.ogImage || extractFirstImage(contentHtml) || 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&auto=format&fit=crop&q=80';
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": frontmatter.title,
    "description": frontmatter.excerpt,
    "datePublished": frontmatter.date,
    "author": { "@type": "Person", "name": frontmatter.author || "Whizzpack" },
    "publisher": { "@type": "Organization", "name": "Whizzpack", "url": "https://www.whizzpack.in" },
    "keywords": (frontmatter.tags || []).join(', '),
    "mainEntityOfPage": `https://www.whizzpack.in/blogs/${slug}`
  });

  const tags = frontmatter.tags || [];

  return (
    <Layout
      title={`${frontmatter.title} | Whizzpack`}
      description={frontmatter.excerpt}
      canonical={`https://www.whizzpack.in/blogs/${slug}`}
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
                <span className="blog-post-author">By {frontmatter.author}</span>
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
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { slug } = params;
    const { frontmatter, content } = getPost(slug);
    const contentHtml = marked(content);
    const navHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/nav-sub.html'), 'utf8');
    const footerHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/footer.html'), 'utf8');
    return { props: { frontmatter, contentHtml, navHtml, footerHtml, slug } };
  } catch (e) {
    return { notFound: true };
  }
}
