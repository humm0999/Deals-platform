import React, { useState } from 'react';
import {
  ShoppingBag,
  Search,
  SlidersHorizontal,
  FileText,
  ShieldCheck,
  LayoutDashboard,
  Layers,
  Percent,
  BookOpen,
  Menu,
  X,
  ExternalLink,
  Info,
  CheckCircle2
} from 'lucide-react';
import { AmazonApiConfig, SiteSettings } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onOpenSearchModal: () => void;
  onOpenCompliance: (docKey: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  comparisonCount: number;
  amazonConfig: AmazonApiConfig;
  siteSettings: SiteSettings;
  onOpenLaunchChecklist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  onOpenSearchModal,
  onOpenCompliance,
  selectedCategory,
  setSelectedCategory,
  comparisonCount,
  amazonConfig,
  siteSettings,
  onOpenLaunchChecklist
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Required Amazon Associates & AdSense Disclosure Top Bar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
            <span>
              <strong>Affiliate Transparency:</strong> {siteSettings.amazonDisclosureText} Tracking Tag: <code className="bg-slate-800 text-blue-300 border border-slate-700/80 px-1.5 py-0.5 rounded font-mono text-[11px]">{amazonConfig.trackingId}</code>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onOpenCompliance('amazon-disclosure')}
              className="text-slate-300 hover:text-white underline text-[11px] transition-colors"
            >
              Disclosure Details
            </button>
            <button
              onClick={onOpenLaunchChecklist}
              className="bg-blue-600 hover:bg-blue-500 text-white px-2.5 py-0.5 rounded text-[11px] font-medium flex items-center gap-1 transition-colors"
            >
              <CheckCircle2 className="w-3 h-3" />
              Setup & Launch Guide
            </button>
          </div>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-2 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-lg bg-red-600 text-white flex items-center justify-center font-bold text-lg shadow-xs group-hover:bg-red-700 transition-colors">
              D
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight flex items-center gap-1">
                <span className="text-red-600">Deals</span>Platform
                <span className="bg-red-50 text-red-700 border border-red-200 text-[10px] font-semibold px-1.5 py-0.5 rounded uppercase font-mono">
                  India
                </span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium hidden sm:block">
                Amazon Research & Deals Hub
              </p>
            </div>
          </div>

          {/* Center Search Input Trigger */}
          <div className="flex-1 max-w-xl relative">
            <div
              onClick={onOpenSearchModal}
              className="w-full bg-slate-100 hover:bg-slate-200/80 text-slate-500 text-xs sm:text-sm px-4 py-2 rounded-xl border border-slate-200 cursor-pointer flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2 truncate">
                <Search className="w-4 h-4 text-blue-600 shrink-0" />
                <span className="truncate text-slate-600 font-normal">
                  {searchQuery ? `Searching: "${searchQuery}"` : 'Try natural search: "Best laptop under ₹50,000 for student"...'}
                </span>
              </div>
              <span className="hidden md:inline-flex items-center gap-1 text-[10px] bg-white border border-slate-200 text-slate-600 font-mono px-2 py-0.5 rounded shadow-2xs">
                AI Intent Engine
              </span>
            </div>
          </div>

          {/* Desktop Right Action Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'home' ? 'bg-slate-100 text-blue-600 font-semibold border border-slate-200' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              Products
            </button>

            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 relative transition-colors ${
                activeTab === 'comparison' ? 'bg-slate-100 text-blue-600 font-semibold border border-slate-200' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Layers className="w-4 h-4" />
              Comparisons
              {comparisonCount > 0 && (
                <span className="bg-blue-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {comparisonCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('guides')}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'guides' ? 'bg-slate-100 text-blue-600 font-semibold border border-slate-200' : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Buying Guides
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-2 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors ${
                activeTab === 'admin'
                  ? 'bg-slate-900 text-blue-400 font-semibold'
                  : 'bg-slate-100 text-slate-800 hover:bg-slate-200 border border-slate-200'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Admin Hub
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Sub Category Quick Bar */}
      <div className="bg-slate-50 border-t border-slate-200 py-2 px-4 overflow-x-auto no-scrollbar">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-medium text-slate-700 min-w-max">
          <span className="text-slate-400 font-medium text-[11px] uppercase tracking-wider flex items-center gap-1 pr-2 border-r border-slate-200">
            <SlidersHorizontal className="w-3.5 h-3.5 text-blue-600" /> Categories:
          </span>

          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-lg text-xs transition-colors ${
              selectedCategory === 'all'
                ? 'bg-blue-600 text-white font-medium shadow-2xs'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All Categories
          </button>

          {[
            { id: 'laptops', label: 'Laptops' },
            { id: 'mobile_accessories', label: 'Mobile Accessories' },
            { id: 'electronics', label: 'Electronics' },
            { id: 'kitchen', label: 'Kitchen & Appliances' },
            { id: 'fitness', label: 'Fitness' },
            { id: 'gaming', label: 'Gaming' },
            { id: 'books', label: 'Books' }
          ].map(c => (
            <button
              key={c.id}
              onClick={() => setSelectedCategory(c.id)}
              className={`px-3 py-1 rounded-lg text-xs transition-colors ${
                selectedCategory === c.id
                  ? 'bg-blue-600 text-white font-medium shadow-2xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-3 shadow-xl">
          <button
            onClick={() => {
              setActiveTab('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-slate-100"
          >
            <ShoppingBag className="w-4 h-4 text-amber-600" />
            Products & Deals
          </button>

          <button
            onClick={() => {
              setActiveTab('comparison');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-slate-100"
          >
            <Layers className="w-4 h-4 text-amber-600" />
            Comparison Matrix ({comparisonCount})
          </button>

          <button
            onClick={() => {
              setActiveTab('guides');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg flex items-center gap-2 hover:bg-slate-100"
          >
            <BookOpen className="w-4 h-4 text-amber-600" />
            Buying Guides & Reviews
          </button>

          <button
            onClick={() => {
              setActiveTab('admin');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg bg-slate-900 text-amber-400 flex items-center gap-2"
          >
            <LayoutDashboard className="w-4 h-4" />
            Admin Panel & cPanel Export
          </button>

          <div className="pt-2 border-t border-slate-200 flex flex-wrap gap-2 text-xs text-slate-600">
            <button onClick={() => onOpenCompliance('privacy')} className="hover:underline">
              Privacy Policy
            </button>
            <span>•</span>
            <button onClick={() => onOpenCompliance('amazon-disclosure')} className="hover:underline">
              Amazon Disclosure
            </button>
            <span>•</span>
            <button onClick={() => onOpenCompliance('terms')} className="hover:underline">
              Terms
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
