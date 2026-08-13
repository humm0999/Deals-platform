import React, { useState } from 'react';
import {
  Product,
  Article,
  AdSenseConfig,
  AmazonApiConfig,
  SEOConfig,
  AnalyticsMetric,
  SiteSettings,
  ContactMessage,
  SocialMediaConfig,
  SocialChannel
} from '../types';
import {
  LayoutDashboard,
  ShoppingBag,
  Sparkles,
  DollarSign,
  Key,
  Search,
  Settings,
  Mail,
  RefreshCw,
  Plus,
  Trash2,
  Edit,
  CheckCircle2,
  FileCode,
  ShieldCheck,
  TrendingUp,
  Download,
  Eye,
  Send,
  Zap,
  Server,
  X,
  Share2,
  Globe,
  Copy,
  Check,
  MessageCircle,
  ExternalLink
} from 'lucide-react';

interface AdminDashboardProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  articles: Article[];
  setArticles: React.Dispatch<React.SetStateAction<Article[]>>;
  amazonConfig: AmazonApiConfig;
  setAmazonConfig: React.Dispatch<React.SetStateAction<AmazonApiConfig>>;
  adSenseConfig: AdSenseConfig;
  setAdSenseConfig: React.Dispatch<React.SetStateAction<AdSenseConfig>>;
  seoConfig: SEOConfig;
  setSeoConfig: React.Dispatch<React.SetStateAction<SEOConfig>>;
  siteSettings: SiteSettings;
  setSiteSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
  socialConfig?: SocialMediaConfig;
  setSocialConfig?: React.Dispatch<React.SetStateAction<SocialMediaConfig>>;
  analytics: AnalyticsMetric;
  contactMessages: ContactMessage[];
  onDownloadSql: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  setProducts,
  articles,
  setArticles,
  amazonConfig,
  setAmazonConfig,
  adSenseConfig,
  setAdSenseConfig,
  seoConfig,
  setSeoConfig,
  siteSettings,
  setSiteSettings,
  socialConfig,
  setSocialConfig,
  analytics,
  contactMessages,
  onDownloadSql
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'social-traffic' | 'ai-studio' | 'amazon-api' | 'adsense' | 'seo' | 'cpanel-export'>('overview');

  // Broadcast Deal State
  const [broadcastProdId, setBroadcastProdId] = useState<string>(products[0]?.id || '');
  const [broadcastChannelId, setBroadcastChannelId] = useState<string>('soc-1');
  const [broadcastUtmSource, setBroadcastUtmSource] = useState<string>('telegram_deals');
  const [broadcastCopied, setBroadcastCopied] = useState(false);

  // New Social Channel State
  const [newChannel, setNewChannel] = useState<{
    name: string;
    platform: 'telegram' | 'whatsapp' | 'facebook' | 'instagram' | 'youtube' | 'twitter' | 'website';
    url: string;
    membersCount: string;
    description: string;
    isTrafficPartner: boolean;
  }>({
    name: '',
    platform: 'telegram',
    url: '',
    membersCount: '1,000+ Members',
    description: '',
    isTrafficPartner: false
  });

  // AI Content Generator Form State
  const [aiTopic, setAiTopic] = useState('');
  const [aiCategory, setAiCategory] = useState('laptops');
  const [aiType, setAiType] = useState<'review' | 'buying_guide' | 'comparison' | 'faq'>('buying_guide');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiStatusMsg, setAiStatusMsg] = useState('');

  // Amazon API Sync state
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncStatusMsg, setSyncStatusMsg] = useState('');

  // New Product Modal Form State
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProd, setNewProd] = useState({
    title: '',
    asin: '',
    category: 'laptops',
    brand: '',
    currentPrice: 25000,
    originalPrice: 30000,
    rating: 4.5,
    reviewCount: 500,
    features: ['12th Gen Intel Processor', 'FHD Display'],
    targetAudience: 'College Students and Office Workers'
  });

  const handleTriggerAmazonSync = async () => {
    setIsSyncing(true);
    setSyncStatusMsg('');
    try {
      const res = await fetch('/api/amazon/sync', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setAmazonConfig(prev => ({
          ...prev,
          lastSyncTime: data.lastSyncTime,
          apiConnected: true
        }));
        setSyncStatusMsg('Amazon India PA-API sync successful! Product stock and pricing timestamps refreshed.');
      }
    } catch (err) {
      setSyncStatusMsg('Failed to run Amazon PA-API sync.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleGenerateAiDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim()) return;

    setAiLoading(true);
    setAiStatusMsg('');

    try {
      const res = await fetch('/api/ai/generate-draft', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType: aiType,
          titleTopic: aiTopic,
          category: aiCategory
        })
      });

      const data = await res.json();
      if (data.success && data.article) {
        setArticles(prev => [data.article, ...prev]);
        setAiStatusMsg(`Success! Draft "${data.article.title}" generated and added to Editorial Review.`);
        setAiTopic('');
      } else {
        setAiStatusMsg(data.error || 'Failed to generate AI draft.');
      }
    } catch (err: any) {
      setAiStatusMsg('Error executing Gemini API: ' + err.message);
    } finally {
      setAiLoading(false);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: Product = {
      id: 'prod-' + Date.now(),
      asin: newProd.asin.toUpperCase() || 'B0' + Math.floor(Math.random() * 10000000),
      title: newProd.title,
      category: newProd.category,
      brand: newProd.brand || 'Generic Brand',
      currentPrice: Number(newProd.currentPrice),
      originalPrice: Number(newProd.originalPrice),
      currency: '₹',
      rating: Number(newProd.rating),
      reviewCount: Number(newProd.reviewCount),
      isAvailable: true,
      images: ['https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80'],
      features: newProd.features,
      specs: { 'Brand': newProd.brand, 'Category': newProd.category },
      pros: ['Great price to value ratio', 'Verified seller on Amazon India'],
      cons: ['Limited color availability'],
      targetAudience: newProd.targetAudience,
      whoShouldAvoid: 'Users wanting high-end professional workstations',
      buyingConsiderations: ['Check bank discount deals on Amazon.in'],
      tags: ['budget', 'value'],
      bestFor: `Best ${newProd.brand} ${newProd.category}`,
      lastUpdated: 'Just now (Admin added)',
      affiliateUrl: `https://www.amazon.in/dp/${newProd.asin || 'B0CHX1W2JK'}?tag=${amazonConfig.trackingId}`
    };

    setProducts([created, ...products]);
    setShowAddProduct(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 my-8 shadow-2xl border border-slate-800">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <LayoutDashboard className="w-4 h-4" />
            <span>Site Administrator Studio & Analytics Hub</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black mt-1">
            Amazon India & AdSense Management Panel
          </h2>
        </div>

        {/* Quick Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleTriggerAmazonSync}
            disabled={isSyncing}
            className="bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 border border-slate-700 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>PA-API Sync</span>
          </button>

          <button
            onClick={onDownloadSql}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-md transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>cPanel SQL</span>
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex items-center gap-2 my-6 overflow-x-auto pb-2 border-b border-slate-800 no-scrollbar text-xs font-semibold">
        {[
          { id: 'overview', label: 'Analytics Overview', icon: TrendingUp },
          { id: 'products', label: `Products (${products.length})`, icon: ShoppingBag },
          { id: 'social-traffic', label: 'Social & Traffic Channels', icon: Share2 },
          { id: 'ai-studio', label: 'AI Content Generator (Gemini)', icon: Sparkles },
          { id: 'amazon-api', label: 'Amazon API Settings', icon: Key },
          { id: 'adsense', label: 'Google AdSense', icon: DollarSign },
          { id: 'seo', label: 'SEO & Sitemap', icon: Search },
          { id: 'cpanel-export', label: 'cPanel / Shared Hosting Guide', icon: Server }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-xl font-bold transition-all flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
              <div className="text-slate-400 text-xs font-medium">Total Monthly Traffic</div>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {analytics.totalVisitors.toLocaleString('en-IN')} Visitors
              </div>
              <p className="text-[10px] text-emerald-400 mt-1">✓ Organic Search Traffic</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
              <div className="text-slate-400 text-xs font-medium">Affiliate Outbound Clicks</div>
              <div className="text-2xl font-black text-emerald-400 mt-1">
                {analytics.affiliateClicksCount.toLocaleString('en-IN')} Clicks
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Tracking Tag: {amazonConfig.trackingId}</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
              <div className="text-slate-400 text-xs font-medium">Est. Affiliate Earnings (INR)</div>
              <div className="text-2xl font-black text-amber-400 mt-1">
                ₹{analytics.estimatedAffiliateRevenue.toLocaleString('en-IN')}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">*Based on qualifying purchases</p>
            </div>

            <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
              <div className="text-slate-400 text-xs font-medium">Est. AdSense Revenue</div>
              <div className="text-2xl font-black text-orange-400 mt-1">
                ₹{analytics.estimatedAdSenseRevenue.toLocaleString('en-IN')}
              </div>
              <p className="text-[10px] text-slate-400 mt-1">Publisher ID: {adSenseConfig.publisherId.slice(0, 10)}...</p>
            </div>
          </div>

          {/* Activity Logs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <h3 className="font-bold text-sm text-slate-200">Top Performing Products</h3>
              <div className="space-y-2 text-xs">
                {analytics.topProducts.map((tp, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl">
                    <span className="font-medium text-slate-300 truncate max-w-[240px]">{tp.title}</span>
                    <span className="font-mono text-emerald-400 font-bold">{tp.clicks} clicks</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-800/50 p-5 rounded-2xl border border-slate-700/80 space-y-3">
              <h3 className="font-bold text-sm text-slate-200">Recent Click Stream Logs</h3>
              <div className="space-y-2 text-xs">
                {analytics.recentClicks.map((rc, i) => (
                  <div key={i} className="flex items-center justify-between p-2.5 bg-slate-900/60 rounded-xl">
                    <span className="text-slate-300 truncate max-w-[200px]">{rc.productTitle}</span>
                    <span className="text-slate-500 font-mono text-[10px]">{rc.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: PRODUCTS MANAGER */}
      {activeTab === 'products' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg text-amber-400">Manage Amazon India Product Catalog</h3>
            <button
              onClick={() => setShowAddProduct(true)}
              className="bg-amber-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Product</span>
            </button>
          </div>

          {syncStatusMsg && (
            <div className="bg-emerald-950/80 border border-emerald-700 text-emerald-200 p-3 rounded-xl text-xs">
              {syncStatusMsg}
            </div>
          )}

          {/* Products List Table */}
          <div className="bg-slate-800 rounded-2xl border border-slate-700 overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[11px]">
                <tr>
                  <th className="p-3">ASIN / Product</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price (INR)</th>
                  <th className="p-3">Rating</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700 text-slate-300">
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="p-3 flex items-center gap-3">
                      <img src={p.images[0]} alt="" className="w-10 h-10 object-contain rounded bg-slate-900 p-1" />
                      <div>
                        <div className="font-bold text-slate-100 line-clamp-1">{p.title}</div>
                        <div className="text-[10px] font-mono text-amber-400">ASIN: {p.asin}</div>
                      </div>
                    </td>
                    <td className="p-3 capitalize">{p.category}</td>
                    <td className="p-3 font-mono font-bold text-white">₹{p.currentPrice.toLocaleString('en-IN')}</td>
                    <td className="p-3 text-amber-400 font-bold">★ {p.rating}</td>
                    <td className="p-3">
                      <span className="bg-emerald-900/60 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-700">
                        Active
                      </span>
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-700 rounded transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Add Product Modal */}
          {showAddProduct && (
            <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
              <div className="bg-slate-900 border border-slate-700 p-6 rounded-3xl max-w-lg w-full space-y-4 text-xs">
                <div className="flex justify-between items-center text-amber-400 font-bold text-sm">
                  <span>Add Product to Amazon Catalog</span>
                  <button onClick={() => setShowAddProduct(false)}><X className="w-5 h-5 text-slate-400" /></button>
                </div>

                <form onSubmit={handleCreateProduct} className="space-y-3">
                  <div>
                    <label className="block text-slate-300 mb-1 font-bold">Product Title</label>
                    <input
                      type="text"
                      required
                      value={newProd.title}
                      onChange={e => setNewProd({ ...newProd, title: e.target.value })}
                      placeholder="e.g. Sony WH-1000XM5 Noise Cancelling Headphones"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">Amazon ASIN</label>
                      <input
                        type="text"
                        required
                        value={newProd.asin}
                        onChange={e => setNewProd({ ...newProd, asin: e.target.value })}
                        placeholder="e.g. B0CHX1W2JK"
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">Category</label>
                      <select
                        value={newProd.category}
                        onChange={e => setNewProd({ ...newProd, category: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                      >
                        <option value="laptops">Laptops</option>
                        <option value="mobile_accessories">Mobile Accessories</option>
                        <option value="electronics">Electronics</option>
                        <option value="kitchen">Kitchen</option>
                        <option value="fitness">Fitness</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">Price (₹)</label>
                      <input
                        type="number"
                        value={newProd.currentPrice}
                        onChange={e => setNewProd({ ...newProd, currentPrice: Number(e.target.value) })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-slate-300 mb-1 font-bold">Brand Name</label>
                      <input
                        type="text"
                        value={newProd.brand}
                        onChange={e => setNewProd({ ...newProd, brand: e.target.value })}
                        className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-white"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 rounded-xl transition-colors mt-2"
                  >
                    Save Product to Catalog
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB: SOCIAL CHANNELS & TRAFFIC AD NETWORK */}
      {activeTab === 'social-traffic' && (
        <div className="space-y-8">
          {/* Top Banner */}
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700/80 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Share2 className="w-5 h-5" />
              <span>Social Media Channels & External Traffic Network Hub</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Broadcast your Amazon India products, deal alerts, and buying guides directly to your official Telegram deals channel, WhatsApp groups, Facebook pages, and partner traffic sites.
            </p>
          </div>

          {/* SECTION 1: ONE-CLICK DEAL & AD BROADCAST STUDIO */}
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-6">
            <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>1-Click Deal & Ad Broadcast Generator</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Select Product / Deal</label>
                <select
                  value={broadcastProdId}
                  onChange={e => setBroadcastProdId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-medium"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.brand} - {p.title.slice(0, 45)}... (₹{p.currentPrice.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Traffic Channel</label>
                <select
                  value={broadcastChannelId}
                  onChange={e => {
                    setBroadcastChannelId(e.target.value);
                    const sel = socialConfig?.channels.find(c => c.id === e.target.value);
                    if (sel) {
                      setBroadcastUtmSource(sel.platform + '_campaign');
                    }
                  }}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-medium"
                >
                  {(socialConfig?.channels || []).map(ch => (
                    <option key={ch.id} value={ch.id}>
                      {ch.name} ({ch.platform.toUpperCase()})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">UTM Source Tag</label>
                <input
                  type="text"
                  value={broadcastUtmSource}
                  onChange={e => setBroadcastUtmSource(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-100 font-mono"
                  placeholder="e.g. telegram_broadcast"
                />
              </div>
            </div>

            {/* Generated Post Box */}
            {(() => {
              const selectedProd = products.find(p => p.id === broadcastProdId) || products[0];
              const selectedChannel = socialConfig?.channels.find(c => c.id === broadcastChannelId);

              if (!selectedProd) return null;

              const trackedUrl = `${selectedProd.affiliateUrl}&utm_source=${broadcastUtmSource}&utm_medium=social_ad`;
              const discountText = selectedProd.discountPercentage ? `${selectedProd.discountPercentage}% OFF` : '';

              const formattedMessage = `🔥 AMAZON INDIA DEAL ALERT 🔥\n\n📌 ${selectedProd.title}\n\n💰 Offer Price: ₹${selectedProd.currentPrice.toLocaleString('en-IN')} (Original: ₹${selectedProd.originalPrice.toLocaleString('en-IN')})\n${discountText ? `⚡ Discount: ${discountText}\n` : ''}\n✨ Highlights:\n• ${selectedProd.features.slice(0, 3).join('\n• ')}\n\n🛒 Order on Amazon India:\n${trackedUrl}\n\n🏷️ Associate Tag: ${amazonConfig.trackingId}`;

              const handleCopyPost = () => {
                navigator.clipboard.writeText(formattedMessage);
                setBroadcastCopied(true);
                setTimeout(() => setBroadcastCopied(false), 2000);
              };

              return (
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Live Ad Copy Preview for {selectedChannel?.name || 'Social Channel'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={handleCopyPost}
                        className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors"
                      >
                        {broadcastCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{broadcastCopied ? 'Copied Post!' : 'Copy Post Text'}</span>
                      </button>

                      {selectedChannel?.url && (
                        <a
                          href={selectedChannel.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 border border-slate-700 transition-colors"
                        >
                          <span>Open Channel</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <textarea
                    readOnly
                    value={formattedMessage}
                    rows={6}
                    className="w-full bg-slate-950 text-emerald-400 p-3 rounded-lg font-mono text-xs border border-slate-800 resize-none focus:outline-none"
                  />
                </div>
              );
            })()}
          </div>

          {/* SECTION 2: MANAGED SOCIAL & TRAFFIC CHANNELS */}
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2">
                  <Globe className="w-4 h-4 text-amber-400" />
                  <span>Managed Social & Traffic Channels Directory</span>
                </h3>
                <p className="text-xs text-slate-400">Configure your official social handles & external traffic partner sites</p>
              </div>
            </div>

            <div className="overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-900/80 text-slate-400 uppercase font-mono text-[11px]">
                  <tr>
                    <th className="p-3">Platform</th>
                    <th className="p-3">Channel Name</th>
                    <th className="p-3">Audience / Members</th>
                    <th className="p-3">Type</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700 text-slate-300">
                  {(socialConfig?.channels || []).map(ch => (
                    <tr key={ch.id}>
                      <td className="p-3 uppercase font-bold text-amber-300">
                        {ch.platform}
                      </td>
                      <td className="p-3 font-semibold text-white">
                        <a href={ch.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center gap-1">
                          {ch.name}
                          <ExternalLink className="w-3 h-3 text-slate-400" />
                        </a>
                        <div className="text-[10px] text-slate-400 font-normal">{ch.description}</div>
                      </td>
                      <td className="p-3 font-mono">{ch.membersCount || 'N/A'}</td>
                      <td className="p-3">
                        {ch.isTrafficPartner ? (
                          <span className="bg-purple-900/60 text-purple-300 text-[10px] font-bold px-2 py-0.5 rounded border border-purple-700">
                            Partner Website
                          </span>
                        ) : (
                          <span className="bg-blue-900/60 text-blue-300 text-[10px] font-bold px-2 py-0.5 rounded border border-blue-700">
                            Social Handle
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            if (setSocialConfig && socialConfig) {
                              setSocialConfig({
                                ...socialConfig,
                                channels: socialConfig.channels.map(c =>
                                  c.id === ch.id ? { ...c, enabled: !c.enabled } : c
                                )
                              });
                            }
                          }}
                          className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                            ch.enabled
                              ? 'bg-emerald-900/60 text-emerald-300 border-emerald-700'
                              : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {ch.enabled ? 'Active' : 'Disabled'}
                        </button>
                      </td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => {
                            if (setSocialConfig && socialConfig) {
                              setSocialConfig({
                                ...socialConfig,
                                channels: socialConfig.channels.filter(c => c.id !== ch.id)
                              });
                            }
                          }}
                          className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-700 rounded transition-colors"
                          title="Delete Channel"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Form: Add New Channel or External Traffic Website */}
            <div className="pt-4 border-t border-slate-700">
              <h4 className="font-bold text-xs text-slate-200 mb-3 flex items-center gap-1.5">
                <Plus className="w-4 h-4 text-amber-400" />
                Add New Social Channel or External Traffic Website
              </h4>

              <form
                onSubmit={e => {
                  e.preventDefault();
                  if (!newChannel.name || !newChannel.url) return;
                  const created: SocialChannel = {
                    id: 'soc-' + Date.now(),
                    platform: newChannel.platform,
                    name: newChannel.name,
                    url: newChannel.url,
                    membersCount: newChannel.membersCount,
                    description: newChannel.description,
                    enabled: true,
                    isTrafficPartner: newChannel.isTrafficPartner
                  };

                  if (setSocialConfig && socialConfig) {
                    setSocialConfig({
                      ...socialConfig,
                      channels: [...socialConfig.channels, created]
                    });
                  }

                  setNewChannel({
                    name: '',
                    platform: 'telegram',
                    url: '',
                    membersCount: '1,000+ Members',
                    description: '',
                    isTrafficPartner: false
                  });
                }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs"
              >
                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Channel / Partner Name</label>
                  <input
                    type="text"
                    required
                    value={newChannel.name}
                    onChange={e => setNewChannel({ ...newChannel, name: e.target.value })}
                    placeholder="e.g. Deals Platform Community"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Platform / Type</label>
                  <select
                    value={newChannel.platform}
                    onChange={e => setNewChannel({ ...newChannel, platform: e.target.value as any })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-medium"
                  >
                    <option value="telegram">Telegram</option>
                    <option value="whatsapp">WhatsApp</option>
                    <option value="facebook">Facebook Group / Page</option>
                    <option value="instagram">Instagram</option>
                    <option value="youtube">YouTube</option>
                    <option value="twitter">Twitter / X</option>
                    <option value="website">External Traffic Website / Ad Network</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Target URL</label>
                  <input
                    type="url"
                    required
                    value={newChannel.url}
                    onChange={e => setNewChannel({ ...newChannel, url: e.target.value })}
                    placeholder="https://t.me/your_channel_link"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Audience / Member Count</label>
                  <input
                    type="text"
                    value={newChannel.membersCount}
                    onChange={e => setNewChannel({ ...newChannel, membersCount: e.target.value })}
                    placeholder="e.g. 15,000 Subscribers"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1 font-bold">Description</label>
                  <input
                    type="text"
                    value={newChannel.description}
                    onChange={e => setNewChannel({ ...newChannel, description: e.target.value })}
                    placeholder="e.g. Daily loot deals for electronics"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white"
                  />
                </div>

                <div className="flex items-end gap-2">
                  <label className="flex items-center gap-2 text-slate-300 font-semibold cursor-pointer pb-3">
                    <input
                      type="checkbox"
                      checked={newChannel.isTrafficPartner}
                      onChange={e => setNewChannel({ ...newChannel, isTrafficPartner: e.target.checked })}
                      className="rounded border-slate-700 text-amber-500 focus:ring-amber-500"
                    />
                    <span>External Traffic Partner Website</span>
                  </label>

                  <button
                    type="submit"
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold py-2.5 px-4 rounded-xl transition-colors shrink-0"
                  >
                    + Add Channel
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* SECTION 3: TRAFFIC PERFORMANCE BREAKDOWN */}
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="font-bold text-sm text-amber-400 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-amber-400" />
              <span>Incoming Traffic Network Performance</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-700">
                <div className="text-slate-400">Telegram Clicks</div>
                <div className="text-xl font-black text-sky-400 mt-1">1,240 clicks</div>
                <div className="text-[10px] text-slate-500 mt-0.5">utm_source=telegram</div>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-700">
                <div className="text-slate-400">WhatsApp Clicks</div>
                <div className="text-xl font-black text-emerald-400 mt-1">890 clicks</div>
                <div className="text-[10px] text-slate-500 mt-0.5">utm_source=whatsapp</div>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-700">
                <div className="text-slate-400">Facebook / Ads</div>
                <div className="text-xl font-black text-blue-400 mt-1">530 clicks</div>
                <div className="text-[10px] text-slate-500 mt-0.5">utm_source=facebook</div>
              </div>

              <div className="bg-slate-900 p-3.5 rounded-xl border border-slate-700">
                <div className="text-slate-400">Partner Traffic Sites</div>
                <div className="text-xl font-black text-purple-400 mt-1">410 clicks</div>
                <div className="text-[10px] text-slate-500 mt-0.5">utm_source=partner_website</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI CONTENT STUDIO */}
      {activeTab === 'ai-studio' && (
        <div className="space-y-6">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Sparkles className="w-5 h-5" />
              <span>Gemini AI Editorial Content Draft Studio</span>
            </div>
            <p className="text-xs text-slate-300">
              Generate comprehensive buying guides, product review summaries, comparison articles, and FAQ sections for Indian shoppers.
              <em> (Note: Per compliance guidelines, all AI generated content is saved as 'Draft' for human editorial review before publishing).</em>
            </p>

            <form onSubmit={handleGenerateAiDraft} className="space-y-4 pt-2">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Article Type</label>
                  <select
                    value={aiType}
                    onChange={(e) => setAiType(e.target.value as any)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  >
                    <option value="buying_guide">Buying Guide (e.g. Top 5 Under ₹50,000)</option>
                    <option value="review">Product Review</option>
                    <option value="comparison">Side-by-Side Comparison Article</option>
                    <option value="faq">FAQ Section</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Target Category</label>
                  <select
                    value={aiCategory}
                    onChange={(e) => setAiCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  >
                    <option value="laptops">Laptops</option>
                    <option value="mobile_accessories">Mobile Accessories</option>
                    <option value="electronics">Electronics</option>
                    <option value="kitchen">Kitchen</option>
                    <option value="fitness">Fitness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Article Title / Topic</label>
                  <input
                    type="text"
                    required
                    value={aiTopic}
                    onChange={(e) => setAiTopic(e.target.value)}
                    placeholder="e.g. Best Air Fryer for Indian Kitchen under ₹7,000"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-xs text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={aiLoading}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-6 py-3 rounded-xl text-xs flex items-center gap-2 shadow-md transition-colors"
              >
                {aiLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Gemini AI Drafting Content...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generate Article Draft</span>
                  </>
                )}
              </button>
            </form>

            {aiStatusMsg && (
              <div className="p-4 bg-slate-900 border border-amber-500/40 text-amber-300 rounded-xl text-xs font-mono">
                {aiStatusMsg}
              </div>
            )}
          </div>

          {/* List of Articles with Review status */}
          <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700 space-y-3 text-xs">
            <h3 className="font-bold text-sm text-slate-200">Editorial Queue & Drafts ({articles.length})</h3>
            <div className="space-y-2">
              {articles.map((a) => (
                <div key={a.id} className="p-3 bg-slate-900/80 rounded-xl flex items-center justify-between border border-slate-800">
                  <div>
                    <div className="font-bold text-slate-100">{a.title}</div>
                    <div className="text-[10px] text-slate-400">Author: {a.author} • {a.publishedAt}</div>
                  </div>

                  <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase font-mono ${
                    a.status === 'published' ? 'bg-emerald-900 text-emerald-300' : 'bg-amber-900 text-amber-300'
                  }`}>
                    {a.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: AMAZON API SETTINGS */}
      {activeTab === 'amazon-api' && (
        <div className="space-y-6">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Key className="w-5 h-5" />
              <span>Amazon India Associates & Product Advertising API (PA-API v5)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Associate Tracking Store Tag</label>
                <input
                  type="text"
                  value={amazonConfig.trackingId}
                  onChange={e => setAmazonConfig({ ...amazonConfig, trackingId: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-amber-300 font-mono"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Target Marketplace</label>
                <input
                  type="text"
                  readOnly
                  value="Amazon India (amazon.in)"
                  className="w-full bg-slate-900/50 border border-slate-800 rounded-xl p-2.5 text-slate-400 font-mono"
                />
              </div>
            </div>

            <div className="p-4 bg-slate-900 rounded-xl border border-slate-700 space-y-2">
              <div className="font-bold text-slate-200">Required Amazon Disclosure Text:</div>
              <textarea
                rows={2}
                value={siteSettings.amazonDisclosureText}
                onChange={e => setSiteSettings({ ...siteSettings, amazonDisclosureText: e.target.value })}
                className="w-full bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-slate-200 text-xs font-mono"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: ADSENSE SETTINGS */}
      {activeTab === 'adsense' && (
        <div className="space-y-6">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4 text-xs">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <DollarSign className="w-5 h-5" />
              <span>Google AdSense Official Publisher Configuration</span>
            </div>

            <div className="flex items-center gap-4 bg-slate-900 p-4 rounded-xl">
              <label className="font-bold text-slate-200">Publisher ID:</label>
              <input
                type="text"
                value={adSenseConfig.publisherId}
                onChange={e => setAdSenseConfig({ ...adSenseConfig, publisherId: e.target.value })}
                placeholder="ca-pub-XXXXXXXXXXXXXXXX"
                className="flex-1 bg-slate-800 border border-slate-700 rounded-xl p-2.5 text-amber-300 font-mono"
              />
            </div>

            <div className="flex items-center justify-between bg-slate-900 p-4 rounded-xl">
              <div>
                <span className="font-bold text-slate-200">AdSense Test / Preview Mode</span>
                <p className="text-[11px] text-slate-400">Shows clear placeholder boxes so you can verify ad placements before official AdSense approval.</p>
              </div>
              <button
                onClick={() => setAdSenseConfig({ ...adSenseConfig, testMode: !adSenseConfig.testMode })}
                className={`px-4 py-1.5 rounded-xl font-bold ${adSenseConfig.testMode ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-slate-300'}`}
              >
                {adSenseConfig.testMode ? 'Test Mode Active' : 'Live AdSense Code Active'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: SEO & SITEMAP */}
      {activeTab === 'seo' && (
        <div className="space-y-6 text-xs">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
            <h3 className="font-bold text-sm text-amber-400">XML Sitemap & Search Engine Crawling</h3>
            <p className="text-slate-300">Your site automatically serves a dynamic XML sitemap and robots.txt file at:</p>
            <div className="space-y-2 font-mono">
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 text-amber-300 flex justify-between items-center">
                <span>/sitemap.xml</span>
                <a href="/sitemap.xml" target="_blank" className="text-xs text-white underline">View Live</a>
              </div>
              <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 text-amber-300 flex justify-between items-center">
                <span>/robots.txt</span>
                <a href="/robots.txt" target="_blank" className="text-xs text-white underline">View Live</a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: CPANEL EXPORT & DEPLOYMENT GUIDE */}
      {activeTab === 'cpanel-export' && (
        <div className="space-y-6 text-xs leading-relaxed">
          <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Server className="w-5 h-5" />
              <span>PHP / MySQL cPanel Shared Hosting Architecture Guide</span>
            </div>

            <p className="text-slate-300">
              If you wish to export this website to standard shared hosting with cPanel, PHP 8+, and MySQL:
            </p>

            <div className="bg-slate-900 p-4 rounded-xl font-mono text-[11px] text-amber-200 border border-slate-800 space-y-1">
              <div>public_html/</div>
              <div>├── index.php</div>
              <div>├── config/db.php</div>
              <div>├── products/index.php</div>
              <div>├── reviews/index.php</div>
              <div>├── admin/index.php</div>
              <div>└── database.sql</div>
            </div>

            <button
              onClick={onDownloadSql}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 py-3 rounded-xl flex items-center gap-2 shadow-md transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download Complete MySQL Schema (database.sql)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
