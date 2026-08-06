import Layout from '../components/Layout';
import fs from 'fs';
import path from 'path';

const schema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Whizzpack - Corrugated Box & Cotton Seed Bag Manufacturer India",
  "url": "https://www.whizzpack.in/about",
  "description": "Whizzpack is a factory-direct manufacturer and exporter of corrugated boxes and cotton seed bags from Rajkot, Gujarat, India. ISO certified. Serving importers in USA, UK, and worldwide since 2021.",
  "breadcrumb": {
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.whizzpack.in/" },
      { "@type": "ListItem", "position": 2, "name": "About", "item": "https://www.whizzpack.in/about" }
    ]
  },
  "mainEntity": {
    "@type": "Organization",
    "name": "Whizzpack",
    "legalName": "Whizzpack Packing Solutions",
    "description": "B2B manufacturer and exporter of corrugated boxes and cotton seed bags based in Rajkot, Gujarat, India. Factory-direct to importers in USA, UK, Europe, and worldwide.",
    "url": "https://www.whizzpack.in",
    "foundingDate": "2021",
    "email": "info.whizzpack@yahoo.com",
    "telephone": "+918320907574",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Plot 47, GIDC Industrial Estate",
      "addressLocality": "Rajkot",
      "addressRegion": "Gujarat",
      "postalCode": "360001",
      "addressCountry": "IN"
    },
    "areaServed": [
      { "@type": "Country", "name": "United States" },
      { "@type": "Country", "name": "United Kingdom" },
      { "@type": "Country", "name": "European Union" },
      { "@type": "Country", "name": "Canada" },
      { "@type": "Country", "name": "Australia" }
    ],
    "sameAs": [
      "https://www.linkedin.com/company/whizzpack/",
      "https://www.instagram.com/whizz_pack/",
      "https://www.facebook.com/profile.php?id=61591832156946"
    ]
  }
});

