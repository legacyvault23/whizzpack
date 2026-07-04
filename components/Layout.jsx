import Head from 'next/head';
import { useEffect } from 'react';

export default function Layout({ children, title, description, canonical, schema, ogImage, navHtml, footerHtml }) {

  useEffect(() => {
    // ── 1. CURSOR ──────────────────────────────────────────────────────────
    var csr  = document.getElementById('csr');
    var csrf = document.getElementById('csrf');
    var mx = window.innerWidth / 2, my = window.innerHeight / 2, cx = mx, cy = my;

    function onMouseMove(e) {
      mx = e.clientX; my = e.clientY;
      if (csr)  { csr.style.left = mx + 'px'; csr.style.top = my + 'px'; }
      var ml = document.getElementById('mlight');
      if (ml) { ml.style.left = mx + 'px'; ml.style.top = my + 'px'; }
    }
    document.addEventListener('mousemove', onMouseMove);

    (function mc() {
      cx += (mx - cx) * 0.1;
      cy += (my - cy) * 0.1;
      if (csrf) { csrf.style.left = cx + 'px'; csrf.style.top = cy + 'px'; }
      requestAnimationFrame(mc);
    })();

    document.querySelectorAll('a, button, .blog-card').forEach(function(el) {
      el.addEventListener('mouseenter', function() {
        if (csr)  csr.classList.add('lg');
        if (csrf) csrf.classList.add('lg');
      });
      el.addEventListener('mouseleave', function() {
        if (csr)  csr.classList.remove('lg');
        if (csrf) csrf.classList.remove('lg');
      });
    });

    // ── 2. SCROLL REVEAL ───────────────────────────────────────────────────
    var obs = new IntersectionObserver(function(entries) {
      entries.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add('on'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -10px 0px' });

    document.querySelectorAll('.anim, .animl, .animr, .anims').forEach(function(el) {
      obs.observe(el);
    });

    // ── 3. NAV SCROLL ──────────────────────────────────────────────────────
    var nav = document.getElementById('nav');
    function onScroll() {
      if (nav) nav.classList.toggle('sc', window.scrollY > 50);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── 4. HAMBURGER ───────────────────────────────────────────────────────
    var hb = document.getElementById('hb');
    var mm = document.getElementById('mm');
    if (hb && mm) {
      hb.addEventListener('click', function() {
        mm.classList.toggle('open');
        hb.classList.toggle('active');
      });
      document.querySelectorAll('.mlink').forEach(function(l) {
        l.addEventListener('click', function() {
          mm.classList.remove('open');
          hb.classList.remove('active');
        });
      });
    }

    // ── 5. SMOOTH ANCHOR ───────────────────────────────────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
      a.addEventListener('click', function(e) {
        var t = document.querySelector(this.getAttribute('href'));
        if (!t) return;
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth' });
      });
    });

    // ── 6. NAV DROPDOWN ────────────────────────────────────────────────────
    var ddToggle = document.querySelector('.nav-dd-toggle');
    var ddMenu   = document.querySelector('.dd-menu');
    if (ddToggle && ddMenu) {
      ddToggle.addEventListener('click', function(e) {
        e.preventDefault();
        var isOpen = ddMenu.classList.contains('dd-open');
        ddMenu.classList.toggle('dd-open', !isOpen);
        ddMenu.style.display = isOpen ? '' : 'block';
      });
      document.addEventListener('click', function(e) {
        if (!ddToggle.contains(e.target) && !ddMenu.contains(e.target)) {
          ddMenu.classList.remove('dd-open');
          ddMenu.style.display = '';
        }
      });
    }

    return function cleanup() {
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
    };
  }, []);

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
        {ogImage && <meta property="og:image" content={ogImage} />}
        {ogImage && <meta property="og:image:width" content="1200" />}
        {ogImage && <meta property="og:image:height" content="630" />}
        {ogImage && <meta name="twitter:card" content="summary_large_image" />}
        {ogImage && <meta name="twitter:image" content={ogImage} />}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        {schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: schema }}
          />
        )}
      </Head>

      {/* Cursor */}
      <div id="csr"></div>
      <div id="csrf"></div>
      <div id="mlight"></div>

      {/* Nav */}
      {navHtml && <div dangerouslySetInnerHTML={{ __html: navHtml }} />}

      {/* Mobile menu */}
      <div className="mm" id="mm">
        <a href="/#products" className="mlink">Products</a>
        <a href="/#about"    className="mlink">About</a>
        <a href="/#ind"      className="mlink">Industries</a>
        <a href="/#fac"      className="mlink">Factory</a>
        <a href="/#testi"    className="mlink">Testimonials</a>
        <a href="/blogs"     className="mlink">Blogs</a>
        <a href="/#contact"  className="btn bp mlink">Get a Quote</a>
      </div>

      <main>{children}</main>

      {footerHtml && <div dangerouslySetInnerHTML={{ __html: footerHtml }} />}
    </>
  );
}
