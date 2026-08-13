import {
  Product,
  Article,
  ComparisonMatrixItem,
  AdSenseConfig,
  AmazonApiConfig,
  SEOConfig,
  AnalyticsMetric,
  SiteSettings,
  ContactMessage,
  SocialMediaConfig,
  SocialChannel
} from '../types';

export const POPULAR_CATEGORIES = [
  { id: 'laptops', name: 'Laptops', icon: 'Laptop', count: 18, desc: 'Student, Gaming & Business Laptops' },
  { id: 'mobile_accessories', name: 'Mobile Accessories', icon: 'Headphones', count: 24, desc: 'Earbuds, Power Banks & Chargers' },
  { id: 'electronics', name: 'Electronics', icon: 'Tv', count: 32, desc: 'Smart TVs, Speakers & Cameras' },
  { id: 'home_appliances', name: 'Home Appliances', icon: 'Zap', count: 15, desc: 'Washing Machines, ACs & Purifiers' },
  { id: 'kitchen', name: 'Kitchen', icon: 'Coffee', count: 22, desc: 'Mixer Grinders, Air Fryers & Cookware' },
  { id: 'fitness', name: 'Fitness', icon: 'Activity', count: 14, desc: 'Smartwatches, Bands & Gym Gear' },
  { id: 'gaming', name: 'Gaming', icon: 'Gamepad2', count: 19, desc: 'Consoles, Keyboards & Gaming Mice' },
  { id: 'fashion', name: 'Fashion', icon: 'Shirt', count: 28, desc: 'Watches, Footwear & Accessories' },
  { id: 'beauty', name: 'Beauty & Skincare', icon: 'Sparkles', count: 16, desc: 'Grooming Tools & Serums' },
  { id: 'books', name: 'Books', icon: 'BookOpen', count: 30, desc: 'Competitive Exams & Fiction Bestsellers' },
  { id: 'office', name: 'Office', icon: 'Briefcase', count: 12, desc: 'Ergonomic Chairs & Printers' },
  { id: 'travel', name: 'Travel', icon: 'Compass', count: 10, desc: 'Backpacks, Luggage & Travel Gear' }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    asin: 'B0CHX1W2JK',
    title: 'ASUS Vivobook 15 Intel Core i3-1215U 12th Gen (8GB RAM / 512GB SSD / FHD / 1.7kg)',
    category: 'laptops',
    brand: 'ASUS',
    currentPrice: 35990,
    originalPrice: 48990,
    currency: '₹',
    rating: 4.3,
    reviewCount: 2450,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      '12th Gen Intel Core i3-1215U processor with 6 cores',
      '15.6-inch FHD (1920 x 1080) anti-glare display',
      '8GB DDR4 RAM expandable up to 16GB & fast 512GB PCIe 4.0 SSD',
      'Precision touchpad with built-in fingerprint sensor',
      'Lightweight build at 1.7 kg with 180-degree lay-flat hinge'
    ],
    specs: {
      'Processor': 'Intel Core i3-1215U 12th Gen',
      'RAM': '8GB DDR4 (Expandable)',
      'Storage': '512GB M.2 NVMe PCIe SSD',
      'Display': '15.6" FHD Anti-Glare 220 nits',
      'Battery Life': 'Up to 6 hours (42Whr)',
      'Weight': '1.70 kg',
      'OS': 'Windows 11 Home + MS Office 2021'
    },
    pros: [
      'Excellent value for students and office tasks',
      'Smooth everyday performance with 12th Gen i3',
      'Includes lifetime MS Office 2021 license',
      'Fingerprint reader for quick Windows Hello login'
    ],
    cons: [
      'Display color accuracy is average for photo editing',
      'Not suitable for high-end gaming'
    ],
    targetAudience: 'College students, office workers, online class learners, and budget users needing a reliable laptop under ₹40,000.',
    whoShouldAvoid: 'Gamers looking for dedicated GPUs or heavy video editors.',
    buyingConsiderations: [
      'Check if 8GB RAM is enough for your tab multitasking needs or upgrade to 16GB.',
      'Comes with genuine Windows 11 and MS Office pre-activated.'
    ],
    tags: ['student', 'budget', 'value', 'laptops'],
    bestFor: 'Best Laptop for Students under ₹40,000',
    lastUpdated: 'Today (Synced via Amazon API)',
    affiliateUrl: 'https://www.amazon.in/dp/B0CHX1W2JK?tag=indiafinds-21',
    discountPercentage: 27
  },
  {
    id: 'prod-2',
    asin: 'B0C895Y9JL',
    title: 'Sony WH-1000XM5 Wireless Noise Cancelling Headphones (30hr Battery / Multipoint)',
    category: 'mobile_accessories',
    brand: 'Sony',
    currentPrice: 26990,
    originalPrice: 34990,
    currency: '₹',
    rating: 4.6,
    reviewCount: 3820,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Industry-leading noise cancellation with 8 microphones & Auto NC Optimizer',
      'Integrated Processor V1 & HD Noise Cancelling Processor QN1',
      'Ultra-comfortable lightweight design with soft fit leather',
      'Up to 30-hour battery life with quick charging (3 min charge = 3 hrs playback)',
      'Multipoint connection connects to 2 Bluetooth devices seamlessly'
    ],
    specs: {
      'Battery Life': '30 Hours (NC ON)',
      'Driver Unit': '30mm specially designed',
      'Bluetooth': 'Version 5.2 (LDAC, AAC, SBC)',
      'Weight': '250 grams',
      'Microphones': '8 Mics for ANC & Crystal Calls',
      'Charging': 'USB-C Fast Charging'
    },
    pros: [
      'Top-tier active noise cancellation in the market',
      'Unmatched call voice clarity with AI beamforming',
      'Extremely light and comfortable for long flight/work sessions',
      'Great LDAC hi-res audio support'
    ],
    cons: [
      'Earcups do not fold inward like XM4',
      'Premium price point'
    ],
    targetAudience: 'Frequent travelers, remote software developers, audiophiles, and professionals wanting distraction-free work environments.',
    whoShouldAvoid: 'Shoppers on a strict budget under ₹10,000.',
    buyingConsiderations: [
      'If portability is key, note the earcups swivel flat but do not fold completely.',
      'Supports Sony Headphones Connect App for personalized EQ.'
    ],
    tags: ['overall', 'premium', 'electronics', 'mobile_accessories'],
    bestFor: 'Best Overall Noise Cancelling Headphones',
    lastUpdated: 'Today (Synced via Amazon API)',
    affiliateUrl: 'https://www.amazon.in/dp/B0C895Y9JL?tag=indiafinds-21',
    discountPercentage: 23
  },
  {
    id: 'prod-3',
    asin: 'B0B8S3F7GJ',
    title: 'boAt Airdopes 141 Bluetooth Truly Wireless Earbuds (42H Playtime / ENx Tech / 8ms Low Latency)',
    category: 'mobile_accessories',
    brand: 'boAt',
    currentPrice: 1299,
    originalPrice: 4490,
    currency: '₹',
    rating: 4.1,
    reviewCount: 18900,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Massive 42 Hours total playback time with charging case',
      'ASAP Fast Charge: 5 mins charge gives 75 mins playtime',
      'ENx Environmental Noise Cancellation for clear call audio',
      'BEAST Mode low latency (80ms) for casual gaming',
      'IPX4 water and sweat resistance'
    ],
    specs: {
      'Playtime': '42 Hours Total (6 Hours earbuds)',
      'Drivers': '8mm Dynamic Drivers',
      'Bluetooth': 'v5.1 with IWP Instant Connect',
      'Water Resistance': 'IPX4 Rated',
      'Charging Port': 'Type-C'
    },
    pros: [
      'Unbeatable budget price under ₹1,500',
      'Punchy bass tuned for Indian music preferences',
      'Very fast auto-pairing when lid opens',
      'Long battery stamina'
    ],
    cons: [
      'Mic quality drops in very noisy outdoor markets',
      'Plastic build is basic'
    ],
    targetAudience: 'Students, gym goers, and daily commuters looking for affordable wireless earbuds under ₹1,500.',
    whoShouldAvoid: 'Audiophiles seeking flat monitor audio profiles or active noise cancellation.',
    buyingConsiderations: [
      'Check color options available on Amazon India for lightning deals.'
    ],
    tags: ['budget', 'student', 'value', 'mobile_accessories'],
    bestFor: 'Best Budget Earbuds under ₹1,500',
    lastUpdated: 'Today (Synced via Amazon API)',
    affiliateUrl: 'https://www.amazon.in/dp/B0B8S3F7GJ?tag=indiafinds-21',
    discountPercentage: 71
  },
  {
    id: 'prod-4',
    asin: 'B0C27L9P3Q',
    title: 'Lenovo IdeaPad Gaming 3 AMD Ryzen 5 5600H (15.6" FHD 120Hz / 8GB RAM / 512GB SSD / GTX 1650 4GB)',
    category: 'laptops',
    brand: 'Lenovo',
    currentPrice: 47990,
    originalPrice: 72990,
    currency: '₹',
    rating: 4.4,
    reviewCount: 1420,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'AMD Ryzen 5 5600H 6-Core processor up to 4.2 GHz',
      'NVIDIA GeForce GTX 1650 4GB GDDR6 dedicated graphics card',
      '15.6" FHD IPS display with 120Hz smooth refresh rate',
      'Military Grade MIL-STD-810G tested durability',
      '100% full size blue backlit gaming keyboard'
    ],
    specs: {
      'Processor': 'AMD Ryzen 5 5600H',
      'GPU': 'NVIDIA GeForce GTX 1650 4GB',
      'Display': '15.6" FHD IPS 120Hz',
      'RAM': '8GB DDR4 3200MHz (Upgradeable)',
      'Storage': '512GB SSD PCIe NVMe',
      'Cooling': 'Dual fan Nahimic Audio'
    },
    pros: [
      'Affordable entry into PC gaming under ₹50,000',
      '120Hz screen makes everyday scrolling & competitive gaming buttery smooth',
      'Sturdy build quality with military testing',
      'Efficient dual-fan thermal cooling'
    ],
    cons: [
      'Battery life drops during heavy gaming unplugged',
      'Requires adding an additional 8GB RAM stick for dual-channel optimization'
    ],
    targetAudience: 'Engineering students, casual gamers, video editing beginners wanting entry-level dedicated GPU power under ₹50,000.',
    whoShouldAvoid: 'Ultra-thin ultrabook lovers wanting 10-hour battery life.',
    buyingConsiderations: [
      'Adding an extra 8GB RAM stick boosts FPS in games like Valorant and GTA V significantly.'
    ],
    tags: ['student', 'gaming', 'value', 'laptops'],
    bestFor: 'Best Budget Gaming Laptop under ₹50,000',
    lastUpdated: 'Today (Synced via Amazon API)',
    affiliateUrl: 'https://www.amazon.in/dp/B0C27L9P3Q?tag=indiafinds-21',
    discountPercentage: 34
  },
  {
    id: 'prod-5',
    asin: 'B0CX1G2R49',
    title: 'OnePlus Nord CE 4 Lite 5G (Super Silver, 8GB RAM, 128GB Storage / 5500 mAh / 80W SUPERVOOC)',
    category: 'electronics',
    brand: 'OnePlus',
    currentPrice: 19999,
    originalPrice: 21999,
    currency: '₹',
    rating: 4.2,
    reviewCount: 3100,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      '6.67-inch 120Hz AMOLED Display with Aqua Touch technology',
      'Massive 5500 mAh battery with 80W SUPERVOOC fast charging',
      '50MP Sony LYT-600 main camera with Optical Image Stabilization (OIS)',
      'Dual Stereo Speakers with 300% Ultra Volume Mode',
      'OxygenOS 14 based on Android 14'
    ],
    specs: {
      'Processor': 'Snapdragon 695 5G',
      'Display': '6.67" AMOLED 120Hz 2100 nits Peak',
      'Camera': '50MP OIS (Sony LYT-600) + 2MP Depth',
      'Battery': '5500 mAh with 80W fast charging',
      'OS': 'OxygenOS 14 (2 Android updates)'
    },
    pros: [
      'Vibrant 120Hz AMOLED screen visible under direct sunlight',
      '80W charger in box charges 0 to 100% in 38 mins',
      '50MP camera with OIS takes steady photos in low light',
      'Dual speakers with 3.5mm headphone jack'
    ],
    cons: [
      'Snapdragon 695 chipset is decent but not a heavy gaming monster',
      'Plastic back frame'
    ],
    targetAudience: 'Students and daily users seeking a reliable 5G smartphone under ₹20,000 with long battery and fast charging.',
    whoShouldAvoid: 'Hardcore PUBG/BGMI players wanting 90 FPS max graphics.',
    buyingConsiderations: [
      'Check Amazon bank discounts to get an instant ₹1,000 to ₹1,500 rebate.'
    ],
    tags: ['student', 'budget', 'value', 'electronics'],
    bestFor: 'Best Smartphone under ₹20,000 for Students',
    lastUpdated: 'Today (Synced via Amazon API)',
    affiliateUrl: 'https://www.amazon.in/dp/B0CX1G2R49?tag=indiafinds-21',
    discountPercentage: 9
  },
  {
    id: 'prod-6',
    asin: 'B0BDKBXCKC',
    title: 'Instant Pot Duo 7-in-1 Electric Pressure Cooker 5.7 Litre (13 One-Touch Programs / Stainless Steel)',
    category: 'kitchen',
    brand: 'Instant Pot',
    currentPrice: 8990,
    originalPrice: 12990,
    currency: '₹',
    rating: 4.7,
    reviewCount: 5410,
    isAvailable: true,
    images: [
      'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
    ],
    features: [
      'Replaces 7 kitchen appliances: Pressure cooker, slow cooker, rice cooker, steamer, sauté pan, yogurt maker & warmer',
      '13 customizable Smart Programs for Rajma, Dal, Biryani, Curries, and Yogurt',
      'Food-grade 304 (18/8) stainless steel inner pot with 3-ply bottom',
      'Over 10 safety mechanisms including overheat protection & safe locking lid',
      'Up to 70% faster cooking compared to traditional methods'
    ],
    specs: {
      'Capacity': '5.7 Litres (Serves 4-6 people)',
      'Material': 'Stainless Steel',
      'Power': '1000 Watts',
      'Programs': '13 One-Touch Smart Programs',
      'Warranty': '2 Years Official India Warranty'
    },
    pros: [
      'Hands-free automatic cooking for Indian rice and dal dishes',
      'No whistle noise or messy steam splashes',
      'Easy to clean stainless steel dishwasher-safe pot',
      'Consistent flavor retention'
    ],
    cons: [
      'Requires counter space in small kitchens',
      'Slight learning curve for first-time pressure cooker users'
    ],
    targetAudience: 'Working couples, nuclear families, busy professionals, and bachelor cooks wanting quick health-conscious Indian meals.',
    whoShouldAvoid: 'People who cook for 1-2 people only and prefer micro 2L pots.',
    buyingConsiderations: [
      'Includes Indian recipe book and ladle accessories in the package.'
    ],
    tags: ['overall', 'value', 'kitchen'],
    bestFor: 'Best Smart Kitchen Appliance for Busy Families',
    lastUpdated: 'Today (Synced via Amazon API)',
    affiliateUrl: 'https://www.amazon.in/dp/B0BDKBXCKC?tag=indiafinds-21',
    discountPercentage: 31
  }
];

