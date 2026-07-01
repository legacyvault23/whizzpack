import Layout from '../../components/Layout';
import { getPost } from '../../lib/posts';
import { marked } from 'marked';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function BlogPost({ frontmatter, contentHtml, navHtml, footerHtml, slug }) {
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": frontmatter.title,
    "description": frontmatter.excerpt,
    "datePublished": frontmatter.date,
    "author": { "@type": "Organization", "name": "Whizzpack" },
    "publisher": { "@type": "Organization", "name": "Whizzpack", "url": "https://www.whizzpack.in" },
    "mainEntityOfPage": `https://www.whizzpack.in/blog/${slug}`
  });

  return (
    <Layout
      title={`${frontmatter.title} | Whizzpack`}
      description={frontmatter.excerpt}
      canonical={`https://www.whizzpack.in/blog/${slug}`}
      schema={schema}
      navHtml={navHtml}
      footerHtml={footerHtml}
    >
      <div className="blog-post-wrap">
        {/* Post hero */}
        <div className="blog-post-hero">
          <div className="blog-post-hero-inner">
            <Link href="/blog" className="blog-back">← All Posts</Link>
            <h1>{frontmatter.title}</h1>
            {frontmatter.date && <p className="blog-meta">{frontmatter.date}</p>}
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
