import React from 'react';
import { AdSenseConfig } from '../types';
import { Info, Sparkles } from 'lucide-react';

interface AdContainerProps {
  slot: 'header' | 'inContent' | 'sidebar' | 'article' | 'footer';
  config: AdSenseConfig;
}

export const AdContainer: React.FC<AdContainerProps> = ({ slot, config }) => {
  if (!config.enabled) return null;

  const slotConfig = config.slots[slot];
  if (!slotConfig || !slotConfig.enabled) return null;

  const slotLabels: Record<string, string> = {
    header: 'Header Leaderboard Ad Unit (728x90)',
    inContent: 'In-Content Banner Ad Unit (Responsive)',
    sidebar: 'Sidebar Skyscraper Ad Unit (300x250 / 300x600)',
    article: 'In-Article Display Ad Unit',
    footer: 'Footer Anchor Ad Unit'
  };

  return (
    <div className="w-full my-6 text-center">
      {/* Disclaimer above ad container per AdSense Policy */}
      <div className="text-[10px] text-slate-400 font-mono tracking-wider uppercase mb-1 flex items-center justify-center gap-1">
        <span>Advertisement</span>
        <span>•</span>
        <span className="text-slate-400">Google AdSense Space</span>
      </div>

      {config.testMode ? (
        /* Test Preview Placeholder Box for Site Creator */
        <div className="bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl p-4 flex flex-col items-center justify-center text-slate-500 min-h-[100px] transition-all hover:bg-amber-50/50 hover:border-amber-300">
          <div className="flex items-center gap-2 font-semibold text-slate-700 text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            {slotLabels[slot]}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 max-w-lg">
            AdSense Preview Mode Active. Publisher ID: <code className="font-mono text-slate-700">{config.publisherId}</code>. Official ad unit code will load here automatically once approved by Google AdSense.
          </p>
        </div>
      ) : (
        /* Live AdSense Code Container */
        <div
          className="adsense-wrapper overflow-hidden flex justify-center"
          dangerouslySetInnerHTML={{ __html: slotConfig.code }}
        />
      )}
    </div>
  );
};
