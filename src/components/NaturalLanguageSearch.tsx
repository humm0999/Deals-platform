import React, { useState } from 'react';
import { Product } from '../types';
import { Search, Sparkles, Filter, X, ArrowRight, Zap, CheckCircle2 } from 'lucide-react';
import { ProductCard } from './ProductCard';

interface NaturalLanguageSearchProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onToggleCompare: (product: Product) => void;
  comparedProductIds: string[];
  onTrackClick: (product: Product) => void;
  onClose: () => void;
}

export const NaturalLanguageSearch: React.FC<NaturalLanguageSearchProps> = ({
  products,
  onSelectProduct,
  onToggleCompare,
  comparedProductIds,
  onTrackClick,
  onClose
}) => {
  const [query, setQuery] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [parsedIntent, setParsedIntent] = useState<any | null>(null);
  const [matchedResults, setMatchedResults] = useState<Product[]>([]);

  const sampleQueries = [
    'Best laptop under ₹50000 for student',
    'Best noise cancelling headphones under ₹3000',
    'Best smartphone for students under ₹20000',
    'Best smart kitchen appliance for busy family'
  ];

  const handleExecuteSearch = async (searchPrompt: string) => {
    if (!searchPrompt.trim()) return;
    setIsAnalyzing(true);
    setQuery(searchPrompt);

    try {
      const res = await fetch('/api/ai/parse-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchPrompt })
      });

      const data = await res.json();
      if (data.success && data.intent) {
        setParsedIntent(data.intent);

        // Filter products based on parsed intent
        let filtered = [...products];

        if (data.intent.extractedCategory && data.intent.extractedCategory !== 'all') {
          filtered = filtered.filter(p => p.category === data.intent.extractedCategory);
        }

        if (data.intent.maxBudget) {
          filtered = filtered.filter(p => p.currentPrice <= data.intent.maxBudget);
        }

        if (data.intent.matchedTags && data.intent.matchedTags.length > 0) {
          filtered = filtered.filter(p =>
            data.intent.matchedTags.some((tag: string) => p.tags.includes(tag))
          );
        }

        // If no products matched strictly, fallback to keyword title search
        if (filtered.length === 0) {
          const qLower = searchPrompt.toLowerCase();
          filtered = products.filter(p =>
            p.title.toLowerCase().includes(qLower) || p.category.includes(qLower)
          );
        }

        setMatchedResults(filtered.length > 0 ? filtered : products.slice(0, 4));
      }
    } catch (err) {
      console.error('Search intent error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden my-6 border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Top Search Bar */}
        <div className="bg-slate-900 p-6 text-white shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <h2 className="text-lg font-bold">Natural Language Shopping Search Engine</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleExecuteSearch(query);
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Type in plain English e.g. Best headphones under ₹2000 for college students..."
                className="w-full bg-slate-800 text-white placeholder-slate-400 text-sm px-4 py-3.5 pl-11 rounded-xl border border-slate-700 focus:outline-hidden focus:border-amber-400 font-medium"
              />
              <Search className="w-5 h-5 text-amber-400 absolute left-3.5 top-3.5" />
            </div>

            <button
              type="submit"
              disabled={isAnalyzing}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-6 py-3.5 rounded-xl text-sm transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Analyzing...</span>
                </>
              ) : (
                <>
                  <span>AI Search</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Prompt Ideas */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Try asking:</span>
            {sampleQueries.map((sq, idx) => (
              <button
                key={idx}
                onClick={() => handleExecuteSearch(sq)}
                className="bg-slate-800 hover:bg-slate-700 text-amber-300 px-2.5 py-1 rounded-lg border border-slate-700 transition-colors"
              >
                "{sq}"
              </button>
            ))}
          </div>
        </div>

        {/* Results Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Parsed Intent Summary */}
          {parsedIntent && (
            <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-800">
              <div className="space-y-1">
                <div className="font-bold text-amber-900 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-amber-600" />
                  AI Intent Extraction Parameters
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-white px-2 py-0.5 rounded border border-amber-200 font-medium">
                    Category: <strong>{parsedIntent.extractedCategory || 'All'}</strong>
                  </span>
                  {parsedIntent.maxBudget && (
                    <span className="bg-white px-2 py-0.5 rounded border border-amber-200 font-medium">
                      Budget Limit: <strong>₹{parsedIntent.maxBudget.toLocaleString('en-IN')}</strong>
                    </span>
                  )}
                  <span className="bg-white px-2 py-0.5 rounded border border-amber-200 font-medium">
                    Audience: <strong>{parsedIntent.targetAudience || 'General'}</strong>
                  </span>
                </div>
              </div>

              <span className="text-[11px] text-amber-800 font-mono bg-amber-100 px-2.5 py-1 rounded-lg">
                Matched {matchedResults.length} Products
              </span>
            </div>
          )}

          {/* Results Grid */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-4 uppercase tracking-wider">
              Recommended Products for Your Query
            </h3>

            {matchedResults.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-sm">
                Type a natural query above to convert user intent into filtered products.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {matchedResults.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelectProduct={onSelectProduct}
                    onToggleCompare={onToggleCompare}
                    isCompared={comparedProductIds.includes(p.id)}
                    onTrackClick={onTrackClick}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
