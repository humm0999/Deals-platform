import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { INITIAL_PRODUCTS, INITIAL_ARTICLES, DEFAULT_ADSENSE_CONFIG, DEFAULT_AMAZON_CONFIG } from './src/data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;

// Initialize Gemini Client safely on the server side
let ai: GoogleGenAI | null = null;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build'
      }
    }
  });
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // In-memory runtime data store for backend state
  let products = [...INITIAL_PRODUCTS];
  let articles = [...INITIAL_ARTICLES];
  let amazonConfig = { ...DEFAULT_AMAZON_CONFIG };
  let adSenseConfig = { ...DEFAULT_ADSENSE_CONFIG };
  let analyticsStats = {
    totalClicks: 1970,
    outboundClicks: 2310,
    topSearches: ['laptop under 50000', 'headphones under 2000', 'phone for students']
  };

  // -------------------------------------------------------------
  // API ROUTES
  // -------------------------------------------------------------

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'Amazon India Affiliate & AdSense Hub',
      time: new Date().toISOString(),
      hasGeminiKey: !!process.env.GEMINI_API_KEY
    });
  });

  // Get all products / filtered
  app.get('/api/products', (req, res) => {
    const { category, maxPrice, search, tag } = req.query;
    let filtered = [...products];

    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category === category);
    }

    if (maxPrice && !isNaN(Number(maxPrice))) {
      const budget = Number(maxPrice);
      filtered = filtered.filter(p => p.currentPrice <= budget);
    }

    if (tag) {
      filtered = filtered.filter(p => p.tags.includes(String(tag)));
    }

    if (search) {
      const q = String(search).toLowerCase();
      filtered = filtered.filter(
        p =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.features.some(f => f.toLowerCase().includes(q))
      );
    }

    res.json({ success: true, count: filtered.length, products: filtered });
  });

  // Track affiliate link clicks
  app.post('/api/analytics/track-click', (req, res) => {
    const { productId, title, trackingTag } = req.body;
    analyticsStats.totalClicks += 1;
    analyticsStats.outboundClicks += 1;
    console.log(`[Affiliate Click] Product: ${title} (${productId}) using Tag: ${trackingTag || amazonConfig.trackingId}`);
    res.json({ success: true, totalClicks: analyticsStats.totalClicks });
  });

  // Parse natural language search intent using Gemini AI
  app.post('/api/ai/parse-intent', async (req, res) => {
    const { query } = req.body;
    if (!query || typeof query !== 'string') {
      return res.status(400).json({ error: 'Query is required' });
    }

    if (!ai) {
      // Fallback keyword parser if Gemini API key is not present
      const q = query.toLowerCase();
      let extractedCategory = 'all';
      if (q.includes('laptop') || q.includes('macbook') || q.includes('computer')) extractedCategory = 'laptops';
      else if (q.includes('headphone') || q.includes('earbud') || q.includes('boat') || q.includes('sony')) extractedCategory = 'mobile_accessories';
      else if (q.includes('phone') || q.includes('mobile') || q.includes('oneplus')) extractedCategory = 'electronics';
      else if (q.includes('cooker') || q.includes('kitchen')) extractedCategory = 'kitchen';

      let maxBudget = undefined;
      const budgetMatch = q.match(/under\s*₹?\s*(\d+)/i) || q.match(/below\s*₹?\s*(\d+)/i);
      if (budgetMatch) {
        maxBudget = parseInt(budgetMatch[1], 10);
      }

      return res.json({
        success: true,
        intent: {
          query,
          extractedCategory,
          maxBudget,
          targetAudience: q.includes('student') ? 'Students' : 'General Buyers',
          matchedTags: q.includes('student') ? ['student'] : [],
          keywords: q.split(' ').filter(w => w.length > 3)
        }
      });
    }

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: `Analyze this user product shopping search query in India and extract structural parameters in JSON format: "${query}".
Categories available: 'laptops', 'mobile_accessories', 'electronics', 'home_appliances', 'kitchen', 'fitness', 'gaming', 'fashion', 'beauty', 'books', 'office', 'travel'.
Tags available: 'student', 'budget', 'value', 'gaming', 'overall', 'premium'.`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              extractedCategory: { type: Type.STRING },
              maxBudget: { type: Type.NUMBER, description: 'Budget limit in Indian Rupees (INR) if mentioned' },
              targetAudience: { type: Type.STRING },
              matchedTags: { type: Type.ARRAY, items: { type: Type.STRING } },
              keywords: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['extractedCategory', 'matchedTags', 'keywords']
          }
        }
      });

      const parsed = JSON.parse(response.text || '{}');
      res.json({
        success: true,
        intent: {
          query,
          extractedCategory: parsed.extractedCategory || 'all',
          maxBudget: parsed.maxBudget || undefined,
          targetAudience: parsed.targetAudience || 'General Shoppers',
          matchedTags: parsed.matchedTags || [],
          keywords: parsed.keywords || []
        }
      });
    } catch (err: any) {
      console.error('Gemini intent parse error:', err.message);
      res.status(500).json({ error: 'Failed to analyze search intent', details: err.message });
    }
  });

  // Generate AI editorial content draft (Product review, buying guide, comparison, or FAQs)
  app.post('/api/ai/generate-draft', async (req, res) => {
    const { contentType, titleTopic, category, targetKeywords } = req.body;

    if (!ai) {
      return res.status(400).json({
        error: 'Gemini API key is not configured. Please add GEMINI_API_KEY in Secrets.'
      });
    }

    try {
      const systemPrompt = `You are a professional tech & product editor for an Amazon India affiliate research platform.
Generate a high quality, SEO-friendly, non-spammy ${contentType || 'buying guide'} article draft for India market.
Topic: "${titleTopic}". Category: "${category}". Target Keywords: "${targetKeywords || 'Amazon India deals'}".
IMPORTANT REQUIREMENTS:
- Do NOT generate fake personal expert testimonials or fake ratings.
- Include a neutral Amazon Associate compliance statement: "As an Amazon Associate I earn from qualifying purchases."
- Write helpful buying factors, technical specs to check, who should buy vs who should avoid.
- Include 2-3 FAQs with clean answers.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: systemPrompt,
        config: {
          temperature: 0.7
        }
      });

      const draftContent = response.text;
      const slug = (titleTopic || 'article-draft')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');

      const newArticle = {
        id: 'art-' + Date.now(),
        title: titleTopic,
        slug,
        type: contentType || 'buying_guide',
        category: category || 'electronics',
        summary: `Comprehensive research guide on ${titleTopic} for Indian buyers.`,
        content: draftContent,
        author: 'AI Editorial Assistant (Pending Human Review)',
        publishedAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0],
        status: 'draft',
        featuredImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
        relatedProductIds: ['prod-1', 'prod-2'],
        readTimeMinutes: 5,
        seoTitle: `${titleTopic} | India Buying Guide`,
        seoMetaDescription: `Read our editorial guide on ${titleTopic}. Features buying tips, specifications comparison, and current price options on Amazon India.`
      };

      articles.unshift(newArticle as any);

      res.json({
        success: true,
        message: 'AI draft generated successfully! Sent to Editorial Review Studio.',
        article: newArticle
      });
    } catch (err: any) {
      console.error('Gemini Draft Generation Error:', err.message);
      res.status(500).json({ error: 'Failed to generate AI content draft', details: err.message });
    }
  });

  // Amazon PA-API Sync endpoint (Simulated backend job)
  app.post('/api/amazon/sync', (req, res) => {
    const now = new Date().toISOString();
    amazonConfig.lastSyncTime = now;
    amazonConfig.apiConnected = true;

    // Refresh stock timestamps for products
    products = products.map(p => ({
      ...p,
      lastUpdated: 'Updated ' + new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' via Amazon PA-API'
    }));

    res.json({
      success: true,
      message: 'Amazon India Product Advertising API sync completed successfully!',
      syncedCount: products.length,
      lastSyncTime: now
    });
  });

  // Save Settings
  app.post('/api/settings/amazon', (req, res) => {
    amazonConfig = { ...amazonConfig, ...req.body };
    res.json({ success: true, message: 'Amazon API configuration updated', config: amazonConfig });
  });

  app.post('/api/settings/adsense', (req, res) => {
    adSenseConfig = { ...adSenseConfig, ...req.body };
    res.json({ success: true, message: 'Google AdSense settings updated', config: adSenseConfig });
  });

  // Dynamic Dynamic XML Sitemap for SEO Crawlers
  app.get('/sitemap.xml', (req, res) => {
    res.header('Content-Type', 'application/xml');
    const baseUrl = process.env.APP_URL || 'https://indiafinds.in';
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  ${products
    .map(
      p => `  <url>
    <loc>${baseUrl}/product/${p.asin}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('\n')}
  ${articles
    .map(
      a => `  <url>
    <loc>${baseUrl}/article/${a.slug}</loc>
    <lastmod>${a.updatedAt}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
    )
    .join('\n')}
</urlset>`;
    res.send(xml);
  });

  // Dynamic robots.txt
  app.get('/robots.txt', (req, res) => {
    res.header('Content-Type', 'text/plain');
    const baseUrl = process.env.APP_URL || 'https://indiafinds.in';
    res.send(`User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`);
  });

  // MySQL Database Schema Exporter endpoint for cPanel migration
  app.get('/api/database/sql', (req, res) => {
    const sqlScript = `-- MySQL Database Schema for Amazon Affiliate & AdSense Website
-- Compatible with MySQL 8.0+ / MariaDB 10.4+ on PHP Shared Hosting / cPanel

CREATE DATABASE IF NOT EXISTS \`affiliate_discovery_db\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE \`affiliate_discovery_db\`;

-- 1. Users Table
CREATE TABLE IF NOT EXISTS \`users\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`username\` VARCHAR(50) NOT NULL UNIQUE,
  \`email\` VARCHAR(100) NOT NULL UNIQUE,
  \`password_hash\` VARCHAR(255) NOT NULL,
  \`role\` ENUM('admin', 'editor') DEFAULT 'admin',
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Categories Table
CREATE TABLE IF NOT EXISTS \`categories\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`name\` VARCHAR(100) NOT NULL,
  \`slug\` VARCHAR(100) NOT NULL UNIQUE,
  \`description\` TEXT,
  \`icon\` VARCHAR(50) DEFAULT 'Tag'
) ENGINE=InnoDB;

-- 3. Products Table
CREATE TABLE IF NOT EXISTS \`products\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`asin\` VARCHAR(20) NOT NULL UNIQUE,
  \`title\` VARCHAR(255) NOT NULL,
  \`category_id\` VARCHAR(50),
  \`brand\` VARCHAR(100),
  \`current_price\` DECIMAL(10,2) NOT NULL,
  \`original_price\` DECIMAL(10,2),
  \`currency\` VARCHAR(10) DEFAULT '₹',
  \`rating\` DECIMAL(3,2) DEFAULT 0.00,
  \`review_count\` INT DEFAULT 0,
  \`is_available\` TINYINT(1) DEFAULT 1,
  \`target_audience\` TEXT,
  \`who_should_avoid\` TEXT,
  \`best_for\` VARCHAR(255),
  \`affiliate_url\` TEXT NOT NULL,
  \`last_updated\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 4. Product Features & Specs
CREATE TABLE IF NOT EXISTS \`product_attributes\` (
  \`id\` INT AUTO_INCREMENT PRIMARY KEY,
  \`product_id\` VARCHAR(50) NOT NULL,
  \`attribute_type\` ENUM('feature', 'spec_key', 'pro', 'con', 'buying_consideration', 'tag'),
  \`attr_key\` VARCHAR(100),
  \`attr_value\` TEXT NOT NULL,
  FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 5. Articles & Buying Guides
CREATE TABLE IF NOT EXISTS \`articles\` (
  \`id\` VARCHAR(50) PRIMARY KEY,
  \`title\` VARCHAR(255) NOT NULL,
  \`slug\` VARCHAR(255) NOT NULL UNIQUE,
  \`type\` ENUM('review', 'buying_guide', 'comparison', 'how_to', 'faq') NOT NULL,
  \`category_id\` VARCHAR(50),
  \`summary\` TEXT,
  \`content\` LONGTEXT NOT NULL,
  \`author\` VARCHAR(100) DEFAULT 'Editorial Team',
  \`status\` ENUM('draft', 'reviewed', 'published') DEFAULT 'draft',
  \`featured_image\` VARCHAR(255),
  \`published_at\` DATE,
  \`seo_title\` VARCHAR(255),
  \`seo_meta_description\` TEXT,
  FOREIGN KEY (\`category_id\`) REFERENCES \`categories\`(\`id\`) ON DELETE SET NULL
) ENGINE=InnoDB;

-- 6. Affiliate Clicks Analytics Log
CREATE TABLE IF NOT EXISTS \`affiliate_clicks\` (
  \`id\` BIGINT AUTO_INCREMENT PRIMARY KEY,
  \`product_id\` VARCHAR(50),
  \`tracking_tag\` VARCHAR(50),
  \`ip_address\` VARCHAR(45),
  \`user_agent\` VARCHAR(255),
  \`clicked_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 7. Settings Table (Amazon API & AdSense config)
CREATE TABLE IF NOT EXISTS \`site_settings\` (
  \`setting_key\` VARCHAR(100) PRIMARY KEY,
  \`setting_value\` LONGTEXT NOT NULL,
  \`updated_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Seed Default Settings
INSERT INTO \`site_settings\` (\`setting_key\`, \`setting_value\`) VALUES
('amazon_tracking_id', 'indiafinds-21'),
('amazon_marketplace', 'India'),
('adsense_publisher_id', 'ca-pub-0000000000000000'),
('amazon_disclosure', 'As an Amazon Associate I earn from qualifying purchases.')
ON DUPLICATE KEY UPDATE \`setting_value\`=\`setting_value\`;
`;
    res.header('Content-Type', 'text/plain');
    res.send(sqlScript);
  });

  // -------------------------------------------------------------
  // VITE & PRODUCTION STATIC SERVING
  // -------------------------------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Amazon India Affiliate Discovery Platform listening on http://0.0.0.0:${PORT}`);
  });
}

startServer();
