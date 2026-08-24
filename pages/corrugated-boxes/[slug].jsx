import Layout from '../../components/Layout';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

const PAGES = {
  'rsc-boxes': {
    title: 'RSC Corrugated Boxes Manufacturer India | Regular Slotted Containers | Whizzpack',
    description: 'Factory-direct RSC corrugated boxes from Rajkot, India. Single and double wall, all flute types, custom sizes. ISO certified exporter to USA, UK, and worldwide. MOQ 5,000 units.',
    h1: 'Regular Slotted Corrugated Boxes (RSC)',
    subtitle: 'The most versatile corrugated box style for export shipping - manufactured factory-direct from Rajkot, India',
    tag: 'RSC Boxes',
    ogImage: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&auto=format&fit=crop&q=80',
    intro: [
      'The Regular Slotted Container (RSC) is the world\'s most widely used corrugated box style, and for good reason. With four flaps meeting at the center to form the top and bottom, RSC boxes deliver consistent performance, flat-pack efficiently for ocean freight, and are accepted by virtually every carrier worldwide.',
      'At Whizzpack, we manufacture RSC boxes in all standard flute types - A, B, C, E, and BC double wall - using virgin kraft fibre and recycled content blends. Every batch ships with full specification sheets and GSM reports, giving importers in the USA and UK the documentation they need for customs and quality control.',
    ],
    specs: [
      { label: 'Box Style', value: 'FEFCO 0201 / RSC' },
      { label: 'Flute Types', value: 'A, B, C, E, BC (double wall)' },
      { label: 'Wall Construction', value: 'Single wall (3-ply) and double wall (5-ply)' },
      { label: 'Bursting Strength', value: '150 - 400 GSM' },
      { label: 'ECT Rating', value: '23 ECT to 48 ECT' },
      { label: 'Liner Options', value: 'Kraft, test liner, white top' },
      { label: 'Size Range', value: 'Custom: up to 1200mm x 800mm x 800mm' },
      { label: 'MOQ', value: '5,000 units per size' },
      { label: 'Lead Time', value: '18-25 working days from approved sample' },
      { label: 'Certifications', value: 'ISO 9001:2015, FSC available on request' },
    ],
    benefits: [
      { title: 'Flat-Pack Freight Savings', body: 'RSC boxes ship flat, reducing ocean freight volume by up to 80% compared to pre-assembled boxes - a critical cost advantage for USA and UK importers on 20ft and 40ft container orders.' },
      { title: 'Eco-Friendly Materials', body: 'We use FSC-traceable virgin kraft and recycled kraft liners. Our fluting medium is sourced from certified mills. Biodegradable, recyclable, and OEKO-TEX safe - RSC boxes from Whizzpack meet UK and EU packaging waste regulations.' },
      { title: 'Consistent Kraft GSM', body: 'Each production run is tested for bursting strength and ECT before shipment. GSM reports, test certificates, and photos ship with every order - giving importers the paperwork needed for carrier compliance.' },
      { title: 'Custom Die-Cut Sizes', body: 'Our in-house die-cutting allows non-standard inner dimensions to within 1mm tolerance. Ideal for buyers sourcing boxes for specific product SKUs, subscription boxes, or custom insert trays.' },
    ],
    applications: [
      'General export shipping and fulfilment',
      'Consumer electronics packaging',
      'Pharmaceutical and nutraceutical export',
      'Apparel and fashion export from India',
      'Food-grade corrugated (dry goods, spices)',
      'E-commerce subscription boxes',
    ],
    faqs: [
      {
        q: 'What is the difference between B flute and C flute RSC boxes?',
        a: 'B flute (3.5mm thick) is stiffer and better for stacking, making it ideal for canned goods and retail shelf display. C flute (4mm) offers better cushioning and is the most common choice for general export shipping. Both are available in RSC style from Whizzpack.',
      },
      {
        q: 'What is the minimum order quantity for RSC corrugated boxes?',
        a: 'Our standard MOQ is 5,000 units per size. For mixed-size orders sharing the same flute type and kraft specification, we can discuss combining quantities across SKUs.',
      },
      {
        q: 'Can you manufacture RSC boxes to exact inner dimensions I specify?',
        a: 'Yes. We manufacture to your exact inner dimensions (L x W x H). Our design team will calculate the correct blank size and test carton compression before finalising production.',
      },
      {
        q: 'Do your RSC boxes meet ISTA or ASTM packaging standards?',
        a: 'Our boxes are produced to ECT and bursting strength standards consistent with ISTA 2A and ASTM D4169 requirements. Specific test reports can be arranged for orders requiring formal certification.',
      },
      {
        q: 'What documentation do you provide with each shipment?',
        a: 'Every order includes a packing list, commercial invoice, GSM test report, and production photos. Certificate of Origin, phytosanitary certificate, and GST invoices are provided for all export consignments.',
      },
      {
        q: 'How long does it take to ship RSC boxes from India to the USA or UK?',
        a: 'Production takes 18-25 working days from approved sample. Ocean freight from Mundra or JNPT to US East Coast ports averages 20-28 days. Total lead time for first orders is typically 7-9 weeks.',
      },
    ],
  },

  'double-wall': {
    title: 'Double Wall Corrugated Boxes India | Heavy Duty 5-Ply Export Boxes | Whizzpack',
    description: 'Factory-direct double wall corrugated boxes from Rajkot, India. BC and EB flute, 5-ply construction, ECT 44-51. Heavy-duty protection for industrial export. MOQ 5,000 units.',
    h1: 'Double Wall Corrugated Boxes',
    subtitle: 'Heavy-duty 5-ply construction for industrial export and fragile goods - factory-direct from India',
    tag: 'Double Wall',
    ogImage: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=1200&auto=format&fit=crop&q=80',
    intro: [
      'Double wall corrugated boxes use two layers of fluted medium bonded between three liner boards, creating a 5-ply construction that delivers significantly greater compression strength than single wall boxes of the same size. This makes them the preferred choice for heavy industrial goods, fragile items, and products that must survive long ocean freight journeys to the USA, UK, and European markets.',
      'Whizzpack manufactures double wall boxes in BC flute (the most common heavy-duty combination), EB flute for extreme compression strength, and custom profiles on request. All boxes are produced using high GSM kraft liners and tested for ECT (Edge Crush Test) and BCT (Box Compression Test) before dispatch.',
    ],
    specs: [
      { label: 'Box Style', value: 'FEFCO 0201 (RSC), die-cut, or custom style' },
      { label: 'Flute Combination', value: 'BC flute (standard), EB flute (heavy duty)' },
      { label: 'Wall Construction', value: '5-ply (3 liners + 2 fluting mediums)' },
      { label: 'Total Wall Thickness', value: '7mm (BC) to 8mm (EB)' },
      { label: 'ECT Rating', value: '44 ECT to 51 ECT' },
      { label: 'Box Compression Test', value: 'Up to 700 kgf (on request)' },
      { label: 'Max Load Capacity', value: 'Up to 35 kg per carton (design dependent)' },
      { label: 'Liner GSM', value: '150 - 400 GSM kraft or test liner' },
      { label: 'MOQ', value: '5,000 units per size' },
      { label: 'Lead Time', value: '20-28 working days from approved sample' },
    ],
    benefits: [
      { title: 'Superior Compression Strength', body: 'BC flute double wall construction delivers 40-60% more Edge Crush strength compared to single wall C flute at comparable weights. Critical for stacked pallets in ocean containers where static loads are sustained for 3-6 weeks.' },
      { title: 'Vibration and Impact Protection', body: 'The double flute layer acts as a shock absorber, reducing transit damage for fragile goods including ceramics, glass, automotive components, and precision machinery parts.' },
      { title: 'Moisture Resistance Options', body: 'We offer water-resistant coated liners and fluting for export shipments passing through humid climates. Wax-coated and VCI (vapour corrosion inhibitor) variants available for metal components.' },
      { title: 'Recyclable and Biodegradable', body: 'All our double wall boxes use paper-based materials. No plastic laminates. Fully recyclable in standard paper waste streams in the USA and UK, meeting Extended Producer Responsibility (EPR) obligations for importers.' },
    ],
    applications: [
      'Automotive parts and components export',
      'Heavy machinery and equipment shipping',
      'Ceramic and glass products (fragile goods)',
      'Industrial tools and hardware',
      'Heavy consumer appliances',
      'Palletised export cargo requiring stacking strength',
    ],
    faqs: [
      {
        q: 'What is BC flute and why is it used for heavy-duty boxes?',
        a: 'BC flute combines B flute (stacking strength) and C flute (cushioning) in a single 5-ply board. The result is a board that resists both compression from stacking and impact damage - making it the standard choice for industrial export packaging.',
      },
      {
        q: 'How much weight can a double wall corrugated box hold?',
        a: 'This depends on box dimensions and liner specification. A typical double wall RSC box (400mm x 300mm x 300mm) with 150GSM kraft liners can safely hold 20-30 kg when properly sealed and stacked on a pallet. We provide load calculations for each order.',
      },
      {
        q: 'Can double wall boxes be custom printed?',
        a: 'Yes. We offer 1-2 colour flexo printing on double wall boxes. For full-colour branded packaging, we recommend our custom printed corrugated box option which covers litho-laminated and CMYK print options.',
      },
      {
        q: 'Do you offer pallet quantities with stretch wrap included?',
        a: 'Yes. We can palletise, stretch-wrap, and affix pallet labels to match your warehouse receiving requirements. Pallet specs (EUR/CHEP/Custom) and carton configuration per pallet can be specified at order stage.',
      },
      {
        q: 'What is the difference between ECT and bursting strength ratings?',
        a: 'ECT (Edge Crush Test) measures how much top-to-bottom pressure a box can withstand before collapsing - relevant for stacking on pallets. Bursting Strength (Mullen Test) measures resistance to puncture. Both metrics are tested and reported for each Whizzpack production run.',
      },
    ],
  },

  'custom-printed': {
    title: 'Custom Printed Corrugated Boxes India | Logo Printed Shipping Boxes | Whizzpack',
    description: 'Factory-direct custom printed corrugated boxes from India. 1-4 colour flexo print, litho-laminate options, eco-friendly inks. Branded packaging for retail, e-commerce, and export. MOQ 5,000 units.',
    h1: 'Custom Printed Corrugated Boxes',
    subtitle: 'Branded corrugated packaging with eco-friendly flexo and litho printing - factory-direct from Rajkot, India',
    tag: 'Custom Printed',
    ogImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80',
    intro: [
      'Custom printed corrugated boxes transform standard shipping packaging into a brand touchpoint. Whether you need a simple two-colour logo print for export identification, full-colour e-commerce unboxing packaging, or FSC-certified retail shelf-ready units, Whizzpack\'s in-house printing facility in Rajkot, Gujarat delivers consistent colour matching across large production runs.',
      'We use water-based flexo inks on all standard runs - biodegradable, non-toxic, and safe for food-adjacent applications. For premium retail packaging, litho-laminated boxes with CMYK photographic printing are available. All artwork is proofed digitally before plate production, and a pre-production colour proof is supplied for every new design.',
    ],
    specs: [
      { label: 'Print Method', value: 'Flexographic (standard), litho-laminate (premium)' },
      { label: 'Colours', value: '1 to 4 colours (Pantone matched); CMYK for litho' },
      { label: 'Ink Type', value: 'Water-based, eco-friendly, food-safe available' },
      { label: 'Print Area', value: 'All 4 sides + top/bottom flaps (full wrap available)' },
      { label: 'Flute Options', value: 'B, C, E, BC double wall' },
      { label: 'Surface', value: 'Natural kraft, white top kraft, coated white' },
      { label: 'Minimum Artwork Detail', value: '2mm stroke / 8pt text (flexo)' },
      { label: 'Colour Tolerance', value: 'Delta-E ≤ 2.0 from approved Pantone reference' },
      { label: 'MOQ', value: '5,000 units per design' },
      { label: 'Lead Time', value: '22-30 working days from artwork approval' },
    ],
    benefits: [
      { title: 'Eco-Friendly Water-Based Inks', body: 'All flexo printing uses water-based inks free from VOCs (volatile organic compounds). Boxes remain fully recyclable and biodegradable after printing - an increasingly important requirement for UK and EU importers under Extended Producer Responsibility (EPR) regulations.' },
      { title: 'Consistent Pantone Colour Matching', body: 'We calibrate printing plates to Pantone references and run densitometry checks during every production run. Delta-E colour deviation is measured and reported, ensuring brand colour consistency across 10,000+ unit orders.' },
      { title: 'FSC-Certified Board Available', body: 'For brands requiring sustainability credentials, we offer FSC-certified corrugated board on all print formats. FSC chain-of-custody documentation is provided, supporting GOTS and OEKO-TEX supply chain audits for fashion and textile importers.' },
      { title: 'Pre-Production Proofing', body: 'Every new design receives a digital colour proof within 3 working days. Physical printed samples from actual production plates are available before full-run commitment - eliminating colour surprises on large orders.' },
    ],
    applications: [
      'E-commerce unboxing and DTC brands',
      'Retail shelf-ready display packaging',
      'Branded subscription box programmes',
      'Export identification and compliance printing',
      'Food and beverage packaging (water-based inks)',
      'Pharmaceutical secondary packaging',
    ],
    faqs: [
      {
        q: 'What file format should I send for artwork?',
        a: 'We accept Adobe Illustrator (.ai), PDF (print-ready, vector), and EPS files. For litho-laminated boxes, high-resolution TIFF or PSD files at 300 DPI are required. Our design team can send a die-line template for your box dimensions before artwork creation.',
      },
      {
        q: 'Can you match my brand\'s Pantone colour exactly?',
        a: 'We print to Pantone Solid Coated references for flexo jobs. Delta-E deviation is typically within 2.0. For critical brand colours, we run press proofs before committing to full production. Litho-laminated options achieve tighter colour accuracy for premium applications.',
      },
      {
        q: 'Are your printed boxes safe for food products?',
        a: 'Our water-based inks are food-safe for dry goods and food-adjacent applications (outer packaging). For direct-contact food packaging, we can specify food-grade liners and inks compliant with FDA and EU 10/2011 food contact regulations.',
      },
      {
        q: 'What is the difference between flexo printing and litho-laminated boxes?',
        a: 'Flexo printing applies ink directly to the corrugated board - cost-effective, fast, and sufficient for logos and solid colour designs. Litho-laminated boxes print on a separate sheet of paper that is then laminated onto the corrugated board, allowing photographic-quality CMYK imagery at higher cost and longer lead time.',
      },
      {
        q: 'Can I order multiple different designs at the same MOQ?',
        a: 'The 5,000-unit MOQ applies per design and box size combination. If two designs share the same board specification and box dimensions, discuss this with our team - we may be able to combine plate costs and reduce the effective MOQ per design.',
      },
      {
        q: 'Do printed corrugated boxes affect recyclability?',
        a: 'No. Water-based inks used in flexo printing are fully compatible with paper recycling processes. Boxes can be placed in standard paper/cardboard recycling streams in the USA and UK without any pre-processing. This is verified by our FSC chain-of-custody documentation.',
      },
    ],
  },
};

