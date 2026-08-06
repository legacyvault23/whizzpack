import Layout from '../../components/Layout';
import { getPost } from '../../lib/posts';
import { marked } from 'marked';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

// Custom renderer: add width/height to images to prevent CLS
marked.use({
  renderer: {
    image(href, title, text) {
      const alt = text || '';
      const titleAttr = title ? ` title="${title}"` : '';
      return `<img src="${href}" alt="${alt}"${titleAttr} width="900" height="600" loading="lazy" style="max-width:100%;height:auto;border-radius:8px">`;
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

export default function BlogPost({ frontmatter, contentHtml, navHtml, footerHtml, slug }) {
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
      "description": frontmatter.authorBio || "Packaging export specialist at Whizzpack, a Rajkot-based manufacturer of corrugated boxes and cotton seed bags.",
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
          {frontmatter.authorBio && (
            <div className="blog-author-box">
              <div className="blog-author-icon" aria-hidden="true">&#9997;</div>
              <div>
                <p className="blog-author-name">About the author: {frontmatter.author}</p>
                <p className="blog-author-bio">{frontmatter.authorBio}</p>
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
    const contentHtml = marked(content);
    const navHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/nav-sub.html'), 'utf8');
    const footerHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/footer.html'), 'utf8');
    return { props: { frontmatter, contentHtml, navHtml, footerHtml, slug } };
  } catch (e) {
    return { notFound: true };
  }
}
