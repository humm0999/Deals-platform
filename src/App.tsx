import React, { useState, useEffect } from 'react';
import {
  Product,
  Article,
  AdSenseConfig,
  AmazonApiConfig,
  SEOConfig,
  AnalyticsMetric,
  SiteSettings,
  ContactMessage,
  SocialMediaConfig
} from './types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ARTICLES,
  DEFAULT_ADSENSE_CONFIG,
  DEFAULT_AMAZON_CONFIG,
  DEFAULT_SEO_CONFIG,
  DEFAULT_SITE_SETTINGS,
  INITIAL_ANALYTICS,
  INITIAL_CONTACT_MESSAGES,
  DEFAULT_SOCIAL_CONFIG
} from './data/mockData';

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { NaturalLanguageSearch } from './components/NaturalLanguageSearch';
import { BuyingGuides } from './components/BuyingGuides';
import { CategoryGrid } from './components/CategoryGrid';
import { AdContainer } from './components/AdContainer';
import { CookieConsent } from './components/CookieConsent';
import { ComplianceModal } from './components/ComplianceModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LaunchChecklistModal } from './components/LaunchChecklistModal';
import { SocialShareModal } from './components/SocialShareModal';

import {
  ShieldCheck,
  Search,
  SlidersHorizontal,
  Layers,
  Sparkles,
  ShoppingBag,
  ExternalLink,
  CheckCircle2,
  BookOpen,
  X,
  Zap,
  ArrowUpRight
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'comparison' | 'guides' | 'admin'>('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [articles, setArticles] = useState<Article[]>(INITIAL_ARTICLES);

  const [amazonConfig, setAmazonConfig] = useState<AmazonApiConfig>(DEFAULT_AMAZON_CONFIG);
  const [adSenseConfig, setAdSenseConfig] = useState<AdSenseConfig>(DEFAULT_ADSENSE_CONFIG);
  const [seoConfig, setSeoConfig] = useState<SEOConfig>(DEFAULT_SEO_CONFIG);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(DEFAULT_SITE_SETTINGS);
  const [socialConfig, setSocialConfig] = useState<SocialMediaConfig>(DEFAULT_SOCIAL_CONFIG);
  const [analytics, setAnalytics] = useState<AnalyticsMetric>(INITIAL_ANALYTICS);
  const [contactMessages] = useState<ContactMessage[]>(INITIAL_CONTACT_MESSAGES);

  // Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null);

  // Modals & Overlays
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);
  const [comparedProducts, setComparedProducts] = useState<Product[]>([]);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [shareModalState, setShareModalState] = useState<{ isOpen: boolean; product?: Product | null; article?: Article | null }>({ isOpen: false });

  const [complianceDocKey, setComplianceDocKey] = useState<string | null>(null);
  const [showLaunchChecklist, setShowLaunchChecklist] = useState(false);

  // Filter products based on search, category, budget
  const filteredProducts = products.filter((p) => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedBudget !== null && p.currentPrice > selectedBudget) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const titleMatch = p.title.toLowerCase().includes(q);
      const brandMatch = p.brand.toLowerCase().includes(q);
      const featMatch = p.features.some(f => f.toLowerCase().includes(q));
      if (!titleMatch && !brandMatch && !featMatch) return false;
    }
    return true;
  });

  const handleToggleCompare = (product: Product) => {
    setComparedProducts((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      } else {
        if (prev.length >= 4) {
          alert('You can compare up to 4 products at a time in the side-by-side matrix.');
          return prev;
        }
        return [...prev, product];
      }
    });
  };

  const handleTrackClick = async (product: Product) => {
    try {
      await fetch('/api/analytics/track-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          title: product.title,
          trackingTag: amazonConfig.trackingId
        })
      });

      setAnalytics((prev) => ({
        ...prev,
        affiliateClicksCount: prev.affiliateClicksCount + 1,
        outboundClicksCount: prev.outboundClicksCount + 1
      }));
    } catch (err) {
      console.error('Click track error:', err);
    }
  };

  const handleDownloadSql = async () => {
    try {
      const res = await fetch('/api/database/sql');
      const text = await res.text();
      const blob = new Blob([text], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'database.sql';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      alert('Failed to download SQL schema script.');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-800 font-sans flex flex-col antialiased">
      {/* Sticky Header Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenSearchModal={() => setShowSearchModal(true)}
        onOpenCompliance={(docKey) => setComplianceDocKey(docKey)}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        comparisonCount={comparedProducts.length}
        amazonConfig={amazonConfig}
        siteSettings={siteSettings}
        onOpenLaunchChecklist={() => setShowLaunchChecklist(true)}
      />

      {/* Header Ad Unit Container (Google AdSense Slot 1) */}
      <div className="max-w-7xl mx-auto px-4 w-full pt-4">
        <AdContainer slot="header" config={adSenseConfig} />
      </div>

      {/* Main View Switcher */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-6">
        {activeTab === 'home' && (
          <div className="space-y-10">
            {/* High Converting Hero Section */}
            <Hero
              onOpenSearchModal={() => setShowSearchModal(true)}
              onSelectBudget={(price) => {
                setSelectedBudget(price);
                setSelectedCategory('all');
              }}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
              onOpenShareModal={() => setShareModalState({ isOpen: true, product: products[0] })}
            />

            {/* Popular Categories Grid */}
            <CategoryGrid
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => setSelectedCategory(catId)}
            />

            {/* In-Content Ad Container (Google AdSense Slot 2) */}
            <AdContainer slot="inContent" config={adSenseConfig} />

            {/* Products Section Header */}
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-50 text-blue-800 border border-blue-100 font-semibold text-xs px-2.5 py-0.5 rounded-full font-mono uppercase">
                      Amazon India Catalog
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      Showing {filteredProducts.length} Verified Products
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 mt-1">
                    Trending & Verified Amazon India Deals
                  </h2>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  {selectedBudget !== null && (
                    <button
                      onClick={() => setSelectedBudget(null)}
                      className="bg-blue-50 text-blue-800 border border-blue-200 font-medium px-3 py-1 rounded-full flex items-center gap-1"
                    >
                      <span>Max ₹{selectedBudget.toLocaleString('en-IN')}</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="bg-blue-50 text-blue-800 border border-blue-200 font-medium px-3 py-1 rounded-full flex items-center gap-1 capitalize"
                    >
                      <span>Category: {selectedCategory.replace('_', ' ')}</span>
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Products Cards Grid */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-sm">
                  No products matched your exact filter combination. Try resetting category or budget filters.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onSelectProduct={(p) => setSelectedProductDetail(p)}
                      onToggleCompare={handleToggleCompare}
                      isCompared={comparedProducts.some((c) => c.id === product.id)}
                      onTrackClick={handleTrackClick}
                      onShareProduct={(p) => setShareModalState({ isOpen: true, product: p })}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Quick Comparison Bar Floating Drawer Notice */}
            {comparedProducts.length > 0 && (
              <div className="sticky bottom-6 z-30 bg-slate-900 text-white p-4 rounded-xl shadow-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-3xl mx-auto">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center">
                    {comparedProducts.length}
                  </div>
                  <div>
                    <div className="font-semibold text-sm">Product Matrix Queue</div>
                    <div className="text-xs text-slate-400">Ready to compare side-by-side specifications</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setActiveTab('comparison')}
                    className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-5 py-2 rounded-lg text-xs flex items-center gap-1.5 shadow-xs transition-colors"
                  >
                    <Layers className="w-4 h-4" />
                    <span>View Matrix</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'comparison' && (
          <ComparisonMatrix
            products={comparedProducts}
            onRemoveFromCompare={(id) => setComparedProducts(prev => prev.filter(p => p.id !== id))}
            onClearCompare={() => setComparedProducts([])}
            onTrackClick={handleTrackClick}
            onSelectProduct={(p) => setSelectedProductDetail(p)}
          />
        )}

        {activeTab === 'guides' && (
          <BuyingGuides
            articles={articles}
            products={products}
            onSelectProduct={(p) => setSelectedProductDetail(p)}
            onTrackClick={handleTrackClick}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            products={products}
            setProducts={setProducts}
            articles={articles}
            setArticles={setArticles}
            amazonConfig={amazonConfig}
            setAmazonConfig={setAmazonConfig}
            adSenseConfig={adSenseConfig}
            setAdSenseConfig={setAdSenseConfig}
            seoConfig={seoConfig}
            setSeoConfig={setSeoConfig}
            siteSettings={siteSettings}
            setSiteSettings={setSiteSettings}
            socialConfig={socialConfig}
            setSocialConfig={setSocialConfig}
            analytics={analytics}
            contactMessages={contactMessages}
            onDownloadSql={handleDownloadSql}
          />
        )}
      </main>

      {/* Footer Ad Unit Container (Google AdSense Slot 5) */}
      <div className="max-w-7xl mx-auto px-4 w-full my-4">
        <AdContainer slot="footer" config={adSenseConfig} />
      </div>

      {/* Site Footer */}
      <footer className="bg-slate-900 text-white pt-12 pb-8 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Disclosure Highlight Box */}
          <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2 leading-relaxed font-mono">
            <div className="font-semibold text-blue-400 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              Required Amazon Associates Program Disclosure
            </div>
            <p>
              "{siteSettings.amazonDisclosureText}" Certain content that appears on this site comes from Amazon Services LLC. This content is provided 'as is' and is subject to change or removal at any time.
            </p>
          </div>

          {/* Social Channels & Traffic Partner Links Strip */}
          <div className="bg-slate-800/60 p-4 rounded-xl border border-slate-700/80 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-slate-200">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Official Social Channels & Ad Traffic Networks:</span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {socialConfig.channels.filter(c => c.enabled).map(c => (
                <a
                  key={c.id}
                  href={c.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-900 hover:bg-slate-950 text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5 text-[11px] font-semibold"
                >
                  <span className="uppercase text-[9px] font-mono text-amber-400 font-bold">{c.platform}</span>
                  <span>{c.name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              ))}
              <button
                onClick={() => setShareModalState({ isOpen: true, product: products[0] })}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
              >
                Broadcast Deals & Ads
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-xs text-slate-400 pt-4 border-t border-slate-800">
            {/* About */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 font-bold text-white text-base">
                <span className="text-red-500">Deals</span>Platform
              </div>
              <p className="leading-relaxed">
                Premier Amazon India product discovery and research platform providing side-by-side spec comparison matrices and buying guides.
              </p>
              <div className="text-[11px] text-slate-500 font-mono">
                Marketplace: Amazon.in | Tag: {amazonConfig.trackingId}
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <div className="font-semibold text-white text-xs uppercase tracking-wider mb-2">Main Navigation</div>
              <ul className="space-y-1.5">
                <li><button onClick={() => setActiveTab('home')} className="hover:text-blue-400 transition-colors">Products & Deals</button></li>
                <li><button onClick={() => setActiveTab('comparison')} className="hover:text-blue-400 transition-colors">Comparison Matrix</button></li>
                <li><button onClick={() => setActiveTab('guides')} className="hover:text-blue-400 transition-colors">Buying Guides & Reviews</button></li>
                <li><button onClick={() => setActiveTab('admin')} className="hover:text-blue-400 transition-colors">Admin Studio</button></li>
              </ul>
            </div>

            {/* Compliance */}
            <div className="space-y-2">
              <div className="font-semibold text-white text-xs uppercase tracking-wider mb-2">Legal & Compliance</div>
              <ul className="space-y-1.5">
                <li><button onClick={() => setComplianceDocKey('amazon-disclosure')} className="hover:text-blue-400 transition-colors">Amazon Associates Disclosure</button></li>
                <li><button onClick={() => setComplianceDocKey('privacy')} className="hover:text-blue-400 transition-colors">Privacy Policy</button></li>
                <li><button onClick={() => setComplianceDocKey('cookie-policy')} className="hover:text-blue-400 transition-colors">Cookie Policy</button></li>
                <li><button onClick={() => setComplianceDocKey('terms')} className="hover:text-blue-400 transition-colors">Terms & Conditions</button></li>
                <li><button onClick={() => setComplianceDocKey('disclaimer')} className="hover:text-blue-400 transition-colors">Earnings Disclaimer</button></li>
              </ul>
            </div>

            {/* Support */}
            <div className="space-y-2">
              <div className="font-semibold text-white text-xs uppercase tracking-wider mb-2">Contact & Setup</div>
              <ul className="space-y-1.5">
                <li><button onClick={() => setComplianceDocKey('about-us')} className="hover:text-blue-400 transition-colors">About Us</button></li>
                <li><button onClick={() => setComplianceDocKey('contact-us')} className="hover:text-blue-400 transition-colors">Contact Us</button></li>
                <li><button onClick={() => setShowLaunchChecklist(true)} className="hover:text-blue-300 font-semibold text-blue-400 transition-colors">Launch & Setup Checklist</button></li>
                <li><button onClick={handleDownloadSql} className="hover:text-blue-400 font-mono text-[11px] transition-colors">Download database.sql</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 font-mono gap-2">
            <div>{siteSettings.copyrightText}</div>
            <div>Designed for Amazon India Associates & Google AdSense Monetization</div>
          </div>
        </div>
      </footer>

      {/* Floating Search Modal */}
      {showSearchModal && (
        <NaturalLanguageSearch
          products={products}
          onSelectProduct={(p) => {
            setSelectedProductDetail(p);
            setShowSearchModal(false);
          }}
          onToggleCompare={handleToggleCompare}
          comparedProductIds={comparedProducts.map((c) => c.id)}
          onTrackClick={handleTrackClick}
          onClose={() => setShowSearchModal(false)}
        />
      )}

      {/* Product Detail Modal */}
      {selectedProductDetail && (
        <ProductDetailModal
          product={selectedProductDetail}
          onClose={() => setSelectedProductDetail(null)}
          onTrackClick={handleTrackClick}
          onToggleCompare={handleToggleCompare}
          isCompared={comparedProducts.some((c) => c.id === selectedProductDetail.id)}
          onShareProduct={(p) => setShareModalState({ isOpen: true, product: p })}
        />
      )}

      {/* Social & Traffic Channel Broadcast Modal */}
      <SocialShareModal
        isOpen={shareModalState.isOpen}
        onClose={() => setShareModalState({ isOpen: false })}
        product={shareModalState.product}
        article={shareModalState.article}
        trackingId={amazonConfig.trackingId}
        socialConfig={socialConfig}
      />

      {/* Compliance / Policy Viewer Modal */}
      {complianceDocKey && (
        <ComplianceModal
          initialDocKey={complianceDocKey}
          onClose={() => setComplianceDocKey(null)}
          siteSettings={siteSettings}
        />
      )}

      {/* Launch & Setup Checklist Modal */}
      {showLaunchChecklist && (
        <LaunchChecklistModal
          onClose={() => setShowLaunchChecklist(false)}
          onDownloadSql={handleDownloadSql}
        />
      )}

      {/* GDPR / Cookie Consent Popup */}
      <CookieConsent onOpenCompliance={(docKey) => setComplianceDocKey(docKey)} />
    </div>
  );
}
