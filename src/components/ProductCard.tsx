import React from 'react';
import { Product } from '../types';
import { Star, ExternalLink, Check, Layers, Tag, ShieldCheck, ArrowUpRight, Share2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
  onTrackClick: (product: Product) => void;
  onShareProduct?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onToggleCompare,
  isCompared,
  onTrackClick,
  onShareProduct
}) => {
  const getBadgeColor = (tag: string) => {
    switch (tag) {
      case 'overall':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'student':
        return 'bg-cyan-100 text-cyan-800 border-cyan-300';
      case 'budget':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'value':
        return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col h-full overflow-hidden group">
      {/* Top Image & Badge Container */}
      <div className="relative bg-slate-50 p-4 aspect-4/3 flex items-center justify-center overflow-hidden">
        <img
          src={product.images[0] || 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=600&q=80'}
          alt={product.title}
          className="max-h-48 object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />

        {/* Amazon ASIN & Stock Pill */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1">
          <span className="bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-mono px-2 py-0.5 rounded shadow-2xs">
            ASIN: {product.asin}
          </span>
          {product.discountPercentage && (
            <span className="bg-rose-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded shadow-2xs">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Comparison Toggle Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleCompare(product);
          }}
          className={`absolute top-3 right-3 p-1.5 px-2.5 rounded-lg text-xs font-medium flex items-center gap-1 shadow-xs transition-colors ${
            isCompared
              ? 'bg-blue-600 text-white'
              : 'bg-white/90 hover:bg-white text-slate-700 hover:text-blue-600 border border-slate-200'
          }`}
          title="Add to Comparison Matrix"
        >
          <Layers className="w-3.5 h-3.5" />
          <span className="text-[11px] font-medium hidden sm:inline">
            {isCompared ? 'Compared' : 'Compare'}
          </span>
        </button>

        {/* Highlight Tag */}
        {product.bestFor && (
          <div className="absolute bottom-2 left-2 right-2 bg-slate-900/90 text-blue-300 text-[11px] font-medium px-2.5 py-1 rounded-lg truncate text-center shadow-xs">
            ★ {product.bestFor}
          </div>
        )}
      </div>

      {/* Card Content Body */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category */}
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-bold text-blue-600 uppercase tracking-wider text-[10px]">
              {product.brand}
            </span>
            <span className="text-[11px] text-slate-400 capitalize">
              {product.category.replace('_', ' ')}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectProduct(product)}
            className="text-sm font-semibold text-slate-900 line-clamp-2 hover:text-blue-600 cursor-pointer mb-2 transition-colors leading-snug"
          >
            {product.title}
          </h3>

          {/* Ratings */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex items-center text-blue-700 text-xs font-semibold bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
              <Star className="w-3.5 h-3.5 fill-blue-500 text-blue-500 mr-1" />
              {product.rating}
            </div>
            <span className="text-xs text-slate-500 font-mono">
              ({product.reviewCount.toLocaleString('en-IN')} reviews)
            </span>
          </div>

          {/* Feature Highlight */}
          {product.features && product.features.length > 0 && (
            <p className="text-xs text-slate-600 line-clamp-2 mb-4 bg-slate-50 p-2 rounded-lg border border-slate-100 italic">
              "{product.features[0]}"
            </p>
          )}
        </div>

        {/* Pricing & Amazon CTA Footer */}
        <div className="pt-3 border-t border-slate-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-lg font-bold text-slate-900">
                {product.currency}{product.currentPrice.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.currentPrice && (
                <span className="text-xs text-slate-400 line-through ml-2">
                  {product.currency}{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <span className="text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              In Stock on Amazon.in
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onSelectProduct(product)}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium py-2 px-2.5 rounded-lg transition-colors truncate"
            >
              Details
            </button>

            {onShareProduct && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShareProduct(product);
                }}
                className="bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-600 p-2 rounded-lg border border-slate-200 transition-colors shrink-0"
                title="Share & Send Deal to WhatsApp/Telegram"
              >
                <Share2 className="w-3.5 h-3.5" />
              </button>
            )}

            <a
              href={product.affiliateUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onTrackClick(product)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium py-2 px-2.5 rounded-lg flex items-center justify-center gap-1 shadow-xs transition-colors truncate"
            >
              <span>Check Price</span>
              <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
            </a>
          </div>

          <p className="text-[10px] text-slate-400 text-center mt-2 font-mono">
            *As an Amazon Associate I earn from qualifying purchases.
          </p>
        </div>
      </div>
    </div>
  );
};