export const INITIAL_ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'Top 5 Best Laptops for College Students Under ₹50,000 in India (2026 Buying Guide)',
    slug: 'best-laptops-for-students-under-50000',
    type: 'buying_guide',
    category: 'laptops',
    summary: 'Looking for a durable, fast laptop for college assignments, coding, and casual entertainment under ₹50,000? Here is our curated top 5 list based on battery, CPU performance, and build quality.',
    content: `
# Finding the Perfect College Laptop Under ₹50,000

When entering college, a laptop is no longer a luxury—it is an absolute necessity. Whether you are typing engineering lab reports, writing code in Python/Java, editing presentations, or catching up on web series during weekends, choosing the right machine under ₹50,000 can be daunting.

## What to Look For in a Student Laptop under ₹50,000?

1. **Processor (CPU)**: Aim for at least 12th Gen Intel Core i3 / i5 or AMD Ryzen 5 (5000 series or 7000 series). Avoid older Celeron or 10th Gen Intel chips.
2. **RAM**: 8GB is the minimum. If possible, pick a model with an open SODIMM slot so you can upgrade to 16GB later.
3. **Storage**: Always choose SSDs (512GB NVMe PCIe). Traditional HDDs are far too slow for Windows 11.
4. **Display**: Look for 15.6" or 14" Full HD (1920x1080) anti-glare screens.
5. **Software**: Pre-installed Windows 11 and MS Office 2021 saves you ₹4,000 to ₹6,000 extra!

---

### 1. ASUS Vivobook 15 (Best Overall for General Students)
The ASUS Vivobook 15 powered by 12th Gen Intel Core i3 offers a sweet spot between sleek design, lay-flat 180° hinge, and solid thermal management.

### 2. Lenovo IdeaPad Gaming 3 (Best for Coding + Casual Gaming)
If your college coursework involves GPU acceleration, Machine Learning models, or gaming, the Lenovo IdeaPad Gaming 3 with AMD Ryzen 5 and GTX 1650 gives you dedicated GPU power under ₹50k.

---

### Frequently Asked Questions (FAQ)

**Q: Is 8GB RAM enough for college in 2026?**
Yes, 8GB RAM handles web browsing with 15+ tabs, MS Word, and VS Code smoothly. However, upgrading to 16GB gives extra longevity.

**Q: Does Amazon offer student discounts on laptops in India?**
Yes! During Amazon Prime Day and Great Indian Festival sales, student card offers and bank discounts often slash prices by an extra ₹1,500 to ₹3,000.
    `,
    author: 'Chief Tech Editor',
    publishedAt: '2026-08-10',
    updatedAt: '2026-08-12',
    status: 'published',
    featuredImage: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    relatedProductIds: ['prod-1', 'prod-4'],
    readTimeMinutes: 6,
    seoTitle: 'Best Laptops for College Students Under ₹50000 in India (2026 Guide)',
    seoMetaDescription: 'Detailed buying guide for college students looking for the best laptops under ₹50,000 in India. Compare specs, battery life, prices on Amazon India.',
    faqs: [
      { question: 'Is 8GB RAM enough for college in 2026?', answer: 'Yes, 8GB RAM handles browser multitasking and office software comfortably. For heavy coding or 4K editing, 16GB is recommended.' },
      { question: 'Do these laptops come with MS Office pre-installed?', answer: 'Yes, most laptops like ASUS Vivobook come with pre-activated MS Office Home & Student 2021.' }
    ]
  },
  {
    id: 'art-2',
    title: 'Sony WH-1000XM5 vs Bose QuietComfort 45: Honest Noise Cancellation Comparison',
    slug: 'sony-wh1000xm5-vs-bose-qc45-comparison',
    type: 'comparison',
    category: 'mobile_accessories',
    summary: 'We put the two titan noise cancelling wireless headphones head-to-head in call quality, active noise cancellation depth, comfort, and battery life on Amazon India.',
    content: `
# Sony XM5 vs Bose QC45: Which Premium ANC Headphone Wins?

For working professionals, frequent travelers, and music enthusiasts, active noise cancellation (ANC) is a game changer. Sony and Bose have dominated this category for over a decade.

## Quick Comparison Matrix

| Feature | Sony WH-1000XM5 | Bose QuietComfort 45 |
|---|---|---|
| Active Noise Cancellation | ★★★★★ (Best Overall) | ★★★★☆ (Slightly behind) |
| Battery Life | 30 Hours (NC On) | 24 Hours |
| Comfort | Ultra Lightweight | Classic Folding Design |
| Mic Quality for Calls | 8 Mics AI Beamforming | 4 Mics |
| Price on Amazon India | ~₹26,990 | ~₹22,900 |

### Final Verdict:
- **Choose Sony WH-1000XM5** if you want the absolute highest noise isolation for flight engines and noisy open offices, plus superior call microphone clarity.
- **Choose Bose QC45** if you prefer a compact folding design that fits in smaller travel bags.
    `,
    author: 'Audio Specialist',
    publishedAt: '2026-08-05',
    updatedAt: '2026-08-11',
    status: 'published',
    featuredImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    relatedProductIds: ['prod-2', 'prod-3'],
    readTimeMinutes: 5,
    seoTitle: 'Sony XM5 vs Bose QC45 Headphone Comparison | India Deals',
    seoMetaDescription: 'Detailed side-by-side comparison of Sony WH-1000XM5 vs Bose QC45 noise cancelling headphones. Features, price in India, battery life & ANC performance.',
    faqs: [
      { question: 'Which headphone has better noise cancellation?', answer: 'The Sony XM5 holds a edge in variable high-frequency noise cancellation thanks to its dual processors and 8 microphones.' }
    ]
  }
];

