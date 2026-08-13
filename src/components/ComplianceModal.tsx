import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Send, CheckCircle2, FileText, Info } from 'lucide-react';
import { SiteSettings } from '../types';

interface ComplianceModalProps {
  initialDocKey: string;
  onClose: () => void;
  siteSettings: SiteSettings;
}

export const ComplianceModal: React.FC<ComplianceModalProps> = ({
  initialDocKey,
  onClose,
  siteSettings
}) => {
  const [activeDoc, setActiveDoc] = useState(initialDocKey || 'amazon-disclosure');
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
  };

  const navItems = [
    { key: 'amazon-disclosure', label: 'Amazon Associates Disclosure' },
    { key: 'privacy', label: 'Privacy Policy' },
    { key: 'cookie-policy', label: 'Cookie Policy' },
    { key: 'terms', label: 'Terms & Conditions' },
    { key: 'disclaimer', label: 'Earnings Disclaimer' },
    { key: 'editorial-policy', label: 'Editorial Policy' },
    { key: 'copyright', label: 'Copyright Policy' },
    { key: 'about-us', label: 'About Us' },
    { key: 'contact-us', label: 'Contact Us' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden my-6 border border-slate-200 max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold">Legal, Compliance & Policy Framework</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 text-slate-300 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inner Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 flex-1 overflow-hidden">
          {/* Policy Navigation Sidebar */}
          <div className="bg-slate-50 p-4 border-r border-slate-200 overflow-y-auto space-y-1">
            <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider mb-2 px-3">
              Compliance Documents
            </div>
            {navItems.map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setActiveDoc(item.key);
                  setContactSubmitted(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center gap-2 ${
                  activeDoc === item.key
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
                    : 'text-slate-700 hover:bg-slate-200/60'
                }`}
              >
                <FileText className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>

          {/* Policy Document Body */}
          <div className="md:col-span-3 p-6 sm:p-8 overflow-y-auto text-slate-800 text-xs sm:text-sm leading-relaxed space-y-4">
            {activeDoc === 'amazon-disclosure' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-3">
                  Amazon Associates Program Operating Agreement Compliance
                </h3>
                <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl text-amber-950 font-mono text-xs font-bold">
                  "{siteSettings.amazonDisclosureText}"
                </div>
                <p>
                  <strong>Deals Platform</strong> is a participant in the Amazon Services LLC Associates Program and Amazon.in Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.in and affiliated websites.
                </p>
                <h4 className="font-bold text-slate-900 text-base">Key Operating Rules Followed:</h4>
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                  <li>Product images, titles, and specifications are retrieved through authorized channels or Product Advertising API protocols.</li>
                  <li>We do not modify Amazon trademarks, logos, or create fake price representations.</li>
                  <li>Prices and product availability are subject to change and are synced with Amazon.in.</li>
                  <li>No scraping or unauthorized automated extraction of Amazon.in customer reviews is performed.</li>
                </ul>
              </div>
            )}

            {activeDoc === 'privacy' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-3">
                  Privacy Policy
                </h3>
                <p>
                  At Deals Platform, accessible from https://dealsplatform.in, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Deals Platform and how we use it.
                </p>
                <h4 className="font-bold text-slate-900">Log Files & Analytics</h4>
                <p>
                  Deals Platform follows a standard procedure of using log files. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and click counts to analyze trends and track outbound affiliate link clicks.
                </p>
                <h4 className="font-bold text-slate-900">Google DoubleClick DART Cookie & AdSense</h4>
                <p>
                  Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to our site and other sites on the internet.
                </p>
              </div>
            )}

            {activeDoc === 'disclaimer' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-3">
                  Earnings & Affiliate Disclaimer
                </h3>
                <p>
                  The information provided on Deals Platform is for general product research, comparison, and educational purposes only.
                </p>
                <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200">
                  <strong className="text-slate-900">No Income or Earnings Guarantee:</strong> We do NOT guarantee earnings or claim lifetime income for any website visitors or users. All purchasing decisions made on third-party merchant platforms like Amazon India are strictly between the buyer and the merchant.
                </div>
              </div>
            )}

            {activeDoc === 'editorial-policy' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-3">
                  Editorial & Review Integrity Policy
                </h3>
                <p>
                  Our commitment is to provide transparent, factual, and unbiased product information for shoppers in India.
                </p>
                <ul className="list-disc pl-5 space-y-2 text-slate-700">
                  <li><strong>Zero Fake Reviews:</strong> We do not fabricate star ratings, fake buyer testimonials, or artificial expert endorsements.</li>
                  <li><strong>Human Oversight:</strong> All AI-assisted research drafts undergo editorial review prior to publication.</li>
                  <li><strong>Price Accuracy:</strong> Prices shown reflect data provided by authorized APIs or merchant listings.</li>
                </ul>
              </div>
            )}

            {activeDoc === 'contact-us' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-3">
                  Contact Editorial Team
                </h3>

                {contactSubmitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-900 p-6 rounded-2xl text-center space-y-2">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                    <h4 className="font-bold text-base">Message Sent Successfully!</h4>
                    <p className="text-xs text-emerald-800">
                      Thank you for contacting Deals Platform. Our team will review your message shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Your Name</label>
                        <input
                          type="text"
                          required
                          value={contactForm.name}
                          onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
                          placeholder="e.g. Vikram Sharma"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Your Email</label>
                        <input
                          type="email"
                          required
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
                          placeholder="vikram@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Subject</label>
                      <input
                        type="text"
                        required
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
                        placeholder="Product inquiry or website feedback"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Message</label>
                      <textarea
                        rows={4}
                        required
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-300 rounded-xl p-2.5 text-xs font-medium"
                        placeholder="Write your message here..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 transition-colors shadow-2xs"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Send Message</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {activeDoc === 'about-us' && (
              <div className="space-y-4">
                <h3 className="text-xl font-black text-slate-900 border-b border-slate-200 pb-3">
                  About Deals Platform
                </h3>
                <p>
                  Deals Platform is an independent affiliate product research and decision matrix platform created to help consumers in India make informed purchasing choices on Amazon India.
                </p>
                <p>
                  We combine natural language query intent parsing, side-by-side technical specification matrices, and real buyer considerations to make product discovery fast and transparent.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
