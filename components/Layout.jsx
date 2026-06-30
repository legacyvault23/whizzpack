import Head from 'next/head';
import Script from 'next/script';

export default function Layout({ children, title, description, canonical, schema, navHtml, footerHtml }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schema }}
          />
        )}
      </Head>
      {navHtml && <div dangerouslySetInnerHTML={{ __html: navHtml }} />}
      <main>{children}</main>
      {footerHtml && <div dangerouslySetInnerHTML={{ __html: footerHtml }} />}
      <Script id="blog-nav" strategy="afterInteractive">{`
        var nav = document.getElementById('nav');
        var tog = document.getElementById('tog');
        var mob = document.getElementById('mob');
        if (tog && mob) {
          tog.addEventListener('click', function() {
            mob.classList.toggle('open');
            tog.classList.toggle('active');
          });
        }
        window.addEventListener('scroll', function() {
          if (nav) {
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
          }
        });
      `}</Script>
    </>
  );
}