export const INITIAL_COMPARISON_MATRICES: ComparisonMatrixItem[] = [
  {
    id: 'matrix-laptops-50k',
    title: 'Best Student Laptops Under ₹50,000 Face-Off',
    category: 'laptops',
    productIds: ['prod-1', 'prod-4'],
    summary: 'Compare top student choices side-by-side for battery, processor speed, GPU power, and weight.',
    bestOverallProductId: 'prod-1',
    bestBudgetProductId: 'prod-1',
    bestValueProductId: 'prod-4',
    bestStudentProductId: 'prod-1'
  }
];

export const DEFAULT_ADSENSE_CONFIG: AdSenseConfig = {
  publisherId: 'ca-pub-0000000000000000',
  enabled: true,
  testMode: true,
  autoAdsEnabled: false,
  slots: {
    header: {
      enabled: true,
      code: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-0000000000000000" data-ad-slot="1111111111" data-ad-format="auto" data-full-width-responsive="true"></ins>'
    },
    inContent: {
      enabled: true,
      code: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-0000000000000000" data-ad-slot="2222222222" data-ad-format="fluid" data-ad-layout="in-article"></ins>'
    },
    sidebar: {
      enabled: true,
      code: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-0000000000000000" data-ad-slot="3333333333" data-ad-format="rectangle"></ins>'
    },
    article: {
      enabled: true,
      code: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-0000000000000000" data-ad-slot="4444444444" data-ad-format="auto"></ins>'
    },
    footer: {
      enabled: true,
      code: '<ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-0000000000000000" data-ad-slot="5555555555" data-ad-format="auto"></ins>'
    }
  }
};

