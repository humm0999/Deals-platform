import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, Settings, Check, X } from 'lucide-react';
import { CookieConsentPreferences } from '../types';

interface CookieConsentProps {
  onOpenCompliance: (docKey: string) => void;
}

export const CookieConsent: React.FC<CookieConsentProps> = ({ onOpenCompliance }) => {
  const [visible, setVisible] = useState(false);
  const [showManage, setShowManage] = useState(false);
  const [prefs, setPrefs] = useState<CookieConsentPreferences>({
    accepted: false,
    necessary: true,
    analytics: true,
    marketing: false
  });

  useEffect(() => {
    const saved = localStorage.getItem('indiafinds_cookie_consent');
    if (!saved) {
      setVisible(true);
    }
  }, []);

  const handleAcceptAll = () => {
    const final = { accepted: true, necessary: true, analytics: true, marketing: true, timestamp: new Date().toISOString() };
    localStorage.setItem('indiafinds_cookie_consent', JSON.stringify(final));
    setVisible(false);
  };

  const handleRejectNonEssential = () => {
    const final = { accepted: true, necessary: true, analytics: false, marketing: false, timestamp: new Date().toISOString() };
    localStorage.setItem('indiafinds_cookie_consent', JSON.stringify(final));
    setVisible(false);
  };

  const handleSaveCustom = () => {
    const final = { ...prefs, accepted: true, timestamp: new Date().toISOString() };
    localStorage.setItem('indiafinds_cookie_consent', JSON.stringify(final));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 max-w-4xl mx-auto bg-slate-900 text-white rounded-2xl shadow-2xl border border-slate-700 p-5 sm:p-6 transition-all">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2 font-bold text-amber-400 text-sm">
            <Cookie className="w-4 h-4" />
            <span>Privacy & Cookie Preferences</span>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            We use essential cookies to maintain site session functionality and anonymized analytics for affiliate link tracking. We respect your choices and do not sell personal data. View our{' '}
            <button
              onClick={() => onOpenCompliance('privacy')}
              className="text-amber-400 hover:underline font-semibold"
            >
              Privacy Policy
            </button>{' '}
            and{' '}
            <button
              onClick={() => onOpenCompliance('cookie-policy')}
              className="text-amber-400 hover:underline font-semibold"
            >
              Cookie Policy
            </button>.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto shrink-0">
          <button
            onClick={() => setShowManage(!showManage)}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1 transition-colors"
          >
            <Settings className="w-3.5 h-3.5" />
            Manage
          </button>

          <button
            onClick={handleRejectNonEssential}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors"
          >
            Reject Non-Essential
          </button>

          <button
            onClick={handleAcceptAll}
            className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-colors"
          >
            Accept All
          </button>
        </div>
      </div>

      {/* Expanded Manage Preferences */}
      {showManage && (
        <div className="mt-4 pt-4 border-t border-slate-800 text-xs space-y-3 bg-slate-800/60 p-4 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-100">Essential Cookies</span>
              <p className="text-[11px] text-slate-400">Required for website security, search filters and core operation.</p>
            </div>
            <span className="text-amber-400 font-mono font-bold">Always Active</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <span className="font-bold text-slate-100">Analytics & Click Metrics</span>
              <p className="text-[11px] text-slate-400">Anonymized tracking of outbound affiliate clicks to measure performance.</p>
            </div>
            <input
              type="checkbox"
              checked={prefs.analytics}
              onChange={(e) => setPrefs({ ...prefs, analytics: e.target.checked })}
              className="w-4 h-4 rounded text-amber-500 bg-slate-900 border-slate-700"
            />
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSaveCustom}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-1.5 rounded-lg text-xs"
            >
              Save Preferences
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
