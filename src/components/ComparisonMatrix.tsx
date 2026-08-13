import React from 'react';
import { Product } from '../types';
import { Layers, X, Star, ExternalLink, ArrowUpRight, Award, Trash2 } from 'lucide-react';

interface ComparisonMatrixProps {
  products: Product[];
  onRemoveFromCompare: (id: string) => void;
  onClearCompare: () => void;
  onTrackClick: (product: Product) => void;
  onSelectProduct: (product: Product) => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  products,
  onRemoveFromCompare,
  onClearCompare,
  onTrackClick,
  onSelectProduct
}) => {
  if (products.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center max-w-2xl mx-auto my-12 shadow-sm">
        <div className="w-16 h-16 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Layers className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">
          No Products Selected for Comparison
        </h2>
        <p className="text-slate-600 text-sm mb-6 max-w-md mx-auto">
          Click the <strong className="text-amber-700">"Compare"</strong> button on any product card across the store to build a side-by-side technical matrix.
        </p>
      </div>
    );
  }

  // Find Best Budget and Best Overall for highlight badges
  const minPriceProduct = [...products].sort((a, b) => a.currentPrice - b.currentPrice)[0];
  const maxRatingProduct = [...products].sort((a, b) => b.rating - a.rating)[0];

  return (
    <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-6 my-8 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-100 text-amber-900 text-xs font-bold px-2.5 py-1 rounded-md uppercase font-mono">
              Product Advertising Matrix
            </span>
            <span className="text-xs text-slate-500 font-mono">
              Comparing {products.length} Items
            </span>
          </div>
          <h2 className="text-2xl font-black text-slate-900 mt-1">
            Side-by-Side Amazon Product Comparison
          </h2>
        </div>

        <button
          onClick={onClearCompare}
          className="text-xs text-rose-600 font-semibold hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear Comparison
        </button>
      </div>

      {/* Comparison Table */}
      <div className="overflow-x-auto pt-6">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr>
              <th className="p-4 bg-slate-50 border-b border-slate-200 w-48 text-xs font-extrabold text-slate-600 uppercase tracking-wider">
                Product Specification
              </th>
              {products.map((p) => (
                <th key={p.id} className="p-4 bg-slate-50 border-b border-slate-200 align-top w-64">
                  <div className="relative space-y-2">
                    <button
                      onClick={() => onRemoveFromCompare(p.id)}
                      className="absolute top-0 right-0 p-1 text-slate-400 hover:text-rose-600 rounded-full hover:bg-slate-200 transition-colors"
                      title="Remove product"
                    >
                      <X className="w-4 h-4" />
                    </button>

                    {/* Badge */}
                    {p.id === minPriceProduct?.id && (
                      <span className="inline-block bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono mb-1">
                        Best Budget
                      </span>
                    )}
                    {p.id === maxRatingProduct?.id && p.id !== minPriceProduct?.id && (
                      <span className="inline-block bg-amber-100 text-amber-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase font-mono mb-1">
                        Best Overall
                      </span>
                    )}

                    <img
                      src={p.images[0]}
                      alt={p.title}
                      className="h-32 object-contain mx-auto"
                    />

                    <h3
                      onClick={() => onSelectProduct(p)}
                      className="text-xs font-bold text-slate-900 line-clamp-2 hover:text-amber-600 cursor-pointer"
                    >
                      {p.title}
                    </h3>

                    <div className="text-lg font-black text-slate-900">
                      {p.currency}{p.currentPrice.toLocaleString('en-IN')}
                    </div>

                    <a
                      href={p.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => onTrackClick(p)}
                      className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1 shadow-2xs transition-all"
                    >
                      <span>Check Price</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-xs divide-y divide-slate-200">
            {/* Rating */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/60">Rating & Reviews</td>
              {products.map((p) => (
                <td key={p.id} className="p-4 text-slate-800">
                  <div className="flex items-center gap-1 font-bold text-amber-600">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {p.rating} / 5.0
                  </div>
                  <div className="text-[10px] text-slate-400">({p.reviewCount} reviews)</div>
                </td>
              ))}
            </tr>

            {/* Brand */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/60">Brand</td>
              {products.map((p) => (
                <td key={p.id} className="p-4 font-semibold text-slate-900">{p.brand}</td>
              ))}
            </tr>

            {/* Category */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/60">Category</td>
              {products.map((p) => (
                <td key={p.id} className="p-4 text-slate-700 capitalize">{p.category.replace('_', ' ')}</td>
              ))}
            </tr>

            {/* Key Feature */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/60">Main Highlight</td>
              {products.map((p) => (
                <td key={p.id} className="p-4 text-slate-700 leading-snug">
                  {p.features[0] || 'N/A'}
                </td>
              ))}
            </tr>

            {/* Who Should Buy */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/60">Best For</td>
              {products.map((p) => (
                <td key={p.id} className="p-4 text-slate-700 leading-snug font-medium">
                  {p.targetAudience}
                </td>
              ))}
            </tr>

            {/* Top Pro */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/60">Key Advantage</td>
              {products.map((p) => (
                <td key={p.id} className="p-4 text-emerald-800 bg-emerald-50/30">
                  ✓ {p.pros[0] || 'Solid Performance'}
                </td>
              ))}
            </tr>

            {/* Top Con */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/60">Trade-Off / Con</td>
              {products.map((p) => (
                <td key={p.id} className="p-4 text-rose-800 bg-rose-50/30">
                  ✕ {p.cons[0] || 'Basic aesthetics'}
                </td>
              ))}
            </tr>

            {/* Amazon CTA Row */}
            <tr>
              <td className="p-4 font-bold text-slate-700 bg-slate-50/60">Amazon India Link</td>
              {products.map((p) => (
                <td key={p.id} className="p-4">
                  <a
                    href={p.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => onTrackClick(p)}
                    className="text-amber-700 hover:text-amber-900 font-bold underline flex items-center gap-1 text-xs"
                  >
                    View on Amazon.in <ExternalLink className="w-3 h-3" />
                  </a>
                  <p className="text-[9px] text-slate-400 mt-1 font-mono">
                    Tag: indiafinds-21
                  </p>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