export const DEFAULT_AMAZON_CONFIG: AmazonApiConfig = {
  trackingId: 'dealsplatform-21',
  associateTag: 'dealsplatform-21',
  accessKey: '',
  secretKey: '',
  marketplace: 'India',
  autoSyncEnabled: true,
  syncFrequencyHours: 24,
  lastSyncTime: new Date().toISOString(),
  apiConnected: false
};

export const DEFAULT_SEO_CONFIG: SEOConfig = {
  siteTitle: 'Deals Platform - Premier Amazon Product Research & Comparison Hub',
  metaDescription: 'Discover verified product reviews, price tracking, comparison tables, and unbiased buying guides for Amazon India electronics, laptops, home, and fashion.',
  canonicalBaseUrl: 'https://dealsplatform.in',
  ogImageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1200&q=80',
  twitterHandle: '@DealsPlatformHub',
  enableProductSchema: true,
  enableArticleSchema: true,
  enableFAQSchema: true
};

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  siteName: 'Deals Platform',
  tagline: 'Smart Buying Guides & Verified Amazon India Comparisons',
  contactEmail: 'support@dealsplatform.in',
  supportPhone: '+91 98765 43210',
  copyrightText: '© 2026 Deals Platform. All rights reserved.',
  amazonDisclosureText: 'As an Amazon Associate I earn from qualifying purchases.'
};

