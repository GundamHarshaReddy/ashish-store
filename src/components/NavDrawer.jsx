import React from 'react';
import { X, ArrowRight, MapPin, ExternalLink, Phone } from 'lucide-react';
import { storeData } from '../data/storeData';

export default function NavDrawer({ isOpen, onClose, onSelectCategory, onScrollToStores }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Body */}
      <div className="absolute inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white text-black shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-6 border-b border-neutral-200 flex items-center justify-between sticky top-0 bg-white z-10">
            <div className="flex items-center gap-2">
              <span className="font-anton text-2xl tracking-[0.18em]">ASHISH</span>
              <span className="text-[10px] font-mono uppercase bg-black text-white px-1.5 py-0.5 rounded">
                EXPLORE
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Close menu"
            >
              <X size={20} />
            </button>
          </div>

          {/* Drawer Content */}
          <div className="p-6 space-y-8 flex-1">
            {/* 1. Main Category Links */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-3">
                Collections & Apparel
              </h3>
              <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                {storeData.navCategories.map((cat, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => {
                        onSelectCategory(cat);
                        onClose();
                      }}
                      className="text-sm font-medium hover:text-orange-600 transition-colors flex items-center justify-between w-full group py-0.5 text-left"
                    >
                      <span>{cat}</span>
                      <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-600" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 2. Color Palettes */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-3">
                Shop By Color
              </h3>
              <div className="flex flex-wrap gap-2">
                {storeData.colorFilters.map((col, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectCategory(col.name);
                      onClose();
                    }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-neutral-200 hover:border-black text-xs font-mono uppercase transition-colors"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: col.hex }}
                    />
                    <span>{col.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Physical Flagship Locations */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400">
                  Walk-in Stores
                </h3>
                <button
                  onClick={() => {
                    onClose();
                    onScrollToStores();
                  }}
                  className="text-[11px] font-mono uppercase underline hover:opacity-60"
                >
                  View All
                </button>
              </div>
              <ul className="space-y-2">
                {storeData.stores.slice(0, 4).map((s, idx) => (
                  <li key={idx}>
                    <button
                      onClick={() => {
                        onClose();
                        onScrollToStores();
                      }}
                      className="flex items-center gap-2 text-xs hover:text-orange-600 transition-colors w-full text-left"
                    >
                      <MapPin size={13} className="text-neutral-400 shrink-0" />
                      <span className="font-medium">{s.city}</span>
                      <span className="text-[10px] text-green-700 bg-green-50 px-1 py-0.2 rounded font-mono ml-auto">
                        OPEN
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Brand Information */}
            <div className="pt-4 border-t border-neutral-100">
              <h3 className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-3">
                Brand
              </h3>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {storeData.footerLinks.weAreAshish.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.href}
                    className="text-neutral-600 hover:text-black transition-colors py-1"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="p-6 bg-neutral-50 border-t border-neutral-200 text-xs text-neutral-600">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Phone size={13} />
                <span className="font-mono">+91 9958958313</span>
              </div>
              <div className="flex items-center gap-2 text-black">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-60" aria-label="Instagram">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
            </div>
            <p className="text-[11px] text-neutral-400 font-mono">
              © {new Date().getFullYear()} ASHISH INDIA. All Rights Reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
