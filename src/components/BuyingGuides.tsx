import React, { useState } from 'react';
import { Article, Product } from '../types';
import { BookOpen, Clock, User, ShieldCheck, ArrowRight, Tag, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

interface BuyingGuidesProps {
  articles: Article[];
  products: Product[];
  onSelectProduct: (p: Product) => void;
  onTrackClick: (p: Product) => void;
}

export const BuyingGuides: React.FC<BuyingGuidesProps> = ({
  articles,
  products,
  onSelectProduct,
  onTrackClick
}) => {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(articles[0] || null);
  const [openFaqIdx, setOpenFaqIdx] = useState<number | null>(null);

  return (
    <div className="space-y-10 my-8">
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 shadow-md relative overflow-hidden">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <BookOpen className="w-4 h-4 text-amber-400" />
            Editorial Reviews & Buying Guides
          </div>
          <h2 className="text-3xl font-black mb-2">
            In-Depth Product Analysis for Indian Shoppers
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Every article is authored and reviewed by human editors. We analyze technical specifications, real Indian usage conditions, warranty terms, and price fluctuations on Amazon India.
          </p>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Article Selector Sidebar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-3">
          <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-2 px-2">
            Latest Guides & Reviews
          </h3>

          <div className="space-y-2">
            {articles.map((art) => (
              <div
                key={art.id}
                onClick={() => setSelectedArticle(art)}
                className={`p-4 rounded-2xl cursor-pointer border transition-all ${
                  selectedArticle?.id === art.id
                    ? 'bg-amber-50 border-amber-300 shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium mb-1">
                  <span className="capitalize text-amber-700 font-bold">
                    {art.type.replace('_', ' ')}
                  </span>
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" /> {art.readTimeMinutes} min read
                  </span>
                </div>

                <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                  {art.title}
                </h4>

                <p className="text-[11px] text-slate-600 line-clamp-2 mt-1">
                  {art.summary}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Article Viewer Body */}
        {selectedArticle && (
          <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            {/* Meta */}
            <div className="space-y-3 pb-6 border-b border-slate-200">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 font-medium">
                <span className="bg-amber-100 text-amber-900 font-bold px-2.5 py-0.5 rounded-full capitalize font-mono">
                  {selectedArticle.category}
                </span>
                <span className="flex items-center gap-1">
                  <User className="w-3.5 h-3.5 text-slate-400" /> {selectedArticle.author}
                </span>
                <span>•</span>
                <span>Updated: {selectedArticle.updatedAt}</span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                {selectedArticle.title}
              </h1>

              <div className="bg-amber-50/80 p-3 rounded-xl border border-amber-200/60 text-xs text-amber-900 font-mono">
                <strong>Affiliate Disclosure:</strong> As an Amazon Associate I earn from qualifying purchases made through links in this guide.
              </div>
            </div>

            {/* Featured Image */}
            {selectedArticle.featuredImage && (
              <img
                src={selectedArticle.featuredImage}
                alt={selectedArticle.title}
                className="w-full h-64 sm:h-80 object-cover rounded-2xl shadow-2xs"
              />
            )}

            {/* Article Content Render */}
            <div className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed whitespace-pre-line space-y-4 font-sans">
              {selectedArticle.content}
            </div>

            {/* Frequently Asked Questions (FAQ) Section */}
            {selectedArticle.faqs && selectedArticle.faqs.length > 0 && (
              <div className="pt-6 border-t border-slate-200 space-y-4">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-amber-600" />
                  Frequently Asked Questions (FAQ)
                </h3>

                <div className="space-y-2">
                  {selectedArticle.faqs.map((faq, idx) => (
                    <div
                      key={idx}
                      className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50"
                    >
                      <button
                        onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                        className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-3 hover:bg-slate-100 transition-colors"
                      >
                        <span>Q: {faq.question}</span>
                        {openFaqIdx === idx ? (
                          <ChevronUp className="w-4 h-4 text-slate-500 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-slate-500 shrink-0" />
                        )}
                      </button>

                      {openFaqIdx === idx && (
                        <div className="p-4 bg-white border-t border-slate-200 text-xs text-slate-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