export const INITIAL_ANALYTICS: AnalyticsMetric = {
  totalVisitors: 12480,
  topArticles: [
    { title: 'Best Laptops for Students under ₹50,000', views: 4120 },
    { title: 'Sony XM5 vs Bose QC45 Comparison', views: 2890 }
  ],
  topProducts: [
    { title: 'ASUS Vivobook 15 i3 12th Gen', clicks: 820 },
    { title: 'boAt Airdopes 141 TWS Earbuds', clicks: 640 },
    { title: 'Lenovo IdeaPad Gaming 3', clicks: 510 }
  ],
  affiliateClicksCount: 1970,
  outboundClicksCount: 2310,
  estimatedAffiliateRevenue: 14250,
  estimatedAdSenseRevenue: 3820,
  recentClicks: [
    { timestamp: '10 mins ago', productTitle: 'ASUS Vivobook 15 i3 12th Gen', tag: 'dealsplatform-21' },
    { timestamp: '24 mins ago', productTitle: 'Sony WH-1000XM5 Headphones', tag: 'dealsplatform-21' },
    { timestamp: '1 hour ago', productTitle: 'boAt Airdopes 141 Earbuds', tag: 'dealsplatform-21' }
  ]
};

export const INITIAL_CONTACT_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Rajesh Kumar',
    email: 'rajesh.k@gmail.com',
    subject: 'Laptop suggestion under ₹60,000 for coding',
    message: 'Hello Deals Platform team, loved your student laptop buying guide! Could you also add a review for ASUS TUF gaming laptop?',
    date: '2026-08-11',
    read: false
  }
];

