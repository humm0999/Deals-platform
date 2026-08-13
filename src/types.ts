export interface Product {
  id: string;
  asin: string;
  title: string;
  category: string;
  brand: string;
  currentPrice: number;
  originalPrice: number;
  currency: string;
  rating: number;
  reviewCount: number;
  isAvailable: boolean;
  images: string[];
  features: string[];
  specs: Record<string, string>;
  pros: string[];
  cons: string[];
  targetAudience: string;
  whoShouldAvoid: string;
  buyingConsiderations: string[];
  tags: string[]; // e.g., ['student', 'budget', 'overall', 'value', 'gaming']
  bestFor: string;
  lastUpdated: string;
  affiliateUrl: string;
  discountPercentage?: number;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  type: 'review' | 'buying_guide' | 'comparison' | 'how_to' | 'faq';
  category: string;
  summary: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  status: 'draft' | 'reviewed' | 'published';
  featuredImage: string;
  relatedProductIds: string[];
  readTimeMinutes: number;
  seoTitle: string;
  seoMetaDescription: string;
  faqs?: { question: string; answer: string }[];
}

export interface ComparisonMatrixItem {
  id: string;
  title: string;
  category: string;
  productIds: string[];
  summary: string;
  bestOverallProductId: string;
  bestBudgetProductId: string;
  bestValueProductId: string;
  bestStudentProductId: string;
}

export interface AdSenseConfig {
  publisherId: string;
  enabled: boolean;
  testMode: boolean;
  autoAdsEnabled: boolean;
  slots: {
    header: { enabled: boolean; code: string };
    inContent: { enabled: boolean; code: string };
    sidebar: { enabled: boolean; code: string };
    article: { enabled: boolean; code: string };
    footer: { enabled: boolean; code: string };
  };
}

export interface AmazonApiConfig {
  trackingId: string;
  associateTag: string;
  accessKey: string;
  secretKey: string;
  marketplace: 'India' | 'US' | 'UK';
  autoSyncEnabled: boolean;
  syncFrequencyHours: number;
  lastSyncTime: string;
  apiConnected: boolean;
}

export interface SEOConfig {
  siteTitle: string;
  metaDescription: string;
  canonicalBaseUrl: string;
  ogImageUrl: string;
  twitterHandle: string;
  enableProductSchema: boolean;
  enableArticleSchema: boolean;
  enableFAQSchema: boolean;
}

export interface AnalyticsMetric {
  totalVisitors: number;
  topArticles: { title: string; views: number }[];
  topProducts: { title: string; clicks: number }[];
  affiliateClicksCount: number;
  outboundClicksCount: number;
  estimatedAffiliateRevenue: number;
  estimatedAdSenseRevenue: number;
  recentClicks: { timestamp: string; productTitle: string; tag: string }[];
}

export interface NaturalLanguageSearchIntent {
  query: string;
  extractedCategory?: string;
  maxBudget?: number;
  targetAudience?: string;
  matchedTags: string[];
  keywords: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
  read: boolean;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  contactEmail: string;
  supportPhone: string;
  copyrightText: string;
  amazonDisclosureText: string;
}

export interface SocialChannel {
  id: string;
  platform: 'telegram' | 'whatsapp' | 'facebook' | 'instagram' | 'youtube' | 'twitter' | 'linkedin' | 'website';
  name: string;
  url: string;
  membersCount?: string;
  description?: string;
  enabled: boolean;
  isTrafficPartner?: boolean;
}

export interface SocialMediaConfig {
  channels: SocialChannel[];
  defaultUtmSource: string;
  defaultUtmMedium: string;
  autoAppendUtm: boolean;
  broadcastTemplateWhatsApp: string;
  broadcastTemplateTelegram: string;
}

export interface CookieConsentPreferences {
  accepted: boolean;
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp?: string;
}
