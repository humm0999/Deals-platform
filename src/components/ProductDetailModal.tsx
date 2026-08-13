import React from 'react';
import { Product } from '../types';
import {
  X,
  Star,
  CheckCircle,
  XCircle,
  ExternalLink,
  ShieldCheck,
  Zap,
  Tag,
  ArrowUpRight,
  Info,
  Clock,
  Share2
} from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onTrackClick: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  isCompared: boolean;
  onShareProduct?: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onTrackClick,
  onToggleCompare,
  isCompared,
  onShareProduct
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-8 border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Header Modal Bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 font-bold text-xs px-2.5 py-1 rounded-md uppercase font-mono">
              Amazon India Product Analysis
            </span>
            <span className="text-slate-400 text-xs hidden sm:inline">
              ASIN: {product.asin}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-800 text-slate-300 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content Area */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          {/* Top Section: Images + Key Meta & CTA */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {/* Image Gallery */}
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col items-center">
              <img
                src={product.images[0]}
                alt={product.title}
                className="max-h-72 object-contain mb-4"
              />

              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                <span>{product.lastUpdated}</span>
              </div>
            </div>

            {/* Title & Amazon Price CTA */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 uppercase tracking-wider">
                <span>{product.brand}</span>
                <span>•</span>
                <span>{product.category.replace('_', ' ')}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                {product.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center text-amber-500 font-bold text-sm bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400 mr-1" />
                  {product.rating} / 5.0
                </div>
                <span className="text-xs text-slate-500 font-mono">
                  ({product.reviewCount.toLocaleString('en-IN')} verified customer reviews)
                </span>
              </div>

              {/* Price Tag */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                <div className="text-xs text-slate-500 font-medium">Verified Price on Amazon.in</div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-black text-slate-900">
                    {product.currency}{product.currentPrice.toLocaleString('en-IN')}
                  </span>
                  {product.originalPrice > product.currentPrice && (
                    <span className="text-sm text-slate-400 line-through">
                      {product.currency}{product.originalPrice.toLocaleString('en-IN')}
                    </span>
                  )}
                  {product.discountPercentage && (
                    <span className="bg-rose-100 text-rose-800 text-xs font-bold px-2 py-0.5 rounded-md">
                      Save {product.discountPercentage}%
                    </span>
                  )}
                </div>

                <div className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 pt-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                  Currently available for purchase on Amazon India
                </div>
              </div>

              {/* Amazon Affiliate CTA Buttons */}
              <div className="space-y-2 pt-2">
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => onTrackClick(product)}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span className="text-sm">Check Latest Price on Amazon</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    onClick={() => onToggleCompare(product)}
                    className={`py-2.5 px-4 rounded-xl text-xs font-semibold border transition-colors ${
                      isCompared
                        ? 'bg-blue-100 text-blue-900 border-blue-300'
                        : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                    }`}
                  >
                    {isCompared ? '✓ Added to Matrix' : '+ Add to Matrix'}
                  </button>

                  {onShareProduct && (
                    <button
                      onClick={() => onShareProduct(product)}
                      className="py-2.5 px-4 rounded-xl text-xs font-semibold border bg-slate-900 text-white hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Share2 className="w-3.5 h-3.5 text-blue-400" />
                      <span>Share & Send Deal</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Required Disclosure */}
              <p className="text-[11px] text-slate-500 bg-amber-50/80 p-3 rounded-xl border border-amber-200/60 leading-relaxed font-mono">
                <strong>Mandatory Disclosure:</strong> As an Amazon Associate I earn from qualifying purchases. Prices and availability are accurate as of the last sync date and subject to change on Amazon.in.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-600" /> Key Product Features
            </h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-700">
              {product.features.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2 bg-white p-2.5 rounded-lg border border-slate-200/60">
                  <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pros & Cons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-emerald-50/50 p-5 rounded-2xl border border-emerald-200">
              <h4 className="text-sm font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" /> Pros
              </h4>
              <ul className="space-y-2 text-xs text-emerald-950">
                {product.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">•</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-rose-50/50 p-5 rounded-2xl border border-rose-200">
              <h4 className="text-sm font-bold text-rose-900 mb-3 flex items-center gap-2">
                <XCircle className="w-4 h-4 text-rose-600" /> Cons & Limitations
              </h4>
              <ul className="space-y-2 text-xs text-rose-950">
                {product.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-600 font-bold">•</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Who Should Buy vs Avoid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div className="bg-slate-900 text-white p-5 rounded-2xl">
              <h4 className="font-bold text-amber-400 uppercase tracking-wider mb-2">Who Should Buy This?</h4>
              <p className="text-slate-300 leading-relaxed">{product.targetAudience}</p>
            </div>

            <div className="bg-slate-100 text-slate-800 p-5 rounded-2xl border border-slate-200">
              <h4 className="font-bold text-rose-700 uppercase tracking-wider mb-2">Who Should Avoid This?</h4>
              <p className="text-slate-600 leading-relaxed">{product.whoShouldAvoid}</p>
            </div>
          </div>

          {/* Technical Specifications Table */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider mb-3">
              Technical Specifications
            </h3>
            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden text-xs">
              <table className="w-full text-left border-collapse">
                <tbody>
                  {Object.entries(product.specs).map(([key, val], idx) => (
                    <tr key={key} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                      <td className="py-3 px-4 font-bold text-slate-700 border-b border-slate-200 w-1/3">
                        {key}
                      </td>
                      <td className="py-3 px-4 text-slate-800 border-b border-slate-200">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-100 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs shrink-0">
          <span className="text-slate-500 font-mono">
            Direct Official Link to Amazon India Marketplace
          </span>

          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onTrackClick(product)}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2 px-5 rounded-xl flex items-center gap-1 transition-colors"
          >
            <span>View on Amazon.in</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
};
