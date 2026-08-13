import React from 'react';
import { X, CheckCircle2, ShieldCheck, Server, Key, DollarSign, Search, FileCode, ArrowRight } from 'lucide-react';

interface LaunchChecklistModalProps {
  onClose: () => void;
  onDownloadSql: () => void;
}

export const LaunchChecklistModal: React.FC<LaunchChecklistModalProps> = ({
  onClose,
  onDownloadSql
}) => {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-6 border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h2 className="text-base font-bold">Complete Setup, Launch & Compliance Guide</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-8 text-slate-800 text-xs sm:text-sm leading-relaxed">
          {/* Quick Notice */}
          <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl flex items-start gap-3 text-amber-950">
            <ShieldCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <strong className="font-bold">Manual Configuration Notice:</strong> To start earning revenue via Amazon India Associates and Google AdSense, you must manually complete credential setup in your merchant accounts. Follow the step-by-step checklist below.
            </div>
          </div>

          {/* Steps Grid */}
          <div className="space-y-6">
            {/* Step 1: Domain & Hosting */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                <Server className="w-5 h-5 text-amber-600" />
                <span>Step 1 — Domain & Shared Hosting (cPanel / PHP / Node)</span>
              </div>
              <p className="text-slate-600">
                Register a clean domain name (e.g. <code>yourbrand.in</code>). Avoid trademarked words like 'Amazon' or 'Kindle' in your domain name per Amazon Associate guidelines.
              </p>
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  onClick={onDownloadSql}
                  className="bg-slate-900 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 hover:bg-slate-800 transition-colors"
                >
                  <FileCode className="w-4 h-4 text-amber-400" />
                  <span>Download MySQL Database Schema (database.sql)</span>
                </button>
              </div>
            </div>

            {/* Step 2: Amazon Associates Account Setup */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                <Key className="w-5 h-5 text-amber-600" />
                <span>Step 2 — Connect Amazon India Associates Account</span>
              </div>
              <p className="text-slate-600">
                1. Sign up for the official <strong>Amazon India Associates Program</strong> at <code>affiliate-program.amazon.in</code>.<br />
                2. Copy your Associate Store Tracking ID (e.g., <code>yourtag-21</code>).<br />
                3. Open the <strong>Admin Panel &gt; Amazon API Settings</strong> tab in this website and paste your Tracking ID.
              </p>
            </div>

            {/* Step 3: Amazon Product Advertising API Access */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>Step 3 — Amazon Product Advertising API (PA-API v5) Eligibility</span>
              </div>
              <p className="text-slate-600">
                Amazon grants PA-API keys after your Associates account completes at least 3 qualifying sales within 180 days.<br />
                • Once eligible, navigate to <strong>Amazon Associates Portal &gt; Tools &gt; Product Advertising API</strong>.<br />
                • Generate your <strong>Access Key</strong> and <strong>Secret Key</strong>.<br />
                • Store them securely in backend environment variables or Admin Settings. <em>(Never expose private keys in frontend JavaScript files!)</em>
              </p>
            </div>

            {/* Step 4: Mandatory Disclosure */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                <ShieldCheck className="w-5 h-5 text-amber-600" />
                <span>Step 4 — Verify Mandatory Disclosure Statement</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200 font-mono text-slate-800 text-xs">
                "As an Amazon Associate I earn from qualifying purchases."
              </div>
              <p className="text-slate-600">
                Amazon strictly requires this exact wording to be displayed prominently near affiliate links and in site footers. This website includes it on every page header, product card, detail modal, and footer.
              </p>
            </div>

            {/* Step 5: Google AdSense Approval */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                <DollarSign className="w-5 h-5 text-amber-600" />
                <span>Step 5 — Apply for Google AdSense Monetization</span>
              </div>
              <p className="text-slate-600">
                1. Ensure your website has at least 15-20 original published buying guides and reviews.<br />
                2. Apply at <code>google.com/adsense</code>.<br />
                3. After approval, copy your <strong>AdSense Publisher ID</strong> (e.g. <code>ca-pub-XXXXXXXXXXXXXXXX</code>) and paste it into <strong>Admin Panel &gt; AdSense Settings</strong>.<br />
                4. Toggle live ads mode to activate header, in-content, sidebar, and footer ad units automatically.
              </p>
            </div>

            {/* Step 6: Google Search Console Submission */}
            <div className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900 text-sm sm:text-base">
                <Search className="w-5 h-5 text-amber-600" />
                <span>Step 6 — Submit Sitemap to Google Search Console</span>
              </div>
              <p className="text-slate-600">
                Add your domain property in Google Search Console and submit your dynamic XML sitemap at <code>https://yourdomain.com/sitemap.xml</code> for rapid indexing.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
