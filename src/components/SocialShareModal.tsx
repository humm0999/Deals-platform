import React, { useState } from 'react';
import { Product, Article, SocialMediaConfig } from '../types';
import {
  X,
  Share2,
  Copy,
  Check,
  Send,
  MessageCircle,
  Facebook,
  Twitter,
  Linkedin,
  Globe,
  ExternalLink,
  Sparkles,
  Zap,
  Tag
} from 'lucide-react';

interface SocialShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  article?: Article | null;
  trackingId?: string;
  socialConfig?: SocialMediaConfig;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({
  isOpen,
  onClose,
  product,
  article,
  trackingId = 'dealsplatform-21',
  socialConfig
}) => {
  const [copied, setCopied] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [selectedUtmSource, setSelectedUtmSource] = useState('social_share');

  if (!isOpen) return null;

  // Determine share URL and basic details
  const rawUrl = product
    ? product.affiliateUrl
    : article
    ? `${window.location.origin}/article/${article.slug}`
    : window.location.href;

  const urlWithUtm = `${rawUrl}${rawUrl.includes('?') ? '&' : '?'}utm_source=${selectedUtmSource}&utm_medium=social_broadcast&utm_campaign=amazon_deals`;

  const title = product ? product.title : article ? article.title : 'Deals Platform - Top Amazon India Deals & Buying Matrix';
  const price = product ? `${product.currency}${product.currentPrice.toLocaleString('en-IN')}` : '';
  const originalPrice = product && product.originalPrice > product.currentPrice ? `${product.currency}${product.originalPrice.toLocaleString('en-IN')}` : '';
  const discount = product && product.discountPercentage ? product.discountPercentage : null;

  // Format ad broadcast text
  const broadcastMessage = product
    ? `🔥 AMAZON INDIA DEAL ALERT 🔥\n\n📌 ${product.title}\n\n💰 Offer Price: ${price} ${originalPrice ? `(Original: ${originalPrice})` : ''}\n${discount ? `⚡ Discount: ${discount}% OFF!\n` : ''}\n✨ Key Highlights:\n• ${product.features.slice(0, 3).join('\n• ')}\n\n🛒 Buy on Amazon India: ${urlWithUtm}\n\n🏷️ Affiliate Tag: ${trackingId}`
    : article
    ? `📖 READ OUR BUYING GUIDE: ${article.title}\n\n${article.summary}\n\n👉 Read Full Spec Analysis: ${urlWithUtm}`
    : `🚀 Discover verified Amazon India product reviews, price tracking, & spec comparisons on Deals Platform!\n👉 ${urlWithUtm}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(urlWithUtm);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyBroadcastText = () => {
    navigator.clipboard.writeText(broadcastMessage);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Social platform share handlers
  const shareUrls = {
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(broadcastMessage)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(urlWithUtm)}&text=${encodeURIComponent(broadcastMessage)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(urlWithUtm)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(urlWithUtm)}&hashtags=AmazonIndia,Deals,TechDeals`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(urlWithUtm)}`
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-blue-600 rounded-lg text-white">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-white">Share & Broadcast to Traffic Networks</h3>
              <p className="text-xs text-slate-400">Send deals, ads & articles to social media & external traffic sites</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          {/* Item Preview Card */}
          <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 flex items-center gap-3">
            {product?.images?.[0] ? (
              <img src={product.images[0]} alt={product.title} className="w-14 h-14 object-contain rounded-lg bg-white p-1 border border-slate-200 shrink-0" />
            ) : article?.featuredImage ? (
              <img src={article.featuredImage} alt={article.title} className="w-14 h-14 object-cover rounded-lg shrink-0" />
            ) : (
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-lg flex items-center justify-center font-bold text-lg shrink-0">
                IF
              </div>
            )}
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-semibold text-blue-600 uppercase tracking-wider">
                {product ? `Amazon India • ${product.brand}` : article ? `Buying Guide • ${article.category}` : 'Platform'}
              </div>
              <h4 className="text-xs font-semibold text-slate-900 line-clamp-1">{title}</h4>
              {price && (
                <div className="text-sm font-bold text-slate-900 mt-0.5">
                  {price} {originalPrice && <span className="text-xs text-slate-400 line-through font-normal">{originalPrice}</span>}
                </div>
              )}
            </div>
          </div>

          {/* Quick One-Click Social Share Grid */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2.5">
              1-Click Direct Share
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              <a
                href={shareUrls.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 transition-all group"
              >
                <MessageCircle className="w-5 h-5 text-emerald-600 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-medium">WhatsApp</span>
              </a>

              <a
                href={shareUrls.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-800 transition-all group"
              >
                <Send className="w-5 h-5 text-sky-600 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-medium">Telegram</span>
              </a>

              <a
                href={shareUrls.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-blue-50 hover:bg-blue-100 border border-blue-200 text-blue-800 transition-all group"
              >
                <Facebook className="w-5 h-5 text-blue-600 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-medium">Facebook</span>
              </a>

              <a
                href={shareUrls.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 transition-all group"
              >
                <Twitter className="w-5 h-5 text-slate-800 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-medium">X / Twitter</span>
              </a>

              <a
                href={shareUrls.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center p-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 text-indigo-800 transition-all group"
              >
                <Linkedin className="w-5 h-5 text-indigo-600 mb-1 group-hover:scale-110 transition-transform" />
                <span className="text-[11px] font-medium">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Traffic Channel Campaign Selector */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700">Target Traffic Source (UTM Tag)</label>
              <span className="text-[10px] text-slate-400">Appended to track conversion clicks</span>
            </div>
            <select
              value={selectedUtmSource}
              onChange={e => setSelectedUtmSource(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg p-2 font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="telegram_deals">Telegram Channel (telegram_deals)</option>
              <option value="whatsapp_group">WhatsApp Group (whatsapp_group)</option>
              <option value="facebook_ads">Facebook Ads & Group (facebook_ads)</option>
              <option value="instagram_bio">Instagram Bio Link (instagram_bio)</option>
              <option value="youtube_desc">YouTube Description (youtube_desc)</option>
              <option value="partner_website">External Traffic Website (partner_website)</option>
            </select>
          </div>

          {/* Pre-formatted Broadcast Post Text Box */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                Formatted Broadcast Ad Text
              </label>
              <button
                onClick={handleCopyBroadcastText}
                className="text-xs font-medium text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                {copiedText ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied Post!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Post Text</span>
                  </>
                )}
              </button>
            </div>
            <textarea
              readOnly
              value={broadcastMessage}
              rows={5}
              className="w-full text-xs font-mono bg-slate-900 text-emerald-400 p-3 rounded-xl border border-slate-800 focus:outline-none leading-relaxed resize-none"
            />
          </div>

          {/* Tracked Affiliate Link Bar */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Direct Campaign Affiliate Link
            </label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                readOnly
                value={urlWithUtm}
                className="flex-1 text-xs font-mono bg-slate-100 text-slate-700 p-2.5 rounded-lg border border-slate-300 truncate"
              />
              <button
                onClick={handleCopyLink}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg text-xs font-medium flex items-center gap-1.5 shrink-0 shadow-xs transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied' : 'Copy Link'}</span>
              </button>
            </div>
          </div>

          {/* Connected Official Channels Quick Links */}
          {socialConfig?.channels && socialConfig.channels.filter(c => c.enabled).length > 0 && (
            <div className="pt-3 border-t border-slate-100">
              <div className="text-[11px] font-semibold text-slate-500 mb-2 uppercase tracking-wider flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                Your Official Social & Traffic Channels:
              </div>
              <div className="flex flex-wrap gap-2">
                {socialConfig.channels
                  .filter(c => c.enabled)
                  .map(channel => (
                    <a
                      key={channel.id}
                      href={channel.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg text-xs font-medium flex items-center gap-1 transition-colors"
                    >
                      <span>{channel.name}</span>
                      <ExternalLink className="w-3 h-3 text-slate-400" />
                    </a>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
