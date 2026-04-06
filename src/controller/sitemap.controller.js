const env = require("../config/env");
const faqsModel = require("../models/faqs.model");

class Sitemaps {
  async getSitemaps(req, res) {
    const base = env().URL;

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <sitemap>
    <loc>${base}/sitemaps-faqs.xml</loc>
    </sitemap>
    <sitemap>
    <loc>${base}/sitemaps-pages.xml</loc>
    </sitemap>
    </sitemapindex>
    `;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  }
  async getFaqsSitemaps(req, res) {
    const config = env();
    let faqs = await faqsModel.readAll();

    let xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">;`;

    faqs.forEach((faq) => {
      xml += `
      <url>
        <loc>${config.URL}/faqs/${faq.slug}_${faq.id}</loc>
        <lastmod>${faq.created_at}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
      </url>
      `;
    });

    xml += `</urlset>`;

    res.header("Content-Type", "application/xml");
    res.send(xml);
  }
}

module.exports = new Sitemaps();
