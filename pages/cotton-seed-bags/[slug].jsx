import Layout from '../../components/Layout';
import fs from 'fs';
import path from 'path';
import Link from 'next/link';

const PAGES = {
  'drawstring': {
    ctaTitle: 'Ready to Order Drawstring Cotton Bags for Seeds?',
    title: 'Drawstring Cotton Bags for Seeds | Muslin Seed Pouches Factory India | Whizzpack',
    description: 'Custom drawstring cotton bags for seeds, made to your spec in Rajkot, India. Retail garden pouches to farm sacks. OEKO-TEX compliant. MOQ 5,000 units. Exporting to UK seed brands and US organic farms.',
    h1: 'Drawstring Cotton Bags for Seeds',
    subtitle: 'Reusable, biodegradable drawstring cotton bags for seed packaging - from retail garden pouches to bulk farm storage, manufactured factory-direct from India for UK and US seed brands',
    tag: 'Drawstring Bags',
    ogImage: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&auto=format&fit=crop&q=80',
    intro: [
      'Drawstring cotton seed bags combine the natural breathability of woven cotton with a simple, secure closure that keeps seeds protected during storage and transit. The flat drawstring or tunnel cord closure allows rapid filling and resealing without tools - essential for commercial seed operations, nurseries, and retail garden centres that handle high volumes daily.',
      'Whizzpack manufactures drawstring cotton bags in fabric weights from 100 GSM (lightweight muslin) through to 400 GSM (heavy canvas), with flat or round cord drawstrings in natural cotton, jute, or recycled polyester. All fabrics are OEKO-TEX Standard 100 compliant and free from harmful dyes. Custom sizes, gussets, and inner linings are available from MOQ 5,000 units.',
    ],
    specs: [
      { label: 'Fabric Type', value: 'Natural cotton muslin, canvas, or organic cotton' },
      { label: 'Fabric Weight', value: '100 GSM (muslin) to 400 GSM (heavy canvas)' },
      { label: 'Closure Type', value: 'Flat drawstring or tunnel cord (cotton, jute, or recycled)' },
      { label: 'Thread Count', value: '60x60 to 120x120 threads per inch' },
      { label: 'Standard Sizes', value: '4"x6" to 20"x30" (custom sizes available)' },
      { label: 'Gusset Option', value: 'Side or bottom gusset for expanded capacity' },
      { label: 'Inner Lining', value: 'Unlined or PE inner lining for moisture-sensitive seeds' },
      { label: 'Colour', value: 'Natural undyed, off-white, or custom dyed (OEKO-TEX inks)' },
      { label: 'Certifications', value: 'OEKO-TEX Standard 100; GOTS certified cotton on request' },
      { label: 'MOQ', value: '5,000 units per size and specification' },
      { label: 'Lead Time', value: '18-24 working days from approved sample' },
    ],
    benefits: [
      { title: 'Breathable Natural Cotton', body: 'Woven cotton fabric allows air circulation, preventing moisture build-up that causes mould and germination failure in stored seeds. Unlike plastic bags, cotton drawstring bags extend seed viability in storage - a key selling point for seed banks and garden retail.' },
      { title: 'Fully Biodegradable and Reusable', body: 'Cotton drawstring bags are 100% biodegradable and can be reused hundreds of times before disposal. They meet UK and EU single-use plastics regulations and GOTS supply chain requirements - increasingly mandated by major garden retail buyers in the USA and UK.' },
      { title: 'OEKO-TEX Standard 100 Compliance', body: 'All fabric and cord materials are tested and certified to OEKO-TEX Standard 100, ensuring no harmful substances in the finished bag. Critical for seed brands, organic farms, and retailers with sustainability sourcing policies.' },
      { title: 'Custom Sizes to Fit Your Seed Range', body: 'We manufacture bags to exact dimensions, from small 4"x6" herb seed pouches to 20"x30" bulk grain sacks. Gusset options increase capacity without changing the bag footprint, ideal for bulkier seeds like sunflower, pumpkin, or maize.' },
    ],
    applications: [
      'Retail seed packet and garden centre display',
      'Commercial seed storage and distribution',
      'Organic farm seed saving and exchange',
      'Nursery and horticultural seed supply',
      'Bulk grain and legume storage',
      'Herb and spice packaging for retail',
    ],
    faqs: [
      {
        q: 'What fabric weight is best for seed storage drawstring bags?',
        a: '120-160 GSM cotton muslin is the most common choice for retail seed bags - light enough for easy filling and labelling, but sturdy enough to protect seeds during handling. For bulk farm storage of larger seeds like maize or sunflower, 200-300 GSM canvas provides additional durability.',
      },
      {
        q: 'Can drawstring bags be made with an inner moisture barrier?',
        a: 'Yes. For seeds sensitive to humidity, we offer a thin food-grade PE inner lining bonded to the cotton outer layer. This maintains breathability at the top (near the drawstring opening) while protecting seed contents from moisture ingress through the bag walls.',
      },
      {
        q: 'Do you offer GOTS certified cotton for drawstring bags?',
        a: 'Yes. GOTS (Global Organic Textile Standard) certified cotton is available for orders requiring organic textile credentials. GOTS chain-of-custody documentation is provided, supporting organic farm and retail buyer requirements in the USA and UK.',
      },
      {
        q: 'Can the drawstring cord be custom coloured to match our brand?',
        a: 'Yes. Cotton cords are available in natural, black, and custom Pantone-matched colours using OEKO-TEX compliant dyes. Jute cord is available in natural only. Recycled polyester cord is available in a range of colours for buyers prioritising circular material inputs.',
      },
      {
        q: 'What is the difference between a flat drawstring and a tunnel cord closure?',
        a: 'A flat drawstring uses a ribbon-style tape threaded through a hem at the top of the bag - simple and cost-effective. A tunnel cord uses a round rope-style cord threaded through a wider casing, providing a more secure closure for heavier contents and a premium retail appearance.',
      },
      {
        q: 'Can drawstring cotton bags be printed with our logo?',
        a: 'Yes. Screen printing, rubber stamp printing, and heat transfer are all available on drawstring bags. For larger print areas or multi-colour designs, our custom printed cotton seed bags option provides additional printing flexibility.',
      },
    ],
  },

  'organic': {
    ctaTitle: 'Ready to Order Organic Cotton Bags for Seeds?',
    title: 'Organic Cotton Bags for Seeds | GOTS Certified Seed Packaging India | Whizzpack',
    description: 'GOTS certified organic cotton bags for seeds, from Rajkot, India. Verified supply chain, Transaction Certificates provided. For UK organic seed brands, US USDA NOP operations, and EU organic retailers. MOQ 5,000 units.',
    h1: 'Organic Cotton Bags for Seeds',
    subtitle: 'GOTS certified, undyed, fully biodegradable cotton bags for seed packaging - for UK organic garden brands, US USDA NOP farms, and EU organic retailers sourcing factory-direct from India',
    tag: 'Organic Cotton',
    ogImage: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1200&auto=format&fit=crop&q=80',
    intro: [
      'Organic cotton seed bags are produced from cotton grown without synthetic pesticides, herbicides, or GMOs, and processed without chlorine bleach or harmful finishing chemicals. For seed brands, organic farms, and retailers with sustainability commitments, this supply chain integrity is as important as the bag\'s physical performance.',
      'Whizzpack sources GOTS (Global Organic Textile Standard) certified organic cotton from certified ginners in Gujarat and provides full chain-of-custody documentation with every order. Bags are stitched with organic cotton thread, finished with natural cotton drawstrings or ties, and packed without plastic. From raw fibre to finished bag, every step in production is traceable and certified.',
    ],
    specs: [
      { label: 'Cotton Standard', value: 'GOTS certified organic cotton (certificate provided)' },
      { label: 'Fabric Weight', value: '120 GSM to 300 GSM' },
      { label: 'Bleaching', value: 'None - natural undyed or hydrogen peroxide whitened only' },
      { label: 'Dyes', value: 'GOTS approved low-impact dyes only (when colour required)' },
      { label: 'Thread', value: 'Organic cotton thread (GOTS certified)' },
      { label: 'Closure Options', value: 'Natural cotton drawstring, jute tie, or fold-top with label' },
      { label: 'Bag Styles', value: 'Flat pouch, drawstring, gusseted sack, pillow bag' },
      { label: 'Size Range', value: 'Custom: 3"x4" mini pouches to 18"x28" bulk sacks' },
      { label: 'Certifications', value: 'GOTS 6.0, OEKO-TEX Standard 100' },
      { label: 'MOQ', value: '5,000 units per specification' },
      { label: 'Lead Time', value: '20-26 working days from approved sample' },
    ],
    benefits: [
      { title: 'GOTS Certified Supply Chain', body: 'GOTS (Global Organic Textile Standard) certification covers the entire supply chain from cotton fibre to finished bag. We provide Transaction Certificates (TCs) with each order, allowing importers to make verified organic claims on retail packaging and in sustainability reports.' },
      { title: 'Supports Organic Farm Compliance', body: 'For certified organic farms in the USA and UK, seed storage bags must not introduce synthetic contaminants. GOTS organic cotton bags are safe for use within organic systems certified to USDA NOP, EU 2018/848, or UK Organic standards - with no risk of certification jeopardy.' },
      { title: 'Zero Plastic Packaging Chain', body: 'Organic cotton bags from Whizzpack are packed in natural kraft paper cartons with no plastic wrapping, bags, or tapes. The full packaging chain is plastic-free, supporting zero-waste supply chain commitments for retailers and brands with plastic reduction targets.' },
      { title: 'Biodegradable in Soil Conditions', body: 'GOTS organic cotton fabric biodegrades completely within 1-5 months in active compost or soil conditions. Relevant for seed brands promoting "plant the bag" campaigns, and for farms where packaging material inadvertently enters the field.' },
    ],
    applications: [
      'USDA NOP and EU organic certified farm seed storage',
      'Organic and biodynamic seed brand retail packaging',
      'Seed library and community seed exchange programmes',
      'Zero-waste retail and plastic-free shop sourcing',
      'Sustainable gift and lifestyle brand packaging',
      'Herb, spice, and botanical product packaging',
    ],
    faqs: [
      {
        q: 'What does GOTS certification mean for seed bags?',
        a: 'GOTS (Global Organic Textile Standard) certification means the cotton fibre is certified organic at farm level, and every processing step from ginning to spinning, weaving, stitching, and finishing uses approved chemical inputs and social compliance standards. A Transaction Certificate (TC) from our GOTS-certified facility is provided with each order.',
      },
      {
        q: 'Are undyed organic cotton bags safe for direct seed contact?',
        a: 'Yes. Natural undyed organic cotton bags are among the safest seed storage materials available. No synthetic dyes, finishing agents, or bleaches are present. Hydrogen peroxide whitening (when used) breaks down to water and oxygen with no residue.',
      },
      {
        q: 'Can I use these bags inside a certified organic operation without losing my certification?',
        a: 'Yes, provided you use our GOTS certified bags and retain the Transaction Certificates we provide. GOTS certification is recognised by USDA NOP, EU Organic, and UK Organic certification bodies as evidence of organic textile inputs. Always confirm with your certifier before use.',
      },
      {
        q: 'Do organic cotton bags cost more than standard cotton bags?',
        a: 'GOTS certified organic cotton commands a premium over conventional cotton due to certification costs and organic fibre pricing. However, for brands positioning on sustainability, the certification documentation itself has value in supporting marketing claims and buyer audits.',
      },
      {
        q: 'Can organic cotton bags be custom printed without losing GOTS certification?',
        a: 'Yes, provided GOTS approved inks and printing processes are used. We use water-based inks that meet GOTS Annex 6 criteria for permitted substances. Printed bags retain their GOTS TC, though the print station must also be GOTS certified for the claim to extend to the finished printed bag.',
      },
      {
        q: 'How should organic cotton seed bags be stored before use?',
        a: 'Store in a cool, dry environment away from direct sunlight and moisture. Natural cotton can absorb ambient humidity, so airtight kraft or cardboard outer packaging (as supplied) helps maintain bag quality before use. Avoid storing near strong odours as cotton fibres can absorb smells.',
      },
    ],
  },

  'custom-printed': {
    ctaTitle: 'Ready to Order Custom Printed Cotton Bags for Seeds?',
    title: 'Custom Printed Cotton Bags for Seeds | Screen Print Factory India | Whizzpack',
    description: 'Custom printed cotton bags for seed brands - screen print, Pantone matching, OEKO-TEX compliant inks. Factory-direct from Rajkot, India to UK and US seed companies. MOQ 5,000 units.',
    h1: 'Custom Printed Cotton Bags for Seeds',
    subtitle: 'Branded cotton bags for seed companies - full-colour screen printing, Pantone colour matching, and OEKO-TEX safe inks, factory-direct from India to UK and US seed brands',
    tag: 'Custom Printed',
    ogImage: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200&auto=format&fit=crop&q=80',
    intro: [
      'Custom printed cotton seed bags transform functional packaging into a brand statement. Whether you need a simple one-colour logo stamp on a natural muslin drawstring bag, a full-colour screen-printed retail display pouch, or embroidered canvas sacks for premium garden brands, Whizzpack\'s in-house print facility in Rajkot delivers consistent results across large production runs.',
      'We use water-based, OEKO-TEX compliant inks for all screen and rubber printing. Heat transfer and embroidery options are available for designs requiring fine detail or a premium tactile finish. All printed bags remain fully biodegradable - no plastic laminates, no foil treatments, no PVC inks. Artwork proofing, print colour matching, and pre-production samples are standard for every new design.',
    ],
    specs: [
      { label: 'Print Methods', value: 'Screen print, rubber stamp, heat transfer, embroidery' },
      { label: 'Colours (Screen)', value: '1 to 4 colours; Pantone matched' },
      { label: 'Embroidery', value: 'Up to 8 thread colours; all stitch types' },
      { label: 'Ink Type', value: 'Water-based, OEKO-TEX compliant (no PVC or plastisol)' },
      { label: 'Print Area', value: 'Single side or double side; full wrap on request' },
      { label: 'Fabric Weight', value: '120 GSM to 400 GSM cotton or organic cotton' },
      { label: 'Bag Styles', value: 'Drawstring, flat pouch, tote, gusseted sack' },
      { label: 'Minimum Artwork Size', value: '5mm stroke / 10pt text (screen); 3mm (embroidery)' },
      { label: 'Certifications', value: 'OEKO-TEX Standard 100; GOTS available on organic cotton base' },
      { label: 'MOQ', value: '5,000 units per design' },
      { label: 'Lead Time', value: '22-30 working days from artwork approval' },
    ],
    benefits: [
      { title: 'Eco-Friendly Water-Based Inks', body: 'All screen and rubber print jobs use water-based inks that are OEKO-TEX Standard 100 compliant. No plastisol, no PVC, no phthalates. Finished bags are fully biodegradable and compostable - supporting brand sustainability claims and meeting EU REACH chemical regulations for products sold in European markets.' },
      { title: 'Consistent Pantone Colour Matching', body: 'Screen printing on cotton requires ink formulation adjusted for fabric absorption. Our colour specialists calibrate each screen to Pantone references and run print density checks on the first 50 units of every production run. Pre-production print samples are standard for all new colour introductions.' },
      { title: 'Embroidery for Premium Positioning', body: 'Embroidered branding on heavy canvas or linen bags creates a tactile, premium product that commands higher retail margins. We offer chain stitch, satin stitch, and fill stitch embroidery in up to 8 thread colours. Digitised embroidery files are prepared in-house at no charge for orders above MOQ.' },
      { title: 'Flexible Base Materials', body: 'Custom printing is available across all our cotton bag bases: standard cotton muslin, canvas, organic cotton (GOTS certified), jute-cotton blends, and recycled cotton. The bag design, fabric weight, and print method can be mixed and matched to meet your target end-use and sustainability positioning.' },
    ],
    applications: [
      'Branded retail seed packet and garden centre display',
      'Subscription box inserts and e-commerce gifting',
      'Corporate branded merchandise and events',
      'Seed brand seasonal promotional packaging',
      'Organic herb and spice retail pouches',
      'Sustainable brand premium packaging',
    ],
    faqs: [
      {
        q: 'What file format should I send for my artwork?',
        a: 'For screen printing, provide Adobe Illustrator (.ai) or PDF vector files with fonts outlined. For embroidery, provide high-resolution raster files (300 DPI PNG or TIFF) - our digitising team will convert artwork to embroidery format. For heat transfer, provide vector or high-res raster at actual print size.',
      },
      {
        q: 'Can you print on both sides of a cotton seed bag?',
        a: 'Yes. Double-sided screen printing is available at additional cost. The second side is printed after the first side is fully cured. For drawstring bags, we print on the front face before bag assembly, then assemble and stitch to avoid ink cracking at seams.',
      },
      {
        q: 'Are the inks safe for seed storage?',
        a: 'Our water-based inks are OEKO-TEX Standard 100 compliant, meaning they are tested and confirmed safe for contact with skin and general textile use. For direct seed contact applications, we recommend printing on the outer surface only and using an unlined or food-grade inner liner.',
      },
      {
        q: 'Can I get a pre-production sample before full production?',
        a: 'Yes, pre-production printed samples are standard for all new designs. Samples are printed using actual production screens and inks, not digital mock-ups. Sample lead time is 5-8 working days. Production begins only after written approval of the sample from your team.',
      },
      {
        q: 'What is the minimum number of colours in a design?',
        a: 'There is no minimum - single colour prints are the most cost-effective option and are popular for simple logo or text designs on natural cotton bags. Each additional colour requires a separate screen and adds to setup cost, so we recommend limiting designs to 2-3 colours where possible for cost efficiency at MOQ.',
      },
      {
        q: 'Can custom printed bags be made with organic cotton?',
        a: 'Yes. Custom printing is available on GOTS certified organic cotton base fabric. Water-based inks meeting GOTS Annex 6 criteria are used to maintain organic certification integrity. Transaction Certificates covering both the organic cotton base and GOTS-compliant printing are provided with these orders.',
      },
    ],
  },
};