function CheckIcon() {
  return (
    <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:22,height:22,borderRadius:'50%',background:'#0F1F4B',flexShrink:0,marginTop:2}}>
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  );
}

export default function CorrugatedBoxVariant({ navHtml, footerHtml, page, slug }) {
  const canonical = `https://www.whizzpack.in/corrugated-boxes/${slug}`;

  const schema = JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.whizzpack.in/" },
        { "@type": "ListItem", "position": 2, "name": "Corrugated Boxes", "item": "https://www.whizzpack.in/corrugated-boxes" },
        { "@type": "ListItem", "position": 3, "name": page.tag, "item": canonical },
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": page.h1,
      "description": page.description,
      "brand": { "@type": "Brand", "name": "Whizzpack" },
      "manufacturer": {
        "@type": "Organization",
        "name": "Whizzpack Packing Solutions",
        "url": "https://www.whizzpack.in",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Rajkot",
          "addressRegion": "Gujarat",
          "addressCountry": "IN"
        }
      },
      "image": page.ogImage,
      "offers": {
        "@type": "Offer",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "seller": {"@type": "Organization", "name": "Whizzpack"},
        "eligibleRegion": [
          {"@type": "Country", "name": "United States"},
          {"@type": "Country", "name": "United Kingdom"}
        ],
        "description": "Contact for pricing. MOQ 5,000 units."
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": page.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": { "@type": "Answer", "text": faq.a }
      }))
    }
  ]);

  return (
    <Layout
      title={page.title}
      description={page.description}
      canonical={canonical}
      ogType="website"
      ogImage={page.ogImage}
      schema={schema}
      navHtml={navHtml}
      footerHtml={footerHtml}
    >
      <style>{`
        .vp-hero{background:linear-gradient(135deg,#0F1F4B 0%,#1a3268 100%);padding:96px 0 64px;position:relative;overflow:hidden}
        .vp-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 60% 40%,rgba(240,90,40,.13),transparent 70%)}
        .vp-hero .wrap{max-width:1100px;margin:0 auto;padding:0 24px;position:relative}
        .vp-breadcrumb{display:flex;align-items:center;gap:8px;font-size:.8rem;color:rgba(255,255,255,.55);margin-bottom:20px;flex-wrap:wrap}
        .vp-breadcrumb a{color:rgba(255,255,255,.55);text-decoration:none}.vp-breadcrumb a:hover{color:#F05A28}
        .vp-breadcrumb span{color:rgba(255,255,255,.35)}
        .vp-tag{display:inline-block;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#F05A28;background:rgba(240,90,40,.1);border:1px solid rgba(240,90,40,.3);padding:5px 14px;border-radius:100px;margin-bottom:14px}
        .vp-hero h1{font-size:clamp(1.9rem,4.5vw,2.9rem);font-weight:900;color:#fff;margin:0 0 16px;line-height:1.18;max-width:720px}
        .vp-hero p{font-size:1.05rem;color:rgba(255,255,255,.72);max-width:680px;line-height:1.72;margin:0 0 32px}
        .vp-cta-group{display:flex;gap:14px;flex-wrap:wrap}
        .vp-btn{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;border-radius:10px;font-weight:700;font-size:.95rem;text-decoration:none;transition:transform .2s,box-shadow .2s}
        .vp-btn:hover{transform:translateY(-2px)}
        .vp-btn-primary{background:#F05A28;color:#fff;box-shadow:0 6px 20px rgba(240,90,40,.35)}
        .vp-btn-ghost{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.25)}

        .vp-section{padding:72px 0}
        .vp-section:nth-child(odd){background:#f7f8fb}
        .vp-section .wrap{max-width:1100px;margin:0 auto;padding:0 24px}
        .vp-section-tag{display:inline-block;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#F05A28;background:rgba(240,90,40,.08);border:1px solid rgba(240,90,40,.22);padding:4px 12px;border-radius:100px;margin-bottom:12px}
        .vp-section h2{font-size:clamp(1.5rem,3vw,2rem);font-weight:800;color:#0F1F4B;margin:0 0 16px;line-height:1.25}
        .vp-section > .wrap > p{font-size:1rem;color:#555;line-height:1.75;margin-bottom:14px;max-width:820px}

        .vp-intro-grid{display:grid;grid-template-columns:1fr 1fr;gap:60px;align-items:center}
        @media(max-width:860px){.vp-intro-grid{grid-template-columns:1fr}}
        .vp-intro-img{border-radius:16px;overflow:hidden;box-shadow:0 20px 50px rgba(15,31,75,.15)}
        .vp-intro-img img{width:100%;height:360px;object-fit:cover;display:block}
        @media(max-width:860px){.vp-intro-img img{height:220px}}

        .vp-specs-table{width:100%;border-collapse:collapse;margin-top:32px;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(15,31,75,.08)}
        .vp-specs-table tr:nth-child(odd){background:#fff}
        .vp-specs-table tr:nth-child(even){background:#f7f8fb}
        .vp-specs-table td{padding:13px 20px;font-size:.93rem;border-bottom:1px solid #eaecf0}
        .vp-specs-table td:first-child{font-weight:700;color:#0F1F4B;width:42%;border-right:1px solid #eaecf0}
        .vp-specs-table td:last-child{color:#444}
        .vp-specs-table tr:last-child td{border-bottom:none}

        .vp-benefits-grid{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:40px}
        @media(max-width:700px){.vp-benefits-grid{grid-template-columns:1fr}}
        .vp-benefit-card{background:#fff;border:1px solid #e4e9f0;border-radius:16px;padding:28px 24px;box-shadow:0 4px 16px rgba(15,31,75,.06)}
        .vp-benefit-card h3{font-size:1rem;font-weight:800;color:#0F1F4B;margin:0 0 10px}
        .vp-benefit-card p{font-size:.9rem;color:#555;line-height:1.7;margin:0}

        .vp-apps-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:32px}
        @media(max-width:700px){.vp-apps-grid{grid-template-columns:1fr 1fr}}
        @media(max-width:420px){.vp-apps-grid{grid-template-columns:1fr}}
        .vp-app-chip{display:flex;align-items:center;gap:10px;background:#fff;border:1px solid #e4e9f0;border-radius:10px;padding:14px 16px;font-size:.88rem;font-weight:600;color:#0F1F4B}

        .vp-faq{margin-top:40px}
        .vp-faq-item{background:#fff;border:1px solid #e4e9f0;border-radius:12px;padding:24px 26px;margin-bottom:12px}
        .vp-faq-item h3{font-size:.97rem;font-weight:700;color:#0F1F4B;margin:0 0 10px}
        .vp-faq-item p{font-size:.9rem;color:#555;line-height:1.72;margin:0}

        .vp-cta-section{background:linear-gradient(135deg,#0F1F4B 0%,#1a3268 100%);padding:72px 0;text-align:center;position:relative;overflow:hidden}
        .vp-cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%,rgba(240,90,40,.15),transparent 70%)}
        .vp-cta-section .wrap{position:relative;max-width:720px;margin:0 auto;padding:0 24px}
        .vp-cta-section h2{font-size:clamp(1.7rem,3.5vw,2.4rem);font-weight:900;color:#fff;margin:0 0 14px}
        .vp-cta-section p{font-size:1rem;color:rgba(255,255,255,.72);margin:0 0 32px;line-height:1.7}
        .vp-related{margin-top:40px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
        .vp-related-link{background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.2);color:rgba(255,255,255,.8);padding:9px 20px;border-radius:8px;font-size:.85rem;font-weight:600;text-decoration:none;transition:background .2s}
        .vp-related-link:hover{background:rgba(255,255,255,.16)}
      `}</style>

      {/* Hero */}
      <section className="vp-hero">
        <div className="wrap">
          <nav className="vp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/corrugated-boxes">Corrugated Boxes</Link><span>/</span>
            <span style={{color:'rgba(255,255,255,.8)'}}>{page.tag}</span>
          </nav>
          <div className="vp-tag">{page.tag}</div>
          <h1>{page.h1}</h1>
          <p>{page.subtitle}</p>
          <div className="vp-cta-group">
            <a href="/#contact" className="vp-btn vp-btn-primary">Get a Free Quote</a>
            <Link href="/corrugated-boxes" className="vp-btn vp-btn-ghost">All Corrugated Boxes</Link>
          </div>
        </div>
      </section>

      {/* Intro + Image */}
      <section className="vp-section">
        <div className="wrap">
          <div className="vp-intro-grid">
            <div>
              <div className="vp-section-tag">Overview</div>
              <h2>{page.h1} from Whizzpack</h2>
              {page.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
            <div className="vp-intro-img">
              <img
                src={page.ogImage}
                alt={`${page.h1} manufactured by Whizzpack, Rajkot India`}
                width="600"
                height="360"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Specifications */}
      <section className="vp-section">
        <div className="wrap">
          <div className="vp-section-tag">Specifications</div>
          <h2>Technical Specifications</h2>
          <p>All specifications are for standard production runs. Custom requirements are accommodated on request - contact our team for a tailored quote.</p>
          <table className="vp-specs-table">
            <tbody>
              {page.specs.map((row, i) => (
                <tr key={i}>
                  <td>{row.label}</td>
                  <td>{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Benefits */}
      <section className="vp-section">
        <div className="wrap">
          <div className="vp-section-tag">Why Whizzpack</div>
          <h2>Key Advantages for US and UK Importers</h2>
          <div className="vp-benefits-grid">
            {page.benefits.map((b, i) => (
              <div className="vp-benefit-card" key={i}>
                <h3>{b.title}</h3>
                <p>{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Applications */}
      <section className="vp-section">
        <div className="wrap">
          <div className="vp-section-tag">Applications</div>
          <h2>Common Use Cases</h2>
          <p>Our {page.tag.toLowerCase()} are used across a wide range of industries by importers in the USA, UK, Europe, and beyond.</p>
          <div className="vp-apps-grid">
            {page.applications.map((app, i) => (
              <div className="vp-app-chip" key={i}>
                <CheckIcon />
                <span>{app}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="vp-section">
        <div className="wrap">
          <div className="vp-section-tag">FAQ</div>
          <h2>Frequently Asked Questions</h2>
          <div className="vp-faq">
            {page.faqs.map((faq, i) => (
              <div className="vp-faq-item" key={i}>
                <h3>{faq.q}</h3>
                <p>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="vp-cta-section">
        <div className="wrap">
          <h2>Ready to Source {page.tag}?</h2>
          <p>
            Get factory-direct pricing from our Rajkot manufacturing facility. We supply importers in the USA, UK, Europe, and worldwide with consistent quality and full export documentation.
          </p>
          <a href="/#contact" className="vp-btn vp-btn-primary" style={{display:'inline-flex',margin:'0 auto'}}>Request a Quote</a>
          <div className="vp-related">
            <Link href="/corrugated-boxes" className="vp-related-link">All Corrugated Boxes</Link>
            <Link href="/cotton-seed-bags" className="vp-related-link">Cotton Seed Bags</Link>
            <Link href="/about" className="vp-related-link">About Whizzpack</Link>
            <Link href="/blogs" className="vp-related-link">Packaging Guides</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const { slug } = params;
  const page = PAGES[slug];

  if (!page) {
    return { notFound: true };
  }

  const navHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/nav-sub.html'), 'utf8');
  const footerHtml = fs.readFileSync(path.join(process.cwd(), 'page-content/footer.html'), 'utf8');

  return { props: { page, slug, navHtml, footerHtml } };
}
