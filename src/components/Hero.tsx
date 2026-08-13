import React from 'react';
import { Search, Sparkles, ShieldCheck, Zap, Award, Layers, TrendingUp, Send, MessageCircle, Share2 } from 'lucide-react';

interface HeroProps {
  onOpenSearchModal: () => void;
  onSelectBudget: (price: number) => void;
  onSelectCategory: (cat: string) => void;
  onOpenShareModal?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenSearchModal,
  onSelectBudget,
  onSelectCategory,
  onOpenShareModal
}) => {
  return (
    <div className="relative bg-slate-900 text-white pt-8 pb-14 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-800 shadow-sm">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Social Deals Alert Strip */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-2">
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs font-medium shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>Official Amazon India Associates Partner</span>
          </div>

          <a
            href="https://t.me/dealsplatform_deals"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-400/30 text-sky-300 px-3 py-1 rounded-full text-xs font-medium transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-sky-400" />
            <span>Join Telegram Deals (24.5k)</span>
          </a>

          <a
            href="https://chat.whatsapp.com/sample-group-invite"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 px-3 py-1 rounded-full text-xs font-medium transition-colors"
          >
            <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
            <span>WhatsApp Deals Group</span>
          </a>

          {onOpenShareModal && (
            <button
              onClick={onOpenShareModal}
              className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs font-medium transition-colors"
            >
              <Share2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Broadcast Center</span>
            </button>
          )}
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Unbiased <span className="text-blue-400">Amazon India</span> Product Research & Buying Matrix
        </h1>

        <p className="text-slate-400 text-sm sm:text-lg max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
          Search with natural language, compare technical specifications side-by-side, check real buyer considerations, and discover verified deals on Amazon.in.
        </p>

        {/* Big Search Input Trigger */}
        <div className="max-w-3xl mx-auto mb-8">
          <div
            onClick={onOpenSearchModal}
            className="bg-slate-950 text-slate-100 p-2 sm:p-2.5 rounded-xl shadow-lg border border-slate-800 hover:border-blue-500/50 transition-all cursor-pointer flex items-center justify-between gap-3 group"
          >
            <div className="flex items-center gap-3 flex-1 pl-3 text-left truncate">
              <Search className="w-5 h-5 text-slate-400 shrink-0 group-hover:text-blue-400 transition-colors" />
              <span className="text-xs sm:text-sm text-slate-400 font-medium truncate">
                Ask anything e.g. "Best noise cancelling headphones under ₹3,000 for students"...
              </span>
            </div>

            <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2.5 rounded-lg text-xs sm:text-sm shrink-0 flex items-center gap-2 shadow-xs transition-all">
              <Sparkles className="w-4 h-4" />
              <span>AI Research</span>
            </button>
          </div>
        </div>

        {/* Quick Budget Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-300 mb-10">
          <span className="text-slate-400 font-medium flex items-center gap-1 mr-1">
            <Zap className="w-3.5 h-3.5 text-blue-400" /> Quick Budget Filters:
          </span>

          <button
            onClick={() => onSelectBudget(1500)}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            Under ₹1,500
          </button>

          <button
            onClick={() => onSelectBudget(5000)}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            Under ₹5,000
          </button>

          <button
            onClick={() => onSelectBudget(20000)}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            Under ₹20,000
          </button>

          <button
            onClick={() => onSelectBudget(50000)}
            className="bg-slate-800/80 hover:bg-slate-800 border border-slate-700/80 text-slate-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            Under ₹50,000
          </button>

          <button
            onClick={() => onSelectCategory('laptops')}
            className="bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1"
          >
            <TrendingUp className="w-3.5 h-3.5 text-blue-400" /> Student Laptops
          </button>
        </div>

        {/* Stat Highlights Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-left">
          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            <div className="text-blue-400 font-semibold text-base">100% Verified</div>
            <div className="text-slate-400 text-xs mt-0.5">Amazon India Products</div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            <div className="text-emerald-400 font-semibold text-base">Zero Fake Reviews</div>
            <div className="text-slate-400 text-xs mt-0.5">Strict Policy Compliance</div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            <div className="text-blue-400 font-semibold text-base">PA-API Ready</div>
            <div className="text-slate-400 text-xs mt-0.5">Live Price & Stock Tracker</div>
          </div>

          <div className="bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
            <div className="text-cyan-400 font-semibold text-base">Side-by-Side</div>
            <div className="text-slate-400 text-xs mt-0.5">Spec Comparison Tables</div>
          </div>
        </div>
      </div>
    </div>
  );
};