function CheckIcon() {
  return (
    <span style={{display:'inline-flex',alignItems:'center',justifyContent:'center',width:22,height:22,borderRadius:'50%',background:'#1A6B3A',flexShrink:0,marginTop:2}}>
      <svg width="11" height="11" viewBox="0 0 12 12" fill="none"><polyline points="2,6 5,9 10,3" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    </span>
  );
}

export default function CottonSeedBagVariant({ navHtml, footerHtml, page, slug }) {
  const canonical = `https://www.whizzpack.in/cotton-seed-bags/${slug}`;

  const schema = JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.whizzpack.in/" },
        { "@type": "ListItem", "position": 2, "name": "Cotton Seed Bags", "item": "https://www.whizzpack.in/cotton-seed-bags" },
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
      "material": "Cotton",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2099-12-31",
        "validFrom": "2024-01-01",
        "seller": {"@type": "Organization", "name": "Whizzpack"},
        "eligibleRegion": [
          {"@type": "Country", "name": "United States"},
          {"@type": "Country", "name": "United Kingdom"}
        ],
        "description": "Contact for pricing. MOQ 5,000 units.",
        "shippingDetails": {
          "@type": "OfferShippingDetails",
          "shippingDestination": [
            {"@type": "DefinedRegion", "addressCountry": "US"},
            {"@type": "DefinedRegion", "addressCountry": "GB"}
          ],
          "deliveryTime": {
            "@type": "ShippingDeliveryTime",
            "handlingTime": {
              "@type": "QuantitativeValue",
              "minValue": 18,
              "maxValue": 26,
              "unitCode": "DAY"
            },
            "transitTime": {
              "@type": "QuantitativeValue",
              "minValue": 18,
              "maxValue": 28,
              "unitCode": "DAY"
            }
          },
          "shippingRate": {
            "@type": "MonetaryAmount",
            "value": "0",
            "currency": "USD"
          }
        },
        "hasMerchantReturnPolicy": {
          "@type": "MerchantReturnPolicy",
          "applicableCountry": ["US", "GB"],
          "returnPolicyCategory": "https://schema.org/MerchantReturnUnspecified"
        }
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
        .vp-hero::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 60% 40%,rgba(26,107,58,.18),transparent 70%)}
        .vp-hero .wrap{max-width:1100px;margin:0 auto;padding:0 24px;position:relative}
        .vp-breadcrumb{display:flex;align-items:center;gap:8px;font-size:.8rem;color:rgba(255,255,255,.55);margin-bottom:20px;flex-wrap:wrap}
        .vp-breadcrumb a{color:rgba(255,255,255,.55);text-decoration:none}.vp-breadcrumb a:hover{color:#4ade80}
        .vp-breadcrumb span{color:rgba(255,255,255,.35)}
        .vp-tag{display:inline-block;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#4ade80;background:rgba(26,107,58,.2);border:1px solid rgba(26,107,58,.4);padding:5px 14px;border-radius:100px;margin-bottom:14px}
        .vp-hero h1{font-size:clamp(1.9rem,4.5vw,2.9rem);font-weight:900;color:#fff;margin:0 0 16px;line-height:1.18;max-width:720px}
        .vp-hero p{font-size:1.05rem;color:rgba(255,255,255,.72);max-width:680px;line-height:1.72;margin:0 0 32px}
        .vp-cta-group{display:flex;gap:14px;flex-wrap:wrap}
        .vp-btn{display:inline-flex;align-items:center;gap:8px;padding:13px 26px;border-radius:10px;font-weight:700;font-size:.95rem;text-decoration:none;transition:transform .2s,box-shadow .2s}
        .vp-btn:hover{transform:translateY(-2px)}
        .vp-btn-primary{background:#1A6B3A;color:#fff;box-shadow:0 6px 20px rgba(26,107,58,.4)}
        .vp-btn-ghost{background:rgba(255,255,255,.1);color:#fff;border:1px solid rgba(255,255,255,.25)}

        .vp-section{padding:72px 0}
        .vp-section:nth-child(odd){background:#f7f8fb}
        .vp-section .wrap{max-width:1100px;margin:0 auto;padding:0 24px}
        .vp-section-tag{display:inline-block;font-size:.7rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:#1A6B3A;background:rgba(26,107,58,.08);border:1px solid rgba(26,107,58,.22);padding:4px 12px;border-radius:100px;margin-bottom:12px}
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

        .vp-cta-section{background:linear-gradient(135deg,#0a2d1a 0%,#1A6B3A 100%);padding:72px 0;text-align:center;position:relative;overflow:hidden}
        .vp-cta-section::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 60%,rgba(255,255,255,.08),transparent 70%)}
        .vp-cta-section .wrap{position:relative;max-width:720px;margin:0 auto;padding:0 24px}
        .vp-cta-section h2{font-size:clamp(1.7rem,3.5vw,2.4rem);font-weight:900;color:#fff;margin:0 0 14px}
        .vp-cta-section p{font-size:1rem;color:rgba(255,255,255,.8);margin:0 0 32px;line-height:1.7}
        .vp-btn-cta{background:#fff;color:#1A6B3A;box-shadow:0 6px 20px rgba(0,0,0,.15)}
        .vp-related{margin-top:40px;display:flex;gap:14px;justify-content:center;flex-wrap:wrap}
        .vp-related-link{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.25);color:rgba(255,255,255,.85);padding:9px 20px;border-radius:8px;font-size:.85rem;font-weight:600;text-decoration:none;transition:background .2s}
        .vp-related-link:hover{background:rgba(255,255,255,.22)}
      `}</style>

      {/* Hero */}
      <section className="vp-hero">
        <div className="wrap">
          <nav className="vp-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link><span>/</span>
            <Link href="/cotton-seed-bags">Cotton Seed Bags</Link><span>/</span>
            <span style={{color:'rgba(255,255,255,.8)'}}>{page.tag}</span>
          </nav>
          <div className="vp-tag">{page.tag}</div>
          <h1>{page.h1}</h1>
          <p>{page.subtitle}</p>
          <div className="vp-cta-group">
            <a href="/#contact" className="vp-btn vp-btn-primary">Get a Free Quote</a>
            <Link href="/cotton-seed-bags" className="vp-btn vp-btn-ghost">All Cotton Seed Bags</Link>
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
          <p>Standard specifications for reference. All parameters are customisable - contact our team to discuss your exact requirements.</p>
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
          <p>{page.tag} from Whizzpack serve a wide range of buyers across seed retail, organic farming, and sustainable brand packaging in the USA, UK, and beyond.</p>
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
          <h2>{page.ctaTitle}</h2>
          <p>
            Factory-direct from our Rajkot facility. Full export documentation, OEKO-TEX compliance, and GOTS certification available. Serving importers in the USA, UK, and worldwide.
          </p>
          <a href="/#contact" className="vp-btn vp-btn-cta" style={{display:'inline-flex',margin:'0 auto'}}>Request a Quote</a>
          <div className="vp-related">
            <Link href="/cotton-seed-bags" className="vp-related-link">All Cotton Seed Bags</Link>
            <Link href="/corrugated-boxes" className="vp-related-link">Corrugated Boxes</Link>
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