export const DEFAULT_SOCIAL_CONFIG: SocialMediaConfig = {
  defaultUtmSource: 'social_campaign',
  defaultUtmMedium: 'broadcast',
  autoAppendUtm: true,
  broadcastTemplateWhatsApp: '🔥 *AMAZON INDIA DEAL ALERT* 🔥\n\n📌 *{title}*\n\n💰 *Price:* {price} ~{originalPrice}~\n⚡ *Discount:* {discount}% OFF!\n\n✨ *Key Highlights:*\n{features}\n\n🛒 *Buy directly on Amazon India:* {url}\n\n🏷️ *Tracking Tag:* `{tag}`\n📢 *Join our Telegram Deals Channel for instant alerts:* https://t.me/dealsplatform_deals',
  broadcastTemplateTelegram: '🚀 *HOT AMAZON INDIA DISCOUNT* 🚀\n\n*Product:* {title}\n*Special Offer Price:* {price} (Save {discount}%)\n\n*Why buy this?*\n{features}\n\n👉 *Order on Amazon India:* {url}\n\n📲 *Share with friends & family!*',
  channels: [
    {
      id: 'soc-1',
      platform: 'telegram',
      name: 'Deals Platform Telegram Channel',
      url: 'https://t.me/dealsplatform_deals',
      membersCount: '24,500+ Subscribers',
      description: 'Instant notification channel for loot deals, price drops, & flash sales on Amazon.in',
      enabled: true,
      isTrafficPartner: false
    },
    {
      id: 'soc-2',
      platform: 'whatsapp',
      name: 'Deals Platform WhatsApp Alerts Group',
      url: 'https://chat.whatsapp.com/sample-group-invite',
      membersCount: '8,200+ Members',
      description: 'Daily curated tech & household deals sent straight to WhatsApp',
      enabled: true,
      isTrafficPartner: false
    },
    {
      id: 'soc-3',
      platform: 'instagram',
      name: 'Deals Platform Official Instagram',
      url: 'https://instagram.com/dealsplatform.official',
      membersCount: '18.2K Followers',
      description: 'Visual product unboxings, quick reel reviews, and tech stories',
      enabled: true,
      isTrafficPartner: false
    },
    {
      id: 'soc-4',
      platform: 'youtube',
      name: 'Deals Platform YouTube Channel',
      url: 'https://youtube.com/@dealsplatform',
      membersCount: '45.0K Subscribers',
      description: 'In-depth side-by-side spec comparisons & student buying guides',
      enabled: true,
      isTrafficPartner: false
    },
    {
      id: 'soc-5',
      platform: 'facebook',
      name: 'Amazon India Smart Buyers Facebook Group',
      url: 'https://facebook.com/groups/dealsplatform',
      membersCount: '12,400+ Members',
      description: 'Community Q&A, deal recommendations, and shopping discussions',
      enabled: true,
      isTrafficPartner: false
    },
    {
      id: 'soc-6',
      platform: 'twitter',
      name: 'Deals Platform X (Twitter) Handle',
      url: 'https://x.com/DealsPlatformHub',
      membersCount: '5,800+ Followers',
      description: 'Automated price drop tweets and tech news updates',
      enabled: true,
      isTrafficPartner: false
    },
    {
      id: 'soc-7',
      platform: 'website',
      name: 'DealsPartner Network (Traffic Exchange)',
      url: 'https://dealspartner-traffic.com',
      membersCount: 'Partner Ad Network',
      description: 'External high-traffic web platform partner receiving our product ads & banner feeds',
      enabled: true,
      isTrafficPartner: true
    }
  ]
};