export default function About({ navHtml, footerHtml }) {
  return (
    <Layout
      title="About Whizzpack | Corrugated Box & Cotton Seed Bag Manufacturer India"
      description="Whizzpack is a factory-direct manufacturer and exporter of corrugated boxes and cotton seed bags from Rajkot, Gujarat, India. ISO certified. Serving importers in USA, UK, and worldwide since 2021."
      canonical="https://www.whizzpack.in/about"
      ogType="website"
      ogImage="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=1200&auto=format&fit=crop&q=80"
      schema={schema}
      navHtml={navHtml}
      footerHtml={footerHtml}
    >
      <style>{`
        .about-page-hero{background:linear-gradient(135deg,#0F1F4B 0%,#1a3268 100%);padding:100px 0 64px;text-align:center;position:relative;overflow:hidden}
        .about-page-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 60% 40%,rgba(240,90,40,.13),transparent 70%)}
        .about-page-hero .stag{display:inline-block;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#F05A28;background:rgba(240,90,40,.1);border:1px solid rgba(240,90,40,.3);padding:5px 14px;border-radius:100px;margin-bottom:16px}
        .about-page-hero h1{font-size:clamp(2rem,5vw,3rem);font-weight:900;color:#fff;margin:0 0 18px;line-height:1.18}
        .about-page-hero p{font-size:1.1rem;color:rgba(255,255,255,.75);max-width:640px;margin:0 auto;line-height:1.7}
        .about-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:24px;max-width:820px;margin:44px auto 0}
        .about-stat{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:24px 16px;text-align:center}
        .about-stat-num{font-size:2rem;font-weight:900;color:#F05A28;line-height:1}
        .about-stat-lbl{font-size:.78rem;color:rgba(255,255,255,.65);margin-top:6px;line-height:1.4}
        @media(max-width:700px){.about-stats{grid-template-columns:1fr 1fr}}
        @media(max-width:420px){.about-stats{grid-template-columns:1fr}}

        .about-section{padding:80px 0}
        .about-section:nth-child(even){background:#f7f8fb}
        .about-section .wrap{max-width:1100px;margin:0 auto;padding:0 24px}
        .about-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
        .about-grid.rev{direction:rtl}.about-grid.rev>*{direction:ltr}
        @media(max-width:860px){.about-grid,.about-grid.rev{grid-template-columns:1fr;direction:ltr}}
        .about-text .stag{display:inline-block;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#F05A28;background:rgba(240,90,40,.08);border:1px solid rgba(240,90,40,.22);padding:4px 12px;border-radius:100px;margin-bottom:12px}
        .about-text h2{font-size:clamp(1.5rem,3vw,2rem);font-weight:800;color:#0F1F4B;margin:0 0 16px;line-height:1.25}
        .about-text p{font-size:1rem;color:#555;line-height:1.75;margin-bottom:14px}
        .about-text ul{list-style:none;padding:0;margin:18px 0 0}
        .about-text ul li{display:flex;align-items:flex-start;gap:10px;font-size:.95rem;color:#444;margin-bottom:10px;line-height:1.55}
        .about-ck{width:20px;height:20px;border-radius:50%;background:#0F1F4B;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:2px}
        .about-ck svg{width:10px;height:10px}
        .about-img{border-radius:16px;overflow:hidden;box-shadow:0 20px 50px rgba(15,31,75,.15)}
        .about-img img{width:100%;height:380px;object-fit:cover;display:block}
        @media(max-width:860px){.about-img img{height:240px}}

        .certifications{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px}
        .cert-card{background:#fff;border:1px solid #e4e9f0;border-radius:14px;padding:28px 22px;text-align:center;box-shadow:0 4px 16px rgba(15,31,75,.06)}
        .cert-icon{width:52px;height:52px;border-radius:12px;background:rgba(15,31,75,.07);display:flex;align-items:center;justify-content:center;margin:0 auto 14px}
        .cert-icon svg{width:26px;height:26px;stroke:#0F1F4B;fill:none;stroke-width:1.8;stroke-linecap:round;stroke-linejoin:round}
        .cert-card h3{font-size:.95rem;font-weight:700;color:#0F1F4B;margin:0 0 6px}
        .cert-card p{font-size:.82rem;color:#666;margin:0;line-height:1.6}
        @media(max-width:700px){.certifications{grid-template-columns:1fr 1fr}}
        @media(max-width:420px){.certifications{grid-template-columns:1fr}}

        .team-section{background:#fff;padding:80px 0}
        .team-section .sh{text-align:center;margin-bottom:48px}
        .team-section .sh .stag{display:inline-block;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#F05A28;background:rgba(240,90,40,.08);border:1px solid rgba(240,90,40,.22);padding:4px 12px;border-radius:100px;margin-bottom:10px}
        .team-section .sh h2{font-size:clamp(1.6rem,3vw,2.1rem);font-weight:800;color:#0F1F4B;margin:0 0 12px}
        .team-section .sh p{font-size:1rem;color:#666;max-width:580px;margin:0 auto;line-height:1.7}
        .values-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
        .value-card{border:1px solid #e4e9f0;border-radius:16px;padding:32px 24px}
        .value-num{font-size:2rem;font-weight:900;color:rgba(15,31,75,.12);line-height:1;margin-bottom:12px}
        .value-card h3{font-size:1rem;font-weight:700;color:#0F1F4B;margin:0 0 10px}
        .value-card p{font-size:.88rem;color:#666;margin:0;line-height:1.7}
        @media(max-width:700px){.values-grid{grid-template-columns:1fr}}

        .about-cta{background:linear-gradient(135deg,#0F1F4B 0%,#1a3268 100%);padding:80px 0;text-align:center}
        .about-cta h2{font-size:clamp(1.7rem,3.5vw,2.4rem);font-weight:900;color:#fff;margin:0 0 16px}
        .about-cta p{font-size:1.05rem;color:rgba(255,255,255,.75);max-width:520px;margin:0 auto 32px;line-height:1.7}
        .cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
        .btn-white{background:#fff;color:#0F1F4B;border:none;padding:14px 30px;border-radius:8px;font-weight:700;font-size:.95rem;cursor:pointer;text-decoration:none;transition:transform .2s,box-shadow .2s}
        .btn-white:hover{transform:translateY(-2px);box-shadow:0 8px 24px rgba(0,0,0,.15)}
        .btn-outline-white{background:transparent;color:#fff;border:2px solid rgba(255,255,255,.4);padding:13px 28px;border-radius:8px;font-weight:700;font-size:.95rem;cursor:pointer;text-decoration:none;transition:border-color .2s,background .2s}
        .btn-outline-white:hover{border-color:#fff;background:rgba(255,255,255,.08)}

        .breadcrumb-bar{background:#f3f4f8;border-bottom:1px solid #e4e9f0;padding:12px 0}
        .breadcrumb-bar .wrap{max-width:1100px;margin:0 auto;padding:0 24px}
        .breadcrumb{display:flex;align-items:center;gap:6px;font-size:.82rem;color:#888}
        .breadcrumb a{color:#555;text-decoration:none}.breadcrumb a:hover{color:#0F1F4B}
        .breadcrumb-sep{color:#ccc}
      `}</style>

      {/* Breadcrumb */}
      <div className="breadcrumb-bar">
        <div className="wrap">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span className="breadcrumb-sep">&#8250;</span>
            <span>About</span>
          </nav>
        </div>
      </div>

      {/* Hero */}
      <section className="about-page-hero">
        <span className="stag">About Whizzpack</span>
        <h1>5 Years of Export-Grade Packaging Excellence</h1>
        <p>Born in Rajkot, Gujarat, Whizzpack set out with one goal: to give global importers factory-direct access to world-class packaging. Today we are a trusted B2B manufacturer and exporter, serving clients across the USA, UK, Europe, and beyond.</p>
        <div className="about-stats">
          <div className="about-stat">
            <div className="about-stat-num">5+</div>
            <div className="about-stat-lbl">Years Manufacturing</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-num">80+</div>
            <div className="about-stat-lbl">Global Import Clients</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-num">12M+</div>
            <div className="about-stat-lbl">Units Shipped Annually</div>
          </div>
          <div className="about-stat">
            <div className="about-stat-num">20+</div>
            <div className="about-stat-lbl">Countries Served</div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="about-section">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-text">
              <span className="stag">Our Story</span>
              <h2>Factory-Direct Packaging from the Heart of Gujarat</h2>
              <p>Whizzpack was founded in 2021 in Rajkot, one of India's leading industrial hubs, with a clear mission: cut the middlemen, eliminate the markups, and deliver export-grade corrugated boxes and cotton seed bags directly to importers worldwide.</p>
              <p>Our manufacturing facility sits in GIDC Industrial Estate, Rajkot - equipped with modern corrugation lines, precision die-cutting, and offset printing capabilities. Every order is produced on-site, quality-checked by our team, and shipped directly from our loading bay to your freight forwarder.</p>
              <p>From the first year, we focused exclusively on B2B export clients - importers, distributors, and brands in the USA, UK, Europe, and beyond who need reliable, scalable packaging supply without the complexity of an agent-based supply chain.</p>
            </div>
            <div className="about-img">
              <img
                src="https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&auto=format&fit=crop&q=80"
                alt="Whizzpack corrugated box manufacturing facility in Rajkot, Gujarat, India"
                width="800" height="380"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Factory Direct */}
      <section className="about-section">
        <div className="wrap">
          <div className="about-grid rev">
            <div className="about-text">
              <span className="stag">Factory Direct</span>
              <h2>From Our Factory Floor to Your Freight</h2>
              <p>When you order from Whizzpack, you work directly with the manufacturer. No agents, no resellers, no inflated pricing. The cost you see reflects the cost of production - not the cost of a four-layer supply chain.</p>
              <ul>
                {[
                  "Direct manufacturer pricing with no agent commissions",
                  "Export-compliant documentation for USA and UK customs",
                  "Custom design support from our in-house team",
                  "Quality inspection before every shipment leaves our gate",
                  "MOQ 5,000 units with scalable volume pricing",
                  "25-35 day lead time to USA/UK via sea freight"
                ].map((item, i) => (
                  <li key={i}>
                    <span className="about-ck">
                      <svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" fill="none"/></svg>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="about-img">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=80"
                alt="Corrugated boxes packed and ready for export shipping from India"
                width="800" height="380"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="about-section">
        <div className="wrap">
          <div style={{textAlign:'center',marginBottom:'48px'}}>
            <span className="about-text" style={{display:'inline-block'}}>
              <span className="stag">Quality &amp; Compliance</span>
            </span>
            <h2 style={{fontSize:'clamp(1.5rem,3vw,2rem)',fontWeight:800,color:'#0F1F4B',margin:'12px 0'}}>Certified for Export. Built for International Standards.</h2>
            <p style={{fontSize:'1rem',color:'#666',maxWidth:'580px',margin:'0 auto',lineHeight:1.7}}>Every order leaves Rajkot meeting the quality and compliance standards required for import into the USA, UK, and EU markets.</p>
          </div>
          <div className="certifications">
            {[
              {
                title: "ISO 9001 Certified",
                desc: "Quality management systems certified to ISO 9001 standards. Consistent production quality from order to dispatch.",
                icon: <path d="M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
              },
              {
                title: "ISPM-15 Compliance",
                desc: "All wood packaging materials comply with ISPM-15 phytosanitary standards, required for customs clearance in USA and UK.",
                icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></>
              },
              {
                title: "OEKO-TEX Compliant",
                desc: "Our cotton seed bags are available in OEKO-TEX compliant materials - free from harmful substances, ideal for organic and food-safe applications.",
                icon: <><path d="M12 22V12M5 17l7 5 7-5M5 12l7 5 7-5M5 7l7 5 7-5M12 2l7 5-7 5L5 7l7-5z"/></>
              },
              {
                title: "Export Licensed",
                desc: "Fully licensed exporter registered with India's DGFT. All export documentation handled from our end - commercial invoice, packing list, COO.",
                icon: <><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></>
              },
              {
                title: "Eco-Friendly Materials",
                desc: "Corrugated boxes made with recycled kraft liner. Cotton seed bags use 100% natural cotton - biodegradable, sustainable, and GOTS-compatible.",
                icon: <><path d="M12 22V12M5 17l7 5 7-5"/><path d="M5 12l7 5 7-5"/></>
              },
              {
                title: "Pre-Shipment Inspection",
                desc: "Every order undergoes a full pre-shipment quality inspection - dimensions, print, burst strength, and packaging integrity verified before loading.",
                icon: <><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></>
              }
            ].map((cert, i) => (
              <div className="cert-card" key={i}>
                <div className="cert-icon">
                  <svg viewBox="0 0 24 24">{cert.icon}</svg>
                </div>
                <h3>{cert.title}</h3>
                <p>{cert.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="team-section">
        <div className="wrap" style={{maxWidth:'1100px',margin:'0 auto',padding:'0 24px'}}>
          <div className="sh">
            <span className="stag">What We Stand For</span>
            <h2>The Whizzpack Advantage</h2>
            <p>Every decision we make is built around one goal: getting export-grade packaging to your freight on time, on spec, and at the right price.</p>
          </div>
          <div className="values-grid">
            {[
              {
                n: "01",
                title: "Factory Direct, No Middlemen",
                desc: "You deal directly with the manufacturer. No agents, no resellers, no inflated pricing. The cost you see is the cost of production - not the cost of a supply chain."
              },
              {
                n: "02",
                title: "Export Compliance Built In",
                desc: "Full documentation for USA and UK import requirements. ISPM-15 compliance, customs-ready labelling, and all necessary export certifications handled from our side."
              },
              {
                n: "03",
                title: "Custom Design to Doorstep",
                desc: "Share your brief and our design team handles the rest. From structural engineering to final print approval, we manage your order from first sketch to your receiving dock."
              },
              {
                n: "04",
                title: "All Material Grades Available",
                desc: "Single wall, double wall, triple wall. 3-ply through 7-ply. Kraft, white-top, and semi-chemical fluting options. We match the right grade to your product weight and route."
              },
              {
                n: "05",
                title: "Sustainable Packaging Options",
                desc: "Recycled kraft liner, biodegradable cotton bags, GOTS-compatible materials and OEKO-TEX compliant cotton. We help you source packaging that meets sustainability targets."
              },
              {
                n: "06",
                title: "Quality Without Borders",
                desc: "ISO-certified production with pre-shipment quality inspection on every order. Our boxes arrive at your destination meeting the same standard they left our floor."
              }
            ].map((v, i) => (
              <div className="value-card" key={i}>
                <div className="value-num">{v.n}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="about-section">
        <div className="wrap">
          <div className="about-grid">
            <div className="about-text">
              <span className="stag">Our Location</span>
              <h2>Manufacturing in Rajkot, Gujarat - India's Industrial Heartland</h2>
              <p>Rajkot is one of India's fastest-growing industrial cities, located in Gujarat - the country's largest exporting state. Our factory sits in the GIDC Industrial Estate, a purpose-built zone designed for manufacturing and export logistics.</p>
              <p>Proximity to Rajkot Airport, Kandla Port, and Mundra Port - two of India's top container ports - means your order reaches freight consolidation quickly. Most sea freight departures to USA and UK are within 48 hours of dispatch from our gate.</p>
              <ul>
                <li><span className="about-ck"><svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" fill="none"/></svg></span>Plot 47, GIDC Industrial Estate, Rajkot, Gujarat 360001</li>
                <li><span className="about-ck"><svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" fill="none"/></svg></span>Near Kandla Port and Mundra Port for fast sea freight</li>
                <li><span className="about-ck"><svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" fill="none"/></svg></span>Email: info.whizzpack@yahoo.com</li>
                <li><span className="about-ck"><svg viewBox="0 0 12 12"><path d="M2 6l3 3 5-5" stroke="#fff" strokeWidth="2" fill="none"/></svg></span>Phone: +91 83209 07574</li>
              </ul>
            </div>
            <div className="about-img">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=80"
                alt="Industrial manufacturing facility in Rajkot Gujarat India"
                width="800" height="380"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="wrap" style={{maxWidth:'800px',margin:'0 auto',padding:'0 24px'}}>
          <h2>Ready to Source Packaging Direct from the Manufacturer?</h2>
          <p>Tell us your requirement and we will send you a detailed quote with material options, lead times, and MOQ within 24 hours.</p>
          <div className="cta-btns">
            <a href="/#contact" className="btn-white">Get a Free Quote</a>
            <a href="/corrugated-boxes" className="btn-outline-white">See Our Products</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps() {
  const navHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/nav-sub.html'), 'utf8');
  const footerHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/footer.html'), 'utf8');
  return { props: { navHtml, footerHtml } };
}
